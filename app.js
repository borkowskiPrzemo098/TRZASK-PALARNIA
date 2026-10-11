/* TRZASK — sklep demonstracyjny. Koszyk w localStorage, bez wysyłania danych. */
(function () {
  'use strict';

  var COFFEES = [
    { id: 'etiopia', name: 'Etiopia', origin: 'Guji · Hambela', process: 'myta', roast: 1, use: ['przelew'],
      notes: ['bergamotka', 'brzoskwinia', 'jaśmin'], p250: 54, p1000: 189, c: '#f2b705', ink: 'dark',
      alt: '2100–2300 m', variety: 'heirloom', cup: 'Lekka jak herbata, kwiatowa, z długim słodkim finiszem. Najlepsza z dripa.' },
    { id: 'kenia', name: 'Kenia', origin: 'Nyeri · AA', process: 'myta', roast: 1, use: ['przelew'],
      notes: ['czarna porzeczka', 'grejpfrut', 'trzcina'], p250: 62, p1000: 219, c: '#c8321c', ink: 'light',
      alt: '1700–1900 m', variety: 'SL28, SL34', cup: 'Soczysta i wyrazista, kwasowość jak z owoców jagodowych.' },
    { id: 'kolumbia', name: 'Kolumbia', origin: 'Huila · San Agustín', process: 'myta', roast: 2, use: ['przelew', 'espresso'],
      notes: ['karmel', 'czerwone jabłko', 'kakao'], p250: 46, p1000: 159, c: '#2443c7', ink: 'light',
      alt: '1600–1800 m', variety: 'caturra, castillo', cup: 'Zbalansowana na co dzień. Dobrze wychodzi z przelewu i z ekspresu.' },
    { id: 'gwatemala', name: 'Gwatemala', origin: 'Huehuetenango', process: 'myta', roast: 2, use: ['przelew', 'espresso'],
      notes: ['brązowy cukier', 'śliwka', 'migdał'], p250: 48, p1000: 169, c: '#6e2a63', ink: 'light',
      alt: '1500–1900 m', variety: 'bourbon, typica', cup: 'Pełna, okrągła, z ciemnymi owocami. Dobra z mlekiem i bez.' },
    { id: 'rwanda', name: 'Rwanda', origin: 'Nyamasheke', process: 'naturalna', roast: 1, use: ['przelew'],
      notes: ['malina', 'hibiskus', 'kakao'], p250: 58, p1000: 199, c: '#b8336d', ink: 'light',
      alt: '1700–1900 m', variety: 'red bourbon', cup: 'Owocowa bomba z obróbki naturalnej. Słodka, z nutą suszonych owoców.' },
    { id: 'brazylia', name: 'Brazylia', origin: 'Mogiana · Cerrado', process: 'naturalna', roast: 3, use: ['espresso'],
      notes: ['orzech laskowy', 'mleczna czekolada'], p250: 39, p1000: 129, c: '#1f6b45', ink: 'light',
      alt: '1000–1200 m', variety: 'mundo novo, catuai', cup: 'Niska kwasowość, dużo ciała. Klasyczne espresso i flat white.' },
    { id: 'mlyn', name: 'Młyn', origin: 'Mieszanka espresso', process: 'Brazylia + Kolumbia', roast: 4, use: ['espresso'],
      notes: ['gorzka czekolada', 'karmel', 'tytoń'], p250: 42, p1000: 139, c: '#f07a1a', ink: 'dark',
      alt: '—', variety: '60/40', cup: 'Nasza domowa mieszanka do kawiarek, ekspresów kolbowych i automatów.' },
    { id: 'decaf', name: 'Kolumbia bez kofeiny', short: 'Bez kofeiny', origin: 'Tolima · metoda EA', process: 'dekofeinizowana', roast: 2, use: ['decaf', 'przelew', 'espresso'],
      notes: ['panela', 'wiśnia', 'kakao'], p250: 49, p1000: 169, c: '#8cc5ea', ink: 'dark',
      alt: '1500–1800 m', variety: 'caturra', cup: 'Kofeinę usunięto naturalnie octanem etylu z trzciny cukrowej. Smakuje jak kawa, nie jak kompromis.' }
  ];
  var GRINDS = ['Ziarno', 'Drip / przelew', 'Espresso', 'Aeropress', 'French press', 'Moka'];
  var ROAST_WORDS = ['', 'jasne', 'średnio-jasne', 'średnie', 'ciemne'];
  var FREE_FROM = 120;
  var SHIP = { inpost: 12.99, dpd: 16.99, pickup: 0 };
  var KEY = 'trzask-cart-v1';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var zl = function (n) { return n.toFixed(2).replace('.', ',') + ' zł'; };
  var byId = function (id) { for (var i = 0; i < COFFEES.length; i++) if (COFFEES[i].id === id) return COFFEES[i]; return null; };

  /* ---------- daty palenia: ostatni i następny czwartek ---------- */
  var DAYS = ['nd', 'pn', 'wt', 'śr', 'czw', 'pt', 'sb'];
  function lastThursday(d) { var x = new Date(d); x.setDate(x.getDate() - ((x.getDay() - 4 + 7) % 7)); return x; }
  function fmt(d) { return d.getDate() + '.' + String(d.getMonth() + 1).padStart(2, '0'); }
  var today = new Date();
  var roasted = lastThursday(today);
  var next = new Date(roasted); next.setDate(next.getDate() + 7);
  $$('[data-roast-date]').forEach(function (el) { el.textContent = fmt(roasted); });
  $$('[data-next-roast]').forEach(function (el) { el.textContent = DAYS[4] + ' ' + fmt(next); });
  var wbNo = 'TRZ ' + fmt(roasted).replace('.', '') + ' ' + String(1000 + Math.floor(Math.random() * 9000));
  $$('[data-wb-no]').forEach(function (el) { el.textContent = 'Nr ' + wbNo + ' · demo'; });
  var bc = $('[data-barcode]');
  if (bc) { var x = 0, out = '', seed = 7; while (x < 196) { seed = (seed * 9301 + 49297) % 233280; var w = [0.7, 1.1, 1.8][seed % 3]; if ((seed >> 3) % 2) out += '<rect x="' + x + '" y="0" width="' + w + '" height="34"/>'; x += w + 0.9; } bc.innerHTML = out; }

  /* ---------- koszyk ---------- */
  function load() { try { var v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
  var cart = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} render(); }
  function priceOf(line) { var c = byId(line.id); return c ? (line.w === 1000 ? c.p1000 : c.p250) : 0; }
  function subtotal() { return cart.reduce(function (s, l) { return s + priceOf(l) * l.q; }, 0); }
  function count() { return cart.reduce(function (s, l) { return s + l.q; }, 0); }
  function add(id, w, g) {
    var hit = cart.filter(function (l) { return l.id === id && l.w === w && l.g === g; })[0];
    if (hit) hit.q = Math.min(hit.q + 1, 20); else cart.push({ id: id, w: w, g: g, q: 1 });
    save();
  }
  window.addEventListener('storage', function (e) { if (e.key === KEY) { cart = load(); render(); } });

  function render() {
    var n = count();
    $$('[data-cart-count]').forEach(function (el) { el.textContent = n; el.classList.toggle('is-zero', n === 0); });
    var sub = subtotal();
    var free = sub >= FREE_FROM;
    $$('[data-subtotal]').forEach(function (el) { el.textContent = zl(sub); });
    renderDrawer(sub, free);
    renderOrder(sub, free);
  }

  function lineHTML(l, i, editable) {
    var c = byId(l.id); if (!c) return '';
    var w = l.w === 1000 ? '1 kg' : '250 g';
    var meta = 'poz. ' + (i + 1) + ' · ' + w + ' · ' + l.g;
    var q = editable
      ? '<div class="qty" role="group" aria-label="Ilość"><button type="button" data-dec="' + i + '" aria-label="Mniej"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg></button><output>' + l.q + '</output><button type="button" data-inc="' + i + '" aria-label="Więcej"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg></button></div>'
      : '<span class="line__q">' + l.q + ' ×</span>';
    return '<li class="line" style="--lc:' + c.c + '">' +
      '<span class="line__chip" aria-hidden="true"></span>' +
      '<div class="line__main"><b>' + c.name + '</b><span>' + meta + '</span></div>' + q +
      '<em class="line__price">' + zl(priceOf(l) * l.q) + '</em>' +
      (editable ? '<button class="line__rm" type="button" data-rm="' + i + '" aria-label="Usuń ' + c.name + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' : '') +
      '</li>';
  }

  function renderDrawer(sub, free) {
    var list = $('[data-lines]'); if (!list) return;
    list.innerHTML = cart.map(function (l, i) { return lineHTML(l, i, true); }).join('');
    var empty = cart.length === 0;
    $('[data-empty]').hidden = !empty;
    $('[data-foot]').hidden = empty;
    $('[data-freebar]').hidden = empty;
    $('[data-wb-parties]').hidden = empty; $('[data-wb-cols]').hidden = empty;
    var kg = cart.reduce(function (s, l) { return s + l.w * l.q; }, 0) / 1000;
    $('[data-mass]').textContent = String(kg).replace('.', ',') + ' kg';
    $('[data-shipping]').textContent = free ? '0,00 zł' : 'od ' + zl(SHIP.inpost);
    var left = FREE_FROM - sub;
    $('[data-free-text]').innerHTML = free ? '<b>Darmowa dostawa.</b> Paczkomat i kurier gratis.' : 'Brakuje <b>' + zl(left) + '</b> do darmowej dostawy.';
    $('[data-free-fill]').style.transform = 'scaleX(' + Math.min(sub / FREE_FROM, 1) + ')';
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-inc],[data-dec],[data-rm]'); if (!t) return;
    var i;
    if (t.hasAttribute('data-inc')) { i = +t.getAttribute('data-inc'); cart[i].q = Math.min(cart[i].q + 1, 20); }
    else if (t.hasAttribute('data-dec')) { i = +t.getAttribute('data-dec'); cart[i].q -= 1; if (cart[i].q < 1) cart.splice(i, 1); }
    else { i = +t.getAttribute('data-rm'); cart.splice(i, 1); }
    save();
    var p = $('.drawer__panel'); if (p && document.activeElement && !p.contains(document.activeElement)) p.focus();
  });

  /* ---------- szuflada koszyka ---------- */
  var drawer = $('#cart'), lastFocus = null;
  function openCart() {
    if (!drawer) return;
    lastFocus = document.activeElement;
    drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('is-locked');
    setTimeout(function () { $('.drawer__panel').focus(); }, 30);
  }
  function closeCart() {
    if (!drawer || !drawer.classList.contains('is-open')) return;
    drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('is-locked');
    if (lastFocus) lastFocus.focus();
  }
  $$('[data-open-cart]').forEach(function (b) { b.addEventListener('click', openCart); });
  $$('[data-close-cart]').forEach(function (b) {
    b.addEventListener('click', function () {
      closeCart();
      var go = b.getAttribute('data-goto'); if (go) { var el = $(go); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeCart();
    if (e.key === 'Tab' && drawer && drawer.classList.contains('is-open')) {
      var f = $$('button,a[href],select,input', $('.drawer__panel')).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------- etykiety kaw ---------- */
  var labels = $('#labels');
  function roastBar(r) {
    var s = '';
    for (var i = 1; i <= 4; i++) s += '<i class="' + (i <= r ? 'on' : '') + '"></i>';
    return '<span class="lbl__roast" aria-label="Stopień palenia: ' + ROAST_WORDS[r] + '">' + s + '<em>' + ROAST_WORDS[r] + '</em></span>';
  }
  function useText(c) {
    if (c.use.indexOf('decaf') > -1) return 'przelew i espresso';
    return c.use.length > 1 ? 'przelew i espresso' : (c.use[0] === 'przelew' ? 'do przelewu' : 'do espresso');
  }
  if (labels) {
    labels.innerHTML = COFFEES.map(function (c) {
      var big = c.short || c.name;
      return '<article class="lbl lbl--' + c.ink + '" style="--lc:' + c.c + '" data-use="' + c.use.join(' ') + '" id="k-' + c.id + '">' +
        '<div class="lbl__face">' +
          '<p class="lbl__stamp" aria-label="Data palenia"><span>Wypalone</span><b>' + fmt(roasted) + '</b></p>' +
          '<h3 class="lbl__name">' + big + '</h3>' +
          '<p class="lbl__origin">' + c.origin + ' · ' + c.process + '</p>' +
          '<p class="lbl__notes">' + c.notes.join(' / ') + '</p>' +
          '<div class="lbl__meta">' + roastBar(c.roast) + '<span class="lbl__use">' + useText(c) + '</span></div>' +
          '<p class="lbl__added" aria-hidden="true">W koszyku</p>' +
        '</div>' +
        '<div class="lbl__buy">' +
          '<div class="seg" role="radiogroup" aria-label="Gramatura ' + c.name + '">' +
            '<label><input type="radio" name="w-' + c.id + '" value="250" checked><span>250 g<em>' + zl(c.p250) + '</em></span></label>' +
            '<label><input type="radio" name="w-' + c.id + '" value="1000"><span>1 kg<em>' + zl(c.p1000) + '</em></span></label>' +
          '</div>' +
          '<label class="grind"><span class="sr">Mielenie</span><select name="g-' + c.id + '">' +
            GRINDS.map(function (g) { return '<option>' + g + '</option>'; }).join('') + '</select></label>' +
          '<button class="btn btn--dark lbl__add" type="button" data-add="' + c.id + '">Do koszyka</button>' +
          '<details class="lbl__more"><summary>Profil kawy</summary>' +
            '<dl><div><dt>Wysokość</dt><dd>' + c.alt + '</dd></div><div><dt>Odmiana</dt><dd>' + c.variety + '</dd></div><div><dt>Obróbka</dt><dd>' + c.process + '</dd></div></dl>' +
            '<p>' + c.cup + '</p></details>' +
        '</div>' +
      '</article>';
    }).join('');

    labels.addEventListener('click', function (e) {
      var b = e.target.closest('[data-add]'); if (!b) return;
      var id = b.getAttribute('data-add');
      var card = b.closest('.lbl');
      var w = +$('input[name="w-' + id + '"]:checked', card).value;
      var g = $('select[name="g-' + id + '"]', card).value;
      add(id, w, g);
      card.classList.remove('is-added'); void card.offsetWidth; card.classList.add('is-added');
      var cb = $('.cartbtn'); cb.classList.remove('is-bump'); void cb.offsetWidth; cb.classList.add('is-bump');
      toast(byId(id).name + ', ' + (w === 1000 ? '1 kg' : '250 g') + ' · ' + g, true);
    });
  }

  /* filtry */
  $$('[data-filter]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      $$('[data-filter]').forEach(function (b) { var on = b === btn; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
      $$('.lbl').forEach(function (card) {
        card.hidden = !(f === 'all' || card.getAttribute('data-use').split(' ').indexOf(f) > -1);
      });
    });
  });

  /* toast */
  var toastEl = $('[data-toast]'), tt;
  function toast(msg, withCart) {
    if (!toastEl) return;
    toastEl.innerHTML = '<span><b>Dodano:</b> ' + msg + '</span>' + (withCart ? '<button type="button" data-toast-open>Pokaż koszyk</button>' : '');
    toastEl.classList.add('is-on');
    clearTimeout(tt); tt = setTimeout(function () { toastEl.classList.remove('is-on'); }, 3600);
  }
  if (toastEl) toastEl.addEventListener('click', function (e) { if (e.target.closest('[data-toast-open]')) { toastEl.classList.remove('is-on'); openCart(); } });

  /* ---------- strona zamówienia ---------- */
  var form = $('#checkout');
  function shipMethod() { var r = form && $('input[name="ship"]:checked', form); return r ? r.value : 'inpost'; }
  function renderOrder(sub, free) {
    if (!form) return;
    var orderGrid = $('[data-order]');
    if (orderGrid.hidden && cart.length === 0) return;
    var empty = cart.length === 0;
    orderGrid.hidden = empty;
    $('[data-order-empty]').hidden = !empty;
    $('[data-receipt]').innerHTML = cart.map(function (l, i) { return lineHTML(l, i, false); }).join('');
    var m = shipMethod();
    var ship = (m === 'pickup' || free) ? 0 : SHIP[m];
    $$('[data-ship-price]').forEach(function (el) { el.textContent = free ? '0 zł' : zl(SHIP[el.getAttribute('data-ship-price')]).replace(',00', ''); });
    $('[data-shipping]').textContent = zl(ship);
    $('[data-total]').textContent = zl(sub + ship);
    $('[data-pay-total]').textContent = zl(sub + ship);
    var pickup = m === 'pickup', locker = m === 'inpost';
    $$('[data-addr]').forEach(function (el) { el.hidden = pickup || locker; $('input', el).required = !(pickup || locker); });
    $$('[data-locker]').forEach(function (el) { el.hidden = !locker; $('input', el).required = locker; });
  }
  if (form) {
    form.addEventListener('change', render);
    form.addEventListener('input', function (e) { var f = e.target.closest('.field'); if (f) f.classList.remove('is-bad'); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = [];
      $$('input', form).forEach(function (inp) {
        var field = inp.closest('.field');
        if (field && field.hidden) return;
        var ok = inp.checkValidity();
        if (field) field.classList.toggle('is-bad', !ok);
        if (!ok) bad.push(inp);
      });
      var err = $('[data-form-error]');
      if (bad.length) {
        err.textContent = bad[0].name === 'terms' ? 'Zaznacz akceptację regulaminu, żeby złożyć zamówienie.' : bad[0].name === 'zip' && bad[0].value ? 'Kod pocztowy wpisz w formacie 00-000.' : bad[0].name === 'email' && bad[0].value ? 'Sprawdź adres e-mail, brakuje w nim znaku @ lub domeny.' : 'Uzupełnij zaznaczone pola.';
        bad[0].focus();
        return;
      }
      err.textContent = '';
      var btn = $('[data-submit]'); btn.disabled = true; btn.classList.add('is-loading');
      setTimeout(function () {
        var no = 'TRZ-' + String(Math.floor(1000 + Math.random() * 9000));
        var m = shipMethod();
        $('[data-done-no]').textContent = no;
        $('[data-done-text]').textContent = 'Numer zamówienia ' + no + '. ' + (m === 'pickup'
          ? 'Kawa będzie czekać w palarni od piątku ' + fmt(new Date(next.getTime() + 864e5)) + '.'
          : 'Wysyłka w piątek ' + fmt(new Date(next.getTime() + 864e5)) + ', dzień po paleniu.') + ' To zamówienie demonstracyjne, więc nic nie zostało pobrane ani wysłane.';
        cart = []; try { localStorage.setItem(KEY, '[]'); } catch (x) {}
        $('[data-order]').hidden = true;
        $('.order__demo').hidden = true;
        var done = $('[data-done]'); done.hidden = false; done.focus();
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 900);
    });
  }

  render();
})();
