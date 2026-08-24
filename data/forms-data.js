/* Forms library data — adapted from v64's fbSeed()/FB_FORMS (sirius_clearance_specialist_v64.html,
 * ~line 7003). Same record shape (formId, name{locale}, desc{locale}, layout, owner, archived,
 * locales[], versions[{v,status,by,at,sections}]) but with each version's `sections` trimmed to a
 * {title, fieldCount} outline rather than v64's full nested field-definition tree — this prototype
 * has no drag-and-drop builder consuming per-field schema, only a read-only outline view, so
 * carrying full field definitions (type/variant/options/logic/etc per field) would be dead weight.
 * Expanded from v64's 6 seed forms to 13 to give the list's filters/sort/pagination something to
 * demonstrate, following this repo's existing convention (see data/dummy-documents.js). */

window.FORMS_PERM_ROLES = ['Data Entry Clerk', 'Clearance Specialist', 'IT Admin', 'Super Admin'];

window.FORMS_DATA = [
  {
    formId: 'FRM-1041',
    name: { en: 'Intake Referral Form', es: 'Formulario de Referencia de Admisión' },
    desc: { en: 'Captures applicant details, request details and supporting documents for a new referral.', es: '' },
    layout: 'side', owner: 'K. Chugh', archived: false, locales: ['en', 'es'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [
      { v: 25, status: 'draft', by: 'K. Chugh', at: '2026-08-12 09:14', sections: [{ title: 'Applicant details', fieldCount: 6 }, { title: 'Request details', fieldCount: 3 }, { title: 'Supporting documents', fieldCount: 2 }] },
      { v: 24, status: 'published', by: 'M. Singh', at: '2026-07-28 16:02', sections: [{ title: 'Applicant details', fieldCount: 6 }, { title: 'Request details', fieldCount: 3 }, { title: 'Supporting documents', fieldCount: 2 }] },
      { v: 23, status: 'superseded', by: 'M. Singh', at: '2026-06-14 11:20', sections: [{ title: 'Applicant details', fieldCount: 6 }, { title: 'Request details', fieldCount: 3 }, { title: 'Supporting documents', fieldCount: 2 }] },
      { v: 22, status: 'superseded', by: 'L. Thompson', at: '2026-05-02 10:41', sections: [{ title: 'Applicant details', fieldCount: 5 }, { title: 'Request details', fieldCount: 3 }, { title: 'Supporting documents', fieldCount: 2 }] }
    ]
  },
  {
    formId: 'FRM-1042',
    name: { en: 'Prior Auth Form', es: 'Formulario de Autorización Previa' },
    desc: { en: 'Requester and request-line details used to open a prior authorization case.', es: '' },
    layout: 'tabs', owner: 'K. Chugh', archived: false, locales: ['en', 'es'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [
      { v: 5, status: 'draft', by: 'K. Chugh', at: '2026-08-09 16:40', sections: [{ title: 'Requester', fieldCount: 2 }, { title: 'Request', fieldCount: 2 }] },
      { v: 4, status: 'draft', by: 'P. Nguyen', at: '2026-08-07 12:15', sections: [{ title: 'Requester', fieldCount: 1 }] },
      { v: 3, status: 'published', by: 'M. Singh', at: '2026-07-11 09:30', sections: [{ title: 'Requester', fieldCount: 1 }] },
      { v: 2, status: 'superseded', by: 'M. Singh', at: '2026-05-19 14:05', sections: [] }
    ]
  },
  {
    formId: 'FRM-1043',
    name: { en: 'CMM Submission Form', es: 'Formulario de Envío CMM' },
    desc: { en: 'Two-step wizard ending in a confirmations checklist.', es: '' },
    layout: 'wizard', owner: 'M. Singh', archived: false, locales: ['en', 'es'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [
      { v: 2, status: 'published', by: 'M. Singh', at: '2026-08-04 11:02', sections: [{ title: 'Step one', fieldCount: 1 }, { title: 'Step two', fieldCount: 1 }] },
      { v: 1, status: 'superseded', by: 'K. Chugh', at: '2026-06-02 08:47', sections: [] }
    ]
  },
  {
    formId: 'FRM-1044',
    name: { en: 'Availity Novologix Submission Form', es: 'Formulario de Envío Availity Novologix' },
    desc: { en: 'Single-scroll payer reference submission.', es: '' },
    layout: 'scroll', owner: 'K. Chugh', archived: false, locales: ['en'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [
      { v: 12, status: 'draft', by: 'K. Chugh', at: '2026-07-30 08:20', sections: [{ title: 'Submission', fieldCount: 1 }] },
      { v: 11, status: 'published', by: 'L. Thompson', at: '2026-07-02 15:11', sections: [] }
    ]
  },
  {
    formId: 'FRM-1045',
    name: { en: 'Basic Data Extractor', es: 'Extractor de Datos Básico' },
    desc: { en: 'Single review-summary field, no inputs.', es: '' },
    layout: 'scroll', owner: 'M. Singh', archived: false, locales: ['en', 'es'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [
      { v: 5, status: 'published', by: 'M. Singh', at: '2026-06-18 13:55', sections: [{ title: 'Extracted values', fieldCount: 1 }] }
    ]
  },
  {
    formId: 'FRM-1039',
    name: { en: 'Legacy Consent Form', es: 'Formulario de Consentimiento Heredado' },
    desc: { en: 'Single consent toggle, retained for historical submissions.', es: '' },
    layout: 'scroll', owner: 'M. Singh', archived: true, locales: ['en', 'es'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [
      { v: 8, status: 'published', by: 'M. Singh', at: '2026-02-11 10:00', sections: [{ title: 'Consent', fieldCount: 1 }] }
    ]
  },
  {
    formId: 'FRM-1046',
    name: { en: 'Appeal Request Form', es: 'Formulario de Solicitud de Apelación' },
    desc: { en: 'Reason for appeal plus supporting attachments.', es: '' },
    layout: 'scroll', owner: 'L. Thompson', archived: false, locales: ['en', 'es'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [
      { v: 3, status: 'published', by: 'L. Thompson', at: '2026-08-01 14:22', sections: [{ title: 'Appeal', fieldCount: 3 }] },
      { v: 2, status: 'superseded', by: 'L. Thompson', at: '2026-06-20 09:05', sections: [] }
    ]
  },
  {
    formId: 'FRM-1047',
    name: { en: 'Provider Enrollment Form', es: 'Formulario de Inscripción de Proveedor' },
    desc: { en: 'NPI, taxonomy and licensure capture for new provider onboarding.', es: '' },
    layout: 'side', owner: 'P. Nguyen', archived: false, locales: ['en'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [
      { v: 7, status: 'draft', by: 'P. Nguyen', at: '2026-08-15 10:30', sections: [{ title: 'Provider details', fieldCount: 5 }, { title: 'Licensure', fieldCount: 4 }] },
      { v: 6, status: 'published', by: 'P. Nguyen', at: '2026-07-19 13:00', sections: [{ title: 'Provider details', fieldCount: 4 }] }
    ]
  },
  {
    formId: 'FRM-1048',
    name: { en: 'Medication Change Request', es: 'Solicitud de Cambio de Medicación' },
    desc: { en: 'Requested drug, dosage and clinical rationale.', es: '' },
    layout: 'tabs', owner: 'K. Chugh', archived: false, locales: ['en', 'es'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [
      { v: 1, status: 'draft', by: 'K. Chugh', at: '2026-08-18 15:47', sections: [{ title: 'Medication', fieldCount: 4 }] }
    ]
  },
  {
    formId: 'FRM-1049',
    name: { en: 'Patient Consent — Telehealth', es: 'Consentimiento del Paciente — Telesalud' },
    desc: { en: 'E-signature consent for telehealth visits.', es: '' },
    layout: 'scroll', owner: 'M. Singh', archived: false, locales: ['en', 'es'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [
      { v: 4, status: 'published', by: 'M. Singh', at: '2026-07-22 11:18', sections: [{ title: 'Consent', fieldCount: 2 }] },
      { v: 3, status: 'superseded', by: 'M. Singh', at: '2026-05-30 09:40', sections: [] }
    ]
  },
  {
    formId: 'FRM-1050',
    name: { en: 'Clearing House Onboarding Form', es: 'Formulario de Incorporación de Cámara de Compensación' },
    desc: { en: 'Trading-partner and connectivity details for a new clearing house.', es: '' },
    layout: 'side', owner: 'L. Thompson', archived: false, locales: ['en'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [
      { v: 2, status: 'draft', by: 'L. Thompson', at: '2026-08-05 16:00', sections: [{ title: 'Trading partner', fieldCount: 3 }, { title: 'Connectivity', fieldCount: 3 }] }
    ]
  },
  {
    formId: 'FRM-1051',
    name: { en: 'Survey — Post-Visit Satisfaction', es: 'Encuesta — Satisfacción Posterior a la Visita' },
    desc: { en: 'Rating scales and free-text feedback on a recent visit.', es: '' },
    layout: 'scroll', owner: 'P. Nguyen', archived: false, locales: ['en', 'es'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [
      { v: 1, status: 'published', by: 'P. Nguyen', at: '2026-06-25 12:10', sections: [{ title: 'Survey', fieldCount: 5 }] }
    ]
  },
  {
    formId: 'FRM-1038',
    name: { en: 'Legacy Payer Dispute Form', es: 'Formulario de Disputa de Pagador Heredado' },
    desc: { en: 'Retired dispute-intake form, kept for historical records.', es: '' },
    layout: 'scroll', owner: 'M. Singh', archived: true, locales: ['en'],
    perms: { 'Data Entry Clerk': { view: 1, edit: 0, publish: 0 }, 'Clearance Specialist': { view: 1, edit: 1, publish: 0 }, 'IT Admin': { view: 1, edit: 1, publish: 1 }, 'Super Admin': { view: 1, edit: 1, publish: 1 } },
    versions: [
      { v: 3, status: 'published', by: 'M. Singh', at: '2025-11-02 09:15', sections: [{ title: 'Dispute', fieldCount: 3 }] }
    ]
  }
];
