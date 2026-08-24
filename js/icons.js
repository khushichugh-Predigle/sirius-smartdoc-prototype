/* Esper brand-style line icon system — ported verbatim from sirius_clearance_specialist_v64.html
 * (its IC lookup + ic()/injectIcons() helpers). Ported module screens use
 * <span data-ic="name"></span> placeholders; call injectIcons(root) after any
 * innerHTML write to resolve them, same pattern as v64. */
const IC = {
 chat:'<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>',
 dash:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
 folder:'<path d="M3 7a2 2 0 012-2h4l2 2.5h8a2 2 0 012 2V17a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
 file:'<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/>',
 clipcheck:'<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9.5 13.5l2 2 3.5-4"/>',
 chart:'<path d="M21 21H4.6c-.56 0-.84 0-1.05-.1a1 1 0 01-.44-.45C3 20.24 3 19.96 3 19.4V3"/><path d="M7 15l4-5 4 3 5-6"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M18.7 13.5a1.5 1.5 0 00.3 1.65l.05.06a1.8 1.8 0 11-2.55 2.55l-.05-.06a1.5 1.5 0 00-1.65-.3 1.5 1.5 0 00-.9 1.37V19a1.8 1.8 0 11-3.6 0v-.1a1.5 1.5 0 00-1-1.36 1.5 1.5 0 00-1.65.3l-.06.05a1.8 1.8 0 11-2.55-2.55l.06-.05a1.5 1.5 0 00.3-1.65 1.5 1.5 0 00-1.37-.9H5a1.8 1.8 0 110-3.6h.1a1.5 1.5 0 001.36-1 1.5 1.5 0 00-.3-1.65l-.05-.06A1.8 1.8 0 118.66 3.5l.05.06a1.5 1.5 0 001.65.3 1.5 1.5 0 00.9-1.37V2.4a1.8 1.8 0 113.6 0v.1a1.5 1.5 0 00.9 1.37 1.5 1.5 0 001.65-.3l.06-.05a1.8 1.8 0 112.55 2.55l-.06.05a1.5 1.5 0 00-.3 1.65v0a1.5 1.5 0 001.37.9h.07a1.8 1.8 0 110 3.6h-.1a1.5 1.5 0 00-1.36.9z"/>',
 bell:'<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>',
 eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
 refresh:'<path d="M21 12a9 9 0 11-2.64-6.36"/><path d="M21 3v6h-6"/>',
 download:'<path d="M21 15v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3"/><path d="M7 10l5 5 5-5M12 15V3"/>',
 link:'<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>',
 expand:'<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
 shrink:'<path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/>',
 chevup:'<path d="M18 15l-6-6-6 6"/>',
 chevdn:'<path d="M6 9l6 6 6-6"/>',
 x:'<path d="M18 6L6 18M6 6l12 12"/>',
 check:'<path d="M20 6L9 17l-5-5"/>',
 alert:'<path d="M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.7 3.86a2 2 0 00-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
 block:'<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
 zap:'<path d="M13 2L3 14h8l-1 8 11-12h-8l1-8z"/>',
 printer:'<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 clip:'<path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>',
 dots:'<circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/>',
 send:'<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>',
 user:'<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>',
 ext:'<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6M10 14L21 3"/>',
 play:'<path d="M7 4l13 8-13 8z"/>',
 minus:'<path d="M5 12h14"/>',
 logout:'<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
 support:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/><path d="M5.7 5.7l4 4M14.3 14.3l4 4M18.3 5.7l-4 4M9.7 14.3l-4 4"/>',
 edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/>',
 users:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
 trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
 'file-text':'<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 16h4"/>',
 settings:'<path d="M3 6h18M7 12h10M10 18h4"/>',
 bank:'<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>',
 shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'
};
function ic(n, s) { return `<svg class="ic16" ${s ? `style="${s}"` : ""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${IC[n] || ""}</svg>`; }
function injectIcons(root) { (root || document).querySelectorAll("[data-ic]").forEach((e) => { e.innerHTML = ic(e.dataset.ic); e.style.display = "inline-flex"; }); }
