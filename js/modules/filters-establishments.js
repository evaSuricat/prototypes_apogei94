/**
 * Établissements & Dispositifs Filtering System
 * 
 * Gère le filtrage, le tri, la pagination et l'affichage (liste/carte)
 * des établissements et dispositifs d'Apogei 94.
 * 
 * @module filters-establishments
 */

// --------------------------------------------------------------------------
// DATA: Mock data for establishments and dispositifs
// En production, ces données viendraient d'une API ou WordPress REST
// --------------------------------------------------------------------------
const data = [
  {
    id: 1,
    name: "IME Bel Air",
    type: "etablissement",
    pole: "education",
    poleLabel: "Éducation, apprentissage & loisirs",
    location: "Créteil",
    locationSlug: "creteil",
    ageGroup: ["enfants", "ados"],
    description: "Institut Médico-Éducatif accompagnant enfants et adolescents en situation de handicap avec projet pédagogique personnalisé.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Scolarité", "Éducation", "Soins"],
    capacity: "60 places",
    staff: "45 professionnels",
    year: "1985",
    coords: { lat: 48.7903, lng: 2.4555 }
  },
  {
    id: 2,
    name: "ESAT Les Jardins",
    type: "etablissement",
    pole: "professionnelle",
    poleLabel: "Vie professionnelle et citoyenne",
    location: "Saint-Maur-des-Fossés",
    locationSlug: "saint-maur",
    ageGroup: ["adultes"],
    description: "Établissement et Service d'Aide par le Travail proposant activités d'espaces verts, conditionnement et cuisine collective.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Travail adapté", "Insertion", "Espaces verts"],
    capacity: "120 travailleurs",
    staff: "15 moniteurs",
    year: "1992",
    coords: { lat: 48.8014, lng: 2.4856 }
  },
  {
    id: 3,
    name: "SESSAD Horizon",
    type: "dispositif",
    pole: "education",
    poleLabel: "Éducation, apprentissage & loisirs",
    location: "Vitry-sur-Seine",
    locationSlug: "vitry",
    ageGroup: ["enfants", "ados"],
    description: "Service d'Éducation Spéciale et de Soins à Domicile pour accompagnement en milieu ordinaire (école, domicile).",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Domicile", "Scolarité", "Soins"],
    capacity: "80 accompagnés",
    staff: "25 intervenants",
    year: "2001",
    coords: { lat: 48.7875, lng: 2.3933 }
  },
  {
    id: 4,
    name: "FAM Les Oliviers",
    type: "etablissement",
    pole: "medicalise",
    poleLabel: "Établissements et services médicalisés",
    location: "Champigny-sur-Marne",
    locationSlug: "champigny",
    ageGroup: ["adultes"],
    description: "Foyer d'Accueil Médicalisé pour adultes nécessitant un soutien médical et éducatif constant.",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Médicalisé", "Hébergement", "Soins"],
    capacity: "60 résidents",
    staff: "35 professionnels",
    year: "1998",
    coords: { lat: 48.8172, lng: 2.5156 }
  },
  {
    id: 5,
    name: "SAV Autonomie",
    type: "dispositif",
    pole: "habitat",
    poleLabel: "Habitat & vie sociale",
    location: "Ivry-sur-Seine",
    locationSlug: "ivry",
    ageGroup: ["adultes"],
    description: "Service d'Accompagnement à la Vie pour favoriser l'autonomie et l'inclusion sociale en milieu ordinaire.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Autonomie", "Social", "Inclusion"],
    capacity: "150 accompagnés",
    staff: "25 accompagnateurs",
    year: "2010",
    coords: { lat: 48.8139, lng: 2.3864 }
  },
  {
    id: 6,
    name: "MAS Le Domaine",
    type: "etablissement",
    pole: "medicalise",
    poleLabel: "Établissements et services médicalisés",
    location: "Bonneuil-sur-Marne",
    locationSlug: "bonneuil",
    ageGroup: ["adultes"],
    description: "Maison d'Accueil Spécialisée pour adultes en situation de handicap lourd nécessitant assistance constante.",
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Handicap lourd", "Soins continus", "Hébergement"],
    capacity: "50 résidents",
    staff: "40 soignants",
    year: "2003",
    coords: { lat: 48.7733, lng: 2.4889 }
  },
  {
    id: 7,
    name: "UEMA Les Tulipes",
    type: "dispositif",
    pole: "education",
    poleLabel: "Éducation, apprentissage & loisirs",
    location: "Le Perreux-sur-Marne",
    locationSlug: "le-perreux",
    ageGroup: ["enfants"],
    description: "Unité d'Enseignement Maternel Autisée pour scolarisation d'enfants avec troubles du spectre autistique.",
    image: "https://images.unsplash.com/photo-1503454537995-182c148bce7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Autisme", "Scolarité", "Petite enfance"],
    capacity: "12 enfants",
    staff: "8 professionnels",
    year: "2018",
    coords: { lat: 48.8444, lng: 2.5111 }
  },
  {
    id: 8,
    name: "Foyer La Maison Verte",
    type: "etablissement",
    pole: "habitat",
    poleLabel: "Habitat & vie sociale",
    location: "Nogent-sur-Marne",
    locationSlug: "nogent",
    ageGroup: ["adultes"],
    description: "Foyer d'Hébergement pour adultes en situation de handicap, accompagnement vers l'autonomie résidentielle.",
    image: "https://images.unsplash.com/photo-1560448204-8cf87f3c39c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Hébergement", "Autonomie", "Vie sociale"],
    capacity: "45 résidents",
    staff: "22 éducateurs",
    year: "1995",
    coords: { lat: 48.8378, lng: 2.4833 }
  },
  {
    id: 9,
    name: "MJPM Val-de-Marne",
    type: "dispositif",
    pole: "protection",
    poleLabel: "Protection juridique des majeurs",
    location: "Créteil",
    locationSlug: "creteil",
    ageGroup: ["adultes"],
    description: "Service de protection juridique pour majeurs sous tutelle ou curatelle, accompagnement dans les actes de la vie civile.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Tutelle", "Curatelle", "Protection"],
    capacity: "900 majeurs protégés",
    staff: "30 mandataires",
    year: "1988",
    coords: { lat: 48.7903, lng: 2.4555 }
  },
  {
    id: 10,
    name: "DAR Les Sources",
    type: "dispositif",
    pole: "education",
    poleLabel: "Éducation, apprentissage & loisirs",
    location: "Vitry-sur-Seine",
    locationSlug: "vitry",
    ageGroup: ["ados"],
    description: "Dispositif d'Accueil et de Répit pour adolescents en situation de handicap, soutien aux familles.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Adolescents", "Répit", "Accueil temporaire"],
    capacity: "8 places",
    staff: "12 professionnels",
    year: "2015",
    coords: { lat: 48.7875, lng: 2.3933 }
  }
  // Add more items as needed (28 total in production)
];

