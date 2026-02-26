/**
 * Menu mobile Apogei — ouverture/fermeture du panneau latéral
 *
 * Gère le toggle du menu hamburger, l'overlay, le scroll-lock du body,
 * la fermeture via Escape et le piège de focus (a11y).
 */
(function () {
  'use strict';

  var header, nav, toggle, closeBtn, overlay;

  function isOpen() {
    return header && header.classList.contains('is-menu-open');
  }

  function open() {
    if (!header || !nav || !toggle) return;
    header.classList.add('is-menu-open');
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fermer le menu');
    document.body.style.overflow = 'hidden';

    var firstLink = nav.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function close() {
    if (!header || !nav || !toggle) return;
    header.classList.remove('is-menu-open');
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.style.overflow = '';
    toggle.focus();
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape' && isOpen()) {
      close();
    }

    if (e.key === 'Tab' && isOpen() && nav) {
      var focusable = nav.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        toggle.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        toggle.focus();
      }
    }
  }

  function init() {
    header = document.getElementById('apogei-header');
    if (!header) return;

    toggle = header.querySelector('.apogei-header__toggle');
    nav = header.querySelector('.apogei-header__nav');
    closeBtn = header.querySelector('.apogei-header__close');
    overlay = header.querySelector('.apogei-header__overlay');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      isOpen() ? close() : open();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', close);
    }

    if (overlay) {
      overlay.addEventListener('click', close);
    }

    document.addEventListener('keydown', handleKeyDown);

    // Active link detection
    var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    var links = nav.querySelectorAll('.apogei-header__links a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var linkPath = href.replace(/\/$/, '') || '/';
      if (linkPath === currentPath) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
