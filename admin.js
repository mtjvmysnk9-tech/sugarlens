/* 隐糖 · 数据后台 */
// The statistics endpoint lives on the Qoder site. Served from GitHub Pages the
// page is cross-origin, so the path has to become absolute; reads are CORS-open,
// while the record-write endpoint stays origin-locked to its own host.
const BACKEND = "https://sugarlens-t3tamdheczu.qoder.zone";
const API = (location.hostname.endsWith("github.io") ? BACKEND : "") + "/functions/v1/app/api";
const CODE_KEY = "sl-admin-code";
const $ = (id) => document.getElementById(id);

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (n) => {
  const v = Number(n) || 0;
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
};
const md = (iso) => (iso ? `${Number(iso.slice(5, 7))}/${Number(iso.slice(8, 10))}` : "—");
const pct = (part, whole) => (whole > 0 ? Math.round((part / whole) * 100) : 0);

/* The code stays in sessionStorage only: a shared or borrowed browser should
   not keep an administrator credential after the tab closes. */
const storedCode = () => { try { return sessionStorage.getItem(CODE_KEY) || ""; } catch (e) { return ""; } };
const rememberCode = (c) => { try { sessionStorage.setItem(CODE_KEY, c); } catch (e) { /* ignore */ } };
const forgetCode = () => { try { sessionStorage.removeItem(CODE_KEY); } catch (e) { /* ignore */ } };

let code = storedCode();

function msg(text, tone) {
  const el = $("gate-msg");
  el.textContent = text;
  el.className = "gate-msg" + (tone ? " " + tone : "");
}

const ERRORS = {
  invalid_admin_code: ["访问码不正确。", "bad"],
  too_many_attempts: ["尝试次数过多，请 30 秒后再试。", "warn"],
  admin_not_configured: ["后台访问码还没有初始化，请联系站点维护者写入访问码后再试。", "warn"],
  database_not_configured: ["数据服务尚未配置完成。", "warn"],
  database_credential_rejected: ["数据服务暂不可用，请联系站点管理员检查凭据。", "bad"],
};

async function loadStats() {
  const res = await fetch(`${API}/stats`, {
    headers: { "x-admin-code": code },
    credentials: "same-origin",
    signal: AbortSignal.timeout(20000),
  });
  let body = null;
  try { body = await res.json(); } catch (e) { /* non-json response */ }
  if (!res.ok) {
    const key = typeof body?.error === "string" ? body.error : "";
    if (key === "invalid_admin_code") forgetCode();
    const known = ERRORS[key];
    const err = new Error(known ? known[0] : `暂时无法读取统计（${res.status}）。`);
    err.tone = known ? known[1] : "bad";
    err.status = res.status;
    throw err;
  }
  if (!body || body.ok !== true || !body.scope || !Array.isArray(body.trend)) {
    const err = new Error("服务返回了无法识别的结果，请重新读取。");
    err.tone = "bad";
    throw err;
  }
  return body;
}

/* ===== panels ===== */
function kpis(s) {
  const cards = [
    { l: "累计访客（设备）", v: s.visitors.total, u: "人", n: `最近一天 ${s.visitors.latest} 人活跃` },
    { l: "累计记录", v: s.entries.total, u: "笔", n: `最近一天 ${s.entries.latest} 笔` },
    { l: "人均每日隐形糖", v: fmt(s.sugar.avgPerGuestDay), u: "g", n: `中位数 ${fmt(s.sugar.medianPerGuestDay)}g · 理想目标 25g` },
    { l: "超出理想目标", v: s.sugar.overIdealRate, u: "%", n: `基于 ${s.scope.guestDays} 个人·日样本` },
  ];
  return `<div class="kpis">${cards.map((c) => `<div class="card kpi fade">
      <span class="kpi-l">${c.l}</span>
      <span class="kpi-v">${esc(c.v)}<small>${c.u}</small></span>
      <span class="kpi-n">${esc(c.n)}</span>
    </div>`).join("")}</div>`;
}

function trendPanel(s) {
  const days = s.trend.slice(-7);
  if (!days.length) return `<div class="empty">还没有任何记录。</div>`;
  const max = Math.max(25, ...days.map((d) => d.avg));
  const bars = days.map((d) => {
    const h = Math.max(4, Math.round((d.avg / max) * 100));
    return `<div class="col">
      <span class="val">${fmt(d.avg)}</span>
      <span class="track"><span class="bar${d.avg > 25 ? " over" : ""}" data-h="${h}" style="height:0"></span></span>
      <span class="lbl">${md(d.date)}</span>
    </div>`;
  }).join("");
  const goal = Math.round((25 / max) * 100);
  return `<div class="trend">${bars}</div>
    <div class="goal-line" style="margin-top:9px">纵轴为人均每日糖量（g）· 刻度线 25g 位于 ${goal}% 高度 · 橙色为超过 25g 的日子</div>`;
}

function rankPanel(s) {
  if (!s.topFoods.length) return `<div class="empty">暂无食物记录。</div>`;
  const max = Math.max(...s.topFoods.map((f) => f.times));
  return `<div class="rank">${s.topFoods.map((f, i) => `<div class="rank-row">
      <span class="rank-i">${i + 1}</span>
      <div class="rank-mid">
        <div class="rank-name">${esc(f.name)}<span class="tag">${esc(f.cat)}</span></div>
        <div class="rank-track"><span class="rank-fill c${(i % 5) + 1}" data-w="${pct(f.times, max)}" style="width:0"></span></div>
      </div>
      <div class="rank-end"><b>${f.times} 次</b><span>${fmt(f.g)}g 合计</span></div>
    </div>`).join("")}</div>`;
}

