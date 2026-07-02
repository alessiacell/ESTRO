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

  function threshold() {
    var hh = h.offsetHeight || 70;
    if (hero) return Math.max(40, hero.offsetHeight - hh - 10);
    return window.innerHeight * 0.6;
  }
  function update() {
    if (window.scrollY > threshold()) {
      h.classList.add('scrolled');
      if (logo) logo.src = dark;
    } else {
      h.classList.remove('scrolled');
      if (logo) logo.src = light;
    }
  }
  if (logo) logo.src = light;
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();
