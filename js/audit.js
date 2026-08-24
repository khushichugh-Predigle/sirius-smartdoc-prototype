/* Deterministic fake audit-trail stamps (Created On / Updated On / Updated By)
 * for record tables that don't already carry real audit fields in their
 * dummy data. Seeded from a stable per-row key so values stay fixed across
 * re-renders instead of jumping around on every paint. */
window.AuditStamp = (function () {
  const NAMES = ['Priya Nair', 'J. Romero', 'Khushi Chugh', 'R. Alvarez', 'M. Chen', 'Devon Park', 'S. Whitfield'];
  const BASE = new Date(2026, 5, 1).getTime(); // fixed base — Date.now() is intentionally avoided

  function hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
    return h;
  }

  function fmt(ts) {
    const d = new Date(ts);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    return `${mm}/${dd}/${d.getFullYear()} ${hh}:${mi}`;
  }

  function stampFor(seed) {
    const key = String(seed);
    const h = hash(key);
    const createdOffsetDays = h % 70;
    const createdOffsetMins = (h >>> 4) % (24 * 60);
    const createdTs = BASE + createdOffsetDays * 86400000 + createdOffsetMins * 60000;
    const updatedOffsetDays = (h >>> 8) % 14;
    const updatedOffsetMins = (h >>> 12) % (24 * 60);
    const updatedTs = createdTs + updatedOffsetDays * 86400000 + updatedOffsetMins * 60000;
    return {
      createdOn: fmt(createdTs),
      updatedOn: fmt(updatedTs),
      updatedBy: NAMES[h % NAMES.length],
    };
  }

  return { stampFor };
})();
