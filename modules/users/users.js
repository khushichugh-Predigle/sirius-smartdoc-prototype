/* Users & Permissions — ported from sirius_clearance_specialist_v64.html
 * (renderUsers/renderUsersTable ~line 1820, add/edit/delete-user modals ~1877-1928).
 * In-memory only against window.USERS_DATA — no persistence across reload. */

const ROLE_OPTIONS = ['Data Entry Clerk', 'Clearance Specialist', 'IT Admin', 'Super Admin', 'PA Reviewer', 'Billing Specialist'];
const STATUS_COLOR = { Active: 'var(--ok)', Inactive: 'var(--t4)' };

function renderUsers() {
  const body = $('usersBody');
  if (!body) return;
  const activeCount = window.USERS_DATA.filter((u) => u.status === 'Active').length;
  body.innerHTML = `
  <div class="panel" style="margin-top:0">
    <div class="p-t" style="margin-bottom:10px">ALL USERS
      <span style="font-size:10px;color:var(--t4);font-weight:400;margin-left:6px">${window.USERS_DATA.length} total · ${activeCount} active</span>
      <div class="spacer"></div>
      <input class="tb-input" id="userSearch" placeholder="Search name, email, role…" style="width:220px;height:28px" oninput="renderUsersTable()">
    </div>
    <div id="usersTable"></div>
  </div>`;
  renderUsersTable();
}

function renderUsersTable() {
  const q = ($('userSearch') || {}).value || '';
  const ql = q.toLowerCase();
  const rows = window.USERS_DATA.filter(
    (u) => !q || u.name.toLowerCase().includes(ql) || u.email.toLowerCase().includes(ql) || u.role.toLowerCase().includes(ql)
  );
  $('usersTable').innerHTML = `<table class="mini" style="width:100%">
    <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Last Active</th><th>Actions</th><th>Created On</th><th>Updated</th></tr></thead>
    <tbody>${rows
      .map(
        (u) => { const audit = AuditStamp.stampFor(u.id); return `<tr>
      <td class="mono" style="color:var(--t4)">${u.id}</td>
      <td><b>${esc(u.name)}</b></td>
      <td style="color:var(--t3)">${esc(u.email)}</td>
      <td><span class="bdg" style="background:var(--chrome);color:var(--t2)">${esc(u.role)}</span></td>
      <td><span style="display:flex;align-items:center;gap:5px"><span style="width:7px;height:7px;border-radius:50%;background:${STATUS_COLOR[u.status]}"></span>${u.status}</span></td>
      <td style="color:var(--t3);font-size:10.5px">${u.last}</td>
      <td><div style="display:flex;gap:6px">
        <button class="btn xs" onclick='editUserModal(${JSON.stringify(u)})'><span data-ic="settings"></span> Edit</button>
        <button class="btn xs danger" onclick="deleteUserModal('${u.id}','${esc(u.name)}')"><span data-ic="x"></span> Remove</button>
      </div></td>
      <td class="mono" style="color:var(--t3)">${esc(audit.createdOn)}</td>
      <td class="mono" style="color:var(--t3)">${esc(audit.updatedOn)}<span class="sub"> by ${esc(audit.updatedBy)}</span></td>
    </tr>`; }
      )
      .join('')}
    </tbody></table>`;
  injectIcons($('usersTable'));
}

/* ── modal chrome, matching css/v64-components.css's .m-head/.m-foot ── */
function modalShell(title, bodyHtml, footBtns) {
  return `<div class="m-head"><span>${title}</span><button class="x" onclick="closeModal()">✕</button></div>
    <div style="padding:14px 18px">${bodyHtml}</div>
    <div class="m-foot"><button class="btn" onclick="closeModal()">Cancel</button>${footBtns || ''}</div>`;
}

/* ── User CRUD modals ── */
function openAddUserModal() {
  openModal(
    modalShell(
      'Add User',
      `<div class="vfgrid">
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Full Name</label><input class="tb-input" id="muName" placeholder="First Last" style="width:100%"></div>
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Email</label><input class="tb-input" id="muEmail" placeholder="user@esperhealth.com" style="width:100%"></div>
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Role</label><select class="tb-input" id="muRole" style="width:100%">${ROLE_OPTIONS.map((r) => `<option>${r}</option>`).join('')}</select></div>
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Status</label><select class="tb-input" id="muStatus" style="width:100%"><option>Active</option><option>Inactive</option></select></div>
      </div>`,
      `<button class="btn primary" onclick="saveNewUser()"><span data-ic="check"></span> Create User</button>`
    )
  );
}

function saveNewUser() {
  const name = $('muName').value.trim();
  const email = $('muEmail').value.trim();
  const role = $('muRole').value;
  const status = $('muStatus').value;
  if (!name || !email) {
    toast('Name and email required', 1);
    return;
  }
  const newId = 'U' + (window.USERS_DATA.length + 1).toString().padStart(3, '0');
  window.USERS_DATA.push({ id: newId, name, email, role, status, last: 'Just now', depts: [] });
  closeModal();
  renderUsers();
  toast('User ' + name + ' created', 1);
}

function editUserModal(u) {
  openModal(
    modalShell(
      'Edit User — ' + esc(u.name),
      `<div class="vfgrid">
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Full Name</label><input class="tb-input" id="euName" value="${esc(u.name)}" style="width:100%"></div>
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Email</label><input class="tb-input" id="euEmail" value="${esc(u.email)}" style="width:100%"></div>
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Role</label><select class="tb-input" id="euRole" style="width:100%">${ROLE_OPTIONS.map((r) => `<option ${r === u.role ? 'selected' : ''}>${r}</option>`).join('')}</select></div>
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Status</label><select class="tb-input" id="euStatus" style="width:100%"><option ${u.status === 'Active' ? 'selected' : ''}>Active</option><option ${u.status === 'Inactive' ? 'selected' : ''}>Inactive</option></select></div>
      </div>`,
      `<button class="btn primary" onclick="saveEditUser('${u.id}')"><span data-ic="check"></span> Save Changes</button>`
    )
  );
}

function saveEditUser(id) {
  const u = window.USERS_DATA.find((x) => x.id === id);
  if (!u) return;
  u.name = $('euName').value.trim() || u.name;
  u.email = $('euEmail').value.trim() || u.email;
  u.role = $('euRole').value;
  u.status = $('euStatus').value;
  closeModal();
  renderUsers();
  toast('User updated', 1);
}

function deleteUserModal(id, name) {
  openModal(
    modalShell(
      'Remove User',
      `<p style="font-size:12.5px;color:var(--t2)">Remove <b>${esc(name)}</b> from the system? This action cannot be undone.</p>`,
      `<button class="btn danger" onclick="confirmDeleteUser('${id}')"><span data-ic="x"></span> Remove User</button>`
    )
  );
}

function confirmDeleteUser(id) {
  const idx = window.USERS_DATA.findIndex((u) => u.id === id);
  if (idx < 0) return;
  const name = window.USERS_DATA[idx].name;
  window.USERS_DATA.splice(idx, 1);
  closeModal();
  renderUsers();
  toast(name + ' removed', 1);
}

document.addEventListener('DOMContentLoaded', () => {
  Shell.init('users');
  renderUsers();
});
