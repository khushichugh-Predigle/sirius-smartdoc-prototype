/* Dashboard KPI/queue data — ported from v64's `CASES` array (const CASES = [...],
 * sirius_clearance_specialist_v64.html ~line 2030), trimmed to the fields
 * renderSpecDash() actually reads (id/patient/drug/payer/stage/status/prio/ageH/
 * slaH/assigned/blockReason/clearance/pas) instead of the full per-case PA audit
 * payload (policy citations, requirement checklists, etc. — out of scope for a
 * dashboard KPI/queue view). `pas` is kept minimal (state + paRequired only) so
 * the ported caseState() roll-up logic still works unmodified.
 * window.ME matches v64's `SPEC = "K. Chugh"` (the Clearance Specialist role
 * this dashboard is written for — see module-port-conventions.md). */
window.ME = "K. Chugh";

window.DASHBOARD_CASES = [
  { id: "ESP-2026-004533", patient: "Leo Messi", drug: "Gamunex-C 10%", payer: "Humana",
    stage: 3, status: "Review In Progress", prio: "URGENT", ageH: 9, slaH: 72,
    assigned: ME, clearance: "Pending Prior Authorization",
    pas: [{ state: "Auditing", paRequired: true }] },

  { id: "ESP-2026-004518", patient: "Sofia Alvarez", drug: "Hizentra 20%", payer: "Aetna",
    stage: 3, status: "Blocked", prio: "STAT", ageH: 31, slaH: 48,
    assigned: ME, clearance: "Pending Prior Authorization",
    blockReason: "Prescriber hasn't returned outreach fax re: corticosteroid trial history.",
    pas: [{ state: "Auditing", paRequired: true }] },

  { id: "ESP-2026-004501", patient: "Marcus Webb", drug: "Privigen 10%", payer: "UnitedHealthcare",
    stage: 3, status: "Blocked", prio: "URGENT", ageH: 22, slaH: 48,
    assigned: ME, clearance: "Pending Medical Records",
    blockReason: "Missing recent NCV/EMG report — requested from ordering neurologist.",
    pas: [{ state: "Auditing", paRequired: true }] },

  { id: "ESP-2026-004495", patient: "Priya Natarajan", drug: "Xembify 20%", payer: "Cigna",
    stage: 2, status: "Awaiting BV (Insights)", prio: "ROUTINE", ageH: 14, slaH: 96,
    assigned: ME, clearance: "Pending Benefit Verification",
    pas: [{ state: "TBD", paRequired: true }] },

  { id: "ESP-2026-004488", patient: "Daniel Osei", drug: "Octagam 10%", payer: "Humana",
    stage: 2, status: "Awaiting BV (Insights)", prio: "ROUTINE", ageH: 6, slaH: 96,
    assigned: ME, clearance: "Pending Benefit Verification",
    pas: [{ state: "TBD", paRequired: true }] },

  { id: "ESP-2026-004474", patient: "Grace Lindqvist", drug: "Gammagard S/D", payer: "Blue Shield CA",
    stage: 3, status: "Returned for Documents", prio: "URGENT", ageH: 40, slaH: 72,
    assigned: ME, clearance: "Pending Medical Records",
    pas: [{ state: "Ready to Submit", paRequired: true }] },

  { id: "ESP-2026-004460", patient: "Ahmed Farouk", drug: "Flebogamma DIF 10%", payer: "Aetna",
    stage: 3, status: "Review In Progress", prio: "ROUTINE", ageH: 12, slaH: 72,
    assigned: ME, clearance: "Pending Prior Authorization",
    pas: [{ state: "Ready to Submit", paRequired: true }] },

  { id: "ESP-2026-004452", patient: "Beatriz Nunes", drug: "Gammaked 10%", payer: "Molina Healthcare",
    stage: 3, status: "Review In Progress", prio: "ROUTINE", ageH: 3, slaH: 72,
    assigned: ME, clearance: "Pending Prior Authorization",
    pas: [{ state: "Uploaded to Portal", paRequired: true }] },

  { id: "ESP-2026-004441", patient: "Connor Blake", drug: "Vivaglobin", payer: "Cigna",
    stage: 1, status: "Pending Review", prio: "ROUTINE", ageH: 2, slaH: 24,
    assigned: ME, clearance: "Pending Triage", pas: [] },

  { id: "ESP-2026-004437", patient: "Harriet Onyango", drug: "Gamunex-C 10%", payer: "UnitedHealthcare",
    stage: 1, status: "Pending Review", prio: "ROUTINE", ageH: 5, slaH: 24,
    assigned: ME, clearance: "Pending Triage", pas: [] },

  { id: "ESP-2026-004429", patient: "Ravi Deshmukh", drug: "Panzyga 10%", payer: "Humana",
    stage: 1, status: "Pending Review", prio: "ROUTINE", ageH: 1, slaH: 24,
    assigned: ME, clearance: "Pending Triage", pas: [] },

  { id: "ESP-2026-004412", patient: "Nora Fitzgerald", drug: "Cuvitru 20%", payer: "Aetna",
    stage: 3, status: "PA Submitted", prio: "ROUTINE", ageH: 55, slaH: 72,
    assigned: ME, clearance: "Pending SOC",
    pas: [{ state: "Submitted", paRequired: true }] },

  { id: "ESP-2026-004398", patient: "Owen Baptiste", drug: "Asceniv", payer: "Blue Shield CA",
    stage: 3, status: "PA Submitted", prio: "ROUTINE", ageH: 61, slaH: 72,
    assigned: ME, clearance: "Pending SOC",
    pas: [{ state: "Submitted", paRequired: true }] },

  { id: "ESP-2026-004387", patient: "Yuki Tanaka", drug: "Bivigam 10%", payer: "Cigna",
    stage: 3, status: "Complete — no PA", prio: "ROUTINE", ageH: 80, slaH: 72,
    assigned: ME, clearance: "Pending SOC",
    pas: [{ state: "TBD", paRequired: false }] },

  { id: "ESP-2026-004356", patient: "Isabelle Moreau", drug: "Gammaplex 5%", payer: "Molina Healthcare",
    stage: 2, status: "Review In Progress", prio: "ROUTINE", ageH: 8, slaH: 96,
    assigned: "J. Rivera", clearance: "Pending Benefit Verification in Progress",
    pas: [{ state: "TBD", paRequired: true }] },

  { id: "ESP-2026-004392", patient: "Tobias Kruger", drug: "Hizentra 20%", payer: "Humana",
    stage: 3, status: "Blocked", prio: "URGENT", ageH: 18, slaH: 48,
    assigned: "J. Rivera", clearance: "Pending Prior Authorization",
    blockReason: "Payer portal down — retry submission.",
    pas: [{ state: "Auditing", paRequired: true }] },
];
