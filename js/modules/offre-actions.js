/**
 * Offre Detail - Print & Share
 *
 * Gère le bouton d'impression et les boutons de partage (LinkedIn, Facebook, email)
 * sur offre-detail.html.
 *
 * @module offre-actions
 */

/**
 * Ouvre la fenêtre d'impression du navigateur.
 */
function handlePrint() {
  window.print();
}

/**
 * Construit l'URL de partage selon le réseau et ouvre la fenêtre.
 * @param {string} network - 'linkedin' | 'facebook' | 'email'
 */
function shareOffer(network) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title || 'Offre d\'emploi - Apogei 94');
  const body = encodeURIComponent(`${document.title || 'Offre d\'emploi'}\n${window.location.href}`);

  let shareUrl = '';
  if (network === 'linkedin') {
    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  } else if (network === 'facebook') {
    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  } else if (network === 'email') {
    shareUrl = `mailto:?subject=${title}&body=${body}`;
  }
  if (shareUrl) {
    window.open(shareUrl, network === 'email' ? '_self' : 'share', 'width=600,height=400,noopener');
  }
}

/**
 * Initialise le module sur la page détail offre.
 * @param {Document|Element} rootElement
 */
export function initOffreActions(rootElement = document) {
  const printBtn = rootElement.querySelector('[data-action="print"]');
  if (printBtn) {
    printBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handlePrint();
    });
  }

  const shareBtns = rootElement.querySelectorAll('.share-btn[data-share]');
  shareBtns.forEach((btn) => {
    const network = btn.getAttribute('data-share').toLowerCase();
    if (!['linkedin', 'facebook', 'email'].includes(network)) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      shareOffer(network);
    });
  });
}