// --------------------------------------------------------------------------
// STATE PRIVÉ
// --------------------------------------------------------------------------

const state = {
  filters: {
    type: 'all',      // 'all', 'etablissement', 'dispositif'
    pole: '',
    location: '',
    age: '',
    search: ''
  },
  activeChips: [],
  currentPage: 1,
  itemsPerPage: 6,
  viewMode: 'list',   // 'list' | 'map'
  sortBy: 'relevance',
  map: null,          // Instance Leaflet (lazy-init)
  mapMarkers: []      // Marqueurs Leaflet
};

// --------------------------------------------------------------------------
// ÉLÉMENTS DOM (initialisés dans init)
// --------------------------------------------------------------------------

let elements = {};

// --------------------------------------------------------------------------
// FONCTIONS UTILITAIRES
// --------------------------------------------------------------------------

/**
 * Debounce pour la recherche
 * @param {Function} func - Fonction à exécuter
 * @param {number} wait - Délai en ms
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Échappe le HTML pour prévenir les failles XSS
 * @param {string} text - Texte à échapper
 * @returns {string} Texte échappé
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Formate le label du pôle pour l'affichage
 * @param {string} pole - Clé du pôle
 * @returns {string} Label formaté
 */
function formatPoleLabel(pole) {
  const labels = {
    'education': 'Éducation',
    'medicalise': 'Médicalisé',
    'habitat': 'Habitat',
    'professionnelle': 'Professionnel',
    'protection': 'Protection'
  };
  return labels[pole] || pole;
}

