/**
 * Main JavaScript Entry Point
 * 
 * Point d'entrée principal pour le JavaScript d'Apogei 94.
 * Initialise les modules en fonction de la page courante.
 * 
 * @module main
 */

// Import des modules
import { initHeaderActiveLink } from './modules/header-active-link.js';
import { initDonationCalculator } from './modules/donation-calculator.js';
import { initEstablishmentsFilters } from './modules/filters-establishments.js';
import { initCareerFilters } from './modules/filters-jobs.js';
import { initApplicationForm } from './modules/application-form.js';
import { initEstablishmentTabs } from './modules/establishment-tabs.js';
import { initOffreActions } from './modules/offre-actions.js';
import { initMobileMenu } from './modules/mobile-menu.js';

// --------------------------------------------------------------------------
// INITIALISATION AU CHARGEMENT DU DOM
// --------------------------------------------------------------------------

/**
 * Initialise tous les modules nécessaires pour la page courante.
 */
function init() {
  // Lien actif dans la nav du header (toutes les pages)
  initHeaderActiveLink(document);

  // Menu mobile (hamburger) – toutes les pages
  initMobileMenu(document);

  // Détection et initialisation du calculateur de don (page don.html)
  const donateForm = document.getElementById('donate-form');
  if (donateForm) {
    initDonationCalculator(document);
  }

  // Détection et initialisation des filtres établissements (page etablissements.html)
  const isEtablissementsPage = 
    document.querySelector('[data-page="etablissements"]') || 
    document.getElementById('grid-view');
  
  if (isEtablissementsPage) {
    initEstablishmentsFilters(document);
  }

  // Détection et initialisation des filtres carrières (page carrieres.html)
  const isCarrieresPage = 
    document.getElementById('jobs-grid') ||
    document.querySelector('[data-page="carrieres"]');
  
  if (isCarrieresPage) {
    initCareerFilters(document);
  }

  // Détection et initialisation du formulaire de candidature (page postuler.html)
  const isPostulerPage = 
    document.getElementById('application-form') ||
    document.querySelector('[data-page="postuler"]');
  
  if (isPostulerPage) {
    initApplicationForm(document);
  }

  // Détection et initialisation des onglets + galerie (page etablissement-detail.html)
  const isEtablissementDetailPage = document.querySelector('.detail-hero') || document.querySelector('.media-gallery-trigger');
  if (isEtablissementDetailPage) {
    initEstablishmentTabs(document);
  }

  // Détection et initialisation print + partage (page offre-detail.html)
  const isOffreDetailPage = document.querySelector('.job-hero') || document.querySelector('.share-buttons');
  if (isOffreDetailPage) {
    initOffreActions(document);
  }

  console.log('✅ Apogei 94 JavaScript initialized');
}

// Initialisation après le chargement complet du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOM déjà chargé (cas de chargement différé ou module)
  init();
}
