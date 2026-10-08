(function () {
  // Hero pause / play
  var video = document.getElementById('hero-video');
  var toggle = document.getElementById('hero-toggle');
  if (video && toggle) {
    var iconPause = toggle.querySelector('[data-icon="pause"]');
    var iconPlay = toggle.querySelector('[data-icon="play"]');
    var sync = function () {
      var paused = video.paused;
      iconPause.classList.toggle('hidden', paused);
      iconPlay.classList.toggle('hidden', !paused);
      toggle.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
      toggle.setAttribute('aria-pressed', String(paused));
    };
    toggle.addEventListener('click', function () {
      if (video.paused) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
      else video.pause();
    });
    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    sync();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause();
  }

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
