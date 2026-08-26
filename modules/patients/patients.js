/* Patients — standalone Care Center page. Rebuilt onto the exact same
 * component set as Contacts (contacts-tbl, sorting, sticky actions column,
 * reclassify-modal add/edit form, CustomSelect) rather than the older
 * v64-ported openModal()/.fld/.irf pattern this module used before — same
 * design language, patient-shaped data/fields/filters instead of contact
 * ones. No new components were introduced; every class/pattern here already
 * exists in css/document-detail.css, css/table.css and css/custom-select.css.
 */
(function () {
  const STATUSES = ['Active', 'Closed'];

  const state = {
    search: '', statusFilter: '', sortCol: 'name', sortAsc: true, editingId: null, formValues: {}, deleteId: null,
    filterOpen: false, payerFilter: [], createdFrom: '', createdTo: '', updatedFrom: '', updatedTo: '',
    viewingId: null, editingProviderId: null,
  };

  function activeFilterCount() {
    let n = 0;
    if (state.payerFilter.length) n++;
    if (state.createdFrom || state.createdTo) n++;
    if (state.updatedFrom || state.updatedTo) n++;
    return n;
  }

  function dayMs(dateStr) { return dateStr ? new Date(dateStr + 'T00:00:00').getTime() : null; }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  function getPatients() {
    const del = window._deletedPatients || (window._deletedPatients = new Set());
    const added = window._addedPatients || (window._addedPatients = []);
    return [...window.PATIENTS, ...added].filter((p) => !del.has(p.id));
  }

  const SORT_KEY = {
    mrn: (p) => (p.mrn || '').toLowerCase(),
    name: (p) => (p.name || '').toLowerCase(),
    dob: (p) => p.dob || '',
    phone: (p) => p.phone || '',
    drug: (p) => (p.drug || '').toLowerCase(),
    payer: (p) => (p.payer || '').toLowerCase(),
    dx: (p) => (p.dx || '').toLowerCase(),
    activeCases: (p) => p.activeCases || 0,
    status: (p) => (p.status || '').toLowerCase(),
  };

  function filtered() {
    const q = state.search.trim().toLowerCase();
    const createdFrom = dayMs(state.createdFrom), createdTo = dayMs(state.createdTo);
    const updatedFrom = dayMs(state.updatedFrom), updatedTo = dayMs(state.updatedTo);
    const list = getPatients().filter((p) => {
      if (state.statusFilter && p.status !== state.statusFilter) return false;
      if (state.payerFilter.length && !state.payerFilter.includes(p.payer)) return false;
      if (createdFrom || createdTo || updatedFrom || updatedTo) {
        const audit = AuditStamp.stampFor(p.mrn || p.name);
        if (createdFrom && audit.createdTs < createdFrom) return false;
        if (createdTo && audit.createdTs > createdTo + 86400000 - 1) return false;
        if (updatedFrom && audit.updatedTs < updatedFrom) return false;
        if (updatedTo && audit.updatedTs > updatedTo + 86400000 - 1) return false;
      }
      if (!q) return true;
      const hay = `${p.name} ${p.dob} ${p.mrn} ${p.drug} ${p.payer} ${p.dx}`.toLowerCase();
      return hay.includes(q);
    });
    const key = SORT_KEY[state.sortCol] || SORT_KEY.name;
    list.sort((a, b) => {
      const x = key(a), y = key(b);
      return (x < y ? -1 : x > y ? 1 : 0) * (state.sortAsc ? 1 : -1);
    });
    return list;
  }

  function sortHeader(col, label) {
    const active = state.sortCol === col;
    return `<th data-sort-col="${col}" style="cursor:pointer;user-select:none">${label}${active ? ` <span style="color:var(--t4)">${state.sortAsc ? '▲' : '▼'}</span>` : ''}</th>`;
  }

  const ICON_EDIT = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 20h9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_DELETE = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // Full-innerHTML re-render on every keystroke destroys and recreates the
  // search <input>, losing focus/caret — capture and restore across render().
  function renderPreservingFocus(inputId) {
    const prev = document.getElementById(inputId);
    const hadFocus = !!prev && document.activeElement === prev;
    const selStart = hadFocus ? prev.selectionStart : null;
    const selEnd = hadFocus ? prev.selectionEnd : null;
    render();
    if (hadFocus) {
      const next = document.getElementById(inputId);
      if (next) {
        next.focus();
        if (selStart != null) { try { next.setSelectionRange(selStart, selEnd); } catch (e) { /* not all input types support this */ } }
      }
    }
  }

  function render() {
    const rows = filtered();
    const rowsHtml = rows.map((p) => {
      const audit = AuditStamp.stampFor(p.mrn || p.name);
      return `
      <tr class="selectable" data-view-id="${p.id}">
        <td class="mono" style="color:var(--t3)">${esc(p.mrn)}</td>
        <td><b>${esc(p.name)}</b></td>
        <td class="mono">${esc(p.dob)}${p.sex ? ` · ${esc(p.sex)}` : ''}</td>
        <td>${esc(p.phone || '—')}</td>
        <td>${esc(p.drug || '—')}${p.dose ? `<br><span style="color:var(--t4);font-size:10.5px">${esc(p.dose)}</span>` : ''}</td>
        <td>${esc(p.payer || '—')}</td>
        <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis">${esc(p.dx || '—')}</td>
        <td>${p.activeCases > 0 ? `<span class="bdg info"><span class="d"></span>${p.activeCases}</span>` : `<span class="bdg gray"><span class="d"></span>0</span>`}</td>
        <td>${p.status === 'Active' ? '<span class="bdg ok"><span class="d"></span>Active</span>' : '<span class="bdg gray"><span class="d"></span>Closed</span>'}</td>
        <td>${esc(audit.createdOn)}</td>
        <td>${esc(audit.updatedOn)}<span style="color:var(--t4);font-size:10.5px"> by ${esc(audit.updatedBy)}</span></td>
        <td>
          <div class="contact-row-actions">
            <button type="button" data-edit-id="${p.id}" title="Edit patient" aria-label="Edit patient">${ICON_EDIT}</button>
            <button type="button" class="danger" data-delete-id="${p.id}" title="Delete patient" aria-label="Delete patient">${ICON_DELETE}</button>
          </div>
        </td>
      </tr>`;
    }).join('');

    const fcount = activeFilterCount();
    const allPatients = getPatients();
    const payers = [...new Set(allPatients.map((p) => p.payer).filter(Boolean))].sort();

    document.getElementById('patientsPageBody').innerHTML = `
      <div class="contacts-toolbar">
        <input type="search" id="patientsSearchInput" placeholder="Search patients by name, MRN, DOB, drug, payer…" value="${esc(state.search)}" />
        <div class="contacts-org-filter" id="patientsStatusFilter"></div>
        <button class="filter-btn${fcount ? ' active' : ''}" type="button" id="patientsFilterBtn">
          <img src="../../assets/icons/filter 1.svg" alt="" width="14" height="14" />
          Filters
          <span class="fcnt" id="patientsFilterCount" style="display:${fcount ? 'inline-flex' : 'none'}">${fcount}</span>
        </button>
        <button class="btn" type="button" id="patientsFilterResetBtn">Reset</button>
      </div>
      <div class="filter-panel" id="patientsFilterPanel" style="display:${state.filterOpen ? 'flex' : 'none'}">
        <span class="filter-label">Filter by</span>
        <div class="filter-input" id="patientsPayerMultiSelect" style="width:220px"></div>
        <span class="filter-label" style="margin-left:6px">Created</span>
        <div class="date-range-field">
          <input class="doc-age-date" id="patientsCreatedFrom" type="date" aria-label="Created on or after" value="${state.createdFrom}" />
          <span class="doc-age-sep">–</span>
          <input class="doc-age-date" id="patientsCreatedTo" type="date" aria-label="Created on or before" value="${state.createdTo}" />
        </div>
        <span class="filter-label" style="margin-left:6px">Updated</span>
        <div class="date-range-field">
          <input class="doc-age-date" id="patientsUpdatedFrom" type="date" aria-label="Updated on or after" value="${state.updatedFrom}" />
          <span class="doc-age-sep">–</span>
          <input class="doc-age-date" id="patientsUpdatedTo" type="date" aria-label="Updated on or before" value="${state.updatedTo}" />
        </div>
      </div>
      ${rows.length ? `<div class="gridwrap" style="overflow-x:auto;border:1px solid var(--border-lt);border-radius:8px"><table class="contacts-tbl"><thead><tr>
          ${sortHeader('mrn', 'MRN')}
          ${sortHeader('name', 'NAME')}
          ${sortHeader('dob', 'DOB / SEX')}
          <th>PHONE</th>
          ${sortHeader('drug', 'DRUG')}
          ${sortHeader('payer', 'PAYER')}
          ${sortHeader('dx', 'DIAGNOSIS')}
          ${sortHeader('activeCases', 'ACTIVE CASES')}
          ${sortHeader('status', 'STATUS')}
          <th>CREATED ON</th><th>UPDATED</th>
          <th></th>
        </tr></thead><tbody>${rowsHtml}</tbody></table></div>`
        : `<div class="contacts-empty">No patients match your search.</div>`}
    `;

    CustomSelect.mount(document.getElementById('patientsStatusFilter'), {
      options: [{ label: 'All Patients', value: '' }].concat(STATUSES.map((s) => ({ label: s, value: s }))),
      value: state.statusFilter, ariaLabel: 'Filter by status',
      onChange: (v) => { state.statusFilter = v; render(); },
    });
    document.getElementById('patientsSearchInput').addEventListener('input', (e) => { state.search = e.target.value; renderPreservingFocus('patientsSearchInput'); });
    document.getElementById('patientsFilterBtn').addEventListener('click', () => { state.filterOpen = !state.filterOpen; render(); });
    CustomSelect.mount(document.getElementById('patientsPayerMultiSelect'), {
      multiple: true, options: payers.map((p) => ({ label: p, value: p })), values: state.payerFilter,
      placeholder: `Payer (${state.payerFilter.length})`, ariaLabel: 'Filter by payer',
      onChangeMulti: (vs) => { state.payerFilter = vs; render(); },
    });
    ['createdFrom', 'createdTo', 'updatedFrom', 'updatedTo'].forEach((key) => {
      const el = document.getElementById('patients' + key[0].toUpperCase() + key.slice(1));
      el.addEventListener('change', (e) => { state[key] = e.target.value; render(); });
    });
    const resetBtn = document.getElementById('patientsFilterResetBtn');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      state.payerFilter = []; state.createdFrom = ''; state.createdTo = ''; state.updatedFrom = ''; state.updatedTo = '';
      render();
    });
    document.querySelectorAll('[data-sort-col]').forEach((th) => th.addEventListener('click', () => {
      const col = th.dataset.sortCol;
      if (state.sortCol === col) state.sortAsc = !state.sortAsc;
      else { state.sortCol = col; state.sortAsc = true; }
      render();
    }));
    document.querySelectorAll('[data-edit-id]').forEach((btn) => btn.addEventListener('click', (e) => { e.stopPropagation(); openForm(btn.dataset.editId); }));
    document.querySelectorAll('[data-delete-id]').forEach((btn) => btn.addEventListener('click', (e) => { e.stopPropagation(); openDeleteConfirm(btn.dataset.deleteId); }));
    document.querySelectorAll('tr[data-view-id]').forEach((tr) => tr.addEventListener('click', () => openView(tr.dataset.viewId)));
    injectIcons(document.getElementById('patientsPageBody'));
  }

  /* ---------- Add/Edit form ----------
   * Same 2-column field grid (.contacts-field-grid) and group-heading divider
   * (.provider-form-group-heading, already generic — not provider-specific
   * despite the name) as the rest of the app. All fields the old View-only
   * modal used to show read-only are editable here now — Demographics /
   * Clinical / Administrative groups, matching the original grouping. */
  function gridField(label, key, values, opts) {
    opts = opts || {};
    return `<div class="reclassify-field${opts.full ? ' full' : ''}">
      <label>${label}${opts.required ? ' <span class="req">*</span>' : ''}</label>
      <input type="${opts.type || 'text'}" data-patient-field="${key}" value="${esc(values[key] || '')}" />
    </div>`;
  }

  const PATIENT_FIELD_GROUPS = [
    { title: 'Demographics', fields: [
      ['first_name', 'First Name', { required: true }],
      ['last_name', 'Last Name', { required: true }],
      ['dob', 'DOB', { required: true }],
      ['sex', 'Sex', {}],
      ['phone', 'Phone', {}],
      ['email', 'Email', { type: 'email' }],
      ['lang', 'Language', {}],
      ['address', 'Address', { full: true }],
      ['city', 'City', {}],
      ['state', 'State', {}],
      ['zip', 'ZIP', {}],
    ] },
    { title: 'Clinical', fields: [
      ['drug', 'Drug', {}],
      ['dose', 'Dose', {}],
      ['dx', 'Diagnosis', { full: true }],
      ['allergies', 'Allergies', {}],
      ['ht', 'Height', {}],
      ['wt', 'Weight', {}],
      ['bmi', 'BMI', {}],
      ['rx', 'Prescriber', {}],
      ['npi', 'NPI', {}],
      ['clinic', 'Clinic', {}],
    ] },
    { title: 'Administrative', fields: [
      ['payer', 'Payer', {}],
      ['plan', 'Plan', {}],
      ['member', 'Member ID', {}],
      ['activeCases', 'Active Cases', {}],
      ['totalCases', 'Total Cases', {}],
      ['lastActivity', 'Last Activity', {}],
    ] },
  ];

  function patientFormMarkup(values) {
    return `
      <div class="contacts-field-grid">
        ${PATIENT_FIELD_GROUPS.map((g) => `
          <div class="reclassify-field full provider-form-group-heading">${esc(g.title)}</div>
          ${g.fields.map(([key, label, opts]) => gridField(label, key, values, opts)).join('')}
        `).join('')}
        <div class="reclassify-field"><label>Status <span class="req">*</span></label><div id="patientStatusSelect"></div></div>
      </div>
      <input type="hidden" id="patientStatusValue" value="${esc(values.status || 'Active')}" />
    `;
  }

  function openForm(id) {
    state.editingId = id;
    state.formValues = {};
    const isNew = id === 'new';
    const p = isNew ? {} : (getPatients().find((x) => x.id === id) || {});
    const values = isNew ? {} : {
      first_name: (p.name || '').split(' ')[0] || '', last_name: (p.name || '').split(' ').slice(1).join(' '),
      dob: p.dob, sex: p.sex, phone: p.phone, email: p.email, lang: p.lang,
      address: p.address, city: p.city, state: p.state, zip: p.zip,
      drug: p.drug, dose: p.dose, dx: p.dx, allergies: p.allergies,
      ht: p.vitals && p.vitals.ht, wt: p.vitals && p.vitals.wt, bmi: p.vitals && p.vitals.bmi,
      rx: p.rx, npi: p.npi, clinic: p.clinic,
      payer: p.payer, plan: p.plan, member: p.member,
      activeCases: p.activeCases, totalCases: p.totalCases, lastActivity: p.lastActivity,
      status: p.status,
    };
    document.getElementById('patientFormTitle').textContent = isNew ? 'Add New Patient' : 'Edit Patient';
    document.getElementById('patientFormBody').innerHTML = patientFormMarkup(values);
    document.getElementById('patientFormFoot').innerHTML = `
      <button class="btn" type="button" id="patientFormCancelBtn">Cancel</button>
      <button class="btn primary" type="button" id="patientFormSaveBtn">${isNew ? 'Create' : 'Save changes'}</button>
    `;
    CustomSelect.mount(document.getElementById('patientStatusSelect'), {
      options: STATUSES.map((s) => ({ label: s, value: s })),
      value: values.status || 'Active', placeholder: 'Select status…', ariaLabel: 'Status',
      onChange: (v) => { document.getElementById('patientStatusValue').value = v; },
    });
    document.getElementById('patientFormCancelBtn').addEventListener('click', closeForm);
    document.getElementById('patientFormSaveBtn').addEventListener('click', saveForm);
    document.getElementById('patientFormOverlay').style.display = 'flex';
  }

  function closeForm() { document.getElementById('patientFormOverlay').style.display = 'none'; }

  function saveForm() {
    const values = {};
    document.querySelectorAll('[data-patient-field]').forEach((el) => { values[el.dataset.patientField] = el.value.trim(); });
    values.status = document.getElementById('patientStatusValue').value;
    if (!values.first_name || !values.last_name || !values.dob) {
      toast('First name, last name, and DOB are required');
      return;
    }
    const record = {
      name: `${values.first_name} ${values.last_name}`.trim(), dob: values.dob, sex: values.sex,
      phone: values.phone, email: values.email, lang: values.lang,
      address: values.address, city: values.city, state: values.state, zip: values.zip,
      drug: values.drug, dose: values.dose, dx: values.dx, allergies: values.allergies,
      vitals: { ht: values.ht, wt: values.wt, bmi: values.bmi },
      rx: values.rx, npi: values.npi, clinic: values.clinic,
      payer: values.payer, plan: values.plan, member: values.member,
      activeCases: Number(values.activeCases) || 0, totalCases: Number(values.totalCases) || 0,
      lastActivity: values.lastActivity, status: values.status,
    };
    if (state.editingId === 'new') {
      record.id = 'PT-NEW-' + Math.random().toString(36).slice(2, 9);
      record.mrn = 'MRN-' + (Math.floor(Math.random() * 900000) + 100000);
      record.cases = [];
      window._addedPatients = (window._addedPatients || []).concat([record]);
      toast('Patient created');
    } else {
      // Write back onto whichever array actually holds this id, same as
      // Contacts always mutating window.CONTACTS[idx] in place by id.
      const idxAdded = (window._addedPatients || []).findIndex((x) => x.id === state.editingId);
      if (idxAdded !== -1) {
        window._addedPatients[idxAdded] = Object.assign({}, window._addedPatients[idxAdded], record);
      } else {
        const idxBase = window.PATIENTS.findIndex((x) => x.id === state.editingId);
        if (idxBase !== -1) window.PATIENTS[idxBase] = Object.assign({}, window.PATIENTS[idxBase], record);
      }
      toast('Patient updated');
    }
    closeForm();
    render();
  }

  /* ---------- Delete ---------- */
  /* ---------- View (read-only) + linked Contacts / Providers / Cases ----------
   * Row click opens this; its Edit button hands off to the real Edit form
   * (same split as Contacts' View->Edit). The three linked sections are
   * summary tables with link/unlink here — editing a linked contact/provider
   * happens in that record's own real edit form (Contacts' modal, reused
   * as-is; a lightweight new one for Providers, since none existed before).
   * Cases are not editable here — summary only, "Open case" goes to Case
   * Management, which is the real system of record for case data. */
  function viewField(label, value, opts) {
    opts = opts || {};
    return `<div class="reclassify-field${opts.full ? ' full' : ''}">
      <label>${label}</label>
      <div class="patient-view-value">${esc(value) || '—'}</div>
    </div>`;
  }

  function patientViewFieldsMarkup(p) {
    return `
      <div class="contacts-field-grid">
        ${PATIENT_FIELD_GROUPS.map((g) => `
          <div class="reclassify-field full provider-form-group-heading">${esc(g.title)}</div>
          ${g.fields.map(([key, label]) => {
            let val;
            if (key === 'first_name') val = (p.name || '').split(' ')[0];
            else if (key === 'last_name') val = (p.name || '').split(' ').slice(1).join(' ');
            else if (key === 'ht') val = p.vitals && p.vitals.ht;
            else if (key === 'wt') val = p.vitals && p.vitals.wt;
            else if (key === 'bmi') val = p.vitals && p.vitals.bmi;
            else val = p[key];
            return viewField(label, val, { full: key === 'address' || key === 'dx' });
          }).join('')}
        `).join('')}
        ${viewField('Status', p.status)}
      </div>
    `;
  }

  function caseStateBdg(status) {
    const map = { 'Intake Review': 'gray', 'Awaiting BV (Insights)': 'warn', 'PA Submitted': 'info', 'Approved — Scheduling': 'ok', 'Approved': 'ok', 'Denied': 'err' };
    return `<span class="bdg ${map[status] || 'gray'}"><span class="d"></span>${esc(status)}</span>`;
  }

  function linkedContactsMarkup(p) {
    const ids = p.contactIds || [];
    const contacts = ids.map((id) => (window.CONTACTS || []).find((c) => c.id === id)).filter(Boolean);
    return `
      <div class="patient-linked-head">
        <span class="patient-linked-title">Contacts (${contacts.length})</span>
        <button class="btn" type="button" data-link-contact="${p.id}">+ Link Contact</button>
      </div>
      ${contacts.length ? `<div class="gridwrap" style="border:1px solid var(--border-lt);border-radius:8px;max-height:220px"><table class="contacts-tbl"><thead><tr>
          <th>NAME</th><th>ORGANIZATION</th><th>PHONE</th><th>EMAIL</th><th></th>
        </tr></thead><tbody>
          ${contacts.map((c) => `
            <tr class="selectable" data-open-contact="${c.id}">
              <td>${esc(c.first_name)} ${esc(c.last_name)}</td>
              <td>${esc(c.organization || '—')}</td>
              <td>${esc(c.office_phone || c.home_phone || '—')}</td>
              <td>${esc(c.email || '—')}</td>
              <td><button type="button" class="danger" data-unlink-contact="${c.id}" title="Unlink from this patient" aria-label="Unlink contact">${ICON_DELETE}</button></td>
            </tr>`).join('')}
        </tbody></table></div>` : `<div class="contacts-empty">No contacts linked to this patient.</div>`}
    `;
  }

  function linkedProvidersMarkup(p) {
    const ids = p.providerIds || [];
    const providers = ids.map((id) => (window.PROVIDERS || []).find((x) => x.id === id)).filter(Boolean);
    return `
      <div class="patient-linked-head">
        <span class="patient-linked-title">Providers (${providers.length})</span>
        <button class="btn" type="button" data-link-provider="${p.id}">+ Link Provider</button>
      </div>
      ${providers.length ? `<div class="gridwrap" style="border:1px solid var(--border-lt);border-radius:8px;max-height:220px"><table class="contacts-tbl"><thead><tr>
          <th>NAME</th><th>SPECIALTY</th><th>ORGANIZATION</th><th>NPI</th><th></th>
        </tr></thead><tbody>
          ${providers.map((pr) => `
            <tr class="selectable" data-open-provider="${pr.id}">
              <td>${esc(pr.first_name)} ${esc(pr.last_name)}</td>
              <td>${esc(pr.specialty || '—')}</td>
              <td>${esc(pr.organization || '—')}</td>
              <td style="font-family:monospace;font-size:11px">${esc(pr.npi || '—')}</td>
              <td>
                <div class="contact-row-actions">
                  <button type="button" data-edit-provider="${pr.id}" title="Edit provider" aria-label="Edit provider">${ICON_EDIT}</button>
                  <button type="button" class="danger" data-unlink-provider="${pr.id}" title="Unlink from this patient" aria-label="Unlink provider">${ICON_DELETE}</button>
                </div>
              </td>
            </tr>`).join('')}
        </tbody></table></div>` : `<div class="contacts-empty">No providers linked to this patient.</div>`}
    `;
  }

  function casesMarkup(p) {
    const cases = p.cases || [];
    return `
      <div class="patient-linked-head">
        <span class="patient-linked-title">Cases (${cases.length})</span>
      </div>
      ${cases.length ? `<div class="gridwrap" style="border:1px solid var(--border-lt);border-radius:8px;max-height:220px"><table class="contacts-tbl"><thead><tr>
          <th>CASE ID</th><th>STATUS</th><th>RECEIVED</th><th>DRUG</th><th>PAYER</th><th></th>
        </tr></thead><tbody>
          ${cases.map((c) => `
            <tr>
              <td class="mono">${esc(c.id)}</td>
              <td>${caseStateBdg(c.status)}</td>
              <td>${esc(c.received || '—')}</td>
              <td>${esc(c.drug || '—')}</td>
              <td>${esc(c.payer || '—')}</td>
              <td><a class="tb-link" href="../case-management/case-management.html?id=${encodeURIComponent(c.id)}">Open case →</a></td>
            </tr>`).join('')}
        </tbody></table></div>` : `<div class="contacts-empty">No cases for this patient.</div>`}
    `;
  }

  function openView(id) {
    const p = getPatients().find((x) => x.id === id);
    if (!p) return;
    state.viewingId = id;
    document.getElementById('patientViewTitle').innerHTML = `${esc(p.name)} <span class="mono" style="font-size:10.5px;font-weight:500;color:var(--t3);margin-left:6px">${esc(p.mrn)}</span>`;
    document.getElementById('patientViewBody').innerHTML = `
      ${patientViewFieldsMarkup(p)}
      <div class="patient-linked-section">${linkedContactsMarkup(p)}</div>
      <div class="patient-linked-section">${linkedProvidersMarkup(p)}</div>
      <div class="patient-linked-section">${casesMarkup(p)}</div>
    `;
    wireViewSections(p);
    document.getElementById('patientViewEditBtn').onclick = () => { closeView(); openForm(id); };
    document.getElementById('patientViewOverlay').style.display = 'flex';
  }
  function closeView() { document.getElementById('patientViewOverlay').style.display = 'none'; }

  function wireViewSections(p) {
    const body = document.getElementById('patientViewBody');
    body.querySelectorAll('[data-open-contact]').forEach((tr) => tr.addEventListener('click', (e) => {
      if (e.target.closest('[data-unlink-contact]')) return;
      window.ContactEditor.openView(tr.dataset.openContact);
    }));
    body.querySelectorAll('[data-unlink-contact]').forEach((btn) => btn.addEventListener('click', (e) => {
      e.stopPropagation();
      p.contactIds = (p.contactIds || []).filter((id) => id !== btn.dataset.unlinkContact);
      openView(p.id);
      toast('Contact unlinked from this patient');
    }));
    body.querySelectorAll('[data-link-contact]').forEach((btn) => btn.addEventListener('click', () => openLinkContact(p.id)));
    body.querySelectorAll('[data-open-provider]').forEach((tr) => tr.addEventListener('click', (e) => {
      if (e.target.closest('[data-edit-provider]') || e.target.closest('[data-unlink-provider]')) return;
      openProviderForm(tr.dataset.openProvider);
    }));
    body.querySelectorAll('[data-edit-provider]').forEach((btn) => btn.addEventListener('click', (e) => { e.stopPropagation(); openProviderForm(btn.dataset.editProvider); }));
    body.querySelectorAll('[data-unlink-provider]').forEach((btn) => btn.addEventListener('click', (e) => {
      e.stopPropagation();
      p.providerIds = (p.providerIds || []).filter((id) => id !== btn.dataset.unlinkProvider);
      openView(p.id);
      toast('Provider unlinked from this patient');
    }));
    body.querySelectorAll('[data-link-provider]').forEach((btn) => btn.addEventListener('click', () => openLinkProvider(p.id)));
  }

  /* ---------- Link existing Contact / Provider ---------- */
  function openLinkContact(patientId) {
    const p = getPatients().find((x) => x.id === patientId);
    if (!p) return;
    const render = (q) => {
      q = (q || '').trim().toLowerCase();
      const linked = new Set(p.contactIds || []);
      const rows = (window.CONTACTS || []).filter((c) => !linked.has(c.id) && (!q || `${c.first_name} ${c.last_name} ${c.organization}`.toLowerCase().includes(q)));
      document.getElementById('linkContactBody').innerHTML = `
        <input type="search" id="linkContactSearch" placeholder="Search contacts by name, organization…" value="${esc(q)}" style="width:100%;box-sizing:border-box;margin-bottom:10px" />
        <div class="gridwrap" style="border:1px solid var(--border-lt);border-radius:8px;max-height:360px">
          <table class="contacts-tbl"><thead><tr><th>NAME</th><th>ORGANIZATION</th><th>ORG TYPE</th><th></th></tr></thead><tbody>
            ${rows.length ? rows.map((c) => `
              <tr class="selectable" data-pick-contact="${c.id}">
                <td>${esc(c.first_name)} ${esc(c.last_name)}</td>
                <td>${esc(c.organization || '—')}</td>
                <td>${esc(c.org_type || '—')}</td>
                <td><button type="button" class="btn primary" data-pick-contact-btn="${c.id}">Link</button></td>
              </tr>`).join('') : `<tr><td colspan="4"><div class="contacts-empty">No matching contacts.</div></td></tr>`}
          </tbody></table>
        </div>
      `;
      const input = document.getElementById('linkContactSearch');
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      input.addEventListener('input', (e) => render(e.target.value));
      document.querySelectorAll('[data-pick-contact-btn]').forEach((btn) => btn.addEventListener('click', (e) => {
        e.stopPropagation();
        p.contactIds = (p.contactIds || []).concat([btn.dataset.pickContactBtn]);
        closeLinkContact();
        openView(patientId);
        toast('Contact linked to this patient');
      }));
    };
    render('');
    document.getElementById('linkContactOverlay').style.display = 'flex';
  }
  function closeLinkContact() { document.getElementById('linkContactOverlay').style.display = 'none'; }

  function openLinkProvider(patientId) {
    const p = getPatients().find((x) => x.id === patientId);
    if (!p) return;
    const render = (q) => {
      q = (q || '').trim().toLowerCase();
      const linked = new Set(p.providerIds || []);
      const rows = (window.PROVIDERS || []).filter((pr) => !linked.has(pr.id) && (!q || `${pr.first_name} ${pr.last_name} ${pr.specialty} ${pr.organization}`.toLowerCase().includes(q)));
      document.getElementById('linkProviderBody').innerHTML = `
        <input type="search" id="linkProviderSearch" placeholder="Search providers by name, specialty, organization…" value="${esc(q)}" style="width:100%;box-sizing:border-box;margin-bottom:10px" />
        <button class="btn primary" type="button" id="linkProviderAddNewBtn" style="margin-bottom:10px">+ Add New Provider</button>
        <div class="gridwrap" style="border:1px solid var(--border-lt);border-radius:8px;max-height:340px">
          <table class="contacts-tbl"><thead><tr><th>NAME</th><th>SPECIALTY</th><th>ORGANIZATION</th><th>NPI</th><th></th></tr></thead><tbody>
            ${rows.length ? rows.map((pr) => `
              <tr class="selectable" data-pick-provider="${pr.id}">
                <td>${esc(pr.first_name)} ${esc(pr.last_name)}</td>
                <td>${esc(pr.specialty || '—')}</td>
                <td>${esc(pr.organization || '—')}</td>
                <td style="font-family:monospace;font-size:11px">${esc(pr.npi || '—')}</td>
                <td><button type="button" class="btn primary" data-pick-provider-btn="${pr.id}">Link</button></td>
              </tr>`).join('') : `<tr><td colspan="5"><div class="contacts-empty">No matching providers.</div></td></tr>`}
          </tbody></table>
        </div>
      `;
      const input = document.getElementById('linkProviderSearch');
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      input.addEventListener('input', (e) => render(e.target.value));
      document.getElementById('linkProviderAddNewBtn').addEventListener('click', () => {
        closeLinkProvider();
        openProviderForm('new', patientId);
      });
      document.querySelectorAll('[data-pick-provider-btn]').forEach((btn) => btn.addEventListener('click', (e) => {
        e.stopPropagation();
        p.providerIds = (p.providerIds || []).concat([btn.dataset.pickProviderBtn]);
        closeLinkProvider();
        openView(patientId);
        toast('Provider linked to this patient');
      }));
    };
    render('');
    document.getElementById('linkProviderOverlay').style.display = 'flex';
  }
  function closeLinkProvider() { document.getElementById('linkProviderOverlay').style.display = 'none'; }

  /* ---------- Provider Add/Edit (lightweight — flat record, no nested
   * License Info/Contacts subsections like Document Detail's richer form) ---------- */
  const PROVIDER_FIELDS = [
    ['first_name', 'First Name', { required: true }],
    ['last_name', 'Last Name', { required: true }],
    ['specialty', 'Specialty', { required: true }],
    ['prof_designation', 'Prof. Designation', {}],
    ['organization', 'Organization', {}],
    ['address', 'Address', { full: true }],
    ['city', 'City', {}],
    ['state', 'State', {}],
    ['zip', 'ZIP', {}],
    ['phone', 'Phone', {}],
    ['fax', 'Fax', {}],
    ['email', 'Email', { type: 'email' }],
    ['npi', 'NPI', {}],
  ];

  function providerGridField(label, key, values, opts) {
    opts = opts || {};
    return `<div class="reclassify-field${opts.full ? ' full' : ''}">
      <label>${label}${opts.required ? ' <span class="req">*</span>' : ''}</label>
      <input type="${opts.type || 'text'}" data-provider-field="${key}" value="${esc(values[key] || '')}" />
    </div>`;
  }

  function providerFormMarkup(values) {
    return `<div class="contacts-field-grid">${PROVIDER_FIELDS.map(([key, label, opts]) => providerGridField(label, key, values, opts)).join('')}</div>`;
  }

  let providerFormLinkPatientId = null;
  function openProviderForm(id, linkPatientId) {
    providerFormLinkPatientId = linkPatientId || null;
    const isNew = id === 'new';
    const pr = isNew ? {} : ((window.PROVIDERS || []).find((x) => x.id === id) || {});
    state.editingProviderId = id;
    document.getElementById('providerFormTitle').textContent = isNew ? 'Add New Provider' : 'Edit Provider';
    document.getElementById('providerFormBody').innerHTML = providerFormMarkup(pr);
    document.getElementById('providerFormFoot').innerHTML = `
      <button class="btn" type="button" id="providerFormCancelBtn">Cancel</button>
      <button class="btn primary" type="button" id="providerFormSaveBtn">${isNew ? 'Create' : 'Save changes'}</button>
    `;
    document.getElementById('providerFormCancelBtn').addEventListener('click', closeProviderForm);
    document.getElementById('providerFormSaveBtn').addEventListener('click', saveProviderForm);
    document.getElementById('providerFormOverlay').style.display = 'flex';
  }
  function closeProviderForm() { document.getElementById('providerFormOverlay').style.display = 'none'; }

  function saveProviderForm() {
    const values = {};
    document.querySelectorAll('[data-provider-field]').forEach((el) => { values[el.dataset.providerField] = el.value.trim(); });
    if (!values.first_name || !values.last_name || !values.specialty) {
      toast('First name, last name, and specialty are required');
      return;
    }
    if (state.editingProviderId === 'new') {
      values.id = 'Pr' + Math.random().toString(36).slice(2, 8);
      window.PROVIDERS = (window.PROVIDERS || []).concat([values]);
      toast('Provider created');
      if (providerFormLinkPatientId) {
        const p = getPatients().find((x) => x.id === providerFormLinkPatientId);
        if (p) { p.providerIds = (p.providerIds || []).concat([values.id]); }
      }
    } else {
      const idx = (window.PROVIDERS || []).findIndex((x) => x.id === state.editingProviderId);
      if (idx !== -1) window.PROVIDERS[idx] = Object.assign({}, window.PROVIDERS[idx], values);
      toast('Provider updated');
    }
    closeProviderForm();
    if (providerFormLinkPatientId) openView(providerFormLinkPatientId);
    else if (state.viewingId) openView(state.viewingId);
  }

  function openDeleteConfirm(id) {
    state.deleteId = id;
    const p = getPatients().find((x) => x.id === id);
    document.getElementById('deletePatientName').textContent = p ? p.name : 'this patient';
    document.getElementById('deletePatientOverlay').style.display = 'flex';
  }
  function closeDeleteConfirm() { document.getElementById('deletePatientOverlay').style.display = 'none'; }

  document.addEventListener('DOMContentLoaded', () => {
    Shell.init('patients');
    document.getElementById('patientsAddNewBtn').addEventListener('click', () => openForm('new'));
    document.getElementById('patientFormCloseBtn').addEventListener('click', closeForm);
    document.getElementById('deletePatientCloseBtn').addEventListener('click', closeDeleteConfirm);
    document.getElementById('deletePatientCancelBtn').addEventListener('click', closeDeleteConfirm);
    document.getElementById('deletePatientConfirmBtn').addEventListener('click', () => {
      window._deletedPatients = window._deletedPatients || new Set();
      window._deletedPatients.add(state.deleteId);
      window._addedPatients = (window._addedPatients || []).filter((x) => x.id !== state.deleteId);
      closeDeleteConfirm();
      toast('Patient deleted');
      render();
    });
    document.getElementById('patientViewCloseBtn').addEventListener('click', closeView);
    document.getElementById('patientViewCloseBtn2').addEventListener('click', closeView);
    document.getElementById('linkContactCloseBtn').addEventListener('click', closeLinkContact);
    document.getElementById('linkProviderCloseBtn').addEventListener('click', closeLinkProvider);
    document.getElementById('providerFormCloseBtn').addEventListener('click', closeProviderForm);
    // Refresh the open View popup if a linked contact was edited/deleted from
    // its own (reused) Contacts modal while the patient's View is showing.
    window.onContactSaved = () => { if (state.viewingId) openView(state.viewingId); };
    window.onContactDeleted = (id) => {
      const p = getPatients().find((x) => x.id === state.viewingId);
      if (p) p.contactIds = (p.contactIds || []).filter((cid) => cid !== id);
      if (state.viewingId) openView(state.viewingId);
    };
    render();
  });
})();
