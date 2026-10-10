/* Policies page: renders the policy cards. Set data-endpoint on #policy-grid to load them from an API. */
(function () {
  var N = window.NIVA, POLICIES = N.POLICIES, load = N.load, save = N.save, $ = N.$, esc = N.esc, inr = N.inr, today = N.today, uid = N.uid, find = N.find, say = N.say, flash = N.flash, takeFlash = N.takeFlash, nextQuoteNo = N.nextQuoteNo;

  /* ---------- policies.html : cards ---------- */
  var grid = $('policy-grid');
  if (grid) {
    var render = function (list) {
      grid.innerHTML = list.map(function (p) {
        return '<li><a href="../policy/index.html?id=' + encodeURIComponent(p.id) + '" data-policy="' + esc(p.id) + '" class="serve-card policy-card group" aria-label="View details of ' + esc(p.name) + '">' +
          '<div class="flex items-start justify-between gap-6">' +
            '<h2 class="font-serif-display text-[clamp(28px,2.2vw,36px)] leading-[1.15]">' + esc(p.name) + '</h2>' +
            '<span class="arrow flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full border border-black text-[18px] leading-none" aria-hidden="true">→</span>' +
          '</div>' +
          '<dl class="mt-12"><dt class="policy-label">Coverage</dt>' +
            '<dd class="font-serif-display text-niva italic text-[clamp(40px,3.3vw,56px)] leading-none mt-3">' + inr(p.coverage) + '</dd></dl>' +
          '<div class="policy-premium"><span class="policy-label">Premium</span><span class="font-bold text-[20px]">' + inr(p.premium) + '</span></div>' +
          '<p class="mt-6 text-[17px] leading-[1.7] text-[#222]">' + esc(p.description) + '</p>' +
        '</a></li>';
      }).join('');
    };
    var url = grid.getAttribute('data-endpoint');
    if (url) {
      fetch(url).then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
        .then(function (list) { if (list && list.length) POLICIES.splice.apply(POLICIES, [0, POLICIES.length].concat(list)); render(POLICIES); })
        .catch(function () { render(POLICIES); });
    } else { render(POLICIES); }
  }
})();
