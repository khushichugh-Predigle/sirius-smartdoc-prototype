/* Case Management (list) module — ported from v64's renderCases()/renderChips()/renderPager()/
 * filtered()/setSort()/toggleCasesFilters()/clearCasesFilters()/updateCasesFilterCount()
 * (sirius_clearance_specialist_v64.html, ~lines 2656-2900), plus the badge/pill helpers
 * caseState()/caseStateBdg()/prioBdg()/slaCell() (~lines 2656-2662, 3766-3776) and the
 * PA-readiness roll-up rule (caseState) that those depend on.
 *
 * Static prototype: everything resets on reload, matching intake-requests.js /
 * document-detail.js / patients.js in this repo. There's no SPA router here — a row
 * click navigates to the sibling case-detail.html?id=... page (built separately) instead
 * of opening v64's in-page bottom drawer, so the drag-resize detail drawer and its
 * dtMode/toggleDetail/selectCase-with-lock-notice machinery are intentionally not ported
 * into this module (case-detail.html owns that per-case experience).
 */

let page = 1, pageSize = 25;
let fStatus = "";
let sortCol = "received", sortAsc = false;

const COLS = [
  ["id", "Case #"], ["patient", "Patient"], ["dob", "DOB"], ["drug", "Drug"], ["payer", "Payer"],
  ["caseStatus", "Case Status"], ["paReq", "PA Req"], ["prio", "Priority"],
  ["sla", "SLA"], ["received", "Created On"],
];
const PRIO_ORD = { STAT: 0, URGENT: 1, ROUTINE: 2 };
const isClosed = (c) => ["PA Submitted", "Complete — no PA"].includes(c.status);

/* Case roll-up derived from PA state only, same rule as v64's caseState():
 * Open = every PA is TBD · Completed = every PA Approved/Denied · else In Progress.
 * Cases without a `pas[]` array (nothing routed to PA yet) fall back to the stage. */
function caseState(c) {
  const ps = (c.pas || []).filter((p) => p.paRequired !== false);
  if (!ps.length) return c.stage >= 3 ? "In Progress" : "Open";
  if (ps.every((p) => p.state === "TBD")) return "Open";
  if (ps.every((p) => p.state === "Approved" || p.state === "Denied")) return "Completed";
  return "In Progress";
}
function caseStateBdg(c) {
  const s = caseState(c);
  const m = { Open: "gray", "In Progress": "warn", Completed: "ok" };
  return '<span class="bdg ' + m[s] + '"><span class="d"></span>' + s + "</span>";
}
function prioBdg(p) {
  return `<span class="prio ${p.toLowerCase()}">${p}</span>`;
}
function slaCell(c) {
  if (c.status === "Re-processing") return `<span style="font-size:10px;color:#5B21B6;font-weight:600"><span class="spin" style="width:11px;height:11px;border-width:2px;vertical-align:-2px"></span> AI re-processing</span>`;
  if (c.status.startsWith("Awaiting")) return `<span style="font-size:10px;color:var(--t4)">external — Insights</span>`;
  if (isClosed(c)) return `<span style="font-size:10px;color:var(--t4)">—</span>`;
  const pct = Math.min(100, Math.round((c.ageH / c.slaH) * 100));
  const cls = pct >= 100 ? "r" : pct >= 70 ? "a" : "g";
  const rem = c.slaH - c.ageH;
  const t = rem < 0 ? `${Math.abs(rem).toFixed(0)}h over` : `${rem.toFixed(0)}h left`;
  return `<span class="sla ${cls}"><span class="bar"><i style="width:${pct}%"></i></span><span class="t">${t}</span></span>`;
}

