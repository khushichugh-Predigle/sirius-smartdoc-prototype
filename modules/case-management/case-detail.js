/* Case Detail — ported from renderCaseDetail()/renderDetail()/renderTab() and
 * friends in sirius_clearance_specialist_v64.html (search those names there
 * for the original). This is a static design prototype: everything below
 * mutates only the in-memory `window.CASES` record for this page load and
 * resets on reload — no backend, no persistence, matching how
 * js/document-detail.js already works in this repo. Deep sub-flows (editable
 * PA requirement/portal selects, live policy-audit re-runs, packet
 * generation timers, per-criterion reviewer comments) are simplified to
 * read-only renders + toast() feedback, per the module-port convention of
 * prioritizing visual fidelity over deep interactivity.
 */
(function () {
  const params = new URLSearchParams(window.location.search);
  const caseId = params.get('id');

  let tab = 'overview';
  const ovCol = {}; // accordion collapse state, keyed by section id — false = open
  let sideOpen = false; // right "Case summary" drawer — matches v64 default: collapsed until toggled
  let showAllStat = false; // "Case Summary & Status" card's "Show all details" expanded state
  const assessPanelOpen = { summary: true }; // Clinical Review tab accordion panels — only Assessment Summary open by default
  let activePaIdx = {}; // caseId -> index into c.pas for Assessment/Submission

  const TABS = [['overview', 'Overview'], ['pa', 'Assessment'], ['submission', 'Submission'], ['docs', 'Documents']];

  function C() {
    return (window.CASES || []).find((c) => c.id === caseId);
  }

  /* ---------- small shared helpers (ported near-verbatim from v64) ---------- */
  function fld(l, v, conf, warn) {
    const raw = (v || '').toString().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/gi, '').trim();
    const showConf = conf && raw && raw !== '—' && !raw.startsWith('Not set');
    return `<div class="fld ${warn ? 'warnfld' : ''}"><div class="l">${l}${warn ? ' <span class="conf lo">⚠</span>' : ''}</div><div class="v">${v || '—'}${showConf ? ` <span class="conf ${conf >= 85 ? 'hi' : 'lo'}">${conf >= 85 ? '✓' : '⚠'} ${conf}%</span>` : ''}</div></div>`;
  }
  function prioBdg(p) { return `<span class="prio ${(p || '').toLowerCase()}">${p}</span>`; }
  function isClosed(c) { return c.status === 'PA Submitted' || c.status === 'Complete' || c.status === 'Complete — no PA'; }
  function slaCell(c) {
    if (c.status === 'Re-processing') return `<span style="font-size:10px;color:#5B21B6;font-weight:600">AI re-processing</span>`;
    if ((c.status || '').startsWith('Awaiting')) return `<span style="font-size:10px;color:var(--t4)">external — Insights</span>`;
    if (isClosed(c)) return `<span style="font-size:10px;color:var(--t4)">—</span>`;
    const pct = Math.min(100, Math.round((c.ageH / c.slaH) * 100));
    const cls = pct >= 100 ? 'r' : pct >= 70 ? 'a' : 'g';
    const rem = c.slaH - c.ageH;
    const t = rem < 0 ? `${Math.abs(rem).toFixed(0)}h over` : `${rem.toFixed(0)}h left`;
    return `<span class="sla ${cls}"><span class="bar"><i style="width:${pct}%"></i></span><span class="t">${t}</span></span>`;
  }
  function pipCell(c) {
    const closedNoPA = c.status === 'Complete — no PA';
    const awaitBV = c.status === 'Awaiting BV (Insights)';
    const reproc = c.status === 'Re-processing';
    let h = '<span class="pip">';
    for (let i = 1; i <= N_STAGES; i++) {
      let cls = i < c.stage || (i === c.stage && closedNoPA) ? 'done' : i === c.stage ? (c.status === 'Blocked' ? 'blk' : (reproc && i === 1) ? 'proc' : (i === 2 && awaitBV) ? 'wait' : 'act') : '';
      if (i === 3 && closedNoPA) cls = 'skip';
      const tip = STAGES[i - 1] + (i === c.stage ? ' — ' + c.status : i < c.stage ? ' — Complete' : (i === 3 && closedNoPA) ? ' — Not required' : ' — Pending');
      h += `<span class="p ${cls}" data-tip="${tip}">${i < c.stage || (i === c.stage && closedNoPA) ? '✓' : (i === 3 && closedNoPA) ? '–' : i}</span>`;
      if (i < N_STAGES) h += `<span class="ln ${i < c.stage ? 'done' : ''} dashln"></span>`;
    }
    return h + '</span>';
  }
  function caseState(c) {
    const ps = (c.pas || []).filter((p) => p.paRequired !== false);
    if (!ps.length) return 'Open';
    if (ps.every((p) => p.state === 'TBD')) return 'Open';
    if (ps.every((p) => p.state === 'Approved' || p.state === 'Denied' || p.state === 'Submitted')) return 'Completed';
    return 'In Progress';
  }
  function caseStateBdg(c) {
    const s = caseState(c);
    const m = { Open: 'gray', 'In Progress': 'warn', Completed: 'ok' };
    return `<span class="bdg ${m[s]}"><span class="d"></span>${s}</span>`;
  }
  function paViewable(p) { return !!(p && p.paRequired && p.payer !== 'SELF' && p.audit); }
  function activePa(c) {
    const pas = c.pas || [];
    if (!pas.length) return null;
    let i = activePaIdx[c.id];
    if (i === undefined || !paViewable(pas[i])) {
      const found = pas.findIndex(paViewable);
      i = found < 0 ? 0 : found;
      activePaIdx[c.id] = i;
    }
    return pas[i];
  }
  function paStateBdg(s) {
    const m = { TBD: 'gray', 'Not Required': 'gray', 'PA Required': 'warn', 'Ready to Submit': 'warn', Submitted: 'ok', 'Uploaded to Portal': 'warn', Approved: 'ok', Denied: 'err' };
    return `<span class="bdg ${m[s] || 'gray'}"><span class="d"></span>${s || 'TBD'}</span>`;
  }
  function statColor(s) { return { met: 'ok', notmet: 'err', insufficient: 'warn', na: 'gray' }[s] || 'gray'; }

  /* ---------- crumb ---------- */
  function renderCrumb(c) {
    const el = document.getElementById('cdCrumb');
    if (!c) { el.innerHTML = ''; return; }
    el.innerHTML = `<div class="crumb">
      <a class="back-btn" href="case-management.html" aria-label="Back to cases">${ic('chevup', 'transform:rotate(-90deg)')}</a>
      <div class="crumb-line">
        <a class="crumb-link" href="case-management.html">Cases</a>
        <span class="crumb-sep">&#8250;</span>
        <span class="crumb-id">${esc(c.patient)}</span>
      </div>
      <button type="button" class="crumb-refresh-btn" onclick="toast('Refreshed')">${ic('refresh')} Refresh</button>
    </div>`;
    injectIcons(el);
  }

  /* ---------- case banner: avatar/id/name/badges/quick-actions + Patient/
   * Prescriber/Insurance/Case-Status 4-column band — ported from v64's
   * renderBanner() (~line 3037), matching field-for-field. ---------- */
  function initials(name) {
    const p = (name || '').trim().split(/\s+/);
    return ((p[0] ? p[0][0] : '') + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
  }

  function renderBanner(c) {
    const age = (() => {
      const p = (c.dob || '').split('/');
      if (p.length < 3) return '';
      return Math.floor((Date.now() - new Date(+p[2], +p[0] - 1, +p[1])) / 31557600000) + 'y';
    })();
    const paCount = (c.pas || []).filter((p) => p.paRequired && p.payer !== 'SELF').length;
    const extId = c.mrn ? 'CPR-' + c.mrn.replace(/\D/g, '').slice(-5) : '—';
    const quick = `
      <button type="button" class="szbtn" title="Open in CPR+" data-action="toast" data-msg="Opening CPR+ (simulated)">${ic('ext')}</button>
      <button type="button" class="szbtn" title="Open in Insights" data-action="toast" data-msg="Opening Insights (simulated)">${ic('zap')}</button>
      <button type="button" class="szbtn" title="Print facesheet" data-action="toast" data-msg="Facesheet sent to printer">${ic('printer')}</button>
      <button type="button" class="szbtn" title="Fax document" data-action="toast" data-msg="Fax dialog opened (simulated)">${ic('send')}</button>`;
    return `<div class="casebanner on">
      <div class="cb-top">
        <div class="cb-avatar">${esc(initials(c.patient))}</div>
        <span class="cb-id">${esc(c.id)}</span><span class="cb-nm">${esc(c.patient)}</span>
        <span class="cb-sub">Ext. ID: <span class="mono" style="font-weight:600">${esc(extId)}</span></span>
        ${prioBdg(c.prio)} ${caseStateBdg(c)}
        <div class="cb-actions">
          <span class="cb-quick">
            ${quick}
            <div class="tb-sep2"></div>
            <button type="button" class="btn xs" data-action="toast" data-msg="Edit details (simulated)">${ic('edit')} Edit details</button>
            ${c.assigned === '—' ? `<button type="button" class="btn xs" data-action="assign-me">${ic('user')} Assign to me</button>` : ''}
          </span>
          ${c.status !== 'Blocked' && !isClosed(c) ? `<button type="button" class="btn xs danger" data-action="toast" data-msg="Block (simulated)">${ic('block')} Block</button>` : ''}
          <div class="tb-sep2"></div>
          <button type="button" class="szbtn" title="More actions" data-action="toast" data-msg="More actions (simulated)">${ic('dots')}</button>
        </div>
      </div>
      <div class="cb-cols">
        <div class="cb-col">
          <div class="cb-h pt">${ic('user')} Patient Info</div>
          <div class="cb-r"><span class="k">Name</span><span class="v" style="font-weight:600">${esc(c.patient)}</span></div>
          ${c.dob ? `<div class="cb-r"><span class="k">DOB · Sex</span><span class="v">${esc(c.dob)} · ${esc(c.sex)}${age ? ' (' + age + ')' : ''}</span></div>` : ''}
          ${c.mrn ? `<div class="cb-r"><span class="k">MRN</span><span class="v mono">${esc(c.mrn)}</span></div>` : ''}
          ${c.phone ? `<div class="cb-r"><span class="k">Phone</span><span class="v">${esc(c.phone)}</span></div>` : ''}
        </div>
        <div class="cb-col">
          <div class="cb-h pr">${ic('clipcheck')} Prescriber Info</div>
          <div class="cb-r"><span class="k">Prescriber</span><span class="v">${esc(c.rx || '—')}</span></div>
          <div class="cb-r"><span class="k">NPI</span><span class="v mono">${esc(c.npi || '—')}</span></div>
          <div class="cb-r"><span class="k">Clinic</span><span class="v">${esc(c.clinic || '—')}</span></div>
          <div class="cb-r"><span class="k">SPI · DEA</span><span class="v mono">${esc(c.spi || '—')} · ${esc(c.dea || '—')}</span></div>
        </div>
        <div class="cb-col">
          <div class="cb-h in">${ic('file')} Insurance Info</div>
          <div class="cb-r"><span class="k">Payer</span><span class="v"><span class="cb-pill"><span class="pn" style="background:var(--teal)"></span>${esc(c.payer)}</span> <span class="cb-pri">P1</span></span></div>
          <div class="cb-r"><span class="k">Plan</span><span class="v">${esc(c.plan || '—')}</span></div>
          <div class="cb-r"><span class="k">Member</span><span class="v mono">${esc(c.member)} <span class="conf ${c.memberConf >= 85 ? 'hi' : 'lo'}">${c.memberConf >= 85 ? '✓' : '⚠'} ${c.memberConf}%</span></span></div>
        </div>
        <div class="cb-pipe-col">
          <div class="cb-h" style="color:#059054">${ic('clipcheck')} Case Status</div>
          <div style="margin-top:8px">${caseStateBdg(c)}</div>
          <div style="margin-top:6px;font-size:10px;color:var(--t4)">${paCount} prior authorization(s)</div>
        </div>
      </div>
    </div>`;
  }

  /* ---------- tab strip ---------- */
  function renderTabs(c) {
    const hasReqPA = (c.pas || []).some((p) => p.paRequired === true && p.payer !== 'SELF');
    if ((tab === 'pa' || tab === 'submission') && !hasReqPA) tab = 'overview';
    const tabsEl = document.getElementById('dtTabs');
    tabsEl.innerHTML = TABS.map(([k, l]) => {
      let n = '';
      if (k === 'pa' && c.status === 'Returned for Documents') n = `<span class="n warn">!</span>`;
      const locked = (k === 'pa' || k === 'submission') && !hasReqPA;
      if (locked) return `<button type="button" class="dt-tab" disabled style="opacity:.4;cursor:not-allowed" title="Mark a prior authorization as Required in Overview to open this tab">${l}</button>`;
      return `<button type="button" class="dt-tab ${tab === k ? 'on' : ''}" data-tab="${k}">${l}${n}</button>`;
    }).join('') + `<div style="flex:1"></div>` + (tab === 'overview'
      ? `<button type="button" class="dt-side-btn ${sideOpen ? 'active' : ''}" id="cdSideBtn" aria-expanded="${sideOpen ? 'true' : 'false'}">${ic('file')} Case summary</button>`
      : '');
    tabsEl.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => { tab = b.dataset.tab; render(); }));
    const sideBtn = document.getElementById('cdSideBtn');
    if (sideBtn) sideBtn.addEventListener('click', () => { sideOpen = !sideOpen; render(); });
    injectIcons(tabsEl);
  }

  /* ---------- Overview tab ---------- */
  function ovSec(k, title, icon, accent, sub, content) {
    const collapsed = ovCol[k] === undefined ? false : ovCol[k];
    return `<div class="ov-acc" style="border-left:3px solid ${accent}">
      <div class="ov-acc-hd" data-acc="${k}">
        <span class="ov-acc-icon" style="background:${accent}18;color:${accent}">${ic(icon)}</span>
        <span class="ov-acc-title">${title}</span>
        <span class="ov-acc-sub">${sub || ''}</span>
        <span class="ov-acc-chev" style="margin-left:auto;transform:rotate(${collapsed ? '0' : '-180'}deg)">${ic('chevup')}</span>
      </div>
      ${collapsed ? '' : `<div class="ov-acc-body">${content}</div>`}
    </div>`;
  }

  function ovCaseCard(c) {
    const key = `<div class="fgrid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">`
      + fld('CASE ID', `<span class="mono">${c.id}</span>`)
      + fld('CASE STATUS', caseStateBdg(c))
      + fld('ASSIGNED', c.assigned ? esc(c.assigned) : '<i style="color:var(--t4)">Unassigned</i>')
      + fld('PRIORITY', prioBdg(c.prio))
      + fld('SLA', slaCell(c))
      + fld('CASE AGE', c.ageH ? c.ageH + 'h' : '')
      + fld('CLEARANCE STATUS', c.clearance ? `<span style="font-size:10.5px">${esc(c.clearance)}</span>` : '—')
      + `</div>`;
    const rest = showAllStat
      ? `<div class="fgrid" style="grid-template-columns:repeat(auto-fit,minmax(150px,1fr));border-top:1px solid var(--border-lt);margin-top:2px;padding-top:2px">`
        + fld('EXT. CASE ID', `<span class="mono">${c.mrn ? 'CPR-' + c.mrn.replace(/\D/g, '').slice(-5) : '—'}</span>`)
        + fld('MRN', c.mrn ? `<span class="mono">${c.mrn}</span>` : '')
        + fld('RECEIVED', c.received || '')
        + fld('DIAGNOSIS', c.dx || '')
        + fld('DOCS', (c.docs || []).length + ' file' + ((c.docs || []).length !== 1 ? 's' : ''))
        + `</div>`
      : '';
    return `<div class="ov-stat-card">
      <div class="ov-stat-hd">${ic('check')} CASE SUMMARY &amp; STATUS</div>
      <div class="ov-stat-body">${key}${rest}</div>
      <div style="border-top:1px solid var(--border-lt);padding:6px 12px;text-align:center">
        <a style="font-size:10px;font-weight:600;color:var(--teal);cursor:pointer" data-action="toggle-showall">${showAllStat ? 'Hide details ▲' : 'Show all details ▼'}</a>
      </div>
    </div>`;
  }

  function ovActivityCard(c) {
    return `<div class="ov-stat-card" style="display:flex;flex-direction:column;min-height:160px">
      <div class="ov-stat-hd">${ic('clock')} LATEST ACTIVITY</div>
      <div style="flex:1;overflow-y:auto;padding:8px 12px">
        ${[...(c.log || [])].reverse().slice(0, 8).map((l) => `<div class="ckrow" style="align-items:flex-start;padding:5px 0;border-bottom:1px solid var(--border-lt)"><span class="src" style="flex:none;width:68px;color:var(--t4)">${l[0]}</span><span style="flex:1;font-size:11px"><b style="color:var(--t2)">${esc(l[1])}</b><br><span style="color:var(--t3)">${esc(l[2])}</span></span></div>`).join('')}
      </div></div>`;
  }

  function selectDisplay(label, disabled) {
    return `<div class="search-select${disabled ? ' disabled' : ''}"><button type="button" class="search-select-trigger" ${disabled ? 'disabled' : ''} tabindex="-1"><span>${esc(label)}</span><span class="select-chevron" aria-hidden="true"></span></button></div>`;
  }

  function paTable(c) {
    const pas = c.pas || [];
    const rows = pas.map((p, i) => {
      const self = p.payer === 'SELF';
      const view = paViewable(p);
      const reqLabel = self ? 'Self-insured' : p.paRequired === true ? 'PA Required' : p.paRequired === false ? 'Not Required' : '— Select —';
      const portLabel = p.paRequired === true ? (p.portal || '— Select —') : '—';
      const viewBtn = self ? '' : selectDisplay('View', false);
      const audit = AuditStamp.stampFor(`${c.id}|pa|${i}|${p.item}`);
      return `<tr>
        <td><input readonly class="pa-seq" value="${p.seq}"></td>
        <td>${view ? `<span class="pa-item-link" data-open-pa="${i}" style="color:var(--teal);font-weight:600;cursor:pointer">${esc(p.item)}</span>` : `<span class="pa-item-off">${esc(p.item)}</span>`}</td>
        <td>${esc(p.payer || '—')}</td>
        <td>${selectDisplay(reqLabel, true)}</td>
        <td>${selectDisplay(portLabel, true)}</td>
        <td>${paStateBdg(self ? 'Not Required' : p.state)}</td>
        <td><span class="pa-upd-at">${esc(p.updatedAt || '—')}</span></td>
        <td><div class="pa-row-actions"><button type="button" class="pa-save-btn" disabled>Save</button></div></td>
        <td>${viewBtn}</td>
        <td>${esc(audit.createdOn)}</td>
        <td>${esc(audit.updatedOn)}<span class="sub"> by ${esc(audit.updatedBy)}</span></td>
      </tr>`;
    }).join('');
    return `<div class="fset" style="margin:0">
      <div class="fset-t">PRIOR AUTHORIZATIONS (${pas.length})<div class="spacer"></div>
        <button type="button" class="pa-add-btn" data-action="add-pa">${ic('plus')} Add new prior authorization</button></div>
      ${pas.length
        ? `<div class="pa-tbl-scroll" style="overflow-x:auto"><table class="pa-tbl" style="min-width:900px"><thead><tr><th style="width:44px">#</th><th>PA ITEM</th><th>PAYER</th><th>PA REQUIREMENT</th><th>PORTAL</th><th>STATUS</th><th>LAST UPDATED</th><th></th><th></th><th>CREATED ON</th><th>UPDATED</th></tr></thead><tbody>${rows}</tbody></table></div>`
        : `<div style="padding:40px 20px;text-align:center;color:var(--t4);font-size:11.5px">No prior authorizations yet.</div>`}
      </div>`;
  }

  function renderOverview(c) {
    const ageYr = (() => {
      const p = (c.dob || '').split('/');
      if (p.length < 3) return '';
      return Math.floor((Date.now() - new Date(+p[2], +p[0] - 1, +p[1])) / 31557600000) + 'y';
    })();
    const fgridCols = 'style="grid-template-columns:repeat(auto-fit,minmax(190px,1fr))"';
    return `<div class="ov-split${sideOpen ? ' side-open' : ''}">
      <div class="ov-stack">
        ${paTable(c)}
        ${ovActivityCard(c)}
      </div>
      <aside class="ov-side" aria-label="Case summary">
        <div class="ov-side-h">
          <span class="t">Case summary</span>
          <div style="flex:1"></div>
          <button type="button" class="fb-kebab" aria-label="Close case summary" data-action="toggle-side">${ic('x')}</button>
        </div>
        <div class="ov-side-b">
        ${ovCaseCard(c)}
        ${ovSec('patinfo', 'Patient Information', 'user', '#4F46E5', '&middot; Demographics &amp; contact', `<div class="fgrid" ${fgridCols}>
          ${fld('PATIENT ID', `<span class="mono">${c.id}</span>`)}${fld('FIRST NAME', (c.patient || '').split(' ')[0])}${fld('LAST NAME', (c.patient || '').split(' ').slice(1).join(' '))}
          ${fld('DOB', c.dob || '')}${fld('AGE', ageYr)}${fld('GENDER', c.sex || '')}
          ${fld('PHONE', c.phone || '')}${fld('STREET ADDRESS', c.address || '')}${fld('CITY', c.city || '')}
          ${fld('STATE', c.state || '')}${fld('ZIP', c.zip || '')}${fld('COUNTY', c.county || '')}
        </div>`)}
        ${ovSec('drug', 'Drug &amp; Rx Info', 'zap', '#7C3AED', '&middot; Medication &amp; diagnosis', `<div class="fgrid" ${fgridCols}>
          ${fld('DRUG', c.drug ? `<b>${esc(c.drug)}</b>` : '')}${fld('DOSE', c.dose)}${fld('DIAGNOSIS', c.dx)}
          ${fld('J-CODE', c.jcode || '')}
        </div>`)}
        ${ovSec('prescriber', 'Prescriber Info', 'clipcheck', '#1D4ED8', '&middot; Provider details', `<div class="fgrid" ${fgridCols}>
          ${fld('PRESCRIBER', c.rx ? `<b>${esc(c.rx)}</b>` : '')}${fld('NPI', c.npi ? `<span class="mono">${c.npi}</span>` : '')}${fld('CLINIC', c.clinic)}
          ${fld('CLINIC FAX', c.clinicFax)}
        </div>`)}
        ${ovSec('insurance', 'Insurance Info', 'file', '#4F46E5', '&middot; Payer &amp; coverage', `<div class="fgrid" ${fgridCols}>
          ${fld('PAYER', c.payer ? `<b>${esc(c.payer)}</b>` : '')}${fld('PLAN', c.plan)}${fld('MEMBER ID', c.member ? `<span class="mono">${esc(c.member)}</span>` : '', c.memberConf, c.memberConf < 85)}
          ${fld('GROUP #', c.groupNumber || '')}
        </div>`)}
        ${ovSec('clinical', 'Clinical &amp; Dx Info', 'alert', '#D97706', '&middot; Diagnosis &amp; vitals', `<div class="fgrid" ${fgridCols}>
          ${fld('ICD-10', c.dx ? c.dx.split(' ')[0] : '')}${fld('DX DESCRIPTION', c.dxDescription || c.dx)}${fld('MRN', c.mrn || '')}
        </div>`)}
        </div>
      </aside>
    </div>`;
  }

  /* ---------- Assessment (PA) tab ---------- */
  function paEmptyState(c) {
    const pas = c.pas || [];
    let title, msg;
    if (!pas.length) { title = 'Waiting on orders from CPR+'; msg = 'No orders have been received for this case yet. Once CPR+ sends them, the PA Policy Auditor runs automatically.'; }
    else if (pas.every((p) => !p.paRequired || p.payer === 'SELF')) { title = 'No prior authorization required'; msg = 'None of the orders on this case require a prior authorization. Review them on the Overview tab.'; }
    else { title = "Audit hasn't run yet"; msg = 'The PA Policy Auditor runs when a prior authorization is set to Required and documents are attached. Findings will appear here.'; }
    return `<div class="cd-empty">
      ${ic('clipcheck', 'width:52px;height:52px;color:var(--t4)')}
      <div class="t">${title}</div><div class="m">${msg}</div>
    </div>`;
  }

  /* Real app ("Clinical Review" tab) shows a "Dual Policy" audit — a Payer
   * policy block plus a Soleo policy block under A-COMPLETENESS. This
   * prototype's audit data only carries one policy's requirements, so the
   * Soleo block below reuses the same requirement/rationale data reframed as
   * internal-readiness gaps (via a.assessment.ifClosed) rather than a second,
   * independently-audited policy — a simplification, not a second dataset. */
  function ratingChip(rating) {
    const r = (rating || '').toLowerCase();
    if (r.includes('high')) return { cls: 'chip-met', label: 'HIGH' };
    if (r.includes('moderate')) return { cls: 'chip-partial', label: 'MODERATE' };
    return { cls: 'chip-not-met', label: (rating || 'LOW').split(/[–—-]/)[0].trim().toUpperCase() || 'LOW' };
  }

  function assessPanel(id, title, open, bodyHtml, headExtra) {
    return `<section class="panel">
      <button type="button" class="panel-head accordion-head" aria-controls="${id}" aria-expanded="${open ? 'true' : 'false'}" data-panel="${id}">
        <span>${title}${headExtra || ''}</span>
        <span class="accordion-chev" aria-hidden="true">${ic('chevup')}</span>
      </button>
      ${open ? `<div id="${id}" class="summary-body">${bodyHtml}</div>` : ''}
    </section>`;
  }

  function renderAssessment(c) {
    const list = (c.pas || []).filter(paViewable);
    if (!list.length) return paEmptyState(c);
    const pa = activePa(c);
    const a = pa.audit;
    const reqs = a.requirements || [];
    const gaps = reqs.filter((r) => r.status === 'notmet' || r.status === 'insufficient');
    const gapList = gaps.length
      ? `<ul class="summary-gap-list">${gaps.map((r) => `<li><b>Req ${r.n}</b><span class="need-required">REQUIRED</span> ${esc(r.question)}</li>`).join('')}</ul>`
      : '<p class="summary-in-place">All requirements are met.</p>';
    const overallTone = gaps.length ? 'chip-not-met' : 'chip-met';
    const overallLabel = gaps.length ? 'NOT MET' : 'MET';
    const asSub = (a.assessment && a.assessment.asSubmitted) || {};
    const ifClosed = (a.assessment && a.assessment.ifClosed) || {};
    const chip = ratingChip(asSub.rating);

    const picker = list.length > 1
      ? `<div class="search-select" style="width:200px"><button type="button" class="search-select-trigger" id="paPickerBtn" data-action="cycle-pa"><span>${esc(pa.item)}</span><span class="select-chevron" aria-hidden="true"></span></button></div>`
      : `<div class="search-select disabled" style="width:200px"><button type="button" class="search-select-trigger" disabled><span>${esc(pa.item)}</span><span class="select-chevron" aria-hidden="true"></span></button></div>`;

    const summaryBody = `
      <div class="summary-block">
        <div class="summary-label">A - COMPLETENESS</div>
        <div class="summary-policy-block">
          <div class="summary-policy-heading"><span>Payer</span><span class="result-chip compact ${overallTone}">${overallLabel}</span></div>
          <div class="summary-policy-name">${esc(a.policyName || '—')}</div>
          ${gapList}
          ${a.assessment && a.assessment.completeness ? `<p class="summary-in-place">${a.assessment.completeness}</p>` : ''}
        </div>
      </div>
      <div class="summary-label">B - APPROVAL LIKELIHOOD</div>
      <div class="readiness-card">
        <div class="readiness-head-row"><div class="readiness-head">${esc((c.payer || '').toUpperCase())}</div><span class="result-chip ${chip.cls}">${chip.label}</span></div>
        <p>${esc(asSub.rationale || '')}</p>
      </div>
      <div class="summary-label">C - SOLEO READINESS</div>
      ${gapList}
      ${ifClosed.rationale ? `<p class="summary-in-place">${esc(ifClosed.rationale)}</p>` : ''}`;

    const snapshotBody = (a.snapshot || []).length
      ? `<div class="fgrid side-grid">${a.snapshot.map((s) => fld(s.label.toUpperCase(), esc(s.value) + (s.cite ? `<br><span style="color:var(--t4);font-weight:400;font-size:10px">${esc(s.cite)}</span>` : ''))).join('')}</div>`
      : '<p class="summary-in-place">No snapshot captured.</p>';

    const clinicalBody = `<div class="fgrid side-grid">${fld('DIAGNOSIS', c.dx)}${fld('DRUG', c.drug)}${fld('DOSE / REGIMEN', c.dose)}${fld('CLINICAL', c.clinical)}</div>`;

    const policyBasisItems = (a.policyBasis && a.policyBasis.payer) || [];
    const policyBasisBody = policyBasisItems.length
      ? `<ul class="summary-gap-list">${policyBasisItems.map((p) => `<li><b>${esc(p.ref)}</b><br>${esc(p.text)}</li>`).join('')}</ul>`
      : '<p class="summary-in-place">No policy basis captured.</p>';

    const findingsBody = reqs.length
      ? reqs.map((r) => `<div class="req-row"><span class="bdg ${statColor(r.status)}" style="flex:none"><span class="d"></span>${esc(r.verdict || r.status)}</span><span class="txt"><b>${esc(r.question)}</b><br>${esc(r.response || '')}${r.citation ? `<br><span style="color:var(--t4);font-size:10.5px">${esc(r.citeLabel || 'Citation')}: ${esc(r.citation)}</span>` : ''}</span></div>`).join('')
      : '<p class="summary-in-place">No findings captured.</p>';

    return `<div class="assessment-tab">
      <div class="assessment-toolbar">
        <label class="pa-picker-label">PRIOR AUTHORIZATIONS</label>
        ${picker}
      </div>
      <div class="assessment-content"><div class="assessment-scroll">
        <section class="assessment-title-card">
          <h2>Prior Authorization Assessment - Policy - ${esc(pa.item)}</h2>
          <span class="refreshed">Last refreshed ${esc(a.ranAt || '—')}</span>
        </section>
        ${assessPanel('assessment-summary-panel', 'ASSESSMENT SUMMARY', assessPanelOpen.summary, summaryBody)}
        ${assessPanel('case-snapshot-panel', 'CASE SNAPSHOT', assessPanelOpen.snapshot, snapshotBody)}
        ${assessPanel('clinical-summary-panel', 'CLINICAL SUMMARY', assessPanelOpen.clinical, clinicalBody)}
        ${assessPanel('policy-basis-panel', 'POLICY BASIS - Must-Be-Met criteria', assessPanelOpen.basis, policyBasisBody)}
        ${assessPanel('findings-panel', 'ASSESSMENT FINDINGS - ', assessPanelOpen.findings, findingsBody, `<a href="javascript:void(0)" class="policy-link">${esc(a.policyName || '—')}</a>`)}
      </div></div>
      <div class="assessment-actions">
        <button type="button" class="regenerate-btn" data-action="toast" data-msg="Regenerating assessment…">${ic('refresh')} Regenerate</button>
        <button type="button" class="complete-btn" data-action="toast" data-msg="Assessment marked reviewed">${ic('check')} Complete review</button>
      </div>
    </div>`;
  }

  /* ---------- Submission tab ---------- */
  const EVAL_Q = [
    ['buyBill', 'Buy-and-Bill: Purchase In-Office & Bill Medical Benefit?', 'No'],
    ['treated3mo', 'Has the patient received at least 3 months of treatment with the requested drug?', 'No'],
    ['adminByHCP', 'Will the requested drug be administered by a health care provider?', 'Yes'],
    ['facilityOutpatient', 'Is this facility an outpatient hospital setting?', 'No']
  ];

  function renderSubmission(c) {
    const pa = activePa(c);
    if (!pa || !pa.audit) return paEmptyState(c);
    const fn = (c.patient || '').split(' ')[0], ln = (c.patient || '').split(' ').slice(1).join(' ');
    const canUpload = true;
    let act;
    if (pa.state === 'Submitted') {
      act = `<span class="req-done a">${ic('check')} Submitted ${esc(pa.subDate || '')} · Authorization number <b>${esc(pa.paNum || '')}</b></span><div style="flex:1"></div>`;
    } else {
      act = `<span style="font-size:10.5px;color:var(--t4)">Creates the request on ${esc(pa.portal || 'the payer portal')}</span><div style="flex:1"></div>
        <button class="btn" data-action="toast" data-msg="Section saved">Save</button>
        <button class="btn primary" data-action="upload-portal">${ic('send')} Upload to Portal</button>`;
    }
    return `<div class="vsplit" style="height:100%">
      <div class="vrail"><div class="vr-t">Submission — ${esc(pa.portal || '—')}</div>
        <div class="vsec act"><span class="num">1</span><span class="vl"><span class="s1">Section 1</span><br><span class="s2">Basic Information</span></span></div>
        <div class="vsec"><span class="num">2</span><span class="vl"><span class="s1">Section 2</span><br><span class="s2">Evaluation Questions</span></span></div>
        <div class="vrail-div">ATTACHMENTS</div>
        <div class="vsec"><span class="num" style="border:none;background:var(--chrome)">${ic('file')}</span><span class="vl"><span class="s1">Attachment</span><br><span class="s2">PA Packet</span></span></div>
        <div style="flex:1"></div>
        <div style="padding:12px 12px;font-size:10px;color:var(--t4);line-height:1.5">Assessment review complete · upload enabled.</div>
      </div>
      <div class="vmain">
        <div class="vm-h"><h3>Basic Information</h3><span class="sv">${ic('check')} Saved</span></div>
        <div class="vfields">
          <div class="fset" style="margin:0 0 16px"><div class="fset-t">PATIENT INFORMATION</div><div style="padding:12px"><div class="vfgrid">
            ${paFld('First Name', fn)}${paFld('Last Name', ln)}${paFld('Date of Birth', c.dob)}${paFld('Member ID', c.member, c.memberConf)}
          </div></div></div>
          <div class="fset" style="margin:0 0 16px"><div class="fset-t">INSURANCE INFORMATION</div><div style="padding:12px"><div class="vfgrid">
            ${paFld('Payer', c.payer)}${paFld('Plan', c.plan)}${paFld('Group #', c.groupNumber || '—')}
          </div></div></div>
          <div class="fset" style="margin:0 0 16px"><div class="fset-t">PROVIDER INFORMATION</div><div style="padding:12px"><div class="vfgrid">
            ${paFld('Ordering Provider', c.rx)}${paFld('NPI', c.npi)}${paFld('Clinic', c.clinic || '—')}
          </div></div></div>
          <div class="fset" style="margin:0"><div class="fset-t">MEDICATION INFORMATION</div><div style="padding:12px"><div class="vfgrid">
            ${paFld('Drug', pa.item)}${paFld('J-Code', c.jcode || '—')}${paFld('Dose / Regimen', c.dose)}${paFld('Diagnosis (ICD-10)', (c.dx || '').split(' ')[0])}
          </div></div></div>
          <div class="fset" style="margin:16px 0 0"><div class="fset-t">EVALUATION QUESTIONS</div><div style="padding:12px">
            ${EVAL_Q.map((q) => `<div class="subq"><div class="subq-l">${q[1]}</div><div style="display:flex;gap:10px"><button type="button" class="ynbtn ${q[2] === 'Yes' ? 'on' : ''}"><span class="rd"></span>Yes</button><button type="button" class="ynbtn ${q[2] === 'No' ? 'on' : ''}"><span class="rd"></span>No</button></div></div>`).join('')}
            <div style="font-size:10px;color:var(--t4);margin-top:10px">AI-suggested answers · review before submitting.</div>
          </div></div>
        </div>
        <div class="vact">${act}</div>
      </div>
      <div class="cd-preview">
        <div class="cd-preview-h">SOURCE DOCUMENT PREVIEW</div>
        <div class="cd-preview-body"><img src="../../assets/images/document-preview-placeholder.svg" alt="Document preview placeholder"></div>
      </div>
    </div>`;
  }
  function paFld(label, val, conf) {
    const hasVal = (val || '').toString().trim() && val !== '—';
    const low = conf && conf < 85 && hasVal;
    return `<div class="irf ${low ? 'warnfld' : ''}"><div class="lr">${label}</div><input value="${esc(val || '')}"></div>`;
  }

  /* ---------- Documents tab ---------- */
  function renderDocuments(c) {
    const docs = c.docs || [];
    const rows = docs.map((d, i) => {
      const audit = AuditStamp.stampFor(`${c.id}|doc|${i}|${d[0]}`);
      return `<tr>
      <td class="sel"><input type="checkbox" /></td>
      <td style="font-weight:600;color:var(--t1);word-break:break-all">${esc(d[0])}</td>
      <td>${esc(d[1])}</td>
      <td class="mono">${esc(d[2])}</td>
      <td><span class="bdg gray"><span class="d"></span>${esc((d[3] || 'attached').toLowerCase())}</span></td>
      <td style="text-align:right;white-space:nowrap"><button class="btn xs" data-action="toast" data-msg="Opening preview…">${ic('eye')} Preview</button></td>
      <td>${esc(audit.createdOn)}</td>
      <td>${esc(audit.updatedOn)}<span class="sub"> by ${esc(audit.updatedBy)}</span></td>
    </tr>`;
    }).join('');
    return `<div style="padding:12px 14px">
      <div class="fset" style="margin:0"><div class="fset-t">CASE DOCUMENTS (${docs.length})</div>
        <div class="cd-doc-toolbar" style="padding:10px 12px 0">
          <div class="search-wrap">${ic('search')}<input type="search" placeholder="Search documents…" /></div>
          <button class="btn xs" data-action="toast" data-msg="All documents selected">Select all</button>
          <button class="btn xs" data-action="toast" data-msg="Selection cleared">Clear</button>
          <div class="spacer"></div>
          <button class="btn xs" data-action="toast" data-msg="Generating PA packet…">Generate PA Packet</button>
          <button class="btn xs primary" data-action="toast" data-msg="Attach document (simulated)">${ic('clip')} Attach / upload doc</button>
        </div>
        <div style="overflow-x:auto;padding:10px 12px 12px"><table class="cd-doc-tbl"><thead><tr><th class="sel"></th><th>DOCUMENT</th><th style="width:170px">TYPE</th><th style="width:110px">DATE</th><th style="width:120px">STATUS</th><th style="width:120px">ACTIONS</th><th style="width:120px">CREATED ON</th><th style="width:160px">UPDATED</th></tr></thead><tbody>${rows || '<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--t4)">No documents on this case yet.</td></tr>'}</tbody></table></div>
      </div>
    </div>`;
  }

  /* ---------- dispatch + wiring ---------- */
  function renderTab(c) {
    if (tab === 'overview') return renderOverview(c);
    if (tab === 'pa') return renderAssessment(c);
    if (tab === 'submission') return renderSubmission(c);
    if (tab === 'docs') return renderDocuments(c);
    return '';
  }

  function wireBody(c) {
    const body = document.getElementById('dtBody');
    body.querySelectorAll('[data-acc]').forEach((el) => el.addEventListener('click', () => {
      const k = el.dataset.acc; ovCol[k] = ovCol[k] === undefined ? true : !ovCol[k]; render();
    }));
    body.querySelectorAll('[data-action="toggle-side"]').forEach((el) => el.addEventListener('click', () => { sideOpen = !sideOpen; render(); }));
    body.querySelectorAll('[data-action="toggle-showall"]').forEach((el) => el.addEventListener('click', () => { showAllStat = !showAllStat; render(); }));
    body.querySelectorAll('[data-action="go-tab"]').forEach((el) => el.addEventListener('click', () => { tab = el.dataset.val; render(); }));
    body.querySelectorAll('[data-action="toast"]').forEach((el) => el.addEventListener('click', () => toast(el.dataset.msg)));
    body.querySelectorAll('[data-action="unblock"]').forEach((el) => el.addEventListener('click', () => {
      c.status = 'Review In Progress';
      c.log.push([nowStamp(), 'Khushi C.', 'Block resolved — case resumed']);
      toast(c.id + ' unblocked', 1); render();
    }));
    body.querySelectorAll('[data-action="simulate-bv"]').forEach((el) => el.addEventListener('click', () => {
      c.status = 'Review In Progress'; c.stage = 2;
      c.log.push([nowStamp(), 'System', 'BV returned from Insights — PA decision needed']);
      toast('Benefit verification complete', 1); render();
    }));
    body.querySelectorAll('[data-action="pa-decision"]').forEach((el) => el.addEventListener('click', () => {
      const req = el.dataset.val === 'req';
      c.paReq = req;
      (c.pas || []).forEach((p) => { if (p.payer !== 'SELF') p.paRequired = req; });
      c.stage = req ? 3 : c.stage;
      c.status = req ? 'Review In Progress' : 'Complete — no PA';
      c.log.push([nowStamp(), 'Khushi C.', req ? 'PA marked Required' : 'PA marked Not Required']);
      toast('Saved', 1); render();
    }));
    body.querySelectorAll('[data-open-pa]').forEach((el) => el.addEventListener('click', () => {
      activePaIdx[c.id] = +el.dataset.openPa; tab = 'pa'; render();
    }));
    body.querySelectorAll('[data-action="add-pa"]').forEach((el) => el.addEventListener('click', () => toast('Add prior authorization (simulated)')));
    body.querySelectorAll('[data-action="upload-portal"]').forEach((el) => el.addEventListener('click', () => {
      const pa = activePa(c);
      if (pa) { pa.state = 'Submitted'; pa.subDate = nowStamp(); pa.paNum = 'PA-' + Math.floor(10000 + Math.random() * 89999) + '-DEMO'; }
      c.log.push([nowStamp(), 'Khushi C.', 'PA uploaded and submitted (simulated)']);
      toast('Submitted to portal', 1); render();
    }));
    body.querySelectorAll('[data-panel]').forEach((el) => el.addEventListener('click', () => {
      const k = el.dataset.panel.replace('-panel', '').replace('assessment-summary', 'summary').replace('case-snapshot', 'snapshot').replace('clinical-summary', 'clinical').replace('policy-basis', 'basis').replace('findings', 'findings');
      assessPanelOpen[k] = !assessPanelOpen[k]; render();
    }));
    body.querySelectorAll('[data-action="cycle-pa"]').forEach((el) => el.addEventListener('click', () => {
      const list = (c.pas || []).filter(paViewable);
      const cur = (c.pas || []).indexOf(activePa(c));
      const pos = list.findIndex((p) => (c.pas || []).indexOf(p) === cur);
      activePaIdx[c.id] = (c.pas || []).indexOf(list[(pos + 1) % list.length]);
      render();
    }));
  }

  function nowStamp() {
    const d = new Date();
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  function render() {
    const c = C();
    renderCrumb(c);
    if (!c) {
      document.getElementById('cdBanner').innerHTML = '';
      document.getElementById('dtTabs').innerHTML = '';
      document.getElementById('dtBody').innerHTML = `<div class="cd-empty">${ic('folder', 'width:52px;height:52px;color:var(--t4)')}<div class="t">Case not found</div><div class="m">No case matches id "${esc(caseId || '')}". <a href="case-management.html" style="color:var(--teal);font-weight:600">Back to Case Management</a></div></div>`;
      injectIcons(document.getElementById('dtBody'));
      return;
    }
    const bannerEl = document.getElementById('cdBanner');
    bannerEl.innerHTML = renderBanner(c);
    injectIcons(bannerEl);
    bannerEl.querySelectorAll('[data-action="toast"]').forEach((el) => el.addEventListener('click', () => toast(el.dataset.msg)));
    bannerEl.querySelectorAll('[data-action="assign-me"]').forEach((el) => el.addEventListener('click', () => {
      c.assigned = 'K. Chugh';
      c.log.push([nowStamp(), 'K. Chugh', 'Case assigned to self']);
      toast(c.id + ' assigned to you', 1); render();
    }));

    renderTabs(c);
    const body = document.getElementById('dtBody');
    body.innerHTML = renderTab(c);
    body.classList.toggle('flat', tab === 'overview');
    injectIcons(body);
    wireBody(c);
  }

  document.addEventListener('DOMContentLoaded', () => {
    Shell.init('cases');
    render();
  });
})();
