"use strict";

/* ===== Icons ===== */
const ICONS = {
  home: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5",
  plus: "M12 5v14M5 12h14",
  chart: "M4 20h16M7 16v-5M12 16V7M17 16v-8",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-4 4-6 8-6s8 2 8 6",
  scan: "M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M7 12h10",
  camera: "M3 8h4l2-3h6l2 3h4v11H3ZM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
  x: "M6 6l12 12M18 6L6 18",
  chevron: "m9 6 6 6-6 6",
  flame: "M12 3c1 3-3 4.5-3 8a3 3 0 0 0 6 0c0-1.5-.5-2.5-1-3.5 2 1 4 3 4 5.5a6 6 0 0 1-12 0C6 8 10 6 12 3Z",
  check: "m5 13 4 4L19 7",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v5M12 8h.01",
};
function icon(n, s = 20) {
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${ICONS[n]}"/></svg>`;
}

/* ===== Demo data (common-serving estimates) ===== */
const FOODS = [
  { id: "milktea", name: "全糖奶茶", cat: "饮料", serving: "500ml/杯", sugar: 42, per: "约 8.4g/100ml", tip: "「三分糖」仍约 20g；加奶盖、布丁再 +8~15g。", alt: "无糖茶 + 鲜奶（≈0g），或三分糖去小料" },
  { id: "icetea", name: "冰红茶", cat: "饮料", serving: "500ml/瓶", sugar: 48, per: "9.6g/100ml", tip: "一瓶接近每日上限 50g，「柠檬健康感」是错觉。", alt: "无糖冰红茶 / 纯茶（0g）" },
  { id: "cola", name: "可乐", cat: "饮料", serving: "330ml/罐", sugar: 35, per: "10.6g/100ml", tip: "一罐超过理想目标 40%；无糖版用代糖，不计入。", alt: "无糖可乐 / 气泡水（0g）" },
  { id: "juice", name: "100% 橙汁", cat: "饮料", serving: "300ml/杯", sugar: 30, per: "约 10g/100ml", tip: "WHO 将果汁中的糖计入游离糖；榨汁后吸收更快。", alt: "直接吃橙子，膳食纤维缓释糖分" },
  { id: "yakult", name: "乳酸菌饮料", cat: "饮料", serving: "100ml/瓶", sugar: 15, per: "15g/100ml", tip: "小小一瓶 = 3 块多方糖，「助消化」叙事掩盖高糖。", alt: "无糖酸奶 + 益生菌" },
  { id: "sports", name: "运动饮料", cat: "饮料", serving: "500ml/瓶", sugar: 30, per: "6g/100ml", tip: "日常久坐不需要补糖，运动不足 1 小时喝水即可。", alt: "白水 / 无糖电解质水" },
  { id: "coffee", name: "三合一速溶咖啡", cat: "饮料", serving: "15g/条", sugar: 10, per: "约 10g/条", tip: "配料表前两位常是植脂末、白砂糖。", alt: "黑咖啡 + 纯牛奶（≈0g 添加糖）" },
  { id: "yogurt", name: "风味酸奶", cat: "乳制品", serving: "200g/杯", sugar: 18, per: "添加糖约 9g/100g", tip: "风味发酵乳添加糖普遍 8~12g/100g；天然乳糖不计入。", alt: "无糖希腊酸奶 + 新鲜水果" },
  { id: "sweetmilk", name: "早餐甜牛奶", cat: "乳制品", serving: "250ml/盒", sugar: 12, per: "添加糖约 5g/100ml", tip: "调制乳含添加糖；纯牛奶的乳糖不计入。", alt: "纯牛奶 / 无糖豆浆" },
  { id: "chocopie", name: "巧克力派", cat: "零食", serving: "1枚(30g)", sugar: 10, per: "约 33g/100g", tip: "一枚 = 2 块多方糖，夹心与脆皮都是糖。", alt: "85% 黑巧 2 小格（≈2g）" },
  { id: "sandwich", name: "夹心饼干", cat: "零食", serving: "3片(30g)", sugar: 9, per: "约 30g/100g", tip: "夹心层基本是糖 + 油。", alt: "无糖苏打饼干 / 原味坚果" },
  { id: "preserved", name: "果脯蜜饯", cat: "零食", serving: "50g/袋", sugar: 30, per: "约 60g/100g", tip: "糖渍工艺，糖占比可超过一半。", alt: "新鲜水果 / 无添加冻干水果" },
  { id: "icecream", name: "冰淇淋", cat: "零食", serving: "1支(70g)", sugar: 14, per: "约 20g/100g", tip: "一支接近理想目标的一半。", alt: "无糖冰淇淋 / 酸奶冻" },
  { id: "yolkpie", name: "蛋黄派", cat: "零食", serving: "1枚(25g)", sugar: 8, per: "约 32g/100g", tip: "「早餐派」的场景定位让它成为隐形糖重灾区。", alt: "水煮蛋 + 全麦面包" },
  { id: "ketchup", name: "番茄酱", cat: "酱料", serving: "20g(约1勺)", sugar: 5, per: "约 25g/100g", tip: "蘸酱按勺累积，一餐轻松 +10g。", alt: "新鲜番茄 / 无添加糖番茄罐头" },
  { id: "salad", name: "千岛沙拉酱", cat: "酱料", serving: "20g(约1勺)", sugar: 4, per: "约 20g/100g", tip: "「吃草」也可能拌进糖和油。", alt: "油醋汁 / 柠檬汁 + 黑胡椒" },
  { id: "sweetchili", name: "甜辣酱", cat: "酱料", serving: "20g(约1勺)", sugar: 8, per: "约 40g/100g", tip: "东南亚风味酱料糖占比极高。", alt: "小米辣 + 鱼露 + 青柠" },
  { id: "toast", name: "吐司面包", cat: "主食", serving: "2片(70g)", sugar: 6, per: "约 8g/100g", tip: "白吐司加糖促发酵，全麦款同样要查配料表。", alt: "配料仅面粉、水、盐、酵母的面包" },
  { id: "cereal", name: "甜味早餐麦片", cat: "主食", serving: "50g/碗", sugar: 12, per: "约 24g/100g", tip: "「营养早餐」标签下，糖含量常超过 20%。", alt: "原味燕麦 + 牛奶" },
  { id: "oatpack", name: "速溶甜燕麦", cat: "主食", serving: "1包(35g)", sugar: 10, per: "约 28g/100g", tip: "「牛奶味 / 水果味」即加糖款。", alt: "原味即食燕麦" },
  { id: "sweetsour", name: "糖醋排骨", cat: "菜肴", serving: "1份(150g)", sugar: 20, per: "约 13g/100g", tip: "糖醋汁含糖量高，外卖版更甚。", alt: "自制少糖糖醋汁 / 清蒸排骨" },
  { id: "braised", name: "红烧肉", cat: "菜肴", serving: "1份(150g)", sugar: 12, per: "约 8g/100g", tip: "炒糖色 + 收汁，糖藏在酱汁里。", alt: "少糖红烧 / 白切肉蘸蒜酱油" },
];
const CATS = ["全部", "饮料", "乳制品", "零食", "酱料", "主食", "菜肴"];
const WEEK = [
  { d: "11/3", v: 32 }, { d: "11/4", v: 18 }, { d: "11/5", v: 45 },
  { d: "11/6", v: 26 }, { d: "11/7", v: 38 }, { d: "11/8", v: 22 },
];
const WEEK_GROUPS = { 含糖饮料: 150, 奶茶: 84, 乳制品: 54, 零食: 46, 主食菜肴: 40, 酱料: 22 };
const SEQ = ["var(--site-accent)", "#3b82f6", "#f59e0b", "#8b5cf6", "#22c55e"];