function ratePanel(s) {
  const rows = [
    { l: "超过 25g（理想）", v: s.sugar.overIdealRate, cls: s.sugar.overIdealRate > 50 ? "bad" : s.sugar.overIdealRate > 25 ? "warn" : "ok" },
    { l: "超过 50g（上限）", v: s.sugar.overUpperRate, cls: s.sugar.overUpperRate > 20 ? "bad" : s.sugar.overUpperRate > 8 ? "warn" : "ok" },
  ];
  const total = s.targets.ideal + s.targets.upper;
  return `<div class="rates">${rows.map((r) => `<div>
      <div class="rate-top"><span>${r.l}</span><b>${r.v}%</b></div>
      <div class="rate-track"><span class="rate-fill ${r.cls}" data-w="${r.v}" style="width:0"></span></div>
    </div>`).join("")}</div>
    <div class="split">
      <div class="split-cell"><div class="split-v">${pct(s.targets.ideal, total)}%</div><div class="split-l">选择 25g 理想目标（${s.targets.ideal} 笔）</div></div>
      <div class="split-cell"><div class="split-v">${pct(s.targets.upper, total)}%</div><div class="split-l">选择 50g 上限（${s.targets.upper} 笔）</div></div>
    </div>`;
}

function catPanel(s) {
  if (!s.categories.length) return `<div class="empty">暂无分类数据。</div>`;
  const max = Math.max(...s.categories.map((c) => c.g));
  return `<div class="rank">${s.categories.map((c, i) => `<div class="rank-row">
      <span class="rank-i">${i + 1}</span>
      <div class="rank-mid">
        <div class="rank-name">${esc(c.cat)}</div>
        <div class="rank-track"><span class="rank-fill c${(i % 5) + 1}" data-w="${pct(c.g, max)}" style="width:0"></span></div>
      </div>
      <div class="rank-end"><b>${fmt(c.g)}g</b><span>${c.times} 次</span></div>
    </div>`).join("")}</div>`;
}

function board(s) {
  const scopeNote = s.scope.complete
    ? `统计窗口为最近 7 天，已覆盖窗口内的全部 ${s.scope.records} 条上报记录`
    : `统计窗口为最近 7 天；为避免超时，单日最多读取 200 条，当前有日期达到上限，结果是部分样本`;
  const range = s.scope.from ? `${s.scope.from} 至 ${s.scope.to}` : "暂无数据";
  return `<div class="head">
      <div>
        <h1>访客数据概览</h1>
        <p>记录区间 ${esc(range)} · 最近一天 ${s.latest ? esc(md(s.latest.date)) : "—"}，${s.latest ? `${s.latest.people} 位访客人均 ${fmt(s.latest.avg)}g` : "尚无数据"}</p>
      </div>
      <span class="pill ${s.entries.total ? "ok" : "warn"}">${s.entries.total ? "实时数据" : "等待首批上报"}</span>
    </div>
    ${kpis(s)}
    <div class="grid">
      <div class="card fade"><h2 class="panel-title">近 7 天人均隐形糖</h2><p class="panel-sub">按访客所在日历日聚合 · 每人每天所有记录合计后取人均</p>${trendPanel(s)}</div>
      <div class="card fade"><h2 class="panel-title">超标比例与目标偏好</h2><p class="panel-sub">人·日为单位；同一天多条记录合并计算</p>${ratePanel(s)}</div>
    </div>
    <div class="grid">
      <div class="card fade"><h2 class="panel-title">高糖来源排行</h2><p class="panel-sub">按被记录次数排序 · 糖量由服务端食物库计算，不采信浏览器提交值</p>${rankPanel(s)}</div>
      <div class="card fade"><h2 class="panel-title">分类糖量分布</h2><p class="panel-sub">按累计糖量排序</p>${catPanel(s)}</div>
    </div>
    <p class="note"><b>口径说明：</b>${esc(scopeNote)}。访客以随机本机编号匿名上报，后台只做聚合，无法回溯到个人；首次进入时预置的 2 条示例记录留在访客本机，不计入统计。
    <br/><b>安全边界：</b>服务端只保存访问码的哈希校验值，不保存明文；本页把访问码暂存在当前标签页，关闭即清除。同一实例连续猜错 15 次会触发 30 秒锁定。</p>`;
}

/* ===== drawing ===== */
function animate() {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll("[data-h]").forEach((el) => { el.style.height = el.dataset.h + "%"; });
    document.querySelectorAll("[data-w]").forEach((el) => { el.style.width = el.dataset.w + "%"; });
  }));
}

async function show() {
  $("gate").hidden = true;
  $("scope-chip").hidden = false;
  $("reload").hidden = false;
  const boardEl = $("board");
  boardEl.hidden = false;
  boardEl.innerHTML = `<div class="loading">正在读取聚合统计…</div>`;
  try {
    const s = await loadStats();
    boardEl.innerHTML = board(s);
    $("scope-chip").textContent = `${s.entries.total} 笔 / ${s.visitors.total} 访客`;
    $("scope-chip").className = "pill" + (s.scope.complete ? "" : " warn");
    animate();
  } catch (error) {
    if (error.status === 401) {
      code = "";
      boardEl.hidden = true;
      $("gate").hidden = false;
      $("scope-chip").hidden = true;
      $("reload").hidden = true;
      msg(error.message, error.tone);
      $("code").value = "";
      $("code").focus();
      return;
    }
    boardEl.innerHTML = `<div class="card"><div class="empty">${esc(error.message)}<br/>可点击右上「刷新」重试。</div></div>`;
  }
}

$("gate-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const value = $("code").value.trim();
  if (!value) { msg("请输入访问码。", "info"); return; }
  code = value;
  rememberCode(value);
  msg("", "");
  show();
});
$("reload").addEventListener("click", show);

if (code) show();
else $("code").focus();
