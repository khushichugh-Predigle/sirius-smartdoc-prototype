// Trimmed from intake referral form.json — large real option lists (some
// with 8,000+ entries: cities, ICD-10 codes, NDC drug codes) are sampled down
// to a small representative set. Field structure/types/labels are unchanged.
window.INTAKE_FORM_SCHEMA = {
  "formId": "b7d0b37e-758e-4219-ad9b-814480374768",
  "title": "Intake Referral Form",
  "description": "No description added yet.",
  "version": "26.0",
  "sections": [
    {
      "id": "636c9459-b781-47ee-af35-a4993482663b",
      "title": "Patient Demographics",
      "subtitle": "",
      "description": "",
      "order": 1,
      "fields": [],
      "subsections": [
        {
          "id": "11aabb81-5d52-4ac5-b0ea-b6d44a9974b3",
          "title": "Patient Information",
          "description": "",
          "order": 1,
          "icon": "",
          "fields": [
            {
              "key": "068d5684-dae6-4c5b-9331-1807b98fe2f9",
              "type": "text",
              "label": "First Name",
              "required": true,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 1,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "d85030eb-368b-44fa-b82e-c1a441ba9774",
              "type": "text",
              "label": "Last Name",
              "required": true,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 2,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "46d36528-d5f8-43ff-9c32-154c1c0b1614",
              "type": "text",
              "label": "Address",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 3,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "d1d1d778-f0ae-4c85-8818-fb6491118f3d",
              "type": "text",
              "label": "ZIP",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 4,
              "placeholder": "",
              "layout": {
                "col": 6
              },
              "options": [],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "format": "",
              "pattern": "",
              "nestedFields": []
            },
            {
              "key": "adaf8089-5f76-40fa-a265-1b8804d54d2f",
              "type": "select",
              "label": "City",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 5,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "f3ae6868-eb2e-4d77-b65b-050007c9b081",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "29 Palms"
                },
                {
                  "key": "efc9f92d-22e1-47be-9324-defcce40b9b9",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Abbeville"
                },
                {
                  "key": "12f95723-0854-44e0-b84c-e81da4f8fdbd",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Abbottstown"
                },
                {
                  "key": "de512101-5a62-45d0-9bb7-5545447d3760",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Aberdeen"
                },
                {
                  "key": "15d75615-e51b-42dd-8c04-9987baffdcff",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Abilene"
                },
                {
                  "key": "f636af6b-3e91-4f36-b62b-e4bee0c7561d",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Abingdon"
                },
                {
                  "key": "a392fa62-cf18-4cdc-86c9-09e8bf4276f5",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Abington"
                },
                {
                  "key": "4e3f32b4-86c7-405d-bb6a-d12be3905d70",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Carnesville"
                },
                {
                  "key": "6e8dd53b-ed21-4682-9b28-63c51ff67533",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Eastpointe"
                },
                {
                  "key": "9d227e51-df1d-41ba-ab5e-1144d941b319",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Hayesville"
                },
                {
                  "key": "c53ef98d-4abe-4b7a-957a-20b133a15ad2",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Los Molinos"
                },
                {
                  "key": "28c83ee6-e203-4283-a894-4254d45d9362",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Normalville"
                },
                {
                  "key": "a89aff62-b832-48b7-8aed-ac07c9f6974e",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Roanoke Rapids"
                },
                {
                  "key": "9ae97554-1e8c-41de-bca2-7db578c09d6a",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "TARBORO"
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "f5cd51ff-5300-476b-b1a9-b8bcb9ba6899",
              "type": "select",
              "label": "State",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 6,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "41db9d49-4be2-4251-b05d-794afe813c41",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Alabama"
                },
                {
                  "key": "260fed09-e57e-4c26-8b0f-e0e10e1885b2",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Alaska"
                },
                {
                  "key": "2af0b1a6-d188-492e-9e56-b6870c0bbea0",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Arizona"
                },
                {
                  "key": "86cb9f70-3fbe-4c84-87a6-f32677995308",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Arkansas"
                },
                {
                  "key": "75b9deaa-db47-4bdf-984f-b44025a202d2",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "California"
                },
                {
                  "key": "582a5988-1ba6-477c-9f94-771161d8a773",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Colorado"
                },
                {
                  "key": "f861ede9-0b6f-48f5-9e50-e930ebe33c4e",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Connecticut"
                },
                {
                  "key": "6a72bfaf-ec33-41c1-a57a-da76f0b3c518",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Hawaii"
                },
                {
                  "key": "514e9e16-9a9b-4f95-8e0b-65a5bbaa7e57",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Kentucky"
                },
                {
                  "key": "0af18f77-61ec-4def-b1d2-fe2d2960467f",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Michigan"
                },
                {
                  "key": "e55262f0-5ef5-432d-9bd0-67220231741d",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Nevada"
                },
                {
                  "key": "edfbdbd2-b267-4b20-bc60-24c286ef98cd",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "North Dakota"
                },
                {
                  "key": "46a5fb5c-7485-4258-a13b-d26e16f49b71",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Rhode Island"
                },
                {
                  "key": "87cba223-1b85-4b6a-9190-6ef53aeaf521",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Utah"
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "7f3e2800-dfe8-4ecc-af5c-aeb05b35e3e5",
              "type": "select",
              "label": "County",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 7,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "county-abbeville",
                  "label": "Abbeville",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "county-acadia",
                  "label": "Acadia",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "county-ada",
                  "label": "Ada",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "county-adair",
                  "label": "Adair",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "county-adams",
                  "label": "Adams",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "county-addison",
                  "label": "Addison",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "county-aiken",
                  "label": "Aiken",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "county-cabell",
                  "label": "Cabell",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "county-del-norte",
                  "label": "Del Norte",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "county-gunnison",
                  "label": "Gunnison",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "county-lanier",
                  "label": "Lanier",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "county-nassau",
                  "label": "Nassau",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "county-richmond",
                  "label": "Richmond",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "county-tallapoosa",
                  "label": "Tallapoosa",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "0e9f2314-706e-434d-a3ec-4e1cebfccc1e",
              "type": "text",
              "label": "Home Phone",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 8,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "format": "phone",
              "nestedFields": []
            },
            {
              "key": "f1384fc5-e69b-4ade-9360-528b84a0b931",
              "type": "text",
              "label": "Cell Phone",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 10,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "format": "phone",
              "nestedFields": []
            },
            {
              "key": "ffbb9585-4b51-4519-8a13-c6054c48c5f5",
              "type": "text",
              "label": "Work Phone",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 12,
              "placeholder": "Enter value",
              "pattern": "phone",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "format": "phone",
              "nestedFields": []
            },
            {
              "key": "2e304999-fcf8-4c09-841a-69f2bd5e989d",
              "type": "text",
              "label": "Email",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 14,
              "placeholder": "Enter value",
              "pattern": "email",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "f0a00661-5e44-441e-8fbc-0bd981ca32c8",
              "type": "select",
              "label": "Gender",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 15,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "gender-female",
                  "label": "Female",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "gender-male",
                  "label": "Male",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "gender-non-binary",
                  "label": "Non-Binary",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "gender-unknown-undisclosed",
                  "label": "Unknown/Undisclosed",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "gender-unspecified",
                  "label": "Unspecified",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "931d56c9-4835-4147-b007-5b93c858fc7c",
              "type": "date",
              "label": "DOB",
              "required": true,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 16,
              "placeholder": "",
              "format": "DD/MM/YYYY",
              "showAgeBadge": false,
              "maxYears": null,
              "disablePastDates": false,
              "disableFutureDates": false,
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "9b4afb47-9992-4878-892d-642f909264fb",
              "type": "text",
              "label": "SSN",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 17,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "format": "ssn",
              "nestedFields": []
            },
            {
              "key": "cda4433f-8231-454b-b726-48994c416af3",
              "type": "date",
              "label": "Referral Date",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 18,
              "placeholder": "",
              "format": "DD/MM/YYYY",
              "showAgeBadge": false,
              "maxYears": null,
              "disablePastDates": false,
              "disableFutureDates": false,
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "f7c1a2b3-9e4d-4a1f-8c6b-2d5e9f0a1b3c",
              "type": "select",
              "label": "Referral Source",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 19,
              "placeholder": "Search referral source…",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            }
          ],
          "subsections": []
        },
        {
          "id": "850b9d10-accb-4317-a594-4337a96e71fd",
          "title": "Miscellaneous",
          "description": "",
          "order": 2,
          "icon": "",
          "fields": [
            {
              "key": "8ccb8212-4191-4c20-9963-9a7b37061d6b",
              "type": "select",
              "label": "Patient Status",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 1,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "patient-status-active",
                  "label": "Active",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "patient-status-inactive",
                  "label": "Inactive",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "patient-status-pending",
                  "label": "Pending",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "patient-status-canceled",
                  "label": "Cancelled",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "patient-status-on-hold",
                  "label": "On Hold",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "acd8fa22-647c-4a6e-a81a-5c55ac7bedc2",
              "type": "select",
              "label": "Team",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 2,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "d77d242d-f529-409d-9882-aa38b896157d",
                  "label": "ATL Inotrope",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "6c63573d-7180-4901-80cb-4c4e5e94ae21",
                  "label": "Atlanta Group T",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "304df3d1-af0e-4ea1-8b17-36fc93d78e2e",
                  "label": "CHI Team 1",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "26a4ff6b-c715-47ba-b6d6-3d920a595322",
                  "label": "Denver Team 1",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "3665d5ea-835f-4c10-bdf0-b1c57bf13e03",
                  "label": "Denver Team 2",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "d27236da-4282-4264-aa6e-99e05860cc21",
                  "label": "Denver Team 3",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "99b5f74a-2ba0-4bb8-834d-4a0a50a45489",
                  "label": "DET Team 1",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "28c1bf46-4a5f-4df5-b29f-44ddac94b5a9",
                  "label": "LA Blue",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "a0e90a9b-656f-46b3-8e16-d1ae345055e3",
                  "label": "NY Acute",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "236cf713-6bc5-4669-970c-8b46829ca21e",
                  "label": "NY Labs",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "caee6403-25af-4efc-b599-8230f7904251",
                  "label": "PHL JJ",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "3d3b7e84-abce-45ce-90a4-2fdfdcedf4f2",
                  "label": "SoleoRx Dispense Only",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "38225a62-c31d-4e89-aa40-657253aa0933",
                  "label": "TCMC – Anti-infective",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "e7909a8d-d992-4e82-b022-e29cacddab35",
                  "label": "White Bag",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "27bf9806-ae70-4a00-af38-f0556c7c49a0",
              "type": "select",
              "label": "Site",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 3,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "1f705d0c-53bc-4423-a841-11e6d1ee75bc",
                  "label": "Do Not Use - Philadelphia - PA",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "45d01dfb-a7ef-41af-91cb-fdf66c8141d2",
                  "label": "Los Angeles - CA",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "82f71bfc-1455-46dd-9914-e87d855f64f3",
                  "label": "New York - NY",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "2745f496-a4fe-4e58-b48d-f2db06cb2c79",
                  "label": "Kansas City - KS",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "e6d83e69-8742-4b86-b1ec-6a0d4b859c71",
                  "label": "Do Not Use - Dallas - TX",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "bc6ef4c9-60b2-42b0-b9d8-7f77bb03d2dc",
                  "label": "Omaha - NE",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "7a3d30a9-95f8-4ebd-8d8d-83f857df6d61",
                  "label": "Columbus - OH",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "7d91686d-baf8-4f42-8bba-67b6f4d75b89",
                  "label": "Houston - TX",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "c6bdb4f3-a1d3-43fd-a287-05d7cb5a7557",
                  "label": "Do Not Use - FTW Pharmacy Serv",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "d3b9f77b-c2a9-4b9b-b96e-6a95ca1d47d0",
                  "label": "Virtis Health - Dallas",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "d7f78432-a0d8-40e3-b2b9-0f8e5ebaeebd",
                  "label": "Do Not Use - Veros Health",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "8c4d9e3f-0fd9-4f62-b8e4-0a1e8fc16d77",
                  "label": "Virtis Health - Sun City",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "9a4fc5ef-5e6b-43c2-b783-ef1f5f7207d4",
                  "label": "Virtis Health - Las Vegas",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "716b1456-9ec0-4d34-b19d-69b32bb9b12c",
                  "label": "St Louis - MO Soleo",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "1f9d3d93-759d-4059-a8fa-233eb58f7e8d",
              "type": "select",
              "label": "Company",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 4,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "company-01",
                  "label": "01",
                  "iconPath": "",
                  "description": "Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "company-01f",
                  "label": "01F",
                  "iconPath": "",
                  "description": "Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "company-01m",
                  "label": "01M",
                  "iconPath": "",
                  "description": "Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "company-01r",
                  "label": "01R",
                  "iconPath": "",
                  "description": "DNU Philadelphia Referral",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "company-01w",
                  "label": "01W",
                  "iconPath": "",
                  "description": "Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "company-02",
                  "label": "02",
                  "iconPath": "",
                  "description": "Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "company-02b",
                  "label": "02B",
                  "iconPath": "",
                  "description": "Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "company-06f",
                  "label": "06F",
                  "iconPath": "",
                  "description": "Biomed Kansas, Inc dba Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "company-10b",
                  "label": "10B",
                  "iconPath": "",
                  "description": "Soleo Health Inc",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "company-14fdfw",
                  "label": "14FDFW",
                  "iconPath": "",
                  "description": "Soleo Health Inc",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "company-20",
                  "label": "20",
                  "iconPath": "",
                  "description": "Soleo Health Inc.",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "company-24f",
                  "label": "24F",
                  "iconPath": "",
                  "description": "Soleo Health Inc",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "company-32",
                  "label": "32",
                  "iconPath": "",
                  "description": "Virtis Health, a Soleo Health Company",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "company-47",
                  "label": "47",
                  "iconPath": "",
                  "description": "Virtis Health, a Soleo Health Company",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "9bd256dc-f671-49a9-b0ce-5d054df53a24",
              "type": "select",
              "label": "Insurance Coordinator",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 5,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "insurance-coordinator-meg-riemer",
                  "label": "Meg Riemer",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "insurance-coordinator-jennifer-salvatore",
                  "label": "Jennifer Salvatore",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "insurance-coordinator-karen-skootsky",
                  "label": "Karen Skootsky",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "insurance-coordinator-karen-skootsky",
                  "label": "Karen Skootsky",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "insurance-coordinator-patient-transition",
                  "label": "Patient Transition",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "insurance-coordinator-mary-beth-masionis",
                  "label": "Mary Beth Masionis",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "insurance-coordinator-sharon-hinchley",
                  "label": "Sharon Hinchley",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "insurance-coordinator-daisy-gallegos",
                  "label": "Daisy Gallegos",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "insurance-coordinator-tara-monroe",
                  "label": "Tara Monroe",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "insurance-coordinator-robin-thomas",
                  "label": "Robin Thomas",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "insurance-coordinator-lisa-peterson",
                  "label": "Lisa Peterson",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "insurance-coordinator-sue-lee",
                  "label": "Sue Lee",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "insurance-coordinator-sydney-woolfolk",
                  "label": "Sydney Woolfolk",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "insurance-coordinator-terrence-chapman",
                  "label": "Terrence Chapman",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "32202f3c-3701-41af-8aea-97935da83132",
              "type": "select",
              "label": "Sales Rep",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 6,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "8182281d-f0f3-4d9a-99bd-185771b077d8",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Charlie Strunck"
                },
                {
                  "key": "eba67881-ffbc-44c4-97ce-c6131d4dbcfa",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Michelle Vacanti"
                },
                {
                  "key": "1b42d229-d563-4e27-bdda-8d245b11f442",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Victor Guerra"
                },
                {
                  "key": "b7278b6a-9808-483f-a65c-562fc80bca10",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Michael Zeplin"
                },
                {
                  "key": "cfba364f-1336-43ee-b2ca-508bb66da37c",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Marty Piper"
                },
                {
                  "key": "8edfe363-de74-4395-b63b-5f35ca88ddb9",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Amanda Matthews"
                },
                {
                  "key": "8972833b-23e8-450f-8622-0dc7ee73ff65",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Anne Marie Riley"
                },
                {
                  "key": "f6b28133-1bc9-41f9-aefa-e69769f9a398",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Nicole Braddock"
                },
                {
                  "key": "f8939d8f-4daf-4852-9bc0-945904a1377c",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Sean Tragesser"
                },
                {
                  "key": "7b732a4b-8e66-4e3c-8262-c4a5ab731e01",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Cara Callari"
                },
                {
                  "key": "c4dfe18c-cc37-4dca-8611-73cfd8fa54ef",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Jennifer Peacock"
                },
                {
                  "key": "fc15b795-fa14-412b-b12e-817662a990ad",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Lynn Snyder"
                },
                {
                  "key": "f700b34a-9b5a-47e4-b2f4-a843cd46c60a",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Angel Oliver"
                },
                {
                  "key": "16ed2681-0835-42f4-903b-81e36e631099",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": [],
                  "label": "Tim Gillespie"
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "0456e939-85f9-42c1-96f1-c121c63e4a86",
              "type": "select",
              "label": "Category",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 7,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "category-priority-i",
                  "label": "Priority I",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "category-priority-i-omil",
                  "label": "Priority I OMIL",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "category-priority-i-omod",
                  "label": "Priority I OMOD",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "category-priority-i-onf",
                  "label": "Priority I ONF",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "category-priority-i-osev",
                  "label": "Priority I OSEV",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "category-priority-i-pmil",
                  "label": "Priority I PMIL",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "category-priority-i-pmod",
                  "label": "Priority I PMOD",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "category-priority-i-psev",
                  "label": "Priority I PSEV",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "category-priority-ii",
                  "label": "Priority II",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "category-priority-iii",
                  "label": "Priority III",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "category-ref-inquiry",
                  "label": "Ref Inquiry",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "67a574d8-e1c6-49b0-94da-53c1571d00ac",
              "type": "select",
              "label": "Site of Service",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 8,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "site-of-service-home",
                  "label": "Home",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "site-of-service-md-office",
                  "label": "MD Office",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "site-of-service-other",
                  "label": "Other",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "site-of-service-outpatient-facility",
                  "label": "Outpatient Facility",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "site-of-service-snf-ltc",
                  "label": "SNF/LTC",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "f503c212-d1b0-40bd-8972-7ec1650f947c",
              "type": "select",
              "label": "Code Status",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 9,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "code-status-dnr",
                  "label": "DNR",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "code-status-full",
                  "label": "Full",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "43b50133-2c15-4ea4-9f3d-ccfe8a07fce6",
              "type": "select",
              "label": "Language",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 10,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "3f068bb4-716d-4236-8ffc-c81a733ff7c4",
                  "label": "American Sign",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "4ad45ba2-66ed-4886-b5b0-a94316936d7a",
                  "label": "Arabic",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "a2dc97ef-2b7b-4bdb-8178-fae93abc3f16",
                  "label": "Chinese",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "6aeac3cf-b552-4c53-91e4-8b396c5c9f0c",
                  "label": "English",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "4fba926c-1b43-41d5-b25e-46afe337007b",
                  "label": "French",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "57e25491-204e-450f-87cb-3f5fa562f3fc",
                  "label": "German",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "3491a14b-fa36-4591-aca7-4dcfd37ba4d1",
                  "label": "Greek",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "1c307a6b-bfa1-4b75-a86e-a9a253317838",
                  "label": "Haitian Creole",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "aa6fdd93-a516-4bbb-8dcc-29654b25f899",
                  "label": "Italian",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "b60446a5-18d3-48aa-b3f1-f32b6f6c5f61",
                  "label": "Japanese",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "056776d0-20ad-458b-af64-ca4a519278a4",
                  "label": "Korean",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "d5d0dd14-fa21-430e-8745-ba7458cb82d5",
                  "label": "Portuguese",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "c027e5e3-d94d-4279-8afe-bb75f881e537",
                  "label": "Spanish",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "cfa99407-a056-4a69-ab0b-5d0b97dd65f9",
              "type": "select",
              "label": "Tax",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 11,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "5e1e9b57-624e-4cba-a54e-4a9ebc86f710",
                  "label": "Direct",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "86727d03-81c5-47bc-937b-b3f3997984fa",
                  "label": "IAE",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "7b16e525-32ab-4731-9c08-869b7de9b6fb",
                  "label": "Rare",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "6c34a3f0-57ca-40c7-9bdd-914a31d2b13b",
                  "label": "UHC IAE",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "cf7ad1e4-6a63-47fb-848d-2593f79f42cb",
                  "label": "UHC Specialty",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            }
          ],
          "subsections": []
        },
        {
          "id": "d9ef1dfe-5ab6-4a1a-bb87-25e5816e5491",
          "title": "Contacts",
          "description": "",
          "order": 5,
          "icon": "",
          "fields": [
            {
              "key": "fba7574d-3600-4024-8509-8e2ac9a55bec",
              "type": "text",
              "label": "First Name",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 1,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "cf454a5d-ce42-41f3-9477-bbe25d553ffa",
              "type": "text",
              "label": "Last Name",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 2,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "ad2f638f-e865-49c2-a45f-713d4fe5de32",
              "type": "select",
              "label": "Relation",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 3,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "relation-aunt",
                  "label": "Aunt",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "relation-brother",
                  "label": "Brother",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "relation-conservator",
                  "label": "Conservator",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "relation-daughter",
                  "label": "Daughter",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "relation-father",
                  "label": "Father",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "relation-fiance",
                  "label": "Fiance",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "relation-fiancee",
                  "label": "Fiancee",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "relation-friend",
                  "label": "Friend",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "relation-grand-parent",
                  "label": "Grand Parent",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "relation-husband",
                  "label": "Husband",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "relation-nephew",
                  "label": "Nephew",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "relation-nurse",
                  "label": "Nurse",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "relation-self",
                  "label": "Self",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "relation-sister",
                  "label": "Sister",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "10c1e0de-7688-46d7-9e89-ca78f76ed46c",
              "type": "select",
              "label": "Contact Type",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 4,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "contact-type-both",
                  "label": "Both",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "contact-type-emergency",
                  "label": "Emergency",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "contact-type-other",
                  "label": "Other",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "contact-type-primary",
                  "label": "Primary",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "d7e1d527-03ed-43b2-a301-136dc338b20c",
              "type": "text",
              "label": "Home Phone",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 5,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "format": "phone",
              "nestedFields": []
            },
            {
              "key": "0e29db77-f684-45f8-b7c7-6c95b9285fc8",
              "type": "text",
              "label": "Cell Phone",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 6,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "format": "phone",
              "nestedFields": []
            },
            {
              "key": "e9e644bc-d1ce-495b-96b9-5c51b0d5f569",
              "type": "text",
              "label": "Work Phone",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 7,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "format": "phone",
              "nestedFields": []
            },
            {
              "key": "e9c90751-d6cc-40ed-a4b9-b32bc9ee9c77",
              "type": "text",
              "label": "Email",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 8,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "format": "",
              "nestedFields": []
            }
          ],
          "subsections": []
        }
      ],
      "footer": {
        "buttons": []
      }
    },
    {
      "id": "8b37b9d0-197b-47be-bb6e-b4cb05afd4a1",
      "title": "M.D./Providers",
      "subtitle": "",
      "description": "",
      "order": 2,
      "fields": [],
      "subsections": [
        {
          "id": "665a095d-5354-45e8-84d6-99ef88344c6a",
          "title": "Provider ",
          "description": "",
          "order": 1,
          "icon": "",
          "fields": [],
          "repeat": {
            "source": "providers",
            "serialField": "e94f749d-4267-4565-b59f-db1fbcdeea3a",
            "collapseAfterFirst": true,
            "dedupeBy": "252f2ce2-b0ec-4a3e-8304-8f25a84331e7"
          },
          "subsections": [
            {
              "id": "3bea65ea-c18b-4ace-9f1e-c308c5ade51a",
              "title": "Provider",
              "description": "",
              "order": 1,
              "icon": "",
              "fields": [
                {
                  "key": "e94f749d-4267-4565-b59f-db1fbcdeea3a",
                  "type": "text",
                  "label": "Seq #",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 1,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "ab665991-dd40-4a3e-8278-13275e7655fd",
                  "type": "text",
                  "label": "First Name",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 2,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "6fbf897d-f2a4-48ee-be94-bdc39bde01c1",
                  "type": "text",
                  "label": "Last Name",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 3,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "c1f4a7e2-5b93-4d18-9a26-7e3c8f0b1d45",
                  "type": "select",
                  "label": "Prof. Designation",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 4,
                  "placeholder": "Select value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [
                    {
                      "key": "opt-md",
                      "label": "MD",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-do",
                      "label": "DO",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-np",
                      "label": "NP",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-pa-c",
                      "label": "PA-C",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-rn",
                      "label": "RN",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-pharmd",
                      "label": "PharmD",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-facp",
                      "label": "FACP",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-faan",
                      "label": "FAAN",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-faasm",
                      "label": "FAASM",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-facc",
                      "label": "FACC",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-faap",
                      "label": "FAAP",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-dpm",
                      "label": "DPM",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-dds",
                      "label": "DDS",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-phd",
                      "label": "PhD",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    }
                  ],
                  "columns": [],
                  "nestedFields": [],
                  "metadata": {
                    "multiple": true
                  }
                },
                {
                  "key": "ee6ce8cd-88a9-47de-b8bb-cbbed641866c",
                  "type": "select",
                  "label": "Specialty",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 5,
                  "placeholder": "Select value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [
                    {
                      "key": "opt-allergy-immunology",
                      "label": "Allergy & Immunology",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-cardiology",
                      "label": "Cardiology",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-dermatology",
                      "label": "Dermatology",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-endocrinology",
                      "label": "Endocrinology",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-gastroenterology",
                      "label": "Gastroenterology",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-hematology-oncology",
                      "label": "Hematology/Oncology",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-hospitalist",
                      "label": "Hospitalist",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-infectious-disease",
                      "label": "Infectious Disease",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-internal-medicine",
                      "label": "Internal Medicine",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-nephrology",
                      "label": "Nephrology",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-neurology",
                      "label": "Neurology",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-oncology",
                      "label": "Oncology",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-pulmonology",
                      "label": "Pulmonology",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "opt-rheumatology",
                      "label": "Rheumatology",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    }
                  ],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "8bd66777-3bff-4206-b5de-b8d5b206f149",
                  "type": "select",
                  "label": "Site",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 6,
                  "placeholder": "",
                  "layout": {
                    "col": 12
                  },
                  "options": [
                    {
                      "key": "174787d3-dd26-414c-acaf-619ed92b468c",
                      "label": "(All Sites)",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "1f705d0c-53bc-4423-a841-11e6d1ee75bc",
                      "label": "Do Not Use - Philadelphia - PA",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "45d01dfb-a7ef-41af-91cb-fdf66c8141d2",
                      "label": "Los Angeles - CA",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "82f71bfc-1455-46dd-9914-e87d855f64f3",
                      "label": "New York - NY",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "2745f496-a4fe-4e58-b48d-f2db06cb2c79",
                      "label": "Kansas City - KS",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "e6d83e69-8742-4b86-b1ec-6a0d4b859c71",
                      "label": "Do Not Use - Dallas - TX",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "bc6ef4c9-60b2-42b0-b9d8-7f77bb03d2dc",
                      "label": "Omaha - NE",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "ee56b18d-5f08-4926-bd16-a3a2a8c7fc83",
                      "label": "Phoenix - AZ",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "932da90e-90d4-4ea3-b21f-02f2d3b05b90",
                      "label": "Dallas - TX Soleo",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "489c1f44-d563-4e54-8a84-c15b73bbbc2e",
                      "label": "Do Not Use - Veros Biologics",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "51b11752-a871-4540-a40b-7d54d96d0544",
                      "label": "Virtis Health - WI",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "b9b09d44-9656-4d18-981d-7048b804b1dd",
                      "label": "Virtis Health Distribution",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "a799b891-6c4b-42e3-9277-859c7a25dcb0",
                      "label": "Boise - ID",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    },
                    {
                      "key": "fdac63ef-f4f8-4c3a-9648-414d5c4d5386",
                      "label": "Jackson - MS",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": []
                    }
                  ],
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "4b030922-452d-4d4f-ac7a-9d6df6210b3c",
                  "type": "text",
                  "label": "Telephone",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 7,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "format": "phone",
                  "nestedFields": []
                },
                {
                  "key": "7737182c-5679-404d-8a04-6949f29f1fc6",
                  "type": "text",
                  "label": "Fax",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 8,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "format": "phone",
                  "nestedFields": []
                },
                {
                  "key": "b3ca6b80-8522-4540-8aab-b50c8a898244",
                  "type": "text",
                  "label": "Email",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 9,
                  "placeholder": "Enter value",
                  "pattern": "email",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "793b3d3f-e99e-400b-bd85-75fe321ebf78",
                  "type": "checkbox",
                  "label": "PECOS Enrolled",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 10,
                  "placeholder": "",
                  "pattern": "",
                  "layout": {
                    "col": 12
                  },
                  "title": "PECOS Enrolled",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "d2a5b8c3-6e17-4f92-8b34-1c9d0e7a2f68",
                  "type": "textarea",
                  "label": "Notes",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 11,
                  "placeholder": "Optional note…",
                  "pattern": "",
                  "layout": {
                    "col": 12
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": [],
                  "rows": 3,
                  "maxLength": 250
                }
              ],
              "subsections": []
            },
            {
              "id": "3eab90a9-20e1-4097-9055-ac846ad24485",
              "title": "Organization",
              "description": "",
              "order": 2,
              "icon": "",
              "fields": [
                {
                  "key": "3420aac3-492b-41a7-906a-0af03fd5b32a",
                  "type": "text",
                  "label": "Organization Name",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 1,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "format": "",
                  "nestedFields": []
                },
                {
                  "key": "a5168c0f-3622-4dc8-bcb7-a84afa998bb9",
                  "type": "text",
                  "label": "Address",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 2,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "1be9eb88-3791-437e-a36f-97e70511d759",
                  "type": "text",
                  "label": "ZIP",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 3,
                  "placeholder": "",
                  "layout": {
                    "col": 6
                  },
                  "options": [],
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "columns": [],
                  "format": "",
                  "pattern": "",
                  "nestedFields": []
                },
                {
                  "key": "8bfd84ba-32c1-48fe-9c7c-911789b4d257",
                  "type": "select",
                  "label": "City",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 4,
                  "placeholder": "",
                  "layout": {
                    "col": 12
                  },
                  "options": [
                    {
                      "key": "f3ae6868-eb2e-4d77-b65b-050007c9b081",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "29 Palms"
                    },
                    {
                      "key": "efc9f92d-22e1-47be-9324-defcce40b9b9",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Abbeville"
                    },
                    {
                      "key": "12f95723-0854-44e0-b84c-e81da4f8fdbd",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Abbottstown"
                    },
                    {
                      "key": "de512101-5a62-45d0-9bb7-5545447d3760",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Aberdeen"
                    },
                    {
                      "key": "15d75615-e51b-42dd-8c04-9987baffdcff",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Abilene"
                    },
                    {
                      "key": "f636af6b-3e91-4f36-b62b-e4bee0c7561d",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Abingdon"
                    },
                    {
                      "key": "a392fa62-cf18-4cdc-86c9-09e8bf4276f5",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Abington"
                    },
                    {
                      "key": "4e3f32b4-86c7-405d-bb6a-d12be3905d70",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Carnesville"
                    },
                    {
                      "key": "6e8dd53b-ed21-4682-9b28-63c51ff67533",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Eastpointe"
                    },
                    {
                      "key": "9d227e51-df1d-41ba-ab5e-1144d941b319",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Hayesville"
                    },
                    {
                      "key": "c53ef98d-4abe-4b7a-957a-20b133a15ad2",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Los Molinos"
                    },
                    {
                      "key": "28c83ee6-e203-4283-a894-4254d45d9362",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Normalville"
                    },
                    {
                      "key": "a89aff62-b832-48b7-8aed-ac07c9f6974e",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Roanoke Rapids"
                    },
                    {
                      "key": "9ae97554-1e8c-41de-bca2-7db578c09d6a",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "TARBORO"
                    }
                  ],
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "ac7e11ec-5df9-464d-b448-f03a0fceb06f",
                  "type": "select",
                  "label": "State",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 5,
                  "placeholder": "",
                  "layout": {
                    "col": 12
                  },
                  "options": [
                    {
                      "key": "41db9d49-4be2-4251-b05d-794afe813c41",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Alabama"
                    },
                    {
                      "key": "260fed09-e57e-4c26-8b0f-e0e10e1885b2",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Alaska"
                    },
                    {
                      "key": "2af0b1a6-d188-492e-9e56-b6870c0bbea0",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Arizona"
                    },
                    {
                      "key": "86cb9f70-3fbe-4c84-87a6-f32677995308",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Arkansas"
                    },
                    {
                      "key": "75b9deaa-db47-4bdf-984f-b44025a202d2",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "California"
                    },
                    {
                      "key": "582a5988-1ba6-477c-9f94-771161d8a773",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Colorado"
                    },
                    {
                      "key": "f861ede9-0b6f-48f5-9e50-e930ebe33c4e",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Connecticut"
                    },
                    {
                      "key": "6a72bfaf-ec33-41c1-a57a-da76f0b3c518",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Hawaii"
                    },
                    {
                      "key": "514e9e16-9a9b-4f95-8e0b-65a5bbaa7e57",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Kentucky"
                    },
                    {
                      "key": "0af18f77-61ec-4def-b1d2-fe2d2960467f",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Michigan"
                    },
                    {
                      "key": "e55262f0-5ef5-432d-9bd0-67220231741d",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Nevada"
                    },
                    {
                      "key": "edfbdbd2-b267-4b20-bc60-24c286ef98cd",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "North Dakota"
                    },
                    {
                      "key": "46a5fb5c-7485-4258-a13b-d26e16f49b71",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Rhode Island"
                    },
                    {
                      "key": "87cba223-1b85-4b6a-9190-6ef53aeaf521",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Utah"
                    }
                  ],
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "columns": [],
                  "nestedFields": []
                }
              ],
              "subsections": []
            },
            {
              "id": "6234286d-b75c-4afd-b6cd-7d796b2571e7",
              "title": "License Info",
              "description": "",
              "order": 3,
              "icon": "",
              "fields": [
                {
                  "key": "252f2ce2-b0ec-4a3e-8304-8f25a84331e7",
                  "type": "text",
                  "label": "NPI",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 1,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "b05be9ad-4eb7-4109-bf8b-9f75cf358b8b",
                  "type": "text",
                  "label": "UPIN",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 2,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "51d217eb-7f0d-4f79-a152-48cf982c80f5",
                  "type": "text",
                  "label": "MCD Provider #",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 3,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "737a4b4c-5102-4cd1-8bfb-2b303d880b3c",
                  "type": "text",
                  "label": "DEA #",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 4,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "85f69f81-dd40-4e90-9a97-bd449d0d1ef9",
                  "type": "text",
                  "label": "License #",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 5,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "29e47248-27db-4e25-adc0-234f61bfc2f4",
                  "type": "text",
                  "label": "Taxonomy",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 6,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "2305bb55-ed90-4eca-bcf8-fe3b5a9797fe",
                  "type": "text",
                  "label": "HCID",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 7,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "b2e6d108-fe67-45da-8b24-546027172fee",
                  "type": "text",
                  "label": "MCR #",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 8,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "e3b6c9d4-7f28-4a03-9c45-2d0e1f8b3a79",
                  "type": "text",
                  "label": "NADEAN",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 9,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "262b93cb-e8d3-4d86-ad2c-ff9835c57a25",
                  "type": "date",
                  "label": "License Last Verified Date",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 10,
                  "placeholder": "",
                  "format": "DD/MM/YYYY",
                  "showAgeBadge": false,
                  "maxYears": null,
                  "disablePastDates": false,
                  "disableFutureDates": false,
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "f4c7d0e5-8a39-4b14-8d56-3e1f2a9c4b80",
                  "type": "text",
                  "label": "License Last Verified By",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 11,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "a5d8e1f6-9b40-4c25-9e67-4f2a3b0d5c91",
                  "type": "date",
                  "label": "License Next Verified",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 12,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "b6e9f2a7-0c51-4d36-8f78-5a3b4c1e6d02",
                  "type": "text",
                  "label": "License Next Verified By",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 13,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "nestedFields": []
                }
              ],
              "subsections": []
            },
            {
              "id": "3c49154f-4394-4302-84ae-dedbd53e3b6d",
              "title": "Contacts",
              "description": "",
              "order": 4,
              "icon": "",
              "fields": [
                {
                  "key": "907714ad-e2ec-493b-81bb-7b19dd2044b6",
                  "type": "text",
                  "label": "Contact Name",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 1,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "format": "",
                  "nestedFields": []
                },
                {
                  "key": "83a39f8f-dcef-4730-8a48-92df80f39356",
                  "type": "text",
                  "label": "Office Phone",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 2,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "format": "phone",
                  "nestedFields": []
                },
                {
                  "key": "641b9fb0-173e-4989-b0e2-5f6c8a501d8d",
                  "type": "text",
                  "label": "ZIP",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 3,
                  "placeholder": "Enter value",
                  "pattern": "",
                  "layout": {
                    "col": 6
                  },
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "options": [],
                  "columns": [],
                  "format": "",
                  "nestedFields": []
                },
                {
                  "key": "0b74e548-6541-4b0b-84fb-b258320f6dce",
                  "type": "select",
                  "label": "City",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 4,
                  "placeholder": "",
                  "layout": {
                    "col": 12
                  },
                  "options": [
                    {
                      "key": "c34c771a-385e-43ea-b5ab-fe1ed14c2135",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "29 Palms"
                    },
                    {
                      "key": "bd207f3f-2014-4c15-9acb-cc4cc308ba0f",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Abbeville"
                    },
                    {
                      "key": "141b90ef-f9cc-44e0-b3e4-00dc7b029313",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Abbottstown"
                    },
                    {
                      "key": "8cf9ae4b-b0d0-40ff-9d0f-669d20f732d4",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Aberdeen"
                    },
                    {
                      "key": "a68dd4be-5465-4178-8ee6-aaf936e05c3e",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Abilene"
                    },
                    {
                      "key": "f44d9276-64bd-4007-83f8-f99ca525e5c4",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Abingdon"
                    },
                    {
                      "key": "d7e97fbc-25d5-4662-a2de-887a3c3341b9",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Abington"
                    },
                    {
                      "key": "0ef968b5-f851-433d-84dd-c68b1e337b38",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Carnesville"
                    },
                    {
                      "key": "3db63fe8-f5ee-4b45-a137-cb2edaa9d0e7",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Eastpointe"
                    },
                    {
                      "key": "414473a8-7dde-4989-8e0e-987588010d6f",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Hayesville"
                    },
                    {
                      "key": "abfc38b2-1daf-49f2-bac1-8e9c0891b514",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Los Molinos"
                    },
                    {
                      "key": "26859123-c0f0-4530-a16f-c1a6bf4749d9",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Normalville"
                    },
                    {
                      "key": "769cd3c2-d70d-4a18-b0da-501676d6e2b2",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Roanoke Rapids"
                    },
                    {
                      "key": "fc311bcc-9c55-47ec-9c66-e50b64d8e9eb",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "TARBORO"
                    }
                  ],
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "columns": [],
                  "nestedFields": []
                },
                {
                  "key": "f44ba0ff-fb71-406a-b75e-a8665588e1d5",
                  "type": "select",
                  "label": "State",
                  "required": false,
                  "hint": "",
                  "description": "",
                  "prefixIcon": "",
                  "suffixIcon": "",
                  "hintIcon": "",
                  "conditions": [],
                  "order": 5,
                  "placeholder": "",
                  "layout": {
                    "col": 12
                  },
                  "options": [
                    {
                      "key": "afb5f8f8-d63c-4199-a7f4-ecd16bb412b7",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Alabama"
                    },
                    {
                      "key": "5e23da65-8a9d-43d4-b0c0-9aae954fa17a",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Alaska"
                    },
                    {
                      "key": "5746c0e4-0608-419e-b753-1ebc20606aaf",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Arizona"
                    },
                    {
                      "key": "490539f3-3267-4e3c-b0b4-b91d0ef7724c",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Arkansas"
                    },
                    {
                      "key": "bdfa2e8f-2622-462a-bb9f-6c4623ec0fd6",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "California"
                    },
                    {
                      "key": "32c516cc-1a46-4df7-83a4-36b44b0fa943",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Colorado"
                    },
                    {
                      "key": "74ab367e-a7f3-44ec-b394-2cf3e60941c8",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Connecticut"
                    },
                    {
                      "key": "33ea67db-c358-4722-a008-768c5bfcd7f9",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Hawaii"
                    },
                    {
                      "key": "d8083c5b-483f-4f91-97fa-4097f5514445",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Kentucky"
                    },
                    {
                      "key": "58bea231-b52e-4ae0-80a8-6ccb0413bf9d",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Michigan"
                    },
                    {
                      "key": "2f918f5e-a1ae-475d-93cc-f26d02bee0ab",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Nevada"
                    },
                    {
                      "key": "0be254c0-ea9b-4de4-9c3b-a7d2707a9e8e",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "North Dakota"
                    },
                    {
                      "key": "145702de-9221-4d1b-acb5-5a164fbbb5e4",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Rhode Island"
                    },
                    {
                      "key": "2b3d4104-9a03-4c12-aa5c-a882ea5a51c9",
                      "iconPath": "",
                      "description": "",
                      "selectedNote": "",
                      "descriptionItems": [],
                      "label": "Utah"
                    }
                  ],
                  "title": "",
                  "subtitle": "",
                  "badgeText": "",
                  "emptyCtaTitle": "",
                  "addButtonLabel": "",
                  "removeButtonLabel": "",
                  "items": [],
                  "columns": [],
                  "nestedFields": []
                }
              ],
              "repeat": {
                "source": "contacts",
                "dedupeBy": "907714ad-e2ec-493b-81bb-7b19dd2044b6",
                "collapseAfterFirst": true
              },
              "subsections": []
            }
          ]
        }
      ],
      "footer": {
        "buttons": []
      }
    },
    {
      "id": "6fd28d56-7b49-4c53-b300-95938d7c1e98",
      "title": "Medical Info",
      "subtitle": "",
      "description": "",
      "order": 3,
      "fields": [],
      "subsections": [
        {
          "id": "7d93ea62-08a3-43cd-ab7c-0d2778a471cc",
          "title": "Patient Stats",
          "description": "",
          "order": 1,
          "icon": "",
          "fields": [
            {
              "key": "2c777581-b14e-4f06-9817-76306a8bc595",
              "type": "text",
              "label": "Height (in.)",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 1,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "2aca560a-2080-472b-9da9-1cb5d8a23ced",
              "type": "text",
              "label": "Height (cm)",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 2,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "beecd86d-6f98-418e-9e77-e1cb80a5bb58",
              "type": "text",
              "label": "Weight (lbs.)",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 3,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "b8ee58ca-14ac-414b-b091-2648baac9c83",
              "type": "text",
              "label": "Weight (kg)",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 4,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "bf67d6a3-1434-4009-ba60-d1beb02bbf5d",
              "type": "date",
              "label": "Date",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 5,
              "placeholder": "",
              "format": "DD/MM/YYYY",
              "showAgeBadge": false,
              "maxYears": null,
              "disablePastDates": false,
              "disableFutureDates": false,
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            }
          ],
          "subsections": []
        }
      ],
      "footer": {
        "buttons": []
      }
    },
    {
      "id": "3a654d7d-8116-4c02-ac9b-d498698e2c57",
      "title": "Drug Orders",
      "subtitle": "",
      "description": "",
      "order": 4,
      "fields": [],
      "subsections": [
        {
          "id": "1b20aa63-593b-4e67-b31b-9e5708f718cf",
          "title": "Drug",
          "description": "",
          "order": 1,
          "icon": "",
          "fields": [
            {
              "key": "40a3eb3b-1d25-408f-b8a0-8f954c47e807",
              "type": "select",
              "label": "Site",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 1,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [
                {
                  "key": "1f705d0c-53bc-4423-a841-11e6d1ee75bc",
                  "label": "Do Not Use - Philadelphia - PA",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "45d01dfb-a7ef-41af-91cb-fdf66c8141d2",
                  "label": "Los Angeles - CA",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "82f71bfc-1455-46dd-9914-e87d855f64f3",
                  "label": "New York - NY",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "2745f496-a4fe-4e58-b48d-f2db06cb2c79",
                  "label": "Kansas City - KS",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "e6d83e69-8742-4b86-b1ec-6a0d4b859c71",
                  "label": "Do Not Use - Dallas - TX",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "bc6ef4c9-60b2-42b0-b9d8-7f77bb03d2dc",
                  "label": "Omaha - NE",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "7a3d30a9-95f8-4ebd-8d8d-83f857df6d61",
                  "label": "Columbus - OH",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "7d91686d-baf8-4f42-8bba-67b6f4d75b89",
                  "label": "Houston - TX",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "c6bdb4f3-a1d3-43fd-a287-05d7cb5a7557",
                  "label": "Do Not Use - FTW Pharmacy Serv",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "d3b9f77b-c2a9-4b9b-b96e-6a95ca1d47d0",
                  "label": "Virtis Health - Dallas",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "d7f78432-a0d8-40e3-b2b9-0f8e5ebaeebd",
                  "label": "Do Not Use - Veros Health",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "8c4d9e3f-0fd9-4f62-b8e4-0a1e8fc16d77",
                  "label": "Virtis Health - Sun City",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "9a4fc5ef-5e6b-43c2-b783-ef1f5f7207d4",
                  "label": "Virtis Health - Las Vegas",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "716b1456-9ec0-4d34-b19d-69b32bb9b12c",
                  "label": "St Louis - MO Soleo",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "0d2a5b48-e225-4e6a-91d6-dcffe1e0d04f",
              "type": "select",
              "label": "Company",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 2,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [
                {
                  "key": "e231202d-a323-4e77-803b-2cc59f53ab34",
                  "label": "01",
                  "iconPath": "",
                  "description": "Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "7044b3e9-7a18-4905-a71b-505154b204fa",
                  "label": "01F",
                  "iconPath": "",
                  "description": "Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "2e505b0a-f82a-4d73-b787-9b9292bd0fe2",
                  "label": "01M",
                  "iconPath": "",
                  "description": "Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "d86aec62-b03e-43d8-94fc-d3decc60c4da",
                  "label": "01R",
                  "iconPath": "",
                  "description": "DNU Philadelphia Referral",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "d3a9bf28-3dfc-4045-a476-5243b99c8d79",
                  "label": "01W",
                  "iconPath": "",
                  "description": "Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "c5e5a7f4-a56c-430f-b003-efee527123e1",
                  "label": "02",
                  "iconPath": "",
                  "description": "Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "5d9fc246-032e-4d1a-8add-e8d69e5e9558",
                  "label": "02B",
                  "iconPath": "",
                  "description": "Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "dd51ce3c-ca99-4867-8e1f-552f86059066",
                  "label": "06F",
                  "iconPath": "",
                  "description": "Biomed Kansas, Inc dba Soleo Health",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "202c550e-65a4-4ad1-9b6f-10591e977100",
                  "label": "10B",
                  "iconPath": "",
                  "description": "Soleo Health Inc",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "28e517f0-e463-452d-9845-3b33f9035304",
                  "label": "14FDFW",
                  "iconPath": "",
                  "description": "Soleo Health Inc",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "a25d0f24-daad-4cb3-bf9e-091c3737bda0",
                  "label": "20",
                  "iconPath": "",
                  "description": "Soleo Health Inc.",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "53b0a231-5097-4a5d-94c1-20b4fb3267dd",
                  "label": "24F",
                  "iconPath": "",
                  "description": "Soleo Health Inc",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "49de27ae-79df-47a0-96a5-72830060cc59",
                  "label": "32",
                  "iconPath": "",
                  "description": "Virtis Health, a Soleo Health Company",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "61b1f5fe-6226-4f23-a710-e81351c2c19a",
                  "label": "47",
                  "iconPath": "",
                  "description": "Virtis Health, a Soleo Health Company",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "6c9529e8-2cb7-4ec1-bdd1-54bf73ae018d",
              "type": "text",
              "label": "Ordered Item",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 3,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "c6f3aedc-08df-40d7-9501-f55289676df3",
              "type": "text",
              "label": "Dose",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 4,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "42d5ed04-fb15-47ed-bcf4-d9969b760029",
              "type": "select",
              "label": "Unit",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 5,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [
                {
                  "key": "df1c34f6-1b4c-4b99-8520-9203a081213b",
                  "label": "%",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "05c408d1-4329-44af-bcd3-e242c1117303",
                  "label": "Bottle",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "059b68cb-8673-4b6e-84c1-c7e03dcbb750",
                  "label": "Can",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "3f3597b0-6f87-43b4-a78f-150aeffdb226",
                  "label": "Capsule",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "a400a2c4-924e-4252-beab-3d317c5f70df",
                  "label": "Each",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "41ba138e-31c8-46aa-8503-4ba365608f71",
                  "label": "Gm",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "f22e17e2-18aa-4506-a850-67dc005604db",
                  "label": "Kg",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "b9e25d19-7ae9-4f03-9b9c-c3d79e0946c4",
                  "label": "L",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "a5ba8725-90f5-4682-b553-6845a86637cd",
                  "label": "MCG/ML",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "56234a39-d874-416f-b9aa-5a7440476044",
                  "label": "MG",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "53533694-944d-4241-a279-3986d789e588",
                  "label": "MG/0.5ML",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "d8560211-9bb1-4b50-ae75-324d23723485",
                  "label": "MG/5ML",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "cf1fc4eb-e5be-46f9-8247-17fc960a0598",
                  "label": "ML",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "5e880ca3-4213-4d5c-a0b1-0b596d7d8168",
                  "label": "mM/ML",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "8349e38f-baee-405d-bdcd-2efe5dd71fb3",
              "type": "select",
              "label": "Route",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 6,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [
                {
                  "key": "3a98c7db-7cdb-4686-88c9-b2dfb6fb34c3",
                  "label": "EXTERN",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "363e3147-aac1-4baf-9a81-6e2c92082ffa",
                  "label": "FEEDNG",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "d6cea1a2-86a5-4d04-9b5c-acd42fe010dc",
                  "label": "ID",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "55316c89-b870-45a2-8d1c-ebc5dbbe70f6",
                  "label": "IM",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "6272c487-265e-4863-a077-fd9a1a30c415",
                  "label": "IM/SQ",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "23dc5b84-22a4-420a-bb96-4b3736c030fa",
                  "label": "INH",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "77e91186-463f-41eb-8543-e2eedd2c27ab",
                  "label": "INTART",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "2947a0e7-7295-4513-9fca-6c5e0a31b6dc",
                  "label": "IP",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "c824feeb-db2f-47b5-afe6-f0e574d93917",
                  "label": "IRRIGA",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "e2251f78-819f-41ab-8dab-1007fad4510c",
                  "label": "IV",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "63df3b59-3246-4130-8a79-79a884412f6c",
                  "label": "IVP",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "4a490c9d-d2cd-4e7e-88e4-defe002bb1eb",
                  "label": "PO",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "00d2fe00-e161-44d1-bd21-cbeff7b383ef",
                  "label": "SQ",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "0ea369bc-4de1-45ea-920a-0fdc8b0c3b5f",
                  "label": "TOPIC",
                  "iconPath": "",
                  "description": "",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "ef4e637b-cf37-4ed9-a4ee-3fc2ddd5b7d6",
              "type": "select",
              "label": "Frequency",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 7,
              "placeholder": "Enter value",
              "pattern": "",
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [
                {
                  "key": "515af3ca-1635-4873-bbfc-e4ddded5de67",
                  "label": "@2w,6w,8",
                  "iconPath": "",
                  "description": "@2wks,6wks, : Q8WKS",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "b8fa3471-2437-4873-981e-7dbdb5f0c1ad",
                  "label": "0,2,4,q4",
                  "iconPath": "",
                  "description": "Week 0,2,4 then q4wk",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "2a5b675f-9139-4a8a-8831-091213feb4bb",
                  "label": "0,2,6,q6",
                  "iconPath": "",
                  "description": "Week 0,2,6 then q6w",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "9a64d7aa-5a21-40b7-99d7-a173e0e1cafa",
                  "label": "0,2,6,q8",
                  "iconPath": "",
                  "description": "Week 0,2,6 then q8",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "4b92d4e2-08c5-4678-b097-1ed0478c9589",
                  "label": "0,2,q4",
                  "iconPath": "",
                  "description": "Week 0,2, then q4w",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "6824766f-4272-4217-8593-8613e4afa9de",
                  "label": "0,2,Q6MT",
                  "iconPath": "",
                  "description": "wk 0, wk 2, and Q6mt",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "541eb88d-87ae-42e6-80e3-a39095142cb0",
                  "label": "0,3,Q6M",
                  "iconPath": "",
                  "description": "Month 0, 3, then Q6M",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "53d0f316-a860-4ef4-80d4-49a5bb850981",
                  "label": "3D",
                  "iconPath": "",
                  "description": "3 days",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "947ff980-8025-4137-8f0a-6eb90b8663f3",
                  "label": "BIDx5",
                  "iconPath": "",
                  "description": "Twice a day x 5 days",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "219663d3-9ec5-4d5e-a34b-98093ec0b39c",
                  "label": "GAMMA",
                  "iconPath": "",
                  "description": "qdx1d, q4w",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "99ad1260-419f-4d27-b88e-a5903ef39b94",
                  "label": "preacces",
                  "iconPath": "",
                  "description": "apply before port ac",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "d0e4416f-2de0-477d-af7d-ccebfac13d41",
                  "label": "Q4-5W",
                  "iconPath": "",
                  "description": "Every 4-5 weeks",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "10032632-3ca5-40b2-b478-b9f752ed7857",
                  "label": "QDD",
                  "iconPath": "",
                  "description": "Every 13 Days",
                  "selectedNote": "",
                  "descriptionItems": []
                },
                {
                  "key": "53e0bd52-ce08-479f-b096-41ebcd449c55",
                  "label": "TIWDPRN",
                  "iconPath": "",
                  "description": "3 x/week + daily prn",
                  "selectedNote": "",
                  "descriptionItems": []
                }
              ],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "e6a41a4a-0a17-4e13-8e5d-0dc9b5c7f0e2",
              "type": "select",
              "label": "Referral Source",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 8,
              "placeholder": "Search referral source…",
              "layout": {
                "col": 12
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            },
            {
              "key": "1d857469-3d7e-4b38-80e1-d0f6df158573",
              "type": "select",
              "label": "Prescribed Provider",
              "required": false,
              "hint": "",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 9,
              "placeholder": "",
              "layout": {
                "col": 12
              },
              "options": [],
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "columns": [],
              "metadata": {
                "optionsFrom": {
                  "source": "providers",
                  "label": [
                    "First Name",
                    "Last Name"
                  ]
                }
              },
              "nestedFields": []
            },
            {
              "key": "204f71f8-6b7d-4e2f-ba7c-1ddd8ac7a290",
              "type": "textarea",
              "label": "Comments",
              "required": false,
              "hint": "Multi-line notes",
              "description": "",
              "prefixIcon": "",
              "suffixIcon": "",
              "hintIcon": "",
              "conditions": [],
              "order": 10,
              "placeholder": "Write details here",
              "rows": 4,
              "maxLength": 250,
              "layout": {
                "col": 6
              },
              "title": "",
              "subtitle": "",
              "badgeText": "",
              "emptyCtaTitle": "",
              "addButtonLabel": "",
              "removeButtonLabel": "",
              "items": [],
              "options": [],
              "columns": [],
              "nestedFields": []
            }
          ],
          "repeat": {
            "source": "drugs",
            "dedupeBy": "6c9529e8-2cb7-4ec1-bdd1-54bf73ae018d",
            "collapseAfterFirst": true
          },
          "subsections": []
        }
      ],
      "footer": {
        "buttons": []
      }
    }
  ]
};