/* ===== Helpers ===== */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
const cubes = (g) => Math.round((g / 4.5) * 10) / 10;
const foodOf = (id) => FOODS.find((f) => f.id === id);
// Thumbnails are named after the catalog id, so the food list never carries a
// second path table that can drift out of sync with it.
const foodThumb = (id, cls, size = 40) =>
  `<span class="thumb" style="--sz:${size}px;--ring:var(--${cls})"><img src="img/${id}.webp" alt="" loading="lazy" decoding="async"></span>`;
function traffic(sugar) {
  if (sugar <= 5) return { cls: "ok", label: "低糖" };
  if (sugar <= 15) return { cls: "warn", label: "中糖" };
  return { cls: "bad", label: "高糖" };
}
function groupOf(f) {
  if (f.id === "milktea") return "奶茶";
  if (f.cat === "饮料") return "含糖饮料";
  if (f.cat === "乳制品") return "乳制品";
  if (f.cat === "零食") return "零食";
  if (f.cat === "酱料") return "酱料";
  return "主食菜肴";
}
function dateStr() {
  const n = new Date();
  const wk = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][n.getDay()];
  return `${n.getMonth() + 1}月${n.getDate()}日 ${wk}`;
}

/* ===== State ===== */
const S = {
  tab: "today",
  log: [{ id: "demo-coffee", foodId: "coffee", time: "08:32" }, { id: "demo-yogurt", foodId: "yogurt", time: "10:05" }],
  target: 25,
  query: "",
  cat: "全部",
  detail: null,
  scan: { open: false, stage: "camera" },
  info: null,
  toast: null,
  remindOver: true,
  remindNight: true,
  remindWeek: false,
};
let toastTimer = null;

