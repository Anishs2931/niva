/* Claims page: summary + claim cards. Claims are kept in this browser (localStorage 'niva.claims').
 * DEMO claims are written once; set SEED_DEMO = false to start empty. A claim's status is
 * 'Submitted' | 'Under review' | 'Approved' | 'Rejected' — set it from your backend once one exists. */
(function () {
  var N = window.NIVA, load = N.load, save = N.save, $ = N.$, esc = N.esc, inr = N.inr;
  var SEED_DEMO = true;
  if (SEED_DEMO && !load('claims').length && !load('claimsSeeded').length) {
    save('claims', [
      { id: 'CLM-1005', reason: 'Hair transplant procedure — follow-up session', amount: 42000, date: '8 Oct 2026', status: 'Submitted', policy: 'Hair Care Protection', person: 'John' },
      { id: 'CLM-1004', reason: 'Laser treatment for scar reduction', amount: 18500, date: '2 Oct 2026', status: 'Under review', policy: 'Cosmetic Insurance Plus', person: 'John' },
      { id: 'CLM-1003', reason: 'Skin rejuvenation consultation and treatment', amount: 12000, date: '21 Sep 2026', status: 'Approved', policy: 'Cosmetic Insurance Basic', person: 'John' },
      { id: 'CLM-1002', reason: 'Non-medical cosmetic procedure', amount: 30000, date: '9 Sep 2026', status: 'Rejected', policy: 'Cosmetic Insurance Basic', person: 'John' },
      { id: 'CLM-1001', reason: 'Rhinoplasty — medically necessary correction', amount: 85000, date: '15 Aug 2026', status: 'Approved', policy: 'Cosmetic Insurance Plus', person: 'John' }
    ]);
    save('claimsSeeded', [1]);
  }

  var list = $('claim-list');
  function render() {
    var cs = load('claims'), open = 0, total = 0, paid = 0;
    cs.forEach(function (c) { total += c.amount; if (c.status === 'Approved') paid += c.amount; if (c.status === 'Submitted' || c.status === 'Under review') open++; });
    $('c-open').textContent = open; $('c-count').textContent = cs.length; $('c-total').textContent = inr(total); $('c-paid').textContent = inr(paid);
    $('claim-empty').hidden = cs.length > 0;
    list.innerHTML = cs.map(function (c, i) {
      var cls = c.status.toLowerCase().replace(/\s+/g, '-');
      return '<li><article class="qcard">' +
        '<div class="qc-top"><span class="policy-label">Claim: ' + esc(c.id) + '</span><span class="qc-tag cl-' + esc(cls) + '">' + esc(c.status) + '</span></div>' +
        '<h3 class="cl-reason">' + esc(c.reason) + '</h3>' +
        '<div class="qc-row"><div class="pol-meta"><div><span>Amount</span><b>' + inr(c.amount) + '</b></div><div><span>Date</span><b>' + esc(c.date) + '</b></div></div>' +
          '<a class="pol-btn small" href="../claim-details/index.html?id=' + encodeURIComponent(c.id) + '">View Details</a></div>' +
      '</article></li>';
    }).join('');
  }
  render();
})();
