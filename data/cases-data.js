/* Case Management data — ported verbatim from v64's `const CASES = [...]` array
 * (sirius_clearance_specialist_v64.html, ~lines 2018-2398), including the full nested
 * pas[]/audit PA-readiness detail (kept intact for the sibling case-detail.html view
 * to consume — see module-port-conventions.md). All 25 source records are kept
 * (v64's real array is already this size — no trimming needed per the ~20-25 record
 * convention already used by data/dummy-documents.js).
 *
 * `ME` and `mkChecks()` are v64 globals the array literal depends on (assigned:ME,
 * checks:mkChecks(...)) — baked in here as real values/a real function so this file
 * is self-contained, matching v64's ROLE="spec" default reviewer (SPEC = "K. Chugh").
 *
 * One data fix: v64's source array has a genuine duplicate id — two different patients
 * (Leo Messi and Daniel Cohen) both carry "ESP-2026-004533". Since this prototype's
 * case-detail.html looks records up by id, Daniel Cohen's case was renumbered to the
 * next unused id, "ESP-2026-004535", to keep every case independently linkable.
 */
const ME = "K. Chugh";
function mkChecks(missIns, warnLab) {
  return [
    {n:"Referral form (signed)", s:"ok",   src:"Referral_Form.pdf · p.1 · AI 98%"},
    {n:"Patient demographics",   s:"ok",   src:"Referral_Form.pdf · p.1 · AI 97%"},
    {n:"Insurance / member ID",  s:missIns?"miss":"ok", src:missIns?"Not found in any received document":"Insurance_Card.pdf · AI 95%"},
    {n:"Clinical notes",         s:"ok",   src:"Medical_Records.pdf · p.2–6"},
    {n:"Lab results",            s:warnLab?"warn":"ok", src:warnLab?"Labs dated 14 mo ago — payer requires < 12 mo":"Lab_Results.pdf · 2026-05-28"},
    {n:"Prescription / order",   s:"ok",   src:"Referral_Form.pdf · p.2 · AI 99%"},
    {n:"ICD-10 dx code valid",   s:"ok",   src:"L20.84 verified against registry"},
    {n:"Prescriber NPI valid",   s:"ok",   src:"NPI registry match · active"}
  ];
}

