/**
 * Header - Lien actif dans la navigation principale
 *
 * Détermine la page courante (URL) et marque le lien correspondant
 * dans .header .nav-links avec class="active" et aria-current="page".
 * Réutilisable tel quel dans le thème FSE (enqueue le même script).
 *
 * @module header-active-link
 */

/**
 * Retourne le nom du fichier courant à partir de l'URL (ex. etablissements.html, index.html).
 */
function getCurrentPagePath() {
  const pathname = window.location.pathname || '';
  const segment = pathname.split('/').filter(Boolean).pop() || '';
  if (segment === '' || segment === 'index.html') return 'index.html';
  return segment;
}

/**
 * Retourne le nom de page à partir d'un href (ex. etablissements.html, index.html).
 */
function getPageFromHref(href) {
  if (!href) return '';
  try {
    const url = new URL(href, window.location.origin);
    const segment = url.pathname.split('/').filter(Boolean).pop() || '';
    return segment === '' ? 'index.html' : segment;
  } catch {
    const segment = href.split('/').filter(Boolean).pop() || href;
    return segment === '' ? 'index.html' : segment;
  }
}

/**
 * Applique l'état actif au lien de la nav qui correspond à la page courante.
 */
function setHeaderActiveLink(root = document) {
  const navLinks = root.querySelectorAll('.header .nav-links a');
  if (!navLinks.length) return;

  const currentPage = getCurrentPagePath();

  navLinks.forEach((link) => {
    const linkPage = getPageFromHref(link.getAttribute('href'));
    const isActive = linkPage === currentPage;

    if (isActive) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Initialise le lien actif du header (à appeler après chargement du DOM).
 */
export function initHeaderActiveLink(root = document) {
  setHeaderActiveLink(root);
}
