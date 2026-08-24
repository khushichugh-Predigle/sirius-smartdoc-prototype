/* Contacts — standalone Care Center page. Same data (window.CONTACTS) and the
 * same visual design (contacts-tbl, sorting, sticky columns, add/edit form
 * fields) as the Referral Source picker's "manage" mode embedded inside
 * Document Detail — that embedded flow is the same contact-management
 * micro-screen reused as a popup there; this page is its standalone home. */
(function () {
  const ORG_TYPES = ['Doctor', 'Hospital', 'Ancillary Provider', 'Payer'];
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

  const state = {
    search: '', orgTypeFilter: '', sortCol: 'name', sortAsc: true, editingId: null, formValues: {}, deleteId: null,
    filterOpen: false, orgFilter: [], stateFilter: '', referralOnly: false, hasEmail: false, hasPhone: false,
    createdFrom: '', createdTo: '', updatedFrom: '', updatedTo: '',
  };

  function activeFilterCount() {
    let n = 0;
    if (state.orgFilter.length) n++;
    if (state.stateFilter) n++;
    if (state.referralOnly) n++;
    if (state.hasEmail) n++;
    if (state.hasPhone) n++;
    if (state.createdFrom || state.createdTo) n++;
    if (state.updatedFrom || state.updatedTo) n++;
    return n;
  }

  function dayMs(dateStr) { return dateStr ? new Date(dateStr + 'T00:00:00').getTime() : null; }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

  const SORT_KEY = {
    name: (c) => `${c.last_name} ${c.first_name}`.toLowerCase(),
    organization: (c) => (c.organization || '').toLowerCase(),
    org_type: (c) => (c.org_type || '').toLowerCase(),
    address: (c) => (c.address || '').toLowerCase(),
    phone: (c) => (c.office_phone || c.home_phone || ''),
    email: (c) => (c.email || '').toLowerCase(),
  };

  function filtered() {
    const q = state.search.trim().toLowerCase();
    const createdFrom = dayMs(state.createdFrom), createdTo = dayMs(state.createdTo);
    const updatedFrom = dayMs(state.updatedFrom), updatedTo = dayMs(state.updatedTo);
    const list = (window.CONTACTS || []).filter((c) => {
      if (state.orgTypeFilter && c.org_type !== state.orgTypeFilter) return false;
      if (state.orgFilter.length && !state.orgFilter.includes(c.organization)) return false;
      if (state.stateFilter && c.state !== state.stateFilter) return false;
      if (state.referralOnly && !c.referral_source) return false;
      if (state.hasEmail && !c.email) return false;
      if (state.hasPhone && !(c.office_phone || c.home_phone)) return false;
      if (createdFrom || createdTo || updatedFrom || updatedTo) {
        const audit = AuditStamp.stampFor(c.id);
        if (createdFrom && audit.createdTs < createdFrom) return false;
        if (createdTo && audit.createdTs > createdTo + 86400000 - 1) return false;
        if (updatedFrom && audit.updatedTs < updatedFrom) return false;
        if (updatedTo && audit.updatedTs > updatedTo + 86400000 - 1) return false;
      }
      if (!q) return true;
      const hay = `${c.first_name} ${c.last_name} ${c.organization} ${c.email}`.toLowerCase();
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

  function render() {
    const rows = filtered();
    const rowsHtml = rows.map((c) => {
      const audit = AuditStamp.stampFor(c.id);
      const deleteDisabled = c.referral_source;
      return `
      <tr>
        <td>${esc(c.first_name)} ${esc(c.last_name)}${c.title ? `<br><span style="color:var(--t4);font-size:10.5px">${esc(c.title)}</span>` : ''}</td>
        <td>${esc(c.organization || '—')}</td>
        <td>${esc(c.org_type || '—')}</td>
        <td>${esc(c.address || '—')}${c.city ? `<br><span style="color:var(--t4);font-size:10.5px">${esc([c.city, c.state, c.zip].filter(Boolean).join(', '))}</span>` : ''}</td>
        <td>${esc(c.office_phone || c.home_phone || '—')}</td>
        <td>${esc(c.email || '—')}</td>
        <td>${esc(audit.createdOn)}</td>
        <td>${esc(audit.updatedOn)}<span style="color:var(--t4);font-size:10.5px"> by ${esc(audit.updatedBy)}</span></td>
        <td>
          <div class="contact-row-actions">
            <button type="button" data-edit-id="${c.id}" title="Edit contact" aria-label="Edit contact">${ICON_EDIT}</button>
            <button type="button" class="danger" data-delete-id="${c.id}" title="${deleteDisabled ? 'Referral source contacts can’t be deleted' : 'Delete contact'}" aria-label="Delete contact" ${deleteDisabled ? 'disabled' : ''}>${ICON_DELETE}</button>
          </div>
        </td>
      </tr>`;
    }).join('');

    const fcount = activeFilterCount();
    const allContacts = window.CONTACTS || [];
    const orgs = [...new Set(allContacts.map((c) => c.organization).filter(Boolean))].sort();
    const states = [...new Set(allContacts.map((c) => c.state).filter(Boolean))].sort();

    document.getElementById('contactsPageBody').innerHTML = `
      <div class="contacts-toolbar">
        <input type="search" id="contactsSearchInput" placeholder="Search contacts by name, organization, email…" value="${esc(state.search)}" />
        <div class="contacts-org-filter" id="contactsOrgFilter"></div>
        <button class="filter-btn${fcount ? ' active' : ''}" type="button" id="contactsFilterBtn">
          <img src="../../assets/icons/filter 1.svg" alt="" width="14" height="14" />
          Filters
          <span class="fcnt" id="contactsFilterCount" style="display:${fcount ? 'inline-flex' : 'none'}">${fcount}</span>
        </button>
      </div>
      <div class="filter-panel" id="contactsFilterPanel" style="display:${state.filterOpen ? 'flex' : 'none'}">
        <span class="filter-label">Filter by</span>
        <div class="filter-input" id="contactsOrgMultiSelect" style="width:200px"></div>
        <div class="filter-input" id="contactsStateSelect" style="width:110px"></div>
        <button type="button" class="chip${state.referralOnly ? ' on' : ''}" id="contactsReferralOnlyChip">Referral Source only</button>
        <button type="button" class="chip${state.hasEmail ? ' on' : ''}" id="contactsHasEmailChip">Has email</button>
        <button type="button" class="chip${state.hasPhone ? ' on' : ''}" id="contactsHasPhoneChip">Has phone</button>
        <span class="filter-label" style="margin-left:6px">Created</span>
        <input class="tb-input doc-age-date" id="contactsCreatedFrom" type="date" aria-label="Created on or after" value="${state.createdFrom}" />
        <span class="doc-age-sep">–</span>
        <input class="tb-input doc-age-date" id="contactsCreatedTo" type="date" aria-label="Created on or before" value="${state.createdTo}" />
        <span class="filter-label" style="margin-left:6px">Updated</span>
        <input class="tb-input doc-age-date" id="contactsUpdatedFrom" type="date" aria-label="Updated on or after" value="${state.updatedFrom}" />
        <span class="doc-age-sep">–</span>
        <input class="tb-input doc-age-date" id="contactsUpdatedTo" type="date" aria-label="Updated on or before" value="${state.updatedTo}" />
        ${fcount ? `<button class="btn" type="button" id="contactsFilterResetBtn" style="margin-left:auto">Reset filters</button>` : ''}
      </div>
      ${rows.length ? `<div class="gridwrap" style="overflow-x:auto;border:1px solid var(--border-lt);border-radius:8px"><table class="contacts-tbl"><thead><tr>
          ${sortHeader('name', 'NAME')}
          ${sortHeader('organization', 'ORGANIZATION')}
          ${sortHeader('org_type', 'ORG TYPE')}
          ${sortHeader('address', 'ADDRESS')}
          ${sortHeader('phone', 'PHONE')}
          ${sortHeader('email', 'EMAIL')}
          <th>CREATED ON</th><th>UPDATED</th>
          <th></th>
        </tr></thead><tbody>${rowsHtml}</tbody></table></div>`
        : `<div class="contacts-empty">No contacts match your search.</div>`}
    `;

    CustomSelect.mount(document.getElementById('contactsOrgFilter'), {
      options: [{ label: 'All Org Types', value: '' }].concat(ORG_TYPES.map((t) => ({ label: t, value: t }))),
      value: state.orgTypeFilter, ariaLabel: 'Filter by org type',
      onChange: (v) => { state.orgTypeFilter = v; render(); },
    });
    document.getElementById('contactsSearchInput').addEventListener('input', (e) => { state.search = e.target.value; render(); });
    document.getElementById('contactsFilterBtn').addEventListener('click', () => { state.filterOpen = !state.filterOpen; render(); });
    CustomSelect.mount(document.getElementById('contactsOrgMultiSelect'), {
      multiple: true, options: orgs.map((o) => ({ label: o, value: o })), values: state.orgFilter,
      placeholder: `Organization (${state.orgFilter.length})`, ariaLabel: 'Filter by organization',
      onChangeMulti: (vs) => { state.orgFilter = vs; render(); },
    });
    CustomSelect.mount(document.getElementById('contactsStateSelect'), {
      options: [{ label: 'All States', value: '' }].concat(states.map((s) => ({ label: s, value: s }))),
      value: state.stateFilter, ariaLabel: 'Filter by state',
      onChange: (v) => { state.stateFilter = v; render(); },
    });
    document.getElementById('contactsReferralOnlyChip').addEventListener('click', () => { state.referralOnly = !state.referralOnly; render(); });
    document.getElementById('contactsHasEmailChip').addEventListener('click', () => { state.hasEmail = !state.hasEmail; render(); });
    document.getElementById('contactsHasPhoneChip').addEventListener('click', () => { state.hasPhone = !state.hasPhone; render(); });
    ['createdFrom', 'createdTo', 'updatedFrom', 'updatedTo'].forEach((key) => {
      const el = document.getElementById('contacts' + key[0].toUpperCase() + key.slice(1));
      el.addEventListener('change', (e) => { state[key] = e.target.value; render(); });
    });
    const resetBtn = document.getElementById('contactsFilterResetBtn');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      state.orgFilter = []; state.stateFilter = ''; state.referralOnly = false; state.hasEmail = false; state.hasPhone = false;
      state.createdFrom = ''; state.createdTo = ''; state.updatedFrom = ''; state.updatedTo = '';
      render();
    });
    document.querySelectorAll('[data-sort-col]').forEach((th) => th.addEventListener('click', () => {
      const col = th.dataset.sortCol;
      if (state.sortCol === col) state.sortAsc = !state.sortAsc;
      else { state.sortCol = col; state.sortAsc = true; }
      render();
    }));
    document.querySelectorAll('[data-edit-id]').forEach((btn) => btn.addEventListener('click', () => openForm(btn.dataset.editId)));
    document.querySelectorAll('[data-delete-id]').forEach((btn) => btn.addEventListener('click', () => {
      if (btn.disabled) return;
      openDeleteConfirm(btn.dataset.deleteId);
    }));
    injectIcons(document.getElementById('contactsPageBody'));
  }

  /* ---------- Add/Edit form ---------- */
  function formFieldsMarkup(values) {
    return CONTACT_FIELDS.map(([key, label, required]) => `
      <div class="reclassify-field${key === 'address' ? ' full' : ''}">
        <label>${label}${required ? ' <span class="req">*</span>' : ''}</label>
        <input type="${key === 'email' ? 'email' : 'text'}" data-contact-field="${key}" value="${esc(values[key] || '')}" />
      </div>`).join('');
  }

  function openForm(id) {
    state.editingId = id;
    state.formValues = {};
    const isNew = id === 'new';
    const c = isNew ? {} : ((window.CONTACTS || []).find((x) => x.id === id) || {});
    document.getElementById('contactFormTitle').textContent = isNew ? 'Add New Contact' : 'Edit Contact';
    document.getElementById('contactFormBody').innerHTML = `
      <div class="contacts-field-grid">
        ${formFieldsMarkup(c)}
        <div class="reclassify-field">
          <label>Org Type <span class="req">*</span></label>
          <div id="contactOrgTypeSelect"></div>
        </div>
        <div class="reclassify-field">
          <label class="contacts-checkbox"><input type="checkbox" id="contactReferralFlag" ${c.referral_source ? 'checked' : ''} /> Referral Source <span class="req">*</span></label>
        </div>
        <div class="reclassify-field full">
          <label>Notes</label>
          <textarea id="contactNotes" rows="2" placeholder="Optional note…">${esc(c.notes || '')}</textarea>
        </div>
      </div>
      <input type="hidden" id="contactOrgTypeValue" value="${esc(c.org_type || '')}" />
    `;
    document.getElementById('contactFormFoot').innerHTML = `
      <button class="btn" type="button" id="contactFormCancelBtn">Cancel</button>
      <button class="btn primary" type="button" id="contactFormSaveBtn">${isNew ? 'Create' : 'Save changes'}</button>
    `;
    CustomSelect.mount(document.getElementById('contactOrgTypeSelect'), {
      options: ORG_TYPES.map((t) => ({ label: t, value: t })),
      value: c.org_type || '', placeholder: 'Select org type…', ariaLabel: 'Org type',
      onChange: (v) => { document.getElementById('contactOrgTypeValue').value = v; },
    });
    document.getElementById('contactFormCancelBtn').addEventListener('click', closeForm);
    document.getElementById('contactFormSaveBtn').addEventListener('click', saveForm);
    document.getElementById('contactFormOverlay').style.display = 'flex';
  }

  function closeForm() { document.getElementById('contactFormOverlay').style.display = 'none'; }

  function saveForm() {
    const values = {};
    document.querySelectorAll('[data-contact-field]').forEach((el) => { values[el.dataset.contactField] = el.value.trim(); });
    values.org_type = document.getElementById('contactOrgTypeValue').value;
    values.referral_source = document.getElementById('contactReferralFlag').checked;
    values.notes = document.getElementById('contactNotes').value.trim();
    if (!values.first_name || !values.last_name || !values.org_type) {
      toast('First name, last name, and org type are required');
      return;
    }
    if (state.editingId === 'new') {
      values.id = 'ct-' + Math.random().toString(36).slice(2, 9);
      window.CONTACTS = (window.CONTACTS || []).concat([values]);
      toast('Contact created');
    } else {
      const idx = (window.CONTACTS || []).findIndex((x) => x.id === state.editingId);
      if (idx !== -1) window.CONTACTS[idx] = Object.assign({}, window.CONTACTS[idx], values);
      toast('Contact updated');
    }
    closeForm();
    render();
  }

  /* ---------- Delete ---------- */
  function openDeleteConfirm(id) {
    state.deleteId = id;
    const c = (window.CONTACTS || []).find((x) => x.id === id);
    document.getElementById('deleteContactName').textContent = c ? `${c.first_name} ${c.last_name}` : 'this contact';
    document.getElementById('deleteContactOverlay').style.display = 'flex';
  }
  function closeDeleteConfirm() { document.getElementById('deleteContactOverlay').style.display = 'none'; }

  document.addEventListener('DOMContentLoaded', () => {
    Shell.init('contacts');
    document.getElementById('contactsAddNewBtn').addEventListener('click', () => openForm('new'));
    document.getElementById('contactFormCloseBtn').addEventListener('click', closeForm);
    document.getElementById('deleteContactCloseBtn').addEventListener('click', closeDeleteConfirm);
    document.getElementById('deleteContactCancelBtn').addEventListener('click', closeDeleteConfirm);
    document.getElementById('deleteContactConfirmBtn').addEventListener('click', () => {
      window.CONTACTS = (window.CONTACTS || []).filter((x) => x.id !== state.deleteId);
      closeDeleteConfirm();
      toast('Contact deleted');
      render();
    });
    render();
  });
})();
