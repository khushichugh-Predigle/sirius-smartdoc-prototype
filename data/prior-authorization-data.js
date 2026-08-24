/* Prior Authorization module data — ported from v64's CASES array
   (sirius_clearance_specialist_v64.html, const CASES, ~line 2030).
   Trimmed to the fields the Prior Auth queue view (renderPriorAuth()) actually
   reads: id, patient, drug, payer, prio, status, received, stage. The real
   CASES array also carries dob/sex/phone/dx/pas[]/log[]/audit[] etc. used by
   the (out-of-scope) Case Detail / PA workspace screens — not needed here.
   `stage` is kept so this module can filter to stage===3 ("Prior Auth" stage)
   exactly like v64 does, in case a future module wants the full queue too. */
window.PA_CASES = [
  { id: "ESP-2026-004533", patient: "Leo Messi",      drug: "Gamunex-C 10%", payer: "Humana",           prio: "URGENT",  status: "Review In Progress",     received: "06/22 08:10", stage: 3 },
  { id: "ESP-2026-004534", patient: "Dan Halland",     drug: "Gammagard 10%", payer: "Aetna",            prio: "ROUTINE", status: "Review In Progress",     received: "06/15 11:20", stage: 3 },
  { id: "ESP-2026-004521", patient: "John Brown",      drug: "Dupixent",      payer: "UnitedHealthcare", prio: "STAT",    status: "Pending Review",         received: "06/11 06:15", stage: 1 },
  { id: "ESP-2026-004520", patient: "Maria Garcia",    drug: "Humira",        payer: "Aetna",            prio: "URGENT",  status: "Blocked",                received: "06/10 04:30", stage: 1 },
  { id: "ESP-2026-004528", patient: "Maria Garcia",    drug: "Humira",        payer: "Aetna",            prio: "ROUTINE", status: "Pending Review",         received: "06/11 08:45", stage: 1 },
  { id: "ESP-2026-004519", patient: "Chen Wei",        drug: "Stelara",       payer: "Cigna",            prio: "ROUTINE", status: "Pending Review",         received: "06/10 13:05", stage: 3 },
  { id: "ESP-2026-004515", patient: "Aisha Patel",     drug: "Dupixent",      payer: "BCBS IL",          prio: "URGENT",  status: "Review In Progress",     received: "06/09 10:12", stage: 3 },
  { id: "ESP-2026-004511", patient: "David Lee",       drug: "Enbrel",        payer: "Optum Rx (CMM)",   prio: "ROUTINE", status: "PA Submitted",           received: "06/08 09:00", stage: 3 },
  { id: "ESP-2026-004526", patient: "Laura Wilson",    drug: "Skyrizi",       payer: "UnitedHealthcare", prio: "ROUTINE", status: "Pending Review",         received: "06/11 08:44", stage: 1 },
  { id: "ESP-2026-004509", patient: "Robert King",     drug: "Remicade",      payer: "Aetna",            prio: "URGENT",  status: "Blocked",                received: "06/09 07:30", stage: 3 },
  { id: "ESP-2026-004523", patient: "Sofia Rossi",     drug: "Ozempic",       payer: "Cigna",            prio: "ROUTINE", status: "Review In Progress",     received: "06/11 04:05", stage: 1 },
  { id: "ESP-2026-004507", patient: "James O'Neil",    drug: "Cosentyx",      payer: "BCBS IL",          prio: "ROUTINE", status: "Pending Review",         received: "06/09 14:00", stage: 3 },
  { id: "ESP-2026-004524", patient: "Emma Davis",      drug: "Dupixent",      payer: "UnitedHealthcare", prio: "ROUTINE", status: "Pending Review",         received: "06/11 05:20", stage: 1 },
  { id: "ESP-2026-004503", patient: "Noah Schmidt",    drug: "Xeljanz",       payer: "Optum Rx (CMM)",   prio: "ROUTINE", status: "Review In Progress",     received: "06/09 09:40", stage: 3 },
  { id: "ESP-2026-004527", patient: "Olivia Brown",    drug: "Tremfya",       payer: "Aetna",            prio: "ROUTINE", status: "Pending Review",         received: "06/11 09:10", stage: 1 },
  { id: "ESP-2026-004499", patient: "William Turner",  drug: "Rituxan",       payer: "Cigna",            prio: "STAT",    status: "Blocked",                received: "06/06 11:00", stage: 3 },
  { id: "ESP-2026-004516", patient: "Grace Kim",       drug: "Taltz",         payer: "Cigna",            prio: "ROUTINE", status: "Awaiting BV (Insights)", received: "06/10 11:20", stage: 2 },
  { id: "ESP-2026-004513", patient: "Henry Adeyemi",   drug: "Otezla",        payer: "Humana",           prio: "ROUTINE", status: "Complete — no PA",       received: "06/09 16:45", stage: 2 },
  { id: "ESP-2026-004530", patient: "Sofia Rossi",     drug: "Ozempic",       payer: "Cigna",            prio: "STAT",    status: "Pending Review",         received: "06/11 05:40", stage: 2 },
  { id: "ESP-2026-004531", patient: "James Carter",    drug: "Humira",        payer: "Aetna",            prio: "ROUTINE", status: "Pending Review",         received: "06/10 22:15", stage: 2 },
  { id: "ESP-2026-004532", patient: "Olivia Bennett",  drug: "Otezla",        payer: "BCBS IL",          prio: "ROUTINE", status: "Pending Review",         received: "06/11 07:20", stage: 2 },
  { id: "ESP-2026-004533b", patient: "Daniel Cohen",   drug: "Dupixent",      payer: "UnitedHealthcare", prio: "ROUTINE", status: "Awaiting BV (Insights)", received: "06/10 18:50", stage: 2 },
  { id: "ESP-2026-004540", patient: "Grace Liu",       drug: "Skyrizi",       payer: "Cigna",            prio: "URGENT",  status: "Review In Progress",     received: "06/10 14:10", stage: 3 },
  { id: "ESP-2026-004541", patient: "Marcus Webb",     drug: "Stelara",       payer: "Aetna",            prio: "ROUTINE", status: "Review In Progress",     received: "06/10 10:05", stage: 3 },
  { id: "ESP-2026-004542", patient: "Priya Anand",     drug: "Taltz",         payer: "BCBS IL",          prio: "ROUTINE", status: "Review In Progress",     received: "06/11 07:40", stage: 3 }
];
