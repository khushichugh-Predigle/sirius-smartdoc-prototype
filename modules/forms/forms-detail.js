/* Form Detail — ported from v64's fbRenderDetail()/fbVersionsBody()/fbCfgHTML() (sirius_clearance_
 * specialist_v64.html, ~line 7460 onward, the "2 · FORM DETAIL" section): a versions table on the
 * left, a configuration rail (accordions) on the right. Reached from forms.html's row/card "Open".
 *
 * Scoped down from v64, matching forms.js's file-header note and this repo's existing convention of
 * leaving deep sub-features out (see document-detail's CLAUDE.md "Deliberately left out" list):
 *   - No drag-and-drop builder (v64's "3 · BUILDER", ~900 lines of its own). A version's "View
 *     outline" opens a read-only modal listing its sections and field counts instead of "Edit".
 *   - No live form preview/runtime (v64's "4 · PREVIEW" — device frame, trace panel, validation).
 *   - Configuration rail only surfaces what data/forms-data.js actually carries: Details, Section
 *     navigation (layout), Languages, Permissions. v64's "Form buttons" (CTAs) and "Form-level
 *     rules" accordions are omitted rather than invented, since the trimmed data has no ctas/
 *     formRules arrays to back them (see forms-data.js's file header for what was trimmed and why).
 *
 * FD/fdVersionsBody/fdCfgHTML below are a direct, renamed port of v64's FB(.tab/.cfg)/fbVersionsBody/
 * fbCfgHTML/fbFormRulesHTML-shaped code for the pieces that made the cut. */

