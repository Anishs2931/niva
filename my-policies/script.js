/* My Policies page: bought policies and cancel. */
(function () {
  var N = window.NIVA, POLICIES = N.POLICIES, load = N.load, save = N.save, $ = N.$, esc = N.esc, inr = N.inr, today = N.today, uid = N.uid, find = N.find, say = N.say, flash = N.flash, takeFlash = N.takeFlash, nextQuoteNo = N.nextQuoteNo;

  /* ---------- my-policies.html ---------- */
  var plist = $('policy-list');
  if (plist) {
    var renderPolicies = function () {
      var ps = load('policies');
      $('policy-empty').hidden = ps.length > 0;
      plist.innerHTML = ps.map(function (p) {
        return '<li class="pol-item"><div><h3>' + esc(p.name) + '<span class="pol-tag">Active</span></h3><div class="pol-meta">' +
          '<div><span>Insured</span><b>' + esc(p.person) + '</b></div><div><span>Coverage</span><b>' + inr(p.coverage) + '</b></div>' +
          '<div><span>Premium</span><b>' + inr(p.premium) + '</b></div><div><span>Started</span><b>' + esc(p.start) + '</b></div></div></div>' +
          '<div class="pol-actions"><button type="button" class="pol-link" data-cancel="' + esc(p.id) + '">Cancel policy</button></div></li>';
      }).join('');
    };
    plist.addEventListener('click', function (e) {
      var c = e.target.closest('[data-cancel]'); if (!c) return;
      save('policies', load('policies').filter(function (x) { return x.id !== c.getAttribute('data-cancel'); })); renderPolicies();
    });
    renderPolicies();
  }
})();