function filtered() {
  const q = ($("fSearch").value || "").toLowerCase();
  const ff_pat = (($("cff_patient") || {}).value || "").toLowerCase();
  const ff_drug = (($("cff_drug") || {}).value || "").toLowerCase();
  const ff_payer = (($("cff_payer") || {}).value || "").toLowerCase();
  const ff_prio = (($("cff_prio") || {}).value || "").toUpperCase();
  const ff_pareq = ($("cff_pareq") || {}).value || "";
  const ff_recv = (($("cff_recv") || {}).value || "").toLowerCase();
  const ff_status = ($("cff_status") || {}).value || "";
  updateCasesFilterCount();

  let rows = window.CASES.filter((c) => {
    if (fStatus && caseState(c) !== fStatus) return false;
    if (q && !(c.id + " " + c.patient + " " + c.drug + " " + c.payer + " " + c.member + " " + c.status).toLowerCase().includes(q)) return false;
    if (ff_pat && !c.patient.toLowerCase().includes(ff_pat)) return false;
    if (ff_drug && !c.drug.toLowerCase().includes(ff_drug)) return false;
    if (ff_payer && !c.payer.toLowerCase().includes(ff_payer)) return false;
    if (ff_prio && c.prio !== ff_prio) return false;
    if (ff_pareq === "yes" && c.paReq !== true) return false;
    if (ff_pareq === "no" && c.paReq !== false) return false;
    if (ff_pareq === "null" && c.paReq !== null) return false;
    if (ff_recv && !c.received.toLowerCase().includes(ff_recv)) return false;
    if (ff_status && c.status !== ff_status) return false;
    return true;
  });

  rows.sort((a, b) => {
    let va, vb;
    if (sortCol === "prio") {
      va = PRIO_ORD[a.prio]; vb = PRIO_ORD[b.prio];
      if (va === vb) { va = -(a.ageH / a.slaH); vb = -(b.ageH / b.slaH); }
    } else if (sortCol === "sla") {
      va = a.slaH - a.ageH; vb = b.slaH - b.ageH;
    } else if (sortCol === "caseStatus") {
      va = caseState(a); vb = caseState(b);
    } else {
      va = String(a[sortCol] || ""); vb = String(b[sortCol] || "");
    }
    return (va < vb ? -1 : va > vb ? 1 : 0) * (sortAsc ? 1 : -1);
  });
  return rows;
}

function renderChips() {
  const cnt = (s) => window.CASES.filter(s).length;
  const defs = [
    ["", "All", cnt(() => true), "var(--t4)"],
    ["Open", "Open", cnt((c) => caseState(c) === "Open"), "var(--t4)"],
    ["In Progress", "In Progress", cnt((c) => caseState(c) === "In Progress"), "var(--warn)"],
    ["Completed", "Completed", cnt((c) => caseState(c) === "Completed"), "var(--ok)"],
  ];
  $("statusChips").innerHTML = defs
    .map(([k, l, n, col]) => `<span class="chip ${fStatus === k ? "on" : ""}" onclick="fStatus='${k}';page=1;renderCases()"><span class="dot" style="background:${col}"></span>${l} (${n})</span>`)
    .join(" ");
}

function renderPager(total) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (page > pages) page = pages;
  const from = total ? (page - 1) * pageSize + 1 : 0, to = Math.min(total, page * pageSize);
  let nums = [];
  for (let p = 1; p <= pages; p++) {
    if (p === 1 || p === pages || Math.abs(p - page) <= 2) nums.push(p);
    else if (nums[nums.length - 1] !== "…") nums.push("…");
  }
  $("pager").innerHTML = `
    <span>Rows <b>${from}–${to}</b> of <b>${total}</b></span>
    <span style="margin-left:6px">Per page</span>
    <select class="tb-input" style="height:22px;width:58px" onchange="pageSize=+this.value;page=1;renderCases()">
      ${[25, 50, 100].map((n) => `<option ${n === pageSize ? "selected" : ""}>${n}</option>`).join("")}
    </select>
    <div class="spacer"></div>
    <button class="pg" ${page === 1 ? "disabled" : ""} onclick="page=1;renderCases()">«</button>
    <button class="pg" ${page === 1 ? "disabled" : ""} onclick="page--;renderCases()">‹ Prev</button>
    ${nums.map((p) => (p === "…" ? `<span style="padding:0 3px">…</span>` : `<button class="pg ${p === page ? "cur" : ""}" onclick="page=${p};renderCases()">${p}</button>`)).join("")}
    <button class="pg" ${page === pages ? "disabled" : ""} onclick="page++;renderCases()">Next ›</button>
    <button class="pg" ${page === pages ? "disabled" : ""} onclick="page=${pages};renderCases()">»</button>`;
}

