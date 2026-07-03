/* Love Sun Beauty — shared header behaviour
   Transparent header over the hero → solid on scroll, with logo swap.
   Works on every page (home + internal). */
(function () {
  var h = document.querySelector('header');
  if (!h) return;
  var logo = h.querySelector('.header-logo-img');
  var dark = 'img/logo-nero-rosa.webp';
  var light = 'img/logo-bianco-rosa.webp';
  var hero = document.querySelector('.hero');
  var nav = h.querySelector('nav');

  /* ── Mobile hamburger (built here so every page gets it) ── */
  var toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Apri o chiudi il menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<span></span><span></span><span></span>';
  h.appendChild(toggle);

  function setLogo() {
    if (!logo) return;
    logo.src = (h.classList.contains('scrolled') || h.classList.contains('nav-open')) ? dark : light;
  }
  toggle.addEventListener('click', function () {
    var open = h.classList.toggle('nav-open');
    /* Reuse the proven "scrolled" white-header state so the open drawer
       is always solid and legible, even at the top of the page. */
    if (open) {
      h.classList.add('scrolled');
    } else {
      update();
    }
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    setLogo();
  });
  /* Close the drawer after tapping a real navigation link */
  if (nav) {
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        h.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        setLogo();
      });
    });
  }

  function threshold() {
    var hh = h.offsetHeight || 70;
    if (hero) return Math.max(40, hero.offsetHeight - hh - 10);
    return window.innerHeight * 0.6;
  }
  function update() {
    if (window.scrollY > threshold()) {
      h.classList.add('scrolled');
    } else {
      h.classList.remove('scrolled');
    }
    setLogo();
  }
  setLogo();
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 960 && h.classList.contains('nav-open')) {
      h.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    update();
  });
})();
