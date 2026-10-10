/* Shared by the policy pages (policies, policy, quotes, my-policies, my-people).
 * POLICIES is the single list that feeds the cards, detail page and every quote.
 * Quotes, policies and people are kept in this browser (localStorage); swap load()/save() for API calls later.
 * A quote's status is 'Pending' | 'Approved' | 'Rejected' — set it from your backend once one exists.
 * NOTE: placeholder values are flagged in the list below. */
(function () {
  var POLICIES = [
    { id: 'cosmetic-basic', name: 'Cosmetic Insurance Basic', coverage: 100000, premium: 2500, description: 'Coverage for cosmetic and appearance-related treatments.', copay: 10, term: 12, claims: 2, terms: [['Waiting Period', '6 months waiting period'], ['Age Restricted', 'Only 18 above']], exclusions: [['Non-medical Cosmetic Procedures', 'Purely aesthetic procedures are excluded']] },
    { id: 'cosmetic-plus', name: 'Cosmetic Insurance Plus', coverage: 300000, premium: 5000, description: 'Enhanced coverage for cosmetic procedures and treatments.' },
    { id: 'hair-care', name: 'Hair Care Protection', coverage: 150000, premium: 3000, description: 'Coverage for hair transplant and hair restoration procedures.' },
    { id: 'skin-care', name: 'Skin Care Protection', coverage: 120000, premium: 2800, description: 'Coverage for skin care and aesthetic skin treatments.' },            // placeholder values
    { id: 'premium-beauty', name: 'Premium Beauty Coverage', coverage: 500000, premium: 8000, description: 'Comprehensive coverage across cosmetic and beauty procedures.' }  // placeholder values
  ];

  /* Only Cosmetic Insurance Basic had real details in the reference; the others use these PLACEHOLDER defaults — replace per policy. */
  POLICIES.forEach(function (p) {
    if (p.copay === undefined) { p.copay = 10; p.term = 12; p.claims = 2; p.terms = [['Waiting Period', '6 months waiting period'], ['Age Restricted', 'Only 18 above']]; p.exclusions = [['Non-medical Cosmetic Procedures', 'Purely aesthetic procedures are excluded']]; }
  });

  /* ---------- helpers ---------- */
  var mem = {};
  function load(key) {
    try { var v = localStorage.getItem('niva.' + key); return v ? JSON.parse(v) : []; } catch (e) { return mem[key] || []; }
  }
  function save(key, val) {
    mem[key] = val;
    try { localStorage.setItem('niva.' + key, JSON.stringify(val)); } catch (e) { /* storage blocked: kept in memory only */ }
  }
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function inr(n) { return '₹' + Number(n).toLocaleString('en-US'); }
  function today() { return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function find(id) { for (var i = 0; i < POLICIES.length; i++) if (POLICIES[i].id === id) return POLICIES[i]; return null; }
  function say(el, text) { el.textContent = text; el.hidden = !text; }
  function flash(text) { try { sessionStorage.setItem('niva.flash', text); } catch (e) { mem.flash = text; } }
  function takeFlash() { var v; try { v = sessionStorage.getItem('niva.flash'); sessionStorage.removeItem('niva.flash'); } catch (e) { v = mem.flash; mem.flash = null; } return v; }
  function nextQuoteNo() { var n = (load('qseq')[0] || 0) + 1; save('qseq', [n]); return n; }

  /* ---------- DEMO DATA ----------
   * Set SEED_DEMO to false to start empty. The sample person and quotes are written once per browser
   * (clear this site's storage to see them again). Statuses here stand in for decisions your backend would make. */
  var SEED_DEMO = true;
  if (SEED_DEMO && !load('seeded').length && !load('quotes').length && !load('people').length) {
    save('people', [{ id: 'demo-john', name: 'John', rel: 'Self', dob: '1995-01-01', gender: 'Male', aadhaar: '1234 5678 9012', pan: 'ABCDE1234F', address: '12 Sample Street, Sample City' }]);
    save('quotes', [
      { id: 'demo-q4', addon: false, previous: 'No', no: 4, pid: 'cosmetic-basic', name: 'Cosmetic Insurance Basic', person: 'John', coverage: 100000, premium: 2500, date: '8 Oct 2026', status: 'Rejected' },
      { id: 'demo-q3', addon: true, previous: 'Yes', no: 3, pid: 'cosmetic-plus', name: 'Cosmetic Insurance Plus', person: 'John', coverage: 300000, premium: 5000, date: '6 Oct 2026', status: 'Offered' },
      { id: 'demo-q2', addon: false, previous: 'No', no: 2, pid: 'hair-care', name: 'Hair Care Protection', person: 'John', coverage: 150000, premium: 3000, date: '3 Oct 2026', status: 'Approved' },
      { id: 'demo-q1', addon: true, previous: 'Yes', no: 1, pid: 'cosmetic-basic', name: 'Cosmetic Insurance Basic', person: 'John', coverage: 100000, premium: 2500, date: '1 Oct 2026', status: 'Rejected' }
    ]);
    save('qseq', [4]);
    save('seeded', [1]);
  }

  /* migrate older demo data: Q-3 becomes an Offered quote so Accept / Reject can be tried */
  (function () { var qs = load('quotes'), ch = false; qs.forEach(function (x) { if (x.id === 'demo-q3' && x.status === 'Pending') { x.status = 'Offered'; ch = true; } }); var DEMO = { 'demo-q4': [false, 'No'], 'demo-q3': [true, 'Yes'], 'demo-q2': [false, 'No'], 'demo-q1': [true, 'Yes'] }; qs.forEach(function (x) { if (x.no === 7 && !x.previous) { x.addon = true; x.previous = 'Yes'; ch = true; } });
    qs.forEach(function (x) { if (DEMO[x.id] && x.previous === undefined) { x.addon = DEMO[x.id][0]; x.previous = DEMO[x.id][1]; ch = true; } }); if (ch) save('quotes', qs); })();

  window.NIVA = { POLICIES: POLICIES, load: load, save: save, $: $, esc: esc, inr: inr, today: today, uid: uid, find: find, say: say, flash: flash, takeFlash: takeFlash, nextQuoteNo: nextQuoteNo };
})();
