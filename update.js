const fs = require('fs');
let content = fs.readFileSync('js/document-detail.js', 'utf8');

// 1. State changes
content = content.replace('const state = {', "const state = {\n    providerMatchListExpanded: true,\n    providerSearchQuery: '',");

// 2. Add Pr4 to CPR_PRESCRIBERS
const cprOld = "    { id: 'Pr3', first_name: 'Abdu', last_name: 'Mohammed', specialty: 'Internal Medicine', organization: 'Piedmont Physicians', address: '456 Stake St', city: 'Warren', state: 'MI', zip: '48088', npi: '1811223344', phone: '(586) 555-0303', prof_designation: 'MD' },\n  ];";
const cprNew = "    { id: 'Pr3', first_name: 'Abdu', last_name: 'Mohammed', specialty: 'Internal Medicine', organization: 'Piedmont Physicians', address: '456 Stake St', city: 'Warren', state: 'MI', zip: '48088', npi: '1811223344', phone: '(586) 555-0303', prof_designation: 'MD' },\n    { id: 'Pr4', first_name: 'A.', last_name: 'Mohammed', specialty: 'Hospitalist', organization: 'St. John Hospital', address: '456 Ryan Rd', city: 'Detroit', state: 'MI', zip: '48235', npi: '1647382910', phone: '(313) 555-0404', prof_designation: 'MD' }\n  ];";
content = content.replace(cprOld, cprNew);

// 3. Seq # read-only
const fieldOld = "    default:\n      return `<input type=\"text\" data-key=\"${field._key}\" value=\"${escapeHtml(val)}\" />`;\n  }\n}";
const fieldNew = "    default:\n      if (field.key === SEQ_FIELD_KEY) {\n        return `<input type=\"text\" class=\"seq-readonly\" data-key=\"${field._key}\" value=\"${escapeHtml(val)}\" readonly />`;\n      }\n      return `<input type=\"text\" data-key=\"${field._key}\" value=\"${escapeHtml(val)}\" />`;\n  }\n}";
content = content.replace(fieldOld, fieldNew);

const provFieldOld = "function providerFieldSourceRow(field) {\n    if (!field.label) return '';";
const provFieldNew = "function providerFieldSourceRow(field) {\n    if (field.key === SEQ_FIELD_KEY) return '';\n    if (!field.label) return '';";
content = content.replace(provFieldOld, provFieldNew);

// 4. CPR+ replacement
content = content.replace("cpr: { cls: 'origin-cpr', text: 'On file' },", "cpr: { cls: 'origin-cpr', text: 'From Record' },");
content = content.replace("Editing this prescriber updates the shared CPR+ record for every patient linked to it.", "Editing this prescriber updates the shared record for every patient linked to it.");
content = content.replace(/No CPR\+ prescriber match/g, "No record found");
content = content.replace(/CPR\+ prescriber match\$\{cands.length === 1 \? '' : 'es'\} found/g, "match${cands.length === 1 ? '' : 'es'} found");
content = content.replace(/isn’t in CPR\+ — create a new prescriber record/g, "isn’t on record — create a new prescriber record");
content = content.replace(/>In CPR\+</g, ">On record<");
content = content.replace(/New prescriber will be created in CPR\+ on Save & Submit/g, "New prescriber will be created on Save & Submit");
content = content.replace(/populated from CPR\+/g, "populated from record");

content = content.replace(/CPR\+ prescriber database/g, "prescriber database");
content = content.replace(/CPR\+ prescriber lookup/g, "prescriber lookup");
content = content.replace(/CPR\+ providers below/g, "providers below");
content = content.replace(/created in CPR\+/g, "created in records");
content = content.replace(/still in CPR\+/g, "still in records");
content = content.replace(/CPR\+ site list/g, "site list");
content = content.replace(/real CPR\+ Contact\/Notes/g, "real Contact/Notes");
content = content.replace(/written to CPR\+/g, "written to records");
content = content.replace(/CPR\+ record/g, "record");
content = content.replace(/shared CPR\+/g, "shared");
content = content.replace(/synced to CPR\+/g, "synced to records");

fs.writeFileSync('js/document-detail.js', content);
