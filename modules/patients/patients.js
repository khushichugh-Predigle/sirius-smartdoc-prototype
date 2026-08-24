/* Patients module — ported from v64's renderPatients()/getUniquePatients()/openPatientDetail()/
 * openAddPatientModal()/openEditPatientModal()/deletePatientConfirm()/doDeletePatient()
 * (sirius_clearance_specialist_v64.html, ~lines 6396-6613). Static prototype: everything
 * resets on reload, matching intake-requests.js / document-detail.js in this repo.
 */

/* fld() — same field-tile markup as v64's global fld(l,v,conf,warn), reused here locally
 * since this module doesn't share v64's global helper file. */
function fld(l, v, conf, warn) {
  const raw = (v || "").toString().replace(/<[^>]+>/g, "").trim();
  const showConf = conf && raw && raw !== "—";
  return `<div class="fld ${warn ? "warnfld" : ""}"><div class="l">${l}${warn ? ' <span class="conf lo">⚠</span>' : ""}</div><div class="v">${v || "—"}${showConf ? ` <span class="conf ${conf >= 85 ? "hi" : "lo"}">${conf >= 85 ? "✓" : "⚠"} ${conf}%</span>` : ""}</div></div>`;
}

/* irf() — simplified from v64's irf(label,val,req,conf,upd,key): this module drops the
 * confidence-chip / "updated" chip machinery (irFieldKey()'s pm-managed-field concept
 * belongs to the case/PA editing flows, not a plain patient demographics form) and just
 * renders the label + input row, matching how openAddPatientModal / openEditPatientModal
 * actually use it in v64 (no confidence ever shown on those two modals either). */
function irf(label, val, req) {
  return `<div class="irf"><div class="lr">${label}${req ? ' <span class="req">*</span>' : ""}</div><input data-field="${esc(label)}" value="${esc(val || "")}"></div>`;
}

function caseStateBdg(c) {
  const map = {
    "Intake Review": "gray", "Awaiting BV (Insights)": "warn", "PA Submitted": "info",
    "Approved — Scheduling": "ok", "Approved": "ok", "Denied": "err",
  };
  const tone = map[c.status] || "gray";
  return `<span class="bdg ${tone}"><span class="d"></span>${esc(c.status)}</span>`;
}

let ptSel = null;
window._addedPatients = window._addedPatients || [];
window._deletedPatients = window._deletedPatients || new Set();
window._ptCaseCol = window._ptCaseCol || {};

function getPatients() {
  const del = window._deletedPatients;
  return [...window.PATIENTS, ...window._addedPatients].filter((p) => !del.has(p.name));
}

function renderPatients() {
  const q = ($("ptSearch") || { value: "" }).value.toLowerCase();
  const sf = ($("ptStatusFilter") || { value: "" }).value;
  const all = getPatients();
  let pts = all.filter((p) => {
    if (sf === "active" && p.status !== "Active") return false;
    if (sf === "done" && p.status !== "Closed") return false;
    if (q && !(p.name + " " + p.dob + " " + p.drug + " " + p.payer + " " + p.mrn + " " + p.dx).toLowerCase().includes(q)) return false;
    return true;
  });
  const meta = $("ptMeta");
  if (meta) meta.textContent = `${pts.length} of ${all.length} patients`;
  const thead = $("ptGrid").querySelector("thead");
  const tbody = $("ptGrid").querySelector("tbody");
  if (!thead || !tbody) return;
  thead.innerHTML = "<tr><th>MRN</th><th>NAME</th><th>DOB / SEX</th><th>PHONE</th><th>DRUG</th><th>PAYER</th><th>DIAGNOSIS</th><th>ACTIVE CASES</th><th>STATUS</th><th style='width:100px'></th><th>CREATED ON</th><th>UPDATED</th></tr>";
  tbody.innerHTML = pts.map((p) => { const audit = AuditStamp.stampFor(p.mrn || p.name); return `
   <tr onclick="openPatientDetail('${esc(p.name)}')" class="${ptSel === p.name ? "sel" : ""}">
    <td class="mono" style="color:var(--t3)">${p.mrn}</td>
    <td><b>${esc(p.name)}</b></td>
    <td class="mono">${p.dob} · ${p.sex}</td>
    <td>${p.phone}</td>
    <td>${esc(p.drug)}<span class="sub"> ${p.dose}</span></td>
    <td>${esc(p.payer)}</td>
    <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis">${esc((p.dx || "").split(" — ")[0] || "")}<span class="sub"> ${esc((p.dx || "").split(" — ")[1] || "")}</span></td>
    <td>${p.activeCases > 0 ? `<span class="bdg info"><span class="d"></span>${p.activeCases}</span>` : `<span class="bdg gray"><span class="d"></span>0</span>`}</td>
    <td>${p.status === "Active" ? '<span class="bdg ok"><span class="d"></span>Active</span>' : '<span class="bdg gray"><span class="d"></span>Closed</span>'}</td>
    <td class="actions">
      <button class="btn xs" onclick="event.stopPropagation();openPatientDetail('${esc(p.name)}')" data-tip="View">${ic("eye")}</button>
      <button class="btn xs" onclick="event.stopPropagation();openEditPatientModal('${esc(p.name)}')" data-tip="Edit">${ic("edit")}</button>
      <button class="btn xs danger" onclick="event.stopPropagation();deletePatientConfirm('${esc(p.name)}')" data-tip="Delete">${ic("trash")}</button>
    </td>
    <td class="mono" style="color:var(--t3)">${esc(audit.createdOn)}</td>
    <td class="mono" style="color:var(--t3)">${esc(audit.updatedOn)}<span class="sub"> by ${esc(audit.updatedBy)}</span></td>
   </tr>`; }).join("") || `<tr><td colspan="12"><div class="dt-empty">No patients match the current search/filter.</div></td></tr>`;
  injectIcons(tbody);
}

