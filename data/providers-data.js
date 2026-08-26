/* CPR+ prescriber/provider directory — shared across the app. Originally
 * built as a local fixture inside js/document-detail.js for the M.D./
 * Providers matching feature (see PrescriberIntake-Scenario-Modelling.xlsx),
 * promoted here so the Patients page can link patients to the same real
 * provider identities instead of inventing a second, disconnected list. */
window.PROVIDERS = [
  { id: 'Pr1', first_name: 'John', last_name: 'Blaine', specialty: 'Oncology', organization: 'Jerky Pediatrics', address: '123 Dull Ave', city: 'Troy', state: 'MI', zip: '48083', npi: '1730123456', phone: '(586) 555-0101', prof_designation: 'MD' },
  { id: 'Pr2', first_name: 'Mary', last_name: 'Costa', specialty: 'Gastro', organization: 'Holy Hospitals', address: '234 Mill Rd', city: 'Warren', state: 'MI', zip: '48091', npi: '1922334455', phone: '(586) 555-0202', prof_designation: 'MD' },
  { id: 'Pr3', first_name: 'Abdu', last_name: 'Mohammed', specialty: 'Internal Medicine', organization: 'Piedmont Physicians', address: '456 Stake St', city: 'Warren', state: 'MI', zip: '48088', npi: '1811223344', phone: '(586) 555-0303', prof_designation: 'MD' },
  { id: 'Pr4', first_name: 'A.', last_name: 'Mohammed', specialty: 'Hospitalist', organization: 'St. John Hospital', address: '456 Ryan Rd', city: 'Detroit', state: 'MI', zip: '48235', npi: '1647382910', phone: '(313) 555-0404', prof_designation: 'MD' },
  // Deliberate near-duplicates for the "NARAYAN P VERMA" extraction (several
  // dummy documents carry this prescriber, always with a blank NPI) — three
  // on-file Vermas so the multi-match disambiguation UI has something real
  // to disambiguate.
  { id: 'Pr5', first_name: 'Narayan', last_name: 'Verma', specialty: 'Neurology', organization: 'BG Tricounty Neurology and Sleep Clinic', address: '31150 Hoover Rd Suite B', city: 'Warren', state: 'MI', zip: '48093', npi: '1922441178', phone: '(586) 983-3666', prof_designation: 'MD FACP FAAN FAASM' },
  { id: 'Pr6', first_name: 'Narayan', last_name: 'Verma', specialty: 'Sleep Medicine', organization: 'Beaumont Neurology Associates', address: '44405 Woodward Ave', city: 'Pontiac', state: 'MI', zip: '48341', npi: '1033552289', phone: '(248) 551-0110', prof_designation: 'MD' },
  { id: 'Pr7', first_name: 'N.', last_name: 'Verma', specialty: 'Neurology', organization: 'Tricounty Sleep Center', address: '31150 Hoover Rd Suite B', city: 'Warren', state: 'MI', zip: '48093', npi: '1755663390', phone: '(586) 983-3699', prof_designation: 'DO' },
  // Near-duplicates for the "ANITA R DESAI" extraction (302055_Referral_
  // JessicaWhitfield…, doc 00000000000000000000000f) — the top-banner
  // match-UI experiment needs a real multi-match to show.
  { id: 'Pr8', first_name: 'Anita', last_name: 'Desai', specialty: 'Endocrinology', organization: 'Cornerstone Endocrine Group', address: '5422 Hoover Rd Suite C', city: 'Duluth', state: 'MN', zip: '55802', npi: '1699887744', phone: '(799) 605-1194', prof_designation: 'MD' },
  { id: 'Pr9', first_name: 'Anita', last_name: 'Desai', specialty: 'Internal Medicine', organization: 'Duluth Family Health', address: '812 Superior St', city: 'Duluth', state: 'MN', zip: '55805', npi: '1477663322', phone: '(218) 727-4400', prof_designation: 'MD DO' },
  { id: 'Pr10', first_name: 'A.', last_name: 'Desai', specialty: 'Endocrinology', organization: 'Lakeview Endocrinology Associates', address: '5422 Hoover Rd Suite C', city: 'Duluth', state: 'MN', zip: '55802', npi: '1355229988', phone: '(218) 727-9010', prof_designation: 'DO' },
];
