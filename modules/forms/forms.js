/* Forms — Screen ported from v64's renderForms()/fbRenderList() (sirius_clearance_specialist_v64.html,
 * ~line 7145 onward, the "1 · FORMS LIST" section). Faithful port of the list screen: search, the
 * owner/drafts/archived filter panel, sortable columns, grid⇄table toggle, pagination, and the
 * per-row kebab menu (Open / Duplicate / Archive / Delete). "Create form" and each row's "Open"
 * link into forms-detail.html (a lighter port of v64's "2 · FORM DETAIL" screen — versions list +
 * a read-only Details/Permissions config rail). v64's "3 · BUILDER" (the drag-and-drop field canvas,
 * ~900 lines of its own) and "4 · PREVIEW" are NOT ported — see forms-detail.js for what a version's
 * "View outline" shows instead. This mirrors the existing prototype's convention of scoping deep
 * sub-features out (see document-detail's CLAUDE.md "Deliberately left out" list) rather than
 * building a second design tool inside a design tool.
 *
 * State/behavior below (FS, fsFiltered, fsListBody, the menu, fbConfirm-equivalent) is a direct,
 * renamed port of v64's FB/fbFiltered/fbListBody/fbFormMenu/fbConfirm. */

/* icons this screen needs that js/icons.js (shared, do-not-edit) doesn't carry — extended onto
 * the shared IC lookup at runtime, same pattern v64 itself uses (Object.assign(IC,{...}) for its
 * own form-builder-only icons, ~line 6909 of the source file) rather than editing the shared file. */
Object.assign(IC, {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  rows: '<rect x="3" y="4" width="18" height="5" rx="1.5"/><rect x="3" y="13" width="18" height="5" rx="1.5"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M5 16H4a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v1"/>'
});

const FS = {
  view: 'grid',
  q: '',
  filters: { owner: '', drafts: '', archived: 'no' },
  sortCol: 'name', sortAsc: true,
  page: 1, pageSize: 15,
  locale: 'en'
};

const fsT = (o) => { if (o == null) return ''; if (typeof o === 'string') return o; return o[FS.locale] || o.en || ''; };
const fsPub = (f) => f.versions.find((v) => v.status === 'published') || null;
const fsDraftsOf = (f) => f.versions.filter((v) => v.status === 'draft');
const fsSorted = (f) => [...f.versions].sort((a, b) => b.v - a.v);
function fsLastUpd(f) {
  return fsSorted(f).reduce((m, v) => (!m || v.at > m.at ? v : m), null) || { at: '—', by: '—' };
}
function fsStatusBdg(st) {
  if (st === 'draft') return '<span class="bdg warn"><span class="d"></span>Draft</span>';
  if (st === 'published') return '<span class="bdg ok"><span class="d"></span>Published</span>';
  return '<span class="bdg gray"><span class="d"></span>Superseded</span>';
}
function fsLangSel() {
  const locales = [...new Set(FORMS_DATA.flatMap((f) => f.locales))];
  return `<select class="fb-lang" aria-label="Language" onchange="FS.locale=this.value;fsRenderList()">
    ${locales.map((c) => `<option value="${c}" ${FS.locale === c ? 'selected' : ''}>${c === 'en' ? 'English' : c === 'es' ? 'Spanish' : c}</option>`).join('')}</select>`;
}

/* ==========================================================================
   1 · FORMS LIST — ported from fbRenderList()/fbListBody()
   ========================================================================== */
