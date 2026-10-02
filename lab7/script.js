// Mobile menu: єдиний JS на сторінці.
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var panel = document.getElementById('site-nav');
  if (!toggle || !panel) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('is-open', open);
  }
  function isOpen() { return toggle.getAttribute('aria-expanded') === 'true'; }

  toggle.addEventListener('click', function () { setOpen(!isOpen()); });

  // Escape закриває меню і повертає фокус на кнопку
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) { setOpen(false); toggle.focus(); }
  });

  // Перехід за посиланням закриває меню
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  // Перехід на desktop скидає стан
  window.matchMedia('(min-width: 64rem)').addEventListener('change', function (e) {
    if (e.matches) setOpen(false);
  });
})();
