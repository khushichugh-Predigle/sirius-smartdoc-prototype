import sys
import re

def update_dummy_documents():
    with open('data/dummy-documents.js', 'r') as f:
        content = f.read()

    # Doc 000000000000000000000001
    content = re.sub(
        r'("_id":\s*"000000000000000000000001".*?"provider_last_name":\s*\{\s*"value":\s*)"[^"]+"',
        r'\1"Mohammed"',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'("_id":\s*"000000000000000000000001".*?"provider_first_name":\s*\{\s*"value":\s*)"[^"]+"',
        r'\1"Abdu"',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'("_id":\s*"000000000000000000000001".*?"specialty":\s*\{\s*"value":\s*)"[^"]+"',
        r'\1"Internal Medicine"',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'("_id":\s*"000000000000000000000001".*?"organization_name":\s*\{\s*"value":\s*)"[^"]+"',
        r'\1"Piedmont Physicians"',
        content,
        flags=re.DOTALL
    )

    # Doc 000000000000000000000002
    content = re.sub(
        r'("_id":\s*"000000000000000000000002".*?"provider_last_name":\s*\{\s*"value":\s*)"[^"]+"',
        r'\1"Costa"',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'("_id":\s*"000000000000000000000002".*?"provider_first_name":\s*\{\s*"value":\s*)"[^"]+"',
        r'\1"Mary"',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'("_id":\s*"000000000000000000000002".*?"specialty":\s*\{\s*"value":\s*)"[^"]+"',
        r'\1"Gastroenterology"',
        content,
        flags=re.DOTALL
    )

    # Doc 000000000000000000000003
    content = re.sub(
        r'("_id":\s*"000000000000000000000003".*?"provider_last_name":\s*\{\s*"value":\s*)"[^"]+"',
        r'\1"Mohammed"',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'("_id":\s*"000000000000000000000003".*?"provider_first_name":\s*\{\s*"value":\s*)"[^"]+"',
        r'\1"A."',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'("_id":\s*"000000000000000000000003".*?"specialty":\s*\{\s*"value":\s*)"[^"]+"',
        r'\1"Hospitalist"',
        content,
        flags=re.DOTALL
    )

    with open('data/dummy-documents.js', 'w') as f:
        f.write(content)

def update_js():
    with open('js/document-detail.js', 'r') as f:
        content = f.read()

    # 1. State changes: add providerMatchListExpanded and providerSearchQuery
    content = content.replace('const state = {', "const state = {\\n    providerMatchListExpanded: true,\\n    providerSearchQuery: '',")

    # 2. Add Pr4 to CPR_PRESCRIBERS
    cpr_prescribers_old = "    { id: 'Pr3', first_name: 'Abdu', last_name: 'Mohammed', specialty: 'Internal Medicine', organization: 'Piedmont Physicians', address: '456 Stake St', city: 'Warren', state: 'MI', zip: '48088', npi: '1811223344', phone: '(586) 555-0303', prof_designation: 'MD' },\\n  ];"
    cpr_prescribers_new = "    { id: 'Pr3', first_name: 'Abdu', last_name: 'Mohammed', specialty: 'Internal Medicine', organization: 'Piedmont Physicians', address: '456 Stake St', city: 'Warren', state: 'MI', zip: '48088', npi: '1811223344', phone: '(586) 555-0303', prof_designation: 'MD' },\\n    { id: 'Pr4', first_name: 'A.', last_name: 'Mohammed', specialty: 'Hospitalist', organization: 'St. John Hospital', address: '456 Ryan Rd', city: 'Detroit', state: 'MI', zip: '48235', npi: '1647382910', phone: '(313) 555-0404', prof_designation: 'MD' }\\n  ];"
    content = content.replace(cpr_prescribers_old, cpr_prescribers_new)

    # 3. Seq # read-only in fieldControlMarkup
    field_control_old = "    default:\\n      return `<input type=\\"text\\" data-key=\\"${field._key}\\" value=\\"${escapeHtml(val)}\\" />`;\\n  }\\n}"
    field_control_new = "    default:\\n      if (field.key === SEQ_FIELD_KEY) {\\n        return `<input type=\\"text\\" class=\\"seq-readonly\\" data-key=\\"${field._key}\\" value=\\"${escapeHtml(val)}\\" readonly />`;\\n      }\\n      return `<input type=\\"text\\" data-key=\\"${field._key}\\" value=\\"${escapeHtml(val)}\\" />`;\\n  }\\n}"
    content = content.replace(field_control_old, field_control_new)

    provider_field_source_old = "function providerFieldSourceRow(field) {\\n    if (!field.label) return '';"
    provider_field_source_new = "function providerFieldSourceRow(field) {\\n    if (field.key === SEQ_FIELD_KEY) return '';\\n    if (!field.label) return '';"
    content = content.replace(provider_field_source_old, provider_field_source_new)

    # 4. CPR+ replacement
    content = content.replace("cpr: { cls: 'origin-cpr', text: 'On file' },", "cpr: { cls: 'origin-cpr', text: 'From Record' },")
    content = content.replace("Editing this prescriber updates the shared CPR+ record for every patient linked to it.", "Editing this prescriber updates the shared record for every patient linked to it.")
    
    # 5. renderProviderMatchAccordion modifications
    # CPR+ replacements
    content = content.replace("No CPR+ prescriber match", "No record found")
    content = content.replace("CPR+ prescriber match${cands.length === 1 ? '' : 'es'} found", "match${cands.length === 1 ? '' : 'es'} found")
    content = content.replace("isn’t in CPR+ — create a new prescriber record", "isn’t on record — create a new prescriber record")
    content = content.replace("In CPR+", "On record")

    # In selectProviderMatch toast
    content = content.replace("New prescriber will be created in CPR+ on Save & Submit", "New prescriber will be created on Save & Submit")
    content = content.replace("populated from CPR+", "populated from record")

    # Replace other CPR+
    content = content.replace("CPR+ prescriber database", "prescriber database")
    content = content.replace("CPR+ prescriber lookup", "prescriber lookup")
    content = content.replace("CPR+ providers below", "providers below")
    content = content.replace("created in CPR+", "created in records")
    content = content.replace("still in CPR+", "still in records")
    content = content.replace("CPR+ site list", "site list")
    content = content.replace("real CPR+ Contact/Notes", "real Contact/Notes")
    content = content.replace("written to CPR+", "written to records")
    content = content.replace("CPR+ record", "record")
    content = content.replace("shared CPR+", "shared")
    content = content.replace("synced to CPR+", "synced to records")

    with open('js/document-detail.js', 'w') as f:
        f.write(content)

if __name__ == '__main__':
    update_dummy_documents()
    update_js()