const FD_LOCALES = [
  { code: 'en', label: 'English' }, { code: 'es', label: 'Spanish' }, { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' }, { code: 'pt', label: 'Portuguese' }
];
const FD_LAYOUTS = [
  { v: 'scroll', label: 'Single scroll', mini: 'scroll' }, { v: 'side', label: 'Side navigation', mini: 'side' },
  { v: 'tabs', label: 'Top tabs', mini: 'tabs' }, { v: 'wizard', label: 'Step wizard', mini: 'wiz' }
];

const FD = {
  formId: new URLSearchParams(location.search).get('id'),
  locale: 'en',
  vSortCol: 'v', vSortAsc: false, vPage: 1, vPageSize: 15,
  cfg: { details: true, nav: false, langs: false, perms: false }
};
const fdForm = () => (window.FORMS_DATA || []).find((f) => f.formId === FD.formId) || null;
const fdT = (o) => { if (o == null) return ''; if (typeof o === 'string') return o; return o[FD.locale] || o.en || ''; };
const fdPub = (f) => f.versions.find((v) => v.status === 'published') || null;
const fdSorted = (f) => [...f.versions].sort((a, b) => b.v - a.v);
const fdNextV = (f) => Math.max(0, ...f.versions.map((v) => v.v)) + 1;
function fdStatusBdg(st) {
  if (st === 'draft') return '<span class="bdg warn"><span class="d"></span>Draft</span>';
  if (st === 'published') return '<span class="bdg ok"><span class="d"></span>Published</span>';
  return '<span class="bdg gray"><span class="d"></span>Superseded</span>';
}
function fdLangSel(locales) {
  return `<select class="fb-lang" aria-label="Language" onchange="FD.locale=this.value;fdRenderDetail()">
    ${locales.map((c) => `<option value="${c}" ${FD.locale === c ? 'selected' : ''}>${(FD_LOCALES.find((l) => l.code === c) || {}).label || c}</option>`).join('')}</select>`;
}

/* ==========================================================================
   FORM DETAIL — ported from fbRenderDetail()
   ========================================================================== */
function fdRenderDetail() {
  const r = $('fbRoot'); if (!r) return;
  const f = fdForm();
  if (!f) { location.href = 'forms.html'; return; }
  if (!f.locales.includes(FD.locale)) FD.locale = f.locales[0];
  r.innerHTML = `
  <div class="ir-crumb">
    <button class="ir-back-btn" onclick="location.href='forms.html'" title="Back to Forms">&#8592;</button>
    <nav class="ir-bc">
      <a onclick="location.href='forms.html'">Forms</a><span class="sep">›</span>
      <span class="cur">${esc(fdT(f.name))}</span>
    </nav>
    <div style="flex:1"></div>
    ${fdLangSel(f.locales)}
  </div>
  <div class="fb-split">
    <div class="fb-splitmain">
      <div class="toolbar">
        <span style="font-size:11px;font-weight:700;color:var(--t2)">Versions</span>
        <div class="spacer"></div>
        <span class="tb-meta" id="fdVMeta"></span>
        <button class="btn primary" onclick="fdNewDraft()">New draft</button>
      </div>
      <div id="fdVHost" style="flex:1;display:flex;flex-direction:column;min-height:0"></div>
    </div>
    <aside class="fb-cfg" aria-label="Configuration">
      <div class="fb-cfg-h">Configuration</div>
      <div class="fb-cfg-b">${fdCfgHTML(f)}</div>
    </aside>
  </div>`;
  fdVersionsBody();
  injectIcons(r);
}

function fdVSort(col) {
  if (FD.vSortCol === col) FD.vSortAsc = !FD.vSortAsc; else { FD.vSortCol = col; FD.vSortAsc = col !== 'v'; }
  fdVersionsBody();
}
function fdSh(col, label, width) {
  const cur = FD.vSortCol === col;
  return `<th onclick="fdVSort('${col}')" style="cursor:pointer;user-select:none${width ? ';width:' + width : ''}">${label}${cur
    ? ` <span class="arr">${FD.vSortAsc ? '▲' : '▼'}</span>`
    : " <span style='color:var(--t4);font-size:9px'>⇅</span>"}</th>`;
}
function fdSetVPage(p) { FD.vPage = p; fdVersionsBody(); }
function fdSetVPageSize(n) { FD.vPageSize = +n; FD.vPage = 1; fdVersionsBody(); }
function fdVersionsBody() {
  const host = $('fdVHost'), f = fdForm(); if (!host || !f) return;
  const ORDER = { draft: 0, published: 1, superseded: 2 };
  let all = [...f.versions];
  const key = (v) => {
    switch (FD.vSortCol) {
      case 'status': return ORDER[v.status];
      case 'at': return v.at;
      case 'by': return v.by.toLowerCase();
      default: return v.v;
    }
  };
  all.sort((a, b) => { const x = key(a), y = key(b); return (x < y ? -1 : x > y ? 1 : 0) * (FD.vSortAsc ? 1 : -1); });

  const meta = $('fdVMeta');
  if (meta) meta.textContent = `${all.length} version${all.length === 1 ? '' : 's'} · sorted ${FD.vSortCol} ${FD.vSortAsc ? '↑' : '↓'}`;

  if (!all.length) {
    host.innerHTML = `<div class="fb-body"><div class="fb-zero">
      <div class="zt">No versions yet</div>
      <div class="zs">Create a draft to start building this form.</div>
      <div class="za"><button class="btn primary" onclick="fdNewDraft()">New draft</button></div>
    </div></div>`;
    injectIcons(host); return;
  }
  const total = all.length, pages = Math.max(1, Math.ceil(total / FD.vPageSize));
  if (FD.vPage > pages) FD.vPage = pages;
  const rows = all.slice((FD.vPage - 1) * FD.vPageSize, FD.vPage * FD.vPageSize);
  host.innerHTML = `
    <div class="gridwrap"><table class="grid">
      <thead><tr>
        ${fdSh('v', 'VERSION', '86px')}
        ${fdSh('status', 'STATUS', '118px')}
        <th>SECTIONS</th>
        <th style="width:190px"></th>
        <th style="width:142px">CREATED ON</th>
        ${fdSh('at', 'UPDATED', '190px')}
      </tr></thead>
      <tbody>${rows.map((v) => { const audit = AuditStamp.stampFor(`${f.formId}|v${v.v}`); return `<tr class="clickable" onclick="fdViewOutline(${v.v})">
        <td class="mono"><b>v${v.v}</b></td>
        <td>${fdStatusBdg(v.status)}</td>
        <td style="color:var(--t3)">${(v.sections || []).length ? (v.sections || []).map((s) => esc(s.title)).join(', ') : '—'}</td>
        <td style="text-align:right;white-space:nowrap" onclick="event.stopPropagation()">
          <button class="btn xs primary" onclick="fdViewOutline(${v.v})">View outline</button>
          <div class="menuwrap" style="display:inline-block;vertical-align:middle">
            <button class="fb-kebab" aria-label="Version actions" onclick="event.stopPropagation();fdMenu(this)">${ic('dots')}</button>
            <div class="menu" role="menu">
              <div class="mi" onclick="fdDupVersion(${v.v})">${ic('copy')} Duplicate as draft</div>
              <div class="mi" style="color:var(--err)" onclick="fdDelVersion(${v.v})">${ic('trash')} Delete version</div>
            </div>
          </div>
        </td>
        <td class="mono" style="color:var(--t3)">${esc(audit.createdOn)}</td>
        <td class="mono" style="color:var(--t3)">${v.at}<span class="sub"> by ${esc(v.by)}</span></td>
        </tr>`; }).join('')}
      </tbody></table></div>
    ${fdPager(total, pages, FD.vPage, FD.vPageSize)}`;
  injectIcons(host);
}
function fdPager(total, pages, page, size) {
  const from = (page - 1) * size + 1, to = Math.min(page * size, total);
  const nums = Array.from({ length: pages }, (_, p) => p + 1)
    .filter((p) => p === 1 || p === pages || Math.abs(p - page) <= 1)
    .reduce((acc, p, i, arr) => { if (i > 0 && p - arr[i - 1] > 1) acc.push('…'); acc.push(p); return acc; }, []);
  return `<div class="pagebar">
    <span>Rows <b>${total ? from : 0}–${to}</b> of <b>${total}</b> versions</span>
    <span style="margin-left:6px">Per page</span>
    <select class="tb-input" style="height:22px;width:58px" onchange="fdSetVPageSize(this.value)">
      ${[10, 15, 25, 50].map((n) => `<option ${n === size ? 'selected' : ''}>${n}</option>`).join('')}</select>
    <div class="spacer"></div>
    <button class="pg" ${page === 1 ? 'disabled' : ''} onclick="fdSetVPage(1)">«</button>
    <button class="pg" ${page === 1 ? 'disabled' : ''} onclick="fdSetVPage(${page - 1})">‹ Prev</button>
    ${nums.map((p) => p === '…' ? `<span style="padding:0 3px">…</span>` : `<button class="pg ${p === page ? 'cur' : ''}" onclick="fdSetVPage(${p})">${p}</button>`).join('')}
    <button class="pg" ${page === pages ? 'disabled' : ''} onclick="fdSetVPage(${page + 1})">Next ›</button>
    <button class="pg" ${page === pages ? 'disabled' : ''} onclick="fdSetVPage(${pages})">»</button>
  </div>`;
}
function fdMenu(btn) {
  const m = btn.parentElement.querySelector('.menu'), open = m.classList.contains('on');
  document.querySelectorAll('#fbRoot .menu.on').forEach((x) => x.classList.remove('on'));
  if (!open) { m.classList.add('on'); injectIcons(m); }
}
document.addEventListener('click', (e) => {
  if (!e.target.closest || !e.target.closest('.menuwrap')) {
    document.querySelectorAll('.menu.on').forEach((x) => x.classList.remove('on'));
  }
});

/* ---- read-only outline modal (stands in for the builder — see file header) --- */
function fdViewOutline(vnum) {
  const f = fdForm(); const v = f.versions.find((x) => x.v === vnum); if (!v) return;
  const secs = v.sections || [];
  openModal(`<div class="m-head">${esc(fdT(f.name))} — v${v.v} outline <button class="x" onclick="closeModal()" aria-label="Close">×</button></div>
  <div class="m-body">
    <div class="fb-hint" style="margin-bottom:10px">Field-level building isn't part of this prototype — this is a read-only outline of the version's sections.</div>
    ${secs.length ? secs.map((s) => `<div class="fb-row" style="margin-bottom:8px">
        <label style="display:flex;justify-content:space-between"><span>${esc(s.title)}</span>
          <span style="color:var(--t4);font-weight:500">${s.fieldCount} field${s.fieldCount === 1 ? '' : 's'}</span></label>
      </div>`).join('') : `<div class="fb-hint">This version has no sections yet.</div>`}
  </div>
  <div class="m-foot"><button class="btn primary" onclick="closeModal()">Close</button></div>`);
}

/* ---- version actions — ported from fbNewDraft/fbDupVersion/fbDelVersion ------- */
function fdNow() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `2026-08-22 ${p(d.getHours())}:${p(d.getMinutes())}`;
}
function fdNewDraft() {
  const f = fdForm(); if (!f) return;
  const src = fdPub(f) || fdSorted(f)[0], nv = fdNextV(f);
  f.versions.push({ v: nv, status: 'draft', by: 'K. Chugh', at: fdNow(), sections: JSON.parse(JSON.stringify((src || {}).sections || [])) });
  toast(`Draft v${nv} created`, true); fdVersionsBody();
}
function fdDupVersion(vnum) {
  const f = fdForm(); const v = f.versions.find((x) => x.v === vnum); if (!v) return;
  const nv = fdNextV(f);
  f.versions.push({ v: nv, status: 'draft', by: 'K. Chugh', at: fdNow(), sections: JSON.parse(JSON.stringify(v.sections || [])) });
  toast(`Duplicated as draft v${nv}`, true); fdVersionsBody();
}
function fdDelVersion(vnum) {
  const f = fdForm(); const v = f.versions.find((x) => x.v === vnum); if (!v) return;
  fdConfirm('Delete this version?',
    `v${vnum} will be permanently deleted. This cannot be undone.`
    + (v.status === 'published' ? `<div class="fb-plain" style="margin-top:9px">v${vnum} is currently published and active. Anything rendering this form will stop working.</div>` : ''),
    'Delete version', 'danger', () => {
      f.versions = f.versions.filter((x) => x.v !== vnum);
      closeModal(); toast('Version deleted', true); fdVersionsBody();
    });
}
function fdConfirm(title, body, cta, kind, fn) {
  window._fdFn = fn;
  openModal(`<div class="m-head">${esc(title)} <button class="x" onclick="closeModal()" aria-label="Close">×</button></div>
  <div class="m-body">${body}</div>
  <div class="m-foot">
    <button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn ${kind === 'danger' ? 'danger' : 'primary'}" onclick="window._fdFn&&window._fdFn()">${esc(cta)}</button>
  </div>`);
}