window.CASES = [
 {id:"ESP-2026-004533", patient:"Leo Messi", dob:"06/24/1960", sex:"M", phone:"(936) 555-0117",
  drug:"Gamunex-C 10%", dose:"400 mg/kg ×5d, then 1 g/kg q2wk", payer:"Humana", plan:"Medicare PPO ADV", member:"H67235296", memberConf:96,
  rx:"Dr. Guy T. Burrows", npi:"1861049277", dx:"G61.81 — Chronic inflammatory demyelinating polyneuropathy (CIDP)",
  clinical:"Neurology/Neurophysiology", clearance:"Pending Prior Authorization",
  stage:3, status:"Review In Progress", prio:"URGENT", ageH:9, slaH:72, assigned:ME, received:"06/22 08:10",
  paReq:true, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Humana_Gammunex_Order_Clinicals_LeoMessi.pdf","Clinical Notes","06/22 08:10","Reviewed"],["NCV_EMG_LeoMessi_020426.pdf","Lab Results","06/22 08:12","Reviewed"],["Humana_policy_IG.pdf","Medical Record","06/22 08:12","Reviewed"]],
  pa:null,
  pas:[
   {seq:1, therapyType:"Immune Globulin (IVIG)", item:"Gamunex-C 10% (J1561)", state:"Ready to Submit",
    payer:"Humana", paRequired:true, portal:"Availity/Novologix", updatedBy:"EsperAI", updatedAt:"06/22 08:31",
    audit:{
      ranAt:"06/22 08:31", indication:"CIDP (G61.81)", drug:"Gamunex-C 10% (preferred)",
      regimen:"400 mg/kg ×5d, then 1 g/kg q2wk", encounterLabel:"ENCOUNTER", encounter:"06/22/2026",
      payerLine:"Humana (Medicare Advantage)", policyName:"IVIG (Immune Globulin) Pharmacy Coverage Policy", policyEffective:"01/01/2026",
      policyBasisSub:"Humana IVIG policy — CIDP criteria (member must meet ALL)",
      policySource:"Source: Humana IVIG (Immune Globulin) Pharmacy Coverage Policy, effective 01/01/2026 — CIDP section, full-length version p.10. Line of business: Medicare, Medicaid KY/SC.",
      blockers:[{tone:"err",title:"Blocking gap found",body:"<b>Non-response to corticosteroid treatment (Humana CIDP Criteria #2) is not documented.</b> Criteria #2 requires the member be &ldquo;diagnosed with CIDP and has not responded to corticosteroid treatment.&rdquo; The CIDP diagnosis is well supported, but no corticosteroid trial or non-response is recorded anywhere in the clinicals — the only pre-IVIG therapy documented is hydroxychloroquine. The sole steroid mentions in the file are optional infusion pre-medications on the order form, not a therapeutic trial."}],
      snapshot:[
        {label:"Patient",value:"Leo Messi · male · age 65 · DOB ~1960.",cite:"infusion order, PDF p.1; visit note, PDF p.2"},
        {label:"Payer / plan",value:"Humana Medicare PPO ADV (Medicare Advantage); Insurance ID H67235296.",cite:"visit note, PDF p.2"},
        {label:"Ordering provider",value:"Guy T. Burrows, MD — Neurology/Neurophysiology, Burrows Muscle and Nerve Center, Shenandoah TX. Encounter 06/22/2026.",cite:"PDF p.2, p.11"},
        {label:"Diagnosis",value:"G61.81 chronic inflammatory demyelinating polyneuritis (CIDP); also G62.89 sensorimotor demyelinating neuropathy; right brachial plexopathy &ldquo;as part of CIDP.&rdquo;",cite:"Diagnosis list, PDF p.10; NCV/EMG, PDF p.3, p.12"},
        {label:"Requested drug",value:"Gamunex-C 10% (immune globulin IV, 1 g/10 mL).",cite:"infusion order, PDF p.1; prescription, PDF p.6"},
        {label:"Ordered regimen",value:"Loading 400 mg/kg/day × 5 days (35 g/day); maintenance 1000 mg/kg × 1 day IV q2 weeks × 12 months (85 g/day). Weight 188 lb (&asymp;85 kg).",cite:"infusion order, PDF p.1; orders, PDF p.10; weight, PDF p.3"},
        {label:"Disability measure",value:"I-RODS total score 33 (previous 28).",cite:"Screening Tools, PDF p.9"},
        {label:"Work-up of alternatives",value:"Whole-genome + LGMD genetic testing negative; CSF studies (protein 28, normal); muscle biopsy mild neurogenic atrophy; skin biopsy small-fiber neuropathy; HIV non-reactive.",cite:"Results, PDF p.6; labs, PDF p.7"}
      ],
      policyBasis:{payer:[
        {ref:"CRITERIA #1 — STEP THERAPY / PREFERRED PRODUCT",text:"Medical-benefit preferred products: Flebogamma DIF, Gammagard, Gammagard S/D, Gammaked, Gamunex-C, Hizentra, Octagam, Privigen, Xembify. Medicare Part D preferred product: Gamunex-C. Non-preferred requests require prior therapy/intolerance with a preferred product. Part B: step therapy waived if continuation of prior therapy within 365 days."},
        {ref:"CRITERIA #2 — DIAGNOSIS + STEROID NON-RESPONSE",text:"Member is diagnosed with CIDP and has not responded to corticosteroid treatment."},
        {ref:"CRITERIA #3 — CLINICAL / ELECTRO-DIAGNOSTIC",text:"One of: (a) electro-diagnostic evidence of demyelinating neuropathy in at least two limbs, resulting in muscle weakness or sensory dysfunction; OR (b) muscle weakness with diagnostic testing per AAN criteria. (IVIG used alone or after plasma exchange.)"},
        {ref:"CRITERIA #4 — BvsD",text:"A Benefit-vs-Part-D coverage determination may also be required."}
      ],soleo:[]},
      requirements:[
        {n:1,group:"payer",question:"Is the product an IVIG covered by the policy, and is this a prior-authorization request under the member's plan?",verdict:"MET",status:"met",
         response:"Yes. The request is Gamunex-C 10%, an IVIG listed in Humana's policy, for a Humana Medicare Advantage (PPO) member — a prior-authorization drug. IVIG for CIDP is administered under the medical benefit.",
         citeLabel:"CITATION",citation:"Clinicals: infusion order (PDF p.1); plan = Humana Medicare PPO ADV (PDF p.2). Policy: Products Affected list &amp; Policy Type &ldquo;Prior Authorization.&rdquo;",decision:null},
        {n:2,group:"payer",question:"Criteria #1 — Step therapy: is a trial of a preferred product required before Gamunex-C?",verdict:"NOT APPLICABLE",status:"na",
         response:"No step barrier. Gamunex-C is itself a preferred product under both the medical-benefit preferred list and as Humana's Medicare Part D preferred product. The non-preferred step-therapy requirement does not apply.",
         citeLabel:"CITATION",citation:"Policy: Criteria #1 preferred-product list (Humana IVIG policy — present in both the attached excerpt and the full version). Clinicals: Gamunex-C ordered (PDF p.1, p.6).",decision:null},
        {n:3,group:"payer",question:"Criteria #2 (part 1) — Is the member diagnosed with CIDP?",verdict:"MET",status:"met",
         response:"Yes. CIDP (G61.81) is the documented diagnosis by a treating neurologist, supported by electrodiagnostic studies. The 02/04/2026 NCV/EMG concluded &ldquo;sensorimotor demyelinating polyneuropathy &hellip; supportive of CIDP diagnosis,&rdquo; and the 06/22/2026 study describes brachial plexopathy &ldquo;as part of CIDP disorder.&rdquo;",
         citeLabel:"CITATION",citation:"Clinicals: Diagnosis list (PDF p.10); NCV/EMG conclusions (PDF p.19 [02/04/2026], PDF p.12 [06/22/2026]); Visit Summary (PDF p.11).",decision:null},
        {n:4,group:"payer",question:"Criteria #2 (part 2) — Has the member NOT responded to corticosteroid treatment?",verdict:"NOT DOCUMENTED",status:"notmet",
         response:"<b>Not found in the clinicals.</b> There is no record of a corticosteroid trial or of non-response to corticosteroids. The only therapy documented ahead of IVIG is hydroxychloroquine (&ldquo;discussed hydroxychloroquine 200 mg BID to address his condition awaiting IVIG&rdquo;). The single steroid references in the file — dexamethasone and methylprednisolone — appear only as unchecked optional infusion pre-medications on the order form, not as a therapeutic trial.",
         citeLabel:"CLINICAL REASONING & CITATION",citation:"Clinicals: medication/prescription lists and Visit Summary (PDF p.2, p.6, p.11); infusion-order premedication checklist (PDF p.1). Policy: Criteria #2 requires non-response to corticosteroid treatment. As an &ldquo;all of the following&rdquo; criterion, this unmet element is a blocking gap for a first-pass approval.",decision:null},
        {n:5,group:"payer",question:"Criteria #3 — Is there electro-diagnostic evidence of demyelinating neuropathy in ≥ 2 limbs with weakness/sensory dysfunction?",verdict:"MET",status:"met",
         response:"Yes — Criteria #3, option (a) is satisfied. The 02/04/2026 NCV/EMG documents demyelinating-range findings across multiple limbs: bilateral sural/superficial peroneal and right peroneal/tibial slowing with prolonged F-waves and H-reflexes, plus right median involvement — concluding &ldquo;sensorimotor demyelinating polyneuropathy.&rdquo; Muscle weakness is objectively present (proximal 3–4/5 in shoulders and legs) and sensory dysfunction (blunted pinprick, absent vibration in feet).",
         citeLabel:"CITATION",citation:"Clinicals: NCV/EMG report 02/04/2026 interpretation (PDF p.19) and data tables (PDF p.20–21); strength/sensory exam (PDF p.4–5). Policy: Criteria #3(a).",decision:null},
        {n:6,group:"payer",question:"Criteria #4 — Benefit-vs-Part-D (BvsD) coverage determination",verdict:"ADMINISTRATIVE",status:"na",
         response:"A BvsD determination may also be required to route the claim to the correct Medicare benefit (Part B vs Part D). Not a clinical criterion; anticipate it as a coverage step. For a Medicare Advantage member receiving physician-administered IVIG for CIDP, this typically adjudicates under the medical benefit.",
         citeLabel:"CITATION",citation:"Policy: Criteria #4 (CIDP section). Plan: Humana Medicare PPO ADV (clinicals PDF p.2).",decision:null},
        {n:7,group:"payer",question:"Dose / regimen & approval duration (context)",verdict:"CONSISTENT",status:"met",
         response:"The ordered regimen aligns with standard CIDP dosing and Gamunex-C's FDA CIDP labeling (Gamunex-C is FDA-approved for CIDP, so this is on-label).<br><br>Dose check at 188 lb (&asymp;85 kg): loading 400 mg/kg/day &asymp; 34 g/day → matches the ordered 35 g/day; over 5 days &asymp; 2 g/kg induction. Maintenance 1000 mg/kg (1 g/kg) &asymp; 85 g q2 weeks — matches the ordered 85 g/day. Humana's CIDP criteria do not impose a specific dose gate; approval duration is a plan year (initial and renewal).",
         citeLabel:"CITATION",citation:"Clinicals: infusion order &amp; orders (PDF p.1, p.10); weight (PDF p.3). Policy: Approval Duration (plan year); no dose limit stated in CIDP section.",decision:null}
      ],
      gaps:[
        {kind:"document",text:"<b>Corticosteroid non-response (Criteria #2) — not documented.</b> Humana specifically requires that the member has not responded to corticosteroid treatment; the record shows no steroid trial (only hydroxychloroquine ahead of IVIG). This must be supplied — documentation of a prior corticosteroid trial and its failure, or a clear rationale/contraindication — or the request is incomplete."},
        {kind:"interpretive",text:"<b>Minor:</b> a concurrent proximal &ldquo;muscle disorder&rdquo; under evaluation and a normal CSF protein (28) add some diagnostic complexity a reviewer may probe, though neither defeats the electrodiagnostically-supported CIDP diagnosis."}
      ],
      assessment:{
        completeness:"<b>Almost — but one mandatory element is missing.</b> The strongest parts are solidly evidenced: the CIDP diagnosis, the electro-diagnostic criterion (bilateral demyelinating findings with weakness/sensory loss), the preferred-product status of Gamunex-C (no step therapy), an on-label, guideline-consistent dose, a validated disability score (I-RODS 33), and a thorough exclusion of alternative causes.",
        asSubmitted:{rating:"Low–Moderate — likely RFI / denial on Criteria #2",rationale:"Under Humana's &ldquo;meet ALL&rdquo; structure, the undocumented corticosteroid non-response (Criteria #2) is a mandatory element that isn't satisfied, so a first-pass reviewer is likely to deny or issue a request for information — despite the strong electrodiagnostic case and preferred, on-label product."},
        ifClosed:{rating:"High readiness",rationale:"If documentation of corticosteroid non-response (or a contraindication/rationale) is added, all four criteria are met: diagnosis, steroid non-response, electro-diagnostic demyelination in ≥2 limbs, and BvsD. With Gamunex-C preferred and on-label and a guideline-consistent dose, a complete packet has a strong first-pass outlook."},
        bottomLine:"this is a clinically strong CIDP case with excellent electrodiagnostic support and a preferred, on-label product — the one determinative fix is documenting corticosteroid non-response (or why steroids were not appropriate), which Humana's CIDP Criteria #2 explicitly requires.",
        decision:null},
      scopeNote:"Policy-readiness assessment against Humana's written IVIG policy and the evidence physically present in the clinicals — not a coverage determination or medical advice. CIDP criteria were sourced from the full-length version of the same Humana policy because the attached &ldquo;Humana policy IG.pdf&rdquo; excerpt did not include them. Findings are limited to OCR-legible text of the scanned clinicals; illegible/absent items are marked accordingly.",
      grounding:"Grounded in Humana's IVIG (Immune Globulin) Pharmacy Coverage Policy (eff. 01/01/2026) and the patient clinicals (encounter 06/22/2026). Not a coverage determination."
    }},
   {seq:2, therapyType:"Infusion Supplies", item:"IV administration set & supplies (A4221)", state:"TBD",
    payer:"Humana", paRequired:false, portal:"", updatedBy:"CPR+", updatedAt:"06/22 08:10", audit:null}
  ],
  log:[["06/22 08:10","EsperAI","Clinicals ingested from eFax · 28 pages classified"],["06/22 08:12","EsperAI","Humana IVIG policy matched · CIDP criteria extracted"],["06/22 08:31","EsperAI","PA Policy Auditor complete · 7 requirements assessed · 1 blocking gap"],["06/22 08:31","System","Stage → Prior Auth · Clearance status = Pending Prior Authorization"]]},

 {id:"ESP-2026-004534", patient:"Dan Halland", dob:"08/01/1970", sex:"M", phone:"(334) 555-0188",
  drug:"Gammagard 10%", dose:"IVIG — dose per order", payer:"Aetna", plan:"Commercial", member:"W279114552", memberConf:93,
  rx:"Dr. Michael A. Hamer", npi:"1477592038", dx:"G61.81 — Chronic inflammatory demyelinating polyneuropathy (CIDP)",
  mrn:"0001673908", clearance:"Pending Medical Records",
  stage:3, status:"Review In Progress", prio:"ROUTINE", ageH:14, slaH:72, assigned:ME, received:"06/15 11:20",
  paReq:true, paReqAI:true, checks:mkChecks(true,false),
  docs:[["Aetna_PA packet_DanHalland.pdf","New Referral Form","06/15 11:20","Reviewed"],["Aetna_BN_DanHalland.pdf","Insurance Card","06/15 11:21","Reviewed"]],
  pa:null,
  pas:[
   {seq:1, therapyType:"Immune Globulin (IVIG)", item:"Gammagard 10% (J1569)", state:"Ready to Submit",
    payer:"Aetna", paRequired:true, portal:"Availity/Novologix", updatedBy:"EsperAI", updatedAt:"06/15 11:52",
    audit:{
      ranAt:"06/15 11:52", indication:"CIDP", drug:"Gammaplex 10% (J1557)",
      regimen:"55 g IV daily × 4 days", encounterLabel:"PACKET", encounter:"fax rec'd 06/15/2026, 10 pp",
      payerLine:"Aetna (Commercial)", policyName:"CPB 0206 – Parenteral Immunoglobulins", policyEffective:"",
      policyBasisSub:"Aetna CPB 0206 requirements for IVIG in CIDP",
      policySource:"Policy source: aetna.com/cpb/medical/data/200_299/0206.html · plus the 2026 Aetna Commercial Clinical Program Summary.",
      blockers:[
        {tone:"err",title:"Blocking clinical issue (unchanged from the base case)",body:"<b>Electrodiagnostic confirmation of demyelination is not evidenced.</b> The only formal study described (Oct 2024 EMG/NCS) reports a severe axonal sensorimotor neuropathy — inconsistent with CIDP. A later note asserts an EMG &ldquo;highly consistent with demyelinating neuropathy,&rdquo; but no report is attached, and updated NCS/EMG is only ordered. This is Aetna's third mandatory CIDP criterion."},
        {tone:"warn",title:"New consideration specific to this brand — off-label use",body:"Per Aetna's brand table, Gammaplex 5%/10% is FDA-approved only for primary immunodeficiency and ITP — not CIDP. Aetna's CIDP medical-necessity criteria are written for &ldquo;IVIG or SCIG&rdquo; as a class (brand-agnostic), so coverage is assessed on the CIDP criteria rather than the brand's label; however, an off-label brand selection can draw additional reviewer scrutiny, and a reviewer may prefer an IVIG that carries an FDA CIDP indication."}
      ],
      snapshot:[
        {label:"Patient name",value:"Dan Halland",cite:"demographics header, PDF p.4; provider letter, PDF p.3"},
        {label:"DOB / Age / Sex",value:"08/01/1970; ~55 yrs; male.",cite:"demographics header, PDF p.4"},
        {label:"MRN / Account",value:"MRN 0001673908 · Financial # 2005925350",cite:"PDF p.4"},
        {label:"Ordering neurologist",value:"Michael A. Hamer, MD — East Alabama Neurology Clinic, Auburn, AL. Visit/note 06/15/2026.",cite:"provider letter PDF p.3; note PDF p.9"},
        {label:"Payer",value:"Aetna (commercial); GRP 863153; precert line 1-888-632-3862.",cite:"Aetna member ID card, PDF p.8; registration, PDF p.7"},
        {label:"Requested therapy",value:"Gammaplex 10% (immune globulin IV), 55 Gm IV, daily × 4 days (per this submission request). The clinical note documents &ldquo;Trial of IVIG&rdquo; generically; brand/dose per the PA request.",cite:"clinical note, Assessment/Plan, PDF p.9"},
        {label:"Dosing weight",value:"&asymp;111 kg recorded in vitals (OCR-ambiguous).",cite:"Physical Exam vitals, PDF p.10"},
        {label:"Relevant comorbidities",value:"B12 deficiency, folate deficiency, lumbar stenosis, prior lumbar fusion, daily alcohol use (2 bourbons/night). Alternative contributors to neuropathy/foot-drop.",cite:"Ongoing problem list & Social History, PDF p.9"}
      ],
      policyBasis:{payer:[
        {ref:"CIDP — INITIAL THERAPY (ALL MUST BE MET)",text:"(a) disease course is progressive or relapsing/remitting for 2 months or longer; and (b) moderate to severe functional disability; and (c) the diagnosis was confirmed by electrodiagnostic studies. [CPB 0206 → CIDP section]"},
        {ref:"PRODUCT / ACCESS RULES (ALL IVIG)",text:"Precertification required [precert note]; Site of Care UM applies; dosing subject to FDA labeling, accepted compendia, and/or evidence-based guidelines and Quantity Limits [Dosage &amp; Administration]. Gammaplex (J1557) is a preferred product — no step therapy required. (2026 Program Summary, uploaded PDF, p.7, Gammaplex row)"},
        {ref:"BRAND FDA LABELING",text:"Per Aetna's brand table, Gammaplex 5%/10% is FDA-approved for primary immunodeficiency and ITP only (CIDP is off-label). [CPB 0206 → Brands &amp; FDA-Approved Indications]"}
      ],soleo:[]},
      requirements:[
        {n:1,group:"payer",question:"Is the requested product an IVIG covered under CPB 0206, and is precertification required?",verdict:"MET",status:"met",
         response:"Yes. The request specifies Gammaplex 10% (immune globulin IV, HCPCS J1557), an IVIG addressed by CPB 0206. Precertification is required and Site of Care UM applies. The clinical note independently documents a plan for a &ldquo;Trial of IVIG.&rdquo;",
         citeLabel:"PACKET / REQUEST — CITATION",citation:"Packet: Neurology note, Assessment/Plan — &ldquo;Trial of IVIG&rdquo; (PDF p.9). Policy: CPB 0206 precertification note.",decision:null},
        {n:2,group:"payer",question:"Is the requested brand FDA-labeled for CIDP (brand–indication alignment)?",verdict:"OFF-LABEL",status:"insufficient",
         response:"<b>No — Gammaplex is off-label for CIDP.</b> Per Aetna's brand table, Gammaplex 5%/10% is FDA-approved for primary immunodeficiency and ITP only. CIDP is not a labeled indication for this brand. Aetna's CIDP criteria themselves are brand-agnostic (&ldquo;IVIG or SCIG&rdquo;), so coverage is not automatically excluded — but off-label brand selection is a discretionary risk, and a reviewer could counter-offer an IVIG carrying an FDA CIDP indication.",
         citeLabel:"CLINICAL REASONING & CITATION",citation:"Policy: CPB 0206 → Brands &amp; FDA-Approved Indications (Gammaplex 5%/10%: primary immunodeficiency, idiopathic thrombocytopenic purpura). Because Gammaplex is a preferred product and the CIDP criteria are class-based, this is a consideration/risk rather than an automatic denial — but it is a residual variable specific to this brand.",decision:null},
        {n:3,group:"payer",question:"Is there a documented diagnosis of CIDP?",verdict:"DOCUMENTED, WITH CAVEAT",status:"insufficient",
         response:"Yes — &ldquo;CIDP&rdquo; appears in the Assessment/Plan and the Ongoing problem list, authored by the treating neurologist. <b>Caveat:</b> the note also records diagnostic uncertainty — &ldquo;Unclear if still CIDP this time or if more the lumbar issues.&rdquo;",
         citeLabel:"PACKET — CITATION",citation:"Packet: Neurology note — Assessment/Plan and Ongoing problem list (PDF p.9).",decision:null},
        {n:4,group:"payer",question:"Criterion (a): Is the disease course progressive or relapsing/remitting for ≥ 2 months?",verdict:"MET",status:"met",
         response:"Yes. HPI documents progressive leg neuropathy over months (tingling → bilateral tibialis-anterior weakness, progressing ~4 months then plateauing), then a relapsing/remitting course: marked improvement after IV steroids ~6 weeks prior, interval 04/02/2026 &ldquo;progressive worsening of left&gt;right weakness,&rdquo; and interval 06/15/2026 continued worsening. Duration far exceeds 2 months.",
         citeLabel:"PACKET — CITATION",citation:"Packet: Neurology note, History of Present Illness — intervals 6/26/25, 10/Y25, 4/2/26, 6/15/26 (PDF p.9). Policy: CPB 0206 → CIDP, criterion (a).",decision:null},
        {n:5,group:"payer",question:"Criterion (b): Is there moderate to severe functional disability?",verdict:"SUPPORTED, NOT QUANTIFIED",status:"insufficient",
         response:"<b>Supportive evidence, no formal score.</b> Documented: bilateral foot-drop, need for a new custom-fit AFO, left steppage gait, wide-based gait with positive Romberg, absent lower-extremity reflexes, and intrinsic-foot/tibialis-anterior atrophy. Counter: strength largely preserved (mostly 5/5, a few 5-/5).",
         citeLabel:"PACKET — CITATION",citation:"Packet: Physical Exam (PDF p.10) and Assessment/Plan (PDF p.9). Policy: CPB 0206 → CIDP, criterion (b). No standardized measure (INCAT, mRS) is documented; a reviewer may request quantification.",decision:null},
        {n:6,group:"payer",question:"Criterion (c): Is the CIDP diagnosis confirmed by electrodiagnostic studies?",verdict:"NOT MET AS SUBMITTED",status:"notmet",
         response:"The only formal electrodiagnostic result described is an Oct 2024 EMG/NCS showing &ldquo;severe, axonal, sensorimotor peripheral neuropathy&rdquo; — an axonal pattern, inconsistent with the demyelinating physiology defining CIDP.<br><br>A later note states an &ldquo;EMG highly consistent with demyelinating neuropathy,&rdquo; but no such report is attached, and it conflicts with the Oct 2024 finding. The 06/15/2026 plan lists &ldquo;Update BLE NCS with LLE EMG&rdquo; / NCV/EMG ordered — confirmatory studies are pending, not yet performed.",
         citeLabel:"CLINICAL REASONING & CITATION",citation:"Packet: Neurology note HPI (Oct 2024 EMG; interval &ldquo;demyelinating&rdquo; statement) and Assessment/Plan &amp; Orders (PDF p.9). Policy: CPB 0206 → CIDP, criterion (c). The attached electrodiagnostic evidence does not confirm demyelination; the demyelinating claim is narrative and unaccompanied by a report. This mandatory criterion is not satisfied by the evidence in the packet.",decision:null},
        {n:7,group:"payer",question:"Step therapy — is a trial of a preferred IVIG required before Gammaplex?",verdict:"NOT APPLICABLE",status:"na",
         response:"No step barrier. Gammaplex (J1557) is a preferred product per the 2026 Aetna Commercial Clinical Program Summary, so no trial of another IVIG is required. (The packet also documents a corticosteroid trial — IV methylprednisolone 1000 mg ×3 days, later Solu-Medrol — though steroids are not a prerequisite for IVIG in CIDP under this policy.)",
         citeLabel:"CITATION",citation:"Policy: 2026 Aetna Commercial Clinical Program Summary (uploaded PDF, p.7 — Gammaplex &ldquo;*&rdquo; preferred); CPB 0206 → Brand Selection. Packet: steroid history in HPI (PDF p.9).",decision:null},
        {n:8,group:"payer",question:"Is the diagnosis a covered indication/ICD-10 under the policy?",verdict:"MET (CODE NOT PRINTED)",status:"met",
         response:"CIDP is a covered medically-necessary IVIG indication and maps to ICD-10 G61.81, which is in Aetna's covered-code list. The packet documents the CIDP diagnosis but does not print an ICD-10 code.",
         citeLabel:"CITATION",citation:"Policy: CPB 0206 → covered ICD-10 list, G61.81. Packet: CIDP in Ongoing problem list (PDF p.9).",decision:null},
        {n:9,group:"payer",question:"Is the requested dose/regimen documented and within labeling/compendia/guidelines and quantity limits?",verdict:"PROVIDED; CONSISTENT (PENDING WEIGHT/QL)",status:"insufficient",
         response:"A specific regimen is now provided: Gammaplex 10%, 55 g IV daily × 4 days (220 g total). This maps to the standard CIDP IVIG induction dose.<br><br><b>Dose check:</b> 55 g/day ÷ &asymp;111 kg dosing weight &asymp; 0.5 g/kg/day → &asymp;2 g/kg over 4 days. The evidence-based CIDP induction dose is 2 g/kg divided over 2–5 days — so the requested course is consistent with guideline dosing. Gammaplex has no CIDP-specific FDA-labeled dose (off-label), so Aetna's compendia/guideline dosing basis applies. Final acceptance depends on the confirmed dosing weight (OCR-ambiguous here) and the Medical Specialty Medication Quantity Limit.",
         citeLabel:"REQUEST — CITATION",citation:"Request: Gammaplex 10% 55 g IV daily × 4 days. Packet: dosing weight in Physical Exam vitals, OCR-ambiguous &asymp;111 kg (PDF p.10). Policy: CPB 0206 → Dosage &amp; Administration (FDA labeling / accepted compendia / evidence-based guidelines; Quantity Limits).",decision:null}
      ],
      gaps:[
        {kind:"document",text:"<b>Electrodiagnostic confirmation of demyelination (mandatory)</b> — the attached study is axonal; a demyelinating NCS/EMG report is not included and is only pending. Still the single biggest gap."},
        {kind:"document",text:"<b>Formal functional-disability measure</b> — supportive but not quantified. No INCAT or mRS score is documented."},
        {kind:"document",text:"<b>Confirmed dosing weight</b> — needed to finalize the g/kg and quantity-limit check (weight is OCR-ambiguous in the packet)."},
        {kind:"interpretive",text:"<b>Off-label brand consideration</b> — Gammaplex is not FDA-labeled for CIDP; not a documentation gap per se, but a discretionary risk to anticipate."}
      ],
      assessment:{
        completeness:"<b>Closer than the base case, but still incomplete.</b> Versus a bare &ldquo;Trial of IVIG,&rdquo; this request adds the brand and a specific, guideline-consistent regimen, and the access path is clean (Gammaplex is preferred; dose &asymp;2 g/kg over 4 days).",
        asSubmitted:{rating:"Low readiness — high denial / RFI risk",rationale:"A mandatory gate (electrodiagnostic confirmation of demyelination, Req 6) is not evidenced and the only formal study on file contradicts CIDP. Under Aetna's all-of criteria, that alone drives a likely denial or a request for additional information."},
        ifClosed:{rating:"Moderate–High readiness",rationale:"If a demyelinating NCS/EMG report is attached (satisfies Req 6), a disability measure is added, and the dosing weight is confirmed — all three CIDP criteria are met, the product is preferred, and the dose is guideline-consistent. This lands slightly below the on-label scenario because Gammaplex is off-label for CIDP (Req 2), a residual discretionary risk that an on-label IVIG would not carry."},
        bottomLine:"providing the brand and a guideline-consistent dose strengthens the packet, but the determinative gap is unchanged — an electrodiagnostic study confirming demyelination (the updated NCS/EMG already ordered). The one new, brand-specific variable is that Gammaplex is off-label for CIDP; because Aetna's CIDP criteria are class-based and Gammaplex is preferred, this is a manageable risk rather than a hard exclusion, but it should be anticipated (e.g., a medical-necessity rationale for this product, or readiness to switch to an on-label IVIG if the reviewer requires).",
        decision:null},
      scopeNote:"Policy-readiness assessment against the written Aetna CPB 0206 criteria and the evidence physically present in the packet — not a coverage determination or medical advice. Dose interpretation uses an OCR-legible, ambiguous dosing weight and general CIDP dosing guidance; confirm the weight and the applicable quantity limit before submission. Illegible fields are marked accordingly.",
      grounding:"Grounded in Aetna CPB 0206 – Parenteral Immunoglobulins and the 2026 Aetna Commercial Clinical Program Summary, assessed against the faxed PA packet (received 06/15/2026). Assumed request: Gammaplex 10% 55 Gm IV daily × 4 days."
    }},
   {seq:2, therapyType:"Immune Globulin (IVIG)", item:"Pre-medication set (diphenhydramine / acetaminophen)", state:"TBD",
    payer:"SELF", paRequired:false, portal:"", updatedBy:"CPR+", updatedAt:"06/15 11:20", audit:null}
  ],
  log:[["06/15 11:20","EsperAI","PA packet ingested from eFax · 10 pages classified"],["06/15 11:21","EsperAI","Aetna benefit notice ingested · commercial plan confirmed"],["06/15 11:52","EsperAI","PA Policy Auditor complete · 9 requirements assessed · 1 blocking gap, 3 data gaps"],["06/15 11:52","System","Stage → Prior Auth · Clearance status = Pending Medical Records"]]},

 {id:"ESP-2026-004521", patient:"John Brown", dob:"03/15/1979", sex:"M", phone:"(312) 555-1090",
  drug:"Dupixent", dose:"300mg/2mL q2w", payer:"UnitedHealthcare", plan:"Choice Plus PPO", member:"UHC-2024-78956", memberConf:72,
  rx:"Dr. Sarah Chen", npi:"1234567890", dx:"L20.84 — Intrinsic atopic dermatitis",
  stage:1, status:"Pending Review", prio:"STAT", ageH:3, slaH:24, assigned:ME, received:"06/11 06:15",
  paReq:null, paReqAI:true, checks:mkChecks(false,true),
  docs:[["Referral_JBrown_0611.pdf","New Referral Form","06/11 06:15","Reviewed"],["MedRecords_JBrown.pdf","Medical Record","06/11 06:17","Classified"],["Labs_JBrown_2025.pdf","Lab Results","06/11 06:18","Classified"]],
  bv:null, pa:null,
  log:[["06/11 06:15","EsperAI","Document ingested from eFax and classified as New Referral Form (98%)"],["06/11 06:19","EsperAI","8 fields extracted · 7 high confidence · 1 low (Member ID 72%)"],["06/11 06:24","J. Doe (Clerk)","Referral created in EsperAI · status Created"],["06/11 06:24","System","Stage → Intake Verification · assigned to K. Chugh"]]},

 {id:"ESP-2026-004520", patient:"Maria Garcia", dob:"07/02/1968", sex:"F", phone:"(773) 555-0144",
  drug:"Humira", dose:"40mg q2w", payer:"Aetna", plan:"Open Access HMO", member:"AET99021133", memberConf:96,
  rx:"Dr. Alan Reyes", npi:"1932456781", dx:"M05.79 — Rheumatoid arthritis",
  stage:1, status:"Blocked", prio:"URGENT", ageH:29, slaH:24, assigned:ME, received:"06/10 04:30",
  paReq:true, paReqAI:true, checks:mkChecks(true,false), blockReason:"Missing insurance card — outreach faxed to prescriber 06/10 14:02",
  docs:[["Referral_MGarcia.pdf","New Referral Form","06/10 04:30","Reviewed"],["MedRecords_MGarcia.pdf","Medical Record","06/10 04:31","Classified"]],
  bv:null, pa:null,
  log:[["06/10 04:30","EsperAI","Referral ingested and classified"],["06/10 09:12","K. Chugh","Verification started"],["06/10 14:02","K. Chugh","Blocked — missing insurance card. Fax outreach sent to prescriber office"],["06/11 08:00","System","SLA breach warning issued"]]},

 {id:"ESP-2026-004528", patient:"Maria Garcia", dob:"07/02/1968", sex:"F", phone:"(773) 555-0144",
  drug:"Humira", dose:"40mg q2w", payer:"Aetna", plan:"Choice Plus PPO", member:"AET99021188", memberConf:94,
  rx:"Dr. Alan Reyes", npi:"1932456781", dx:"M05.79 — Rheumatoid arthritis",
  stage:1, status:"Pending Review", prio:"ROUTINE", ageH:4, slaH:48, assigned:ME, received:"06/11 08:45",
  paReq:null, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_MGarcia_0611.pdf","New Referral Form","06/11 08:45","Reviewed"]],
  bv:null, pa:null,
  log:[["06/11 08:45","EsperAI","New referral ingested — secondary plan detected"]]},

 {id:"ESP-2026-004519", patient:"Chen Wei", dob:"11/23/1990", sex:"M", phone:"(847) 555-0021",
  drug:"Stelara", dose:"90mg q8w", payer:"Cigna", plan:"LocalPlus", member:"CIG-7765401", memberConf:97,
  rx:"Dr. Emily Osei", npi:"1750382946", dx:"K50.90 — Crohn's disease",
  stage:3, status:"Pending Review", prio:"ROUTINE", ageH:7, slaH:72, assigned:ME, received:"06/10 13:05",
  paReq:true, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_CWei.pdf","New Referral Form","06/10 13:05","Reviewed"],["Labs_CWei.pdf","Lab Results","06/10 13:06","Reviewed"],["Insurance_CWei.pdf","Insurance Card","06/10 13:06","Reviewed"]],
  pa:{portal:"Availity", packet:[["Clinical summary","ok"],["Payer policy criteria mapped (8/8)","ok"],["PA form pre-filled","ok"],["Supporting docs bundled (3)","ok"]], submitted:false},
  log:[["06/10 13:05","EsperAI","Referral ingested"],["06/10 15:40","K. Chugh","Verification completed · PA Required = Yes"],["06/10 16:05","Insights","BV verified externally in Insights · coverage active"],["06/10 16:05","System","Stage → Prior Authorization"]]},

 {id:"ESP-2026-004515", patient:"Aisha Patel", dob:"01/30/1985", sex:"F", phone:"(630) 555-7733",
  drug:"Dupixent", dose:"200mg q2w", payer:"BCBS IL", plan:"Blue PPO", member:"XOF903312087", memberConf:99,
  rx:"Dr. Sarah Chen", npi:"1234567890", dx:"J45.50 — Severe persistent asthma",
  stage:3, status:"Review In Progress", prio:"URGENT", ageH:31, slaH:72, assigned:ME, received:"06/09 10:12",
  paReq:true, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_APatel.pdf","New Referral Form","06/09 10:12","Reviewed"],["MedRecords_APatel.pdf","Medical Record","06/09 10:13","Reviewed"],["Insurance_APatel.pdf","Insurance Card","06/09 10:14","Reviewed"],["Labs_APatel.pdf","Lab Results","06/09 11:02","Reviewed"]],
  pa:{portal:"Availity", packet:[["Clinical summary","ok"],["Payer policy criteria mapped (9/9)","ok"],["PA form pre-filled","ok"],["Supporting docs bundled (4)","ok"]], submitted:false},
  log:[["06/09 10:12","EsperAI","Referral ingested"],["06/09 14:30","K. Chugh","Verification completed"],["06/10 09:05","Insights","BV verified externally in Insights · PA required"],["06/10 09:06","System","Stage → Prior Authorization"],["06/11 08:40","EsperAI","PA packet assembled · ready for review"]]},

 {id:"ESP-2026-004511", patient:"David Lee", dob:"09/17/1973", sex:"M", phone:"(708) 555-2210",
  drug:"Enbrel", dose:"50mg qw", payer:"Optum Rx (CMM)", plan:"Medicare Part D", member:"OPT-118842", memberConf:95,
  rx:"Dr. Maya Kapoor", npi:"1447103652", dx:"L40.50 — Psoriatic arthritis",
  stage:3, status:"PA Submitted", prio:"ROUTINE", ageH:54, slaH:72, assigned:"R. Alvarez", received:"06/08 09:00",
  paReq:true, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_DLee.pdf","New Referral Form","06/08 09:00","Reviewed"],["Insurance_DLee.pdf","Insurance Card","06/08 09:02","Reviewed"]],
  pa:{portal:"CoverMyMeds", packet:[["Clinical summary","ok"],["Payer policy criteria mapped (7/7)","ok"],["PA form pre-filled","ok"],["Supporting docs bundled (2)","ok"]], submitted:true, subDate:"06/10 16:22", paNum:"CMM-88431207"},
  log:[["06/10 16:22","R. Alvarez","PA submitted via CoverMyMeds · authorization number CMM-88431207"]]},

 {id:"ESP-2026-004526", patient:"Laura Wilson", dob:"05/09/1995", sex:"F", phone:"(312) 555-8821",
  drug:"Skyrizi", dose:"150mg q12w", payer:"UnitedHealthcare", plan:"Navigate HMO", member:"UHC-2026-11034", memberConf:98,
  rx:"Dr. Alan Reyes", npi:"1932456781", dx:"L40.0 — Plaque psoriasis",
  stage:1, status:"Pending Review", prio:"ROUTINE", ageH:1, slaH:24, assigned:"—", received:"06/11 08:44",
  paReq:null, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_LWilson.pdf","New Referral Form","06/11 08:44","Classified"]],
  bv:null, pa:null,
  log:[["06/11 08:44","EsperAI","Referral ingested · awaiting clerk setup"]]},

 {id:"ESP-2026-004509", patient:"Robert King", dob:"12/01/1959", sex:"M", phone:"(224) 555-9080",
  drug:"Remicade", dose:"5mg/kg q8w", payer:"Aetna", plan:"Medicare Adv PPO", member:"AET55102998", memberConf:94,
  rx:"Dr. Emily Osei", npi:"1750382946", dx:"K51.90 — Ulcerative colitis",
  stage:3, status:"Blocked", prio:"URGENT", ageH:50, slaH:72, assigned:ME, received:"06/09 07:30",
  paReq:true, paReqAI:true, checks:mkChecks(false,false), blockReason:"Insights BV reports coverage termed 05/31 — confirming new plan with patient",
  docs:[["Referral_RKing.pdf","New Referral Form","06/09 07:30","Reviewed"],["Insurance_RKing.pdf","Insurance Card","06/09 07:32","Reviewed"]],
  pa:{portal:"Availity", packet:[["Clinical summary","ok"],["Payer policy criteria mapped (6/8)","warn"],["PA form pre-filled","ok"],["Supporting docs bundled (2)","ok"]], submitted:false},
  log:[["06/10 11:15","K. Chugh","Blocked — Insights BV reports coverage termed. Patient outreach initiated"]]},

 {id:"ESP-2026-004523", patient:"Sofia Rossi", dob:"04/21/1988", sex:"F", phone:"(331) 555-4412",
  drug:"Ozempic", dose:"1mg qw", payer:"Cigna", plan:"Open Access Plus", member:"CIG-2210448", memberConf:97,
  rx:"Dr. Maya Kapoor", npi:"1447103652", dx:"E11.9 — Type 2 diabetes",
  stage:1, status:"Review In Progress", prio:"ROUTINE", ageH:5, slaH:24, assigned:ME, received:"06/11 04:05",
  paReq:null, paReqAI:false, checks:mkChecks(false,false),
  docs:[["Referral_SRossi.pdf","New Referral Form","06/11 04:05","Reviewed"],["Insurance_SRossi.pdf","Insurance Card","06/11 04:06","Classified"]],
  bv:null, pa:null,
  log:[["06/11 08:55","K. Chugh","Verification started"]]},

 {id:"ESP-2026-004507", patient:"James O'Neil", dob:"08/14/1981", sex:"M", phone:"(815) 555-3327",
  drug:"Cosentyx", dose:"300mg q4w", payer:"BCBS IL", plan:"Blue Choice", member:"XOF118820441", memberConf:98,
  rx:"Dr. Sarah Chen", npi:"1234567890", dx:"M45.9 — Ankylosing spondylitis",
  stage:3, status:"Pending Review", prio:"ROUTINE", ageH:20, slaH:72, assigned:"R. Alvarez", received:"06/09 14:00",
  paReq:true, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_JONeil.pdf","New Referral Form","06/09 14:00","Reviewed"]],
  pa:{portal:"Availity", packet:[["Clinical summary","ok"],["Payer policy criteria mapped (8/9)","warn"],["PA form pre-filled","ok"],["Supporting docs bundled (3)","ok"]], submitted:false},
  log:[["06/11 07:10","EsperAI","PA packet assembled · 1 criterion needs review"]]},

 {id:"ESP-2026-004524", patient:"Emma Davis", dob:"02/11/2001", sex:"F", phone:"(630) 555-6610",
  drug:"Dupixent", dose:"300mg q2w", payer:"UnitedHealthcare", plan:"Choice Plus PPO", member:"UHC-2026-30988", memberConf:91,
  rx:"Dr. Alan Reyes", npi:"1932456781", dx:"L20.84 — Atopic dermatitis",
  stage:1, status:"Pending Review", prio:"ROUTINE", ageH:4, slaH:24, assigned:"—", received:"06/11 05:20",
  paReq:null, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_EDavis.pdf","New Referral Form","06/11 05:20","Classified"],["MedRecords_EDavis.pdf","Medical Record","06/11 05:22","Classified"]],
  bv:null, pa:null, log:[["06/11 05:25","System","Awaiting verification · unassigned"]]},

 {id:"ESP-2026-004503", patient:"Noah Schmidt", dob:"06/30/1976", sex:"M", phone:"(847) 555-9015",
  drug:"Xeljanz", dose:"11mg qd", payer:"Optum Rx (CMM)", plan:"Commercial", member:"OPT-664210", memberConf:96,
  rx:"Dr. Emily Osei", npi:"1750382946", dx:"M06.9 — Rheumatoid arthritis",
  stage:3, status:"Review In Progress", prio:"ROUTINE", ageH:46, slaH:72, assigned:ME, received:"06/09 09:40",
  paReq:true, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_NSchmidt.pdf","New Referral Form","06/09 09:40","Reviewed"]],
  pa:{portal:"CoverMyMeds", packet:[["Clinical summary","ok"],["Payer policy criteria mapped (7/7)","ok"],["PA form pre-filled","ok"],["Supporting docs bundled (1)","ok"]], submitted:false},
  log:[["06/11 09:01","Insights","BV verified externally in Insights · advancing to PA"]]},

 {id:"ESP-2026-004527", patient:"Olivia Brown", dob:"10/05/1992", sex:"F", phone:"(312) 555-7245",
  drug:"Tremfya", dose:"100mg q8w", payer:"Aetna", plan:"Choice POS II", member:"AET33098112", memberConf:88,
  rx:"Dr. Maya Kapoor", npi:"1447103652", dx:"L40.0 — Plaque psoriasis",
  stage:1, status:"Pending Review", prio:"ROUTINE", ageH:0.5, slaH:24, assigned:"—", received:"06/11 09:10",
  paReq:null, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_OBrown.pdf","New Referral Form","06/11 09:10","Unclassified"]],
  bv:null, pa:null, log:[["06/11 09:10","EsperAI","Document received · classification in progress"]]},

 {id:"ESP-2026-004499", patient:"William Turner", dob:"03/03/1965", sex:"M", phone:"(773) 555-1180",
  drug:"Rituxan", dose:"375mg/m²", payer:"Cigna", plan:"PPO", member:"CIG-9981022", memberConf:97,
  rx:"Dr. Sarah Chen", npi:"1234567890", dx:"C82.10 — Follicular lymphoma",
  stage:3, status:"Blocked", prio:"STAT", ageH:80, slaH:72, assigned:"R. Alvarez", received:"06/06 11:00",
  paReq:true, paReqAI:true, checks:mkChecks(false,false), blockReason:"Payer requested peer-to-peer review — scheduled 06/12 10:00",
  docs:[["Referral_WTurner.pdf","New Referral Form","06/06 11:00","Reviewed"]],
  pa:{portal:"Availity", packet:[["Clinical summary","ok"],["Payer policy criteria mapped (6/8)","warn"],["PA form pre-filled","ok"],["Supporting docs bundled (5)","ok"]], submitted:true, subDate:"06/08 15:30", paNum:"AV-20260608-5521"},
  log:[["06/10 13:45","Payer","Additional info requested — peer-to-peer"]]},

 {id:"ESP-2026-004516", patient:"Grace Kim", dob:"09/02/1983", sex:"F", phone:"(312) 555-6402",
  drug:"Taltz", dose:"80mg q4w", payer:"Cigna", plan:"Open Access Plus", member:"CIG-5520981", memberConf:97,
  rx:"Dr. Tom Varga", npi:"1660092837", dx:"L40.0 — Plaque psoriasis",
  stage:2, status:"Awaiting BV (Insights)", prio:"ROUTINE", ageH:14, slaH:72, assigned:ME, received:"06/10 11:20",
  paReq:true, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_GKim.pdf","New Referral Form","06/10 11:20","Reviewed"],["Insurance_GKim.pdf","Insurance Card","06/10 11:22","Reviewed"]],
  pa:null,
  log:[["06/10 11:20","EsperAI","Referral ingested"],["06/10 15:02","K. Chugh","Verification completed · PA Required = Yes · submitted to CPR+"],["06/10 15:02","System","Stage → CPR+ · BV running externally in Insights"]]},

 {id:"ESP-2026-004513", patient:"Henry Adeyemi", dob:"04/12/1971", sex:"M", phone:"(708) 555-1108",
  drug:"Otezla", dose:"30mg bid", payer:"Humana", plan:"Gold Plus HMO", member:"HUM-3308812", memberConf:96,
  rx:"Dr. Maya Kapoor", npi:"1447103652", dx:"L40.50 — Psoriatic arthritis",
  stage:2, status:"Complete — no PA", prio:"ROUTINE", ageH:30, slaH:72, assigned:ME, received:"06/09 16:45",
  paReq:false, paReqAI:false, checks:mkChecks(false,false),
  docs:[["Referral_HAdeyemi.pdf","New Referral Form","06/09 16:45","Reviewed"]],
  pa:null,
  log:[["06/09 16:45","EsperAI","Referral ingested"],["06/10 10:10","K. Chugh","Verification completed · PA Required = No · submitted to CPR+"],["06/10 10:10","System","Case complete in PA — no PA required"]]},

 /* ===== BV returned from Insights — awaiting PA Required decision (Referral Setup · Pending) ===== */
 {id:"ESP-2026-004530", patient:"Sofia Rossi", dob:"11/05/1990", sex:"F", phone:"(312) 555-3398",
  drug:"Ozempic", dose:"1mg qw", payer:"Cigna", plan:"Open Access Plus", member:"CIG-3902150", memberConf:96,
  rx:"Dr. Maya Kapoor", npi:"1447103652", dx:"E11.9 — Type 2 diabetes mellitus",
  stage:2, status:"Pending Review", prio:"STAT", ageH:5, slaH:24, assigned:ME, received:"06/11 05:40",
  paReq:null, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_SRossi.pdf","New Referral Form","06/11 05:40","Reviewed"],["Insurance_SRossi.pdf","Insurance Card","06/11 05:41","Reviewed"]],
  bv:null, pa:null,
  log:[["06/11 05:40","EsperAI","Referral ingested & classified"],["06/11 05:42","K. Chugh (Data Entry Clerk)","Intake completed · submitted to CPR+ for BV"],["06/11 09:10","Insights","BV complete · coverage active · returned for PA decision"],["06/11 09:10","System","Stage → Referral Setup · Status = Pending · awaiting PA Required decision"]]},

 {id:"ESP-2026-004531", patient:"James Carter", dob:"08/19/1976", sex:"M", phone:"(773) 555-7741",
  drug:"Humira", dose:"40mg q2w", payer:"Aetna", plan:"Choice POS II", member:"AET77451209", memberConf:95,
  rx:"Dr. Alan Reyes", npi:"1932456781", dx:"M05.79 — Rheumatoid arthritis",
  stage:2, status:"Pending Review", prio:"ROUTINE", ageH:9, slaH:48, assigned:ME, received:"06/10 22:15",
  paReq:null, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_JCarter.pdf","New Referral Form","06/10 22:15","Reviewed"],["MedRecords_JCarter.pdf","Medical Record","06/10 22:16","Reviewed"]],
  bv:null, pa:null,
  log:[["06/10 22:15","EsperAI","Referral ingested & classified"],["06/10 22:18","K. Chugh (Data Entry Clerk)","Intake completed · submitted to CPR+ for BV"],["06/11 08:05","Insights","BV complete · coverage active · returned for PA decision"],["06/11 08:05","System","Stage → Referral Setup · Status = Pending · awaiting PA Required decision"]]},

 {id:"ESP-2026-004532", patient:"Olivia Bennett", dob:"02/27/1988", sex:"F", phone:"(630) 555-2096",
  drug:"Otezla", dose:"30mg bid", payer:"BCBS IL", plan:"Blue PPO", member:"XOF551203998", memberConf:98,
  rx:"Dr. Tom Varga", npi:"1660092837", dx:"L40.0 — Plaque psoriasis",
  stage:2, status:"Pending Review", prio:"ROUTINE", ageH:6, slaH:48, assigned:ME, received:"06/11 07:20",
  paReq:null, paReqAI:false, checks:mkChecks(false,false),
  docs:[["Referral_OBennett.pdf","New Referral Form","06/11 07:20","Reviewed"],["Insurance_OBennett.pdf","Insurance Card","06/11 07:21","Reviewed"]],
  bv:null, pa:null,
  log:[["06/11 07:20","EsperAI","Referral ingested & classified"],["06/11 07:23","K. Chugh (Data Entry Clerk)","Intake completed · submitted to CPR+ for BV"],["06/11 09:25","Insights","BV complete · coverage active · no PA edit on file · returned for PA decision"],["06/11 09:25","System","Stage → Referral Setup · Status = Pending · awaiting PA Required decision"]]},

 /* ===== Still at Insights for BV — use to demo the 'Simulate BV done' action ===== */
 {id:"ESP-2026-004535", patient:"Daniel Cohen", dob:"06/14/1982", sex:"M", phone:"(847) 555-4412",
  drug:"Dupixent", dose:"300mg q2w", payer:"UnitedHealthcare", plan:"Choice Plus PPO", member:"UHC-2026-55218", memberConf:97,
  rx:"Dr. Sarah Chen", npi:"1234567890", dx:"L20.84 — Intrinsic atopic dermatitis",
  stage:2, status:"Awaiting BV (Insights)", prio:"ROUTINE", ageH:11, slaH:48, assigned:ME, received:"06/10 18:50",
  paReq:true, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_DCohen.pdf","New Referral Form","06/10 18:50","Reviewed"],["Insurance_DCohen.pdf","Insurance Card","06/10 18:52","Reviewed"]],
  bv:null, pa:null,
  log:[["06/10 18:50","EsperAI","Referral ingested & classified"],["06/10 18:55","K. Chugh (Data Entry Clerk)","Intake completed · submitted to CPR+ for BV"],["06/10 18:55","System","Stage → Referral Setup · BV running externally in Insights"]]},

 /* ===== Cases another specialist currently has OPEN (locked) — click to see the "Case in use" notice ===== */
 {id:"ESP-2026-004540", patient:"Grace Liu", dob:"04/18/1986", sex:"F", phone:"(312) 555-7012",
  drug:"Skyrizi", dose:"150mg q12w", payer:"Cigna", plan:"Open Access Plus", member:"CIG-4471203", memberConf:96,
  rx:"Dr. Maya Kapoor", npi:"1447103652", dx:"L40.0 — Plaque psoriasis",
  stage:3, status:"Review In Progress", prio:"URGENT", ageH:9, slaH:72, assigned:ME, lockedBy:"R. Alvarez", received:"06/10 14:10",
  paReq:true, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_GLiu.pdf","New Referral Form","06/10 14:10","Reviewed"],["Labs_GLiu.pdf","Lab Results","06/10 14:12","Reviewed"]],
  pa:{portal:"Availity", packet:[["Clinical summary","ok"],["Payer policy criteria mapped (8/8)","ok"],["PA form pre-filled","ok"],["Supporting docs bundled (2)","ok"]], submitted:false},
  log:[["06/10 14:10","EsperAI","Referral ingested"],["06/11 09:30","R. Alvarez","Opened case · reviewing PA form"]]},

 {id:"ESP-2026-004541", patient:"Marcus Webb", dob:"10/02/1971", sex:"M", phone:"(773) 555-3389",
  drug:"Stelara", dose:"90mg q8w", payer:"Aetna", plan:"Choice POS II", member:"AET88231044", memberConf:94,
  rx:"Dr. Emily Osei", npi:"1750382946", dx:"K50.90 — Crohn's disease",
  stage:3, status:"Review In Progress", prio:"ROUTINE", ageH:16, slaH:72, assigned:ME, lockedBy:"J. Kim", received:"06/10 10:05",
  paReq:true, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_MWebb.pdf","New Referral Form","06/10 10:05","Reviewed"],["Insurance_MWebb.pdf","Insurance Card","06/10 10:07","Reviewed"]],
  pa:{portal:"Availity", packet:[["Clinical summary","ok"],["Payer policy criteria mapped (9/9)","ok"],["PA form pre-filled","ok"],["Supporting docs bundled (2)","ok"]], submitted:false},
  log:[["06/10 10:05","EsperAI","Referral ingested"],["06/11 09:18","J. Kim","Opened case · reviewing PA form"]]},

 {id:"ESP-2026-004542", patient:"Priya Anand", dob:"07/26/1993", sex:"F", phone:"(630) 555-9921",
  drug:"Taltz", dose:"80mg q4w", payer:"BCBS IL", plan:"Blue PPO", member:"XOF770114552", memberConf:97,
  rx:"Dr. Tom Varga", npi:"1660092837", dx:"L40.0 — Plaque psoriasis",
  stage:3, status:"Review In Progress", prio:"ROUTINE", ageH:6, slaH:72, assigned:ME, lockedBy:"R. Alvarez", received:"06/11 07:40",
  paReq:true, paReqAI:true, checks:mkChecks(false,false),
  docs:[["Referral_PAnand.pdf","New Referral Form","06/11 07:40","Reviewed"],["Labs_PAnand.pdf","Lab Results","06/11 07:42","Reviewed"]],
  pa:{portal:"Availity", packet:[["Clinical summary","ok"],["Payer policy criteria mapped (8/8)","ok"],["PA form pre-filled","ok"],["Supporting docs bundled (2)","ok"]], submitted:false},
  log:[["06/11 07:40","EsperAI","Referral ingested"],["06/11 09:40","R. Alvarez","Opened case · reviewing PA form"]]}
];
