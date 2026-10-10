/* Login / Sign up — front-end only.
 * Set data-endpoint on #auth-form (e.g. "/api/login") to POST { username, password } as JSON.
 * Without an endpoint the form only validates and shows a note, so nothing pretends to sign anyone in. */
(function () {
  var form = document.getElementById('auth-form');
  if (!form) return;
  var msg = document.getElementById('auth-msg');
  function show(text, info) { msg.textContent = text; msg.className = 'auth-msg' + (info ? ' info' : ''); msg.hidden = false; }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var u = form.username, p = form.password, ok = true;
    [u, p].forEach(function (f) { var bad = !f.value.trim(); f.setAttribute('aria-invalid', bad ? 'true' : 'false'); if (bad) ok = false; });
    if (!ok) { show('Please enter your username and password.'); (u.value.trim() ? p : u).focus(); return; }
    var url = form.getAttribute('data-endpoint');
    if (!url) { show('This form is not connected to an account service yet.', true); return; }
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: u.value.trim(), password: p.value }) })
      .then(function (r) { if (!r.ok) throw new Error(); return r.json().catch(function () { return {}; }); })
      .then(function () { window.location.href = '../home/index.html'; })
      .catch(function () { show(form.getAttribute('data-kind') === 'login' ? 'Incorrect username or password.' : 'We could not create your account. Please try again.'); });
  });
  form.addEventListener('input', function (e) { if (e.target.setAttribute) e.target.setAttribute('aria-invalid', 'false'); msg.hidden = true; });
})();