/* ---- configuration rail — ported from fbCfgHTML (Details/Section nav/Languages/Permissions only,
   see file header for why Form buttons + Form-level rules were left out) ---------------------- */
function fdCfgAcc(key, title, body) {
  const open = FD.cfg[key];
  return `<div class="fb-acc ${open ? '' : 'closed'}">
    <button class="fb-acc-h" aria-expanded="${!!open}" onclick="FD.cfg['${key}']=!FD.cfg['${key}'];fdRenderDetail()">
      ${title}<span class="chev">${ic('chevdn')}</span></button>
    <div class="fb-acc-b">${body}</div></div>`;
}
function fdCfgHTML(f) {
  const caps = [['view', 'View'], ['edit', 'Edit'], ['publish', 'Publish']];
  const roles = window.FORMS_PERM_ROLES || Object.keys(f.perms || {});
  return `
  ${fdCfgAcc('details', 'Form details', `
    <div class="fb-row"><label>Name <span style="color:var(--err)">*</span></label>
      <input type="text" value="${esc(fdT(f.name))}" oninput="fdForm().name[FD.locale]=this.value"></div>
    <div class="fb-row"><label>Description</label>
      <textarea oninput="fdForm().desc[FD.locale]=this.value">${esc(fdT(f.desc))}</textarea></div>
    <div class="fb-2col">
      <div class="fb-row"><label>Owner</label><input type="text" value="${esc(f.owner)}" oninput="fdForm().owner=this.value"></div>
      <div class="fb-row"><label>Form ID</label><input type="text" value="${f.formId}" disabled></div>
    </div>`)}
  ${fdCfgAcc('nav', 'Section navigation', `
    <div class="fb-optcards">${FD_LAYOUTS.map((L) => `
      <button class="fb-optcard ${f.layout === L.v ? 'on' : ''}" onclick="fdForm().layout='${L.v}';fdRenderDetail()" aria-pressed="${f.layout === L.v}">
        <div class="fb-mini ${L.mini}">${L.mini === 'scroll' ? '<i style="width:70%"></i><i style="width:90%"></i><i style="width:50%"></i>' : L.mini === 'wiz' ? '<i></i><i></i><i></i>' : '<i></i><i></i>'}</div>
        <div class="oct">${L.label}</div></button>`).join('')}</div>`)}
  ${fdCfgAcc('langs', 'Languages', `
    <div class="fb-locs">${FD_LOCALES.map((l) => `
      <span class="chip ${f.locales.includes(l.code) ? 'on' : ''}" role="button" tabindex="0"
        onclick="fdToggleLocale('${l.code}')" onkeydown="if(event.key==='Enter')fdToggleLocale('${l.code}')">${l.label}</span>`).join('')}</div>`)}
  ${fdCfgAcc('perms', 'Permissions', `
    <table class="fb-perm">
      <thead><tr><th>Role</th>${caps.map((c) => `<th>${c[1]}</th>`).join('')}</tr></thead>
      <tbody>${roles.map((r) => `<tr><td>${esc(r)}</td>${caps.map((c) => `
        <td><input type="checkbox" ${(f.perms[r] || {})[c[0]] ? 'checked' : ''} aria-label="${esc(r)} can ${c[1].toLowerCase()}"
          onchange="fdForm().perms['${esc(r)}']['${c[0]}']=this.checked?1:0"></td>`).join('')}</tr>`).join('')}
      </tbody></table>`)}`;
}
function fdToggleLocale(code) {
  const f = fdForm(); if (!f) return;
  if (f.locales.includes(code)) {
    if (f.locales.length === 1) { toast('A form needs at least one language'); return; }
    f.locales = f.locales.filter((c) => c !== code);
    if (FD.locale === code) FD.locale = f.locales[0];
  } else {
    f.locales.push(code);
    if (!f.name[code]) f.name[code] = f.name.en;
  }
  fdRenderDetail();
}

document.addEventListener('DOMContentLoaded', () => {
  Shell.init('forms');
  fdRenderDetail();
});
