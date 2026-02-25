/**
 * Establishment Detail - Tabs & Gallery Lightbox
 *
 * Gère les onglets (Présentation / Services / Équipe / Accès) et la galerie
 * photos (lightbox) sur etablissement-detail.html.
 *
 * @module establishment-tabs
 */

// --------------------------------------------------------------------------
// STATE
// --------------------------------------------------------------------------

const TAB_LABELS = ['Présentation', 'Services', 'Équipe', 'Accès'];
let activeTabIndex = 0;
let tabListEl = null;
let panels = [];
let lightboxEl = null;

// --------------------------------------------------------------------------
// TABS
// --------------------------------------------------------------------------

/**
 * Crée la liste d'onglets et l'insère avant les content-section.
 * @param {HTMLElement} container - .container qui contient les .content-section
 */
function createTabList(container) {
  const firstSection = container.querySelector('.content-section');
  if (!firstSection || container.querySelectorAll('.content-section').length < 4) return;

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Contenu de l\'établissement');
  nav.className = 'establishment-tabs';
  nav.innerHTML = '<div class="establishment-tabs__list" role="tablist"></div>';

  const list = nav.querySelector('[role="tablist"]');
  TAB_LABELS.forEach((label, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'tab';
    button.id = `establishment-tab-${index + 1}`;
    button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    button.setAttribute('aria-controls', `establishment-panel-${index + 1}`);
    button.className = 'establishment-tabs__tab btn btn-ghost';
    if (index === 0) button.classList.add('active');
    button.textContent = label;
    button.addEventListener('click', () => switchTab(index));
    button.addEventListener('keydown', (e) => handleTabKeydown(e, index));
    list.appendChild(button);
  });

  container.insertBefore(nav, firstSection);
  tabListEl = list;
}

/**
 * Bascule vers l'onglet donné.
 * @param {number} index - Index de l'onglet (0-based)
 */
function switchTab(index) {
  if (index === activeTabIndex || index < 0 || index >= panels.length) return;
  activeTabIndex = index;

  const tabs = tabListEl.querySelectorAll('[role="tab"]');
  tabs.forEach((tab, i) => {
    const isSelected = i === index;
    tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    tab.classList.toggle('active', isSelected);
  });
  panels.forEach((panel, i) => {
    const isVisible = i === index;
    panel.hidden = !isVisible;
    panel.classList.toggle('hidden', !isVisible);
    panel.style.display = isVisible ? 'block' : 'none';
  });
}

/**
 * Gestion clavier (flèches, Home, End) pour les onglets.
 */
function handleTabKeydown(e, currentIndex) {
  let nextIndex = currentIndex;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    nextIndex = Math.min(currentIndex + 1, panels.length - 1);
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    nextIndex = Math.max(currentIndex - 1, 0);
  } else if (e.key === 'Home') {
    e.preventDefault();
    nextIndex = 0;
  } else if (e.key === 'End') {
    e.preventDefault();
    nextIndex = panels.length - 1;
  } else return;
  switchTab(nextIndex);
  tabListEl.querySelectorAll('[role="tab"]')[nextIndex].focus();
}

/**
 * Marque les panels avec role="tabpanel" et id pour l'accessibilité.
 */
function setupPanels(container) {
  const sections = container.querySelectorAll('.content-section');
  panels = Array.from(sections).slice(0, 4);
  panels.forEach((panel, index) => {
    panel.setAttribute('role', 'tabpanel');
    panel.id = `establishment-panel-${index + 1}`;
    panel.setAttribute('aria-labelledby', `establishment-tab-${index + 1}`);
    if (index > 0) {
      panel.hidden = true;
      panel.classList.add('hidden');
      panel.style.display = 'none';
    }
  });
}

// --------------------------------------------------------------------------
// GALLERY LIGHTBOX
// --------------------------------------------------------------------------

/**
 * Récupère les URLs des images de la galerie (hero + optionnel data-gallery sur le trigger).
 */