function load() {
  try {
    const l = JSON.parse(localStorage.getItem("sl-log-v1"));
    // Older builds stored numeric ids; ids are opaque strings now.
    if (Array.isArray(l)) S.log = l.filter((e) => e && foodOf(e.foodId)).map((e) => ({ ...e, id: String(e.id) }));
    const t = Number(localStorage.getItem("sl-target"));
    if (t === 25 || t === 50) S.target = t;
    ["remindOver", "remindNight", "remindWeek"].forEach((k) => {
      const v = localStorage.getItem("sl-" + k);
      if (v === "true" || v === "false") S[k] = v === "true";
    });
  } catch (e) { /* storage unavailable: keep defaults */ }
  loadQueue();
}
function save() {
  try {
    localStorage.setItem("sl-log-v1", JSON.stringify(S.log));
    localStorage.setItem("sl-target", String(S.target));
    ["remindOver", "remindNight", "remindWeek"].forEach((k) => localStorage.setItem("sl-" + k, String(S[k])));
  } catch (e) { /* ignore */ }
}
const total = () => S.log.reduce((s, e) => s + (foodOf(e.foodId)?.sugar ?? 0), 0);

/* ===== Cloud reporting (guest mode) ===== */
const API_PATH = "/functions/v1/app/api";
const BACKEND_ORIGIN = "https://sugarlens-t3tamdheczu.qoder.zone";
// The platform gateway only accepts record writes whose Origin is the site's
// own host, so a GitHub Pages copy cannot upload. Reads are CORS-open, so the
// admin dashboard still shows real aggregates from either host.
const ON_GH_PAGES = location.hostname.endsWith("github.io");
const API = (ON_GH_PAGES ? BACKEND_ORIGIN : "") + API_PATH;
const REPORTING = !ON_GH_PAGES;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const rid = () => (crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
  const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15;
  return (c === "y" ? (r & 3) | 8 : r).toString(16);
}));
function guestId() {
  try {
    const stored = localStorage.getItem("sl-guest");
    if (UUID_RE.test(stored || "")) return stored;
    const fresh = rid();
    localStorage.setItem("sl-guest", fresh);
    return fresh;
  } catch (e) { return null; }
}

let queue = [];
let sending = false;
let syncFailed = false;

