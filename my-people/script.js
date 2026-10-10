/* Insured People page: list, add (via the "Add New Insured" form) and remove. Stored in this browser. */
(function () {
  var N = window.NIVA, load = N.load, save = N.save, $ = N.$, esc = N.esc, uid = N.uid, say = N.say, takeFlash = N.takeFlash;
  var list = $('people-list'), form = $('people-form'), toggle = $('people-add');

  function f(label, v) { return '<div><dt>' + label + '</dt><dd>' + (v ? esc(v) : '—') + '</dd></div>'; }
  function render() {
    var ps = load('people');
    $('people-empty').hidden = ps.length > 0;
    list.innerHTML = ps.map(function (p) {
      return '<li class="person"><div class="person-top"><span class="person-av" aria-hidden="true">' + esc((p.name || '?').charAt(0).toUpperCase()) + '</span>' +
        '<div><h3>' + esc(p.name) + '</h3><span class="person-sub">' + esc((p.gender || '').toUpperCase()) + '</span></div>' +
        '<button type="button" class="pol-link person-rm" data-rmp="' + esc(p.id) + '">Remove</button></div>' +
        '<dl class="person-grid">' + f('Date of birth', p.dob) + f('Aadhaar number', p.aadhaar) + f('PAN number', p.pan) + f('Address', p.address) + '</dl></li>';
    }).join('');
  }
  function openForm(open) {
    form.hidden = !open; toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = open ? 'Close' : '+ Add New Insured';
    if (open) $('p-name').focus();
  }
  toggle.addEventListener('click', function () { openForm(form.hidden); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ps = load('people');
    ps.push({ id: uid(), name: $('p-name').value.trim(), dob: $('p-dob').value, gender: $('p-gender').value, aadhaar: $('p-aadhaar').value.trim(), pan: $('p-pan').value.trim().toUpperCase(), address: $('p-address').value.trim() });
    save('people', ps); form.reset(); openForm(false); render();
  });
  list.addEventListener('click', function (e) {
    var r = e.target.closest('[data-rmp]'); if (!r) return;
    save('people', load('people').filter(function (x) { return x.id !== r.getAttribute('data-rmp'); })); render();
  });
  render();
  var note = takeFlash();
  if (note) { say($('people-msg'), note); openForm(true); }
})();
