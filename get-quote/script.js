/* Get-a-quote page: application form for ?id=<policy>. Files are not uploaded anywhere yet — only their names are kept with the quote. */
(function () {
  var N = window.NIVA, load = N.load, save = N.save, $ = N.$, inr = N.inr, find = N.find, say = N.say, uid = N.uid, today = N.today, nextQuoteNo = N.nextQuoteNo;
  var ADDON_PRICE = 5000;   /* placeholder — set the real add-on price */
  var p = find(new URLSearchParams(location.search).get('id'));
  if (!p) { $('gq').hidden = true; $('g-missing').hidden = false; return; }
  document.title = 'NIVA — Get a quote: ' + p.name;
  $('g-name').textContent = p.name; $('g-cov').textContent = inr(p.coverage); $('g-prem').textContent = inr(p.premium);
  $('g-addon-price').textContent = '+ ' + inr(ADDON_PRICE);

  var people = load('people'), sel = $('g-person');
  sel.innerHTML = '<option value="">Select insured person</option>' + people.map(function (x) { return '<option value="' + N.esc(x.id) + '">' + N.esc(x.name) + '</option>'; }).join('');
  $('g-noperson').hidden = people.length > 0;

  function total() { return p.premium + ($('g-addon').checked ? ADDON_PRICE : 0); }
  function upd() { $('g-final').textContent = inr(total()); }
  $('g-addon').addEventListener('change', upd); upd();

  $('gq-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var person = people.filter(function (x) { return x.id === sel.value; })[0];
    var id = $('g-id').files[0], addr = $('g-addr').files[0];
    var qs = load('quotes');
    qs.unshift({ id: uid(), no: nextQuoteNo(), pid: p.id, name: p.name, person: person ? person.name : 'Not specified', coverage: p.coverage, premium: total(), date: today(), status: 'Pending',
      addon: $('g-addon').checked, previous: $('g-prev').value.trim(), docs: [id ? id.name : '', addr ? addr.name : ''].filter(Boolean) });
    save('quotes', qs);
    $('gq-form').querySelector('button[type=submit]').disabled = true;
    NivaLoader.run('Submitting your quote request…', 1600, function () { window.location.href = '../quotes/index.html'; });
  });
})();