function getGalleryImages(rootElement) {
  const heroImg = rootElement.querySelector('.detail-hero-media img');
  const trigger = rootElement.querySelector('.media-gallery-trigger');
  const urls = [];
  if (heroImg && heroImg.src) urls.push({ src: heroImg.src, alt: heroImg.alt || 'Photo de l\'établissement' });
  if (trigger && trigger.dataset.gallery) {
    try {
      const extra = JSON.parse(trigger.dataset.gallery);
      if (Array.isArray(extra)) extra.forEach((item) => urls.push(typeof item === 'string' ? { src: item, alt: '' } : item));
    } catch (_) {}
  }
  if (urls.length === 0 && heroImg) urls.push({ src: heroImg.src, alt: heroImg.alt || 'Photo' });
  return urls;
}

/**
 * Ouvre la lightbox avec l'image à l'index donné.
 */
function openLightbox(rootElement, index = 0) {
  const images = getGalleryImages(rootElement);
  if (images.length === 0) return;

  if (!lightboxEl) {
    lightboxEl = document.createElement('div');
    lightboxEl.className = 'establishment-lightbox';
    lightboxEl.setAttribute('role', 'dialog');
    lightboxEl.setAttribute('aria-modal', 'true');
    lightboxEl.setAttribute('aria-label', 'Galerie photos');
    lightboxEl.innerHTML = `
      <div class="establishment-lightbox__backdrop"></div>
      <div class="establishment-lightbox__content">
        <button type="button" class="establishment-lightbox__close" aria-label="Fermer la galerie">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button type="button" class="establishment-lightbox__prev" aria-label="Photo précédente">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <img class="establishment-lightbox__img" src="" alt="">
        <button type="button" class="establishment-lightbox__next" aria-label="Photo suivante">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    `;
    document.body.appendChild(lightboxEl);

    const backdrop = lightboxEl.querySelector('.establishment-lightbox__backdrop');
    const closeBtn = lightboxEl.querySelector('.establishment-lightbox__close');
    const prevBtn = lightboxEl.querySelector('.establishment-lightbox__prev');
    const nextBtn = lightboxEl.querySelector('.establishment-lightbox__next');
    const img = lightboxEl.querySelector('.establishment-lightbox__img');

    const close = () => {
      lightboxEl.classList.remove('visible');
      document.body.style.overflow = '';
      lightboxEl.setAttribute('aria-hidden', 'true');
    };

    backdrop.addEventListener('click', close);
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const list = lightboxEl._currentImages || [];
      if (list.length) showLightboxImage(list, (currentIndex - 1 + list.length) % list.length);
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const list = lightboxEl._currentImages || [];
      if (list.length) showLightboxImage(list, (currentIndex + 1) % list.length);
    });

    let currentIndex = 0;
    function showLightboxImage(list, idx) {
      currentIndex = idx;
      const item = list[idx];
      img.src = item.src || item;
      img.alt = item.alt || `Photo ${idx + 1}`;
      prevBtn.style.visibility = list.length > 1 ? 'visible' : 'hidden';
      nextBtn.style.visibility = list.length > 1 ? 'visible' : 'hidden';
    }

    lightboxEl._showImage = showLightboxImage;
  }

  lightboxEl._currentImages = images;
  lightboxEl._showImage(images, index);
  lightboxEl.classList.add('visible');
  lightboxEl.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lightboxEl.querySelector('.establishment-lightbox__close').focus();

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      lightboxEl.classList.remove('visible');
      document.body.style.overflow = '';
      lightboxEl.setAttribute('aria-hidden', 'true');
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}

// --------------------------------------------------------------------------
// INIT
// --------------------------------------------------------------------------

export function initEstablishmentTabs(rootElement = document) {
  const container = rootElement.querySelector('.section-padding .container');
  if (!container) return;

  const sections = container.querySelectorAll('.content-section');
  if (sections.length >= 4) {
    setupPanels(container);
    createTabList(container);
  }

  const galleryTrigger = rootElement.querySelector('.media-gallery-trigger');
  if (galleryTrigger) {
    galleryTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(rootElement, 0);
    });
    galleryTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(rootElement, 0);
      }
    });
  }
}
