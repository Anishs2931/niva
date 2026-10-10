/* Quote details page (?id=<quote id>): full offer, insured details, documents, add-ons, questionnaire, conditions.
 * Accept / Reject appear while the quote is "Offered". Fields that are not collected yet show a dash. */
(function () {
  var N = window.NIVA, load = N.load, save = N.save, $ = N.$, esc = N.esc, inr = N.inr, find = N.find, today = N.today, uid = N.uid;
  var ADDON_PRICE = 5000;   /* placeholder — keep in step with get-quote/script.js */
  var qs = load('quotes'), id = new URLSearchParams(location.search).get('id');
  var q = qs.filter(function (x) { return x.id === id; })[0];
  if (!q) { $('qd').hidden = true; $('qd-missing').hidden = false; return; }
  var p = find(q.pid) || { name: q.name, description: '', coverage: q.coverage, premium: q.premium, copay: 10, claims: 2, terms: [], exclusions: [] };
  var person = load('people').filter(function (x) { return x.name === q.person; })[0] || {};
  function dash(v) { return v ? v : '\u2014'; }
  function T(el, v) { $(el).textContent = v; }

  function paint() {
    var st = q.status || 'Pending';
    document.title = 'NIVA \u2014 Quote Q-' + q.no;
    T('qd-no', 'Quote: Q-' + q.no); T('qd-name', q.name); T('qd-desc', p.description);
    var tag = $('qd-status'); tag.textContent = st; tag.className = 'qc-tag st-' + st.toLowerCase();
    $('qd-accept').hidden = $('qd-reject').hidden = st !== 'Offered';
    $('qd-buy').hidden = !(st === 'Accepted' || st === 'Approved');
    T('qd-cov', inr(q.coverage)); T('qd-prem', inr(q.premium)); T('qd-copay', p.copay + '%');
    T('qd-addterms', dash(q.additional)); T('qd-addterms2', q.additional || 'No additional terms.');
    T('qi-name', dash(q.person)); T('qi-dob', dash(person.dob)); T('qi-gender', dash(person.gender));
    T('qi-aadhaar', dash(person.aadhaar)); T('qi-pan', dash(person.pan)); T('qi-address', dash(person.address));
    T('qs-cov', inr(q.coverage)); T('qs-prem', inr(q.premium)); T('qs-copay', p.copay + '%'); T('qs-claims', p.claims);
    T('qp-start', st === 'Accepted' || st === 'Approved' ? q.date : 'Not started'); T('qp-end', 'Not available');
    T('qb-cov', inr(p.coverage)); T('qb-prem', inr(p.premium));
    T('qdoc-id', (q.docs && q.docs[0]) || 'DOCUMENT_ID_PROOF'); T('qdoc-addr', (q.docs && q.docs[1]) || 'DOCUMENT_ADDRESS_PROOF');
    $('qd-addons').innerHTML = q.addon
      ? '<li><div><b>Premium Coverage Add-on</b><span>Additional coverage for premium procedures</span><em>Additional cost ' + inr(ADDON_PRICE) + '</em></div><span class="qc-tag st-approved">Selected</span></li>'
      : '<li><span>No add-ons selected.</span></li>';
    T('qq-resp', dash(q.previous));
    function list(el, arr) { $(el).innerHTML = arr.length ? arr.map(function (t) { return '<li><b>' + esc(t[0]) + '</b><span>' + esc(t[1]) + '</span></li>'; }).join('') : '<li><span>None.</span></li>'; }
    list('qd-cond', p.terms || []); list('qd-exc', p.exclusions || []);
  }
  function setStatus(s) { q.status = s; save('quotes', qs); paint(); }
  $('qd-accept').onclick = function () { setStatus('Accepted'); };
  $('qd-reject').onclick = function () { setStatus('Rejected'); };
  $('qd-buy').onclick = function () {
    var ps = load('policies');
    ps.unshift({ id: uid(), name: q.name, person: q.person, coverage: q.coverage, premium: q.premium, start: today() });
    save('policies', ps); save('quotes', qs.filter(function (x) { return x.id !== q.id; }));
    window.location.href = '../my-policies/index.html';
  };
  paint();
})();
