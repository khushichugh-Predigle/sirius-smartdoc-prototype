const fs = require('fs');
let content = fs.readFileSync('js/document-detail.js', 'utf8');

const wireProviderEventsOld = `
  function wireProviderEvents() {
    document.querySelectorAll('[data-provider-toggle]').forEach((head) => {
      head.addEventListener('click', (e) => {
        if (e.target.closest('[data-provider-remove]') || e.target.closest('.provider-drag')) return;
        const p = providerByUid(head.dataset.providerToggle);
        if (!p) return;
        state.collapsed[p.sub._id] = !state.collapsed[p.sub._id];
        renderForm();
      });
    });
`;

const wireProviderEventsNew = `
  function wireProviderEvents() {
    document.querySelectorAll('[data-provider-toggle]').forEach((head) => {
      head.addEventListener('click', (e) => {
        if (e.target.closest('[data-provider-remove]') || e.target.closest('.provider-drag') || e.target.closest('[data-provider-search]')) return;
        const p = providerByUid(head.dataset.providerToggle);
        if (!p) return;
        state.collapsed[p.sub._id] = !state.collapsed[p.sub._id];
        renderForm();
      });
    });
    
    document.querySelectorAll('.provider-match-change-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        state.providerMatchListExpanded = true;
        renderForm();
      });
    });
    
    document.querySelectorAll('.provider-match-radios input').forEach(r => {
      r.addEventListener('change', (e) => {
        state.providerMatchSelectedId = e.target.dataset.id;
        state.providerMatchListExpanded = false;
        selectProviderMatch(state.providerMatchSelectedId);
      });
    });
    
    document.querySelectorAll('[data-provider-search]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (btn.disabled) return;
        openProviderSearch();
      });
    });
`;

content = content.replace(wireProviderEventsOld.trim(), wireProviderEventsNew.trim());
fs.writeFileSync('js/document-detail.js', content);
