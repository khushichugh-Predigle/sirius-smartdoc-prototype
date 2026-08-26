/* App shell behavior: active nav highlight, RBAC "Viewing as" role-switcher,
 * toast utility. Shared by every page in this prototype.
 *
 * Roles + nav visibility are ported from v64's actual ROLES/NAV_CFG (search
 * those names in sirius_clearance_specialist_v64.html): clerk & spec both see
 * the full NAV_BLUE list (Dashboard/Document Intake/Case Management/Prior
 * Authorization + the 5 "Center" sub-groups); itadmin sees ONLY Dashboard +
 * NAV_GREEN (Agent Logs/Configurations/Access Control); superadmin sees
 * everything. This prototype keeps a single demo identity (Khushi C.) across
 * roles rather than v64's per-role persona swap (J. Doe/K. Chugh/A. Patel/
 * M. Singh) — only the title + nav visibility change, matching how this
 * prototype's "Viewing as" was scoped from the start.
 *
 * Role selection persists via sessionStorage so it survives navigating
 * between pages (each page is a separate load, unlike v64's single-page app). */
(function () {
  var ROLES = {
    clerk: { title: 'Data Entry Clerk', icon: 'user' },
    spec: { title: 'Clearance Specialist', icon: 'clipcheck' },
    itadmin: { title: 'IT Admin', icon: 'gear' },
    superadmin: { title: 'Super Admin', icon: 'shield' },
    pam: { title: 'Patient Access Manager', icon: 'eye' },
  };
  var NAV_BLUE_VIEWS = ['dashboard', 'intake', 'cases', 'priorauth'];
  var NAV_BLUE_SUBS = ['care', 'pharmacy', 'payer', 'doc', 'policy'];
  var NAV_GREEN_SUBS = ['agentlogs', 'config', 'access'];

  function navVisibility(role) {
    if (role === 'itadmin') return { views: ['dashboard'], subs: NAV_GREEN_SUBS };
    // Patient Access Manager: "same permissions as super admin" per spec — full nav access.
    if (role === 'superadmin' || role === 'pam') return { views: NAV_BLUE_VIEWS, subs: NAV_BLUE_SUBS.concat(NAV_GREEN_SUBS) };
    return { views: NAV_BLUE_VIEWS, subs: NAV_BLUE_SUBS }; // clerk, spec
  }

  /* "Acting as" — a second, independent identity switch scoped to Document
   * Intake claiming only. Lets you claim a document as one clerk, then swap
   * to the other clerk identity to see the claimed-by-another-user read-only
   * state live in the same session, without a real multi-user backend. */
  var ACTORS = {
    khushi: { name: 'Khushi C.', initials: 'KC' },
    ralvarez: { name: 'R. Alvarez', initials: 'RA' },
  };
  function getActor() {
    return sessionStorage.getItem('smartdocs_actor') || 'khushi';
  }
  function setActor(a) {
    if (!ACTORS[a]) return;
    sessionStorage.setItem('smartdocs_actor', a);
    location.reload();
  }

  function getRole() {
    return sessionStorage.getItem('smartdocs_role') || 'spec';
  }

  function applyNavVisibility(role) {
    const vis = navVisibility(role);
    // Only the flat top-level items (direct children of .sidenav) are gated
    // by `views` — items nested inside a collapsible .nav-sub-items group are
    // governed entirely by that group's own visibility/expand state below.
    document.querySelectorAll('.sidenav > .nav-item[data-view]').forEach((el) => {
      el.style.display = vis.views.indexOf(el.dataset.view) === -1 ? 'none' : '';
    });
    document.querySelectorAll('.nav-sub-h[data-sub]').forEach((head) => {
      const key = head.dataset.sub;
      const show = vis.subs.indexOf(key) !== -1;
      head.style.display = show ? '' : 'none';
      const items = document.querySelector('.nav-sub-items[data-sub-items="' + key + '"]');
      if (items) items.style.display = show ? (items.dataset.forceOpen === '1' ? '' : items.style.display) : 'none';
    });
  }

  function initShell(activeKey) {
    if (typeof injectIcons === 'function') injectIcons(document);

    document.querySelectorAll('.nav-item[data-view]').forEach((el) => {
      el.classList.toggle('active', el.dataset.view === activeKey);
    });

    document.querySelectorAll('.nav-sub-h[data-sub]').forEach((head) => {
      const key = head.dataset.sub;
      const items = document.querySelector('.nav-sub-items[data-sub-items="' + key + '"]');
      if (!items) return;
      const hasActive = items.querySelector('.nav-item.active');
      head.classList.toggle('collapsed', !hasActive);
      items.style.display = hasActive ? '' : 'none';
      items.dataset.forceOpen = hasActive ? '1' : '0';
      head.addEventListener('click', () => {
        const collapsed = head.classList.toggle('collapsed');
        items.style.display = collapsed ? 'none' : '';
        items.dataset.forceOpen = collapsed ? '0' : '1';
      });
    });

    applyNavVisibility(getRole());

    const btn = document.getElementById('viewingAsBtn');
    const menu = document.getElementById('viewingAsMenu');
    if (btn && menu) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains('open');
        btn.classList.toggle('open', !isOpen);
        menu.classList.toggle('open', !isOpen);
      });
      menu.querySelectorAll('.viewing-as-item[data-role]').forEach((item) => {
        item.addEventListener('click', () => setRole(item.dataset.role));
      });
      document.addEventListener('click', () => {
        btn.classList.remove('open');
        menu.classList.remove('open');
      });
      syncRoleUI(getRole());
    }

    // No visible "Acting as" control anymore — getActor()/setActor() still
    // back the claim system (see ACTORS above) and remain available from the
    // console for testing multi-actor claim states.
  }

  function syncRoleUI(r) {
    const role = ROLES[r];
    if (!role) return;
    const menu = document.getElementById('viewingAsMenu');
    const txt = document.getElementById('viewingAsText');
    if (txt) txt.textContent = role.title;
    if (menu) {
      menu.querySelectorAll('.viewing-as-item[data-role]').forEach((el) => {
        el.classList.toggle('active', el.dataset.role === r);
      });
    }
    const snRole = document.getElementById('snRole');
    if (snRole) snRole.textContent = role.title + ' · khushichugh08@gmail.com';
  }

  function setRole(r) {
    if (!ROLES[r]) return;
    sessionStorage.setItem('smartdocs_role', r);
    syncRoleUI(r);
    const menu = document.getElementById('viewingAsMenu');
    const btn = document.getElementById('viewingAsBtn');
    if (menu) menu.classList.remove('open');
    if (btn) btn.classList.remove('open');
    applyNavVisibility(r);
    toast('Viewing as ' + ROLES[r].title);
  }

  window.Shell = { init: initShell, getRole: getRole, getActor: getActor, ACTORS: ACTORS };
  window.setRole = setRole;
  window.setActor = setActor;
})();