function fsRenderList() {
  const r = $('fbRoot'); if (!r) return;
  r.innerHTML = `
  <div class="pagehead">
    <h1>Forms</h1>
    <div class="spacer"></div>
    ${fsLangSel()}
    <button class="btn primary" onclick="fsCreateFlow()"><span data-ic="plus"></span> Create form</button>
  </div>
  <div class="toolbar">
    <input class="tb-input" id="fsSearch" placeholder="Search forms by name or id…" style="width:210px"
      value="${esc(FS.q)}" oninput="FS.q=this.value;FS.page=1;fsListBody()">
    <button class="filter-btn" id="fsFilterBtn" onclick="fsToggleFilters()">
      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M2 4h12M4 8h8M6 12h4"/></svg>
      Filters<span class="fcnt" id="fsFilterCount" style="display:none">0</span>
    </button>
    <div class="spacer"></div>
    <span class="tb-meta" id="fsMeta"></span>
    <div class="fb-seg" role="group" aria-label="View">
      <button class="fb-icbtn" style="border-radius:6px 0 0 6px" aria-label="Card view" aria-pressed="${FS.view === 'grid'}"
        onclick="FS.view='grid';fsListBody()">${ic('grid')}</button>
      <button class="fb-icbtn" style="border-radius:0 6px 6px 0;margin-left:-1px" aria-label="Table view" aria-pressed="${FS.view === 'table'}"
        onclick="FS.view='table';fsListBody()">${ic('rows')}</button>
    </div>
  </div>
  <div class="filter-panel" id="fsFilterPanel">
    <span style="font-size:10px;font-weight:700;color:var(--t4);letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;flex:none">Filter by</span>
    <select class="tb-input" id="fsfOwner" style="width:160px" onchange="fsSetFilter()">
      <option value="">Owner: All</option>
      ${[...new Set(FORMS_DATA.map((f) => f.owner))].map((o) => `<option ${FS.filters.owner === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}
    </select>
    <select class="tb-input" id="fsfDrafts" style="width:150px" onchange="fsSetFilter()">
      <option value="">Drafts: All</option>
      <option value="yes" ${FS.filters.drafts === 'yes' ? 'selected' : ''}>Has drafts</option>
      <option value="no" ${FS.filters.drafts === 'no' ? 'selected' : ''}>No drafts</option>
    </select>
    <select class="tb-input" id="fsfArch" style="width:160px" onchange="fsSetFilter()">
      <option value="no" ${FS.filters.archived === 'no' ? 'selected' : ''}>Archived: Hidden</option>
      <option value="yes" ${FS.filters.archived === 'yes' ? 'selected' : ''}>Archived: Only</option>
      <option value="all" ${FS.filters.archived === 'all' ? 'selected' : ''}>Archived: Include</option>
    </select>
    <button class="btn xs" onclick="fsClearFilters()">Clear</button>
  </div>
  <div id="fsListHost" style="flex:1;display:flex;flex-direction:column;min-height:0"></div>`;
  fsListBody();
  injectIcons(r);
}
function fsToggleFilters() {
  const p = $('fsFilterPanel'), b = $('fsFilterBtn');
  b.classList.toggle('active', p.classList.toggle('open'));
}
function fsSetFilter() {
  FS.filters.owner = ($('fsfOwner') || {}).value || '';
  FS.filters.drafts = ($('fsfDrafts') || {}).value || '';
  FS.filters.archived = ($('fsfArch') || {}).value || 'no';
  const n = [FS.filters.owner, FS.filters.drafts, FS.filters.archived !== 'no' ? '1' : ''].filter(Boolean).length;
  const badge = $('fsFilterCount'); if (badge) { badge.style.display = n ? 'inline-flex' : 'none'; badge.textContent = n; }
  const btn = $('fsFilterBtn'); if (btn) btn.classList.toggle('active', n > 0);
  FS.page = 1; fsListBody();
}
function fsClearFilters() {
  FS.filters = { owner: '', drafts: '', archived: 'no' };
  ['fsfOwner', 'fsfDrafts'].forEach((id) => { const e = $(id); if (e) e.value = ''; });
  const a = $('fsfArch'); if (a) a.value = 'no';
  fsSetFilter();
}
function fsFiltered() {
  const q = FS.q.toLowerCase(), F = FS.filters;
  let list = FORMS_DATA.filter((f) => {
    if (F.archived === 'no' && f.archived) return false;
    if (F.archived === 'yes' && !f.archived) return false;
    if (F.owner && f.owner !== F.owner) return false;
    if (F.drafts === 'yes' && !fsDraftsOf(f).length) return false;
    if (F.drafts === 'no' && fsDraftsOf(f).length) return false;
    if (!q) return true;
    return f.formId.toLowerCase().includes(q) || f.locales.some((l) => (f.name[l] || '').toLowerCase().includes(q));
  });
  const key = (f) => {
    const p = fsPub(f), u = fsLastUpd(f);
    switch (FS.sortCol) {
      case 'id': return f.formId;
      case 'active': return p ? p.v : -1;
      case 'drafts': return fsDraftsOf(f).length;
      case 'updated': return u.at;
      case 'by': return u.by.toLowerCase();
      default: return fsT(f.name).toLowerCase();
    }
  };
  list.sort((a, b) => { const x = key(a), y = key(b); return (x < y ? -1 : x > y ? 1 : 0) * (FS.sortAsc ? 1 : -1); });
  return list;
}
function fsSort(col) {
  if (FS.sortCol === col) FS.sortAsc = !FS.sortAsc; else { FS.sortCol = col; FS.sortAsc = true; }
  fsListBody();
}
function fsSh(col, label) {
  const cur = FS.sortCol === col;
  return `<th onclick="fsSort('${col}')" style="cursor:pointer;user-select:none">${label}${cur
    ? ` <span class="arr">${FS.sortAsc ? '▲' : '▼'}</span>`
    : " <span style='color:var(--t4);font-size:9px'>⇅</span>"}</th>`;
}
function fsListBody() {
  const host = $('fsListHost'); if (!host) return;
  const all = fsFiltered();
  const meta = $('fsMeta');
  if (meta) meta.textContent = `${all.length} of ${FORMS_DATA.length} forms · sorted ${FS.sortCol} ${FS.sortAsc ? '↑' : '↓'}`;
  const seg = document.querySelector('#fbRoot .toolbar .fb-seg');
  if (seg) seg.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', ['grid', 'table'][i] === FS.view));

  if (!all.length) {
    const active = FS.q || FS.filters.owner || FS.filters.drafts || FS.filters.archived !== 'no';
    host.innerHTML = `<div class="fb-body"><div class="fb-zero">
      <div class="zt">${active ? 'No forms match' : 'No forms yet'}</div>
      <div class="zs">${active ? 'Try a different search term or clear the filters.' : 'Create your first form to get started.'}</div>
      <div class="za">${active
        ? `<button class="btn" onclick="FS.q='';fsClearFilters()">Clear filters</button>`
        : `<button class="btn primary" onclick="fsCreateFlow()">Create form</button>`}</div>
    </div></div>`;
    injectIcons(host); return;
  }
  if (FS.view === 'grid') {
    host.innerHTML = `<div class="fb-body">${fsListCards(all)}</div>`;
    injectIcons(host); return;
  }
  const total = all.length, pages = Math.max(1, Math.ceil(total / FS.pageSize));
  if (FS.page > pages) FS.page = pages;
  const rows = all.slice((FS.page - 1) * FS.pageSize, FS.page * FS.pageSize);
  host.innerHTML = `
    <div class="gridwrap"><table class="grid">
      <thead><tr>
        ${fsSh('name', 'NAME')}
        ${fsSh('id', 'FORM ID')}
        ${fsSh('active', 'ACTIVE VERSION')}
        ${fsSh('drafts', 'DRAFTS')}
        <th style="width:44px"></th>
        <th>CREATED ON</th>
        ${fsSh('updated', 'UPDATED')}
      </tr></thead>
      <tbody>${rows.map((f) => {
        const p = fsPub(f), d = fsDraftsOf(f), u = fsLastUpd(f);
        const audit = AuditStamp.stampFor(f.formId);
        return `<tr class="clickable" onclick="fsOpen('${f.formId}')">
          <td><b>${esc(fsT(f.name))}</b>${f.archived ? ' <span class="bdg gray"><span class="d"></span>Archived</span>' : ''}</td>
          <td class="mono" style="color:var(--t3)">${f.formId}</td>
          <td>${p ? `<span class="fb-vchip">v${p.v}</span>` : '<span class="fb-vchip none">None</span>'}</td>
          <td style="color:var(--t3)">${d.length ? d.map((x) => 'v' + x.v).join(', ') : '—'}</td>
          <td onclick="event.stopPropagation()">${fsFormMenu(f)}</td>
          <td class="mono" style="color:var(--t3)">${esc(audit.createdOn)}</td>
          <td class="mono" style="color:var(--t3)">${u.at}<span class="sub"> by ${esc(u.by)}</span></td>
        </tr>`;
      }).join('')}
      </tbody></table></div>
    ${fsPager(total, pages, FS.page, FS.pageSize)}`;
  injectIcons(host);
}
function fsSetPage(p) { FS.page = p; fsListBody(); }
function fsSetPageSize(n) { FS.pageSize = +n; FS.page = 1; fsListBody(); }
function fsPager(total, pages, page, size) {
  const from = (page - 1) * size + 1, to = Math.min(page * size, total);
  const nums = Array.from({ length: pages }, (_, p) => p + 1)
    .filter((p) => p === 1 || p === pages || Math.abs(p - page) <= 1)
    .reduce((acc, p, i, arr) => { if (i > 0 && p - arr[i - 1] > 1) acc.push('…'); acc.push(p); return acc; }, []);
  return `<div class="pagebar">
    <span>Rows <b>${total ? from : 0}–${to}</b> of <b>${total}</b> forms</span>
    <span style="margin-left:6px">Per page</span>
    <select class="tb-input" style="height:22px;width:58px" onchange="fsSetPageSize(this.value)">
      ${[10, 15, 25, 50].map((n) => `<option ${n === size ? 'selected' : ''}>${n}</option>`).join('')}</select>
    <div class="spacer"></div>
    <button class="pg" ${page === 1 ? 'disabled' : ''} onclick="fsSetPage(1)">«</button>
    <button class="pg" ${page === 1 ? 'disabled' : ''} onclick="fsSetPage(${page - 1})">‹ Prev</button>
    ${nums.map((p) => p === '…' ? `<span style="padding:0 3px">…</span>` : `<button class="pg ${p === page ? 'cur' : ''}" onclick="fsSetPage(${p})">${p}</button>`).join('')}
    <button class="pg" ${page === pages ? 'disabled' : ''} onclick="fsSetPage(${page + 1})">Next ›</button>
    <button class="pg" ${page === pages ? 'disabled' : ''} onclick="fsSetPage(${pages})">»</button>
  </div>`;
}
function fsListCards(list) {
  return `<div class="fb-cards">${list.map((f) => {
    const p = fsPub(f), d = fsDraftsOf(f), u = fsLastUpd(f);
    return `<article class="fb-card ${f.archived ? 'arch' : ''}">
      <div class="ct">
        <div style="flex:1;min-width:0">
          <div class="cnm" tabindex="0" role="link" onclick="fsOpen('${f.formId}')"
            onkeydown="if(event.key==='Enter')fsOpen('${f.formId}')">${esc(fsT(f.name))}</div>
          <div class="cid">${f.formId}</div>
        </div>
        ${fsFormMenu(f)}
      </div>
      <div class="cvers">
        ${p ? `<span class="fb-vchip">Active v${p.v}</span>` : '<span class="fb-vchip none">No active version</span>'}
        ${d.length ? `<span class="bdg warn"><span class="d"></span>${d.length} draft${d.length === 1 ? '' : 's'}</span>` : ''}
        ${f.archived ? '<span class="bdg gray"><span class="d"></span>Archived</span>' : ''}
      </div>
      <div class="cupd">${u.at} · ${esc(u.by)}</div>
    </article>`;
  }).join('')}</div>`;
}
function fsFormMenu(f) {
  return `<div class="menuwrap">
    <button class="fb-kebab" aria-label="Actions for ${esc(fsT(f.name))}" aria-haspopup="menu"
      onclick="event.stopPropagation();fsMenu(this)">${ic('dots')}</button>
    <div class="menu" role="menu">
      <div class="mi" role="menuitem" onclick="fsOpen('${f.formId}')">${ic('folder')} Open</div>
      <div class="mi" role="menuitem" onclick="fsDupForm('${f.formId}')">${ic('copy')} Duplicate</div>
      <div class="mi" role="menuitem" onclick="fsArchive('${f.formId}')">${ic(f.archived ? 'refresh' : 'archive')} ${f.archived ? 'Restore' : 'Archive'}</div>
      <div class="mi" role="menuitem" style="color:var(--err)" onclick="fsDelForm('${f.formId}')">${ic('trash')} Delete</div>
    </div></div>`;
}
function fsMenu(btn) {
  const m = btn.parentElement.querySelector('.menu'), open = m.classList.contains('on');
  document.querySelectorAll('#fbRoot .menu.on').forEach((x) => x.classList.remove('on'));
  if (!open) { m.classList.add('on'); injectIcons(m); }
}
document.addEventListener('click', (e) => {
  if (!e.target.closest || !e.target.closest('.menuwrap')) {
    document.querySelectorAll('.menu.on').forEach((x) => x.classList.remove('on'));
  }
});

/* ---- create-form flow (trimmed — no builder to hand off to, see file header) --- */
function fsCreateFlow() {
  openModal(`<div class="m-head">Create form <button class="x" onclick="closeModal()" aria-label="Close">×</button></div>
  <div class="m-body">
    <div class="fb-row"><label>Form name <span style="color:var(--err)">*</span></label>
      <input type="text" id="fsNewName" placeholder="Untitled form"></div>
    <div class="fb-hint">Starts as a blank draft (v1). Field-level building isn't part of this prototype — see the
    version's "View outline" once created.</div>
  </div>
  <div class="m-foot">
    <button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn primary" onclick="fsDoCreate()">Create draft</button>
  </div>`);
  setTimeout(() => { const e = $('fsNewName'); if (e) e.focus(); }, 50);
}
function fsNow() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `2026-08-21 ${p(d.getHours())}:${p(d.getMinutes())}`;
}
function fsNextId() {
  const nums = FORMS_DATA.map((f) => +f.formId.split('-')[1] || 0);
  return 'FRM-' + (Math.max(0, ...nums) + 1);
}
function fsDoCreate() {
  const nm = (($('fsNewName') || {}).value || '').trim() || 'Untitled form';
  const id = fsNextId();
  FORMS_DATA.unshift({
    formId: id, name: { en: nm, es: nm }, desc: { en: '', es: '' }, layout: 'scroll',
    owner: 'K. Chugh', archived: false, locales: ['en'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [{ v: 1, status: 'draft', by: 'K. Chugh', at: fsNow(), sections: [] }]
  });
  closeModal(); toast('Draft v1 created', true);
  fsOpen(id);
}

/* ---- form-level actions — ported from fbDupForm/fbArchive/fbDelForm ------------ */
function fsOpen(formId) { location.href = 'forms-detail.html?id=' + encodeURIComponent(formId); }
function fsDupForm(formId) {
  const src = FORMS_DATA.find((f) => f.formId === formId); if (!src) return;
  const c = JSON.parse(JSON.stringify(src));
  c.formId = fsNextId();
  c.locales.forEach((l) => { c.name[l] = (src.name[l] || src.name.en) + ' (copy)'; });
  c.archived = false;
  const base = fsPub(src) || src.versions[0] || { sections: [] };
  c.versions = [{ v: 1, status: 'draft', by: 'K. Chugh', at: fsNow(), sections: JSON.parse(JSON.stringify(base.sections || [])) }];
  FORMS_DATA.unshift(c); toast('Form duplicated as draft v1', true); fsListBody();
}
function fsArchive(formId) {
  const f = FORMS_DATA.find((x) => x.formId === formId); if (!f) return;
  if (f.archived) { f.archived = false; toast('Form restored', true); fsListBody(); return; }
  fsConfirm('Archive this form?',
    `"${esc(fsT(f.name))}" will be hidden from the list and cannot be edited. Its published version keeps working, and you can restore the form at any time.`,
    'Archive', 'warn', () => { f.archived = true; closeModal(); toast('Form archived', true); fsListBody(); });
}
function fsDelForm(formId) {
  const f = FORMS_DATA.find((x) => x.formId === formId); if (!f) return;
  const p = fsPub(f);
  fsConfirm('Delete this form?',
    `"${esc(fsT(f.name))}" and all ${f.versions.length} of its versions will be permanently deleted. This cannot be undone.`
    + (p ? `<div class="fb-plain" style="margin-top:9px">v${p.v} is currently published and active. Anything rendering this form will stop working.</div>` : ''),
    'Delete form', 'danger', () => {
      const idx = FORMS_DATA.findIndex((x) => x.formId === formId);
      if (idx > -1) FORMS_DATA.splice(idx, 1);
      closeModal(); toast('Form deleted', true); fsListBody();
    });
}
/* generic confirm modal — ported from fbConfirm */
function fsConfirm(title, body, cta, kind, fn) {
  window._fsFn = fn;
  openModal(`<div class="m-head">${esc(title)} <button class="x" onclick="closeModal()" aria-label="Close">×</button></div>
  <div class="m-body">${body}</div>
  <div class="m-foot">
    <button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn ${kind === 'danger' ? 'danger' : 'primary'}" onclick="window._fsFn&&window._fsFn()">${esc(cta)}</button>
  </div>`);
}

document.addEventListener('DOMContentLoaded', () => {
  Shell.init('forms');
  fsRenderList();
});
