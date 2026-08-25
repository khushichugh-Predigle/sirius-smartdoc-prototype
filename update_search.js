const fs = require('fs');

let html = fs.readFileSync('document-detail.html', 'utf8');
const searchOverlay = `
<div class="reclassify-overlay" id="providerSearchOverlay" style="display:none">
  <div class="reclassify-modal wide" role="dialog" aria-modal="true" style="max-width:780px">
    <div class="reclassify-head">
      <h3>Find Provider</h3>
      <button type="button" class="reclassify-close" id="providerSearchCloseBtn" aria-label="Close">&times;</button>
    </div>
    <div class="reclassify-body" id="providerSearchBody" style="padding:0"></div>
  </div>
</div>
</body>`;
if (!html.includes('providerSearchOverlay')) {
  html = html.replace('</body>', searchOverlay);
  fs.writeFileSync('document-detail.html', html);
}

let js = fs.readFileSync('js/document-detail.js', 'utf8');
const searchJs = `
  function openProviderSearch() {
    state.providerSearchQuery = '';
    renderProviderSearchModal();
    document.getElementById('providerSearchOverlay').style.display = 'flex';
  }

  function renderProviderSearchModal() {
    const q = (state.providerSearchQuery || '').toLowerCase();
    const filtered = CPR_PRESCRIBERS.filter((r) => {
      if (!q) return true;
      return \`\${r.first_name} \${r.last_name} \${r.specialty} \${r.organization} \${r.npi}\`.toLowerCase().includes(q);
    });
    const body = document.getElementById('providerSearchBody');
    body.innerHTML = \`
      <div style="padding:12px 16px 8px; border-bottom:1px solid #eaecf0">
        <input type="text" id="providerSearchInput" placeholder="Search by name, specialty, organization, NPI…" value="\${escapeHtml(state.providerSearchQuery || '')}" style="width:100%" />
      </div>
      <div style="overflow:auto;max-height:380px">
        <table class="contacts-tbl" style="width:100%">
          <thead><tr>
            <th>Name</th><th>Specialty</th><th>Organization</th><th>NPI</th><th>Address</th><th></th>
          </tr></thead>
          <tbody>
            \${filtered.map((r) => \`
              <tr class="selectable" data-prov-id="\${r.id}">
                <td>\${escapeHtml(r.first_name + ' ' + r.last_name)}\${r.prof_designation ? ' <span style="color:var(--t4);font-size:10px">' + escapeHtml(r.prof_designation) + '</span>' : ''}</td>
                <td>\${escapeHtml(r.specialty)}</td>
                <td>\${escapeHtml(r.organization)}</td>
                <td style="font-family:monospace;font-size:11px">\${escapeHtml(r.npi)}</td>
                <td style="font-size:11px;color:#667085">\${escapeHtml(r.address + ', ' + r.city + ' ' + r.state)}</td>
                <td><button type="button" class="btn xs" data-prov-select="\${r.id}">Select</button></td>
              </tr>\`).join('')}
            <tr class="create-new-row" id="providerSearchCreateNew" style="cursor:pointer">
              <td colspan="6"><span style="color:#059054;font-weight:700">+ Create a new prescriber record</span></td>
            </tr>
          </tbody>
        </table>
      </div>\`;
    document.getElementById('providerSearchInput').addEventListener('input', (e) => {
      state.providerSearchQuery = e.target.value;
      renderProviderSearchModal();
    });
    document.querySelectorAll('[data-prov-select]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectProviderMatch(btn.dataset.provSelect);
        document.getElementById('providerSearchOverlay').style.display = 'none';
      });
    });
    document.querySelectorAll('tr[data-prov-id]').forEach((tr) => {
      tr.addEventListener('click', (e) => {
        if (e.target.closest('[data-prov-select]')) return;
        selectProviderMatch(tr.dataset.provId);
        document.getElementById('providerSearchOverlay').style.display = 'none';
      });
    });
    document.getElementById('providerSearchCreateNew').addEventListener('click', () => {
      selectProviderMatch('new');
      document.getElementById('providerSearchOverlay').style.display = 'none';
    });
  }

  // Hook into wireModals
`;

const jsSplit = js.split('function wireModals() {');
if (jsSplit.length === 2) {
  js = jsSplit[0] + searchJs + 'function wireModals() {\n    document.getElementById(\'providerSearchCloseBtn\').addEventListener(\'click\', () => {\n      document.getElementById(\'providerSearchOverlay\').style.display = \'none\';\n    });\n' + jsSplit[1];
  fs.writeFileSync('js/document-detail.js', js);
}