/* JS-positioned tooltip for elements that sit inside an overflow:hidden
 * ancestor (e.g. a truncated table cell) — the CSS-only [data-tip] pattern
 * gets clipped by the ancestor's overflow, so this appends a position:fixed
 * element to <body> instead, same escape-the-clip approach already used by
 * the NPI/drug lookup popups and the CustomSelect menu. Call after any
 * innerHTML write that adds [data-tooltip] elements. */
function initFixedTooltips(root) {
  (root || document).querySelectorAll('[data-tooltip]').forEach((el) => {
    let tipEl = null;
    el.addEventListener('mouseenter', () => {
      const text = el.getAttribute('data-tooltip');
      if (!text) return;
      tipEl = document.createElement('div');
      tipEl.className = 'fixed-tooltip';
      tipEl.textContent = text;
      document.body.appendChild(tipEl);
      const r = el.getBoundingClientRect();
      const tr = tipEl.getBoundingClientRect();
      let left = r.left + r.width / 2 - tr.width / 2;
      left = Math.max(4, Math.min(left, window.innerWidth - tr.width - 4));
      tipEl.style.left = left + 'px';
      tipEl.style.top = (r.top - tr.height - 6) + 'px';
    });
    el.addEventListener('mouseleave', () => { if (tipEl) { tipEl.remove(); tipEl = null; } });
  });
}

function toast(message) {
  let stack = document.querySelector('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    document.body.appendChild(stack);
  }
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  stack.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .2s ease';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 200);
  }, 2600);
}

/* Horizontal scroll-shadow for .gridwrap (the shared scrollable-table
 * container used by every table in the app — queue, patients, case
 * management, contacts, provider search). A background-gradient painted on
 * .gridwrap itself would be invisible: the table's own opaque cell
 * backgrounds sit on top of it. Instead this toggles .shadow-left/
 * .shadow-right classes that reveal absolutely-positioned overlay shadows
 * (see .gridwrap::before/::after in css/table.css). Runs on every page via
 * this file; a MutationObserver picks up tables that get built later by
 * innerHTML re-renders (e.g. the provider search popup, Contacts), since
 * each re-render replaces the .gridwrap node entirely. */
(function () {
  function updateShadow(el) {
    const scrollable = el.scrollWidth > el.clientWidth + 1;
    el.classList.toggle('shadow-left', scrollable && el.scrollLeft > 1);
    el.classList.toggle('shadow-right', scrollable && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }
  function bind(el) {
    if (el.__gridwrapShadowBound) { updateShadow(el); return; }
    el.__gridwrapShadowBound = true;
    el.addEventListener('scroll', () => updateShadow(el), { passive: true });
    updateShadow(el);
  }
  function scanAll() {
    document.querySelectorAll('.gridwrap').forEach(bind);
  }
  window.addEventListener('resize', scanAll);
  document.addEventListener('DOMContentLoaded', () => {
    scanAll();
    new MutationObserver(scanAll).observe(document.body, { childList: true, subtree: true });
  });
})();
