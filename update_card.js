const fs = require('fs');
let content = fs.readFileSync('js/document-detail.js', 'utf8');

const providerCardOld = `
  function providerCardMarkup(p, index) {
    const collapsed = !!state.collapsed[p.sub._id];
    const badge = PROVIDER_ORIGIN_BADGE[p.origin];
    const cs = getClaimState();
    const locked = cs.isReadOnly && !cs.isGated;
    const body = (p.sub.subsections || []).map((c) => subsectionMarkup(c, 1)).join('');
    // Editing a record that exists in CPR changes it for every patient linked
    // to it — say so rather than letting the edit look patient-local.
    const sharedWarning = p.origin === 'cpr' && p.edited
      ? \`<div class="provider-shared-warning">Editing this prescriber updates the shared record for every patient linked to it.</div>\`
      : '';
    return \`<section class="provider-card\${collapsed ? ' collapsed' : ''}" data-provider-uid="\${p.uid}" draggable="\${locked ? 'false' : 'true'}">
      <div class="provider-card-head" data-provider-toggle="\${p.uid}">
        <span class="provider-drag" title="Drag to reorder" aria-hidden="true"></span>
        <span class="provider-seq">#\${index + 1}</span>
        <span class="provider-card-title">\${escapeHtml(providerName(p))}</span>
        <span class="provider-origin \${badge.cls}">\${badge.text}</span>
        <span class="provider-card-actions">
          \${state.providers.length > 1 ? \`<button type="button" class="provider-remove" data-provider-remove="\${p.uid}" title="Unlink from this patient" \${locked ? 'disabled' : ''}>Unlink</button>\` : ''}
        </span>
        <span class="subsection-chevron"></span>
      </div>
      <div class="provider-card-body">\${sharedWarning}\${body}</div>
    </section>\`;
  }
`.trim();

const providerCardNew = `
  function providerCardMarkup(p, index) {
    const collapsed = !!state.collapsed[p.sub._id];
    const badge = PROVIDER_ORIGIN_BADGE[p.origin];
    const cs = getClaimState();
    const locked = cs.isReadOnly && !cs.isGated;
    const body = (p.sub.subsections || []).map((c) => subsectionMarkup(c, 1)).join('');
    const sharedWarning = p.origin === 'cpr' && p.edited
      ? \`<div class="provider-shared-warning">Editing this prescriber updates the shared record for every patient linked to it.</div>\`
      : '';
      
    let matchHeader = '';
    let matchBody = '';
    let searchBtn = '';
    
    if (index === 0 && p.origin === 'extracted') {
      const cands = providerCandidates();
      const selectedId = state.providerMatchSelectedId;
      const selected = selectedId ? (selectedId === 'new' ? 'new' : CPR_PRESCRIBERS.find((r) => r.id === selectedId)) : null;
      
      if (selected && selected !== 'new') {
        matchHeader = \`<span class="provider-match-subtitle">\${escapeHtml(selected.first_name + ' ' + selected.last_name + ' · ' + selected.specialty + ' · ' + selected.organization)}</span>\`;
      } else if (selected === 'new') {
        matchHeader = \`<span class="provider-match-subtitle" style="color:var(--text-secondary)">New prescriber record</span>\`;
      } else {
        const cLen = cands.length;
        const msg = cLen === 0 ? 'No record found' : (cLen === 1 ? '1 match found — confirm below' : cLen + ' matches found — select one');
        matchHeader = \`<span class="provider-match-subtitle" style="color:var(--brand);font-weight:600">\${msg}</span>\`;
      }

      if (state.providerMatchListExpanded) {
        matchBody = \`
          <div class="provider-match-list">
            <div class="match-radios provider-match-radios">
              \${cands.map(({ rec }) => \`
                <label class="match-radio\${state.providerMatchSelectedId === rec.id ? ' sel' : ''}">
                  <input type="radio" name="providerMatchChoice" \${state.providerMatchSelectedId === rec.id ? 'checked' : ''} data-id="\${rec.id}">
                  <span class="match-radio-main">
                    <span class="match-radio-name">\${escapeHtml(rec.first_name + ' ' + rec.last_name)}</span>
                    <span class="match-radio-meta">\${escapeHtml(rec.specialty)} · NPI \${escapeHtml(rec.npi)} · \${escapeHtml(rec.organization)} · \${escapeHtml(rec.address + ', ' + rec.city + ' ' + rec.state)}</span>
                  </span>
                  \${providerAlreadyLinked(rec.id) ? '<span class="match-status-badge match-status-pending">On this patient</span>' : '<span class="match-status-badge match-status-active">On record</span>'}
                </label>\`).join('')}
              <label class="match-radio create-new\${state.providerMatchSelectedId === 'new' ? ' sel' : ''}">
                <input type="radio" name="providerMatchChoice" \${state.providerMatchSelectedId === 'new' ? 'checked' : ''} data-id="new">
                <span class="match-radio-main">
                  <span class="match-radio-name">+ Create a new prescriber record</span>
                </span>
              </label>
            </div>
          </div>\`;
      } else {
        matchBody = \`<div style="padding: 12px 16px; border-bottom: 1px solid #eaecf0; font-size: 13px;"><a href="#" class="provider-match-change-btn">Change match</a></div>\`;
      }

      searchBtn = \`<button type="button" class="provider-search-btn" data-provider-search="\${p.uid}" title="Search provider directory" \${locked ? 'disabled' : ''}>
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M17 17l-3.2-3.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>\`;
    }

    return \`<section class="provider-card\${collapsed ? ' collapsed' : ''}" data-provider-uid="\${p.uid}" draggable="\${locked ? 'false' : 'true'}">
      <div class="provider-card-head" data-provider-toggle="\${p.uid}">
        <span class="provider-drag" title="Drag to reorder" aria-hidden="true"></span>
        <span class="provider-seq">#\${index + 1}</span>
        <div style="display:flex; flex-direction:column; margin-right:auto; gap:2px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="provider-card-title">\${escapeHtml(providerName(p))}</span>
            <span class="provider-origin \${badge.cls}">\${badge.text}</span>
          </div>
          \${matchHeader}
        </div>
        <span class="provider-card-actions">
          \${searchBtn}
          \${state.providers.length > 1 ? \`<button type="button" class="provider-remove" data-provider-remove="\${p.uid}" title="Unlink from this patient" \${locked ? 'disabled' : ''}>Unlink</button>\` : ''}
        </span>
        <span class="subsection-chevron"></span>
      </div>
      <div class="provider-card-body">\${matchBody}\${sharedWarning}\${body}</div>
    </section>\`;
  }
`.trim();

// Wait, I should just use regex to replace it or indexOf.
const startIdx = content.indexOf('function providerCardMarkup(p, index) {');
const endStr = '</section>`;\n  }';
const endIdx = content.indexOf(endStr, startIdx) + endStr.length;

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + providerCardNew + content.substring(endIdx);
} else {
  console.log("Could not find providerCardMarkup");
}

fs.writeFileSync('js/document-detail.js', content);
