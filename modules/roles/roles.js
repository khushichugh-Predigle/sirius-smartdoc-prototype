/* Roles admin screen — ported from sirius_clearance_specialist_v64.html's
 * renderRoles() (~line 1854) and the Role CRUD modals (openAddRoleModal /
 * editRoleModal / deleteRoleModal / saveNewRole / saveEditRole / confirmDeleteRole,
 * ~lines 1928-1972). Data comes from window.ROLES_DATA (data/roles-data.js).
 * No backend — all edits mutate ROLES_DATA in memory and reset on reload,
 * matching the rest of this prototype. */

function renderRoles() {
  const body = $('rolesBody');
  if (!body) return;
  body.innerHTML = `
  <div class="panel" style="margin-top:0">
    <div class="p-t" style="margin-bottom:10px">ALL ROLES <span style="font-size:10px;color:var(--t4);font-weight:400;margin-left:6px">${ROLES_DATA.length} roles defined</span></div>
    <div style="overflow-x:auto">
    <table class="mini" style="width:100%">
      <thead><tr><th>ID</th><th>Role Name</th><th>Description</th><th>Permissions</th><th>Users</th><th>Actions</th><th>Created On</th><th>Updated</th></tr></thead>
      <tbody>${ROLES_DATA.map(r => { const audit = AuditStamp.stampFor(r.id); return `<tr>
        <td class="mono" style="color:var(--t4)">${r.id}</td>
        <td><b>${esc(r.name)}</b></td>
        <td style="color:var(--t3);max-width:220px;white-space:normal">${esc(r.desc)}</td>
        <td style="max-width:260px;white-space:normal"><div style="display:flex;flex-wrap:wrap;gap:3px">${r.perms.map(p => `<span class="bdg" style="background:var(--teal-pale);color:var(--teal-dark);font-size:9px">${esc(p)}</span>`).join('')}</div></td>
        <td class="mono" style="text-align:center"><b>${r.users}</b></td>
        <td><div style="display:flex;gap:6px">
          <button class="btn xs" onclick="editRoleModal(${JSON.stringify(r).replace(/"/g, '&quot;').replace(/'/g, '&#39;')})"><span data-ic="settings"></span> Edit</button>
          ${r.users === 0 ? `<button class="btn xs danger" onclick="deleteRoleModal('${r.id}','${esc(r.name)}')"><span data-ic="x"></span> Delete</button>` : ''}
        </div></td>
        <td class="mono" style="color:var(--t3)">${esc(audit.createdOn)}</td>
        <td class="mono" style="color:var(--t3)">${esc(audit.updatedOn)}<span class="sub"> by ${esc(audit.updatedBy)}</span></td>
      </tr>`; }).join('')}
      </tbody></table>
    </div>
  </div>`;
  injectIcons(body);
}

/* ── Role CRUD modals ── */
function openAddRoleModal() {
  openModal(`
    <div class="m-head"><span>Add Role</span><button class="x" onclick="closeModal()">${ic('x')}</button></div>
    <div class="m-body">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Role Name</label><input class="tb-input" id="mrName" placeholder="e.g. Billing Reviewer" style="width:100%"></div>
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Description</label><textarea class="tb-input" id="mrDesc" rows="2" placeholder="Role purpose and responsibilities" style="width:100%;resize:vertical"></textarea></div>
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Permissions (comma-separated)</label><input class="tb-input" id="mrPerms" placeholder="View Dashboard, View Cases, PA Status" style="width:100%"></div>
      </div>
    </div>
    <div class="m-foot"><button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveNewRole()">${ic('check')} Create Role</button></div>
  `);
}
function saveNewRole() {
  const name = $('mrName').value.trim(), desc = $('mrDesc').value.trim(), permsRaw = $('mrPerms').value;
  if (!name) { toast('Role name required'); return; }
  const perms = permsRaw.split(',').map(p => p.trim()).filter(Boolean);
  const newId = 'R' + (ROLES_DATA.length + 1).toString().padStart(3, '0');
  ROLES_DATA.push({ id: newId, name, desc, perms, users: 0 });
  closeModal(); renderRoles(); toast('Role "' + name + '" created', 1);
}
function editRoleModal(r) {
  openModal(`
    <div class="m-head"><span>Edit Role — ${esc(r.name)}</span><button class="x" onclick="closeModal()">${ic('x')}</button></div>
    <div class="m-body">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Role Name</label><input class="tb-input" id="erName" value="${esc(r.name)}" style="width:100%"></div>
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Description</label><textarea class="tb-input" id="erDesc" rows="2" style="width:100%;resize:vertical">${esc(r.desc)}</textarea></div>
        <div><label style="font-size:11px;font-weight:600;color:var(--t2);display:block;margin-bottom:3px">Permissions (comma-separated)</label><input class="tb-input" id="erPerms" value="${esc(r.perms.join(', '))}" style="width:100%"></div>
      </div>
    </div>
    <div class="m-foot"><button class="btn" onclick="closeModal()">Cancel</button><button class="btn primary" onclick="saveEditRole('${r.id}')">${ic('check')} Save Changes</button></div>
  `);
}
function saveEditRole(id) {
  const r = ROLES_DATA.find(x => x.id === id); if (!r) return;
  r.name = $('erName').value.trim() || r.name;
  r.desc = $('erDesc').value.trim();
  r.perms = $('erPerms').value.split(',').map(p => p.trim()).filter(Boolean);
  closeModal(); renderRoles(); toast('Role updated', 1);
}
function deleteRoleModal(id, name) {
  openModal(`
    <div class="m-head"><span>Delete Role</span><button class="x" onclick="closeModal()">${ic('x')}</button></div>
    <div class="m-body"><p style="font-size:12.5px;color:var(--t2)">Delete role <b>${esc(name)}</b>? This cannot be undone. Make sure no users are assigned this role.</p></div>
    <div class="m-foot"><button class="btn" onclick="closeModal()">Cancel</button><button class="btn danger" onclick="confirmDeleteRole('${id}')">${ic('x')} Delete Role</button></div>
  `);
}
function confirmDeleteRole(id) {
  const idx = ROLES_DATA.findIndex(r => r.id === id); if (idx < 0) return;
  const name = ROLES_DATA[idx].name;
  ROLES_DATA.splice(idx, 1);
  closeModal(); renderRoles(); toast('Role "' + name + '" deleted', 1);
}

document.addEventListener('DOMContentLoaded', () => {
  Shell.init('roles');
  const addBtn = $('addRoleBtn');
  if (addBtn) addBtn.addEventListener('click', openAddRoleModal);
  renderRoles();
});
