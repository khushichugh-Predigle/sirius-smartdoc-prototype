/* Contacts — standalone Care Center page. Same data (window.CONTACTS) and the
 * same visual design (contacts-tbl, sorting, sticky columns, add/edit form
 * fields) as the Referral Source picker's "manage" mode embedded inside
 * Document Detail — that embedded flow is the same contact-management
 * micro-screen reused as a popup there; this page is its standalone home. */
(function () {
  const ORG_TYPES = ['Doctor', 'Hospital', 'Ancillary Provider', 'Payer'];
  // Real CPR+ site list (from the actual Site dropdown) — "Do Not Use" sites
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

  // render() replaces the whole list body's innerHTML on every keystroke of
  // the search box, which destroys and recreates the <input> node — losing
  // focus and the caret after every single character typed. Capture focus
  // state on the OLD node before re-rendering and restore it on the NEW one.
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
    const rowsHtml = rows.map((c) => {
      const audit = AuditStamp.stampFor(c.id);
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
            <button type="button" class="danger" data-delete-id="${c.id}" title="Deleting contacts is disabled" aria-label="Delete contact" disabled>${ICON_DELETE}</button>
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
        <button class="btn" type="button" id="contactsFilterResetBtn">Reset</button>
      </div>
      <div class="filter-panel" id="contactsFilterPanel" style="display:${state.filterOpen ? 'flex' : 'none'}">
        <span class="filter-label">Filter by</span>
        <div class="filter-input" id="contactsOrgMultiSelect" style="width:200px"></div>
        <div class="filter-input" id="contactsStateSelect" style="width:110px"></div>
        <button type="button" class="chip${state.referralOnly ? ' on' : ''}" id="contactsReferralOnlyChip">Referral Source only</button>
        <button type="button" class="chip${state.hasEmail ? ' on' : ''}" id="contactsHasEmailChip">Has email</button>
        <button type="button" class="chip${state.hasPhone ? ' on' : ''}" id="contactsHasPhoneChip">Has phone</button>
        <span class="filter-label" style="margin-left:6px">Created</span>
        <div class="date-range-field">
          <input class="doc-age-date" id="contactsCreatedFrom" type="date" aria-label="Created on or after" value="${state.createdFrom}" />
          <span class="doc-age-sep">–</span>
          <input class="doc-age-date" id="contactsCreatedTo" type="date" aria-label="Created on or before" value="${state.createdTo}" />
        </div>
        <span class="filter-label" style="margin-left:6px">Updated</span>
        <div class="date-range-field">
          <input class="doc-age-date" id="contactsUpdatedFrom" type="date" aria-label="Updated on or after" value="${state.updatedFrom}" />
          <span class="doc-age-sep">–</span>
          <input class="doc-age-date" id="contactsUpdatedTo" type="date" aria-label="Updated on or before" value="${state.updatedTo}" />
        </div>
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
    document.getElementById('contactsSearchInput').addEventListener('input', (e) => { state.search = e.target.value; renderPreservingFocus('contactsSearchInput'); });
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

  /* ---------- Add/Edit form ----------
   * Field order/grouping/types mirror the real CPR+ Contact/Notes screen:
   * a single-column stack of label:field rows, with a few compound rows
   * (Name, City/State/ZIP, Office phone+ext+fax, Home phone+ext+fax,
   * Pager/Cell, the 3 checkboxes) grouped side by side, plus Notes as its
   * own panel on the right rather than just another field in the grid. */
  function subfield(label, key, values, opts) {
    opts = opts || {};
    return `<div class="contacts-subfield" style="flex:${opts.flex || 1}">
      <label>${label}${opts.required ? ' <span class="req">*</span>' : ''}</label>
      <input type="${opts.type || 'text'}" data-contact-field="${key}" value="${esc(values[key] || '')}" />
    </div>`;
  }

  function contactFormMarkup(values) {
    return `
      <div class="contacts-form-layout">
        <div class="contacts-form-fields">
          <div class="contacts-compound-row">
            ${subfield('First Name', 'first_name', values, { required: true })}
            ${subfield('Last Name', 'last_name', values, { required: true })}
          </div>
          <div class="reclassify-field"><label>Title</label><input type="text" data-contact-field="title" value="${esc(values.title || '')}" /></div>
          <div class="reclassify-field"><label>Prof Designation</label><input type="text" data-contact-field="professional_designation" value="${esc(values.professional_designation || '')}" /></div>
          <div class="reclassify-field"><label>Organization</label><input type="text" data-contact-field="organization" value="${esc(values.organization || '')}" /></div>
          <div class="reclassify-field"><label>Address</label><input type="text" data-contact-field="address" value="${esc(values.address || '')}" /></div>
          <div class="contacts-compound-row">
            ${subfield('City', 'city', values, { flex: 2 })}
            ${subfield('State', 'state', values, { flex: 1 })}
            ${subfield('ZIP', 'zip', values, { flex: 1 })}
          </div>
          <div class="contacts-compound-row">
            ${subfield('Office', 'office_phone', values, { flex: 2 })}
            ${subfield('Ext', 'office_ext', values, { flex: 1 })}
            ${subfield('Fax', 'office_fax', values, { flex: 2 })}
          </div>
          <div class="contacts-compound-row">
            ${subfield('Home', 'home_phone', values, { flex: 2 })}
            ${subfield('Ext', 'home_ext', values, { flex: 1 })}
            ${subfield('Fax', 'home_fax', values, { flex: 2 })}
          </div>
          <div class="contacts-compound-row">
            ${subfield('Pager', 'pager', values, { flex: 1 })}
            ${subfield('Cell', 'cell', values, { flex: 1 })}
          </div>
          <div class="reclassify-field"><label>Email</label><input type="email" data-contact-field="email" value="${esc(values.email || '')}" /></div>
          <div class="reclassify-field"><label>Site</label><div id="contactSiteSelect"></div></div>
          <div class="reclassify-field"><label>Org Type <span class="req">*</span></label><div id="contactOrgTypeSelect"></div></div>
          <div class="reclassify-field"><label>Associated Org</label><div id="contactAssociatedOrgSelect"></div></div>
          <div class="contacts-compound-row contacts-checkbox-row">
            <label class="contacts-checkbox"><input type="checkbox" id="contactReferralFlag" ${values.referral_source ? 'checked' : ''} /> Referral Source</label>
            <label class="contacts-checkbox"><input type="checkbox" id="contactWebAccessFlag" ${values.allow_web_access ? 'checked' : ''} /> Allow Web Access?</label>
            <label class="contacts-checkbox"><input type="checkbox" id="contactPrimaryFlag" ${values.primary_contact ? 'checked' : ''} /> Primary Contact</label>
          </div>
        </div>
        <div class="contacts-form-notes">
          <label>Notes</label>
          <textarea id="contactNotes" placeholder="Optional note…">${esc(values.notes || '')}</textarea>
        </div>
      </div>
      <input type="hidden" id="contactOrgTypeValue" value="${esc(values.org_type || '')}" />
      <input type="hidden" id="contactAssociatedOrgValue" value="${esc(values.associated_org || '')}" />
      <input type="hidden" id="contactSiteValue" value="${esc(values.site || '')}" />
    `;
  }

  function mountAssociatedOrgSelect(orgType, value) {
    CustomSelect.mount(document.getElementById('contactAssociatedOrgSelect'), {
      options: associatedOrgOptions(orgType).map((o) => ({ label: o, value: o })),
      value: value || '', placeholder: orgType ? 'Select organization…' : 'Select org type first…', ariaLabel: 'Associated org', disabled: !orgType,
      onChange: (v) => { document.getElementById('contactAssociatedOrgValue').value = v; },
    });
  }

  function openForm(id) {
    state.editingId = id;
    state.formValues = {};
    const isNew = id === 'new';
    const c = isNew ? {} : ((window.CONTACTS || []).find((x) => x.id === id) || {});
    document.getElementById('contactFormTitle').textContent = isNew ? 'Add New Contact' : 'Edit Contact';
    document.getElementById('contactFormBody').innerHTML = contactFormMarkup(c);
    document.getElementById('contactFormFoot').innerHTML = `
      <button class="btn" type="button" id="contactFormCancelBtn">Cancel</button>
      <button class="btn primary" type="button" id="contactFormSaveBtn">${isNew ? 'Create' : 'Save changes'}</button>
    `;
    CustomSelect.mount(document.getElementById('contactSiteSelect'), {
      options: SITES.map((s) => ({ label: s, value: s })),
      value: c.site || '', placeholder: '(All Sites)', ariaLabel: 'Site',
      onChange: (v) => { document.getElementById('contactSiteValue').value = v; },
    });
    CustomSelect.mount(document.getElementById('contactOrgTypeSelect'), {
      options: ORG_TYPES.map((t) => ({ label: t, value: t })),
      value: c.org_type || '', placeholder: 'Select org type…', ariaLabel: 'Org type',
      onChange: (v) => {
        document.getElementById('contactOrgTypeValue').value = v;
        document.getElementById('contactAssociatedOrgValue').value = '';
        mountAssociatedOrgSelect(v, '');
      },
    });
    mountAssociatedOrgSelect(c.org_type || '', c.associated_org || '');
    document.getElementById('contactFormCancelBtn').addEventListener('click', closeForm);
    document.getElementById('contactFormSaveBtn').addEventListener('click', saveForm);
    document.getElementById('contactFormOverlay').style.display = 'flex';
  }

  function closeForm() { document.getElementById('contactFormOverlay').style.display = 'none'; }

  function saveForm() {
    const values = {};
    document.querySelectorAll('[data-contact-field]').forEach((el) => { values[el.dataset.contactField] = el.value.trim(); });
    values.org_type = document.getElementById('contactOrgTypeValue').value;
    values.associated_org = document.getElementById('contactAssociatedOrgValue').value;
    values.site = document.getElementById('contactSiteValue').value;
    values.referral_source = document.getElementById('contactReferralFlag').checked;
    values.allow_web_access = document.getElementById('contactWebAccessFlag').checked;
    values.primary_contact = document.getElementById('contactPrimaryFlag').checked;
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