function ptCaseCard(c, patientName) {
  const collapsed = !!window._ptCaseCol[c.id];
  return `<div class="fset" style="margin:0 0 10px">
    <div class="fset-t toggle-hd" onclick="window._ptCaseCol['${c.id}']=!window._ptCaseCol['${c.id}'];openPatientDetail('${esc(patientName)}')" style="gap:8px">
      <span class="caseid" style="font-family:monospace">${c.id}</span>
      ${caseStateBdg(c)}
      <span style="font-weight:400;color:var(--t4);font-size:9.5px">${c.received}</span>
      <span class="spacer"></span>
      <button class="btn xs" onclick="event.stopPropagation();closeModal();window.location.href='../case-management/case-management.html?id=${encodeURIComponent(c.id)}'" style="font-size:9.5px">Open case →</button>
      <span class="ov-chev" style="transform:rotate(${collapsed ? "-90" : "0"}deg)">▼</span>
    </div>
    ${collapsed ? "" : `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px 14px;padding:10px">
      <div><div style="font-size:9.5px;font-weight:700;letter-spacing:.05em;color:var(--t4);margin-bottom:6px">DRUG & RX</div>
        <div class="fgrid">
          ${fld("DRUG", c.drug ? `<b>${esc(c.drug)}</b>` : "")}${fld("DOSE", c.dose)}
          ${fld("DIAGNOSIS", c.dx)}${fld("PA REQUIRED", c.paReq === null ? "Not set" : c.paReq ? "Yes" : "No")}
          ${fld("J-CODE", c.jcode || "")}${fld("FREQUENCY", c.frequency || "")}
        </div></div>
      <div><div style="font-size:9.5px;font-weight:700;letter-spacing:.05em;color:var(--t4);margin-bottom:6px">PRESCRIBER</div>
        <div class="fgrid">
          ${fld("NAME", c.rx ? `<b>${esc(c.rx)}</b>` : "")}${fld("NPI", c.npi ? `<span class="mono">${c.npi}</span>` : "")}
          ${fld("CLINIC", c.clinic)}${fld("FAX", c.clinicFax)}
          ${fld("SPI", c.spi ? `<span class="mono">${c.spi}</span>` : "")}${fld("DEA", c.dea ? `<span class="mono">${c.dea}</span>` : "")}
        </div></div>
      <div><div style="font-size:9.5px;font-weight:700;letter-spacing:.05em;color:var(--t4);margin-bottom:6px">INSURANCE</div>
        <div class="fgrid">
          ${fld("PAYER", c.payer ? `<b>${esc(c.payer)}</b>` : "")}${fld("PLAN", c.plan)}
          ${fld("MEMBER ID", c.member ? `<span class="mono">${esc(c.member)}</span>` : "", c.memberConf, c.memberConf < 85)}${fld("GROUP #", c.groupNumber || "")}
          ${fld("DOCS", c.docsCount + " file" + (c.docsCount !== 1 ? "s" : ""))}
        </div></div>
    </div>`}
  </div>`;
}

