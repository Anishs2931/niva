/* Shared: mobile menu, broken-image fallback, scroll reveal. */
(function () {
  // Mobile menu
  var btn = document.getElementById('menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('hidden') === false;
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { menu.classList.add('hidden'); btn.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Missing supplied asset -> drop the broken <img>, neutral block remains
  document.querySelectorAll('.media img').forEach(function (img) {
    img.addEventListener('error', function () { img.remove(); });
    if (img.complete && img.naturalWidth === 0) img.remove();
  });

  // Section reveal
  document.documentElement.classList.add('js');
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