function loadQueue() {
  try {
    const raw = JSON.parse(localStorage.getItem("sl-queue") || "[]");
    if (Array.isArray(raw)) {
      queue = raw.filter((op) => op && UUID_RE.test(op.entry_id) && UUID_RE.test(op.guest_id)
        && (op.action === "remove" || (op.action === "add" && foodOf(op.food_id) && (op.target === 25 || op.target === 50))));
    }
  } catch (e) { queue = []; }
}
function saveQueue() {
  try { localStorage.setItem("sl-queue", JSON.stringify(queue.slice(-200))); } catch (e) { /* ignore */ }
}
function enqueue(op) {
  if (!REPORTING || !op.guest_id) return;
  queue.push(op);
  saveQueue();
  flush();
}
async function sendOp(op) {
  const body = op.action === "remove"
    ? { guest_id: op.guest_id, entry_id: op.entry_id }
    : { guest_id: op.guest_id, entry_id: op.entry_id, food_id: op.food_id, date: op.date, target: op.target };
  const res = await fetch(API + "/log", {
    method: op.action === "remove" ? "DELETE" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    credentials: "same-origin",
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error("rejected");
}
async function flush() {
  if (sending) return;
  sending = true;
  syncFailed = false;
  paintSync();
  while (queue.length) {
    try { await sendOp(queue[0]); queue.shift(); saveQueue(); }
    catch (e) { syncFailed = true; break; }
  }
  sending = false;
  paintSync();
}
function syncView() {
  if (!REPORTING) return { cls: "", label: "本地演示模式" };
  if (sending) return { cls: "warn", label: "同步中…" };
  if (!queue.length) return { cls: "ok", label: "已同步" };
  if (syncFailed) return { cls: "bad", label: `待同步 ${queue.length} 条 · 点此重试` };
  return { cls: "warn", label: `待同步 ${queue.length} 条` };
}
function paintSync() {
  const el = document.getElementById("sync-chip");
  if (!el) return;
  const v = syncView();
  el.className = "pill " + v.cls;
  el.textContent = v.label;
}
const localDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/* ===== Actions ===== */
function setTab(tab) { S.tab = tab; render(); }
function addFood(foodId) {
  const f = foodOf(foodId);
  if (!f) return;
  const n = new Date();
  const time = `${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`;
  const entry = { id: rid(), foodId, time };
  S.log.push(entry);
  save();
  enqueue({ action: "add", guest_id: guestId(), entry_id: entry.id, food_id: foodId, date: localDate(n), target: S.target });
  S.toast = { entryId: entry.id, msg: `已记录 ${f.name} +${f.sugar}g` };
  render();
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { S.toast = null; render(); }, 4500);
}
function removeEntry(id) {
  S.log = S.log.filter((e) => e.id !== id);
  if (S.toast && S.toast.entryId === id) S.toast = null;
  save();
  // Only uploaded entries can be withdrawn; the demo seed never left the device.
  if (UUID_RE.test(id)) enqueue({ action: "remove", guest_id: guestId(), entry_id: id });
  render();
}

/* ===== Pages ===== */
function renderToday() {
  const t = total();
  const ringTone = t <= S.target ? "ok" : t <= 50 ? "warn" : "bad";
  const C = 2 * Math.PI * 80;
  const frac = Math.min(t / 50, 1);
  const ang = (S.target / 50) * 2 * Math.PI - Math.PI / 2;
  const tickX = 90 + 80 * Math.cos(ang);
  const tickY = 90 + 80 * Math.sin(ang);
  const status = t <= S.target
    ? `还不错，今日余量 ${fmt(S.target - t)}g`
    : t <= 50
      ? `已超理想目标 ${fmt(t - S.target)}g，留意接下来的零食`
      : `已超每日上限 ${fmt(t - 50)}g，建议今天不再摄入含糖食品`;
  const cubeN = Math.min(Math.round(t / 4.5), 10);
  const cubeExtra = Math.round(t / 4.5) > 10 ? `<span class="tiny faint">+${Math.round(t / 4.5) - 10}</span>` : "";
  const cubeSquares = Array.from({ length: cubeN }, () => `<span class="cube"></span>`).join("");
  const drinkSugar = S.log.reduce((s, e) => { const f = foodOf(e.foodId); return f && (f.cat === "饮料" || f.cat === "乳制品") ? s + f.sugar : s; }, 0);
  const drinkPct = t > 0 ? Math.round((drinkSugar / t) * 100) : 0;

  const entries = S.log.length === 0
    ? `<div class="empty">今天还没有记录，去「记录」页添加第一笔吧</div>`
    : S.log.map((e) => {
      const f = foodOf(e.foodId); if (!f) return "";
      const tr = traffic(f.sugar);
      return `<div class="card item" data-action="open-detail" data-food="${f.id}" data-entry="${e.id}">
        ${foodThumb(f.id, tr.cls)}
        <div class="grow"><div class="item-name">${f.name}</div><div class="item-sub">${f.serving} · ${e.time}</div></div>
        <span class="item-sugar ${tr.cls}">${f.sugar}g</span>
        <button class="icon-btn" data-action="remove-entry" data-entry="${e.id}" aria-label="删除记录">${icon("x", 14)}</button>
      </div>`;
    }).join("");

  const quick = ["milktea", "icetea", "yogurt"].map((id) => {
    const f = foodOf(id);
    return `<button class="chip" data-action="add" data-add="${id}">${foodThumb(id, traffic(f.sugar).cls, 26)} ${f.name}</button>`;
  }).join("");

  const insight = S.log.length > 0 ? `<div class="card insight">
      <span class="ico">${icon("info", 16)}</span>
      <div><div class="insight-title">今日 ${drinkPct}% 的隐形糖来自饮品与乳制品</div>
      <div class="insight-sub">液体糖吸收快、饱腹感低，是最容易被忽视的来源</div></div>
    </div>` : "";

  return `<div class="stack fade-in">
    <div class="row between">
      <div class="row" style="gap:6px"><span class="page-title">今天</span><span class="small muted">${dateStr()}</span></div>
      <span class="row small warn" style="gap:4px">${icon("flame", 13)} 连续记录 6 天</span>
    </div>
    <div class="card gauge-card">
      <div class="gauge">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="80" fill="none" style="stroke:var(--fill-mid)" stroke-width="12"/>
          <circle id="ring-progress" class="ring" cx="90" cy="90" r="80" fill="none" style="stroke:var(--${ringTone})" stroke-width="12" stroke-linecap="round" stroke-dasharray="0 ${C}" data-dash="${frac * C} ${C}" transform="rotate(-90 90 90)"/>
          <circle cx="${tickX}" cy="${tickY}" r="3.5" style="fill:var(--site-muted)"/>
        </svg>
        <div class="gauge-center">
          <div class="gauge-num">${fmt(t)}<small> g</small></div>
          <div class="gauge-label">隐形糖 / 目标 ${S.target}g</div>
        </div>
      </div>
      <div class="status-msg ${ringTone}">${status}</div>
      <div class="cubes">${cubeSquares}${cubeExtra}<span class="cube-note">≈ ${fmt(cubes(t))} 块方糖（4.5g/块）</span></div>
      <div class="gauge-foot">圆环刻度为目标 ${S.target}g · 满环为上限 50g</div>
    </div>
    ${insight}
    <div class="row between"><span class="section-title">今日记录</span><span class="small muted">${S.log.length} 笔</span></div>
    ${entries}
    <div class="row wrap" style="gap:8px">${quick}</div>
  </div>`;
}

function foodListHTML() {
  const filtered = FOODS.filter((f) => (S.cat === "全部" || f.cat === S.cat) && (!S.query || f.name.includes(S.query)));
  if (filtered.length === 0) return `<div class="empty">没有匹配「${esc(S.query)}」的食物，试试扫码识别</div>`;
  return filtered.map((f) => {
    const tr = traffic(f.sugar);
    return `<div class="card item" data-action="open-detail" data-food="${f.id}">
      ${foodThumb(f.id, tr.cls)}
      <div class="grow"><div class="item-name">${f.name}</div><div class="item-sub">${f.serving} · ${tr.label}</div></div>
      <span class="item-sugar ${tr.cls}">${f.sugar}g</span>
      <button class="add-btn" data-action="add" data-add="${f.id}" aria-label="记录${f.name}">${icon("plus", 15)}</button>
    </div>`;
  }).join("");
}
function renderLog() {
  const tags = CATS.map((c) => `<button class="tag ${S.cat === c ? "active" : ""}" data-action="set-cat" data-cat="${c}">${c}</button>`).join("");
  return `<div class="stack fade-in">
    <input id="food-search" class="search" type="search" placeholder="搜索食物或饮料…" value="${esc(S.query)}" />
    <div class="row" style="gap:10px">
      <div class="card scan-entry" data-action="open-scan"><span class="ico">${icon("scan", 22)}</span><span class="lbl">扫码识别</span><span class="sub">条形码 · 营养成分表</span></div>
      <div class="card scan-entry" data-action="open-scan"><span class="ico">${icon("camera", 22)}</span><span class="lbl">拍照识别</span><span class="sub">配料表 OCR</span></div>
    </div>
    <div class="row wrap" id="cat-tags" style="gap:6px">${tags}</div>
    <div class="stack tight" id="food-list">${foodListHTML()}</div>
    <div class="tiny faint center-text">演示数据库 ${FOODS.length} 条 · 糖量为常见份量估算</div>
  </div>`;
}
function updateFoodList() {
  const list = document.getElementById("food-list");
  if (list) list.innerHTML = foodListHTML();
  document.querySelectorAll('#cat-tags .tag').forEach((el) => el.classList.toggle("active", el.dataset.cat === S.cat));
}

function renderReport() {
  const t = total();
  const days = [...WEEK, { d: "今天", v: t }];
  const weekSum = days.reduce((s, d) => s + d.v, 0);
  const weekAvg = Math.round(weekSum / 7);
  const overDays = days.filter((d) => d.v > 25).length;
  const groups = { ...WEEK_GROUPS };
  S.log.forEach((e) => { const f = foodOf(e.foodId); if (f) { const g = groupOf(f); groups[g] = (groups[g] ?? 0) + f.sugar; } });
  const groupTotal = Object.values(groups).reduce((s, v) => s + v, 0);
  const top5 = Object.entries(groups).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const drinkPct = Math.round(((groups["含糖饮料"] + groups["奶茶"]) / groupTotal) * 100);
  const H = 140;
  const maxV = Math.max(60, ...days.map((d) => d.v));
  const barCls = (v) => (v > 50 ? "bad" : v > 25 ? "warn" : "ok");

  const lines = [25, 50].map((line) => `<div class="chart-line" style="bottom:${26 + (line / maxV) * H}px"><span>${line === 25 ? "理想 25g" : "上限 50g"}</span></div>`).join("");
  const bars = days.map((d) => `<div class="bar-col"><span class="bar-val">${d.v}</span><div class="bar" style="height:2px;background:var(--${barCls(d.v)})" data-h="${Math.max((d.v / maxV) * H, 2)}px"></div></div>`).join("");
  const labels = days.map((d) => `<div class="${d.d === "今天" ? "today" : ""}">${d.d}</div>`).join("");
  const sources = top5.map(([name, v], i) => {
    const pct = Math.round((v / groupTotal) * 100);
    return `<div class="src">
      <div class="src-head"><span class="src-name"><span class="src-rank">${i + 1}</span>${name}</span><span class="src-val">${v}g · ${pct}%</span></div>
      <div class="src-bar"><div class="src-fill" style="width:0;background:${SEQ[i % SEQ.length]}" data-w="${pct}%"></div></div>
    </div>`;
  }).join("");

  return `<div class="stack fade-in">
    <div class="row between"><span class="page-title">本周报告</span><span class="small muted">11/3 – 11/9 · 含今天实时记录</span></div>
    <div class="card stats">
      <div class="stat"><div class="stat-v">${weekAvg}g</div><div class="stat-l">日均隐形糖</div></div>
      <div class="stat"><div class="stat-v">${overDays}天</div><div class="stat-l">超过理想目标</div></div>
      <div class="stat"><div class="stat-v">${Math.round(weekSum / 4.5)}块</div><div class="stat-l">方糖合计</div></div>
    </div>
    <div class="card">
      <div class="section-title">每日隐形糖（g）</div>
      <div class="chart">${lines}<div class="bars">${bars}</div><div class="bar-labels">${labels}</div></div>
    </div>
    <div class="card">
      <div class="section-title">隐形糖来源 Top 5</div>
      <div class="tiny faint" style="margin-top:3px">占本周总量比例 · 示例周数据 + 今日实时</div>
      <div style="margin-top:12px">${sources}</div>
    </div>
    <div class="callout info"><div class="callout-title">${icon("info", 15)} 本周洞察</div>含糖饮料与奶茶合计贡献 ${drinkPct}% 的隐形糖。把每天一瓶冰红茶换成无糖茶，一周约少摄入 336g ≈ 75 块方糖。</div>
  </div>`;
}

function renderMe() {
  const reminders = [
    { key: "remindOver", label: "超标即时提醒" },
    { key: "remindNight", label: "每晚 21:00 记录提醒" },
    { key: "remindWeek", label: "每周一报告推送" },
  ].map((r) => `<div class="row between"><span style="font-size:13px">${r.label}</span><button class="switch ${S[r.key] ? "on" : ""}" data-action="toggle-remind" data-remind="${r.key}" role="switch" aria-checked="${S[r.key]}" aria-label="${r.label}"></button></div>`).join("");
  const menus = [
    { menu: "db", label: "食物数据库", val: `${FOODS.length} 条 · 演示` },
    { menu: "admin", label: "数据后台", val: "管理员" },
    { menu: "privacy", label: "数据与隐私", val: "" },
    { menu: "about", label: "关于隐糖", val: "v0.2" },
  ].map((m) => `<div class="card menu-row" data-action="menu" data-menu="${m.menu}"><span class="grow">${m.label}</span><span class="val">${m.val}</span><span class="chev">${icon("chevron", 14)}</span></div>`).join("");
  const sync = syncView();
  const guest = guestId() || "";

  return `<div class="stack fade-in">
    <div class="card row" style="gap:12px">
      <span class="avatar">隐</span>
      <div><div style="font-size:14px;font-weight:600">控糖练习生</div><div class="small muted" style="margin-top:3px">已坚持记录 6 天 · 本周累计少摄入约 120g</div></div>
    </div>
    <div class="card">
      <div class="section-title">每日隐形糖目标</div>
      <div class="row" style="gap:8px;margin-top:11px">
        <button class="tag ${S.target === 25 ? "active" : ""}" data-action="set-target" data-target="25">25g · 理想</button>
        <button class="tag ${S.target === 50 ? "active" : ""}" data-action="set-target" data-target="50">50g · 上限</button>
      </div>
      <div class="small muted" style="margin-top:11px;line-height:1.6">WHO 与中国居民膳食指南建议：每日添加糖最好控制在 25g 以内，不超过 50g。</div>
    </div>
    <div class="card">
      <div class="section-title">提醒</div>
      <div class="stack" style="gap:13px;margin-top:13px">${reminders}</div>
    </div>
    <div class="card">
      <div class="row between">
        <span class="section-title" style="margin:0">数据同步</span>
        <button class="pill ${sync.cls}" id="sync-chip" data-action="retry-sync">${sync.label}</button>
      </div>
      <div class="small muted" style="margin-top:11px;line-height:1.7">${REPORTING
        ? "你以游客身份使用，无需注册。你在本页之后<b>手动新增</b>的记录会匿名上传，用于管理端的汇总统计；首次进入时预置的 2 条示例记录留在本机，不计入统计。"
        : "当前是<b>本地演示模式</b>：这份静态副本只把记录保存在你自己手机上，不会上传，也不计入管理端统计。需要真实上报请使用正式站点。"}</div>
      <div class="row between" style="margin-top:11px"><span class="tiny faint">本机访客编号</span><span class="tiny faint" style="font-family:ui-monospace,monospace">${guest ? guest.slice(0, 8) + "…" : "不可用"}</span></div>
    </div>
    <div class="callout info"><div class="callout-title">${icon("info", 15)} 配料表识糖技巧</div>配料表按含量降序排列：前 3 位出现白砂糖、果葡糖浆、麦芽糖浆即高糖预警。「0 蔗糖」≠ 0 糖，可能仍含果糖或浓缩果汁。</div>
    ${menus}
  </div>`;
}

/* ===== Overlays ===== */
function renderDetail() {
  if (!S.detail) return "";
  const f = foodOf(S.detail.foodId); if (!f) return "";
  const tr = traffic(f.sugar);
  const isEntry = S.detail.entryId !== undefined;
  const action = isEntry
    ? `<button class="btn-primary btn-danger" data-action="detail-remove" data-entry="${S.detail.entryId}">删除这条记录</button>`
    : `<button class="btn-primary" data-action="detail-add" data-food="${f.id}">加入今日记录</button>`;
  return `<div class="scrim" data-action="close-detail"></div>
  <div class="sheet" role="dialog" aria-modal="true" aria-label="${f.name}">
    <div class="sheet-handle"></div>
    <div class="row between">
      <div class="row" style="gap:11px">${foodThumb(f.id, tr.cls, 54)}<span class="detail-name">${f.name}</span></div>
      <button class="icon-btn" data-action="close-detail" aria-label="关闭">${icon("x", 17)}</button>
    </div>
    <div class="row" style="gap:6px;margin-top:9px"><span class="pill ${tr.cls}">${tr.label}</span><span class="pill">${f.cat}</span></div>
    <div class="row" style="gap:6px;align-items:baseline;margin:15px 0 5px"><span class="detail-sugar ${tr.cls}">${f.sugar}g</span><span class="detail-unit">糖 / ${f.serving}</span></div>
    <div class="small muted">≈ ${fmt(cubes(f.sugar))} 块方糖 · ${f.per}</div>
    <div class="divider"></div>
    <div class="section-title">隐形糖解析</div>
    <div class="body" style="color:var(--fg-soft);margin-top:5px">${f.tip}</div>
    <div class="section-title" style="margin-top:13px">更优替代</div>
    <div class="body ok" style="margin-top:5px">${f.alt}</div>
    <div style="margin-top:18px">${action}</div>
  </div>`;
}

function renderScan() {
  if (!S.scan.open) return "";
  const camera = S.scan.stage === "camera";
  const corners = [
    { top: 12, left: 12, bt: 1, bl: 1 }, { top: 12, right: 12, bt: 1, br: 1 },
    { bottom: 12, left: 12, bb: 1, bl: 1 }, { bottom: 12, right: 12, bb: 1, br: 1 },
  ].map((p) => {
    const pos = `top:${p.top ?? "auto"};left:${p.left ?? "auto"};right:${p.right ?? "auto"};bottom:${p.bottom ?? "auto"};`;
    const bd = `border-top:${p.bt ? "2px solid var(--site-accent)" : "0"};border-left:${p.bl ? "2px solid var(--site-accent)" : "0"};border-right:${p.br ? "2px solid var(--site-accent)" : "0"};border-bottom:${p.bb ? "2px solid var(--site-accent)" : "0"};`;
    return `<span class="corner" style="${pos}${bd}"></span>`;
  }).join("");
  const body = camera
    ? `<div class="stack" style="flex:1;gap:14px;margin-top:14px">
        <div class="viewfinder">${corners}<span class="scanline"></span></div>
        <div class="small muted center-text">对准包装条形码或营养成分表（原型为模拟识别）</div>
        <button class="btn-primary" data-action="scan-result">模拟识别结果</button>
      </div>`
    : `<div class="scan-body"><div class="stack">
        <div class="row" style="gap:6px"><span class="pill ok">识别成功</span><span class="small muted">已匹配：冰红茶 500ml</span></div>
        <div class="card">
          <div class="section-title">营养成分表（识别摘录）</div>
          <div style="margin-top:10px">
            <div class="nutri-row head"><span>项目</span><span>每 100ml</span></div>
            <div class="nutri-row"><span>能量</span><span>190 kJ</span></div>
            <div class="nutri-row"><span>碳水化合物</span><span>9.6 g</span></div>
            <div class="nutri-row hl"><span>— 糖</span><span>9.6 g</span></div>
          </div>
        </div>
        <div class="callout warning"><div class="callout-title">${icon("info", 15)} 换算整瓶 500ml</div>≈ 48g 糖 ≈ 10.7 块方糖，一瓶就超过每日理想目标（25g）。</div>
        <button class="btn-primary" data-action="scan-add">加入今日记录</button>
      </div></div>`;
  return `<div class="scan">
    <div class="row between"><span class="scan-title">${camera ? "扫描识别" : "识别结果"}</span><button class="icon-btn" data-action="close-scan" aria-label="关闭扫码">${icon("x", 17)}</button></div>
    ${body}
  </div>`;
}

function renderToast() {
  if (!S.toast) return "";
  return `<div class="toast" role="status">
    <span class="check">${icon("check", 15)}</span>
    <span class="toast-msg">${esc(S.toast.msg)}</span>
    <button class="toast-undo" data-action="toast-undo" data-entry="${S.toast.entryId}">撤销</button>
    <button class="icon-btn" data-action="toast-close" aria-label="关闭提示">${icon("x", 13)}</button>
  </div>`;
}

function renderInfo() {
  if (!S.info) return "";
  return `<div class="scrim" data-action="close-info"></div>
  <div class="info-card" role="dialog" aria-modal="true" aria-label="${esc(S.info.title)}">
    <div class="info-title">${esc(S.info.title)}</div>
    <div class="info-body">${S.info.body}</div>
    <div style="margin-top:16px"><button class="btn-primary" data-action="close-info">知道了</button></div>
  </div>`;
}

/* ===== Render ===== */
const PAGES = { today: renderToday, log: renderLog, report: renderReport, me: renderMe };
function render() {
  document.getElementById("content").innerHTML = PAGES[S.tab]();
  document.querySelectorAll("#tabbar .tab").forEach((el) => {
    const on = el.dataset.tab === S.tab;
    el.classList.toggle("active", on);
    el.setAttribute("aria-current", on ? "page" : "false");
  });
  document.getElementById("overlay").innerHTML = renderDetail() + renderScan() + renderInfo() + renderToast();
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const ring = document.getElementById("ring-progress");
    if (ring) ring.setAttribute("stroke-dasharray", ring.dataset.dash);
    document.querySelectorAll(".bar[data-h]").forEach((b) => { b.style.height = b.dataset.h; });
    document.querySelectorAll(".src-fill[data-w]").forEach((b) => { b.style.width = b.dataset.w; });
  }));
}