function openPatientDetail(name) {
  ptSel = name;
  const p = getPatients().find((x) => x.name === name);
  if (!p) { toast("Patient not found"); return; }
  const cases = p.cases || [];
  openModal(`<div class="m-head">${ic("users")} ${esc(p.name)} <span class="mono" style="font-size:10.5px;font-weight:500;color:var(--t3);margin-left:6px">${p.mrn}</span><span class="bdg ${p.status === "Active" ? "ok" : "gray"}" style="margin-left:8px"><span class="d"></span>${p.status}</span><button class="x" onclick="closeModal()">✕</button></div>
   <div class="m-body" style="padding:0">
     <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px 14px;padding:12px 16px 10px;border-bottom:1px solid var(--border-lt)">
       <div class="fset" style="margin:0"><div class="fset-t">PATIENT DEMOGRAPHICS</div><div class="fgrid">
         ${fld("FULL NAME", `<b>${esc(p.name)}</b>`)}${fld("MRN", p.mrn)}${fld("DOB / SEX", p.dob && p.sex ? p.dob + " · " + p.sex : p.dob || "")}
         ${fld("PHONE", p.phone)}${fld("EMAIL", p.email || "")}${fld("LANGUAGE", p.lang)}
         ${fld("ADDRESS", p.address || "")}${fld("CITY / STATE", p.city && p.state ? p.city + ", " + p.state : "")}${fld("ZIP", p.zip || "")}
       </div></div>
       <div class="fset" style="margin:0"><div class="fset-t">CLINICAL</div><div class="fgrid">
         ${fld("ALLERGIES", p.allergies || "")}
         ${fld("HEIGHT", p.vitals && p.vitals.ht ? p.vitals.ht : "")}${fld("WEIGHT", p.vitals && p.vitals.wt ? p.vitals.wt : "")}${fld("BMI", p.vitals && p.vitals.bmi ? p.vitals.bmi : "")}
         ${fld("PRIMARY DX", p.dx || "")}${fld("PRESCRIBER", p.rx || "")}
       </div></div>
       <div class="fset" style="margin:0"><div class="fset-t">ADMINISTRATIVE</div><div class="fgrid">
         ${fld("PATIENT STATUS", p.status)}${fld("ACTIVE CASES", "" + p.activeCases)}
         ${fld("TOTAL CASES", "" + (p.totalCases != null ? p.totalCases : cases.length))}${fld("LAST ACTIVITY", p.lastActivity || "")}
         ${fld("PRIMARY PAYER", p.payer || "")}${fld("MEMBER ID", p.member || "")}
       </div></div>
     </div>
     <div style="padding:10px 16px">
       <div style="font-size:10px;font-weight:700;letter-spacing:.06em;color:var(--t3);margin-bottom:10px">CASES (${cases.length} total · ${p.activeCases} active)</div>
       ${cases.length ? cases.map((c) => ptCaseCard(c, name)).join("") : `<div class="dt-empty" style="height:auto;padding:20px 0">No cases found for this patient.</div>`}
     </div>
   </div>
   <div class="m-foot"><button class="btn" onclick="closeModal()">Close</button><button class="btn primary" onclick="closeModal();openEditPatientModal('${esc(p.name)}')">${ic("edit")} Edit patient</button></div>`);
  $("modalBox").classList.add("wide");
}

function openAddPatientModal() {
  openModal(`<div class="m-head">${ic("plus")} Add New Patient <button class="x" onclick="closeModal()">✕</button></div>
   <div class="m-body irf">
     <div style="font-size:10px;font-weight:700;letter-spacing:.05em;color:var(--t3);margin-bottom:8px">DEMOGRAPHICS</div>
     <div class="vfgrid">
       ${irf("First Name", "", 1)}${irf("Last Name", "", 1)}${irf("DOB", "", 1)}${irf("Sex", "")}
       ${irf("Phone", "")}${irf("Email", "")}${irf("Language", "English")}${irf("Street Address", "")}
       ${irf("City", "")}${irf("State", "IL")}${irf("ZIP", "")}
     </div>
     <div style="font-size:10px;font-weight:700;letter-spacing:.05em;color:var(--t3);margin:14px 0 8px">CLINICAL</div>
     <div class="vfgrid">
       ${irf("Drug / Dose", "", 1)}${irf("Diagnosis (ICD-10)", "")}${irf("Allergies", "NKDA")}
       ${irf("Height", "")}${irf("Weight", "")}${irf("BMI", "")}
     </div>
     <div style="font-size:10px;font-weight:700;letter-spacing:.05em;color:var(--t3);margin:14px 0 8px">Prescriber & Insurance</div>
     <div class="vfgrid">
       ${irf("Payer", "")}${irf("Plan", "")}${irf("Member ID", "")}
       ${irf("Prescriber", "")}${irf("NPI", "")}${irf("Clinic", "")}
     </div>
   </div>
   <div class="m-foot"><button class="btn" onclick="closeModal()">Cancel</button>
   <button class="btn primary" onclick="saveNewPatient()">${ic("check")} Save Patient</button></div>`);
  $("modalBox").classList.add("wide");
}

