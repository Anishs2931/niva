/* Claim details page (?id=<claim id>). Missing fields are derived with PLACEHOLDER rules (payout 85%, sample documents)
 * until your backend supplies them: { payout, processed, policyId, remarks, docs:[{title, tag, desc, file, uploaded}] }. */
(function () {
  var N = window.NIVA, load = N.load, $ = N.$, esc = N.esc, inr = N.inr;
  var id = new URLSearchParams(location.search).get('id');
  var c = load('claims').filter(function (x) { return x.id === id; })[0];
  if (!c) { $('cd').hidden = true; $('cd-missing').hidden = false; return; }
  var pol = null; N.POLICIES.forEach(function (p) { if (p.name === c.policy) pol = p; });
  function fmt(d) { return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  var d0 = new Date(c.date), okDate = !isNaN(d0);
  var decided = c.status === 'Approved' || c.status === 'Rejected';
  var payout = c.payout !== undefined ? c.payout : (c.status === 'Approved' ? Math.round(c.amount * 0.85) : 0);
  var processed = c.processed || (decided && okDate ? fmt(new Date(d0.getTime() + 86400000)) : '\u2014');
  var up = okDate ? fmt(d0) : c.date;
  var docs = c.docs || [
    { title: 'Health Report', tag: 'DOCUMENT_HEALTH_REPORT', desc: '', file: 'health-report.pdf' },
    { title: 'Claimant ID Proof', tag: 'DOCUMENT_ID_PROOF', desc: '', file: 'id-proof.pdf' },
    { title: 'Treatment Invoice', tag: 'DOCUMENT_INVOICE', desc: 'Upload invoice and supporting documents', file: 'treatment-invoice.pdf' },
    { title: 'Medical Health Report', tag: 'DOCUMENT_HEALTH_REPORT', desc: 'Latest medical report related to the claim', file: 'medical-report.pdf' },
    { title: 'Government ID Proof', tag: 'DOCUMENT_ID_PROOF', desc: 'Valid government-issued photo ID', file: 'government-id.pdf' },
    { title: 'Claim Declaration', tag: 'QUESTION', desc: 'Confirm that all submitted information is accurate', file: 'Yes' }
  ];
  var num = String(c.id).replace(/\D/g, '') || c.id;
  var cls = c.status.toLowerCase().replace(/\s+/g, '-');

  document.title = 'NIVA \u2014 Claim #' + num;
  $('cd-title').textContent = 'Claim #' + num; $('cd-sub').textContent = 'Submitted on ' + (okDate ? fmt(d0) : c.date);
  var tag = $('cd-status'); tag.textContent = c.status; tag.className = 'qc-tag cl-' + cls;
  $('ci-desc').textContent = c.reason; $('ci-status').textContent = c.status.toUpperCase();
  $('ci-amount').textContent = inr(c.amount); $('ci-payout').textContent = payout ? inr(payout) : '\u2014';
  $('ci-date').textContent = okDate ? fmt(d0) : c.date; $('ci-processed').textContent = processed;
  $('cp-id').textContent = c.policyId || (pol ? pol.id : '\u2014'); $('cp-name').textContent = c.policy || '\u2014';
  $('cp-cov').textContent = pol ? inr(pol.coverage) : '\u2014'; $('cp-person').textContent = c.person || '\u2014';
  $('cd-remarks').textContent = c.remarks || (c.status === 'Rejected' ? 'Purely aesthetic procedures are excluded under this policy.' : 'No remarks available');
  $('cd-docs').innerHTML = docs.map(function (d) {
    return '<li class="cd-doc"><div class="cd-doc-top"><b>' + esc(d.title) + '</b><span class="cd-chip">' + esc(d.tag) + '</span></div>' +
      (d.desc ? '<p>' + esc(d.desc) + '</p>' : '') + '<p>' + esc(d.file) + '</p><small>' + (d.tag === 'QUESTION' ? 'Answered ' : 'Uploaded ') + esc(d.uploaded || up) + '</small></li>';
  }).join('');
})();
