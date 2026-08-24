/* Dashboard module — ported from v64's renderSpecDash() (Clearance Specialist
 * dashboard), sirius_clearance_specialist_v64.html ~line 5041. This prototype's
 * "Viewing as" is cosmetic-only (no real role gating, see js/shell.js), so
 * renderSpecDash() is ported as the one real dashboard — v64's renderClerkDash()/
 * renderITAdminDash()/renderSuperAdminDash() variants for the other roles were
 * not ported (out of scope per the task brief).
 * Data: window.DASHBOARD_CASES / window.ME, data/dashboard-data.js. */

const STAGE_AB = ["INTAKE", "SETUP", "PRIOR AUTH"];
const PRIO_ORD = { STAT: 0, URGENT: 1, ROUTINE: 2 };
const CLEARANCE_BUCKET = {
  "Pending Triage": "Open", "Pending Referral Information": "Open", "Pending Active Insurance": "Open",
  "Pending Benefit Verification": "Open", "Pending Benefit Verification in Progress": "Open",
  "Pending BV Only/Referral Source Decision": "Open",
  "Pending Prior Authorization": "In Progress", "Pending Medical Records": "In Progress",
  "Pending Clinical Evaluation": "In Progress", "Pending LOA/Form/GAP/PCP Referral": "In Progress",
  "Pending Contracting Intervention": "In Progress", "Pending Management Review": "In Progress",
  "Pending Ops Intervention": "In Progress", "Pending Patient Contact": "In Progress",
  "Pending Prescriber Intervention": "In Progress", "Pending Product Availability": "In Progress",
  "Pending Sales Intervention": "In Progress", "Pending Financial Assistance Outcome": "In Progress",
  "Pending Discharge/PICC Line/1st Dose": "In Progress",
  "Pending SOC": "Completed", "Pending Denial Appeal": "Completed", "Pending Denial-Additional Info Needed": "Completed",
  "Pending Denial-Non-Formulary": "Completed", "Pending Denial-Not Covered Benefit": "Completed",
  "Pending Denial-Not Medical Necessary": "Completed", "Pending Denial-Off Label Diagnosis": "Completed",
};

const isClosed = (c) => ["PA Submitted", "Complete — no PA"].includes(c.status);
const ownsView = (c) => c.assigned === ME;

function caseState(c) {
  const ps = (c.pas || []).filter((p) => p.paRequired !== false);
  if (!ps.length) return CLEARANCE_BUCKET[c.clearance] || "Open";
  if (ps.every((p) => p.state === "TBD")) return "Open";
  if (ps.every((p) => p.state === "Approved" || p.state === "Denied")) return "Completed";
  return "In Progress";
}

function statusBdg(c) {
  const s = c.status;
  if (s === "Blocked") return `<span class="bdg err"><span class="d"></span>Blocked</span>`;
  if (s === "Re-processing") return `<span class="bdg proc"><span class="d"></span>Re-processing</span>`;
  if (s === "Returned for Documents") return `<span class="bdg docreq"><span class="d"></span>Returned for Documents</span>`;
  if (s.startsWith("Awaiting")) return `<span class="bdg gray"><span class="d"></span>${s}</span>`;
  if (["Completed", "Review Completed", "Created", "PA Submitted", "Complete — no PA"].includes(s))
    return `<span class="bdg ok"><span class="d"></span>${s}</span>`;
  if (s === "Review In Progress") return `<span class="bdg blue"><span class="d"></span>In Review</span>`;
  return `<span class="bdg warn"><span class="d"></span>${s}</span>`;
}

function nextAction(c) {
  if (c.status === "Blocked") return "Resolve the block reason, then resume the stage.";
  if (c.status === "Re-processing") return "Document type changed — AI is re-classifying & re-extracting. Fields refresh automatically.";
  if (c.stage === 1) return "Clerk: verify extracted data, reclassify/attach documents, then complete intake → Submit to CPR+ for BV (Intake Review tab).";
  if (c.status === "Complete — no PA") return "Case complete — closed with no PA required.";
  if (c.status === "Awaiting BV (Insights)") return "BV is running externally in Insights. Returns automatically when complete; then set the PA decision (Verification tab).";
  if (c.stage === 2) return "BV is back — review benefit verification and set the PA Required decision (Verification tab).";
  if (c.status === "Returned for Documents") return "User Review flagged missing documents — attach the required documents, then resume the PA review (Prior Auth tab).";
  if (c.pa && c.pa.submitted) return "PA submitted to " + c.pa.portal + " — monitor payer determination on the PA Status page.";
  return "Review the AI-filled PA form, supporting documents and evidence, clear the User Review check, then submit to the payer via " + (c.pa ? c.pa.portal : "the portal") + " (Prior Auth tab).";
}

/* v64's workNext() jumps into the top case in the prioritized queue; here (no
 * case-detail view wired up yet in this port) it's simulated with a toast,
 * same simplification pattern as other cross-module stub links in this repo. */
function workNext() {
  toast("Opening next prioritized case (simulated) — see Case Management");
}

