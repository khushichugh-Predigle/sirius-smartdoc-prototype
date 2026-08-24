/* Ported from sirius_clearance_specialist_v64.html — const ROLES_DATA (~line 1811).
 * Same shape/fields; no persistence — in-memory only, resets on reload. */
window.ROLES_DATA = [
  { id: 'R001', name: 'Data Entry Clerk',     users: 3, perms: ['View Dashboard', 'Document Intake', 'View Patients', 'View Reports'], desc: 'Handles incoming document classification, extraction and case creation.' },
  { id: 'R002', name: 'Clearance Specialist', users: 4, perms: ['View Dashboard', 'View Cases', 'Document Intake', 'View Patients', 'PA Status', 'Appeals Management', 'View Reports'], desc: 'Reviews cases, manages prior authorizations, and submits PA requests to payers.' },
  { id: 'R003', name: 'IT Admin',             users: 2, perms: ['View Dashboard', 'Users & Permissions', 'Roles'], desc: 'Manages user accounts, roles, permissions, and system configuration.' },
  { id: 'R004', name: 'Super Admin',          users: 1, perms: ['All Permissions'], desc: 'Full access to all modules, users, configuration, and analytics.' },
  { id: 'R005', name: 'PA Reviewer',          users: 0, perms: ['View Dashboard', 'View Cases (read-only)', 'PA Status', 'View Reports'], desc: 'Read-only reviewer for prior authorization decisions and status tracking.' },
  { id: 'R006', name: 'Billing Specialist',   users: 0, perms: ['View Dashboard', 'View Cases (read-only)', 'View Patients', 'View Reports'], desc: 'Reviews billing-related case data and generates financial reports.' },
];
