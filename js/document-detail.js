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
    activeSectionIndex: 0,
    collapsed: {},               // subsection id -> bool (collapsed)
    evidenceOpenKey: null,
    npiCard: null,                // {fieldKey, top,left,width}
    drugCard: null,
    matchExpanded: true,
    matchSelectedId: 'm1',
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
    'speciality': 'specialty', 'telephone': 'provider_phone', 'fax': 'fax', 'email': 'email',
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
    return e.target.closest('input, textarea, .search-select-trigger, .npi-lookup-btn, .referral-source-select, .field-select');
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
    { id: 'm1', name: doc ? (ext.patient_information.patient_first_name.value + ' ' + ext.patient_information.patient_last_name.value) : 'Patient', meta: 'DOB ' + (ext.patient_information.dob.value || '-') + ' · MRN HC10012', status: 'active', cprReferralSourceId: 'ct-001' },
    { id: 'm2', name: ext.patient_information.patient_last_name.value || 'Patient', meta: 'DOB 04/12/1968 · MRN HC10098', status: 'inactive', cprReferralSourceId: null },
  ];

  function activeSectionUsesMatch() {
    const sec = SCHEMA.sections[state.activeSectionIndex];
    return sec.title === 'Patient Demographics' || sec.title === 'M.D./Providers';
  }

  function renderMatchAccordion() {
    const wrap = document.getElementById('matchRegion');
    if (!activeSectionUsesMatch()) { wrap.style.display = 'none'; return; }
    wrap.style.display = 'block';
    const isPatient = SCHEMA.sections[state.activeSectionIndex].title === 'Patient Demographics';
    const title = isPatient ? 'Patient match found' : 'Provider match found';
    const subtitle = isPatient ? 'Review and confirm the matching patient record.' : 'Review and confirm the matching provider record.';
    const selected = MATCH_CANDIDATES.find((c) => c.id === state.matchSelectedId);
    const headerInner = selected
      ? `<span class="match-selected-summary"><span class="match-selected-main"><span class="match-selected-name">${escapeHtml(selected.name)}</span><span class="match-selected-meta">${escapeHtml(selected.meta)}</span></span></span>`
      : `<span class="match-tt"><span class="match-t1">${title}</span><span class="match-t2">${subtitle}</span></span>`;

    wrap.innerHTML = `
      <div class="match-accordion${state.matchExpanded ? ' open' : ''}">
        <button type="button" class="match-head" id="matchToggleBtn">
          <span class="match-ico">✓</span>
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
              <span class="match-radio-main"><span class="match-radio-name">Create a new ${isPatient ? 'patient' : 'provider'} record</span></span>
            </label>
          </div>
        </div>
      </div>`;

    document.getElementById('matchToggleBtn').addEventListener('click', () => { state.matchExpanded = !state.matchExpanded; renderMatchAccordion(); });
    wrap.querySelectorAll('input[name="matchChoice"]').forEach((r) => {
      r.addEventListener('change', (e) => {
        state.matchSelectedId = e.target.dataset.id;
        // "Existing matching patient selected -> populate Referral Source from
        // CPR+" (the user can still change it afterward — see field markup).
        const candidate = MATCH_CANDIDATES.find((c) => c.id === state.matchSelectedId);
        const refKey = findReferralSourceKey();
        if (candidate && candidate.cprReferralSourceId && refKey && state.fieldOverrides[refKey] === undefined) {
          state.fieldOverrides[refKey] = candidate.cprReferralSourceId;
          toast('Referral Source populated from CPR+');
        }
        renderForm();
      });
    });
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
          return `<div class="field-select referral-source-select" data-key="${field._key}" data-value="${escapeHtml(val)}" data-disabled="${disabled ? '1' : ''}"></div>`;
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

  function fieldMarkup(field) {
    const wide = field.type === 'textarea';
    return `<div class="field${wide ? ' wide' : ''}">
      <label for="${field._key}">
        <span>${escapeHtml(field.label)}</span>
        ${field.required ? '<em>*</em>' : ''}
        ${confidenceMarkup(field)}
        ${evidenceMarkup(field)}
      </label>
      ${fieldControlMarkup(field)}
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

  function renderForm() {
    const sec = SCHEMA.sections[state.activeSectionIndex];
    document.getElementById('formSectionTitle').textContent = sec.title;
    const isDrugSection = sec.title === 'Drug Orders';
    document.getElementById('addDrugBtn').style.display = isDrugSection ? 'inline-flex' : 'none';

    const topFields = sec.fields.map(fieldMarkup).join('');
    const subsectionsHtml = (sec.subsections || []).map((s) => subsectionMarkup(s, 0)).join('');
    const extraHtml = isDrugSection ? state.extraDrugSubsections.map((s) => subsectionMarkup(s, 0)).join('') : '';
    document.getElementById('dynamicForm').innerHTML = topFields + subsectionsHtml + extraHtml;

    document.getElementById('nextBtn').style.display = state.activeSectionIndex < SCHEMA.sections.length - 1 ? 'inline-flex' : 'none';

    wireFormEvents();
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
      el.addEventListener('input', (e) => { state.fieldOverrides[e.target.dataset.key] = e.target.value; });
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
      CustomSelect.mount(el, {
        options: opts, value: el.dataset.value || '', ariaLabel: 'field', disabled: el.dataset.disabled === '1',
        onChange: (v) => { state.fieldOverrides[key] = v; },
      });
    });
    document.querySelectorAll('.referral-source-select').forEach((el) => {
      mountReferralSourceSelect(el, el.dataset.key, el.dataset.value || '', el.dataset.disabled === '1');
    });
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
          openReferralPopup(key);
          return;
        }
        state.fieldOverrides[key] = v;
      },
    });
  }

  /* ---------- Contacts Management (search/create/edit/delete + select-a-
   * referral-source), reusing the reclassify-modal shell (widened via
   * .wide) — see the Referral Source lookup's "+ Add new" entry point. ---------- */
  const CONTACT_FIELDS = [
    ['first_name', 'First Name', true], ['last_name', 'Last Name', true],
    ['title', 'Title', false], ['professional_designation', 'Professional Designation', false],
    ['organization', 'Organization', false], ['associated_org', 'Associated Org', false],
    ['address', 'Address', false], ['city', 'City', false],
    ['state', 'State', false], ['zip', 'Zip', false],
    ['office_phone', 'Office Phone', false], ['home_phone', 'Home Phone', false],
    ['fax', 'Fax', false], ['email', 'Email', false],
    ['site', 'Site', false],
  ];
  const ORG_TYPES = ['Doctor', 'Hospital', 'Ancillary Provider', 'Payer'];

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

  function openReferralPopup(key) {
    contactsModal.open = true;
    contactsModal.mode = 'select';
    contactsModal.targetFieldKey = key;
    contactsModal.view = 'list';
    contactsModal.search = '';
    contactsModal.orgTypeFilter = '';
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

  function contactFormFieldsMarkup(c) {
    return CONTACT_FIELDS.map(([key, label, required]) => `
      <div class="reclassify-field${key === 'address' ? ' full' : ''}">
        <label>${label}${required ? ' <span class="req">*</span>' : ''}</label>
        <input type="${key === 'email' ? 'email' : 'text'}" data-contact-field="${key}" value="${escapeHtml(c[key] || '')}" />
      </div>`).join('');
  }

  function contactsFormMarkup() {
    const isNew = contactsModal.editingId === 'new';
    const c = isNew ? contactsModal.formValues : ((window.CONTACTS || []).find((x) => x.id === contactsModal.editingId) || {});
    const values = Object.assign({}, c, contactsModal.formValues);
    return `
      <div class="contacts-field-grid">
        ${contactFormFieldsMarkup(values)}
        <div class="reclassify-field">
          <label>Org Type <span class="req">*</span></label>
          <div id="contactOrgTypeSelect"></div>
        </div>
        <div class="reclassify-field">
          <label class="contacts-checkbox"><input type="checkbox" id="contactReferralFlag" ${values.referral_source ? 'checked' : ''} /> Referral Source <span class="req">*</span></label>
        </div>
        <div class="reclassify-field full">
          <label>Notes</label>
          <textarea id="contactNotes" rows="2" placeholder="Optional note…">${escapeHtml(values.notes || '')}</textarea>
        </div>
      </div>
      <input type="hidden" id="contactOrgTypeValue" value="${escapeHtml(values.org_type || '')}" />
    `;
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

  function wireContactsModalEvents() {
    if (contactsModal.view === 'list') {
      document.getElementById('contactsSearchInput').addEventListener('input', (e) => { contactsModal.search = e.target.value; renderContactsModal(); });
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
      CustomSelect.mount(document.getElementById('contactOrgTypeSelect'), {
        options: ORG_TYPES.map((t) => ({ label: t, value: t })),
        value: document.getElementById('contactOrgTypeValue').value, placeholder: 'Select org type…', ariaLabel: 'Org type',
        onChange: (v) => { document.getElementById('contactOrgTypeValue').value = v; },
      });
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
    values.referral_source = document.getElementById('contactReferralFlag').checked;
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

  /* ---------- Add Drug ---------- */
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

  function wireModals() {
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
      renderSummaryBand();
      toast(refVal
        ? 'Saved & submitted — Referral Source synced to CPR+ → Patient Demographics (simulated)'
        : 'Saved & submitted (simulated)');
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
    renderAll();
  });
})();
