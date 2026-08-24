/* Screen A — Document Intake list.
 * Simplified re-implementation of esp-intake/pages/intake-requests +
 * shared/layouts/dynamic-table, driven entirely by the static
 * window.DUMMY_DOCUMENTS array (no backend calls, no persistence beyond
 * this page load). */
(function () {
  const ICON_CLAIM = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>';

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

  const state = {
    searchQuery: '',
    activeFilterKey: 'ref',
    selectedOtherTypes: [],
    filterPanelOpen: false,
    patientName: '',
    selectedStatuses: [],
    documentAge: '',
    documentAgeCustomStart: '',
    documentAgeCustomEnd: '',
    pageIndex: 0,
    pageSize: 25,
  };

  function toTitleCase(v) {
    return String(v || '').replace(/[_-]+/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function patientName(doc) {
    const p = doc.extracted_data[0].patient_information;
    const first = (p.patient_first_name && p.patient_first_name.value) || '';
    const last = (p.patient_last_name && p.patient_last_name.value) || '';
    return `${first} ${last}`.trim();
  }

  function formatReceived(ts) {
    if (!ts) return '-';
    const d = new Date(ts);
    if (isNaN(d.getTime())) return '-';
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();
    let h = d.getHours();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const hh = String(h).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    return `${mm}-${dd}-${yyyy} ${hh}:${min} ${ampm}`;
  }

  function typeBadge(type) {
    const v = type.toLowerCase();
    if (v.includes('unclassified')) return 'warn';
    if (v.includes('order')) return 'purp';
    return 'gray';
  }

  function statusBadge(status) {
    const v = status.toLowerCase();
    if (v.includes('review in progress')) return 'info';
    if (v.includes('in review')) return 'info';
    if (v.includes('complete') || v.includes('reviewed')) return 'ok';
    if (v.includes('duplicate') || v.includes('ignored') || v.includes('error') || v.includes('rejected')) return 'err';
    if (v.includes('processing')) return 'gray';
    return 'warn';
  }

  function isMuted(status) {
    const v = status.toLowerCase();
    return v.includes('duplicate') || v.includes('dup') || v.includes('ignored');
  }

  function mapRow(doc) {
    const eff = Claims.effective(doc);
    const status = toTitleCase(eff.status);
    const type = doc.document_type || '-';
    return {
      raw: doc,
      id: doc._id,
      document: doc.file.original_file_name,
      patient: patientName(doc),
      type,
      status,
      receivedTs: doc.audit_data.create_ts,
      createdOn: formatReceived(doc.audit_data.create_ts),
      updatedOn: formatReceived(doc.audit_data.update_ts),
      updatedBy: AuditStamp.stampFor(doc._id).updatedBy,
      statusBadgeClass: statusBadge(status),
      typeBadgeClass: typeBadge(type),
      muted: isMuted(status),
      disabled: eff.status === 'processing',
      claimedBy: eff.claimedBy,
    };
  }

  let ALL_ROWS = [];
  let otherTypeSelect, statusSelect, ageSelect, pageSizeSelect;

  function computeFacets() {
    const activeRows = ALL_ROWS.filter((r) => !r.muted);
    const all = activeRows.length;
    const ref = activeRows.filter((r) => r.type === 'Referral').length;

    const otherTypeCounts = {};
    activeRows.forEach((r) => { if (r.type !== 'Referral') otherTypeCounts[r.type] = (otherTypeCounts[r.type] || 0) + 1; });

    const statusCounts = {};
    ALL_ROWS.forEach((r) => { statusCounts[r.status] = (statusCounts[r.status] || 0) + 1; });

    const now = Date.now();
    const dayMs = 86400000;
    let day = 0, week = 0, month = 0;
    ALL_ROWS.forEach((r) => {
      const t = new Date(r.receivedTs).getTime();
      if (isNaN(t)) return;
      const age = now - t;
      if (age <= dayMs) day++;
      if (age <= 7 * dayMs) week++;
      if (age <= 30 * dayMs) month++;
    });

    return { all, ref, otherTypeCounts, statusCounts, ageCounts: { day, week, month } };
  }

  function withinAgeWindow(row, facets) {
    if (!state.documentAge) return true;
    const t = new Date(row.receivedTs).getTime();
    if (isNaN(t)) return false;
    const now = Date.now();
    const dayMs = 86400000;
    if (state.documentAge === 'custom') {
      const start = state.documentAgeCustomStart ? new Date(state.documentAgeCustomStart + 'T00:00:00').getTime() : -Infinity;
      const end = state.documentAgeCustomEnd ? new Date(state.documentAgeCustomEnd + 'T23:59:59').getTime() : Infinity;
      return t >= start && t <= end;
    }
    const windows = { day: dayMs, week: 7 * dayMs, month: 30 * dayMs };
    const w = windows[state.documentAge];
    return w ? now - t <= w : true;
  }

  function filteredRows() {
    let rows = ALL_ROWS.slice();

    const q = state.searchQuery.trim().toLowerCase();
    if (q) {
      rows = rows.filter((r) =>
        r.document.toLowerCase().includes(q) ||
        r.patient.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q));
    }

    if (state.selectedOtherTypes.length) {
      rows = rows.filter((r) => state.selectedOtherTypes.includes(r.type));
    } else if (state.activeFilterKey === 'ref') {
      rows = rows.filter((r) => r.type === 'Referral' && !r.muted);
    }

    if (state.patientName.trim()) {
      const pn = state.patientName.trim().toLowerCase();
      rows = rows.filter((r) => r.patient.toLowerCase().includes(pn));
    }

    if (state.selectedStatuses.length) {
      rows = rows.filter((r) => state.selectedStatuses.includes(r.status));
    }

    const facets = computeFacets();
    rows = rows.filter((r) => withinAgeWindow(r, facets));

    return rows;
  }

  function activeAdvancedFilterCount() {
    return [state.patientName, state.selectedStatuses.length ? 'x' : ''].filter(Boolean).length;
  }

  function render() {
    const facets = computeFacets();
    const rows = filteredRows();

    // Chips
    document.getElementById('chipAll').textContent = `All (${facets.all})`;
    document.getElementById('chipAll').classList.toggle('on', state.activeFilterKey !== 'ref' && !state.selectedOtherTypes.length);
    document.getElementById('chipRef').textContent = `Referral (${facets.ref})`;
    document.getElementById('chipRef').classList.toggle('on', state.activeFilterKey === 'ref' && !state.selectedOtherTypes.length);

    // Other-types multiselect
    const otherTypeOptions = DOCUMENT_TYPE_OPTIONS.filter((t) => t !== 'Referral')
      .map((t) => ({ label: `${t} (${facets.otherTypeCounts[t] || 0})`, value: t }));
    otherTypeSelect.setOptions(otherTypeOptions);
    otherTypeSelect.setValues(state.selectedOtherTypes);
    document.getElementById('otherTypeWrap').classList.toggle('active', state.selectedOtherTypes.length > 0);

    // Status multiselect (advanced filter)
    const statusOptions = Object.keys(facets.statusCounts).sort()
      .map((s) => ({ label: `${s} (${facets.statusCounts[s]})`, value: s }));
    statusSelect.setOptions(statusOptions);
    statusSelect.setValues(state.selectedStatuses);

    // Document age
    ageSelect.setOptions([
      { label: 'All Time', value: '' },
      { label: `Last Day (${facets.ageCounts.day})`, value: 'day' },
      { label: `Last Week (${facets.ageCounts.week})`, value: 'week' },
      { label: `Last Month (${facets.ageCounts.month})`, value: 'month' },
      { label: 'Custom Time', value: 'custom' },
    ]);
    ageSelect.setValue(state.documentAge);
    document.getElementById('docAgeCustom').style.display = state.documentAge === 'custom' ? 'inline-flex' : 'none';

    document.getElementById('filterPanel').style.display = state.filterPanelOpen ? 'flex' : 'none';
    document.getElementById('filterBtn').classList.toggle('active', state.filterPanelOpen);
    const fcnt = document.getElementById('filterCount');
    const count = activeAdvancedFilterCount();
    fcnt.style.display = count ? 'inline-flex' : 'none';
    fcnt.textContent = count;

    // Pagination
    const totalPages = Math.max(1, Math.ceil(rows.length / state.pageSize));
    state.pageIndex = Math.min(state.pageIndex, totalPages - 1);
    const start = state.pageIndex * state.pageSize;
    const pageRows = rows.slice(start, start + state.pageSize);

    const tbody = document.getElementById('gridBody');
    tbody.innerHTML = '';
    pageRows.forEach((r) => {
      const tr = document.createElement('tr');
      tr.tabIndex = 0;
      if (r.muted) tr.classList.add('muted');
      if (r.disabled) tr.classList.add('disabled-row');
      const actor = Shell.ACTORS[Shell.getActor()];
      const claimIndicator = r.claimedBy
        ? `<span class="doc-claim-indicator" data-tooltip="Claimed by ${r.claimedBy.name === actor.name ? 'you' : escapeHtml(r.claimedBy.name)}">${ICON_CLAIM}<span class="doc-claim-dot"></span></span>`
        : '';
      tr.innerHTML = `
        <td><span class="doc-cell"><span class="doc-cell-text">${escapeHtml(r.document)}</span>${claimIndicator}</span></td>
        <td>${escapeHtml(r.patient || '-')}</td>
        <td>${escapeHtml(r.type)}</td>
        <td><span class="bdg ${r.statusBadgeClass}">${escapeHtml(r.status)}</span></td>
        <td>${escapeHtml(r.createdOn)}</td>
        <td>${escapeHtml(r.updatedOn)}<span class="sub"> by ${escapeHtml(r.updatedBy)}</span></td>
      `;
      const go = () => { if (!r.disabled) window.location.href = 'document-detail.html?id=' + encodeURIComponent(r.id); };
      tr.addEventListener('click', go);
      tr.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
      tbody.appendChild(tr);
    });
    initFixedTooltips(tbody);

    document.getElementById('gridEmpty').style.display = pageRows.length ? 'none' : 'flex';
    document.getElementById('gridTable').style.display = pageRows.length ? 'table' : 'none';

    document.getElementById('metaText').textContent =
      `${pageRows.length} of ${rows.length} documents · sorted default ↑`;
    const toRow = rows.length ? `${start + 1}–${Math.min(start + pageRows.length, rows.length)}` : '0';
    document.getElementById('rowsLabel').textContent = `Rows ${toRow} of ${rows.length}`;

    renderPager(totalPages);
  }

  function renderPager(totalPages) {
    const wrap = document.getElementById('pagerNumbers');
    wrap.innerHTML = '';
    const cur = state.pageIndex + 1;
    const pages = [];
    const span = 2;
    for (let p = Math.max(1, cur - span); p <= Math.min(totalPages, cur + span); p++) pages.push(p);
    pages.forEach((p) => {
      const btn = document.createElement('button');
      btn.className = 'pg' + (p === cur ? ' cur' : '');
      btn.type = 'button';
      btn.textContent = p;
      btn.addEventListener('click', () => { state.pageIndex = p - 1; render(); });
      wrap.appendChild(btn);
    });
    document.getElementById('pgFirst').disabled = state.pageIndex === 0;
    document.getElementById('pgPrev').disabled = state.pageIndex === 0;
    document.getElementById('pgNext').disabled = cur >= totalPages;
    document.getElementById('pgLast').disabled = cur >= totalPages;
    document.getElementById('pgFirst').onclick = () => { state.pageIndex = 0; render(); };
    document.getElementById('pgPrev').onclick = () => { state.pageIndex--; render(); };
    document.getElementById('pgNext').onclick = () => { state.pageIndex++; render(); };
    document.getElementById('pgLast').onclick = () => { state.pageIndex = totalPages - 1; render(); };
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function init() {
    ALL_ROWS = window.DUMMY_DOCUMENTS.map(mapRow);

    document.getElementById('searchInput').addEventListener('input', (e) => {
      state.searchQuery = e.target.value; state.pageIndex = 0; render();
    });
    document.getElementById('chipAll').addEventListener('click', () => {
      state.activeFilterKey = ''; state.selectedOtherTypes = []; state.pageIndex = 0; render();
    });
    document.getElementById('chipRef').addEventListener('click', () => {
      state.activeFilterKey = 'ref'; state.selectedOtherTypes = []; state.pageIndex = 0; render();
    });
    document.getElementById('filterBtn').addEventListener('click', () => {
      state.filterPanelOpen = !state.filterPanelOpen; render();
    });
    document.getElementById('resetBtn').addEventListener('click', () => {
      state.searchQuery = ''; state.activeFilterKey = ''; state.selectedOtherTypes = [];
      state.patientName = ''; state.selectedStatuses = []; state.documentAge = '';
      state.documentAgeCustomStart = ''; state.documentAgeCustomEnd = ''; state.pageIndex = 0;
      document.getElementById('searchInput').value = '';
      document.getElementById('patientFilterInput').value = '';
      render();
    });
    document.getElementById('refreshBtn').addEventListener('click', () => { toast('Queue refreshed (simulated)'); render(); });
    document.getElementById('patientFilterInput').addEventListener('input', (e) => {
      state.patientName = e.target.value; state.pageIndex = 0; render();
    });
    document.getElementById('docAgeStart').addEventListener('change', (e) => { state.documentAgeCustomStart = e.target.value; state.pageIndex = 0; render(); });
    document.getElementById('docAgeEnd').addEventListener('change', (e) => { state.documentAgeCustomEnd = e.target.value; state.pageIndex = 0; render(); });

    otherTypeSelect = CustomSelect.mount(document.getElementById('otherTypeSelect'), {
      multiple: true, options: [], values: [], placeholder: 'Other Types (0)', ariaLabel: 'Other document types',
      onChangeMulti: (vals) => { state.selectedOtherTypes = vals; state.activeFilterKey = ''; state.pageIndex = 0; render(); },
    });
    statusSelect = CustomSelect.mount(document.getElementById('statusSelect'), {
      multiple: true, options: [], values: [], placeholder: 'Status: All', ariaLabel: 'Status',
      onChangeMulti: (vals) => { state.selectedStatuses = vals; state.pageIndex = 0; render(); },
    });
    ageSelect = CustomSelect.mount(document.getElementById('ageSelect'), {
      options: [], value: '', placeholder: 'All Time', ariaLabel: 'Document age',
      onChange: (v) => { state.documentAge = v; state.pageIndex = 0; render(); },
    });
    pageSizeSelect = CustomSelect.mount(document.getElementById('pageSizeSelect'), {
      options: [{ label: '25', value: '25' }, { label: '50', value: '50' }, { label: '100', value: '100' }],
      value: '25', ariaLabel: 'Rows per page',
      onChange: (v) => { state.pageSize = Number(v); state.pageIndex = 0; render(); },
    });

    Shell.init('intake');
    render();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