function renderDash() {
  const CASES = window.DASHBOARD_CASES || [];
  const mine = CASES.filter(ownsView);
  const active = mine.filter((c) => !isClosed(c));
  const pend = mine.filter((c) => c.status === "Pending Review").length;
  const blocked = mine.filter((c) => c.status === "Blocked");
  const awaitingPayer = CASES.filter((c) => c.assigned === ME && c.status === "PA Submitted");
  const urgent = active.filter((c) => c.prio === "STAT" || c.prio === "URGENT");
  const prioSort = (a, b) => {
    const d = PRIO_ORD[a.prio] - PRIO_ORD[b.prio];
    return d !== 0 ? d : b.ageH - a.ageH;
  };

  $("dashBody").innerHTML = `
   <div class="kpis">
     <div class="kpi" onclick="location.href='../../modules/case-management/case-management.html'"><div class="l">MY ACTIVE CASES</div><div class="v">${active.length}</div><div class="s mu">of ${mine.length} assigned to me</div></div>
     <div class="kpi" onclick="location.href='../../modules/case-management/case-management.html?status=Pending%20Review'"><div class="l">PENDING REVIEW</div><div class="v">${pend}</div><div class="s mu">awaiting my review</div></div>
     <div class="kpi alert" onclick="location.href='../../modules/case-management/case-management.html?status=Blocked'"><div class="l">BLOCKED</div><div class="v" style="color:var(--err)">${blocked.length}</div><div class="s dn">needs outreach follow-up</div></div>
     <div class="kpi" onclick="location.href='../../modules/prior-authorization/prior-authorization.html'"><div class="l">PAs AWAITING PAYER</div><div class="v">${awaitingPayer.length}</div><div class="s mu">monitor on PA Status</div></div>
     <div class="kpi ${urgent.length ? "alert" : ""}"><div class="l">STAT / URGENT</div><div class="v" style="color:${urgent.length ? "var(--warn)" : "var(--t1)"}">${urgent.length}</div><div class="s mu">high-priority active</div></div>
     <div class="kpi"><div class="l">COMPLETED TODAY</div><div class="v" style="color:var(--ok)">12</div><div class="s up">▲ 20% vs yesterday</div></div>
   </div>
   <div class="dash-cols">
    <div class="panel">
     <div class="p-t">${ic("zap", "color:var(--teal)")} &nbsp;MY WORK QUEUE — PRIORITIZED <div class="spacer"></div>
       <button class="btn xs primary" style="margin-right:8px" onclick="workNext()">${ic("play")} Work next case</button>
       <a href="../../modules/case-management/case-management.html">Open cases →</a></div>
     <table class="mini"><thead><tr><th>CASE #</th><th>PATIENT</th><th>DRUG</th><th>PAYER</th><th>STAGE</th><th>STATUS</th><th>NEXT ACTION</th></tr></thead><tbody>
      ${active.slice().sort(prioSort).slice(0, 7).map((c) => `
        <tr onclick="location.href='../../modules/case-management/case-management.html?id=${c.id}'"><td class="caseid">${c.id}</td><td><b>${esc(c.patient)}</b></td>
        <td>${esc(c.drug)}</td><td style="color:var(--t3)">${esc(c.payer)}</td>
        <td>${STAGE_AB[c.stage - 1]}</td><td>${statusBdg(c)}</td>
        <td style="max-width:210px;overflow:hidden;text-overflow:ellipsis;color:var(--t3)">${nextAction(c)}</td></tr>`).join("")}
     </tbody></table>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">
     <div class="panel">
      <div class="p-t">${ic("block", "color:var(--err)")} &nbsp;BLOCKED — FOLLOW UP</div>
      <table class="mini"><tbody>
       ${blocked.slice(0, 6).map((c) => `<tr onclick="location.href='../../modules/case-management/case-management.html?id=${c.id}'"><td class="caseid">${c.id}</td><td><b>${esc(c.patient)}</b></td><td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;color:var(--t3)">${esc(c.blockReason || "")}</td></tr>`).join("") || `<tr><td style="color:var(--t4);padding:8px 10px">No blocked cases right now.</td></tr>`}
       ${blocked.length > 6 ? `<tr onclick="location.href='../../modules/case-management/case-management.html'"><td colspan="3" style="color:var(--teal);font-weight:600">+ ${blocked.length - 6} more — view all blocked →</td></tr>` : ""}
      </tbody></table>
     </div>
     <div class="panel">
      <div class="p-t">CASES BY STATUS</div>
      <table class="mini"><tbody>
       ${["Open", "In Progress", "Completed"].map((st) => {
         const n = active.filter((c) => caseState(c) === st).length;
         return `<tr onclick="location.href='../../modules/case-management/case-management.html?status=${encodeURIComponent(st)}'"><td style="width:170px">${st}</td><td><span class="accbar" style="width:140px"><i style="width:${active.length ? (n / active.length) * 100 : 0}%"></i></span></td><td class="mono" style="text-align:right"><b>${n}</b></td></tr>`;
       }).join("")}
      </tbody></table>
     </div>
     <div class="panel">
      <div class="p-t">MY CASES BY PAYER</div>
      <table class="mini"><tbody>
        ${(() => {
          const by = {};
          active.forEach((c) => { by[c.payer] = (by[c.payer] || 0) + 1; });
          const rows = Object.entries(by).sort((a, b) => b[1] - a[1]);
          const max = Math.max(1, ...rows.map((r) => r[1]));
          return rows.length
            ? rows.map(([p, n]) => `<tr><td style="width:150px">${esc(p)}</td><td><span class="accbar" style="width:120px"><i style="width:${(n / max) * 100}%"></i></span></td><td class="mono" style="text-align:right"><b>${n}</b></td></tr>`).join("")
            : `<tr><td style="color:var(--t4);padding:8px 10px">No active cases.</td></tr>`;
        })()}
      </tbody></table>
     </div></div>
   </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  Shell.init("dashboard");
  renderDash();
  injectIcons(document);
});
