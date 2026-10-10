/* Loading component: window.NivaLoader.show(text), .hide(), and .run(text, ms, then) to show it briefly before continuing. */
(function () {
  var el;
  function build() {
    if (el) return el;
    el = document.createElement('div');
    el.className = 'niva-loader';
    el.setAttribute('role', 'alert'); el.setAttribute('aria-live', 'assertive'); el.setAttribute('aria-busy', 'true');
    el.innerHTML = '<div class="ring" aria-hidden="true"></div><p></p>';
    document.body.appendChild(el);
    return el;
  }
  window.NivaLoader = {
    show: function (text) { var e = build(); e.querySelector('p').textContent = text || 'Loading\u2026'; e.offsetWidth; e.classList.add('on'); },
    hide: function () { if (el) el.classList.remove('on'); },
    run: function (text, ms, then) { this.show(text); setTimeout(then, ms || 1500); }
  };
})();
