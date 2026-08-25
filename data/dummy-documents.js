// Fabricated document/patient records — expanded from the single sample record
// in dummy data.json. All names, IDs, contact info and clinical text below are
// invented placeholders for design review only.
window.DUMMY_DOCUMENTS = [
  {
    "_id": "000000000000000000000000",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-13T16:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-13T16:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000000doc",
    "document_type": "Referral",
    "document_status": "review in progress",
    "claimed_by": { "name": "R. Alvarez", "initials": "RA" },
    "file": {
      "original_file_name": "300000_Referral_DonGarcia_20260813_705136.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-13T16:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Don Garcia, ICD-10 I10.",
                "confidence_score": null,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Male",
            "confidence_score": 98,
            "page_number": 2,
            "source_line": "Male",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "MI",
            "confidence_score": 92,
            "page_number": 1,
            "source_line": "MI",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10000",
            "confidence_score": 98,
            "page_number": 2,
            "source_line": "HC10000",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "305-795-4078",
            "confidence_score": 95,
            "page_number": 1,
            "source_line": "305-795-4078",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "100 Prescriber Ave",
            "confidence_score": 94,
            "page_number": 2,
            "source_line": "100 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 77,
            "page_number": 4,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Don",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "Don",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Warren",
            "confidence_score": 88,
            "page_number": 2,
            "source_line": "Warren",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "48093",
            "confidence_score": 93,
            "page_number": 1,
            "source_line": "48093",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "10/02/1985",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "10/02/1985",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "70",
            "confidence_score": 79,
            "page_number": 1,
            "source_line": "70",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "140",
            "confidence_score": 75,
            "page_number": 3,
            "source_line": "140",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Garcia",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "Garcia",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-13",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "2026-08-13",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "ct-001",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": "Selected by reviewer."
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Standard",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Standard",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Infusion Suite",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Infusion Suite",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Pending",
            "confidence_score": 84,
            "page_number": 1,
            "source_line": "Pending",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "United Healthcare",
            "confidence_score": 94,
            "page_number": 4,
            "source_line": "United Healthcare",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "Other",
            "confidence_score": 59,
            "page_number": 1,
            "source_line": "Other",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "Other - United Healthcare",
            "confidence_score": 89,
            "page_number": 4,
            "source_line": "Other - United Healthcare",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "405582123",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "405582123",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 75,
            "page_number": 1,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "VERMA",
            "confidence_score": 95,
            "page_number": 3,
            "source_line": "VERMA",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "MI",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "MI",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Neurology",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "Neurology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Warren",
            "confidence_score": 96,
            "page_number": 3,
            "source_line": "Warren",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "340-640-5561",
            "confidence_score": 91,
            "page_number": 4,
            "source_line": "340-640-5561",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "NARAYAN P",
            "confidence_score": 94,
            "page_number": 1,
            "source_line": "NARAYAN P",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "380-354-4800",
            "confidence_score": 80,
            "page_number": 4,
            "source_line": "380-354-4800",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 85,
            "page_number": 3,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "5619 Hoover Rd Suite A",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "5619 Hoover Rd Suite A",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "BG Tricounty Neurology and Sleep Clinic",
            "confidence_score": 95,
            "page_number": 2,
            "source_line": "BG Tricounty Neurology and Sleep Clinic",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "48093",
            "confidence_score": 93,
            "page_number": 1,
            "source_line": "48093",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": null
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Gammagard",
                "confidence_score": 96,
                "page_number": 2,
                "source_line": "Gammagard order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "0944-2700-03",
                "confidence_score": 90,
                "page_number": 4,
                "source_line": "0944-2700-03",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "17",
                "confidence_score": 88,
                "page_number": 4,
                "source_line": "17",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "gram",
                "confidence_score": 90,
                "page_number": 1,
                "source_line": "gram",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Once daily",
                "confidence_score": 73,
                "page_number": 3,
                "source_line": "Once daily",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "IVIG",
                "confidence_score": 89,
                "page_number": 4,
                "source_line": "IVIG",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000001",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-16T16:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-16T16:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000001doc",
    "document_type": "Referral",
    "document_status": "reviewed",
    "file": {
      "original_file_name": "300137_Referral_MariaOkafor_20260816_481853.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-16T16:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Maria Okafor, ICD-10 G61.81.",
                "confidence_score": 91,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Female",
            "confidence_score": 97,
            "page_number": 4,
            "source_line": "Female",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "IL",
            "confidence_score": 91,
            "page_number": 2,
            "source_line": "IL",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10037",
            "confidence_score": 95,
            "page_number": 3,
            "source_line": "HC10037",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "690-908-3645",
            "confidence_score": 73,
            "page_number": 3,
            "source_line": "690-908-3645",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "111 Prescriber Ave",
            "confidence_score": 93,
            "page_number": 1,
            "source_line": "111 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 69,
            "page_number": 1,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Maria",
            "confidence_score": 96,
            "page_number": 3,
            "source_line": "Maria",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Chicago",
            "confidence_score": 90,
            "page_number": 2,
            "source_line": "Chicago",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "60614",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "60614",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "06/20/1961",
            "confidence_score": 99,
            "page_number": 2,
            "source_line": "06/20/1961",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "67",
            "confidence_score": 93,
            "page_number": 2,
            "source_line": "67",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "161",
            "confidence_score": 81,
            "page_number": 1,
            "source_line": "161",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Okafor",
            "confidence_score": 96,
            "page_number": 4,
            "source_line": "Okafor",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-16",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "2026-08-16",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Standard",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Standard",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Infusion Suite",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Infusion Suite",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Unknown",
            "confidence_score": 61,
            "page_number": 2,
            "source_line": "Unknown",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "BCBS Michigan",
            "confidence_score": 95,
            "page_number": 2,
            "source_line": "BCBS Michigan",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "PPO",
            "confidence_score": 55,
            "page_number": 4,
            "source_line": "PPO",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "PPO - BCBS Michigan",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "PPO - BCBS Michigan",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "996197331",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "996197331",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 67,
            "page_number": 4,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "Mohammed",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "KLEIN",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "IL",
            "confidence_score": 96,
            "page_number": 4,
            "source_line": "IL",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Internal Medicine",
            "confidence_score": 91,
            "page_number": 2,
            "source_line": "Rheumatology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Chicago",
            "confidence_score": 92,
            "page_number": 1,
            "source_line": "Chicago",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "354-804-8624",
            "confidence_score": 84,
            "page_number": 4,
            "source_line": "354-804-8624",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "Abdu",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "SARAH J",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "761-761-3146",
            "confidence_score": 93,
            "page_number": 1,
            "source_line": "761-761-3146",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 84,
            "page_number": 4,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "4191 Hoover Rd Suite B",
            "confidence_score": 86,
            "page_number": 2,
            "source_line": "4191 Hoover Rd Suite B",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Piedmont Physicians",
            "confidence_score": 95,
            "page_number": 3,
            "source_line": "Great Lakes Rheumatology Associates",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "60614",
            "confidence_score": 98,
            "page_number": 2,
            "source_line": "60614",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1711326932",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "1711326932",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Cuvitru",
                "confidence_score": 98,
                "page_number": 2,
                "source_line": "Cuvitru order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "65597-401-06",
                "confidence_score": 59,
                "page_number": 1,
                "source_line": "65597-401-06",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "66",
                "confidence_score": 94,
                "page_number": 1,
                "source_line": "66",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mL",
                "confidence_score": 87,
                "page_number": 2,
                "source_line": "mL",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Every 2 weeks",
                "confidence_score": 93,
                "page_number": 1,
                "source_line": "Every 2 weeks",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "IVIG",
                "confidence_score": 86,
                "page_number": 4,
                "source_line": "IVIG",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000002",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-17T19:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-17T19:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000002doc",
    "document_type": "Referral",
    "document_status": "duplicate",
    "file": {
      "original_file_name": "300274_Referral_JamesPatel_20260817_390368.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-17T19:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for James Patel, ICD-10 I10.",
                "confidence_score": 92,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Male",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "Male",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "TX",
            "confidence_score": 99,
            "page_number": 2,
            "source_line": "TX",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10074",
            "confidence_score": 97,
            "page_number": 4,
            "source_line": "HC10074",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "719-453-9572",
            "confidence_score": 76,
            "page_number": 2,
            "source_line": "719-453-9572",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "122 Prescriber Ave",
            "confidence_score": 87,
            "page_number": 4,
            "source_line": "122 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 74,
            "page_number": 3,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "James",
            "confidence_score": 72,
            "page_number": 2,
            "source_line": "James",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Austin",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "Austin",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "73301",
            "confidence_score": 92,
            "page_number": 3,
            "source_line": "73301",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "04/07/1948",
            "confidence_score": 92,
            "page_number": 4,
            "source_line": "04/07/1948",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "67",
            "confidence_score": 73,
            "page_number": 4,
            "source_line": "67",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "234",
            "confidence_score": 91,
            "page_number": 2,
            "source_line": "234",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Patel",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "Patel",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-17",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "2026-08-17",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Priority I",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Priority I",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Infusion Suite",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "Infusion Suite",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Pending",
            "confidence_score": 76,
            "page_number": 4,
            "source_line": "Pending",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Aetna",
            "confidence_score": 90,
            "page_number": 4,
            "source_line": "Aetna",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "HMO",
            "confidence_score": 73,
            "page_number": 1,
            "source_line": "HMO",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "HMO - Aetna",
            "confidence_score": 99,
            "page_number": 2,
            "source_line": "HMO - Aetna",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "212506236",
            "confidence_score": 89,
            "page_number": 1,
            "source_line": "212506236",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 66,
            "page_number": 3,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "Costa",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "ONUOHA",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "TX",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "TX",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Gastroenterology",
            "confidence_score": 91,
            "page_number": 3,
            "source_line": "Pulmonology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Austin",
            "confidence_score": 83,
            "page_number": 1,
            "source_line": "Austin",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "475-217-2451",
            "confidence_score": 82,
            "page_number": 2,
            "source_line": "475-217-2451",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "Mary",
            "confidence_score": 84,
            "page_number": 1,
            "source_line": "MICHAEL T",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "547-766-7844",
            "confidence_score": 88,
            "page_number": 2,
            "source_line": "547-766-7844",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 73,
            "page_number": 2,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "5290 Hoover Rd Suite A",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "5290 Hoover Rd Suite A",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Midwest Pulmonary Care Center",
            "confidence_score": 98,
            "page_number": 2,
            "source_line": "Midwest Pulmonary Care Center",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "73301",
            "confidence_score": 93,
            "page_number": 2,
            "source_line": "73301",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1268917310",
            "confidence_score": null,
            "page_number": 2,
            "source_line": "1268917310",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Hizentra",
                "confidence_score": 93,
                "page_number": 2,
                "source_line": "Hizentra order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "44206-451-06",
                "confidence_score": 56,
                "page_number": 4,
                "source_line": "44206-451-06",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "94",
                "confidence_score": 98,
                "page_number": 4,
                "source_line": "94",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mL",
                "confidence_score": 89,
                "page_number": 2,
                "source_line": "mL",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Every 2 weeks",
                "confidence_score": 96,
                "page_number": 2,
                "source_line": "Every 2 weeks",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "SubQ",
                "confidence_score": 71,
                "page_number": 2,
                "source_line": "SubQ",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000003",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-21T10:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-21T10:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000003doc",
    "document_type": "Referral",
    "document_status": "reviewed",
    "file": {
      "original_file_name": "300411_Referral_LindaAlvarez_20260821_551664.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-21T10:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Linda Alvarez, ICD-10 G61.81.",
                "confidence_score": null,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Female",
            "confidence_score": 96,
            "page_number": 3,
            "source_line": "Female",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "CA",
            "confidence_score": 94,
            "page_number": 1,
            "source_line": "CA",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10111",
            "confidence_score": 92,
            "page_number": 3,
            "source_line": "HC10111",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "656-203-5312",
            "confidence_score": 81,
            "page_number": 3,
            "source_line": "656-203-5312",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "133 Prescriber Ave",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "133 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 65,
            "page_number": 1,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Linda",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "Linda",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Fresno",
            "confidence_score": 95,
            "page_number": 2,
            "source_line": "Fresno",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "93650",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "93650",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "12/09/1985",
            "confidence_score": 91,
            "page_number": 2,
            "source_line": "12/09/1985",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "72",
            "confidence_score": 82,
            "page_number": 1,
            "source_line": "72",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "186",
            "confidence_score": 77,
            "page_number": 1,
            "source_line": "186",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Alvarez",
            "confidence_score": 94,
            "page_number": 4,
            "source_line": "Alvarez",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-21",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "2026-08-21",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "ct-005",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": "Selected by reviewer."
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Priority I",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Priority I",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Physician Office",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Physician Office",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Active",
            "confidence_score": 87,
            "page_number": 4,
            "source_line": "Active",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Cigna",
            "confidence_score": 98,
            "page_number": 2,
            "source_line": "Cigna",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "PPO",
            "confidence_score": 87,
            "page_number": 1,
            "source_line": "PPO",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "PPO - Cigna",
            "confidence_score": 94,
            "page_number": 2,
            "source_line": "PPO - Cigna",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "191366527",
            "confidence_score": 81,
            "page_number": 1,
            "source_line": "191366527",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 83,
            "page_number": 1,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "Mohammed",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "DESAI",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "CA",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "CA",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Hospitalist",
            "confidence_score": 98,
            "page_number": 1,
            "source_line": "Endocrinology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Fresno",
            "confidence_score": 91,
            "page_number": 4,
            "source_line": "Fresno",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "458-276-5350",
            "confidence_score": 86,
            "page_number": 2,
            "source_line": "458-276-5350",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "A.",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "ANITA R",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "591-278-8848",
            "confidence_score": 89,
            "page_number": 1,
            "source_line": "591-278-8848",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 86,
            "page_number": 1,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "3415 Hoover Rd Suite C",
            "confidence_score": 96,
            "page_number": 3,
            "source_line": "3415 Hoover Rd Suite C",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Cornerstone Endocrine Group",
            "confidence_score": 92,
            "page_number": 1,
            "source_line": "Cornerstone Endocrine Group",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "93650",
            "confidence_score": 92,
            "page_number": 3,
            "source_line": "93650",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 86,
            "page_number": 2,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": null
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Xolair",
                "confidence_score": 94,
                "page_number": 2,
                "source_line": "Xolair order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "50242-040-62",
                "confidence_score": 68,
                "page_number": 4,
                "source_line": "50242-040-62",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "69",
                "confidence_score": 86,
                "page_number": 2,
                "source_line": "69",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mg",
                "confidence_score": 86,
                "page_number": 4,
                "source_line": "mg",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Once daily",
                "confidence_score": 72,
                "page_number": 4,
                "source_line": "Once daily",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "SubQ",
                "confidence_score": 99,
                "page_number": 2,
                "source_line": "SubQ",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000004",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-18T18:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-18T18:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000004doc",
    "document_type": "Referral",
    "document_status": "review in progress",
    "claimed_by": { "name": "Khushi C.", "initials": "KC" },
    "file": {
      "original_file_name": "300548_Referral_RobertRomero_20260818_649522.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-18T18:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Robert Romero, ICD-10 I10.",
                "confidence_score": 68,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Male",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "Male",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "OH",
            "confidence_score": 95,
            "page_number": 2,
            "source_line": "OH",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10148",
            "confidence_score": 97,
            "page_number": 4,
            "source_line": "HC10148",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "225-362-1058",
            "confidence_score": 88,
            "page_number": 4,
            "source_line": "225-362-1058",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "144 Prescriber Ave",
            "confidence_score": 87,
            "page_number": 4,
            "source_line": "144 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 70,
            "page_number": 1,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Robert",
            "confidence_score": 92,
            "page_number": 3,
            "source_line": "Robert",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Columbus",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "Columbus",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "43215",
            "confidence_score": 93,
            "page_number": 1,
            "source_line": "43215",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "03/24/1950",
            "confidence_score": 94,
            "page_number": 3,
            "source_line": "03/24/1950",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "71",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "71",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "202",
            "confidence_score": 94,
            "page_number": 3,
            "source_line": "202",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Romero",
            "confidence_score": 96,
            "page_number": 1,
            "source_line": "Romero",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-18",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "2026-08-18",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Standard",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Standard",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Home",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Home",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Unknown",
            "confidence_score": 67,
            "page_number": 3,
            "source_line": "Unknown",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Humana",
            "confidence_score": 96,
            "page_number": 1,
            "source_line": "Humana",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "Medicare",
            "confidence_score": 80,
            "page_number": 2,
            "source_line": "Medicare",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "Medicare Advantage - Humana",
            "confidence_score": 85,
            "page_number": 4,
            "source_line": "Medicare Advantage - Humana",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "584107688",
            "confidence_score": 87,
            "page_number": 3,
            "source_line": "584107688",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 90,
            "page_number": 2,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "OSEI",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "OSEI",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "OH",
            "confidence_score": 94,
            "page_number": 3,
            "source_line": "OH",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Nephrology",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "Nephrology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Columbus",
            "confidence_score": 96,
            "page_number": 1,
            "source_line": "Columbus",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "371-858-3648",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "371-858-3648",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "BRIAN K",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "BRIAN K",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "977-660-8002",
            "confidence_score": 86,
            "page_number": 2,
            "source_line": "977-660-8002",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "6231 Hoover Rd Suite B",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "6231 Hoover Rd Suite B",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Riverside Kidney & Hypertension",
            "confidence_score": 96,
            "page_number": 4,
            "source_line": "Riverside Kidney & Hypertension",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "43215",
            "confidence_score": 93,
            "page_number": 2,
            "source_line": "43215",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1534880087",
            "confidence_score": 83,
            "page_number": 2,
            "source_line": "1534880087",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Orencia",
                "confidence_score": 98,
                "page_number": 2,
                "source_line": "Orencia order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "0003-2188-11",
                "confidence_score": 63,
                "page_number": 1,
                "source_line": "0003-2188-11",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "44",
                "confidence_score": 91,
                "page_number": 4,
                "source_line": "44",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mg",
                "confidence_score": 91,
                "page_number": 3,
                "source_line": "mg",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Once daily",
                "confidence_score": 83,
                "page_number": 4,
                "source_line": "Once daily",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "IVIG",
                "confidence_score": 72,
                "page_number": 4,
                "source_line": "IVIG",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000005",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-04T22:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-04T22:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000005doc",
    "document_type": "Referral",
    "document_status": "reviewed",
    "file": {
      "original_file_name": "300685_Referral_PatriciaCarter_20260804_214343.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-04T22:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Patricia Carter, ICD-10 G61.81.",
                "confidence_score": 93,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Female",
            "confidence_score": 91,
            "page_number": 4,
            "source_line": "Female",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "NY",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "NY",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10185",
            "confidence_score": 93,
            "page_number": 1,
            "source_line": "HC10185",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "860-932-5977",
            "confidence_score": 76,
            "page_number": 4,
            "source_line": "860-932-5977",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "155 Prescriber Ave",
            "confidence_score": 86,
            "page_number": 1,
            "source_line": "155 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 88,
            "page_number": 2,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Patricia",
            "confidence_score": 95,
            "page_number": 1,
            "source_line": "Patricia",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Albany",
            "confidence_score": 84,
            "page_number": 3,
            "source_line": "Albany",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "12207",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "12207",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "04/26/1973",
            "confidence_score": 98,
            "page_number": 2,
            "source_line": "04/26/1973",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "60",
            "confidence_score": 92,
            "page_number": 3,
            "source_line": "60",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "124",
            "confidence_score": 91,
            "page_number": 4,
            "source_line": "124",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Carter",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "Carter",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-04",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "2026-08-04",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Priority II",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "Priority II",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Physician Office",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Physician Office",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Pending",
            "confidence_score": 80,
            "page_number": 2,
            "source_line": "Pending",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Medicaid MI",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "Medicaid MI",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "Medicaid",
            "confidence_score": 67,
            "page_number": 3,
            "source_line": "Medicaid",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "State Medicaid",
            "confidence_score": 88,
            "page_number": 2,
            "source_line": "State Medicaid",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "599412437",
            "confidence_score": 97,
            "page_number": 3,
            "source_line": "599412437",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 86,
            "page_number": 2,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "PETROVA",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "PETROVA",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "NY",
            "confidence_score": 90,
            "page_number": 2,
            "source_line": "NY",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Neurology",
            "confidence_score": 90,
            "page_number": 2,
            "source_line": "Neurology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Albany",
            "confidence_score": 83,
            "page_number": 1,
            "source_line": "Albany",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "926-261-4016",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "926-261-4016",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "ELENA M",
            "confidence_score": 94,
            "page_number": 3,
            "source_line": "ELENA M",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "395-389-9598",
            "confidence_score": 81,
            "page_number": 3,
            "source_line": "395-389-9598",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 92,
            "page_number": 3,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "6434 Hoover Rd Suite D",
            "confidence_score": 85,
            "page_number": 1,
            "source_line": "6434 Hoover Rd Suite D",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Lakeside Neurology Partners",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "Lakeside Neurology Partners",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "12207",
            "confidence_score": 86,
            "page_number": 2,
            "source_line": "12207",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 97,
            "page_number": 3,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1882624349",
            "confidence_score": 65,
            "page_number": 1,
            "source_line": "1882624349",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Remicade",
                "confidence_score": 93,
                "page_number": 2,
                "source_line": "Remicade order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "57894-030-01",
                "confidence_score": 78,
                "page_number": 2,
                "source_line": "57894-030-01",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "51",
                "confidence_score": 99,
                "page_number": 4,
                "source_line": "51",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mg",
                "confidence_score": 95,
                "page_number": 4,
                "source_line": "mg",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Once daily",
                "confidence_score": 84,
                "page_number": 1,
                "source_line": "Once daily",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "IV",
                "confidence_score": 93,
                "page_number": 1,
                "source_line": "IV",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000006",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-02T02:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-02T02:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000006doc",
    "document_type": "Referral",
    "document_status": "duplicate",
    "file": {
      "original_file_name": "300822_Referral_MichaelSullivan_20260802_746948.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-02T02:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Michael Sullivan, ICD-10 I10.",
                "confidence_score": 80,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Male",
            "confidence_score": 94,
            "page_number": 1,
            "source_line": "Male",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "FL",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "FL",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10222",
            "confidence_score": 85,
            "page_number": 4,
            "source_line": "HC10222",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "595-457-8044",
            "confidence_score": 68,
            "page_number": 4,
            "source_line": "595-457-8044",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "166 Prescriber Ave",
            "confidence_score": 97,
            "page_number": 3,
            "source_line": "166 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 84,
            "page_number": 2,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Michael",
            "confidence_score": 97,
            "page_number": 3,
            "source_line": "Michael",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Tampa",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "Tampa",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "33602",
            "confidence_score": 96,
            "page_number": 2,
            "source_line": "33602",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "05/11/1968",
            "confidence_score": 91,
            "page_number": 1,
            "source_line": "05/11/1968",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "75",
            "confidence_score": 80,
            "page_number": 2,
            "source_line": "75",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "219",
            "confidence_score": 72,
            "page_number": 3,
            "source_line": "219",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Sullivan",
            "confidence_score": 95,
            "page_number": 1,
            "source_line": "Sullivan",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-02",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "2026-08-02",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "ct-010",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": "Selected by reviewer."
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Standard",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "Standard",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Home",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Home",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Active",
            "confidence_score": 70,
            "page_number": 1,
            "source_line": "Active",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "United Healthcare",
            "confidence_score": 94,
            "page_number": 3,
            "source_line": "United Healthcare",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "Other",
            "confidence_score": 72,
            "page_number": 3,
            "source_line": "Other",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "Other - United Healthcare",
            "confidence_score": 89,
            "page_number": 2,
            "source_line": "Other - United Healthcare",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "571799759",
            "confidence_score": 88,
            "page_number": 2,
            "source_line": "571799759",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 67,
            "page_number": 3,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "VERMA",
            "confidence_score": 77,
            "page_number": 2,
            "source_line": "VERMA",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "FL",
            "confidence_score": 91,
            "page_number": 4,
            "source_line": "FL",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Neurology",
            "confidence_score": 91,
            "page_number": 1,
            "source_line": "Neurology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Tampa",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "Tampa",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "582-241-5811",
            "confidence_score": 81,
            "page_number": 2,
            "source_line": "582-241-5811",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "NARAYAN P",
            "confidence_score": 95,
            "page_number": 1,
            "source_line": "NARAYAN P",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "581-724-3912",
            "confidence_score": 88,
            "page_number": 1,
            "source_line": "581-724-3912",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "4565 Hoover Rd Suite A",
            "confidence_score": 87,
            "page_number": 1,
            "source_line": "4565 Hoover Rd Suite A",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "BG Tricounty Neurology and Sleep Clinic",
            "confidence_score": 94,
            "page_number": 1,
            "source_line": "BG Tricounty Neurology and Sleep Clinic",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "33602",
            "confidence_score": 95,
            "page_number": 2,
            "source_line": "33602",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": null
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Gammagard",
                "confidence_score": 95,
                "page_number": 2,
                "source_line": "Gammagard order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "0944-2700-03",
                "confidence_score": 69,
                "page_number": 1,
                "source_line": "0944-2700-03",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "36",
                "confidence_score": 85,
                "page_number": 1,
                "source_line": "36",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "gram",
                "confidence_score": 97,
                "page_number": 4,
                "source_line": "gram",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Every 2 weeks",
                "confidence_score": 72,
                "page_number": 2,
                "source_line": "Every 2 weeks",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "SubQ",
                "confidence_score": 83,
                "page_number": 3,
                "source_line": "SubQ",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000007",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-07-31T03:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-07-31T03:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000007doc",
    "document_type": "Referral",
    "document_status": "rejected",
    "file": {
      "original_file_name": "300959_Referral_BarbaraMannson_20260731_881543.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-07-31T03:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Barbara Mannson, ICD-10 G61.81.",
                "confidence_score": 61,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Female",
            "confidence_score": 95,
            "page_number": 2,
            "source_line": "Female",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "PA",
            "confidence_score": 96,
            "page_number": 2,
            "source_line": "PA",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10259",
            "confidence_score": 96,
            "page_number": 2,
            "source_line": "HC10259",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "633-316-2482",
            "confidence_score": 83,
            "page_number": 4,
            "source_line": "633-316-2482",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "177 Prescriber Ave",
            "confidence_score": 87,
            "page_number": 1,
            "source_line": "177 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Barbara",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "Barbara",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Erie",
            "confidence_score": 89,
            "page_number": 2,
            "source_line": "Erie",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "16501",
            "confidence_score": 91,
            "page_number": 1,
            "source_line": "16501",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "01/10/1971",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "01/10/1971",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "64",
            "confidence_score": 71,
            "page_number": 4,
            "source_line": "64",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "190",
            "confidence_score": 82,
            "page_number": 1,
            "source_line": "190",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Mannson",
            "confidence_score": 94,
            "page_number": 2,
            "source_line": "Mannson",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-07-31",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "2026-07-31",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Priority II",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Priority II",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Physician Office",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Physician Office",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Active",
            "confidence_score": 88,
            "page_number": 2,
            "source_line": "Active",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "BCBS Michigan",
            "confidence_score": 91,
            "page_number": 2,
            "source_line": "BCBS Michigan",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "PPO",
            "confidence_score": 67,
            "page_number": 1,
            "source_line": "PPO",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "PPO - BCBS Michigan",
            "confidence_score": 98,
            "page_number": 1,
            "source_line": "PPO - BCBS Michigan",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "817148325",
            "confidence_score": 86,
            "page_number": 4,
            "source_line": "817148325",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 90,
            "page_number": 3,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "KLEIN",
            "confidence_score": 96,
            "page_number": 2,
            "source_line": "KLEIN",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "PA",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "PA",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Rheumatology",
            "confidence_score": 92,
            "page_number": 1,
            "source_line": "Rheumatology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Erie",
            "confidence_score": 84,
            "page_number": 2,
            "source_line": "Erie",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "657-981-8508",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "657-981-8508",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "SARAH J",
            "confidence_score": 94,
            "page_number": 3,
            "source_line": "SARAH J",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "640-574-2502",
            "confidence_score": 96,
            "page_number": 1,
            "source_line": "640-574-2502",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "9380 Hoover Rd Suite A",
            "confidence_score": 82,
            "page_number": 2,
            "source_line": "9380 Hoover Rd Suite A",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Great Lakes Rheumatology Associates",
            "confidence_score": null,
            "page_number": 1,
            "source_line": "Great Lakes Rheumatology Associates",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "16501",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "16501",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1736730722",
            "confidence_score": 74,
            "page_number": 1,
            "source_line": "1736730722",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Cuvitru",
                "confidence_score": 99,
                "page_number": 2,
                "source_line": "Cuvitru order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "65597-401-06",
                "confidence_score": 60,
                "page_number": 3,
                "source_line": "65597-401-06",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "88",
                "confidence_score": 98,
                "page_number": 4,
                "source_line": "88",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mL",
                "confidence_score": 93,
                "page_number": 4,
                "source_line": "mL",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Every 2 weeks",
                "confidence_score": 89,
                "page_number": 2,
                "source_line": "Every 2 weeks",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "SubQ",
                "confidence_score": 76,
                "page_number": 2,
                "source_line": "SubQ",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000008",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-09T07:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-09T07:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000008doc",
    "document_type": "Auth Form",
    "document_status": "pending review",
    "file": {
      "original_file_name": "301096_Referral_WilliamNguyen_20260809_443748.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-09T07:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for William Nguyen, ICD-10 I10.",
                "confidence_score": 76,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Male",
            "confidence_score": 98,
            "page_number": 1,
            "source_line": "Male",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "GA",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "GA",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10296",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "HC10296",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "458-748-7459",
            "confidence_score": 83,
            "page_number": 3,
            "source_line": "458-748-7459",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "188 Prescriber Ave",
            "confidence_score": 90,
            "page_number": 2,
            "source_line": "188 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 84,
            "page_number": 1,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "William",
            "confidence_score": 94,
            "page_number": 1,
            "source_line": "William",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Macon",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "Macon",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "31201",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "31201",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "05/22/1985",
            "confidence_score": 90,
            "page_number": 2,
            "source_line": "05/22/1985",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "64",
            "confidence_score": 90,
            "page_number": 4,
            "source_line": "64",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "216",
            "confidence_score": 98,
            "page_number": 1,
            "source_line": "216",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Nguyen",
            "confidence_score": 95,
            "page_number": 1,
            "source_line": "Nguyen",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-09",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "2026-08-09",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Priority I",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Priority I",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Infusion Suite",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "Infusion Suite",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Pending",
            "confidence_score": 69,
            "page_number": 4,
            "source_line": "Pending",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Aetna",
            "confidence_score": 99,
            "page_number": 2,
            "source_line": "Aetna",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "HMO",
            "confidence_score": 85,
            "page_number": 2,
            "source_line": "HMO",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "HMO - Aetna",
            "confidence_score": 99,
            "page_number": 2,
            "source_line": "HMO - Aetna",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "859642939",
            "confidence_score": 86,
            "page_number": 1,
            "source_line": "859642939",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 72,
            "page_number": 4,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "ONUOHA",
            "confidence_score": 92,
            "page_number": 1,
            "source_line": "ONUOHA",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "GA",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "GA",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Pulmonology",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "Pulmonology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Macon",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "Macon",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "454-369-1006",
            "confidence_score": 82,
            "page_number": 2,
            "source_line": "454-369-1006",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "MICHAEL T",
            "confidence_score": 92,
            "page_number": 1,
            "source_line": "MICHAEL T",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "212-827-4231",
            "confidence_score": 86,
            "page_number": 4,
            "source_line": "212-827-4231",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 85,
            "page_number": 3,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "2044 Hoover Rd Suite C",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "2044 Hoover Rd Suite C",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Midwest Pulmonary Care Center",
            "confidence_score": 90,
            "page_number": 4,
            "source_line": "Midwest Pulmonary Care Center",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "31201",
            "confidence_score": 96,
            "page_number": 4,
            "source_line": "31201",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1188325439",
            "confidence_score": 66,
            "page_number": 3,
            "source_line": "1188325439",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Hizentra",
                "confidence_score": 90,
                "page_number": 2,
                "source_line": "Hizentra order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "44206-451-06",
                "confidence_score": 94,
                "page_number": 3,
                "source_line": "44206-451-06",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "16",
                "confidence_score": 93,
                "page_number": 4,
                "source_line": "16",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mL",
                "confidence_score": 99,
                "page_number": 3,
                "source_line": "mL",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Once monthly",
                "confidence_score": 98,
                "page_number": 2,
                "source_line": "Once monthly",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "IV",
                "confidence_score": 70,
                "page_number": 2,
                "source_line": "IV",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000009",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-13T05:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-13T05:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000009doc",
    "document_type": "Clinical",
    "document_status": "rejected",
    "file": {
      "original_file_name": "301233_Referral_ElizabethRossi_20260813_266918.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-13T05:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Elizabeth Rossi, ICD-10 G61.81.",
                "confidence_score": 84,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Female",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "Female",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "NC",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "NC",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10333",
            "confidence_score": 98,
            "page_number": 1,
            "source_line": "HC10333",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "227-647-4831",
            "confidence_score": 79,
            "page_number": 2,
            "source_line": "227-647-4831",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "199 Prescriber Ave",
            "confidence_score": 94,
            "page_number": 1,
            "source_line": "199 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 65,
            "page_number": 2,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Elizabeth",
            "confidence_score": 89,
            "page_number": 2,
            "source_line": "Elizabeth",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Durham",
            "confidence_score": 87,
            "page_number": 1,
            "source_line": "Durham",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "27701",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "27701",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "12/07/1998",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "12/07/1998",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "71",
            "confidence_score": 96,
            "page_number": 1,
            "source_line": "71",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "208",
            "confidence_score": 76,
            "page_number": 2,
            "source_line": "208",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Rossi",
            "confidence_score": 92,
            "page_number": 1,
            "source_line": "Rossi",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-13",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "2026-08-13",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "ct-006",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": "Selected by reviewer."
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Priority I",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Priority I",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Home",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Home",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Unknown",
            "confidence_score": 82,
            "page_number": 3,
            "source_line": "Unknown",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Cigna",
            "confidence_score": 79,
            "page_number": 1,
            "source_line": "Cigna",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "PPO",
            "confidence_score": 78,
            "page_number": 3,
            "source_line": "PPO",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "PPO - Cigna",
            "confidence_score": 94,
            "page_number": 4,
            "source_line": "PPO - Cigna",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "408860505",
            "confidence_score": 85,
            "page_number": 4,
            "source_line": "408860505",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 73,
            "page_number": 3,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "DESAI",
            "confidence_score": 92,
            "page_number": 2,
            "source_line": "DESAI",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "NC",
            "confidence_score": 91,
            "page_number": 3,
            "source_line": "NC",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Endocrinology",
            "confidence_score": 90,
            "page_number": 2,
            "source_line": "Endocrinology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Durham",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "Durham",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "556-702-2567",
            "confidence_score": 85,
            "page_number": 4,
            "source_line": "556-702-2567",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "ANITA R",
            "confidence_score": 96,
            "page_number": 2,
            "source_line": "ANITA R",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "490-419-4793",
            "confidence_score": 83,
            "page_number": 1,
            "source_line": "490-419-4793",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "6351 Hoover Rd Suite C",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "6351 Hoover Rd Suite C",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Cornerstone Endocrine Group",
            "confidence_score": 91,
            "page_number": 4,
            "source_line": "Cornerstone Endocrine Group",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "27701",
            "confidence_score": 85,
            "page_number": 3,
            "source_line": "27701",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 89,
            "page_number": 4,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": null
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Xolair",
                "confidence_score": 98,
                "page_number": 2,
                "source_line": "Xolair order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "50242-040-62",
                "confidence_score": 90,
                "page_number": 2,
                "source_line": "50242-040-62",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "68",
                "confidence_score": 94,
                "page_number": 1,
                "source_line": "68",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mg",
                "confidence_score": 90,
                "page_number": 2,
                "source_line": "mg",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Weekly",
                "confidence_score": 93,
                "page_number": 3,
                "source_line": "Weekly",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "IV",
                "confidence_score": 92,
                "page_number": 3,
                "source_line": "IV",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "00000000000000000000000a",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-03T05:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-03T05:00:00.000000Z",
      "record_status": "A"
    },
    "document": "00000000000000000000000adoc",
    "document_type": "Lab Results",
    "document_status": "reviewed",
    "file": {
      "original_file_name": "301370_Referral_DavidChen_20260803_773920.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-03T05:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for David Chen, ICD-10 I10.",
                "confidence_score": 77,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Male",
            "confidence_score": 99,
            "page_number": 2,
            "source_line": "Male",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "WA",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "WA",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10370",
            "confidence_score": 95,
            "page_number": 2,
            "source_line": "HC10370",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "441-535-4101",
            "confidence_score": 66,
            "page_number": 2,
            "source_line": "441-535-4101",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "210 Prescriber Ave",
            "confidence_score": 86,
            "page_number": 2,
            "source_line": "210 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 64,
            "page_number": 3,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "David",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "David",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Spokane",
            "confidence_score": 95,
            "page_number": 1,
            "source_line": "Spokane",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "99201",
            "confidence_score": 96,
            "page_number": 4,
            "source_line": "99201",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "06/15/1953",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "06/15/1953",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "67",
            "confidence_score": 90,
            "page_number": 3,
            "source_line": "67",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "228",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "228",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Chen",
            "confidence_score": 97,
            "page_number": 4,
            "source_line": "Chen",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-03",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "2026-08-03",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Standard",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Standard",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Physician Office",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Physician Office",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Pending",
            "confidence_score": 82,
            "page_number": 3,
            "source_line": "Pending",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Humana",
            "confidence_score": 91,
            "page_number": 4,
            "source_line": "Humana",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "Medicare",
            "confidence_score": 80,
            "page_number": 2,
            "source_line": "Medicare",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "Medicare Advantage - Humana",
            "confidence_score": 91,
            "page_number": 4,
            "source_line": "Medicare Advantage - Humana",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "588761347",
            "confidence_score": 86,
            "page_number": 2,
            "source_line": "588761347",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 75,
            "page_number": 1,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "OSEI",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "OSEI",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "WA",
            "confidence_score": 75,
            "page_number": 2,
            "source_line": "WA",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Nephrology",
            "confidence_score": 91,
            "page_number": 4,
            "source_line": "Nephrology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Spokane",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "Spokane",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "854-578-9547",
            "confidence_score": 94,
            "page_number": 2,
            "source_line": "854-578-9547",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "BRIAN K",
            "confidence_score": 94,
            "page_number": 4,
            "source_line": "BRIAN K",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "726-981-3005",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "726-981-3005",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 88,
            "page_number": 3,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "7256 Hoover Rd Suite D",
            "confidence_score": null,
            "page_number": 4,
            "source_line": "7256 Hoover Rd Suite D",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Riverside Kidney & Hypertension",
            "confidence_score": 95,
            "page_number": 3,
            "source_line": "Riverside Kidney & Hypertension",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "99201",
            "confidence_score": 89,
            "page_number": 4,
            "source_line": "99201",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 93,
            "page_number": 2,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1860590493",
            "confidence_score": 89,
            "page_number": 2,
            "source_line": "1860590493",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Orencia",
                "confidence_score": 91,
                "page_number": 2,
                "source_line": "Orencia order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "0003-2188-11",
                "confidence_score": 90,
                "page_number": 2,
                "source_line": "0003-2188-11",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "70",
                "confidence_score": 96,
                "page_number": 2,
                "source_line": "70",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mg",
                "confidence_score": 87,
                "page_number": 3,
                "source_line": "mg",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Weekly",
                "confidence_score": 79,
                "page_number": 2,
                "source_line": "Weekly",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "SubQ",
                "confidence_score": 97,
                "page_number": 2,
                "source_line": "SubQ",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "00000000000000000000000b",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-12T14:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-12T14:00:00.000000Z",
      "record_status": "A"
    },
    "document": "00000000000000000000000bdoc",
    "document_type": "Orders - Signed",
    "document_status": "reviewed",
    "file": {
      "original_file_name": "301507_Referral_JenniferFitzgerald_20260812_546802.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-12T14:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Jennifer Fitzgerald, ICD-10 G61.81.",
                "confidence_score": 77,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Female",
            "confidence_score": 94,
            "page_number": 3,
            "source_line": "Female",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "AZ",
            "confidence_score": 96,
            "page_number": 1,
            "source_line": "AZ",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10407",
            "confidence_score": 95,
            "page_number": 2,
            "source_line": "HC10407",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "510-594-1934",
            "confidence_score": 96,
            "page_number": 3,
            "source_line": "510-594-1934",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "221 Prescriber Ave",
            "confidence_score": 87,
            "page_number": 3,
            "source_line": "221 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 60,
            "page_number": 1,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Jennifer",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "Jennifer",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Tempe",
            "confidence_score": 86,
            "page_number": 2,
            "source_line": "Tempe",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "85281",
            "confidence_score": 92,
            "page_number": 4,
            "source_line": "85281",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "11/09/1969",
            "confidence_score": 92,
            "page_number": 2,
            "source_line": "11/09/1969",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "72",
            "confidence_score": 75,
            "page_number": 1,
            "source_line": "72",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "250",
            "confidence_score": 96,
            "page_number": 3,
            "source_line": "250",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Fitzgerald",
            "confidence_score": 95,
            "page_number": 1,
            "source_line": "Fitzgerald",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-12",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "2026-08-12",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Standard",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "Standard",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Infusion Suite",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "Infusion Suite",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Active",
            "confidence_score": 85,
            "page_number": 4,
            "source_line": "Active",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Medicaid MI",
            "confidence_score": 97,
            "page_number": 4,
            "source_line": "Medicaid MI",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "Medicaid",
            "confidence_score": 86,
            "page_number": 2,
            "source_line": "Medicaid",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "State Medicaid",
            "confidence_score": 93,
            "page_number": 1,
            "source_line": "State Medicaid",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "272182448",
            "confidence_score": 92,
            "page_number": 4,
            "source_line": "272182448",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 84,
            "page_number": 3,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "PETROVA",
            "confidence_score": 93,
            "page_number": 2,
            "source_line": "PETROVA",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "AZ",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "AZ",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Neurology",
            "confidence_score": 95,
            "page_number": 1,
            "source_line": "Neurology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Tempe",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "Tempe",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "234-418-7809",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "234-418-7809",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "ELENA M",
            "confidence_score": 97,
            "page_number": 3,
            "source_line": "ELENA M",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "685-997-9610",
            "confidence_score": 86,
            "page_number": 3,
            "source_line": "685-997-9610",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "1863 Hoover Rd Suite C",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "1863 Hoover Rd Suite C",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Lakeside Neurology Partners",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "Lakeside Neurology Partners",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "85281",
            "confidence_score": 90,
            "page_number": 2,
            "source_line": "85281",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1355297163",
            "confidence_score": 79,
            "page_number": 2,
            "source_line": "1355297163",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Remicade",
                "confidence_score": 91,
                "page_number": 2,
                "source_line": "Remicade order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "57894-030-01",
                "confidence_score": 52,
                "page_number": 4,
                "source_line": "57894-030-01",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "80",
                "confidence_score": 93,
                "page_number": 1,
                "source_line": "80",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mg",
                "confidence_score": 86,
                "page_number": 1,
                "source_line": "mg",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Once daily",
                "confidence_score": 99,
                "page_number": 4,
                "source_line": "Once daily",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "IVIG",
                "confidence_score": 71,
                "page_number": 4,
                "source_line": "IVIG",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "00000000000000000000000c",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-02T08:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-02T08:00:00.000000Z",
      "record_status": "A"
    },
    "document": "00000000000000000000000cdoc",
    "document_type": "Discharge Orders",
    "document_status": "in review",
    "claimed_by": { "name": "Khushi C.", "initials": "KC" },
    "file": {
      "original_file_name": "301644_Referral_CarlosIbrahim_20260802_822599.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-02T08:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Carlos Ibrahim, ICD-10 I10.",
                "confidence_score": 89,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Male",
            "confidence_score": 92,
            "page_number": 1,
            "source_line": "Male",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "CO",
            "confidence_score": 90,
            "page_number": 4,
            "source_line": "CO",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10444",
            "confidence_score": 90,
            "page_number": 3,
            "source_line": "HC10444",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "342-516-5227",
            "confidence_score": 71,
            "page_number": 4,
            "source_line": "342-516-5227",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "232 Prescriber Ave",
            "confidence_score": null,
            "page_number": 1,
            "source_line": "232 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 76,
            "page_number": 1,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Carlos",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "Carlos",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Aurora",
            "confidence_score": 85,
            "page_number": 4,
            "source_line": "Aurora",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "80010",
            "confidence_score": 92,
            "page_number": 4,
            "source_line": "80010",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "11/23/1985",
            "confidence_score": 98,
            "page_number": 1,
            "source_line": "11/23/1985",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "62",
            "confidence_score": 76,
            "page_number": 2,
            "source_line": "62",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "113",
            "confidence_score": 70,
            "page_number": 1,
            "source_line": "113",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Ibrahim",
            "confidence_score": 93,
            "page_number": 2,
            "source_line": "Ibrahim",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-02",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "2026-08-02",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "ct-013",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": "Selected by reviewer."
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Priority II",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "Priority II",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Infusion Suite",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Infusion Suite",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Unknown",
            "confidence_score": 66,
            "page_number": 1,
            "source_line": "Unknown",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "United Healthcare",
            "confidence_score": 92,
            "page_number": 1,
            "source_line": "United Healthcare",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "Other",
            "confidence_score": 90,
            "page_number": 4,
            "source_line": "Other",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "Other - United Healthcare",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "Other - United Healthcare",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "156544170",
            "confidence_score": 85,
            "page_number": 1,
            "source_line": "156544170",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 96,
            "page_number": 1,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "VERMA",
            "confidence_score": 96,
            "page_number": 2,
            "source_line": "VERMA",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "CO",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "CO",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Neurology",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "Neurology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Aurora",
            "confidence_score": 92,
            "page_number": 2,
            "source_line": "Aurora",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "319-571-3687",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "319-571-3687",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "NARAYAN P",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "NARAYAN P",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "972-780-6470",
            "confidence_score": 81,
            "page_number": 3,
            "source_line": "972-780-6470",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 80,
            "page_number": 2,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "6056 Hoover Rd Suite D",
            "confidence_score": 88,
            "page_number": 4,
            "source_line": "6056 Hoover Rd Suite D",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "BG Tricounty Neurology and Sleep Clinic",
            "confidence_score": 96,
            "page_number": 2,
            "source_line": "BG Tricounty Neurology and Sleep Clinic",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "80010",
            "confidence_score": 89,
            "page_number": 1,
            "source_line": "80010",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 89,
            "page_number": 4,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": null
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Gammagard",
                "confidence_score": 90,
                "page_number": 2,
                "source_line": "Gammagard order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "0944-2700-03",
                "confidence_score": 59,
                "page_number": 2,
                "source_line": "0944-2700-03",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "45",
                "confidence_score": 97,
                "page_number": 4,
                "source_line": "45",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "gram",
                "confidence_score": 86,
                "page_number": 4,
                "source_line": "gram",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Weekly",
                "confidence_score": 94,
                "page_number": 2,
                "source_line": "Weekly",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "SubQ",
                "confidence_score": 91,
                "page_number": 4,
                "source_line": "SubQ",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "00000000000000000000000d",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-06T14:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-06T14:00:00.000000Z",
      "record_status": "A"
    },
    "document": "00000000000000000000000ddoc",
    "document_type": "Referral",
    "document_status": "processing",
    "file": {
      "original_file_name": "301781_Referral_SusanNakamura_20260806_887620.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "In Progress",
    "extraction_date": "2026-08-06T14:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Susan Nakamura, ICD-10 G61.81.",
                "confidence_score": 89,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Female",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "Female",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "MO",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "MO",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10481",
            "confidence_score": 94,
            "page_number": 3,
            "source_line": "HC10481",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "688-718-4307",
            "confidence_score": 72,
            "page_number": 1,
            "source_line": "688-718-4307",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "243 Prescriber Ave",
            "confidence_score": 96,
            "page_number": 3,
            "source_line": "243 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 78,
            "page_number": 3,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Susan",
            "confidence_score": 94,
            "page_number": 2,
            "source_line": "Susan",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Springfield",
            "confidence_score": 81,
            "page_number": 1,
            "source_line": "Springfield",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "65801",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "65801",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "05/19/1958",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "05/19/1958",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "71",
            "confidence_score": 89,
            "page_number": 1,
            "source_line": "71",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "134",
            "confidence_score": 97,
            "page_number": 4,
            "source_line": "134",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Nakamura",
            "confidence_score": 95,
            "page_number": 3,
            "source_line": "Nakamura",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-06",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "2026-08-06",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Priority I",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "Priority I",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Physician Office",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Physician Office",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Unknown",
            "confidence_score": 76,
            "page_number": 2,
            "source_line": "Unknown",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "BCBS Michigan",
            "confidence_score": 96,
            "page_number": 1,
            "source_line": "BCBS Michigan",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "PPO",
            "confidence_score": null,
            "page_number": 3,
            "source_line": "PPO",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "PPO - BCBS Michigan",
            "confidence_score": 92,
            "page_number": 4,
            "source_line": "PPO - BCBS Michigan",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "168919011",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "168919011",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 60,
            "page_number": 3,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "KLEIN",
            "confidence_score": 95,
            "page_number": 1,
            "source_line": "KLEIN",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "MO",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "MO",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Rheumatology",
            "confidence_score": 92,
            "page_number": 3,
            "source_line": "Rheumatology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Springfield",
            "confidence_score": 93,
            "page_number": 2,
            "source_line": "Springfield",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "239-462-6767",
            "confidence_score": 70,
            "page_number": 1,
            "source_line": "239-462-6767",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "SARAH J",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "SARAH J",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "303-348-6204",
            "confidence_score": 86,
            "page_number": 3,
            "source_line": "303-348-6204",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 94,
            "page_number": 1,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "8712 Hoover Rd Suite C",
            "confidence_score": 91,
            "page_number": 1,
            "source_line": "8712 Hoover Rd Suite C",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Great Lakes Rheumatology Associates",
            "confidence_score": 96,
            "page_number": 2,
            "source_line": "Great Lakes Rheumatology Associates",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "65801",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "65801",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1502401877",
            "confidence_score": 72,
            "page_number": 1,
            "source_line": "1502401877",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Cuvitru",
                "confidence_score": 93,
                "page_number": 2,
                "source_line": "Cuvitru order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "65597-401-06",
                "confidence_score": 81,
                "page_number": 2,
                "source_line": "65597-401-06",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "67",
                "confidence_score": 99,
                "page_number": 4,
                "source_line": "67",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mL",
                "confidence_score": 95,
                "page_number": 1,
                "source_line": "mL",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Weekly",
                "confidence_score": 80,
                "page_number": 2,
                "source_line": "Weekly",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "SubQ",
                "confidence_score": 81,
                "page_number": 2,
                "source_line": "SubQ",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "00000000000000000000000e",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-11T05:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-11T05:00:00.000000Z",
      "record_status": "A"
    },
    "document": "00000000000000000000000edoc",
    "document_type": "Referral",
    "document_status": "in review",
    "claimed_by": { "name": "R. Alvarez", "initials": "RA" },
    "file": {
      "original_file_name": "301918_Referral_ThomasPark_20260811_848394.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-11T05:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Thomas Park, ICD-10 I10.",
                "confidence_score": 69,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Male",
            "confidence_score": 92,
            "page_number": 3,
            "source_line": "Male",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "WI",
            "confidence_score": 93,
            "page_number": 2,
            "source_line": "WI",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10518",
            "confidence_score": 79,
            "page_number": 3,
            "source_line": "HC10518",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "371-466-9044",
            "confidence_score": 89,
            "page_number": 4,
            "source_line": "371-466-9044",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "254 Prescriber Ave",
            "confidence_score": 93,
            "page_number": 1,
            "source_line": "254 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 85,
            "page_number": 2,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Thomas",
            "confidence_score": 96,
            "page_number": 1,
            "source_line": "Thomas",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Madison",
            "confidence_score": 88,
            "page_number": 3,
            "source_line": "Madison",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "53703",
            "confidence_score": 94,
            "page_number": 2,
            "source_line": "53703",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "01/06/1992",
            "confidence_score": 91,
            "page_number": 4,
            "source_line": "01/06/1992",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "69",
            "confidence_score": 75,
            "page_number": 1,
            "source_line": "69",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "185",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "185",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Park",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "Park",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-11",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "2026-08-11",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Standard",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Standard",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Home",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Home",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Unknown",
            "confidence_score": 78,
            "page_number": 2,
            "source_line": "Unknown",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Aetna",
            "confidence_score": 92,
            "page_number": 2,
            "source_line": "Aetna",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "HMO",
            "confidence_score": 67,
            "page_number": 1,
            "source_line": "HMO",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "HMO - Aetna",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "HMO - Aetna",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "917417808",
            "confidence_score": 88,
            "page_number": 2,
            "source_line": "917417808",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 67,
            "page_number": 3,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "ONUOHA",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "ONUOHA",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "WI",
            "confidence_score": 90,
            "page_number": 3,
            "source_line": "WI",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Pulmonology",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "Pulmonology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Madison",
            "confidence_score": 85,
            "page_number": 2,
            "source_line": "Madison",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "881-472-5068",
            "confidence_score": 91,
            "page_number": 1,
            "source_line": "881-472-5068",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "MICHAEL T",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "MICHAEL T",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "564-732-8303",
            "confidence_score": 82,
            "page_number": 1,
            "source_line": "564-732-8303",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 87,
            "page_number": 3,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "7248 Hoover Rd Suite A",
            "confidence_score": 86,
            "page_number": 4,
            "source_line": "7248 Hoover Rd Suite A",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Midwest Pulmonary Care Center",
            "confidence_score": 90,
            "page_number": 2,
            "source_line": "Midwest Pulmonary Care Center",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "53703",
            "confidence_score": 77,
            "page_number": 2,
            "source_line": "53703",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 89,
            "page_number": 3,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1596313505",
            "confidence_score": 61,
            "page_number": 1,
            "source_line": "1596313505",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Hizentra",
                "confidence_score": 93,
                "page_number": 2,
                "source_line": "Hizentra order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "44206-451-06",
                "confidence_score": 88,
                "page_number": 4,
                "source_line": "44206-451-06",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "76",
                "confidence_score": 92,
                "page_number": 1,
                "source_line": "76",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mL",
                "confidence_score": 86,
                "page_number": 2,
                "source_line": "mL",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Once daily",
                "confidence_score": 84,
                "page_number": 4,
                "source_line": "Once daily",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "IVIG",
                "confidence_score": 78,
                "page_number": 1,
                "source_line": "IVIG",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "00000000000000000000000f",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-18T09:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-18T09:00:00.000000Z",
      "record_status": "A"
    },
    "document": "00000000000000000000000fdoc",
    "document_type": "Referral",
    "document_status": "in review",
    "claimed_by": { "name": "Khushi C.", "initials": "KC" },
    "file": {
      "original_file_name": "302055_Referral_JessicaWhitfield_20260818_720559.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-18T09:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Jessica Whitfield, ICD-10 G61.81.",
                "confidence_score": 69,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Female",
            "confidence_score": 97,
            "page_number": 4,
            "source_line": "Female",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "MN",
            "confidence_score": 90,
            "page_number": 4,
            "source_line": "MN",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10555",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "HC10555",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "605-253-6951",
            "confidence_score": 75,
            "page_number": 3,
            "source_line": "605-253-6951",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "265 Prescriber Ave",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "265 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 87,
            "page_number": 1,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Jessica",
            "confidence_score": 94,
            "page_number": 3,
            "source_line": "Jessica",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Duluth",
            "confidence_score": 91,
            "page_number": 1,
            "source_line": "Duluth",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "55802",
            "confidence_score": 98,
            "page_number": 2,
            "source_line": "55802",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "03/18/1970",
            "confidence_score": 86,
            "page_number": 1,
            "source_line": "03/18/1970",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "67",
            "confidence_score": 82,
            "page_number": 4,
            "source_line": "67",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "121",
            "confidence_score": 98,
            "page_number": 1,
            "source_line": "121",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Whitfield",
            "confidence_score": 78,
            "page_number": 3,
            "source_line": "Whitfield",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-18",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "2026-08-18",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "ct-001",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": "Selected by reviewer."
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Priority II",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "Priority II",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Physician Office",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "Physician Office",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Unknown",
            "confidence_score": 57,
            "page_number": 3,
            "source_line": "Unknown",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Cigna",
            "confidence_score": 95,
            "page_number": 2,
            "source_line": "Cigna",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "PPO",
            "confidence_score": 87,
            "page_number": 3,
            "source_line": "PPO",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "PPO - Cigna",
            "confidence_score": 94,
            "page_number": 2,
            "source_line": "PPO - Cigna",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "572421861",
            "confidence_score": 87,
            "page_number": 3,
            "source_line": "572421861",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 73,
            "page_number": 3,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "DESAI",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "DESAI",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "MN",
            "confidence_score": 99,
            "page_number": 2,
            "source_line": "MN",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Endocrinology",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "Endocrinology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Duluth",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "Duluth",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "827-689-8683",
            "confidence_score": 80,
            "page_number": 2,
            "source_line": "827-689-8683",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "ANITA R",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "ANITA R",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "799-605-1194",
            "confidence_score": 85,
            "page_number": 2,
            "source_line": "799-605-1194",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 90,
            "page_number": 4,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "5422 Hoover Rd Suite C",
            "confidence_score": 88,
            "page_number": 3,
            "source_line": "5422 Hoover Rd Suite C",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Cornerstone Endocrine Group",
            "confidence_score": null,
            "page_number": 1,
            "source_line": "Cornerstone Endocrine Group",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "55802",
            "confidence_score": 90,
            "page_number": 4,
            "source_line": "55802",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": null
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Xolair",
                "confidence_score": 95,
                "page_number": 2,
                "source_line": "Xolair order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "50242-040-62",
                "confidence_score": 56,
                "page_number": 2,
                "source_line": "50242-040-62",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "96",
                "confidence_score": 87,
                "page_number": 4,
                "source_line": "96",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mg",
                "confidence_score": 90,
                "page_number": 2,
                "source_line": "mg",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Every 2 weeks",
                "confidence_score": 97,
                "page_number": 3,
                "source_line": "Every 2 weeks",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "IVIG",
                "confidence_score": 97,
                "page_number": 4,
                "source_line": "IVIG",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000010",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-12T16:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-12T16:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000010doc",
    "document_type": "Referral",
    "document_status": "pending review",
    "file": {
      "original_file_name": "302192_Referral_DanielBennett_20260812_233455.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-12T16:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Daniel Bennett, ICD-10 I10.",
                "confidence_score": 60,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Male",
            "confidence_score": 98,
            "page_number": 1,
            "source_line": "Male",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "VA",
            "confidence_score": 99,
            "page_number": 2,
            "source_line": "VA",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10592",
            "confidence_score": 94,
            "page_number": 1,
            "source_line": "HC10592",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "588-663-8502",
            "confidence_score": 82,
            "page_number": 3,
            "source_line": "588-663-8502",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "276 Prescriber Ave",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "276 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 60,
            "page_number": 4,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Daniel",
            "confidence_score": 96,
            "page_number": 2,
            "source_line": "Daniel",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Norfolk",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "Norfolk",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "23510",
            "confidence_score": 96,
            "page_number": 2,
            "source_line": "23510",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "11/23/1990",
            "confidence_score": 95,
            "page_number": 3,
            "source_line": "11/23/1990",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "67",
            "confidence_score": 76,
            "page_number": 4,
            "source_line": "67",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "112",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "112",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Bennett",
            "confidence_score": 96,
            "page_number": 4,
            "source_line": "Bennett",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-12",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "2026-08-12",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Priority II",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Priority II",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Home",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Home",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Unknown",
            "confidence_score": 59,
            "page_number": 2,
            "source_line": "Unknown",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Humana",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "Humana",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "Medicare",
            "confidence_score": 64,
            "page_number": 2,
            "source_line": "Medicare",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "Medicare Advantage - Humana",
            "confidence_score": 92,
            "page_number": 4,
            "source_line": "Medicare Advantage - Humana",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "572621824",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "572621824",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 60,
            "page_number": 2,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "OSEI",
            "confidence_score": 97,
            "page_number": 1,
            "source_line": "OSEI",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "VA",
            "confidence_score": 98,
            "page_number": 2,
            "source_line": "VA",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Nephrology",
            "confidence_score": 94,
            "page_number": 3,
            "source_line": "Nephrology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Norfolk",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "Norfolk",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "846-360-9586",
            "confidence_score": 96,
            "page_number": 2,
            "source_line": "846-360-9586",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "BRIAN K",
            "confidence_score": 95,
            "page_number": 4,
            "source_line": "BRIAN K",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "386-261-2746",
            "confidence_score": 81,
            "page_number": 4,
            "source_line": "386-261-2746",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": null,
            "page_number": 1,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "5988 Hoover Rd Suite D",
            "confidence_score": 94,
            "page_number": 1,
            "source_line": "5988 Hoover Rd Suite D",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Riverside Kidney & Hypertension",
            "confidence_score": 93,
            "page_number": 2,
            "source_line": "Riverside Kidney & Hypertension",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "23510",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "23510",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 99,
            "page_number": 2,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1616830021",
            "confidence_score": 67,
            "page_number": 2,
            "source_line": "1616830021",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Orencia",
                "confidence_score": 98,
                "page_number": 2,
                "source_line": "Orencia order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "0003-2188-11",
                "confidence_score": 56,
                "page_number": 1,
                "source_line": "0003-2188-11",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "31",
                "confidence_score": 92,
                "page_number": 4,
                "source_line": "31",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mg",
                "confidence_score": 97,
                "page_number": 1,
                "source_line": "mg",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Once daily",
                "confidence_score": 88,
                "page_number": 3,
                "source_line": "Once daily",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "IV",
                "confidence_score": 81,
                "page_number": 3,
                "source_line": "IV",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000011",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-16T11:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-16T11:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000011doc",
    "document_type": "Referral",
    "document_status": "pending review",
    "file": {
      "original_file_name": "302329_Referral_KarenKowalski_20260816_710542.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-16T11:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Karen Kowalski, ICD-10 G61.81.",
                "confidence_score": 88,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Female",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "Female",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "TN",
            "confidence_score": 96,
            "page_number": 1,
            "source_line": "TN",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10629",
            "confidence_score": 99,
            "page_number": 2,
            "source_line": "HC10629",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "455-428-1720",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "455-428-1720",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "287 Prescriber Ave",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "287 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 79,
            "page_number": 3,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Karen",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "Karen",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Knoxville",
            "confidence_score": 91,
            "page_number": 2,
            "source_line": "Knoxville",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "37902",
            "confidence_score": 96,
            "page_number": 4,
            "source_line": "37902",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "11/04/1962",
            "confidence_score": 72,
            "page_number": 2,
            "source_line": "11/04/1962",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "65",
            "confidence_score": 75,
            "page_number": 1,
            "source_line": "65",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "184",
            "confidence_score": 81,
            "page_number": 1,
            "source_line": "184",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Kowalski",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "Kowalski",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-16",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "2026-08-16",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Priority I",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "Priority I",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Infusion Suite",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Infusion Suite",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Unknown",
            "confidence_score": 73,
            "page_number": 3,
            "source_line": "Unknown",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Medicaid MI",
            "confidence_score": 90,
            "page_number": 3,
            "source_line": "Medicaid MI",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "Medicaid",
            "confidence_score": 76,
            "page_number": 2,
            "source_line": "Medicaid",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "State Medicaid",
            "confidence_score": 87,
            "page_number": 1,
            "source_line": "State Medicaid",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "310771500",
            "confidence_score": 98,
            "page_number": 2,
            "source_line": "310771500",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 84,
            "page_number": 2,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "PETROVA",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "PETROVA",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "TN",
            "confidence_score": 96,
            "page_number": 2,
            "source_line": "TN",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Neurology",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "Neurology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Knoxville",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "Knoxville",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "923-467-8214",
            "confidence_score": 91,
            "page_number": 2,
            "source_line": "923-467-8214",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "ELENA M",
            "confidence_score": 95,
            "page_number": 2,
            "source_line": "ELENA M",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "968-325-9405",
            "confidence_score": 88,
            "page_number": 4,
            "source_line": "968-325-9405",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 74,
            "page_number": 3,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "1245 Hoover Rd Suite D",
            "confidence_score": 96,
            "page_number": 2,
            "source_line": "1245 Hoover Rd Suite D",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Lakeside Neurology Partners",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "Lakeside Neurology Partners",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "37902",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "37902",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 95,
            "page_number": 3,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1207043572",
            "confidence_score": 77,
            "page_number": 3,
            "source_line": "1207043572",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Remicade",
                "confidence_score": 96,
                "page_number": 2,
                "source_line": "Remicade order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "57894-030-01",
                "confidence_score": 75,
                "page_number": 4,
                "source_line": "57894-030-01",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "90",
                "confidence_score": 98,
                "page_number": 2,
                "source_line": "90",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mg",
                "confidence_score": 87,
                "page_number": 1,
                "source_line": "mg",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Once monthly",
                "confidence_score": 91,
                "page_number": 3,
                "source_line": "Once monthly",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "SubQ",
                "confidence_score": 84,
                "page_number": 2,
                "source_line": "SubQ",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000012",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-09T01:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-09T01:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000012doc",
    "document_type": "Referral",
    "document_status": "processing",
    "file": {
      "original_file_name": "302466_Referral_AnthonyDouglas_20260809_290481.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "In Progress",
    "extraction_date": "2026-08-09T01:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Anthony Douglas, ICD-10 I10.",
                "confidence_score": 74,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Male",
            "confidence_score": 90,
            "page_number": 4,
            "source_line": "Male",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "IN",
            "confidence_score": 76,
            "page_number": 3,
            "source_line": "IN",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10666",
            "confidence_score": 90,
            "page_number": 3,
            "source_line": "HC10666",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "844-853-3943",
            "confidence_score": 74,
            "page_number": 4,
            "source_line": "844-853-3943",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "298 Prescriber Ave",
            "confidence_score": 89,
            "page_number": 4,
            "source_line": "298 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 78,
            "page_number": 3,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Anthony",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "Anthony",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Fort Wayne",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "Fort Wayne",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "46802",
            "confidence_score": 91,
            "page_number": 1,
            "source_line": "46802",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "11/04/2002",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "11/04/2002",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "62",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "62",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "166",
            "confidence_score": 72,
            "page_number": 3,
            "source_line": "166",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Douglas",
            "confidence_score": 98,
            "page_number": 4,
            "source_line": "Douglas",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-09",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "2026-08-09",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "ct-005",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": "Selected by reviewer."
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Standard",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "Standard",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Physician Office",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Physician Office",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Unknown",
            "confidence_score": 63,
            "page_number": 4,
            "source_line": "Unknown",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "United Healthcare",
            "confidence_score": 90,
            "page_number": 3,
            "source_line": "United Healthcare",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "Other",
            "confidence_score": 65,
            "page_number": 2,
            "source_line": "Other",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "Other - United Healthcare",
            "confidence_score": 88,
            "page_number": 1,
            "source_line": "Other - United Healthcare",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "280443448",
            "confidence_score": 91,
            "page_number": 1,
            "source_line": "280443448",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 74,
            "page_number": 2,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "VERMA",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "VERMA",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "IN",
            "confidence_score": 93,
            "page_number": 1,
            "source_line": "IN",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Neurology",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "Neurology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Fort Wayne",
            "confidence_score": 95,
            "page_number": 3,
            "source_line": "Fort Wayne",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "336-924-3324",
            "confidence_score": 87,
            "page_number": 3,
            "source_line": "336-924-3324",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "NARAYAN P",
            "confidence_score": 93,
            "page_number": 4,
            "source_line": "NARAYAN P",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "978-373-3536",
            "confidence_score": 94,
            "page_number": 4,
            "source_line": "978-373-3536",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 83,
            "page_number": 3,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "1202 Hoover Rd Suite C",
            "confidence_score": 85,
            "page_number": 1,
            "source_line": "1202 Hoover Rd Suite C",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "BG Tricounty Neurology and Sleep Clinic",
            "confidence_score": 94,
            "page_number": 2,
            "source_line": "BG Tricounty Neurology and Sleep Clinic",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "46802",
            "confidence_score": 89,
            "page_number": 4,
            "source_line": "46802",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 87,
            "page_number": 3,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": null
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Gammagard",
                "confidence_score": 99,
                "page_number": 2,
                "source_line": "Gammagard order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "0944-2700-03",
                "confidence_score": 60,
                "page_number": 1,
                "source_line": "0944-2700-03",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "15",
                "confidence_score": 94,
                "page_number": 4,
                "source_line": "15",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "gram",
                "confidence_score": 96,
                "page_number": 3,
                "source_line": "gram",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Once monthly",
                "confidence_score": 85,
                "page_number": 4,
                "source_line": "Once monthly",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "SubQ",
                "confidence_score": 87,
                "page_number": 3,
                "source_line": "SubQ",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000013",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-21T01:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-21T01:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000013doc",
    "document_type": "Referral",
    "document_status": "reviewed",
    "file": {
      "original_file_name": "302603_Referral_NancySchmidt_20260821_399864.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-21T01:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Nancy Schmidt, ICD-10 G61.81.",
                "confidence_score": 65,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Female",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "Female",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "MA",
            "confidence_score": 92,
            "page_number": 3,
            "source_line": "MA",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10703",
            "confidence_score": 98,
            "page_number": 2,
            "source_line": "HC10703",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "304-936-6084",
            "confidence_score": 80,
            "page_number": 4,
            "source_line": "304-936-6084",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "309 Prescriber Ave",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "309 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 71,
            "page_number": 2,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Nancy",
            "confidence_score": 97,
            "page_number": 3,
            "source_line": "Nancy",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Worcester",
            "confidence_score": 85,
            "page_number": 1,
            "source_line": "Worcester",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "01608",
            "confidence_score": 96,
            "page_number": 1,
            "source_line": "01608",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "02/21/2003",
            "confidence_score": 97,
            "page_number": 4,
            "source_line": "02/21/2003",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "75",
            "confidence_score": 79,
            "page_number": 1,
            "source_line": "75",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "146",
            "confidence_score": 75,
            "page_number": 2,
            "source_line": "146",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Schmidt",
            "confidence_score": 98,
            "page_number": 1,
            "source_line": "Schmidt",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-21",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "2026-08-21",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Priority II",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "Priority II",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Home",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "Home",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Active",
            "confidence_score": 96,
            "page_number": 4,
            "source_line": "Active",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "BCBS Michigan",
            "confidence_score": 91,
            "page_number": 1,
            "source_line": "BCBS Michigan",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "PPO",
            "confidence_score": 81,
            "page_number": 3,
            "source_line": "PPO",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "PPO - BCBS Michigan",
            "confidence_score": null,
            "page_number": 2,
            "source_line": "PPO - BCBS Michigan",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "878196229",
            "confidence_score": 89,
            "page_number": 1,
            "source_line": "878196229",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 77,
            "page_number": 2,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "KLEIN",
            "confidence_score": 97,
            "page_number": 4,
            "source_line": "KLEIN",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "MA",
            "confidence_score": 98,
            "page_number": 2,
            "source_line": "MA",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Rheumatology",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "Rheumatology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Worcester",
            "confidence_score": 90,
            "page_number": 3,
            "source_line": "Worcester",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "823-874-5866",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "823-874-5866",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "SARAH J",
            "confidence_score": 94,
            "page_number": 3,
            "source_line": "SARAH J",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "551-743-1456",
            "confidence_score": 87,
            "page_number": 4,
            "source_line": "551-743-1456",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 84,
            "page_number": 3,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "7821 Hoover Rd Suite C",
            "confidence_score": 94,
            "page_number": 4,
            "source_line": "7821 Hoover Rd Suite C",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Great Lakes Rheumatology Associates",
            "confidence_score": 91,
            "page_number": 2,
            "source_line": "Great Lakes Rheumatology Associates",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "01608",
            "confidence_score": 99,
            "page_number": 2,
            "source_line": "01608",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 86,
            "page_number": 2,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1925751895",
            "confidence_score": 66,
            "page_number": 2,
            "source_line": "1925751895",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Cuvitru",
                "confidence_score": 94,
                "page_number": 2,
                "source_line": "Cuvitru order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "65597-401-06",
                "confidence_score": 64,
                "page_number": 4,
                "source_line": "65597-401-06",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "38",
                "confidence_score": 96,
                "page_number": 1,
                "source_line": "38",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mL",
                "confidence_score": 99,
                "page_number": 1,
                "source_line": "mL",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Weekly",
                "confidence_score": 95,
                "page_number": 4,
                "source_line": "Weekly",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "IV",
                "confidence_score": 87,
                "page_number": 1,
                "source_line": "IV",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000014",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-07-31T13:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-07-31T13:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000014doc",
    "document_type": "Referral",
    "document_status": "pending review",
    "file": {
      "original_file_name": "302740_Referral_StevenDelgado_20260731_970539.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-07-31T13:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Steven Delgado, ICD-10 I10.",
                "confidence_score": 72,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Male",
            "confidence_score": 91,
            "page_number": 2,
            "source_line": "Male",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "OR",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "OR",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10740",
            "confidence_score": 90,
            "page_number": 3,
            "source_line": "HC10740",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "242-215-4491",
            "confidence_score": 67,
            "page_number": 2,
            "source_line": "242-215-4491",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "320 Prescriber Ave",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "320 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 87,
            "page_number": 2,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Steven",
            "confidence_score": 97,
            "page_number": 2,
            "source_line": "Steven",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Salem",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "Salem",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "97301",
            "confidence_score": 90,
            "page_number": 3,
            "source_line": "97301",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "02/15/1977",
            "confidence_score": 95,
            "page_number": 3,
            "source_line": "02/15/1977",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "75",
            "confidence_score": 73,
            "page_number": 3,
            "source_line": "75",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "250",
            "confidence_score": 89,
            "page_number": 1,
            "source_line": "250",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Delgado",
            "confidence_score": 77,
            "page_number": 3,
            "source_line": "Delgado",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-07-31",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "2026-07-31",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": ""
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Standard",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "Standard",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Home",
            "confidence_score": 0,
            "page_number": 4,
            "source_line": "Home",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Active",
            "confidence_score": 86,
            "page_number": 1,
            "source_line": "Active",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Aetna",
            "confidence_score": 74,
            "page_number": 3,
            "source_line": "Aetna",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "HMO",
            "confidence_score": 79,
            "page_number": 2,
            "source_line": "HMO",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "HMO - Aetna",
            "confidence_score": 89,
            "page_number": 3,
            "source_line": "HMO - Aetna",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "576836982",
            "confidence_score": 74,
            "page_number": 4,
            "source_line": "576836982",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 57,
            "page_number": 1,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "ONUOHA",
            "confidence_score": 90,
            "page_number": 4,
            "source_line": "ONUOHA",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "OR",
            "confidence_score": 92,
            "page_number": 4,
            "source_line": "OR",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Pulmonology",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "Pulmonology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Salem",
            "confidence_score": 98,
            "page_number": 2,
            "source_line": "Salem",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "518-334-1715",
            "confidence_score": 91,
            "page_number": 4,
            "source_line": "518-334-1715",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "MICHAEL T",
            "confidence_score": 99,
            "page_number": 4,
            "source_line": "MICHAEL T",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "562-521-1098",
            "confidence_score": 95,
            "page_number": 3,
            "source_line": "562-521-1098",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 87,
            "page_number": 4,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "1743 Hoover Rd Suite B",
            "confidence_score": 87,
            "page_number": 3,
            "source_line": "1743 Hoover Rd Suite B",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Midwest Pulmonary Care Center",
            "confidence_score": 91,
            "page_number": 3,
            "source_line": "Midwest Pulmonary Care Center",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "97301",
            "confidence_score": 94,
            "page_number": 2,
            "source_line": "97301",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 85,
            "page_number": 1,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": {
            "value": "1936713798",
            "confidence_score": 87,
            "page_number": 1,
            "source_line": "1936713798",
            "explanation": "Extracted from source document."
          }
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Hizentra",
                "confidence_score": 94,
                "page_number": 2,
                "source_line": "Hizentra order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "44206-451-06",
                "confidence_score": 65,
                "page_number": 2,
                "source_line": "44206-451-06",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "97",
                "confidence_score": 80,
                "page_number": 3,
                "source_line": "97",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mL",
                "confidence_score": 95,
                "page_number": 2,
                "source_line": "mL",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Once monthly",
                "confidence_score": 92,
                "page_number": 4,
                "source_line": "Once monthly",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "SubQ",
                "confidence_score": 80,
                "page_number": 4,
                "source_line": "SubQ",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  },
  {
    "_id": "000000000000000000000015",
    "client_id": "695ccfc8f7f03b3c628630db",
    "audit_data": {
      "create_user_id": "0",
      "create_ts": "2026-08-05T01:00:00.000000+05:30",
      "update_user_id": "0",
      "update_ts": "2026-08-05T01:00:00.000000Z",
      "record_status": "A"
    },
    "document": "000000000000000000000015doc",
    "document_type": "Referral",
    "document_status": "in review",
    "claimed_by": { "name": "R. Alvarez", "initials": "RA" },
    "file": {
      "original_file_name": "302877_Referral_LisaReyes_20260805_346221.PDF",
      "file_url": "assets/images/document-preview-placeholder.svg"
    },
    "extraction_method": "AI Extraction",
    "extraction_status": "Complete",
    "extraction_date": "2026-08-05T01:00:00",
    "extracted_data": [
      {
        "patient_information": {
          "language": {
            "value": "English",
            "confidence_score": 0,
            "page_number": 3,
            "source_line": "English",
            "explanation": "Defaulted from intake field default"
          },
          "medical_history": {
            "value": [
              {
                "value": "Diagnosis: Sample clinical history entry for Lisa Reyes, ICD-10 G61.81.",
                "confidence_score": 73,
                "page_number": 1,
                "source_line": "History and physical section",
                "explanation": "Summarized from H&P section."
              }
            ]
          },
          "gender": {
            "value": "Female",
            "confidence_score": 84,
            "page_number": 4,
            "source_line": "Female",
            "explanation": "Extracted from source document."
          },
          "patient_state": {
            "value": "SC",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "SC",
            "explanation": "Extracted from source document."
          },
          "patient_id": {
            "value": "HC10777",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "HC10777",
            "explanation": "Extracted from source document."
          },
          "patient_cell_phone": {
            "value": "347-508-6054",
            "confidence_score": 96,
            "page_number": 3,
            "source_line": "347-508-6054",
            "explanation": "Extracted from source document."
          },
          "patient_home_phone": null,
          "patient_street_address": {
            "value": "331 Prescriber Ave",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "331 Prescriber Ave",
            "explanation": "Extracted from source document."
          },
          "patient_country": {
            "value": "US",
            "confidence_score": 69,
            "page_number": 3,
            "source_line": "US",
            "explanation": "Extracted from source document."
          },
          "patient_first_name": {
            "value": "Lisa",
            "confidence_score": 97,
            "page_number": 4,
            "source_line": "Lisa",
            "explanation": "Extracted from source document."
          },
          "patient_city": {
            "value": "Columbia",
            "confidence_score": 99,
            "page_number": 1,
            "source_line": "Columbia",
            "explanation": "Extracted from source document."
          },
          "patient_zip": {
            "value": "29201",
            "confidence_score": 95,
            "page_number": 2,
            "source_line": "29201",
            "explanation": "Extracted from source document."
          },
          "dob": {
            "value": "04/26/2002",
            "confidence_score": 94,
            "page_number": 1,
            "source_line": "04/26/2002",
            "explanation": "Extracted from source document."
          },
          "patient_height": {
            "value": "65",
            "confidence_score": 77,
            "page_number": 1,
            "source_line": "65",
            "explanation": "Extracted from source document."
          },
          "patient_weight": {
            "value": "165",
            "confidence_score": 98,
            "page_number": 3,
            "source_line": "165",
            "explanation": "Extracted from source document."
          },
          "patient_last_name": {
            "value": "Reyes",
            "confidence_score": 93,
            "page_number": 2,
            "source_line": "Reyes",
            "explanation": "Extracted from source document."
          },
          "referral_date": {
            "value": "2026-08-05",
            "confidence_score": 0,
            "page_number": 2,
            "source_line": "2026-08-05",
            "explanation": "Extracted from source document."
          },
          "referral_source": {
            "value": "ct-010",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "",
            "explanation": "Selected by reviewer."
          },
          "team": {
            "value": "SoleoRx Intake",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "SoleoRx Intake",
            "explanation": "Extracted from source document."
          },
          "category": {
            "value": "Priority I",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "Priority I",
            "explanation": "Extracted from source document."
          },
          "site_of_service": {
            "value": "Home",
            "confidence_score": 0,
            "page_number": 1,
            "source_line": "Home",
            "explanation": "Extracted from source document."
          }
        },
        "insurance_information": {
          "coverage_status": {
            "value": "Pending",
            "confidence_score": 63,
            "page_number": 1,
            "source_line": "Pending",
            "explanation": "Extracted from source document."
          },
          "payer_name": {
            "value": "Cigna",
            "confidence_score": 98,
            "page_number": 1,
            "source_line": "Cigna",
            "explanation": "Extracted from source document."
          },
          "plan_type": {
            "value": "PPO",
            "confidence_score": 56,
            "page_number": 2,
            "source_line": "PPO",
            "explanation": "Extracted from source document."
          },
          "plan_name": {
            "value": "PPO - Cigna",
            "confidence_score": 98,
            "page_number": 1,
            "source_line": "PPO - Cigna",
            "explanation": "Extracted from source document."
          },
          "subscriber_id": {
            "value": "796786634",
            "confidence_score": 94,
            "page_number": 3,
            "source_line": "796786634",
            "explanation": "Extracted from source document."
          },
          "subscriber_relationship": {
            "value": "Self",
            "confidence_score": 81,
            "page_number": 1,
            "source_line": "Self",
            "explanation": "Extracted from source document."
          }
        },
        "provider_information": {
          "provider_last_name": {
            "value": "DESAI",
            "confidence_score": 97,
            "page_number": 4,
            "source_line": "DESAI",
            "explanation": "Extracted from source document."
          },
          "state": {
            "value": "SC",
            "confidence_score": 96,
            "page_number": 3,
            "source_line": "SC",
            "explanation": "Extracted from source document."
          },
          "specialty": {
            "value": "Endocrinology",
            "confidence_score": 90,
            "page_number": 1,
            "source_line": "Endocrinology",
            "explanation": "Extracted from source document."
          },
          "city": {
            "value": "Columbia",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "Columbia",
            "explanation": "Extracted from source document."
          },
          "fax": {
            "value": "257-625-6393",
            "confidence_score": 80,
            "page_number": 2,
            "source_line": "257-625-6393",
            "explanation": "Extracted from source document."
          },
          "provider_first_name": {
            "value": "ANITA R",
            "confidence_score": 93,
            "page_number": 3,
            "source_line": "ANITA R",
            "explanation": "Extracted from source document."
          },
          "provider_phone": {
            "value": "570-633-6637",
            "confidence_score": 98,
            "page_number": 2,
            "source_line": "570-633-6637",
            "explanation": "Extracted from source document."
          },
          "prof_designation": {
            "value": "MD",
            "confidence_score": 99,
            "page_number": 3,
            "source_line": "MD",
            "explanation": "Extracted from source document."
          },
          "address": {
            "value": "4768 Hoover Rd Suite C",
            "confidence_score": 92,
            "page_number": 1,
            "source_line": "4768 Hoover Rd Suite C",
            "explanation": "Extracted from source document."
          },
          "organization_name": {
            "value": "Cornerstone Endocrine Group",
            "confidence_score": 94,
            "page_number": 4,
            "source_line": "Cornerstone Endocrine Group",
            "explanation": "Extracted from source document."
          },
          "zip": {
            "value": "29201",
            "confidence_score": 90,
            "page_number": 3,
            "source_line": "29201",
            "explanation": "Extracted from source document."
          },
          "provider_role": {
            "value": "Prescriber",
            "confidence_score": 85,
            "page_number": 4,
            "source_line": "Prescriber",
            "explanation": "Extracted from source document."
          },
          "provider_npi": null
        },
        "medication_information": {
          "value": [
            {
              "drug_name": {
                "value": "Xolair",
                "confidence_score": 95,
                "page_number": 2,
                "source_line": "Xolair order line",
                "explanation": "Extracted from source document."
              },
              "ndc": {
                "value": "50242-040-62",
                "confidence_score": 90,
                "page_number": 2,
                "source_line": "50242-040-62",
                "explanation": "Extracted from source document."
              },
              "strength": {
                "value": "61",
                "confidence_score": 86,
                "page_number": 1,
                "source_line": "61",
                "explanation": "Extracted from source document."
              },
              "unit": {
                "value": "mg",
                "confidence_score": 86,
                "page_number": 1,
                "source_line": "mg",
                "explanation": "Extracted from source document."
              },
              "frequency": {
                "value": "Every 2 weeks",
                "confidence_score": 75,
                "page_number": 3,
                "source_line": "Every 2 weeks",
                "explanation": "Extracted from source document."
              },
              "route": {
                "value": "IVIG",
                "confidence_score": 74,
                "page_number": 2,
                "source_line": "IVIG",
                "explanation": "Extracted from source document."
              }
            }
          ]
        },
        "unmapped": {}
      }
    ]
  }
];