// --------------------------------------------------------------------------
// FONCTIONS PURES (Business Logic - Exportables)
// --------------------------------------------------------------------------

/**
 * Filtre les données selon les critères du state
 * Fonction pure : pas d'effets de bord
 * 
 * @param {Object} currentState - Le state actuel
 * @param {Array} allData - Les données complètes
 * @returns {Array} Données filtrées
 */
export function filterData(currentState, allData) {
  let filtered = [...allData];

  // Filtre par type
  if (currentState.filters.type !== 'all') {
    filtered = filtered.filter(item => item.type === currentState.filters.type);
  }

  // Filtre par pôle
  if (currentState.filters.pole) {
    filtered = filtered.filter(item => item.pole === currentState.filters.pole);
  }

  // Filtre par localisation
  if (currentState.filters.location) {
    filtered = filtered.filter(item => item.locationSlug === currentState.filters.location);
  }

  // Filtre par âge
  if (currentState.filters.age) {
    filtered = filtered.filter(item => item.ageGroup.includes(currentState.filters.age));
  }

  // Filtre par recherche texte
  if (currentState.filters.search) {
    const searchLower = currentState.filters.search.toLowerCase();
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(searchLower) ||
      item.location.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  return filtered;
}

/**
 * Trie les résultats selon le critère
 * Fonction pure
 * 
 * @param {Array} results - Résultats à trier
 * @param {string} sortBy - Critère de tri
 * @returns {Array} Résultats triés
 */
export function sortResults(results, sortBy) {
  switch(sortBy) {
    case 'name-asc':
      return results.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return results.sort((a, b) => b.name.localeCompare(a.name));
    case 'location':
      return results.sort((a, b) => a.location.localeCompare(b.location));
    default: // relevance - keep original order
      return results;
  }
}

/**
 * Paginate les données
 * Fonction pure
 * 
 * @param {Array} data - Données complètes
 * @param {number} page - Page courante (1-based)
 * @param {number} perPage - Éléments par page
 * @returns {{ items: Array, totalPages: number }}
 */
export function paginate(data, page, perPage) {
  const totalPages = Math.ceil(data.length / perPage);
  const startIndex = (page - 1) * perPage;
  const items = data.slice(startIndex, startIndex + perPage);
  
  return { items, totalPages };
}

// --------------------------------------------------------------------------
// FONCTIONS DOM (UI Updates)
// --------------------------------------------------------------------------

/**
 * Crée le HTML d'une carte établissement
 * 
 * @param {Object} item - Donnée d'un établissement
 * @returns {string} HTML de la carte
 */
function createResultCard(item) {
  const typeBadge = item.type === 'dispositif' ? 'badge-dispositif' : 'badge-type';
  const typeLabel = item.type === 'dispositif' ? 'Dispositif' : 'Établissement';

  return `
    <article class="result-card" role="listitem" tabindex="0" aria-labelledby="result-title-${item.id}">
      <div class="result-media">
        <img src="${item.image}" alt="${escapeHtml(item.name)} - ${escapeHtml(item.location)}" loading="lazy">
        <div class="result-badges">
          <span class="badge badge-pole">${escapeHtml(formatPoleLabel(item.pole))}</span>
          <span class="badge ${typeBadge}">${typeLabel}</span>
        </div>
      </div>
      <div class="result-content">
        <div class="result-location">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M8 1C5.5 1 3.5 3 3.5 5.5C3.5 8.5 8 14 8 14C8 14 12.5 8.5 12.5 5.5C12.5 3 10.5 1 8 1Z" stroke="#636363" stroke-width="1.5"/>
            <circle cx="8" cy="5.5" r="2" stroke="#636363" stroke-width="1.5"/>
          </svg>
          ${escapeHtml(item.location)}
        </div>
        <h3 class="result-title">
          <a href="etablissement-detail.html?id=${item.id}" id="result-title-${item.id}">
            ${escapeHtml(item.name)}
          </a>
        </h3>
        <p class="result-description">${escapeHtml(item.description)}</p>
        <div class="result-meta">
          <span class="meta-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7 1C4.5 1 2.5 3 2.5 5.5C2.5 8.5 7 13 7 13C7 13 11.5 8.5 11.5 5.5C11.5 3 9.5 1 7 1Z" stroke="#636363" stroke-width="1"/>
              <circle cx="7" cy="5.5" r="1.5" stroke="#636363" stroke-width="1"/>
            </svg>
            ${item.ageGroup.map(age => age === 'enfants' ? 'Enfants' : age === 'ados' ? 'Ados' : 'Adultes').join(', ')}
          </span>
          <span class="meta-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="7" cy="4" r="2" stroke="#636363" stroke-width="1"/>
              <path d="M2 12C2 9.23858 4.23858 7 7 7C9.76142 7 12 9.23858 12 12" stroke="#636363" stroke-width="1" stroke-linecap="round"/>
            </svg>
            ${item.capacity}
          </span>
        </div>
        <div class="result-tags">
          ${item.tags.slice(0, 3).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
          ${item.tags.length > 3 ? `<span class="tag">+${item.tags.length - 3}</span>` : ''}
        </div>
        <div class="result-actions">
          <a href="etablissement-detail.html?id=${item.id}" class="btn btn-outline">Découvrir</a>
          <a href="contact.html?etablissement=${item.id}" class="btn btn-primary">Contacter</a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Affiche les résultats (cartes)
 * 
 * @param {Array} results - Résultats filtrés
 */
function renderResults(results) {
  console.log('📋 renderResults appelé avec', results.length, 'résultats');
  
  // Pagination
  const { items: paginatedResults, totalPages } = paginate(results, state.currentPage, state.itemsPerPage);

  if (paginatedResults.length === 0) {
    elements.gridView.classList.add('hidden');
    elements.gridView.hidden = true;
    elements.emptyState.classList.remove('hidden');
    elements.emptyState.hidden = false;
    elements.pagination.classList.add('hidden');
    elements.pagination.hidden = true;
    return;
  }

  elements.emptyState.classList.add('hidden');
  elements.emptyState.hidden = true;
  elements.gridView.classList.remove('hidden');
  elements.gridView.hidden = false;
  elements.gridView.style.display = 'grid';

  // Rendu des cartes
  elements.gridView.innerHTML = paginatedResults.map(item => createResultCard(item)).join('');
  console.log('✅ Grille de résultats rendue');

  // Setup pagination
  if (totalPages > 1) {
    renderPagination(totalPages);
    elements.pagination.classList.remove('hidden');
    elements.pagination.hidden = false;
  } else {
    elements.pagination.classList.add('hidden');
    elements.pagination.hidden = true;
  }
}

/**
 * Affiche la pagination
 * 
 * @param {number} totalPages - Nombre total de pages
 */
function renderPagination(totalPages) {
  let html = '';

  // Bouton Previous
  html += `<button class="pagination-btn" id="prev-page" aria-label="Page précédente" ${state.currentPage === 1 ? 'disabled' : ''}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>`;

  // Numéros de page
  const maxVisible = 5;
  let startPage = Math.max(1, state.currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  if (startPage > 1) {
    html += `<button class="pagination-btn" data-page="1">1</button>`;
    if (startPage > 2) {
      html += `<span class="pagination-ellipsis">…</span>`;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="pagination-btn ${i === state.currentPage ? 'active' : ''}"
      data-page="${i}"
      aria-current="${i === state.currentPage ? 'page' : 'false'}"
      aria-label="Page ${i}">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      html += `<span class="pagination-ellipsis">…</span>`;
    }
    html += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
  }

  // Bouton Next
  html += `<button class="pagination-btn" id="next-page" aria-label="Page suivante" ${state.currentPage === totalPages ? 'disabled' : ''}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>`;

  elements.pagination.innerHTML = html;
}

/**
 * Met à jour le compteur de résultats
 * 
 * @param {number} count - Nombre de résultats
 */
function updateResultsCount(count) {
  const typeLabel = state.filters.type === 'etablissement' ? 'établissement' : 
                   state.filters.type === 'dispositif' ? 'dispositif' : 
                   'établissement et dispositif';
  const plural = count > 1 ? 's' : '';
  
  if (elements.resultsCount) {
    elements.resultsCount.textContent = `${count} ${typeLabel}${plural}`;
  }
  
  // Update page title based on filters
  if (elements.resultsTitle) {
    if (state.filters.pole || state.filters.location || state.filters.search) {
      elements.resultsTitle.textContent = 'Résultats de recherche';
    } else {
      elements.resultsTitle.textContent = `Tous les ${typeLabel}${plural}`;
    }
  }
}

/**
 * Met à jour les chips de filtres actifs
 */
function updateActiveChips() {
  if (!elements.activeFiltersContainer) return;

  const chips = [];

  if (state.filters.type !== 'all') {
    chips.push({
      key: 'type',
      label: state.filters.type === 'etablissement' ? 'Établissements' : 'Dispositifs',
      value: state.filters.type
    });
  }

  if (state.filters.pole) {
    chips.push({
      key: 'pole',
      label: formatPoleLabel(state.filters.pole),
      value: state.filters.pole
    });
  }

  if (state.filters.location) {
    const locationLabels = {
      'creteil': 'Créteil',
      'saint-maur': 'Saint-Maur',
      'vitry': 'Vitry-sur-Seine',
      'champigny': 'Champigny-sur-Marne',
      'ivry': 'Ivry-sur-Seine',
      'bonneuil': 'Bonneuil-sur-Marne',
      'le-perreux': 'Le Perreux',
      'nogent': 'Nogent-sur-Marne'
    };
    chips.push({
      key: 'location',
      label: locationLabels[state.filters.location] || state.filters.location,
      value: state.filters.location
    });
  }

  if (state.filters.age) {
    const ageLabels = {
      'enfants': 'Enfants',
      'ados': 'Adolescents',
      'adultes': 'Adultes'
    };
    chips.push({
      key: 'age',
      label: ageLabels[state.filters.age],
      value: state.filters.age
    });
  }

  if (state.filters.search) {
    chips.push({
      key: 'search',
      label: `"${state.filters.search}"`,
      value: state.filters.search
    });
  }

  state.activeChips = chips;

  // Rendu des chips
  elements.activeFiltersContainer.innerHTML = chips.map(chip => `
    <button class="filter-chip active" data-key="${chip.key}" data-value="${chip.value}" aria-label="Supprimer le filtre ${chip.label}">
      ${chip.label}
      <span class="remove" aria-hidden="true">×</span>
    </button>
  `).join('');
}

/**
 * Affiche/masque le bouton "Effacer les filtres"
 */
function toggleClearFiltersButton() {
  if (elements.clearFiltersBtn) {
    const hasFilters = state.filters.type !== 'all' || 
                       state.filters.pole || 
                       state.filters.location || 
                       state.filters.age || 
                       state.filters.search;
    elements.clearFiltersBtn.hidden = !hasFilters;
  }
}

// --------------------------------------------------------------------------
// FONCTIONS LEAFLET (Carte OpenStreetMap)
// --------------------------------------------------------------------------

/**
 * Initialise la carte Leaflet (lazy-init)
 * @param {HTMLElement} container - Conteneur de la carte
 * @param {[number, number]} center - Coordonnées [lat, lng]
 * @param {number} zoom - Niveau de zoom
 * @returns {L.Map} Instance de la carte
 */
function initMap(container, center = [48.79, 2.45], zoom = 11) {
  // Vérifier que Leaflet est chargé
  if (typeof L === 'undefined') {
    console.warn('⚠️ Leaflet n\'est pas chargé. La carte ne peut pas être initialisée.');
    return null;
  }

  // Vider le conteneur (supprimer le placeholder)
  container.innerHTML = '';

  // Créer la carte
  const map = L.map(container, {
    center: center,
    zoom: zoom,
    zoomControl: true,
    scrollWheelZoom: false
  });

  // Ajouter le tile layer OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);

  // Ajouter la légende
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function() {
    const div = L.DomUtil.create('div', 'map-legend');
    div.innerHTML = `
      <div class="legend-item">
        <div class="legend-color etablissement"></div>
        <span>Établissement</span>
      </div>
      <div class="legend-item">
        <div class="legend-color dispositif"></div>
        <span>Dispositif</span>
      </div>
    `;
    return div;
  };
  legend.addTo(map);

  return map;
}

/**
 * Affiche les marqueurs sur la carte
 * @param {L.Map} map - Instance Leaflet
 * @param {Array} results - Résultats à afficher
 */
function renderMapMarkers(map, results) {
  // Vérifier que Leaflet est disponible
  if (typeof L === 'undefined') return;

  // Clear existing markers
  state.mapMarkers.forEach(marker => map.removeLayer(marker));
  state.mapMarkers = [];

  // Add markers for each result
  results.forEach(item => {
    if (item.coords && item.coords.lat && item.coords.lng) {
      // Couleur différente selon le type
      const markerColor = item.type === 'dispositif' ? '#cc209c' : '#00619b';
      
      // Créer un circleMarker au lieu d'un marker par défaut
      const marker = L.circleMarker([item.coords.lat, item.coords.lng], {
        radius: 12,
        fillColor: markerColor,
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      })
      .bindPopup(`
        <strong>${item.name}</strong><br>
        ${item.location}<br>
        <small>${item.poleLabel}</small>
      `);
      
      marker.addTo(map);
      state.mapMarkers.push(marker);
    }
  });
  
  console.log(`📍 ${state.mapMarkers.length} marqueurs affichés`);
}

/**
 * Bascule entre vue liste et vue carte
 * @param {'list' | 'map'} mode - Le mode à activer
 */
function toggleView(mode) {
  state.viewMode = mode;

  // Mettre à jour les boutons
  elements.viewButtons.forEach(btn => {
    const isActive = btn.dataset.view === mode;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });

  // Afficher/masquer les conteneurs
  if (mode === 'grid' || mode === 'list') {
    // Mode liste/grille
    console.log('📋 Passage en vue Liste');
    
    // Re-rendu des résultats si la grille est vide
    if (elements.gridView.innerHTML === '') {
      console.log('🔄 La grille est vide, re-rendu des résultats...');
      const filtered = filterData(state, data);
      renderResults(filtered);
    }
    
    elements.gridView.classList.remove('hidden');
    elements.gridView.hidden = false;
    elements.gridView.style.display = 'grid';
    
    elements.mapView.classList.add('hidden');
    elements.mapView.hidden = true;
    elements.mapView.style.display = 'none';
    
  } else if (mode === 'map') {
    // Mode carte
    console.log('🗺️ Passage en vue Carte');
    elements.gridView.classList.add('hidden');
    elements.gridView.hidden = true;
    elements.gridView.style.display = 'none';
    
    elements.mapView.classList.remove('hidden');
    elements.mapView.hidden = false;
    elements.mapView.style.display = 'block';

    // Initialiser la carte si ce n'est pas déjà fait
    if (!state.map && elements.mapContainer) {
      console.log('🗺️ Initialisation de la carte Leaflet...');
      console.log('📦 mapContainer:', elements.mapContainer);
      
      // Attendre que le DOM soit rendu pour initialiser la carte
      setTimeout(() => {
        console.log('⏰ Initialisation en cours...');
        state.map = initMap(elements.mapContainer);
        
        if (state.map) {
          console.log('✅ Carte initialisée avec succès');
          // Ajouter les marqueurs
          const filtered = filterData(state, data);
          renderMapMarkers(state.map, filtered);
          
          // Forcer Leaflet à recalculer la taille
          setTimeout(() => {
            state.map.invalidateSize();
            console.log('🔄 invalidateSize() appelé');
          }, 200);
        } else {
          console.error('❌ Échec de l\'initialisation de la carte');
        }
      }, 100);
    } else if (state.map) {
      console.log('🗺️ La carte existe déjà, mise à jour des marqueurs...');
      // Mettre à jour les marqueurs avec les données filtrées
      const filtered = filterData(state, data);
      renderMapMarkers(state.map, filtered);
      
      // Forcer Leaflet à recalculer la taille
      setTimeout(() => {
        state.map.invalidateSize();
      }, 100);
    }
  }
}

// --------------------------------------------------------------------------
// GESTIONNAIRES D'ÉVÉNEMENTS
// --------------------------------------------------------------------------

/**
 * Gère le changement d'onglet de type (tous/établissement/dispositif)
 */
function handleTypeChange() {
  elements.typeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      elements.typeTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      
      state.filters.type = tab.dataset.type;
      state.currentPage = 1;
      applyFilters();
    });
  });
}

/**
 * Gère la recherche texte avec debounce
 */
function handleSearch() {
  if (!elements.searchInput) return;

  const debouncedSearch = debounce(() => {
    state.filters.search = elements.searchInput.value.trim();
    state.currentPage = 1;
    applyFilters();
  }, 300);

  elements.searchInput.addEventListener('input', debouncedSearch);
}

/**
 * Gère les changements de filtres (selects)
 */
function handleFilterChanges() {
  // Pôle
  if (elements.poleSelect) {
    elements.poleSelect.addEventListener('change', () => {
      state.filters.pole = elements.poleSelect.value;
      state.currentPage = 1;
      applyFilters();
    });
  }

  // Localisation
  if (elements.locationSelect) {
    elements.locationSelect.addEventListener('change', () => {
      state.filters.location = elements.locationSelect.value;
      state.currentPage = 1;
      applyFilters();
    });
  }

  // Âge
  if (elements.ageSelect) {
    elements.ageSelect.addEventListener('change', () => {
      state.filters.age = elements.ageSelect.value;
      state.currentPage = 1;
      applyFilters();
    });
  }

  // Tri
  if (elements.sortSelect) {
    elements.sortSelect.addEventListener('change', () => {
      state.sortBy = elements.sortSelect.value;
      state.currentPage = 1;
      applyFilters();
    });
  }
}

/**
 * Gère le clic sur les chips de filtres
 */
function handleChipClick() {
  if (!elements.activeFiltersContainer) return;

  elements.activeFiltersContainer.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;

    const key = chip.dataset.key;
    
    // Reset du filtre correspondant
    if (key === 'search') {
      state.filters.search = '';
      if (elements.searchInput) elements.searchInput.value = '';
    } else if (key === 'type') {
      state.filters.type = 'all';
      // Update tab UI
      elements.typeTabs.forEach(tab => {
        const isActive = tab.dataset.type === 'all';
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive);
      });
    } else {
      state.filters[key] = '';
      // Reset corresponding select
      if (elements[`${key}Select`]) {
        elements[`${key}Select`].value = '';
      }
    }

    state.currentPage = 1;
    applyFilters();
  });
}

/**
 * Gère l'effacement de tous les filtres
 */
function handleClearFilters() {
  if (!elements.clearFiltersBtn) return;

  elements.clearFiltersBtn.addEventListener('click', clearAllFilters);
  
  if (elements.resetFromEmpty) {
    elements.resetFromEmpty.addEventListener('click', clearAllFilters);
  }
}

/**
 * Efface tous les filtres
 */
function clearAllFilters() {
  state.filters = {
    type: 'all',
    pole: '',
    location: '',
    age: '',
    search: ''
  };
  state.currentPage = 1;
  
  // Reset UI controls
  elements.typeTabs.forEach(tab => {
    const isActive = tab.dataset.type === 'all';
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive);
  });
  
  if (elements.searchInput) elements.searchInput.value = '';
  if (elements.poleSelect) elements.poleSelect.value = '';
  if (elements.locationSelect) elements.locationSelect.value = '';
  if (elements.ageSelect) elements.ageSelect.value = '';
  if (elements.sortSelect) elements.sortSelect.value = 'relevance';
  
  applyFilters();
}

/**
 * Gère le changement de vue (liste/carte)
 */
function handleViewToggle() {
  elements.viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      toggleView(view);
    });
  });
}

/**
 * Gère la pagination
 */
function handlePagination() {
  if (!elements.pagination) return;

  elements.pagination.addEventListener('click', (e) => {
    const btn = e.target.closest('.pagination-btn');
    if (!btn || btn.disabled) return;
    
    // Previous
    if (btn.id === 'prev-page' && state.currentPage > 1) {
      state.currentPage--;
    }
    // Next
    else if (btn.id === 'next-page') {
      const filtered = filterData(state, data);
      const totalPages = Math.ceil(filtered.length / state.itemsPerPage);
      if (state.currentPage < totalPages) {
        state.currentPage++;
      }
    }
    // Page number
    else if (btn.dataset.page) {
      state.currentPage = parseInt(btn.dataset.page, 10);
    }

    // Re-render with new page
    const filtered = filterData(state, data);
    renderResults(filtered);
    
    // Scroll to results
    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

/**
 * Gère la navigation clavier pour les cartes
 */
function handleKeyboardNavigation() {
  if (!elements.gridView) return;

  elements.gridView.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.result-card');
      if (card) {
        const link = card.querySelector('a[href]');
        if (link) {
          e.preventDefault();
          window.location.href = link.href;
        }
      }
    }
  });
}

// --------------------------------------------------------------------------
// POINT D'ENTRÉE PRINCIPAL
// --------------------------------------------------------------------------

/**
 * Applique tous les filtres et met à jour l'UI
 */
function applyFilters() {
  console.log('🔄 applyFilters appelé, viewMode:', state.viewMode);
  
  // Show loading state
  if (elements.gridView) elements.gridView.innerHTML = '';
  if (elements.loading) elements.loading.classList.remove('hidden');
  if (elements.gridView) elements.gridView.classList.add('hidden');
  if (elements.mapView) elements.mapView.classList.add('hidden');
  if (elements.pagination) elements.pagination.classList.add('hidden');
  if (elements.emptyState) elements.emptyState.classList.add('hidden');

  // Simule un délai API pour une UX réaliste
  setTimeout(() => {
    let filtered = filterData(state, data);
    filtered = sortResults(filtered, state.sortBy);

    console.log('📊 Résultats filtrés:', filtered.length);

    // Si on est en vue carte, mettre à jour les marqueurs
    if (state.viewMode === 'map' && state.map) {
      console.log('🗺️ Mode carte, mise à jour des marqueurs');
      renderMapMarkers(state.map, filtered);
    }

    // Si on est en vue liste/grille, rendre les cartes
    if (state.viewMode !== 'map') {
      console.log('📋 Mode liste, rendu des cartes');
      renderResults(filtered);
    }

    updateResultsCount(filtered.length);
    updateActiveChips();
    toggleClearFiltersButton();

    // Hide loading
    if (elements.loading) elements.loading.classList.add('hidden');
  }, 300);
}

/**
 * Initialise le système de filtres pour les établissements
 * @param {HTMLElement} rootElement - L'élément racine (par défaut : document)
 */
export function initEstablishmentsFilters(rootElement = document) {
  // Vérifier que la grille de résultats existe
  const gridView = rootElement.getElementById('grid-view');
  if (!gridView) {
    console.warn('⚠️ Grille de résultats non trouvée (#grid-view). Filtres non initialisés.');
    return;
  }

  // Initialisation des éléments DOM
  elements = {
    // Filters
    typeTabs: rootElement.querySelectorAll('.type-toggle-btn'),
    searchInput: rootElement.getElementById('search'),
    poleSelect: rootElement.getElementById('pole'),
    locationSelect: rootElement.getElementById('location'),
    ageSelect: rootElement.getElementById('age'),
    viewButtons: rootElement.querySelectorAll('.view-toggle-btn'),
    clearFiltersBtn: rootElement.getElementById('clear-filters'),
    activeFiltersContainer: rootElement.getElementById('active-filters'),
    
    // Results
    gridView: gridView,
    mapView: rootElement.getElementById('map-view'),
    mapContainer: rootElement.querySelector('#map-view .map-placeholder')?.parentElement || rootElement.getElementById('map-view'),
    resultsCount: rootElement.getElementById('results-count'),
    resultsTitle: rootElement.getElementById('results-title'),
    emptyState: rootElement.getElementById('empty-state'),
    loading: rootElement.getElementById('loading'),
    pagination: rootElement.getElementById('pagination'),
    sortSelect: rootElement.getElementById('sort'),
    
    // Empty state reset
    resetFromEmpty: rootElement.getElementById('reset-from-empty')
  };

  // Setup des event listeners
  handleTypeChange();
  handleSearch();
  handleFilterChanges();
  handleChipClick();
  handleClearFilters();
  handleViewToggle();
  handlePagination();
  handleKeyboardNavigation();

  // Initial render
  applyFilters();

  console.log('✅ Établissements Filters initialized');
  console.log(`📊 ${data.length} établissements chargés`);
  console.log('🗺️ Leaflet map ready (lazy-init on view toggle)');
}
