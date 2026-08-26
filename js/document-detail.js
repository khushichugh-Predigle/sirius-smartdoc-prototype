/* Screen B — Document Detail.
 * Simplified re-implementation of esp-intake/pages/document-detail plus its
 * child components (left-section, dynamic-form, right-section). All data is
 * static/in-memory (window.DUMMY_DOCUMENTS + window.INTAKE_FORM_SCHEMA) —
 * nothing here calls a backend or persists beyond this page load.
 *
 * NPI-registry lookup, drug-catalogue lookup, the patient/provider match
 * accordion and Attach-to-Case are all included per your "include all,
 * dummy-driven" scope decision — every result list below is fabricated. */
(function () {
  const DOCUMENT_TYPE_OPTIONS = [
    'Auth Form', 'Consent Forms', 'Clinical', 'Delivery Ticket - Signed',
    'Delivery Ticket - Unsigned', 'Discharge Orders', 'Fax Cover Sheet',
    'Insurance Information', 'Lab Orders', 'Lab Results', 'Medication History',
    'On Call Request', 'Orders - Signed', 'Orders - Unsigned', 'PA Authorization',
    'Payer Notices', 'Payment Request', 'Pharmacy Work Order', 'Pick Up Ticket',
    'Plan of Treatment', 'Pump Programming Worksheet', 'Re-Authorization',
    'Referral', 'Statement of Medical Necessity - Signed',
    'Statement of Medical Necessity - Unsigned', 'Supply List', 'Verbal Order',
  ];

  const REJECT_REASONS = ['Wrong patient', 'Wrong document type', 'Duplicate of existing document', 'Illegible / unusable scan', 'Missing required pages'];
  const RECLASSIFY_REASONS = ['Misclassified by AI extraction', 'Document contains multiple types', 'Reviewer correction', 'Other'];

  const qs = new URLSearchParams(window.location.search);
  const requestedId = qs.get('id');
  const doc = window.DUMMY_DOCUMENTS.find((d) => d._id === requestedId) || window.DUMMY_DOCUMENTS[0];
  const ext = doc.extracted_data[0];

  const state = {
    providerSearchQuery: '',
    providerSearchMode: 'match',  // 'match' (replace card #1) | 'add' (append a new peer card)
    providerSearchView: 'list',   // 'list' | 'form' — same two-view stack as contactsModal
    providerFormValues: {},
    providerFormEditingId: null,  // CPR+ id being edited via the list's Edit icon, else null (= creating new)
    providerSearchSpecialty: '',
    providerSearchSortCol: 'name',
    providerSearchSortAsc: true,
    activeSectionIndex: 0,
    collapsed: {},               // subsection id -> bool (collapsed)
    evidenceOpenKey: null,
    npiCard: null,                // {fieldKey, top,left,width}
    drugCard: null,
    // Starts collapsed — a match is already pre-selected, and showing the
    // full candidate list open by default just repeats the same person the
    // collapsed summary row already names. Expand only shows on request.
    matchExpanded: false,
    matchSelectedId: 'm1',
    // Provider matching is a separate decision from patient matching — these
    // were one shared pair before, so picking a provider silently rewrote the
    // patient selection.
    providerMatchSelectedId: null,
    providerBannerExpanded: false, // §3 test-doc-only top-banner variant
    providers: [],                // ranked provider instances (see initProviders)
    providerDragUid: null,
    careTeamLoadedFor: null,      // MATCH_CANDIDATES id whose care team is already loaded
    attachMode: null,             // null | 'existing' | 'new'
    attachedCase: null,
    sidePanelOpen: false,
    sidePanelFilterOpen: false,
    sidePanelSelectedId: null,
    documentType: doc.document_type,
    status: titleCase(Claims.effective(doc).status),
    claimedBy: Claims.effective(doc).claimedBy,
    unclaimOpen: false,
    rejectOpen: false,
    reclassifyOpen: false,
    reclassifyTo: null,
    zoom: 100,
    rotation: 0,
    extraDrugSubsections: [],     // subsection clones added via "Add Drug"
    fieldOverrides: {},           // fieldKey -> value the reviewer typed
  };

  function titleCase(v) {
    return String(v || '').replace(/[_-]+/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function statusTheme(status) {
    const v = status.toLowerCase();
    if (v.includes('in review') || v.includes('review in progress')) return 'blue';
    if (v.includes('reviewed') || v.includes('complete')) return 'success';
    if (v.includes('rejected') || v.includes('duplicate')) return 'error';
    if (v.includes('processing')) return 'gray';
    return 'warning';
  }

  // "Review In Progress" is an internal status name (claim system) — shown
  // to the user simply as "In Review", same label as the unclaimed variant;
  // the claim button/icon is what tells them apart now.
  function statusDisplayText(status) {
    return status.toLowerCase().includes('review in progress') ? 'In Review' : status;
  }

  /* ---------- Claim state (Data Entry Clerk concurrent editing) ---------- */
  function getClaimState() {
    const actor = Shell.ACTORS[Shell.getActor()];
    const role = Shell.getRole();
    const claimedBy = state.claimedBy;
    // "Acting as" only represents a Data Entry Clerk identity — Patient
    // Access Manager is never the claimant, regardless of who's selected.
    const isClaimedByMe = role !== 'pam' && !!claimedBy && claimedBy.name === actor.name;
    const isClaimedByOther = !!claimedBy && !isClaimedByMe;
    const isUnclaimed = !claimedBy;
    // Patient Access Manager: view + unclaim only, never edits intake data.
    const isReadOnly = role === 'pam' || isClaimedByOther || isUnclaimed;
    // Unclaimed (and not PAM) is "gated" rather than hard-disabled: fields
    // look editable, but the first interaction prompts the user to claim
    // the document instead of blocking silently.
    const isGated = isUnclaimed && role !== 'pam';
    return { actor, role, claimedBy, isClaimedByMe, isClaimedByOther, isUnclaimed, isReadOnly, isGated };
  }

  /* ---------- Field <-> dummy-data mapping ----------
   * The real form's field keys are opaque UUIDs with no correlation to the
   * dummy data's human-readable keys — that mapping happens deep inside the
   * ~11.5k-line document-detail.component.ts we were told to ignore. This is
   * a simple label-based lookup built for this prototype only. */
  function lookupPatient(key) { return ext.patient_information[key] || null; }
  function lookupProvider(key) { return ext.provider_information[key] || null; }
  function lookupInsurance(key) { return ext.insurance_information ? ext.insurance_information[key] : null; }
  function lookupDrug(idx, key) {
    const list = ext.medication_information && ext.medication_information.value;
    return list && list[idx] ? list[idx][key] : null;
  }

  const PATIENT_INFO_MAP = {
    'first name': 'patient_first_name', 'last name': 'patient_last_name',
    'address': 'patient_street_address', 'zip': 'patient_zip', 'city': 'patient_city',
    'state': 'patient_state', 'home phone': 'patient_home_phone', 'cell phone': 'patient_cell_phone',
    'work phone': 'patient_work_phone', 'email': 'email', 'gender': 'gender', 'dob': 'dob',
    'ssn': 'ssn', 'referral date': 'referral_date', 'referral source': 'referral_source',
  };
  const MISC_MAP = {
    'category': 'category', 'site of service': 'site_of_service', 'code status': 'code_status',
    'language': 'language', 'team': 'team',
  };
  const PRESCRIBER_MAP = {
    'first name': 'provider_first_name', 'last name': 'provider_last_name',
    'specialty': 'specialty', 'prof. designation': 'prof_designation',
    'telephone': 'provider_phone', 'fax': 'fax', 'email': 'email',
  };
  const ORG_MAP = {
    'organization name': 'organization_name', 'address': 'address', 'zip': 'zip',
    'city': 'city', 'state': 'state',
  };
  const LICENSE_MAP = { 'npi': 'provider_npi', 'dea #': 'dea_number', 'taxonomy': 'taxonomy_code' };
  const STATS_MAP = { 'height (in.)': 'patient_height', 'weight (lbs.)': 'patient_weight', 'date': 'physical_examination_date' };
  const DRUG_MAP = { 'ordered item': 'drug_name', 'dose': 'strength', 'unit': 'unit', 'route': 'route', 'frequency': 'frequency' };

  function resolveValue(ctx, field) {
    const label = field.label.trim().toLowerCase();
    let hit = null;
    if (ctx.section === 'Patient Demographics' && ctx.subsection === 'Patient Information' && PATIENT_INFO_MAP[label]) {
      hit = lookupPatient(PATIENT_INFO_MAP[label]);
    } else if (ctx.section === 'Patient Demographics' && ctx.subsection === 'Miscellaneous' && MISC_MAP[label]) {
      hit = lookupPatient(MISC_MAP[label]);
    } else if (ctx.subsection === 'Prescriber' && PRESCRIBER_MAP[label]) {
      hit = lookupProvider(PRESCRIBER_MAP[label]);
    } else if (ctx.subsection === 'Organization' && ORG_MAP[label]) {
      hit = lookupProvider(ORG_MAP[label]);
    } else if (ctx.subsection === 'License Info' && LICENSE_MAP[label]) {
      hit = lookupProvider(LICENSE_MAP[label]);
    } else if (ctx.subsection === 'Patient Stats' && STATS_MAP[label]) {
      hit = lookupPatient.call(null, STATS_MAP[label]) || lookupProvider(STATS_MAP[label]);
      // physical_examination_date / height / weight live under patient_information
      hit = lookupPatient(STATS_MAP[label]);
    } else if (ctx.subsection === 'Drug' && DRUG_MAP[label]) {
      hit = lookupDrug(ctx.drugIndex || 0, DRUG_MAP[label]);
    }
    return hit && hit.value !== undefined ? hit : null;
  }

  /* ---------- Build sections from the trimmed schema ---------- */
  const SCHEMA = window.INTAKE_FORM_SCHEMA;
  let subsectionSeq = 0;
  function annotateSubsection(sub, ctxParent) {
    sub._id = 'sub' + (subsectionSeq++);
    const ctx = Object.assign({}, ctxParent, { subsection: sub.title });
    sub.fields.forEach((f) => {
      const resolved = resolveValue(ctx, f);
      f._key = sub._id + '__' + f.key;
      // Pristine extracted value, kept separate from _value (which folds in
      // the reviewer's overrides) so "Use extracted:" can always get back to
      // what the document actually said. See providerFieldSourceRow().
      f._extracted = resolved ? resolved.value : '';
      f._value = state.fieldOverrides[f._key] !== undefined ? state.fieldOverrides[f._key] : (resolved ? resolved.value : '');
      if (resolved) {
        f._confidence = resolved.confidence_score;
        f._evidence = {
          page: resolved.page_number || 1,
          line: resolved.source_line || resolved.value,
          explanation: resolved.explanation || '',
        };
      }
    });
    (sub.subsections || []).forEach((child) => annotateSubsection(child, ctx));
  }
  SCHEMA.sections.forEach((sec) => {
    const ctx = { section: sec.title };
    sec.fields.forEach((f) => { f._key = 'top__' + f.key; f._value = ''; });
    (sec.subsections || []).forEach((sub) => annotateSubsection(sub, ctx));
  });

  /* ================= Provider instances =================
   * The schema already declares this section as a repeating list — see the
   * "Provider " subsection's repeat block:
   *   { source:'providers', serialField:<Seq #>, dedupeBy:<NPI>, collapseAfterFirst:true }
   * Nothing read it before; this does. Ordering follows the same product rule
   * the real app documents: the extracted provider leads at #1, the patient's
   * existing care team follows by rank. */
  const PROVIDER_SECTION = SCHEMA.sections.find((s) => s.title === 'M.D./Providers');
  const PROVIDER_TEMPLATE = PROVIDER_SECTION.subsections[0];
  const PROVIDER_REPEAT = PROVIDER_TEMPLATE.repeat || {};
  const SEQ_FIELD_KEY = PROVIDER_REPEAT.serialField;
  const NPI_FIELD_KEY = PROVIDER_REPEAT.dedupeBy;

  // §3 — the one document the top-banner match UI experiment runs on
  // (302055_Referral_JessicaWhitfield…, extracted prescriber ANITA R DESAI).
  const PROVIDER_BANNER_TEST_DOC_ID = '00000000000000000000000f';

  /* prescriber database — the fixture from PrescriberIntake-Scenario-
   * Modelling.xlsx, so the four modelled scenarios can be walked end to end. */
  const CPR_PRESCRIBERS = [
    { id: 'Pr1', first_name: 'John', last_name: 'Blaine', specialty: 'Oncology', organization: 'Jerky Pediatrics', address: '123 Dull Ave', city: 'Troy', state: 'MI', zip: '48083', npi: '1730123456', phone: '(586) 555-0101', prof_designation: 'MD' },
    { id: 'Pr2', first_name: 'Mary', last_name: 'Costa', specialty: 'Gastro', organization: 'Holy Hospitals', address: '234 Mill Rd', city: 'Warren', state: 'MI', zip: '48091', npi: '1922334455', phone: '(586) 555-0202', prof_designation: 'MD' },
    { id: 'Pr3', first_name: 'Abdu', last_name: 'Mohammed', specialty: 'Internal Medicine', organization: 'Piedmont Physicians', address: '456 Stake St', city: 'Warren', state: 'MI', zip: '48088', npi: '1811223344', phone: '(586) 555-0303', prof_designation: 'MD' },
    { id: 'Pr4', first_name: 'A.', last_name: 'Mohammed', specialty: 'Hospitalist', organization: 'St. John Hospital', address: '456 Ryan Rd', city: 'Detroit', state: 'MI', zip: '48235', npi: '1647382910', phone: '(313) 555-0404', prof_designation: 'MD' },
    // Deliberate near-duplicates for the "NARAYAN P VERMA" extraction (several
    // dummy documents carry this prescriber, always with a blank NPI) — three
    // on-file Vermas so the multi-match disambiguation UI has something real
    // to disambiguate.
    { id: 'Pr5', first_name: 'Narayan', last_name: 'Verma', specialty: 'Neurology', organization: 'BG Tricounty Neurology and Sleep Clinic', address: '31150 Hoover Rd Suite B', city: 'Warren', state: 'MI', zip: '48093', npi: '1922441178', phone: '(586) 983-3666', prof_designation: 'MD FACP FAAN FAASM' },
    { id: 'Pr6', first_name: 'Narayan', last_name: 'Verma', specialty: 'Sleep Medicine', organization: 'Beaumont Neurology Associates', address: '44405 Woodward Ave', city: 'Pontiac', state: 'MI', zip: '48341', npi: '1033552289', phone: '(248) 551-0110', prof_designation: 'MD' },
    { id: 'Pr7', first_name: 'N.', last_name: 'Verma', specialty: 'Neurology', organization: 'Tricounty Sleep Center', address: '31150 Hoover Rd Suite B', city: 'Warren', state: 'MI', zip: '48093', npi: '1755663390', phone: '(586) 983-3699', prof_designation: 'DO' },
    // Near-duplicates for the "ANITA R DESAI" extraction (302055_Referral_
    // JessicaWhitfield…, doc 00000000000000000000000f) — the top-banner
    // match-UI experiment (§3) needs a real multi-match to show.
    { id: 'Pr8', first_name: 'Anita', last_name: 'Desai', specialty: 'Endocrinology', organization: 'Cornerstone Endocrine Group', address: '5422 Hoover Rd Suite C', city: 'Duluth', state: 'MN', zip: '55802', npi: '1699887744', phone: '(799) 605-1194', prof_designation: 'MD' },
    { id: 'Pr9', first_name: 'Anita', last_name: 'Desai', specialty: 'Internal Medicine', organization: 'Duluth Family Health', address: '812 Superior St', city: 'Duluth', state: 'MN', zip: '55805', npi: '1477663322', phone: '(218) 727-4400', prof_designation: 'MD DO' },
    { id: 'Pr10', first_name: 'A.', last_name: 'Desai', specialty: 'Endocrinology', organization: 'Lakeview Endocrinology Associates', address: '5422 Hoover Rd Suite C', city: 'Duluth', state: 'MN', zip: '55802', npi: '1355229988', phone: '(218) 727-9010', prof_designation: 'DO' },
  ];

  // Provider-card field label -> CPR record key. Used both to seed a card from
  // a CPR record and to diff extracted values against it.
  const PROVIDER_RECORD_MAP = {
    'first name': 'first_name', 'last name': 'last_name', 'specialty': 'specialty',
    'prof. designation': 'prof_designation', 'telephone': 'phone', 'fax': 'fax', 'email': 'email',
    'organization name': 'organization', 'address': 'address', 'city': 'city',
    'state': 'state', 'zip': 'zip', 'npi': 'npi',
  };

  /* Deep-clones a subsection template, re-id'ing it AND its children. The
   * existing Add Drug clone doesn't recurse (Drug has no children) and doesn't
   * clear extraction metadata — both would break here, because "Provider " has
   * four child subsections and every clone would otherwise collide on _id/_key
   * and inherit the template's confidence badges. */
  function cloneSubsectionDeep(template, values) {
    const clone = JSON.parse(JSON.stringify(template));
    (function reid(sub) {
      sub._id = 'subP' + (subsectionSeq++);
      sub.fields.forEach((f) => {
        f._key = sub._id + '__' + f.key;
        const mapped = PROVIDER_RECORD_MAP[f.label.trim().toLowerCase()];
        const seeded = values && mapped ? (values[mapped] || '') : '';
        f._value = seeded;
        f._extracted = '';
        // A seeded card comes from CPR, not from the document — it must not
        // inherit the template's confidence % or Evidence badge.
        delete f._confidence;
        delete f._evidence;
      });
      (sub.subsections || []).forEach(reid);
    })(clone);
    return clone;
  }

  function providerFields(p) {
    const out = [];
    (function walk(sub) {
      sub.fields.forEach((f) => out.push(f));
      (sub.subsections || []).forEach(walk);
    })(p.sub);
    return out;
  }

  function providerFieldByLabel(p, label) {
    const want = label.trim().toLowerCase();
    return providerFields(p).find((f) => f.label.trim().toLowerCase() === want) || null;
  }

  function providerValue(p, label) {
    const f = providerFieldByLabel(p, label);
    if (!f) return '';
    const o = state.fieldOverrides[f._key];
    return (o !== undefined ? o : f._value) || '';
  }

  // The pristine document extraction for a field, ignoring whatever the
  // slot's current field._value/override has moved to after a match —
  // scoring candidates against a moving target would make re-opening match
  // resolution show different candidates depending on what's currently
  // picked. Falls back to providerValue for a slot with no real extraction
  // (e.g. a blank draft that became the match slot).
  function providerExtractedValue(p, label) {
    const f = providerFieldByLabel(p, label);
    if (!f) return '';
    return (f._extracted || '').toString().trim() || providerValue(p, label);
  }

  function providerName(p) {
    const n = `${providerValue(p, 'First Name')} ${providerValue(p, 'Last Name')}`.trim();
    return n || 'Unnamed provider';
  }

  // Contiguous 1..n after every add / remove / reorder. The Excel's Pat3
  // fixture has a "#2" with no "#1", and Scenario 4 shows it landing at #1 —
  // normalising reproduces that without a special case.
  function renumberProviders() {
    state.providers.forEach((p, i) => {
      const f = providerFields(p).find((x) => x.key === SEQ_FIELD_KEY);
      if (f) state.fieldOverrides[f._key] = String(i + 1);
    });
  }

  function makeProvider(origin, values, cprId) {
    return {
      uid: 'pv' + (providerSeq++),
      sub: cloneSubsectionDeep(PROVIDER_TEMPLATE, values),
      origin: origin,          // 'extracted' | 'cpr' | 'draft'
      cprId: cprId || null,
      record: values || null,  // the CPR values, for the extracted-vs-CPR diff
      edited: false,
    };
  }

  let providerSeq = 0;

  // Instance #1 is the extracted prescriber: the schema's own already-annotated
  // subsection, so it keeps its extracted values, confidence and Evidence badges.
  function initProviders() {
    const extracted = {
      uid: 'pv' + (providerSeq++),
      sub: PROVIDER_TEMPLATE,
      origin: 'extracted',
      cprId: null,
      record: null,
      edited: false,
      // Stable marker for "the match-resolution slot" — origin flips to
      // 'cpr'/'draft' the moment a match is picked, so code that needs to
      // find this same card again (to let the reviewer change their pick)
      // must not key off origin. This never changes once set.
      isExtractedSlot: true,
    };
    state.providers = [extracted];
    renumberProviders();
    syncPrescribedProvider();
  }

  /* ---------- Left rail ---------- */
  function renderLeftRail() {
    const rail = document.getElementById('sectionItems');
    rail.innerHTML = SCHEMA.sections.map((sec, i) => `
      <button class="section-item${i === state.activeSectionIndex ? ' active' : ''}" data-idx="${i}">
        <span class="sr-number">${i + 1}</span>
        <span class="sr-title">${escapeHtml(sec.title)}</span>
      </button>`).join('');
    rail.querySelectorAll('.section-item').forEach((btn) => {
      btn.addEventListener('click', () => { state.activeSectionIndex = Number(btn.dataset.idx); renderAll(); });
    });
  }

  /* ---------- Summary band ---------- */
  function renderSummaryBand() {
    document.getElementById('docName').textContent = doc.file.original_file_name;
    document.getElementById('statusBadge').textContent = statusDisplayText(state.status);
    document.getElementById('statusBadge').className = 'ui-badge status-badge theme-' + statusTheme(state.status);
    document.getElementById('receivedAt').textContent = new Date(doc.audit_data.create_ts).toLocaleString();

    const cs = getClaimState();

    if (!window._docTypeSelect) {
      window._docTypeSelect = CustomSelect.mount(document.getElementById('docTypeSelect'), {
        options: DOCUMENT_TYPE_OPTIONS.map((t) => ({ label: t, value: t })),
        value: state.documentType, ariaLabel: 'Document type', disabled: cs.isReadOnly,
        onChange: (v) => { openReclassify(v); },
      });
      window._prioritySelect = CustomSelect.mount(document.getElementById('prioritySelect'), {
        options: [{ label: 'Routine', value: 'routine' }, { label: 'Urgent', value: 'urgent' }, { label: 'STAT', value: 'stat' }],
        value: 'routine', disabled: true, ariaLabel: 'Priority',
      });
    } else {
      window._docTypeSelect.setValue(state.documentType);
      window._docTypeSelect.setDisabled(cs.isReadOnly);
    }

    renderClaimButton(cs);
    renderReadOnlyBanner(cs);
    document.getElementById('rejectOpenBtn').disabled = cs.isReadOnly;
    document.getElementById('saveSubmitBtn').disabled = cs.isReadOnly;
    document.getElementById('saveDraftBtn').disabled = cs.isReadOnly;
    document.getElementById('addDrugBtn').disabled = cs.isReadOnly;
    renderAttachCard();
  }

  function claimDocument(cs) {
    Claims.claim(doc._id, cs.actor);
    state.claimedBy = { name: cs.actor.name, initials: cs.actor.initials };
    state.status = 'Review In Progress';
  }

  function renderClaimButton(cs) {
    const btn = document.getElementById('claimBtn');
    if (cs.isUnclaimed && cs.role !== 'pam') {
      btn.style.display = 'inline-flex';
      btn.className = 'btn outline-primary';
      btn.disabled = false;
      btn.textContent = 'Claim document';
      btn.onclick = () => {
        claimDocument(cs);
        toast('Document claimed — you can now edit it');
        renderAll();
      };
    } else if (cs.isClaimedByMe) {
      btn.style.display = 'inline-flex';
      btn.className = 'btn';
      btn.disabled = true;
      btn.textContent = 'Claimed';
      btn.onclick = null;
    } else if (cs.claimedBy && cs.role === 'pam') {
      btn.style.display = 'inline-flex';
      btn.className = 'btn';
      btn.disabled = false;
      btn.textContent = cs.claimedBy.name + ' · Unclaim document';
      btn.onclick = () => {
        document.getElementById('unclaimOwnerName').textContent = cs.claimedBy.name;
        document.getElementById('unclaimOverlay').style.display = 'flex';
      };
    } else if (cs.isClaimedByOther) {
      btn.style.display = 'inline-flex';
      btn.className = 'btn';
      btn.disabled = true;
      btn.textContent = 'Claimed by ' + cs.claimedBy.name;
      btn.onclick = null;
    } else {
      btn.style.display = 'none';
    }
  }

  /* ---------- Claim-gate (unclaimed doc: fields look editable, first
   * interaction prompts a claim instead of silently blocking) ---------- */
  let claimGatePendingKey = null;

  function focusFieldByKey(key) {
    if (!key) return;
    requestAnimationFrame(() => {
      // The Evidence toggle button carries the same data-key as its field's
      // control, so scope to actual controls (not .evidence-badge) and take
      // the last match — the control renders after the badge in DOM order.
      const matches = document.querySelectorAll(`[data-key="${CSS.escape(key)}"]:not(.evidence-badge)`);
      const el = matches[matches.length - 1];
      if (!el) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { el.focus(); return; }
      const inner = el.querySelector('input');
      if (inner) inner.focus();
    });
  }

  function openClaimGatePopup(fieldKey) {
    claimGatePendingKey = fieldKey || null;
    document.getElementById('claimGateOverlay').style.display = 'flex';
  }

  function claimGateInterceptTarget(e) {
    if (e.target.closest('.evidence-badge')) return null;
    return e.target.closest('input, textarea, .search-select-trigger, .npi-lookup-btn, .referral-source-select, .referral-source-search-btn, .field-select');
  }

  function wireClaimGate() {
    const form = document.getElementById('dynamicForm');
    const intercept = (e) => {
      if (!getClaimState().isGated) return;
      const target = claimGateInterceptTarget(e);
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      openClaimGatePopup(target.dataset.key || (target.closest('[data-key]') || {}).dataset?.key);
    };
    form.addEventListener('mousedown', intercept, true);
    form.addEventListener('click', intercept, true);

    document.getElementById('claimGateCloseBtn').addEventListener('click', () => { document.getElementById('claimGateOverlay').style.display = 'none'; claimGatePendingKey = null; });
    document.getElementById('claimGateCancelBtn').addEventListener('click', () => { document.getElementById('claimGateOverlay').style.display = 'none'; claimGatePendingKey = null; });
    document.getElementById('claimGateConfirmBtn').addEventListener('click', () => {
      const cs = getClaimState();
      claimDocument(cs);
      document.getElementById('claimGateOverlay').style.display = 'none';
      toast('Document claimed — you can now edit it');
      const key = claimGatePendingKey;
      claimGatePendingKey = null;
      renderAll();
      focusFieldByKey(key);
    });
  }

  function renderReadOnlyBanner(cs) {
    const el = document.getElementById('readOnlyBanner');
    const saveBtn = document.getElementById('saveSubmitBtn');
    saveBtn.removeAttribute('data-tip');
    if (cs.isClaimedByOther) {
      el.style.display = 'none';
      saveBtn.setAttribute('data-tip', `Claimed by ${cs.claimedBy.name} — read-only until they finish or a Patient Access Manager unclaims it.`);
    } else if (cs.role === 'pam' && cs.claimedBy) {
      el.style.display = 'block';
      el.innerHTML = `👁 Viewing as Patient Access Manager — read-only. Claimed by <b>${escapeHtml(cs.claimedBy.name)}</b>. Use “Unclaim document” above to return it to Pending Review.`;
    } else if (cs.role === 'pam') {
      el.style.display = 'block';
      el.innerHTML = `👁 Viewing as Patient Access Manager — read-only.`;
    } else if (cs.isUnclaimed) {
      el.style.display = 'none';
      saveBtn.setAttribute('data-tip', 'This document is unclaimed — claim it (or click any field) to start editing.');
    } else {
      el.style.display = 'none';
    }
  }

  function openReclassify(toType) {
    if (toType === state.documentType) return;
    state.reclassifyTo = toType;
    state.reclassifyOpen = true;
    renderModals();
  }

  /* ---------- Attach to Case ---------- */
  const DUMMY_CASES = [
    { id: 'CASE-20260806-F3A4AE87', patient: 'Don Mannson', mrn: 'HC10012', drug: 'Gammagard', payer: 'United Healthcare' },
    { id: 'CASE-20260803-1B92CE10', patient: 'Maria Garcia', mrn: 'HC10049', drug: 'Cuvitru', payer: 'BCBS Michigan' },
    { id: 'CASE-20260728-9AC521D4', patient: 'James Whitfield', mrn: 'HC10077', drug: 'Hizentra', payer: 'Aetna' },
    { id: 'CASE-20260717-77E0B6A2', patient: 'Linda Nguyen', mrn: 'HC10101', drug: 'Xolair', payer: 'Cigna' },
    { id: 'CASE-20260710-C4412FAA', patient: 'Robert Okafor', mrn: 'HC10133', drug: 'Orencia', payer: 'Humana' },
  ];

  function renderAttachCard() {
    const card = document.getElementById('attachCard');
    if (state.attachedCase) {
      card.innerHTML = `
        <div class="attach-head"><div class="attach-head-left"><span class="attach-title">Attach to Case</span></div></div>
        <div class="attached-wrap">
          <div class="attached-row">
            <span class="case-id">${escapeHtml(state.attachedCase.id)}</span>
            <span class="case-meta">${escapeHtml(state.attachedCase.drug)} · ${escapeHtml(state.attachedCase.payer)}</span>
          </div>
          <button type="button" class="detach-btn" id="detachBtn" title="Remove attached case" aria-label="Remove attached case">✕</button>
        </div>`;
      document.getElementById('detachBtn').addEventListener('click', () => { state.attachedCase = null; state.attachMode = null; renderAttachCard(); });
      return;
    }
    if (state.attachMode === 'new') {
      card.innerHTML = `
        <div class="attach-head"><div class="attach-head-left"><span class="attach-title">Attach to Case</span></div>
        <button type="button" class="link-btn" id="chooseExistingBtn">Attach to existing case</button></div>
        <div class="new-case-box">A new case will be created once you Save &amp; Submit the document.</div>`;
      document.getElementById('chooseExistingBtn').addEventListener('click', () => { openSidePanel(); });
      return;
    }
    card.innerHTML = `
      <div class="attach-head"><div class="attach-head-left"><span class="attach-title">Attach to Case</span></div></div>
      <div class="attach-choices">
        <label class="attach-choice" id="chooseExistingChoice"><input type="radio" name="attachOption"><span>Attach to existing case</span></label>
        <span class="attach-or">OR</span>
        <label class="attach-choice" id="chooseNewChoice"><input type="radio" name="attachOption"><span>Start new case</span></label>
      </div>`;
    document.getElementById('chooseExistingChoice').addEventListener('click', () => openSidePanel());
    document.getElementById('chooseNewChoice').addEventListener('click', () => { state.attachMode = 'new'; renderAttachCard(); });
  }

  function openSidePanel() {
    state.sidePanelOpen = true;
    state.sidePanelSelectedId = null;
    renderSidePanel();
  }

  function renderSidePanel() {
    const overlay = document.getElementById('sidePanelOverlay');
    overlay.style.display = state.sidePanelOpen ? 'flex' : 'none';
    if (!state.sidePanelOpen) return;
    const rows = DUMMY_CASES.map((c) => `
      <tr data-id="${c.id}" class="${state.sidePanelSelectedId === c.id ? 'sel' : ''}">
        <td class="sp-pick"><button type="button" class="sp-radio-target${state.sidePanelSelectedId === c.id ? ' checked' : ''}"><span></span></button></td>
        <td class="sp-case-id">${escapeHtml(c.id)}</td>
        <td>${escapeHtml(c.patient)}</td>
        <td>${escapeHtml(c.mrn)}</td>
        <td>${escapeHtml(c.drug)}</td>
        <td>${escapeHtml(c.payer)}</td>
      </tr>`).join('');
    document.getElementById('sidePanelBody').innerHTML = `
      <div class="sp-search">
        <input type="text" placeholder="Search by name, MRN, case ID, medication, insurance..." disabled />
        <button type="button" class="sp-filter-btn">Filter</button>
      </div>
      <div class="sp-table-wrap">
        <table class="sp-table">
          <thead><tr><th class="sp-pick"></th><th>Case ID</th><th>Patient</th><th>MRN</th><th>Drug/Therapy</th><th>Insurance</th></tr></thead>
          <tbody id="spTbody">${rows}</tbody>
        </table>
      </div>`;
    document.getElementById('spCount').textContent = DUMMY_CASES.length + ' Active Cases';
    document.querySelectorAll('#spTbody tr').forEach((tr) => {
      tr.addEventListener('click', () => { state.sidePanelSelectedId = tr.dataset.id; renderSidePanel(); });
    });
    document.getElementById('sidePanelAttachBtn').disabled = !state.sidePanelSelectedId;
  }

  /* ---------- Match accordion (patient/provider entity match) ---------- */
  const MATCH_CANDIDATES = [
    { id: 'm1', name: doc ? (ext.patient_information.patient_first_name.value + ' ' + ext.patient_information.patient_last_name.value) : 'Patient', meta: 'DOB ' + (ext.patient_information.dob.value || '-') + ' · MRN HC10012', status: 'active', cprReferralSourceId: 'ct-001', careTeam: ['Pr3', 'Pr2'] },
    { id: 'm2', name: ext.patient_information.patient_last_name.value || 'Patient', meta: 'DOB 04/12/1968 · MRN HC10098', status: 'inactive', cprReferralSourceId: null, careTeam: ['Pr1'] },
  ];

  function activeSectionUsesMatch() {
    const sec = SCHEMA.sections[state.activeSectionIndex];
    return sec.title === 'Patient Demographics' || sec.title === 'M.D./Providers';
  }

  /* prescriber lookup for the extracted prescriber (§6/§7). Fuzzy on
   * name / organization / specialty / address, since NPI is absent from most
   * real extractions — the sample document carries provider_npi: null — so an
   * NPI-keyed match usually can't fire and the user has to decide. */
  function norm(s) { return (s || '').toString().trim().toLowerCase(); }

  function providerMatchScore(rec) {
    const p = state.providers.find((x) => x.isExtractedSlot);
    if (!p) return 0;
    let score = 0;
    if (norm(rec.last_name) && norm(rec.last_name) === norm(providerExtractedValue(p, 'Last Name'))) score += 40;
    if (norm(rec.first_name) && norm(rec.first_name) === norm(providerExtractedValue(p, 'First Name'))) score += 20;
    const npi = norm(providerExtractedValue(p, 'NPI'));
    if (npi && norm(rec.npi) === npi) score += 40;
    const org = norm(providerExtractedValue(p, 'Organization Name'));
    if (org && norm(rec.organization).includes(org.split(' ')[0])) score += 10;
    const spec = norm(providerExtractedValue(p, 'Specialty'));
    if (spec && (norm(rec.specialty).startsWith(spec.slice(0, 6)) || spec.startsWith(norm(rec.specialty).slice(0, 6)))) score += 10;
    // Fuzzy address: compare digits only, so "456 Stake Steet" still matches
    // "456 Stake St" (Excel Scenario 2's deliberate typo).
    const a = (providerExtractedValue(p, 'Address').match(/\d+/) || [])[0];
    const b = (rec.address.match(/\d+/) || [])[0];
    if (a && a === b) score += 15;
    return score;
  }

  function providerCandidates() {
    return CPR_PRESCRIBERS
      .map((rec) => ({ rec, score: providerMatchScore(rec) }))
      .filter((x) => x.score >= 40)
      .sort((a, b) => b.score - a.score);
  }

  // Is this CPR prescriber already one of the patient's linked providers?
  function providerAlreadyLinked(cprId) {
    return state.providers.some((p) => p.cprId === cprId);
  }

  // Row click in the list dispatches on mode: 'match' replaces card #1 (the
  // extracted prescriber decision); 'add' always appends a new peer card and
  // never touches #1.
  function pickProviderListRow(id) {
    if (state.providerSearchMode !== 'add') { selectProviderMatch(id); return; }
    if (providerAlreadyLinked(id)) {
      toast('This prescriber is already assigned to this patient — no changes will be made');
      return;
    }
    const rec = CPR_PRESCRIBERS.find((r) => r.id === id);
    if (!rec) return;
    addProviderFromRecord(rec, 'cpr', rec.id);
    renderForm();
    syncPrescribedProvider();
    toast(`${rec.first_name} ${rec.last_name} added to this patient's care team`);
  }

  // Remove a provider from this patient by its CPR+ id (Unlink action in the
  // list) — the record itself is untouched, only the link to this patient.
  function unlinkProviderById(id) {
    const p = state.providers.find((x) => x.cprId === id);
    if (!p) return;
    if (state.providers.length <= 1) { toast('At least one provider must remain on this patient'); return; }
    removeProvider(p.uid);
    renderProviderModal();
  }

  // Writes a CPR+ record's values straight onto the EXISTING extracted
  // provider's own fields — never clones or swaps in a different object, so
  // selecting a match can never appear as "another provider section". The
  // pristine document extraction (field._extracted, set once at load) is
  // left untouched, so "Use extracted:" keeps offering it on any field the
  // record changed; only field._value (the field's baseline) moves to the
  // record's value, and any prior reviewer override on that field is
  // cleared — the record becomes the new baseline, not a manual edit.
  function populateExtractedProviderFromRecord(rec) {
    const p = state.providers.find((x) => x.isExtractedSlot);
    if (!p) return null;
    providerFields(p).forEach((f) => {
      const mapped = PROVIDER_RECORD_MAP[f.label.trim().toLowerCase()];
      if (!mapped) return;
      const newVal = rec[mapped];
      if (!newVal) return;
      delete state.fieldOverrides[f._key];
      f._value = newVal;
    });
    p.origin = 'cpr';
    p.cprId = rec.id;
    p.record = rec;
    return p;
  }

  function selectProviderMatch(id) {
    state.providerMatchSelectedId = id;
    const rec = CPR_PRESCRIBERS.find((r) => r.id === id);
    if (!rec) return;
    const existing = state.providers.find((p) => p.cprId === id);
    if (existing) {
      // Excel Scenario 2 — dedupe rather than adding a second card, keep the
      // existing rank, and say so explicitly.
      state.providers = state.providers.filter((p) => p.origin !== 'extracted');
      renumberProviders();
      renderForm();
      syncPrescribedProvider();
      toast('This prescriber is already assigned to this patient — no changes will be made');
      return;
    }
    const p = populateExtractedProviderFromRecord(rec);
    if (!p) return;
    renderForm();
    syncPrescribedProvider();
    toast(`Linked to ${rec.first_name} ${rec.last_name} — differing values offer “Use extracted”`);
  }

  // §3 — top-banner variant, styled identically to the patient match
  // accordion (same .match-accordion/.match-radios markup and CSS), rendered
  // above the form instead of inside card #1. Single-document experiment —
  // see PROVIDER_BANNER_TEST_DOC_ID.
  function renderProviderMatchBanner(wrap) {
    wrap.style.display = 'block';
    const cands = providerCandidates();
    const selectedId = state.providerMatchSelectedId;
    const selected = selectedId ? (selectedId === 'new' ? 'new' : CPR_PRESCRIBERS.find((r) => r.id === selectedId)) : null;
    const title = 'Provider match found';
    const subtitle = 'Review and confirm the matching provider record.';
    const headerInner = selected && selected !== 'new'
      ? `<span class="match-selected-summary"><span class="match-selected-main"><span class="match-selected-name">${escapeHtml(selected.first_name + ' ' + selected.last_name)}</span><span class="match-selected-meta">${escapeHtml(selected.specialty + ' · ' + selected.organization)}</span></span></span>`
      : selected === 'new'
        ? `<span class="match-selected-summary create-new"><span class="match-selected-main"><span class="match-selected-name">New prescriber record</span></span></span>`
        : `<span class="match-tt"><span class="match-t1">${title}</span><span class="match-t2">${subtitle}</span></span>`;

    wrap.innerHTML = `
      <div class="match-accordion${state.providerBannerExpanded ? ' open' : ''}">
        <button type="button" class="match-head" id="providerBannerToggleBtn">
          <span class="match-ico${selected ? ' sel' : ''}">✓</span>
          ${headerInner}
          <span class="match-chevron"></span>
        </button>
        <div class="match-content" style="${state.providerBannerExpanded ? '' : 'display:none'}">
          <div class="match-radios">
            ${cands.map(({ rec }) => `
              <label class="match-radio${state.providerMatchSelectedId === rec.id ? ' sel' : ''}">
                <input type="radio" name="providerBannerChoice" ${state.providerMatchSelectedId === rec.id ? 'checked' : ''} data-id="${rec.id}">
                <span class="match-radio-main">
                  <span class="match-radio-name">${escapeHtml(rec.first_name + ' ' + rec.last_name)}</span>
                  <span class="match-radio-meta">${escapeHtml(rec.specialty)} · NPI ${escapeHtml(rec.npi)} · ${escapeHtml(rec.organization)} · ${escapeHtml(rec.address + ', ' + rec.city + ' ' + rec.state)}</span>
                </span>
                <span class="match-status-badge match-status-active">On record</span>
              </label>`).join('')}
            <label class="match-radio create-new${state.providerMatchSelectedId === 'new' ? ' sel' : ''}">
              <input type="radio" name="providerBannerChoice" ${state.providerMatchSelectedId === 'new' ? 'checked' : ''} data-id="new">
              <span class="match-radio-main"><span class="match-radio-name">Create a new provider record</span></span>
            </label>
          </div>
        </div>
      </div>`;

    document.getElementById('providerBannerToggleBtn').addEventListener('click', () => {
      state.providerBannerExpanded = !state.providerBannerExpanded;
      renderMatchAccordion();
    });
    wrap.querySelectorAll('input[name="providerBannerChoice"]').forEach((r) => {
      r.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        state.providerBannerExpanded = false;
        if (id === 'new') {
          state.providerMatchSelectedId = 'new';
          const p = state.providers.find((x) => x.isExtractedSlot);
          if (p) { p.origin = 'draft'; p.cprId = null; }
          renderForm();
          toast('New prescriber will be created on Save & Submit');
          return;
        }
        selectProviderMatch(id);
      });
    });
  }

  function renderMatchAccordion() {
    const wrap = document.getElementById('matchRegion');
    if (!activeSectionUsesMatch()) { wrap.style.display = 'none'; return; }
    wrap.style.display = 'block';
    const isPatient = SCHEMA.sections[state.activeSectionIndex].title === 'Patient Demographics';
    if (!isPatient) {
      // §3 — one-doc experiment: try the patient-style top banner for
      // provider matching instead of the card-embedded subtitle/popup,
      // scoped to a single document so it doesn't change the default UX
      // anywhere else.
      if (doc._id === PROVIDER_BANNER_TEST_DOC_ID) { renderProviderMatchBanner(wrap); return; }
      wrap.style.display = 'none';
      return;
    }
    const title = 'Patient match found';
    const subtitle = 'Review and confirm the matching patient record.';
    const selected = MATCH_CANDIDATES.find((c) => c.id === state.matchSelectedId);
    const headerInner = selected
      ? `<span class="match-selected-summary"><span class="match-selected-main"><span class="match-selected-name">${escapeHtml(selected.name)}</span><span class="match-selected-meta">${escapeHtml(selected.meta)}</span></span></span>`
      : `<span class="match-tt"><span class="match-t1">${title}</span><span class="match-t2">${subtitle}</span></span>`;

    wrap.innerHTML = `
      <div class="match-accordion${state.matchExpanded ? ' open' : ''}">
        <button type="button" class="match-head" id="matchToggleBtn">
          <span class="match-ico${selected ? ' sel' : ''}">✓</span>
          ${headerInner}
          <span class="match-chevron"></span>
        </button>
        <div class="match-content" style="${state.matchExpanded ? '' : 'display:none'}">
          <div class="match-radios">
            ${MATCH_CANDIDATES.map((c) => `
              <label class="match-radio${state.matchSelectedId === c.id ? ' sel' : ''}">
                <input type="radio" name="matchChoice" ${state.matchSelectedId === c.id ? 'checked' : ''} data-id="${c.id}">
                <span class="match-radio-main"><span class="match-radio-name">${escapeHtml(c.name)}</span><span class="match-radio-meta">${escapeHtml(c.meta)}</span></span>
                <span class="match-status-badge match-status-${c.status}">${c.status === 'active' ? 'Active' : 'Inactive'}</span>
              </label>`).join('')}
            <label class="match-radio create-new${state.matchSelectedId === 'new' ? ' sel' : ''}">
              <input type="radio" name="matchChoice" ${state.matchSelectedId === 'new' ? 'checked' : ''} data-id="new">
              <span class="match-radio-main"><span class="match-radio-name">Create a new patient record</span></span>
            </label>
          </div>
        </div>
      </div>`;

    document.getElementById('matchToggleBtn').addEventListener('click', () => { state.matchExpanded = !state.matchExpanded; renderMatchAccordion(); });
    wrap.querySelectorAll('input[name="matchChoice"]').forEach((r) => {
      r.addEventListener('change', (e) => {
        state.matchSelectedId = e.target.dataset.id;
        // Collapse back down once a choice is made — the accordion's job is
        // just to confirm the match, not stay open and compete for attention.
        state.matchExpanded = false;
        // "Existing matching patient selected -> populate Referral Source from
        // records" (the user can still change it afterward — see field markup).
        const candidate = MATCH_CANDIDATES.find((c) => c.id === state.matchSelectedId);
        const refKey = findReferralSourceKey();
        if (candidate && candidate.cprReferralSourceId && refKey && state.fieldOverrides[refKey] === undefined) {
          state.fieldOverrides[refKey] = candidate.cprReferralSourceId;
          toast('Referral Source populated from record');
        }
        loadCareTeamForPatient(candidate);
        renderForm();
      });
    });
  }

  // §8 — linking an existing patient pulls their primary providers below
  // the extracted one, ranked. Only runs once per patient pick (guarded by
  // careTeamLoadedFor) so it doesn't clobber ranks the user already changed.
  function loadCareTeamForPatient(candidate) {
    if (!candidate || !candidate.careTeam || state.careTeamLoadedFor === candidate.id) return;
    state.careTeamLoadedFor = candidate.id;
    candidate.careTeam.forEach((cprId) => {
      if (providerAlreadyLinked(cprId)) return;
      const rec = CPR_PRESCRIBERS.find((r) => r.id === cprId);
      if (rec) addProviderFromRecord(rec, 'cpr', rec.id);
    });
    syncPrescribedProvider();
  }

  /* ---------- Dynamic form ---------- */
  function confidenceMarkup(field) {
    if (field._confidence === undefined || field._confidence === null || field._confidence === 0) return '';
    const level = field._confidence < 70 ? 'low' : 'high';
    return `<strong class="confidence ${level}">${field._confidence}%</strong>`;
  }

  function evidenceMarkup(field) {
    if (!field._evidence) return '';
    return `<span class="evidence-wrap">
      <button type="button" class="evidence-badge${state.evidenceOpenKey === field._key ? ' active' : ''}" data-key="${field._key}">Evidence</button>
    </span>`;
  }

  function fieldControlMarkup(field) {
    // Prefer a live override over the value captured at annotateSubsection()
    // time — needed for fields whose control re-renders the whole form on
    // selection (e.g. Referral Source, set via the lookup popup) rather than
    // holding its own DOM value between keystrokes like a plain text input.
    const override = state.fieldOverrides[field._key];
    const val = override !== undefined ? override : (field._value == null ? '' : field._value);
    const claimState = getClaimState();
    const disabled = claimState.isReadOnly && !claimState.isGated;
    const dis = disabled ? 'disabled' : '';
    switch (field.type) {
      case 'textarea':
        return `<textarea data-key="${field._key}" rows="4" placeholder="Enter value" ${dis}>${escapeHtml(val)}</textarea>`;
      case 'date':
        return `<div class="date-control"><input type="text" data-key="${field._key}" value="${escapeHtml(val)}" placeholder="MM/DD/YYYY" ${dis} /></div>`;
      case 'select': {
        if (field.label.trim().toLowerCase() === 'referral source') {
          return `<div class="referral-source-field-wrap">
            <div class="field-select referral-source-select" data-key="${field._key}" data-value="${escapeHtml(val)}" data-disabled="${disabled ? '1' : ''}"></div>
            ${disabled ? '' : `<button type="button" class="referral-source-search-btn" data-key="${field._key}" aria-label="Search all referral sources" title="Search all referral sources">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6.5" stroke="#667084" stroke-width="1.5"/><path d="M17 17l-3.2-3.2" stroke="#667084" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>`}
          </div>`;
        }
        // Prof. Designation: metadata.multiple — the real extraction returns
        // it as one space-separated string ("MD FACP FAAN FAASM"), so parse
        // that into a values[] for CustomSelect's multi-select mode rather
        // than losing everything but the first credential.
        if (field.metadata && field.metadata.multiple) {
          const opts = (field.options || []).map((o) => ({ label: o.label, value: o.label }));
          const values = String(val || '').split(/[\s,]+/).filter(Boolean);
          return `<div class="field-select" data-key="${field._key}" data-multiple="1" data-values='${escapeHtml(JSON.stringify(values))}' data-options='${escapeHtml(JSON.stringify(opts))}' data-disabled="${disabled ? '1' : ''}"></div>`;
        }
        // §14 — metadata.optionsFrom.source='providers': build options from
        // the ranked provider list so the Prescribed Provider dropdown in Drug
        // Orders always reflects the current care team. Default to Seq #1.
        if (field.metadata && field.metadata.optionsFrom && field.metadata.optionsFrom.source === 'providers') {
          const provOpts = state.providers.map((p) => {
            const name = providerName(p);
            return { label: name, value: name };
          });
          const effVal = val || (provOpts[0] ? provOpts[0].value : '');
          return `<div class="field-select" data-key="${field._key}" data-value="${escapeHtml(effVal)}" data-options='${escapeHtml(JSON.stringify(provOpts))}' data-disabled="${disabled ? '1' : ''}"></div>`;
        }
        let opts = (field.options || []).map((o) => ({ label: o.label, value: o.label }));
        if (val && !opts.some((o) => o.label === val)) opts = [{ label: val, value: val }].concat(opts);
        return `<div class="field-select" data-key="${field._key}" data-value="${escapeHtml(val)}" data-options='${escapeHtml(JSON.stringify(opts))}' data-disabled="${disabled ? '1' : ''}"></div>`;
      }
      case 'checkbox':
        return `<div class="boolean-check"><label class="option-item"><input type="checkbox" data-key="${field._key}" ${val ? 'checked' : ''} ${dis}><span>${escapeHtml(field.label)}</span></label></div>`;
      default: {
        const isNpi = field.label.trim().toLowerCase() === 'npi';
        const isDrugName = field.label.trim().toLowerCase() === 'ordered item';
        // Seq # is the ranking display, not a reviewer-typed value — dragging
        // a card (or the match/create flow) is what moves it, never the input.
        if (field.key === SEQ_FIELD_KEY) {
          return `<input type="text" class="seq-readonly" data-key="${field._key}" value="${escapeHtml(val)}" readonly tabindex="-1" aria-readonly="true" />`;
        }
        if (isNpi) {
          return `<div class="npi-field-wrap">
            <input class="has-lookup" type="text" data-key="${field._key}" value="${escapeHtml(val)}" placeholder="Enter value" ${dis} />
            <button type="button" class="npi-lookup-btn" data-npi-key="${field._key}" aria-label="Look up provider by NPI" ${dis}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M16.6663 8.75033V5.66699C16.6663 4.26686 16.6663 3.5668 16.3939 3.03202C16.1542 2.56161 15.7717 2.17916 15.3013 1.93948C14.7665 1.66699 14.0665 1.66699 12.6663 1.66699H7.33301C5.93288 1.66699 5.23281 1.66699 4.69803 1.93948C4.22763 2.17916 3.84517 2.56161 3.60549 3.03202C3.33301 3.5668 3.33301 4.26686 3.33301 5.66699V14.3337C3.33301 15.7338 3.33301 16.4339 3.60549 16.9686C3.84517 17.439 4.22763 17.8215 4.69803 18.0612C5.23281 18.3337 5.93288 18.3337 7.33301 18.3337H9.58301M18.333 18.3337L17.083 17.0837M17.9163 15.0003C17.9163 16.6112 16.6105 17.917 14.9997 17.917C13.3888 17.917 12.083 16.6112 12.083 15.0003C12.083 13.3895 13.3888 12.0837 14.9997 12.0837C16.6105 12.0837 17.9163 13.3895 17.9163 15.0003Z" stroke="#667084" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>`;
        }
        if (isDrugName) {
          return `<div class="npi-field-wrap">
            <input class="has-lookup" type="text" data-key="${field._key}" value="${escapeHtml(val)}" placeholder="Enter value" ${dis} />
            <button type="button" class="npi-lookup-btn" data-drug-key="${field._key}" aria-label="Look up drug" ${dis}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#667084" stroke-width="1.6"/><path d="M21 21l-4.3-4.3" stroke="#667084" stroke-width="1.6" stroke-linecap="round"/></svg>
            </button>
          </div>`;
        }
        return `<input type="text" data-key="${field._key}" value="${escapeHtml(val)}" placeholder="Enter value" ${dis} />`;
      }
    }
  }

  /* "Use extracted: X" — the affordance §9 asks for, matching the real app's
   * pm-src-toggle. Opt-in by design: the CPR value stays the default, which is
   * what Excel Scenario 2 ("no changes will be made") requires even though the
   * extracted values differ. The CSS for this already shipped in forms.css. */
  function providerFieldSourceRow(field) {
    if (field.key === SEQ_FIELD_KEY) return '';
    const extracted = (field._extracted || '').toString().trim();
    if (!extracted) return '';
    const current = state.fieldOverrides[field._key];
    const shown = ((current !== undefined ? current : field._value) || '').toString().trim();
    if (shown.toLowerCase() === extracted.toLowerCase()) return '';
    return `<div class="pm-src-row">
      <button type="button" class="pm-src-toggle" data-use-extracted="${field._key}" title="Use the value extracted from the document">
        <span class="pm-src-use">Use extracted:</span><span class="pm-src-val">${escapeHtml(extracted)}</span>
      </button>
    </div>`;
  }

  // Amber = differs from the record it was seeded from. Blue = reviewer edited it.
  function fieldStateClass(field) {
    if (field.key === SEQ_FIELD_KEY) return '';
    const extracted = (field._extracted || '').toString().trim();
    const override = state.fieldOverrides[field._key];
    if (override !== undefined && String(override).trim() !== String(field._value || '').trim()) return ' pm-edited';
    if (extracted) {
      const shown = ((override !== undefined ? override : field._value) || '').toString().trim();
      if (shown.toLowerCase() !== extracted.toLowerCase()) return ' pm-diff';
    }
    return '';
  }

  function fieldMarkup(field) {
    const wide = field.type === 'textarea';
    // Checkbox fields render their own label text inline next to the box
    // (see fieldControlMarkup's 'checkbox' case) — showing the generic
    // field label above it too would just repeat the same text twice.
    const isCheckbox = field.type === 'checkbox';
    const showLabelRow = !isCheckbox || field.required || confidenceMarkup(field) || evidenceMarkup(field);
    return `<div class="field${wide ? ' wide' : ''}${fieldStateClass(field)}">
      ${showLabelRow ? `<label for="${field._key}">
        ${isCheckbox ? '' : `<span>${escapeHtml(field.label)}</span>`}
        ${field.required ? '<em>*</em>' : ''}
        ${confidenceMarkup(field)}
        ${evidenceMarkup(field)}
      </label>` : ''}
      ${fieldControlMarkup(field)}
      ${providerFieldSourceRow(field)}
    </div>`;
  }

  function subsectionMarkup(sub, depth) {
    const collapsed = !!state.collapsed[sub._id];
    const fieldsHtml = sub.fields.map(fieldMarkup).join('');
    const childHtml = (sub.subsections || []).map((c) => subsectionMarkup(c, depth + 1)).join('');
    const fieldCount = sub.fields.length;
    const isDrug = sub.title === 'Drug';
    return `<section class="subsection${depth > 0 ? ' nested' : ''}${collapsed ? ' collapsed' : ''}" data-sub-id="${sub._id}">
      <button type="button" class="subsection-head" data-toggle="${sub._id}">
        <span class="subsection-copy">
          <span class="subsection-title">${escapeHtml(sub.title)}</span>
        </span>
        ${isDrug && sub._removable ? `<span class="subsection-remove" data-remove="${sub._id}">Remove</span>` : ''}
        <span class="subsection-count">${fieldCount} field${fieldCount === 1 ? '' : 's'}</span>
        <span class="subsection-chevron"></span>
      </button>
      <div class="subsection-body">${fieldsHtml}${childHtml}</div>
    </section>`;
  }

  const PROVIDER_ORIGIN_BADGE = {
    extracted: { cls: 'origin-extracted', text: 'Extracted' },
    cpr: { cls: 'origin-cpr', text: 'Attached' },
    draft: { cls: 'origin-draft', text: 'New' },
  };

  /* One provider = the "Provider " subsection tree wrapped in a ranked card.
   * Reuses subsectionMarkup for the body, so Prescriber / Organization /
   * License Info / Contacts render exactly as before. */
  function providerCardMarkup(p, index) {
    const collapsed = !!state.collapsed[p.sub._id];
    const badge = PROVIDER_ORIGIN_BADGE[p.origin];
    const cs = getClaimState();
    const locked = cs.isReadOnly && !cs.isGated;
    const body = (p.sub.subsections || []).map((c) => subsectionMarkup(c, 1)).join('');
    const sharedWarning = p.origin === 'cpr' && p.edited
      ? `<div class="provider-shared-warning">Editing this prescriber updates the shared record for every patient linked to it.</div>`
      : '';
      
    let matchHeader = '';
    let searchBtn = '';

    // Match resolution for the extracted slot lives entirely in the search
    // popup now — clicking the subtitle or the magnifier both open it, rather
    // than an inline radio list competing for space inside the card. Keyed
    // on isExtractedSlot (not origin/index) so this stays available to
    // change the pick even after a match has already been made — origin
    // flips to 'cpr'/'draft' the moment a match is picked, and reordering
    // can move this card away from index 0. Skipped on the §3 test doc,
    // where match resolution instead lives in the top-of-form banner
    // (renderProviderMatchBanner) so the two variants aren't shown at once.
    if (p.isExtractedSlot && doc._id !== PROVIDER_BANNER_TEST_DOC_ID) {
      const cands = providerCandidates();
      const selectedId = state.providerMatchSelectedId;
      const selected = selectedId ? (selectedId === 'new' ? 'new' : CPR_PRESCRIBERS.find((r) => r.id === selectedId)) : null;

      let subtitleText, subtitleCls;
      if (selected && selected !== 'new') {
        subtitleText = `${selected.first_name} ${selected.last_name} · ${selected.specialty} · ${selected.organization}`;
        subtitleCls = '';
      } else if (selected === 'new') {
        subtitleText = 'New prescriber record';
        subtitleCls = '';
      } else {
        const cLen = cands.length;
        subtitleText = cLen === 0 ? 'No record found' : `${cLen} match${cLen === 1 ? '' : 'es'} found — select one`;
        subtitleCls = ' provider-match-subtitle-live';
      }
      matchHeader = `<button type="button" class="provider-match-subtitle${subtitleCls}" data-provider-match-open="${p.uid}" ${locked ? 'disabled' : ''}>${escapeHtml(subtitleText)}</button>`;

      searchBtn = `<button type="button" class="provider-search-btn" data-provider-search="${p.uid}" title="Search provider directory" ${locked ? 'disabled' : ''}>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M17 17l-3.2-3.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>`;
    }

    return `<section class="provider-card${collapsed ? ' collapsed' : ''}" data-provider-uid="${p.uid}" draggable="${locked ? 'false' : 'true'}">
      <div class="provider-card-head" data-provider-toggle="${p.uid}">
        <span class="provider-drag" title="Drag to reorder" aria-hidden="true"></span>
        <span class="provider-seq">#${index + 1}</span>
        <div style="display:flex; flex-direction:column; margin-right:auto; gap:2px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="provider-card-title">${escapeHtml(providerName(p))}</span>
            <span class="provider-origin ${badge.cls}">${badge.text}</span>
          </div>
          ${matchHeader}
        </div>
        <span class="provider-card-actions">
          ${searchBtn}
          ${state.providers.length > 1 ? `<button type="button" class="provider-remove" data-provider-remove="${p.uid}" title="Remove from this patient" ${locked ? 'disabled' : ''}>Remove</button>` : ''}
        </span>
        <span class="subsection-chevron"></span>
      </div>
      <div class="provider-card-body">${sharedWarning}${body}</div>
    </section>`;
  }

  function renderForm() {
    const sec = SCHEMA.sections[state.activeSectionIndex];
    document.getElementById('formSectionTitle').textContent = sec.title;
    const isDrugSection = sec.title === 'Drug Orders';
    const isProviderSection = sec.title === 'M.D./Providers';
    document.getElementById('addDrugBtn').style.display = isDrugSection ? 'inline-flex' : 'none';
    document.getElementById('addProviderBtn').style.display = isProviderSection ? 'inline-flex' : 'none';

    const topFields = sec.fields.map(fieldMarkup).join('');
    let subsectionsHtml;
    if (isProviderSection) {
      subsectionsHtml = state.providers.map(providerCardMarkup).join('');
    } else {
      subsectionsHtml = (sec.subsections || []).map((s) => subsectionMarkup(s, 0)).join('');
    }
    const extraHtml = isDrugSection ? state.extraDrugSubsections.map((s) => subsectionMarkup(s, 0)).join('') : '';
    document.getElementById('dynamicForm').innerHTML = topFields + subsectionsHtml + extraHtml;

    document.getElementById('nextBtn').style.display = state.activeSectionIndex < SCHEMA.sections.length - 1 ? 'inline-flex' : 'none';

    wireFormEvents();
    if (isProviderSection) wireProviderEvents();
    renderMatchAccordion();
  }

  function wireFormEvents() {
    document.querySelectorAll('.subsection-head').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        if (e.target.closest('[data-remove]')) return;
        const id = btn.dataset.toggle;
        state.collapsed[id] = !state.collapsed[id];
        renderForm();
      });
    });
    document.querySelectorAll('[data-remove]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = el.dataset.remove;
        state.extraDrugSubsections = state.extraDrugSubsections.filter((s) => s._id !== id);
        renderForm();
      });
    });
    document.querySelectorAll('.dynamic-form input[type="text"], .dynamic-form textarea').forEach((el) => {
      el.addEventListener('input', (e) => {
        state.fieldOverrides[e.target.dataset.key] = e.target.value;
        markProviderEdited(e.target.dataset.key);
      });
    });
    document.querySelectorAll('.evidence-badge').forEach((btn) => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); toggleEvidence(btn.dataset.key, btn); });
    });
    document.querySelectorAll('[data-npi-key]').forEach((btn) => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); toggleNpiCard(btn.dataset.npiKey, btn); });
    });
    document.querySelectorAll('[data-drug-key]').forEach((btn) => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); toggleDrugCard(btn.dataset.drugKey, btn); });
    });
    document.querySelectorAll('.field-select:not(.referral-source-select)').forEach((el) => {
      const key = el.dataset.key;
      const opts = JSON.parse(el.dataset.options || '[]');
      if (el.dataset.multiple === '1') {
        const values = JSON.parse(el.dataset.values || '[]');
        CustomSelect.mount(el, {
          options: opts, values, multiple: true, ariaLabel: 'field', disabled: el.dataset.disabled === '1',
          onChangeMulti: (vs) => { state.fieldOverrides[key] = vs.join(' '); markProviderEdited(key); },
        });
        return;
      }
      CustomSelect.mount(el, {
        options: opts, value: el.dataset.value || '', ariaLabel: 'field', disabled: el.dataset.disabled === '1',
        onChange: (v) => { state.fieldOverrides[key] = v; markProviderEdited(key); },
      });
    });
    document.querySelectorAll('.referral-source-select').forEach((el) => {
      mountReferralSourceSelect(el, el.dataset.key, el.dataset.value || '', el.dataset.disabled === '1');
    });
    document.querySelectorAll('.referral-source-search-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); openReferralPopup(btn.dataset.key); });
    });
    // Checkboxes had no override listener at all, so PECOS Enrolled lost its
    // state on every re-render — and provider cards re-render constantly.
    document.querySelectorAll('.dynamic-form input[type="checkbox"][data-key]').forEach((el) => {
      el.addEventListener('change', (e) => { state.fieldOverrides[e.target.dataset.key] = e.target.checked; });
    });
    document.querySelectorAll('[data-use-extracted]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const key = btn.dataset.useExtracted;
        const f = findFieldByKey(key);
        if (!f) return;
        state.fieldOverrides[key] = f._extracted;
        markProviderEdited(key);
        renderForm();
      });
    });
  }

  /* ---------- Provider card interactions ---------- */
  function providerByUid(uid) { return state.providers.find((p) => p.uid === uid) || null; }

  // A field edit on an "On file" card is a CPR update (Excel Scenario 4), so
  // the card has to know it was touched.
  function markProviderEdited(fieldKey) {
    const p = state.providers.find((x) => providerFields(x).some((f) => f._key === fieldKey));
    if (p && p.origin === 'cpr') p.edited = true;
  }

  function wireProviderEvents() {
    document.querySelectorAll('[data-provider-toggle]').forEach((head) => {
      head.addEventListener('click', (e) => {
        if (e.target.closest('[data-provider-remove]') || e.target.closest('.provider-drag') || e.target.closest('[data-provider-search]') || e.target.closest('[data-provider-match-open]')) return;
        const p = providerByUid(head.dataset.providerToggle);
        if (!p) return;
        state.collapsed[p.sub._id] = !state.collapsed[p.sub._id];
        renderForm();
      });
    });
    document.querySelectorAll('[data-provider-match-open], [data-provider-search]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (btn.disabled) return;
        openProviderSearch('match');
      });
    });
    document.querySelectorAll('[data-provider-remove]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (btn.disabled) return;
        removeProvider(btn.dataset.providerRemove);
      });
    });
    // Drag to reorder — the ranking interaction §5 asks for, on top of the
    // schema's own serialField (Seq #), which stays the source of truth.
    document.querySelectorAll('.provider-card[draggable="true"]').forEach((card) => {
      card.addEventListener('dragstart', (e) => {
        state.providerDragUid = card.dataset.providerUid;
        card.classList.add('dragging');
        if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
      });
      card.addEventListener('dragend', () => { state.providerDragUid = null; card.classList.remove('dragging'); });
      card.addEventListener('dragover', (e) => { e.preventDefault(); card.classList.add('drag-over'); });
      card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('drag-over');
        reorderProviders(state.providerDragUid, card.dataset.providerUid);
      });
    });
  }

  function reorderProviders(fromUid, toUid) {
    if (!fromUid || !toUid || fromUid === toUid) return;
    const from = state.providers.findIndex((p) => p.uid === fromUid);
    const to = state.providers.findIndex((p) => p.uid === toUid);
    if (from < 0 || to < 0) return;
    const [moved] = state.providers.splice(from, 1);
    state.providers.splice(to, 0, moved);
    renumberProviders();
    renderForm();
    syncPrescribedProvider();
    toast(`${providerName(moved)} moved to #${to + 1}`);
  }

  // Unlink from this patient — the shared CPR prescriber record itself is left
  // alone so other patients keep it.
  function removeProvider(uid) {
    const p = providerByUid(uid);
    if (!p || state.providers.length <= 1) return;
    state.providers = state.providers.filter((x) => x.uid !== uid);
    renumberProviders();
    renderForm();
    syncPrescribedProvider();
    toast(p.origin === 'draft'
      ? `${providerName(p)} discarded — was never created in records`
      : `${providerName(p)} removed from this patient (still in records)`);
  }

  function addProviderFromRecord(record, origin, cprId) {
    const p = makeProvider(origin, record, cprId);
    // Honour collapseAfterFirst: true — any provider added beyond index 0
    // starts collapsed so the care-team list doesn't expand into a wall of
    // fields. The user clicks the header to expand any individual card.
    if (state.providers.length > 0 && PROVIDER_REPEAT.collapseAfterFirst) {
      state.collapsed[p.sub._id] = true;
    }
    state.providers.push(p);
    renumberProviders();
    return p;
  }

  /* §14 — keep the "Prescribed Provider" select in Drug Orders in sync with
   * the ranked provider list. The field is identified by metadata.optionsFrom
   * rather than by hard-coding the UUID, so it stays correct if the schema
   * changes. Default is Seq #1; if the current value is no longer in the list
   * (e.g. the #1 provider was removed or re-ranked), reset to the new #1. */
  function prescribedProviderFieldKey() {
    let key = null;
    function scan(fields) {
      (fields || []).forEach((f) => {
        if (f.metadata && f.metadata.optionsFrom && f.metadata.optionsFrom.source === 'providers') key = f._key;
      });
    }
    function walk(sub) { scan(sub.fields); (sub.subsections || []).forEach(walk); }
    SCHEMA.sections.forEach((sec) => { scan(sec.fields); (sec.subsections || []).forEach(walk); });
    return key;
  }

  function syncPrescribedProvider() {
    const key = prescribedProviderFieldKey();
    if (!key) return;
    const options = state.providers.map((p) => providerName(p));
    const current = state.fieldOverrides[key];
    // If there's no valid selection yet, or the saved name is gone (re-rank /
    // remove), default to whoever is now at #1.
    if (!current || !options.includes(current)) {
      state.fieldOverrides[key] = options[0] || '';
    }
  }

  /* ---------- Referral Source lookup (typeahead + "+ Add new" -> popup) ---------- */

  const ADD_NEW_REFERRAL = '__add_new_referral__';

  function referralSourceName(contact) {
    return `${contact.first_name} ${contact.last_name}`;
  }

  function referralSourceLabel(contact) {
    return `${referralSourceName(contact)} - ${contact.organization}`;
  }

  function referralSourceOptions() {
    const list = (window.CONTACTS || []).filter((c) => c.referral_source);
    // Alphabetical first, so CustomSelect's startsWith-before-contains ranking
    // resolves ties (same rank) in alphabetical order, per the spec's
    // "starts-with first, contains second, alphabetical within each group".
    list.sort((a, b) => referralSourceName(a).localeCompare(referralSourceName(b)));
    return list.map((c) => ({ label: referralSourceName(c), secondary: c.organization, value: c.id }));
  }

  function mountReferralSourceSelect(el, key, value, disabled) {
    const opts = referralSourceOptions();
    // Keep a currently-selected contact resolvable even if it wouldn't
    // otherwise appear (e.g. its referral_source flag was later disabled).
    if (value && !opts.some((o) => o.value === value)) {
      const c = (window.CONTACTS || []).find((x) => x.id === value);
      if (c) opts.unshift({ label: referralSourceName(c), secondary: c.organization, value: c.id });
    }
    // Pinned first, not last — with 15+ contacts this needs to be reachable
    // without scrolling through the whole alphabetical list.
    if (!disabled) opts.unshift({ label: '+ Add new referral source', value: ADD_NEW_REFERRAL, cls: 'search-select-option-action' });
    const controller = CustomSelect.mount(el, {
      options: opts, value: value || '', ariaLabel: 'Referral Source', placeholder: 'Search referral source…', disabled: !!disabled,
      onChange: (v) => {
        if (v === ADD_NEW_REFERRAL) {
          controller.setValue(state.fieldOverrides[key] !== undefined ? state.fieldOverrides[key] : value);
          openReferralPopup(key, { directAdd: true });
          return;
        }
        state.fieldOverrides[key] = v;
      },
    });
  }

  /* ---------- Contacts Management (search/create/edit/delete + select-a-
   * referral-source), reusing the reclassify-modal shell (widened via
   * .wide) — see the Referral Source lookup's "+ Add new" entry point. ---------- */
  const ORG_TYPES = ['Doctor', 'Hospital', 'Ancillary Provider', 'Payer'];
  // Real site list (from the actual Site dropdown) — "Do Not Use" sites
  // are kept verbatim since that's how they're labeled in the source system.
  const SITES = [
    'Do Not Use - Philadelphia - PA', 'Los Angeles - CA', 'New York - NY',
    'Kansas City - KS', 'Do Not Use - Dallas - TX', 'Omaha - NE', 'Columbus - OH',
  ];

  function associatedOrgOptions(orgType) {
    const list = (window.CONTACTS || [])
      .filter((c) => !orgType || c.org_type === orgType)
      .map((c) => c.organization)
      .filter(Boolean);
    return [...new Set(list)].sort();
  }

  const contactsModal = {
    open: false, mode: 'select', targetFieldKey: null, view: 'list', search: '', orgTypeFilter: '', editingId: null, formValues: {}, deleteId: null, sortCol: 'name', sortAsc: true,
    filterOpen: false, orgFilter: [], stateFilter: '', referralOnly: false, hasEmail: false, hasPhone: false,
    createdFrom: '', createdTo: '', updatedFrom: '', updatedTo: '',
  };

  function contactsActiveFilterCount() {
    let n = 0;
    if (contactsModal.orgFilter.length) n++;
    if (contactsModal.stateFilter) n++;
    if (contactsModal.referralOnly) n++;
    if (contactsModal.hasEmail) n++;
    if (contactsModal.hasPhone) n++;
    if (contactsModal.createdFrom || contactsModal.createdTo) n++;
    if (contactsModal.updatedFrom || contactsModal.updatedTo) n++;
    return n;
  }

  function contactsDayMs(dateStr) { return dateStr ? new Date(dateStr + 'T00:00:00').getTime() : null; }

  function prescriberDefaults() {
    const org = (k) => { const h = lookupProvider(k); return h ? h.value : ''; };
    const prescriberFirst = (lookupProvider('provider_first_name') || {}).value || '';
    const prescriberLast = (lookupProvider('provider_last_name') || {}).value || '';
    return {
      organization: org('organization_name'), address: org('address'), city: org('city'),
      state: org('state'), zip: org('zip'), office_phone: org('provider_phone'),
      associated_org: [prescriberFirst, prescriberLast].filter(Boolean).join(' '),
    };
  }

  function openReferralPopup(key, opts) {
    opts = opts || {};
    contactsModal.open = true;
    contactsModal.mode = 'select';
    contactsModal.targetFieldKey = key;
    contactsModal.search = '';
    contactsModal.orgTypeFilter = '';
    if (opts.directAdd) {
      // "+ Add new" means the user has already decided to add a new
      // contact — jump straight to the form instead of making them find
      // and click "+Add New" again from a list they don't want to search.
      contactsModal.view = 'form';
      contactsModal.editingId = 'new';
      contactsModal.formValues = Object.assign({ org_type: '', referral_source: true }, prescriberDefaults());
    } else {
      contactsModal.view = 'list';
    }
    renderContactsModal();
    document.getElementById('contactsOverlay').style.display = 'flex';
  }
  function closeContactsModal() {
    contactsModal.open = false;
    document.getElementById('contactsOverlay').style.display = 'none';
  }

  const CONTACTS_SORT_KEY = {
    name: (c) => `${c.last_name} ${c.first_name}`.toLowerCase(),
    organization: (c) => (c.organization || '').toLowerCase(),
    org_type: (c) => (c.org_type || '').toLowerCase(),
    address: (c) => (c.address || '').toLowerCase(),
    phone: (c) => (c.office_phone || c.home_phone || ''),
    email: (c) => (c.email || '').toLowerCase(),
  };

  function contactsFiltered() {
    const q = contactsModal.search.trim().toLowerCase();
    const selectMode = contactsModal.mode === 'select';
    const createdFrom = contactsDayMs(contactsModal.createdFrom), createdTo = contactsDayMs(contactsModal.createdTo);
    const updatedFrom = contactsDayMs(contactsModal.updatedFrom), updatedTo = contactsDayMs(contactsModal.updatedTo);
    const list = (window.CONTACTS || []).filter((c) => {
      // This popup is the Referral Source lookup — only referral-source
      // contacts are relevant here, so non-referral contacts stay hidden.
      if (selectMode && !c.referral_source) return false;
      if (contactsModal.orgTypeFilter && c.org_type !== contactsModal.orgTypeFilter) return false;
      if (!selectMode) {
        if (contactsModal.orgFilter.length && !contactsModal.orgFilter.includes(c.organization)) return false;
        if (contactsModal.stateFilter && c.state !== contactsModal.stateFilter) return false;
        if (contactsModal.referralOnly && !c.referral_source) return false;
        if (contactsModal.hasEmail && !c.email) return false;
        if (contactsModal.hasPhone && !(c.office_phone || c.home_phone)) return false;
        if (createdFrom || createdTo || updatedFrom || updatedTo) {
          const audit = AuditStamp.stampFor(c.id);
          if (createdFrom && audit.createdTs < createdFrom) return false;
          if (createdTo && audit.createdTs > createdTo + 86400000 - 1) return false;
          if (updatedFrom && audit.updatedTs < updatedFrom) return false;
          if (updatedTo && audit.updatedTs > updatedTo + 86400000 - 1) return false;
        }
      }
      if (!q) return true;
      const hay = `${c.first_name} ${c.last_name} ${c.organization} ${c.email}`.toLowerCase();
      return hay.includes(q);
    });
    const key = CONTACTS_SORT_KEY[contactsModal.sortCol] || CONTACTS_SORT_KEY.name;
    list.sort((a, b) => {
      const x = key(a), y = key(b);
      return (x < y ? -1 : x > y ? 1 : 0) * (contactsModal.sortAsc ? 1 : -1);
    });
    return list;
  }

  function contactsSortHeader(col, label) {
    const active = contactsModal.sortCol === col;
    return `<th data-sort-col="${col}" style="cursor:pointer;user-select:none">${label}${active ? ` <span style="color:var(--t4)">${contactsModal.sortAsc ? '▲' : '▼'}</span>` : ''}</th>`;
  }

  const ICON_EDIT = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_DELETE = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function contactsListMarkup() {
    const rows = contactsFiltered();
    const selectMode = contactsModal.mode === 'select';
    const rowsHtml = rows.map((c) => {
      const audit = AuditStamp.stampFor(c.id);
      return `
      <tr class="${selectMode ? 'selectable' : ''}" data-select-id="${c.id}">
        <td>${escapeHtml(c.first_name)} ${escapeHtml(c.last_name)}${c.title ? `<br><span style="color:var(--t4);font-size:10.5px">${escapeHtml(c.title)}</span>` : ''}</td>
        <td>${escapeHtml(c.organization || '—')}</td>
        <td>${escapeHtml(c.org_type || '—')}</td>
        <td>${escapeHtml(c.address || '—')}${c.city ? `<br><span style="color:var(--t4);font-size:10.5px">${escapeHtml([c.city, c.state, c.zip].filter(Boolean).join(', '))}</span>` : ''}</td>
        <td>${escapeHtml(c.office_phone || c.home_phone || '—')}</td>
        <td>${escapeHtml(c.email || '—')}</td>
        ${selectMode ? '' : `
        <td>${escapeHtml(audit.createdOn)}</td>
        <td>${escapeHtml(audit.updatedOn)}<span style="color:var(--t4);font-size:10.5px"> by ${escapeHtml(audit.updatedBy)}</span></td>`}
        <td>
          <div class="contact-row-actions">
            <button type="button" data-edit-id="${c.id}" title="Edit contact" aria-label="Edit contact">${ICON_EDIT}</button>
            <button type="button" class="danger" data-delete-id="${c.id}" title="Deleting contacts is disabled" aria-label="Delete contact" disabled>${ICON_DELETE}</button>
          </div>
        </td>
      </tr>`;
    }).join('');
    const fcount = contactsActiveFilterCount();
    const allContacts = window.CONTACTS || [];
    const orgs = [...new Set(allContacts.map((c) => c.organization).filter(Boolean))].sort();
    const states = [...new Set(allContacts.map((c) => c.state).filter(Boolean))].sort();
    return `
      <div class="contacts-toolbar">
        <input type="search" id="contactsSearchInput" placeholder="Search contacts by name, organization, email…" value="${escapeHtml(contactsModal.search)}" />
        <div class="contacts-org-filter" id="contactsOrgFilter"></div>
        ${selectMode ? '' : `<button class="filter-btn${fcount ? ' active' : ''}" type="button" id="contactsFilterBtn">
          <img src="assets/icons/filter 1.svg" alt="" width="14" height="14" />
          Filters
          <span class="fcnt" id="contactsFilterCount" style="display:${fcount ? 'inline-flex' : 'none'}">${fcount}</span>
        </button>
        <button class="btn" type="button" id="contactsFilterResetBtn">Reset</button>`}
        <button type="button" class="btn primary" id="contactsAddNewBtn">+ Add New</button>
      </div>
      ${selectMode ? '' : `<div class="filter-panel" id="contactsFilterPanel" style="display:${contactsModal.filterOpen ? 'flex' : 'none'}">
        <span class="filter-label">Filter by</span>
        <div class="filter-input" id="contactsOrgMultiSelect" style="width:200px"></div>
        <div class="filter-input" id="contactsStateSelect" style="width:110px"></div>
        <button type="button" class="chip${contactsModal.referralOnly ? ' on' : ''}" id="contactsReferralOnlyChip">Referral Source only</button>
        <button type="button" class="chip${contactsModal.hasEmail ? ' on' : ''}" id="contactsHasEmailChip">Has email</button>
        <button type="button" class="chip${contactsModal.hasPhone ? ' on' : ''}" id="contactsHasPhoneChip">Has phone</button>
        <span class="filter-label" style="margin-left:6px">Created</span>
        <div class="date-range-field">
          <input class="doc-age-date" id="contactsCreatedFrom" type="date" aria-label="Created on or after" value="${contactsModal.createdFrom}" />
          <span class="doc-age-sep">–</span>
          <input class="doc-age-date" id="contactsCreatedTo" type="date" aria-label="Created on or before" value="${contactsModal.createdTo}" />
        </div>
        <span class="filter-label" style="margin-left:6px">Updated</span>
        <div class="date-range-field">
          <input class="doc-age-date" id="contactsUpdatedFrom" type="date" aria-label="Updated on or after" value="${contactsModal.updatedFrom}" />
          <span class="doc-age-sep">–</span>
          <input class="doc-age-date" id="contactsUpdatedTo" type="date" aria-label="Updated on or before" value="${contactsModal.updatedTo}" />
        </div>
      </div>`}
      ${rows.length ? `<div class="gridwrap" style="overflow-x:auto;border:1px solid var(--border-lt);border-radius:8px"><table class="contacts-tbl"><thead><tr>
          ${contactsSortHeader('name', 'NAME')}
          ${contactsSortHeader('organization', 'ORGANIZATION')}
          ${contactsSortHeader('org_type', 'ORG TYPE')}
          ${contactsSortHeader('address', 'ADDRESS')}
          ${contactsSortHeader('phone', 'PHONE')}
          ${contactsSortHeader('email', 'EMAIL')}
          ${selectMode ? '' : '<th>CREATED ON</th><th>UPDATED</th>'}
          <th></th>
        </tr></thead><tbody>${rowsHtml}</tbody></table></div>`
        : `<div class="contacts-empty">No contacts match your search.</div>`}
    `;
  }

  /* Layout/components are the prototype's original 2-column field grid
   * (.contacts-field-grid) — see the identical layout in
   * modules/contacts/contacts.js (this is the same contact-management
   * micro-screen, reused here as a popup). Only field order/types were
   * taken from the real Contact/Notes screen. */
  function gridField(label, key, values, opts) {
    opts = opts || {};
    return `<div class="reclassify-field${opts.full ? ' full' : ''}">
      <label>${label}${opts.required ? ' <span class="req">*</span>' : ''}</label>
      <input type="${opts.type || 'text'}" data-contact-field="${key}" value="${escapeHtml(values[key] || '')}" />
    </div>`;
  }

  const CONTACT_FIELDS = [
    ['first_name', 'First Name', { required: true }],
    ['last_name', 'Last Name', { required: true }],
    ['title', 'Title', {}],
    ['professional_designation', 'Prof Designation', {}],
    ['organization', 'Organization', {}],
    ['address', 'Address', { full: true }],
    ['city', 'City', {}],
    ['state', 'State', {}],
    ['zip', 'ZIP', {}],
    ['office_phone', 'Office Phone', {}],
    ['office_ext', 'Office Ext', {}],
    ['office_fax', 'Office Fax', {}],
    ['home_phone', 'Home Phone', {}],
    ['home_ext', 'Home Ext', {}],
    ['home_fax', 'Home Fax', {}],
    ['pager', 'Pager', {}],
    ['cell', 'Cell', {}],
    ['email', 'Email', { type: 'email' }],
  ];

  function contactsFormMarkup() {
    const isNew = contactsModal.editingId === 'new';
    const c = isNew ? contactsModal.formValues : ((window.CONTACTS || []).find((x) => x.id === contactsModal.editingId) || {});
    const values = Object.assign({}, c, contactsModal.formValues);
    return `
      <div class="contacts-field-grid">
        ${CONTACT_FIELDS.map(([key, label, opts]) => gridField(label, key, values, opts)).join('')}
        <div class="reclassify-field"><label>Site</label><div id="contactSiteSelect"></div></div>
        <div class="reclassify-field"><label>Org Type <span class="req">*</span></label><div id="contactOrgTypeSelect"></div></div>
        <div class="reclassify-field"><label>Associated Org</label><div id="contactAssociatedOrgSelect"></div></div>
        <div class="reclassify-field full contacts-checkbox-row">
          <label class="contacts-checkbox"><input type="checkbox" id="contactReferralFlag" ${values.referral_source ? 'checked' : ''} /> Referral Source</label>
          <label class="contacts-checkbox"><input type="checkbox" id="contactWebAccessFlag" ${values.allow_web_access ? 'checked' : ''} /> Allow Web Access?</label>
          <label class="contacts-checkbox"><input type="checkbox" id="contactPrimaryFlag" ${values.primary_contact ? 'checked' : ''} /> Primary Contact</label>
        </div>
        <div class="reclassify-field full">
          <label>Notes</label>
          <textarea id="contactNotes" rows="3" placeholder="Optional note…">${escapeHtml(values.notes || '')}</textarea>
        </div>
      </div>
      <input type="hidden" id="contactOrgTypeValue" value="${escapeHtml(values.org_type || '')}" />
      <input type="hidden" id="contactAssociatedOrgValue" value="${escapeHtml(values.associated_org || '')}" />
      <input type="hidden" id="contactSiteValue" value="${escapeHtml(values.site || '')}" />
    `;
  }

  function mountAssociatedOrgSelect(orgType, value) {
    CustomSelect.mount(document.getElementById('contactAssociatedOrgSelect'), {
      options: associatedOrgOptions(orgType).map((o) => ({ label: o, value: o })),
      value: value || '', placeholder: orgType ? 'Select organization…' : 'Select org type first…', ariaLabel: 'Associated org', disabled: !orgType,
      onChange: (v) => { document.getElementById('contactAssociatedOrgValue').value = v; },
    });
  }

  function contactsFormFootMarkup() {
    const isNew = contactsModal.editingId === 'new';
    return `
      <button class="btn" type="button" id="contactFormCancelBtn">Cancel</button>
      <button class="btn primary" type="button" id="contactFormSaveBtn">${isNew ? 'Create' : 'Save changes'}</button>
    `;
  }

  function contactsModalTitleText() {
    const isNew = contactsModal.editingId === 'new';
    if (contactsModal.view === 'form') {
      if (contactsModal.mode === 'select' && isNew) return 'Add New Referral Source';
      return isNew ? 'Add New Contact' : 'Edit Contact';
    }
    return contactsModal.mode === 'select' ? 'Referral Source' : 'Manage Contacts';
  }

  function renderContactsModal() {
    document.getElementById('contactsModalTitle').textContent = contactsModalTitleText();
    document.getElementById('contactsBackIconBtn').style.display = contactsModal.view === 'form' ? 'inline-flex' : 'none';
    const body = document.getElementById('contactsModalBody');
    body.innerHTML = contactsModal.view === 'list' ? contactsListMarkup() : contactsFormMarkup();
    const foot = document.getElementById('contactsModalFoot');
    if (contactsModal.view === 'form') {
      foot.style.display = 'flex';
      foot.innerHTML = contactsFormFootMarkup();
    } else {
      foot.style.display = 'none';
      foot.innerHTML = '';
    }
    wireContactsModalEvents();
  }

  function renderContactsModalPreservingFocus(inputId) {
    const prev = document.getElementById(inputId);
    const hadFocus = !!prev && document.activeElement === prev;
    const selStart = hadFocus ? prev.selectionStart : null;
    const selEnd = hadFocus ? prev.selectionEnd : null;
    renderContactsModal();
    if (hadFocus) {
      const next = document.getElementById(inputId);
      if (next) {
        next.focus();
        if (selStart != null) { try { next.setSelectionRange(selStart, selEnd); } catch (e) { /* not all input types support this */ } }
      }
    }
  }

  function wireContactsModalEvents() {
    if (contactsModal.view === 'list') {
      document.getElementById('contactsSearchInput').addEventListener('input', (e) => { contactsModal.search = e.target.value; renderContactsModalPreservingFocus('contactsSearchInput'); });
      document.getElementById('contactsAddNewBtn').addEventListener('click', () => {
        contactsModal.view = 'form';
        contactsModal.editingId = 'new';
        contactsModal.formValues = Object.assign({ org_type: '', referral_source: true }, prescriberDefaults());
        renderContactsModal();
      });
      CustomSelect.mount(document.getElementById('contactsOrgFilter'), {
        options: [{ label: 'All Org Types', value: '' }].concat(ORG_TYPES.map((t) => ({ label: t, value: t }))),
        value: contactsModal.orgTypeFilter, ariaLabel: 'Filter by org type',
        onChange: (v) => { contactsModal.orgTypeFilter = v; renderContactsModal(); },
      });
      if (contactsModal.mode !== 'select') {
        const allContacts = window.CONTACTS || [];
        const orgs = [...new Set(allContacts.map((c) => c.organization).filter(Boolean))].sort();
        const states = [...new Set(allContacts.map((c) => c.state).filter(Boolean))].sort();
        document.getElementById('contactsFilterBtn').addEventListener('click', () => { contactsModal.filterOpen = !contactsModal.filterOpen; renderContactsModal(); });
        CustomSelect.mount(document.getElementById('contactsOrgMultiSelect'), {
          multiple: true, options: orgs.map((o) => ({ label: o, value: o })), values: contactsModal.orgFilter,
          placeholder: `Organization (${contactsModal.orgFilter.length})`, ariaLabel: 'Filter by organization',
          onChangeMulti: (vs) => { contactsModal.orgFilter = vs; renderContactsModal(); },
        });
        CustomSelect.mount(document.getElementById('contactsStateSelect'), {
          options: [{ label: 'All States', value: '' }].concat(states.map((s) => ({ label: s, value: s }))),
          value: contactsModal.stateFilter, ariaLabel: 'Filter by state',
          onChange: (v) => { contactsModal.stateFilter = v; renderContactsModal(); },
        });
        document.getElementById('contactsReferralOnlyChip').addEventListener('click', () => { contactsModal.referralOnly = !contactsModal.referralOnly; renderContactsModal(); });
        document.getElementById('contactsHasEmailChip').addEventListener('click', () => { contactsModal.hasEmail = !contactsModal.hasEmail; renderContactsModal(); });
        document.getElementById('contactsHasPhoneChip').addEventListener('click', () => { contactsModal.hasPhone = !contactsModal.hasPhone; renderContactsModal(); });
        ['createdFrom', 'createdTo', 'updatedFrom', 'updatedTo'].forEach((key) => {
          const el = document.getElementById('contacts' + key[0].toUpperCase() + key.slice(1));
          el.addEventListener('change', (e) => { contactsModal[key] = e.target.value; renderContactsModal(); });
        });
        const resetBtn = document.getElementById('contactsFilterResetBtn');
        if (resetBtn) resetBtn.addEventListener('click', () => {
          contactsModal.orgFilter = []; contactsModal.stateFilter = ''; contactsModal.referralOnly = false;
          contactsModal.hasEmail = false; contactsModal.hasPhone = false;
          contactsModal.createdFrom = ''; contactsModal.createdTo = ''; contactsModal.updatedFrom = ''; contactsModal.updatedTo = '';
          renderContactsModal();
        });
      }
      document.querySelectorAll('tr[data-select-id]').forEach((tr) => {
        if (contactsModal.mode === 'select') tr.addEventListener('click', (e) => {
          if (e.target.closest('[data-edit-id]') || e.target.closest('[data-delete-id]')) return;
          selectReferralContact(tr.dataset.selectId);
        });
      });
      document.querySelectorAll('[data-edit-id]').forEach((btn) => btn.addEventListener('click', (e) => {
        e.stopPropagation();
        contactsModal.view = 'form';
        contactsModal.editingId = btn.dataset.editId;
        contactsModal.formValues = {};
        renderContactsModal();
      }));
      document.querySelectorAll('[data-delete-id]').forEach((btn) => btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (btn.disabled) return;
        openDeleteContactConfirm(btn.dataset.deleteId);
      }));
      document.querySelectorAll('[data-sort-col]').forEach((th) => th.addEventListener('click', () => {
        const col = th.dataset.sortCol;
        if (contactsModal.sortCol === col) contactsModal.sortAsc = !contactsModal.sortAsc;
        else { contactsModal.sortCol = col; contactsModal.sortAsc = true; }
        renderContactsModal();
      }));
    } else {
      const orgTypeVal = document.getElementById('contactOrgTypeValue').value;
      CustomSelect.mount(document.getElementById('contactOrgTypeSelect'), {
        options: ORG_TYPES.map((t) => ({ label: t, value: t })),
        value: orgTypeVal, placeholder: 'Select org type…', ariaLabel: 'Org type',
        onChange: (v) => {
          document.getElementById('contactOrgTypeValue').value = v;
          document.getElementById('contactAssociatedOrgValue').value = '';
          mountAssociatedOrgSelect(v, '');
        },
      });
      CustomSelect.mount(document.getElementById('contactSiteSelect'), {
        options: SITES.map((s) => ({ label: s, value: s })),
        value: document.getElementById('contactSiteValue').value, placeholder: 'Select site…', ariaLabel: 'Site',
        onChange: (v) => { document.getElementById('contactSiteValue').value = v; },
      });
      mountAssociatedOrgSelect(orgTypeVal, document.getElementById('contactAssociatedOrgValue').value);
      document.getElementById('contactFormCancelBtn').addEventListener('click', () => { contactsModal.view = 'list'; renderContactsModal(); });
      document.getElementById('contactFormSaveBtn').addEventListener('click', saveContactForm);
    }
    document.getElementById('contactsBackIconBtn').onclick = () => { contactsModal.view = 'list'; renderContactsModal(); };
  }

  function selectReferralContact(contactId) {
    if (!contactsModal.targetFieldKey) { closeContactsModal(); return; }
    state.fieldOverrides[contactsModal.targetFieldKey] = contactId;
    closeContactsModal();
    renderForm();
    const c = (window.CONTACTS || []).find((x) => x.id === contactId);
    toast('Referral source set to ' + (c ? referralSourceLabel(c) : 'selected contact'));
  }

  function saveContactForm() {
    const values = {};
    document.querySelectorAll('[data-contact-field]').forEach((el) => { values[el.dataset.contactField] = el.value.trim(); });
    values.org_type = document.getElementById('contactOrgTypeValue').value;
    values.associated_org = document.getElementById('contactAssociatedOrgValue').value;
    values.site = document.getElementById('contactSiteValue').value;
    values.referral_source = document.getElementById('contactReferralFlag').checked;
    values.allow_web_access = document.getElementById('contactWebAccessFlag').checked;
    values.primary_contact = document.getElementById('contactPrimaryFlag').checked;
    values.notes = document.getElementById('contactNotes').value.trim();
    if (!values.first_name || !values.last_name) { toast('First Name and Last Name are required'); return; }
    if (!values.org_type) { toast('Org Type is required'); return; }

    if (contactsModal.editingId === 'new') {
      const id = 'ct-' + Math.random().toString(36).slice(2, 8);
      window.CONTACTS.push(Object.assign({ id, associated_with: 'provider' }, values));
      toast('Contact created');
      if (contactsModal.mode === 'select') { selectReferralContact(id); return; }
    } else {
      const c = (window.CONTACTS || []).find((x) => x.id === contactsModal.editingId);
      if (c) Object.assign(c, values);
      toast('Contact updated');
    }
    contactsModal.view = 'list';
    renderContactsModal();
  }

  function openDeleteContactConfirm(id) {
    contactsModal.deleteId = id;
    const c = (window.CONTACTS || []).find((x) => x.id === id);
    document.getElementById('deleteContactName').textContent = c ? `${c.first_name} ${c.last_name}` : 'this contact';
    document.getElementById('deleteContactOverlay').style.display = 'flex';
  }

  function findReferralSourceKey() {
    let found = null;
    function scan(list) { (list || []).forEach((f) => { if (f.label.trim().toLowerCase() === 'referral source') found = f._key; }); }
    function walk(sub) { scan(sub.fields); (sub.subsections || []).forEach(walk); }
    SCHEMA.sections.forEach((sec) => { scan(sec.fields); (sec.subsections || []).forEach(walk); });
    return found;
  }

  function findFieldByKey(key) {
    let found = null;
    function scan(list) { (list || []).forEach((f) => { if (f._key === key) found = f; }); }
    function walk(sub) { scan(sub.fields); (sub.subsections || []).forEach(walk); }
    SCHEMA.sections.forEach((sec) => { scan(sec.fields); (sec.subsections || []).forEach(walk); });
    state.extraDrugSubsections.forEach(walk);
    // Also search provider instance fields — these live outside the main schema
    // tree so the original walk would miss them, causing "Use extracted:" to
    // silently do nothing on every provider card field.
    state.providers.forEach((p) => walk(p.sub));
    return found;
  }

  function toggleEvidence(key, anchorEl) {
    if (state.evidenceOpenKey === key) { state.evidenceOpenKey = null; closeFloating(); return; }
    state.evidenceOpenKey = key;
    const field = findFieldByKey(key);
    const rect = anchorEl.getBoundingClientRect();
    const menu = ensureFloating('evidence-menu');
    menu.style.top = rect.bottom + 4 + 'px';
    menu.style.left = Math.min(rect.left, window.innerWidth - 320) + 'px';
    menu.innerHTML = `<button type="button" class="evidence-item" id="evidenceItemBtn">
      <span class="evidence-item-head"><strong>${escapeHtml(field._evidence.line || field.label)}</strong><span>Page ${field._evidence.page}</span></span>
    </button>`;
    document.getElementById('evidenceItemBtn').addEventListener('click', () => {
      showEvidenceOnPreview(field);
      closeFloating();
      state.evidenceOpenKey = null;
    });
    renderForm();
  }

  function showEvidenceOnPreview(field) {
    const wrap = document.getElementById('pdfPage');
    const highlight = document.getElementById('pdfHighlight');
    // Approximate placement — no real coordinate mapping in this prototype
    // (see prompt: "evidence-highlighting-on-click can be approximate").
    const seed = field._key.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const top = 100 + (seed % 6) * 60;
    highlight.style.display = 'block';
    highlight.style.top = top + 'px';
    highlight.style.left = '40px';
    highlight.style.width = '400px';
    highlight.style.height = '18px';
    wrap.scrollIntoView({ block: 'nearest' });
    toast('Highlighted evidence on page ' + field._evidence.page + ' (approximate — no source coordinates in this prototype)');
  }

  /* ---- NPI lookup (dummy) ---- */
  const NPI_RESULTS = [
    { number: '1730123456', firstName: 'Narayan', lastName: 'Verma', city: 'Warren' },
    { number: '1922334455', firstName: 'Narayan', lastName: 'Verma', city: 'Southfield' },
    { number: '1811223344', firstName: 'N.', lastName: 'Verma', city: 'Troy' },
  ];
  function toggleNpiCard(key, anchorEl) {
    closeFloating();
    const rect = anchorEl.closest('.npi-field-wrap').getBoundingClientRect();
    const card = ensureFloating('npi-lookup-card');
    card.style.top = rect.bottom + 4 + 'px';
    card.style.left = rect.left + 'px';
    card.style.width = Math.max(280, rect.width) + 'px';
    card.innerHTML = NPI_RESULTS.map((r) => `
      <button type="button" class="npi-lookup-row" data-num="${r.number}">
        <span class="npi-radio"></span>
        <span class="npi-row-text">${r.firstName} ${r.lastName}<span class="npi-dot"></span>NPI #: ${r.number}<span class="npi-dot"></span>${r.city}</span>
      </button>`).join('');
    card.querySelectorAll('[data-num]').forEach((row) => {
      row.addEventListener('click', () => {
        state.fieldOverrides[key] = row.dataset.num;
        toast('NPI applied (simulated registry lookup)');
        closeFloating();
        renderForm();
      });
    });
  }

  /* ---- Drug lookup (dummy) ---- */
  const DRUG_RESULTS = [
    { itemName: 'Gammagard Liquid 10% 20g', brandName: 'Gammagard', ndc: '0944-2700-03' },
    { itemName: 'Cuvitru 20% 5g/25mL', brandName: 'Cuvitru', ndc: '65597-401-06' },
    { itemName: 'Hizentra 20% 4g/20mL', brandName: 'Hizentra', ndc: '44206-451-06' },
  ];
  function toggleDrugCard(key, anchorEl) {
    closeFloating();
    const rect = anchorEl.closest('.npi-field-wrap').getBoundingClientRect();
    const card = ensureFloating('drug-lookup-card');
    card.style.top = rect.bottom + 4 + 'px';
    card.style.left = rect.left + 'px';
    card.style.width = Math.max(420, rect.width) + 'px';
    card.innerHTML = DRUG_RESULTS.map((r) => `
      <button type="button" class="drug-lookup-row" data-item="${escapeHtml(r.itemName)}">
        <span class="npi-radio"></span>
        <span class="drug-row-grid">
          <span class="drug-cell item">${escapeHtml(r.itemName)}</span>
          <span class="drug-cell brand">${escapeHtml(r.brandName)}</span>
          <span class="drug-cell">${escapeHtml(r.ndc)}</span>
        </span>
      </button>`).join('');
    card.querySelectorAll('[data-item]').forEach((row) => {
      row.addEventListener('click', () => {
        state.fieldOverrides[key] = row.dataset.item;
        toast('Drug applied from catalogue (simulated)');
        closeFloating();
        renderForm();
      });
    });
  }

  function ensureFloating(cls) {
    closeFloating();
    const el = document.createElement('div');
    el.className = cls;
    el.id = 'floatingPopover';
    el.addEventListener('click', (e) => e.stopPropagation());
    document.body.appendChild(el);
    return el;
  }
  function closeFloating() {
    const el = document.getElementById('floatingPopover');
    if (el) el.remove();
  }
  document.addEventListener('click', () => { closeFloating(); state.evidenceOpenKey = null; });

  /* ---------- Add Drug / Add Provider ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addDrugBtn').addEventListener('click', () => {
      const sec = SCHEMA.sections.find((s) => s.title === 'Drug Orders');
      const template = sec.subsections.find((s) => s.title === 'Drug');
      const clone = JSON.parse(JSON.stringify(template));
      clone._id = 'subX' + (subsectionSeq++);
      clone._removable = true;
      clone.fields.forEach((f) => { f._key = clone._id + '__' + f.key; f._value = ''; });
      state.extraDrugSubsections.push(clone);
      renderForm();
    });

    // "+ Add New" opens the create form directly — same directAdd behavior
    // as Referral Source's "+ Add new referral source".
    document.getElementById('addProviderBtn').addEventListener('click', () => {
      openProviderAddForm('add');
    });
  });

  /* ---------- Right section (PDF preview placeholder) ---------- */
  function renderRightSection() {
    document.getElementById('previewDocName').textContent = doc.file.original_file_name;
    updatePreviewTransform();
  }
  function updatePreviewTransform() {
    const page = document.getElementById('pdfPage');
    page.style.transform = `scale(${state.zoom / 100}) rotate(${state.rotation}deg)`;
    document.getElementById('zoomLabel').textContent = state.zoom + '%';
  }

  /* ---------- Modals ---------- */
  function renderModals() {
    document.getElementById('reclassifyOverlay').style.display = state.reclassifyOpen ? 'flex' : 'none';
    document.getElementById('rejectOverlay').style.display = state.rejectOpen ? 'flex' : 'none';
    if (state.reclassifyOpen) {
      document.getElementById('reclassifyFrom').textContent = state.documentType;
      document.getElementById('reclassifyTo').textContent = state.reclassifyTo;
      if (!window._reclassifyReasonSelect) {
        window._reclassifyReasonSelect = CustomSelect.mount(document.getElementById('reclassifyReasonSelect'), {
          options: RECLASSIFY_REASONS.map((r) => ({ label: r, value: r })), value: '', placeholder: 'Select a reason...',
          onChange: () => {},
        });
      }
    }
    if (state.rejectOpen && !window._rejectReasonSelect) {
      window._rejectReasonSelect = CustomSelect.mount(document.getElementById('rejectReasonSelect'), {
        options: REJECT_REASONS.map((r) => ({ label: r, value: r })), value: '', placeholder: 'Select a reason...',
        onChange: () => {},
      });
    }
  }

  /* ---------- Provider search / add popup ----------
   * Same list<->form two-view single modal as the Contacts / Referral Source
   * popup (contactsModal / renderContactsModal) — reused structurally
   * (reclassify-modal wide, back-icon head, list vs form body, foot only in
   * form view) so this reads as the same component, not a one-off.
   *
   * mode 'match' (opened from card #1's subtitle/magnifier): the list is for
   * disambiguating CPR+ candidates for the extracted prescriber; picking a
   * row replaces card #1 in place, keeping rank #1.
   * mode 'add' (opened from the section's "+ Add New" button): always
   * appends a new peer card, never touching #1. */
  function openProviderSearch(mode) {
    state.providerSearchMode = mode || 'match';
    state.providerSearchView = 'list';
    state.providerFormEditingId = null;
    state.providerSearchQuery = '';
    state.providerSearchSpecialty = '';
    state.providerSearchSortCol = 'name';
    state.providerSearchSortAsc = true;
    renderProviderModal();
    document.getElementById('providerSearchOverlay').style.display = 'flex';
  }

  // "+ Add New" (§1/§11) skips the list entirely and opens the create form
  // directly — the same directAdd behavior as "+ Add new referral source".
  function openProviderAddForm(mode) {
    state.providerSearchMode = mode || 'add';
    state.providerSearchView = 'form';
    state.providerFormEditingId = null;
    state.providerFormValues = providerFormSeedValues();
    renderProviderModal();
    document.getElementById('providerSearchOverlay').style.display = 'flex';
  }

  // Edit icon on a list row (§1) — pre-fills the form from that on-file
  // record instead of blank/extracted, same "edit before saving" shape as
  // Contacts' Edit. Saving both updates the record and links/relinks it.
  function openProviderEditForm(id) {
    const rec = CPR_PRESCRIBERS.find((r) => r.id === id);
    if (!rec) return;
    state.providerFormEditingId = id;
    state.providerSearchView = 'form';
    state.providerFormValues = providerFormValuesFromRecord(rec);
    renderProviderModal();
  }

  function closeProviderSearch() {
    document.getElementById('providerSearchOverlay').style.display = 'none';
  }

  function providerModalTitleText() {
    if (state.providerSearchView === 'form') return state.providerFormEditingId ? 'Edit Provider' : 'Add New Prescriber';
    return state.providerSearchMode === 'add' ? 'Add Provider' : 'Match Provider';
  }

  function renderProviderModal() {
    document.getElementById('providerSearchTitle').textContent = providerModalTitleText();
    document.getElementById('providerSearchBackBtn').style.display = state.providerSearchView === 'form' ? 'inline-flex' : 'none';
    const body = document.getElementById('providerSearchBody');
    const foot = document.getElementById('providerSearchFoot');
    if (state.providerSearchView === 'form') {
      body.innerHTML = providerFormMarkup(state.providerFormValues);
      wireProviderFormSelects(state.providerFormValues);
      foot.style.display = 'flex';
      foot.innerHTML = `<button class="btn" type="button" id="providerFormCancelBtn">Cancel</button>
        <button class="btn primary" type="button" id="providerFormCreateBtn">${state.providerFormEditingId ? 'Save changes' : 'Create'}</button>`;
      // Same as Contacts' directAdd: Cancel always goes to the list (never
      // closes outright) — even a form opened directly still has a list of
      // on-file providers to fall back to browsing/searching.
      document.getElementById('providerFormCancelBtn').addEventListener('click', () => {
        state.providerFormEditingId = null;
        state.providerSearchView = 'list';
        renderProviderModal();
      });
      document.getElementById('providerFormCreateBtn').addEventListener('click', createProviderFromForm);
    } else {
      body.innerHTML = providerListMarkup();
      foot.style.display = 'none';
      foot.innerHTML = '';
      wireProviderListEvents();
    }
    document.getElementById('providerSearchBackBtn').onclick = () => { state.providerFormEditingId = null; state.providerSearchView = 'list'; renderProviderModal(); };
  }

  const PROVIDER_SEARCH_SORT_KEY = {
    name: (r) => `${r.last_name} ${r.first_name}`.toLowerCase(),
    specialty: (r) => r.specialty.toLowerCase(),
    organization: (r) => r.organization.toLowerCase(),
    npi: (r) => r.npi || '',
  };

  function providerSearchSortHeader(col, label) {
    const active = state.providerSearchSortCol === col;
    return `<th data-prov-sort-col="${col}" style="cursor:pointer;user-select:none">${label}${active ? ` <span style="color:var(--t4)">${state.providerSearchSortAsc ? '▲' : '▼'}</span>` : ''}</th>`;
  }

  // §2 — in 'match' mode, until the reviewer types a search or picks a
  // specialty filter, the list shows ONLY the actual CPR+ candidates for the
  // extracted prescriber (not the whole directory). Searching or filtering
  // drops that restriction and opens up to every provider, still sorted
  // matches-first.
  function providerListRows() {
    const q = (state.providerSearchQuery || '').trim().toLowerCase();
    const scored = state.providerSearchMode === 'match'
      ? new Map(providerCandidates().map((c) => [c.rec.id, c.score]))
      : new Map();
    const restrictToMatches = state.providerSearchMode === 'match' && !q && !state.providerSearchSpecialty && scored.size > 0;
    const source = restrictToMatches ? CPR_PRESCRIBERS.filter((r) => scored.has(r.id)) : CPR_PRESCRIBERS;
    let rows = source.filter((r) => {
      if (q && !`${r.first_name} ${r.last_name} ${r.specialty} ${r.organization} ${r.npi}`.toLowerCase().includes(q)) return false;
      if (state.providerSearchSpecialty && r.specialty !== state.providerSearchSpecialty) return false;
      return true;
    });
    const sortFn = PROVIDER_SEARCH_SORT_KEY[state.providerSearchSortCol] || PROVIDER_SEARCH_SORT_KEY.name;
    const dir = state.providerSearchSortAsc ? 1 : -1;
    rows.sort((a, b) => {
      const sa = scored.get(a.id) || 0, sb = scored.get(b.id) || 0;
      if (sa !== sb) return sb - sa;
      return (sortFn(a) < sortFn(b) ? -1 : sortFn(a) > sortFn(b) ? 1 : 0) * dir;
    });
    return { rows, scored, restrictToMatches };
  }

  // Same toolbar + sortable gridwrap table as the Contacts / Referral Source
  // popup (contactsListMarkup) — reused visually so this reads as the same
  // component, not a one-off search box. Actions column (Edit / Unlink)
  // mirrors Contacts' sticky last column.
  function providerListMarkup() {
    const { rows, scored, restrictToMatches } = providerListRows();
    const specialties = [...new Set(CPR_PRESCRIBERS.map((r) => r.specialty))].sort();
    return `
      <div class="contacts-toolbar">
        <input type="search" id="providerSearchInput" placeholder="Search providers by name, specialty, organization, NPI…" value="${escapeHtml(state.providerSearchQuery || '')}" />
        <div class="contacts-org-filter" id="providerSearchSpecialtySelect"></div>
        <button type="button" class="btn primary" id="providerSearchAddNewBtn">+ Add New</button>
      </div>
      ${restrictToMatches ? `<div class="contacts-empty" style="padding:0 0 10px;text-align:left;color:var(--t3);font-size:11px">Showing ${rows.length} match${rows.length === 1 ? '' : 'es'} for the extracted prescriber. Search to see every provider.</div>` : ''}
      ${rows.length ? `<div class="gridwrap" style="overflow-x:auto;border:1px solid var(--border-lt);border-radius:8px"><table class="contacts-tbl"><thead><tr>
          ${providerSearchSortHeader('name', 'NAME')}
          ${providerSearchSortHeader('specialty', 'SPECIALTY')}
          ${providerSearchSortHeader('organization', 'ORGANIZATION')}
          ${providerSearchSortHeader('npi', 'NPI')}
          <th>ADDRESS</th>
          <th></th>
        </tr></thead><tbody>
          ${rows.map((r) => {
            const linked = providerAlreadyLinked(r.id);
            return `
            <tr class="selectable" data-prov-id="${r.id}">
              <td>${escapeHtml(r.first_name + ' ' + r.last_name)}${scored.has(r.id) ? ' <span class="match-status-badge match-status-active" style="margin-left:4px">Match</span>' : ''}${linked ? ' <span class="match-status-badge match-status-pending" style="margin-left:4px">On this patient</span>' : ''}${r.prof_designation ? `<br><span style="color:var(--t4);font-size:10.5px">${escapeHtml(r.prof_designation)}</span>` : ''}</td>
              <td>${escapeHtml(r.specialty)}</td>
              <td>${escapeHtml(r.organization)}</td>
              <td style="font-family:monospace;font-size:11px">${escapeHtml(r.npi || '—')}</td>
              <td style="font-size:10.5px;color:var(--t4)">${escapeHtml(r.address + ', ' + r.city + ' ' + r.state)}</td>
              <td>
                <div class="contact-row-actions">
                  <button type="button" data-prov-edit="${r.id}" title="Edit provider" aria-label="Edit provider">${ICON_EDIT}</button>
                  <button type="button" class="danger" data-prov-unlink="${r.id}" title="${linked ? 'Remove from this patient' : 'Not attached to this patient'}" aria-label="Remove provider" ${linked ? '' : 'disabled'}>${ICON_DELETE}</button>
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody></table></div>`
        : `<div class="contacts-empty">No matching providers found.</div>`}
    `;
  }

  function wireProviderListEvents() {
    const specialties = [...new Set(CPR_PRESCRIBERS.map((r) => r.specialty))].sort();
    CustomSelect.mount(document.getElementById('providerSearchSpecialtySelect'), {
      options: [{ label: 'All Specialties', value: '' }].concat(specialties.map((s) => ({ label: s, value: s }))),
      value: state.providerSearchSpecialty, ariaLabel: 'Filter by specialty',
      onChange: (v) => { state.providerSearchSpecialty = v; renderProviderModal(); },
    });
    document.getElementById('providerSearchInput').addEventListener('input', (e) => {
      state.providerSearchQuery = e.target.value;
      renderProviderModalPreservingFocus('providerSearchInput');
    });
    document.querySelectorAll('tr[data-prov-id]').forEach((tr) => {
      tr.addEventListener('click', (e) => {
        if (e.target.closest('[data-prov-edit]') || e.target.closest('[data-prov-unlink]')) return;
        pickProviderListRow(tr.dataset.provId);
        closeProviderSearch();
      });
    });
    document.querySelectorAll('[data-prov-edit]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openProviderEditForm(btn.dataset.provEdit);
      });
    });
    document.querySelectorAll('[data-prov-unlink]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (btn.disabled) return;
        unlinkProviderById(btn.dataset.provUnlink);
      });
    });
    document.querySelectorAll('[data-prov-sort-col]').forEach((th) => th.addEventListener('click', () => {
      const col = th.dataset.provSortCol;
      if (state.providerSearchSortCol === col) state.providerSearchSortAsc = !state.providerSearchSortAsc;
      else { state.providerSearchSortCol = col; state.providerSearchSortAsc = true; }
      renderProviderModal();
    }));
    document.getElementById('providerSearchAddNewBtn').addEventListener('click', () => {
      state.providerFormEditingId = null;
      state.providerSearchView = 'form';
      state.providerFormValues = providerFormSeedValues();
      renderProviderModal();
    });
  }

  function renderProviderModalPreservingFocus(inputId) {
    const prev = document.getElementById(inputId);
    const hadFocus = !!prev && document.activeElement === prev;
    const selStart = hadFocus ? prev.selectionStart : null;
    const selEnd = hadFocus ? prev.selectionEnd : null;
    renderProviderModal();
    if (hadFocus) {
      const next = document.getElementById(inputId);
      if (next) {
        next.focus();
        if (selStart != null) { try { next.setSelectionRange(selStart, selEnd); } catch (e) { /* not all input types support this */ } }
      }
    }
  }

  /* ---------- Provider create form (§1/§11/§12) ----------
   * Field set is generated straight from the schema's Provider subsections
   * (Prescriber / Organization / License Info / Contacts) — not hand-typed —
   * so it can never drift from what the ranked cards themselves show. Seq #
   * is excluded: it's business-assigned by rank, never reviewer-entered.
   * Layout reuses the exact Contacts 2-column grid (.contacts-field-grid /
   * .reclassify-field / gridField) — same component, provider data. */
  function providerFormFieldGroups() {
    return (PROVIDER_TEMPLATE.subsections || []).map((sub) => ({
      title: sub.title.trim(),
      fields: sub.fields.filter((f) => f.key !== SEQ_FIELD_KEY),
    }));
  }

  function providerFieldKeyByLabel(label) {
    const want = label.trim().toLowerCase();
    for (const sub of PROVIDER_TEMPLATE.subsections || []) {
      const f = sub.fields.find((x) => x.label.trim().toLowerCase() === want);
      if (f) return f.key;
    }
    return null;
  }
  const PROVIDER_FIRST_NAME_KEY = providerFieldKeyByLabel('First Name');
  const PROVIDER_LAST_NAME_KEY = providerFieldKeyByLabel('Last Name');
  const PROVIDER_SPECIALTY_KEY = providerFieldKeyByLabel('Specialty');

  // Edit icon (§1): pre-fill the form from an on-file CPR+ record's mapped
  // fields (name/specialty/org/address/phone/fax/email/npi/designation) —
  // the fuller License Info / Contacts fields aren't modeled on the CPR
  // fixture, so they render blank, same as any newly-linked record does.
  function providerFormValuesFromRecord(rec) {
    const values = {};
    Object.keys(PROVIDER_RECORD_MAP).forEach((label) => {
      const key = providerFieldKeyByLabel(label);
      const v = rec[PROVIDER_RECORD_MAP[label]];
      if (key && v) values[key] = v;
    });
    return values;
  }

  // mode 'match': prefill from the extracted card's current values, same as
  // §11's "extracted information as the starting point". mode 'add': blank —
  // this provider has no relationship to the document's extraction.
  function providerFormSeedValues() {
    if (state.providerSearchMode !== 'match') return {};
    const p = state.providers.find((x) => x.isExtractedSlot);
    if (!p) return {};
    const values = {};
    providerFields(p).forEach((f) => {
      const v = state.fieldOverrides[f._key] !== undefined ? state.fieldOverrides[f._key] : f._value;
      if (v) values[f.key] = v;
    });
    return values;
  }

  function providerFormFieldMarkup(f, values) {
    const val = values[f.key] != null ? values[f.key] : '';
    switch (f.type) {
      case 'textarea':
        return `<div class="reclassify-field full"><label>${escapeHtml(f.label)}</label><textarea data-pf-field="${f.key}" rows="3" placeholder="Optional note…">${escapeHtml(val)}</textarea></div>`;
      case 'checkbox':
        return `<div class="reclassify-field full contacts-checkbox-row"><label class="contacts-checkbox"><input type="checkbox" data-pf-field="${f.key}" ${val ? 'checked' : ''} /> ${escapeHtml(f.label)}</label></div>`;
      case 'date':
        return `<div class="reclassify-field"><label>${escapeHtml(f.label)}</label><input type="text" data-pf-field="${f.key}" value="${escapeHtml(val)}" placeholder="MM/DD/YYYY" /></div>`;
      case 'select':
        return `<div class="reclassify-field"><label>${escapeHtml(f.label)}${f.key === PROVIDER_SPECIALTY_KEY ? ' <span class="req">*</span>' : ''}</label><div id="pf-select-${f.key}"></div><input type="hidden" data-pf-hidden="${f.key}" value="${escapeHtml(val)}" /></div>`;
      default:
        return `<div class="reclassify-field"><label>${escapeHtml(f.label)}${f.key === PROVIDER_FIRST_NAME_KEY || f.key === PROVIDER_LAST_NAME_KEY ? ' <span class="req">*</span>' : ''}</label><input type="text" data-pf-field="${f.key}" value="${escapeHtml(val)}" /></div>`;
    }
  }

  function providerFormMarkup(values) {
    const groups = providerFormFieldGroups();
    return `<div class="contacts-field-grid">
      ${groups.map((g) => `
        <div class="reclassify-field full provider-form-group-heading">${escapeHtml(g.title)}</div>
        ${g.fields.map((f) => providerFormFieldMarkup(f, values)).join('')}
      `).join('')}
    </div>`;
  }

  function wireProviderFormSelects(values) {
    (PROVIDER_TEMPLATE.subsections || []).forEach((sub) => {
      sub.fields.forEach((f) => {
        if (f.key === SEQ_FIELD_KEY || f.type !== 'select') return;
        const el = document.getElementById('pf-select-' + f.key);
        if (!el) return;
        const hidden = document.querySelector(`[data-pf-hidden="${f.key}"]`);
        const opts = (f.options || []).map((o) => ({ label: o.label, value: o.label }));
        if (f.metadata && f.metadata.multiple) {
          const vals = String(values[f.key] || '').split(/[\s,]+/).filter(Boolean);
          CustomSelect.mount(el, {
            options: opts, values: vals, multiple: true, placeholder: 'Select value',
            onChangeMulti: (vs) => { hidden.value = vs.join(' '); },
          });
        } else {
          CustomSelect.mount(el, {
            options: opts, value: values[f.key] || '', placeholder: 'Select value',
            onChange: (v) => { hidden.value = v; },
          });
        }
      });
    });
  }

  function createProviderFromForm() {
    const values = {};
    document.querySelectorAll('#providerSearchBody [data-pf-field]').forEach((el) => {
      values[el.dataset.pfField] = el.type === 'checkbox' ? el.checked : el.value.trim();
    });
    document.querySelectorAll('#providerSearchBody [data-pf-hidden]').forEach((el) => {
      values[el.dataset.pfHidden] = el.value;
    });
    if (!String(values[PROVIDER_FIRST_NAME_KEY] || '').trim() || !String(values[PROVIDER_LAST_NAME_KEY] || '').trim()) {
      toast('First Name and Last Name are required');
      return;
    }
    if (!String(values[PROVIDER_SPECIALTY_KEY] || '').trim()) {
      toast('Specialty is required');
      return;
    }

    const editingId = state.providerFormEditingId;
    if (editingId) {
      // Editing an on-file record updates it for everyone, same as editing an
      // "Attached" card (§9's shared-record warning covers that case; this
      // is the same write, just reached from the list).
      const rec = CPR_PRESCRIBERS.find((r) => r.id === editingId);
      if (rec) {
        Object.keys(PROVIDER_RECORD_MAP).forEach((label) => {
          const key = providerFieldKeyByLabel(label);
          const v = key ? values[key] : undefined;
          if (v !== undefined && v !== '' && v !== false) rec[PROVIDER_RECORD_MAP[label]] = v;
        });
      }
      if (state.providerSearchMode === 'add' && providerAlreadyLinked(editingId)) {
        state.providerFormEditingId = null;
        closeProviderSearch();
        toast('Record updated — already assigned to this patient, no change to the care team');
        return;
      }
    }

    if (state.providerSearchMode === 'match') {
      // Same rule as populateExtractedProviderFromRecord: write these
      // reviewer-entered values onto the EXISTING extracted provider's own
      // fields — never a new object — so this can never read as "another
      // provider section". field._value moves to the reviewer's value (the
      // form-typed baseline, not the record and not the pristine
      // extraction), and it's written via fieldOverrides — since the
      // reviewer typed it by hand, it correctly shows as an edit (blue), not
      // a plain record-differs (amber).
      let p = state.providers.find((x) => x.isExtractedSlot);
      if (!p) { p = makeProvider('draft', null, null); p.isExtractedSlot = true; state.providers.unshift(p); }
      providerFields(p).forEach((f) => {
        const v = values[f.key];
        if (v !== undefined && v !== '' && v !== false) state.fieldOverrides[f._key] = v;
      });
      p.origin = editingId ? 'cpr' : 'draft';
      p.cprId = editingId || null;
      state.providerMatchSelectedId = editingId || 'new';
    } else {
      // 'add' mode genuinely appends a distinct new provider — that's the
      // whole point of Add New, unlike Match.
      const p = makeProvider('draft', null, null);
      p.origin = editingId ? 'cpr' : 'draft';
      p.cprId = editingId || null;
      providerFields(p).forEach((f) => {
        const v = values[f.key];
        if (v !== undefined && v !== '' && v !== false) state.fieldOverrides[f._key] = v;
      });
      state.providers.push(p);
    }
    renumberProviders();
    state.providerFormEditingId = null;
    closeProviderSearch();
    renderForm();
    syncPrescribedProvider();
    toast(editingId ? 'Prescriber record updated and linked to this patient' : 'New prescriber added — will be created in records on Save & Submit');
  }

  // Hook into wireModals
function wireModals() {
    document.getElementById('providerSearchCloseBtn').addEventListener('click', () => {
      document.getElementById('providerSearchOverlay').style.display = 'none';
    });

    document.getElementById('reclassifyCancelBtn').addEventListener('click', () => { state.reclassifyOpen = false; renderModals(); document.getElementById('reclassifyOverlay').style.display = 'none'; window._docTypeSelect.setValue(state.documentType); });
    document.getElementById('reclassifyCloseBtn').addEventListener('click', () => document.getElementById('reclassifyCancelBtn').click());
    document.getElementById('reclassifyConfirmBtn').addEventListener('click', () => {
      state.documentType = state.reclassifyTo;
      state.reclassifyOpen = false;
      renderModals();
      renderSummaryBand();
      toast('Document reclassified to ' + state.documentType);
    });

    document.getElementById('rejectOpenBtn').addEventListener('click', () => {
      state.rejectOpen = true;
      document.getElementById('rejectDocName').textContent = doc.file.original_file_name;
      renderModals();
    });
    document.getElementById('rejectCancelBtn').addEventListener('click', () => { state.rejectOpen = false; renderModals(); });
    document.getElementById('rejectCloseBtn').addEventListener('click', () => document.getElementById('rejectCancelBtn').click());
    document.getElementById('rejectConfirmBtn').addEventListener('click', () => {
      state.status = 'Rejected';
      state.rejectOpen = false;
      renderModals();
      renderSummaryBand();
      toast('Document rejected (simulated)');
    });

    document.getElementById('sidePanelCloseBtn').addEventListener('click', () => { state.sidePanelOpen = false; renderSidePanel(); });
    document.getElementById('sidePanelCancelBtn').addEventListener('click', () => { state.sidePanelOpen = false; renderSidePanel(); });
    document.getElementById('sidePanelStartNewBtn').addEventListener('click', () => { state.sidePanelOpen = false; state.attachMode = 'new'; renderSidePanel(); renderAttachCard(); });
    document.getElementById('sidePanelAttachBtn').addEventListener('click', () => {
      const c = DUMMY_CASES.find((x) => x.id === state.sidePanelSelectedId);
      if (!c) return;
      state.attachedCase = c;
      state.attachMode = 'existing';
      state.sidePanelOpen = false;
      renderSidePanel();
      renderAttachCard();
      toast('Attached to ' + c.id);
    });

    document.getElementById('saveSubmitBtn').addEventListener('click', () => {
      state.status = 'Reviewed';
      state.claimedBy = null;
      Claims.release(doc._id, 'reviewed');
      const refKey = findReferralSourceKey();
      const refVal = refKey ? state.fieldOverrides[refKey] : null;
      // Report what happened with providers on this submit.
      const newDrafts = state.providers.filter((p) => p.origin === 'draft');
      const updatedCpr = state.providers.filter((p) => p.origin === 'cpr' && p.edited);
      const provMsgs = [];
      if (newDrafts.length) provMsgs.push(`${newDrafts.length} new prescriber record${newDrafts.length > 1 ? 's' : ''} created in records`);
      if (updatedCpr.length) provMsgs.push(`${updatedCpr.length} shared record${updatedCpr.length > 1 ? 's' : ''} updated`);
      // Promote drafts to cpr on submit (they now exist in records).
      newDrafts.forEach((p) => { p.origin = 'cpr'; });
      updatedCpr.forEach((p) => { p.edited = false; });
      renderSummaryBand();
      const parts = ['Saved & submitted'];
      if (refVal) parts.push('Referral Source synced to records → Patient Demographics');
      if (provMsgs.length) parts.push(...provMsgs);
      toast(parts.join(' · ') + ' (simulated)');
    });
    // Plain Save — persists field edits and draft provider rows without
    // writing new records prescriber records. Drafts survive as "New — pending".
    document.getElementById('saveDraftBtn').addEventListener('click', () => {
      toast('Progress saved — draft providers not yet written to records');
    });
    document.getElementById('cancelBtn').addEventListener('click', () => { toast('Edits discarded (simulated)'); });

    document.getElementById('unclaimCloseBtn').addEventListener('click', () => { document.getElementById('unclaimOverlay').style.display = 'none'; });
    document.getElementById('unclaimCancelBtn').addEventListener('click', () => { document.getElementById('unclaimOverlay').style.display = 'none'; });
    document.getElementById('unclaimConfirmBtn').addEventListener('click', () => {
      Claims.unclaim(doc._id);
      state.claimedBy = null;
      state.status = 'Pending Review';
      document.getElementById('unclaimOverlay').style.display = 'none';
      toast('Document unclaimed — returned to Pending Review');
      renderAll();
    });

    document.getElementById('contactsCloseBtn').addEventListener('click', closeContactsModal);
    document.getElementById('deleteContactCloseBtn').addEventListener('click', () => { document.getElementById('deleteContactOverlay').style.display = 'none'; });
    document.getElementById('deleteContactCancelBtn').addEventListener('click', () => { document.getElementById('deleteContactOverlay').style.display = 'none'; });
    document.getElementById('deleteContactConfirmBtn').addEventListener('click', () => {
      window.CONTACTS = (window.CONTACTS || []).filter((c) => c.id !== contactsModal.deleteId);
      document.getElementById('deleteContactOverlay').style.display = 'none';
      toast('Contact deleted');
      if (contactsModal.open) renderContactsModal();
    });
    document.getElementById('nextBtn').addEventListener('click', () => {
      if (state.activeSectionIndex < SCHEMA.sections.length - 1) { state.activeSectionIndex++; renderAll(); }
    });

    document.getElementById('zoomInBtn').addEventListener('click', () => { state.zoom = Math.min(200, state.zoom + 25); updatePreviewTransform(); });
    document.getElementById('zoomOutBtn').addEventListener('click', () => { state.zoom = Math.max(50, state.zoom - 25); updatePreviewTransform(); });
    document.getElementById('rotateBtn').addEventListener('click', () => { state.rotation = (state.rotation + 90) % 360; updatePreviewTransform(); });
    document.getElementById('backBtn').addEventListener('click', () => { window.location.href = 'intake-requests.html'; });
    document.getElementById('crumbBackBtn').addEventListener('click', () => { window.location.href = 'intake-requests.html'; });
  }

  function renderAll() {
    renderLeftRail();
    renderSummaryBand();
    renderForm();
    renderRightSection();
  }

  document.addEventListener('DOMContentLoaded', () => {
    Shell.init('intake');
    document.getElementById('crumbDocName').textContent = doc.file.original_file_name;
    document.getElementById('railCollapseBtn').addEventListener('click', () => {
      document.getElementById('sectionRail').classList.toggle('collapsed');
    });
    wireModals();
    wireClaimGate();
    initProviders();
    // matchSelectedId defaults to 'm1' (§1e of the exploration — the patient
    // accordion always opens pre-selected), so the care team loads up front
    // exactly as it would after the user confirms the match.
    loadCareTeamForPatient(MATCH_CANDIDATES.find((c) => c.id === state.matchSelectedId));
    renderAll();
  });
})();
