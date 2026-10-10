/* Home page: hero video pause / play. */
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
})();
