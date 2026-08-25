import re
import os

def update_dummy_documents():
    with open('data/dummy-documents.js', 'r') as f:
        content = f.read()

    # Doc 000000000000000000000001
    # provider_last_name.value to 'Mohammed', provider_first_name.value to 'Abdu', specialty.value to 'Internal Medicine', organization_name.value to 'Piedmont Physicians'
    # Currently:
    # "provider_last_name": {\n            "value": "KLEIN",
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


if __name__ == "__main__":
    update_dummy_documents()