function renderCases() {
  renderChips();
  const all = filtered();
  renderPager(all.length);
  const rows = all.slice((page - 1) * pageSize, page * pageSize);
  $("rowMeta").textContent = `${all.length} of ${window.CASES.length} my cases · sorted by ${sortCol} ${sortAsc ? "▲" : "▼"}`;

  $("casesGrid").querySelector("thead").innerHTML =
    "<tr>" + COLS.map(([k, l]) => `<th onclick="setSort('${k}')">${l} ${sortCol === k ? `<span class="arr">${sortAsc ? "▲" : "▼"}</span>` : ""}</th>`).join("") +
    `<th>Updated</th></tr>`;

  $("casesGrid").querySelector("tbody").innerHTML = rows
    .map(
      (c) => {
        const audit = AuditStamp.stampFor(c.id);
        return `
   <tr class="${c.status === "Blocked" ? "blocked-row" : ""}" onclick="location.href='case-detail.html?id=${encodeURIComponent(c.id)}'">
    <td class="caseid">${c.id}</td>
    <td><b>${esc(c.patient)}</b></td>
    <td class="mono">${c.dob}</td>
    <td>${esc(c.drug)}<span class="sub"> ${esc(c.dose || "")}</span></td>
    <td>${esc(c.payer)}</td>
    <td>${caseStateBdg(c)}</td>
    <td>${c.paReq === null ? '<span class="bdg gray">—</span>' : c.paReq ? '<span class="bdg purp">Yes</span>' : '<span class="bdg gray">No</span>'}</td>
    <td>${prioBdg(c.prio)}</td>
    <td>${slaCell(c)}</td>
    <td class="mono" style="color:var(--t3)">${c.received}</td>
    <td class="mono" style="color:var(--t3)">${audit.updatedOn}<span class="sub"> by ${esc(audit.updatedBy)}</span></td>
   </tr>`;
      }
    )
    .join("");

  injectIcons(document);
}

function setSort(k) {
  if (sortCol === k) sortAsc = !sortAsc;
  else { sortCol = k; sortAsc = true; }
  page = 1;
  renderCases();
}

function toggleCasesFilters() {
  const p = $("casesFilterPanel"), b = $("casesFilterBtn");
  const open = p.classList.toggle("open");
  b.classList.toggle("active", open);
}
function clearCasesFilters() {
  ["cff_patient", "cff_drug", "cff_payer", "cff_prio", "cff_pareq", "cff_recv", "cff_status"].forEach((id) => {
    const el = $(id);
    if (el) el.value = "";
  });
  updateCasesFilterCount();
  page = 1;
  renderCases();
}
function updateCasesFilterCount() {
  const vals = ["cff_patient", "cff_drug", "cff_payer", "cff_prio", "cff_pareq", "cff_recv", "cff_status"].map((id) => ($(id) || {}).value || "").filter((v) => v);
  const n = vals.length;
  const badge = $("casesFilterCount");
  if (badge) { badge.style.display = n ? "inline-flex" : "none"; badge.textContent = n; }
  const btn = $("casesFilterBtn");
  if (btn) btn.classList.toggle("active", n > 0);
}

document.addEventListener("DOMContentLoaded", () => {
  Shell.init("cases");
  renderCases();
});
