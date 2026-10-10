/* Policy detail page: shows one policy (?id=...) and creates a quote from it. */
(function () {
  var N = window.NIVA, POLICIES = N.POLICIES, load = N.load, save = N.save, $ = N.$, esc = N.esc, inr = N.inr, today = N.today, uid = N.uid, find = N.find, say = N.say, flash = N.flash, takeFlash = N.takeFlash, nextQuoteNo = N.nextQuoteNo;

  /* ---------- policy.html : details ---------- */
  var dname = $('d-name');
  if (dname) {
    var render2 = function () {
      var p = find(new URLSearchParams(location.search).get('id'));
      if (!p) { document.querySelector('[aria-label="Policy details"]').hidden = true; $('d-missing').hidden = false; return; }
      document.title = 'NIVA — ' + p.name;
      dname.textContent = p.name; $('d-desc').textContent = p.description;
      $('d-cov').textContent = inr(p.coverage); $('d-prem').textContent = inr(p.premium);
      $('d-copay').textContent = p.copay + '%'; $('d-term').textContent = p.term; $('d-claims').textContent = p.claims;
      $('d-terms').innerHTML = p.terms.map(function (t) { return '<li><b>' + esc(t[0]) + '</b><span>' + esc(t[1]) + '</span></li>'; }).join('');
      $('d-excl').innerHTML = p.exclusions.map(function (t) { return '<li><b>' + esc(t[0]) + '</b><span>' + esc(t[1]) + '</span></li>'; }).join('');
      $('d-quote').onclick = function () { window.location.href = '../get-quote/index.html?id=' + encodeURIComponent(p.id); };
    };
    render2();
  }
})();
