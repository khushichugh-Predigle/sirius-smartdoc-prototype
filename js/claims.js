/* Document-claim state, shared between intake-requests.html (queue) and
 * document-detail.html (editor). Every other piece of state in this
 * prototype is in-memory only and resets on reload/navigation — but a claim
 * has to survive navigating away from the editor back to the queue for this
 * feature to demonstrate anything, so this one layer is backed by
 * localStorage instead of a plain JS var. It stores only the delta on top of
 * each document's baseline document_status/claimed_by (set in
 * data/dummy-documents.js) — never a full copy of the document. */
window.Claims = (function () {
  const KEY = 'smartdocs_claims';

  function readAll() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; }
  }
  function writeAll(map) {
    localStorage.setItem(KEY, JSON.stringify(map));
  }

  function get(docId) {
    return readAll()[docId] || null;
  }

  // Merge a document's baseline status/claimed_by with any session override.
  function effective(doc) {
    const override = get(doc._id);
    if (!override) return { status: doc.document_status, claimedBy: doc.claimed_by || null };
    return { status: override.status, claimedBy: override.claimedBy };
  }

  function claim(docId, actor) {
    const map = readAll();
    map[docId] = { status: 'review in progress', claimedBy: { name: actor.name, initials: actor.initials } };
    writeAll(map);
  }

  // Save & Submit completes the document — releases the claim.
  function release(docId, finalStatus) {
    const map = readAll();
    map[docId] = { status: finalStatus || 'reviewed', claimedBy: null };
    writeAll(map);
  }

  // Patient Access Manager forcing a document back to Pending Review.
  function unclaim(docId) {
    const map = readAll();
    map[docId] = { status: 'pending review', claimedBy: null };
    writeAll(map);
  }

  function reset() {
    localStorage.removeItem(KEY);
  }

  return { effective, claim, release, unclaim, reset };
})();
