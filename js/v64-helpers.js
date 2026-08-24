/* Shared helpers ported from sirius_clearance_specialist_v64.html for the ported
 * module screens (Dashboard, Case Management, Prior Authorization, Patients, Forms,
 * Users, Roles, Reports). Any page that uses these must include a single shared
 * modal host in its markup, matching v64's pattern:
 *   <div class="overlay" id="ovl"><div class="modal" id="modalBox"></div></div>
 * Toast (toast()) already lives in js/shell.js and is reused as-is. */
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

function openModal(html) {
  const b = $("modalBox");
  b.classList.remove("brandm");
  b.innerHTML = html;
  $("ovl").classList.add("on");
  injectIcons(b);
}
function openModalBrand(html) {
  const b = $("modalBox");
  b.classList.add("brandm");
  b.innerHTML = html;
  $("ovl").classList.add("on");
  injectIcons(b);
}
function closeModal() {
  $("ovl").classList.remove("on");
  $("modalBox").classList.remove("brandm");
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
