(function () {
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title') || 'Module';
  const group = params.get('group') || 'SolPA';
  document.title = title + ' — SolPA by EsperHealth';

  const crumbEl = document.getElementById('stubCrumb');
  if (crumbEl) crumbEl.textContent = title;

  document.getElementById('stubBody').innerHTML = `
    <div class="panel stub-card">
      <div class="stub-icon">${ic('clock')}</div>
      <div class="stub-title">${title}</div>
      <div class="stub-crumb">${group}</div>
      <p class="stub-copy">This module is part of the SolPA navigation structure.<br>The screen is not yet built in this prototype.</p>
    </div>`;

  const activeKey = params.get('view') || null;
  Shell.init(activeKey);
  injectIcons(document.getElementById('stubBody'));
})();