function saveNewPatient() {
  const inputs = $("modalBox").querySelectorAll(".irf input");
  const vals = [...inputs].map((i) => i.value.trim());
  if (!vals[0] || !vals[1]) { toast("First and last name required"); return; }
  const newP = {
    id: "PT-NEW-" + Date.now(), mrn: "MRN-" + (Math.floor(Math.random() * 900000) + 100000),
    name: vals[0] + " " + vals[1], dob: vals[2] || "", sex: vals[3] || "", phone: vals[4] || "",
    email: vals[5] || "", lang: vals[6] || "English", address: vals[7] || "",
    city: vals[8] || "", state: vals[9] || "", zip: vals[10] || "",
    drug: vals[11] || "", dose: "", dx: vals[12] || "", allergies: vals[13] || "NKDA",
    vitals: { ht: vals[14] || "", wt: vals[15] || "", bmi: vals[16] || "" },
    payer: vals[17] || "", plan: vals[18] || "", member: vals[19] || "",
    rx: vals[20] || "", npi: vals[21] || "", clinic: vals[22] || "",
    activeCases: 0, totalCases: 0, lastActivity: "", status: "Closed", cases: [],
  };
  window._addedPatients.push(newP);
  closeModal();
  renderPatients();
  toast("Patient " + newP.name + " added");
}

function openEditPatientModal(name) {
  const p = getPatients().find((x) => x.name === name);
  if (!p) return;
  openModal(`<div class="m-head">${ic("edit")} Edit Patient — ${esc(p.name)} <button class="x" onclick="closeModal()">✕</button></div>
   <div class="m-body irf">
     <div style="font-size:10px;font-weight:700;letter-spacing:.05em;color:var(--t3);margin-bottom:8px">DEMOGRAPHICS</div>
     <div class="vfgrid">
       ${irf("First Name", p.name.split(" ")[0], 1)}${irf("Last Name", p.name.split(" ").slice(1).join(" "), 1)}
       ${irf("DOB", p.dob, 1)}${irf("Sex", p.sex)}${irf("Phone", p.phone)}${irf("Email", p.email || "")}
       ${irf("Language", p.lang || "English")}${irf("Address", p.address || "")}
     </div>
     <div style="font-size:10px;font-weight:700;letter-spacing:.05em;color:var(--t3);margin:14px 0 8px">CLINICAL</div>
     <div class="vfgrid">
       ${irf("Drug / Dose", p.drug + " " + p.dose)}${irf("Diagnosis (ICD-10)", p.dx || "")}
       ${irf("Allergies", p.allergies || "NKDA")}${irf("Height", p.vitals.ht)}
       ${irf("Weight", p.vitals.wt)}${irf("BMI", p.vitals.bmi)}
     </div>
     <div style="font-size:10px;font-weight:700;letter-spacing:.05em;color:var(--t3);margin:14px 0 8px">Prescriber & Insurance</div>
     <div class="vfgrid">
       ${irf("Payer", p.payer, 1)}${irf("Plan", p.plan)}${irf("Member ID", p.member)}
       ${irf("Prescriber", p.rx)}${irf("NPI", p.npi)}${irf("Clinic", p.clinic || "")}
     </div>
     <div class="callout info" style="margin:12px 0 0">${ic("alert")} <div>Editing demographics here syncs the display. Changes to drug/payer/member also update across linked cases.</div></div>
   </div>
   <div class="m-foot"><button class="btn" onclick="closeModal()">Cancel</button>
   <button class="btn primary" onclick="toast('Patient record saved · changes logged');closeModal();renderPatients()">${ic("check")} Save Changes</button></div>`);
  $("modalBox").classList.add("wide");
}

function deletePatientConfirm(name) {
  openModal(`<div class="m-head">${ic("trash")} Delete Patient <button class="x" onclick="closeModal()">✕</button></div>
   <div class="m-body">
     <div class="callout err">${ic("alert")} <div><b>Are you sure you want to remove ${esc(name)}?</b><br>This removes them from the patient list. Existing cases remain in the system.</div></div>
   </div>
   <div class="m-foot"><button class="btn" onclick="closeModal()">Cancel</button>
   <button class="btn danger" onclick="doDeletePatient('${esc(name)}')">${ic("trash")} Delete</button></div>`);
}

function doDeletePatient(name) {
  window._deletedPatients.add(name);
  window._addedPatients = window._addedPatients.filter((p) => p.name !== name);
  closeModal();
  renderPatients();
  toast(name + " removed from patient list");
}

document.addEventListener("DOMContentLoaded", () => {
  Shell.init("patients");
  renderPatients();
});
