/* Quotes page: summary, quote cards, buy / remove. */
(function () {
  var N = window.NIVA, POLICIES = N.POLICIES, load = N.load, save = N.save, $ = N.$, esc = N.esc, inr = N.inr, today = N.today, uid = N.uid, find = N.find, say = N.say, flash = N.flash, takeFlash = N.takeFlash, nextQuoteNo = N.nextQuoteNo;

  /* ---------- quotes.html ---------- */
  var qlist = $('quote-list');
  if (qlist) {
    var renderQuotes = function () {
      var qs = load('quotes'), live = qs.filter(function (q) { return q.status !== 'Rejected'; });
      var cov = 0, prem = 0; live.forEach(function (q) { cov += q.coverage; prem += q.premium; });
      $('q-active').textContent = live.length; $('q-count').textContent = qs.length;
      $('q-cov').textContent = inr(cov); $('q-prem').textContent = inr(prem);
      $('quote-empty').hidden = qs.length > 0;
      qlist.innerHTML = qs.map(function (q) {
        var st = q.status || 'Pending', pol = find(q.pid), canBuy = st === 'Accepted' || st === 'Approved';
        return '<li><article class="qcard">' +
          '<div class="qc-top"><span class="policy-label">Quote: Q-' + esc(q.no || '') + '</span><span class="qc-tag st-' + esc(st.toLowerCase()) + '">' + esc(st) + '</span></div>' +
          '<h3>' + esc(q.name) + '</h3><p class="qc-desc">' + esc(pol ? pol.description : '') + '</p>' +
          '<div class="qc-row"><div class="pol-meta">' +
            '<div><span>Coverage</span><b>' + inr(q.coverage) + '</b></div><div><span>Premium</span><b>' + inr(q.premium) + '</b></div><div><span>Insured person</span><b>' + esc(q.person) + '</b></div></div>' +
            '<div class="pol-actions">' + (canBuy ? '<button type="button" class="pol-btn small" data-buy="' + esc(q.id) + '">Buy policy</button>' : '') +
            '<button type="button" class="pol-link" data-rmq="' + esc(q.id) + '">Remove quote</button>' +
            '<a class="pol-btn small" href="../quote-details/index.html?id=' + encodeURIComponent(q.id) + '">View Details</a></div></div>' +
        '</article></li>';
      }).join('');
    };
    qlist.addEventListener('click', function (e) {
      var buy = e.target.closest('[data-buy]'), rm = e.target.closest('[data-rmq]');
      var qs = load('quotes');
      if (buy) {
        var q = qs.filter(function (x) { return x.id === buy.getAttribute('data-buy'); })[0]; if (!q) return;
        var ps = load('policies');
        ps.unshift({ id: uid(), name: q.name, person: q.person, coverage: q.coverage, premium: q.premium, start: today() });
        save('policies', ps);
        save('quotes', qs.filter(function (x) { return x.id !== q.id; }));
        window.location.href = '../my-policies/index.html';
      } else if (rm) {
        save('quotes', qs.filter(function (x) { return x.id !== rm.getAttribute('data-rmq'); })); renderQuotes();
      }
    });
    renderQuotes();
  }
})();
