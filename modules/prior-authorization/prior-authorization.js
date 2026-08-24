/* Prior Authorization module — ported from v64's renderPriorAuth()
   (sirius_clearance_specialist_v64.html, ~line 2726) and its filter toolbar
   markup (~line 1633–1653). Same filter/search behavior, same "CASES IN
   PRIOR AUTH STAGE" table (case #, patient, drug, payer, priority, status,
   received), same clear-filters affordance and live result count.

   Deviations from the source (see report to caller for detail):
   - Row click here navigates to a sibling case-detail.html?id=... page
     (this isn't a SPA — see the per-module page convention) instead of calling
     v64's in-page selectCase()/toggleDetail() drawer.
   - v64 derives the STATUS badge from a case's nested pas[] PA-workflow
     state via caseStateBdg(). This trimmed dataset doesn't carry pas[], so
     statusBdg() below maps the case's plain-text `status` string to a badge
     tone directly instead. */

function prioBdg(p) {
  return `<span class="prio ${String(p || "").toLowerCase()}">${p}</span>`;
}

const PA_STATUS_TONE = {
  "Pending Review": "gray",
  "Review In Progress": "warn",
  "Awaiting BV (Insights)": "warn",
  "Blocked": "err",
  "PA Submitted": "ok",
  "Complete — no PA": "ok"
};
function statusBdg(status) {
  const tone = PA_STATUS_TONE[status] || "gray";
  return `<span class="bdg ${tone}"><span class="d"></span>${esc(status || "—")}</span>`;
}

function clearPriorAuthFilters() {
  ["paf_search", "paf_payer", "paf_prio", "paf_status"].forEach(id => {
    const el = $(id);
    if (el) el.value = "";
  });
  renderPriorAuth();
}

function renderPriorAuth() {
  const body = $("priorAuthBody");
  if (!body) return;
  const all = (window.PA_CASES || []).filter(c => c.stage === 3);

  /* populate status dropdown once, from the statuses present at this stage */
  const sSel = $("paf_status");
  if (sSel && sSel.options.length <= 1) {
    [...new Set(all.map(c => c.status))].sort().forEach(s => {
      const o = document.createElement("option");
      o.value = s;
      o.textContent = s;
      sSel.appendChild(o);
    });
  }

  const q = (($("paf_search") || {}).value || "").toLowerCase();
  const fPayer = ($("paf_payer") || {}).value || "";
  const fPrio = ($("paf_prio") || {}).value || "";
  const fStat = ($("paf_status") || {}).value || "";
  const active = [q, fPayer, fPrio, fStat].some(v => v);
  const cl = $("paf_clear");
  if (cl) cl.style.display = active ? "inline" : "none";

  const list = all.filter(c =>
    (!q || c.id.toLowerCase().includes(q) || c.patient.toLowerCase().includes(q) || (c.drug || "").toLowerCase().includes(q)) &&
    (!fPayer || c.payer === fPayer) &&
    (!fPrio || c.prio === fPrio) &&
    (!fStat || c.status === fStat)
  );

  const meta = $("paMetaCnt");
  if (meta) meta.textContent = `${list.length} of ${all.length} case${all.length === 1 ? "" : "s"}`;

  body.innerHTML = `
   <div class="panel" style="margin-top:0">
     <div class="p-t">${ic("clipcheck", "color:var(--teal)")} &nbsp;CASES IN PRIOR AUTH STAGE
       <span style="font-size:10px;color:var(--t4);font-weight:400;margin-left:6px">${list.length} shown</span></div>
     <table class="mini"><thead><tr><th>CASE #</th><th>PATIENT</th><th>DRUG</th><th>PAYER</th><th>PRIORITY</th><th>STATUS</th><th>CREATED ON</th><th>UPDATED</th></tr></thead>
     <tbody>${list.map(c => { const audit = AuditStamp.stampFor(c.id); return `<tr onclick="location.href='../case-management/case-detail.html?id=${encodeURIComponent(c.id)}'">
        <td class="caseid">${esc(c.id)}</td><td><b>${esc(c.patient)}</b></td>
        <td>${esc(c.drug)}</td><td style="color:var(--t3)">${esc(c.payer)}</td>
        <td>${prioBdg(c.prio)}</td><td>${statusBdg(c.status)}</td>
        <td class="mono" style="color:var(--t3)">${esc(c.received)}</td>
        <td class="mono" style="color:var(--t3)">${esc(audit.updatedOn)}<span class="sub"> by ${esc(audit.updatedBy)}</span></td></tr>`; }).join("")
      || `<tr><td colspan="8" style="color:var(--t4);padding:14px 12px">${all.length ? "No cases match your filters." : "No cases are currently in the Prior Auth stage."}</td></tr>`}
     </tbody></table>
   </div>`;

  injectIcons(body);
}

document.addEventListener("DOMContentLoaded", () => {
  Shell.init("priorauth");
  renderPriorAuth();
});