/* ===== Events ===== */
const INFO = {
  privacy: { title: "数据与隐私", body: REPORTING
    ? "记录先保存在本机浏览器（localStorage）。你手动新增的每一笔会以<b>随机访客编号</b>匿名上报，服务端只保存：访客编号、记录日期、食物编号、由服务端计算的糖量和你选择的目标——不含昵称、位置、设备标识或任何账号。<br/>管理端只读取<b>聚合统计</b>，看不到某个访客的单条记录。清除浏览器站点数据会重置全部记录，并生成一个新的访客编号。"
    : "此副本为<b>本地演示模式</b>：所有记录只写入本机浏览器（localStorage），不上传服务器，也不进入任何统计。清除浏览器站点数据会重置全部记录，并生成一个新的访客编号。" },
  about: { title: "关于隐糖", body: "隐糖 SugarLens v0.2 · 可交互 H5 原型，含游客上报与管理员统计后台。<br/>食物糖量为常见份量估算值（参考包装营养标签与中国食物成分表），仅用于演示，不构成营养建议。" },
};
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const a = el.dataset.action;
  if (a === "tab") setTab(el.dataset.tab);
  else if (a === "add") addFood(el.dataset.add);
  else if (a === "open-detail") { S.detail = { foodId: el.dataset.food, entryId: el.dataset.entry }; render(); }
  else if (a === "remove-entry") removeEntry(el.dataset.entry);
  else if (a === "close-detail") { S.detail = null; render(); }
  else if (a === "detail-add") { S.detail = null; S.tab = "today"; addFood(el.dataset.food); }
  else if (a === "detail-remove") { S.detail = null; removeEntry(el.dataset.entry); }
  else if (a === "open-scan") { S.scan = { open: true, stage: "camera" }; render(); }
  else if (a === "close-scan") { S.scan = { open: false, stage: "camera" }; render(); }
  else if (a === "scan-result") { S.scan.stage = "result"; render(); }
  else if (a === "scan-add") { S.scan = { open: false, stage: "camera" }; S.tab = "today"; addFood("icetea"); }
  else if (a === "set-cat") { S.cat = el.dataset.cat; updateFoodList(); }
  else if (a === "set-target") { S.target = Number(el.dataset.target); save(); render(); }
  else if (a === "toggle-remind") { S[el.dataset.remind] = !S[el.dataset.remind]; save(); render(); }
  else if (a === "toast-undo") { S.toast = null; removeEntry(el.dataset.entry); }
  else if (a === "toast-close") { S.toast = null; render(); }
  else if (a === "retry-sync") flush();
  else if (a === "menu") {
    const m = el.dataset.menu;
    if (m === "db") setTab("log");
    else if (m === "admin") window.location.href = "/admin.html";
    else { S.info = INFO[m]; render(); }
  }
  else if (a === "close-info") { S.info = null; render(); }
});
document.addEventListener("input", (e) => {
  if (e.target.id === "food-search") { S.query = e.target.value; updateFoodList(); }
});

/* ===== Init ===== */
load();
render();
flush();
window.addEventListener("online", flush);
document.addEventListener("visibilitychange", () => { if (!document.hidden) flush(); });