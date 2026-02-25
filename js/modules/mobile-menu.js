/**
 * Menu mobile – ouverture/fermeture du panneau latéral
 *
 * Gère le toggle du menu hamburger, l'overlay, le scroll-lock du body,
 * la fermeture via Escape et le piège de focus (a11y).
 *
 * @module mobile-menu
 */

/** @type {HTMLElement|null} */
let header = null;
/** @type {HTMLElement|null} */
let nav = null;
/** @type {HTMLButtonElement|null} */
let toggle = null;
/** @type {HTMLElement|null} */
let overlay = null;

function isOpen() {
  return header?.classList.contains('menu-open') ?? false;
}

function open() {
  if (!header || !nav || !toggle) return;
  header.classList.add('menu-open');
  nav.classList.add('is-open');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Fermer le menu');
  document.body.style.overflow = 'hidden';

  const firstLink = nav.querySelector('a');
  if (firstLink) firstLink.focus();
}

function close() {
  if (!header || !nav || !toggle) return;
  header.classList.remove('menu-open');
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
    const focusable = nav.querySelectorAll(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      toggle?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      toggle?.focus();
    }
  }
}

/**
 * Initialise le menu mobile (à appeler après chargement du DOM).
 */
export function initMobileMenu(root = document) {
  header = root.getElementById('site-header');
  if (!header) return;

  toggle = header.querySelector('.menu-toggle');
  nav = header.querySelector('.main-nav');
  overlay = header.querySelector('.menu-overlay');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    isOpen() ? close() : open();
  });

  if (overlay) {
    overlay.addEventListener('click', close);
  }

  root.addEventListener('keydown', handleKeyDown);
}
