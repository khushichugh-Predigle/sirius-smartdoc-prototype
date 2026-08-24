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

  const state = { search: '', orgTypeFilter: '', sortCol: 'name', sortAsc: true, editingId: null, formValues: {}, deleteId: null };

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
    const list = (window.CONTACTS || []).filter((c) => {
      if (state.orgTypeFilter && c.org_type !== state.orgTypeFilter) return false;
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

    document.getElementById('contactsPageBody').innerHTML = `
      <div class="contacts-toolbar">
        <input type="search" id="contactsSearchInput" placeholder="Search contacts by name, organization, email…" value="${esc(state.search)}" />
        <div class="contacts-org-filter" id="contactsOrgFilter"></div>
      </div>
      ${rows.length ? `<div style="overflow-x:auto"><table class="contacts-tbl"><thead><tr>
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
