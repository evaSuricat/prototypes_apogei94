/**
 * Carrieres - Job Filtering System
 * 
 * Gère le filtrage des offres d'emploi pour la page carrieres.html.
 * Module autonome similaire à filters-establishments.js.
 * 
 * @module filters-jobs
 */

// --------------------------------------------------------------------------
// DATA: Mock data for job offers
// En production, ces données viendraient d'une API ou WordPress REST
// --------------------------------------------------------------------------
const jobData = [
  {
    id: 1,
    title: "Éducateur spécialisé H/F",
    type: "cdi",
    typeLabel: "CDI",
    location: "Créteil",
    locationSlug: "creteil",
    metier: "educateur",
    metierLabel: "Éducateur spécialisé",
    description: "Accompagnement d'enfants et adolescents en situation de handicap au sein de notre IME. Projet pédagogique personnalisé.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tags: ["Éducation", "Handicap", "Jeunesse"],
    posted: "Il y a 3 jours",
    salary: "Selon convention collective",
    experience: "Débutant accepté",
    link: "offre-detail.html?id=1"
  },
  {
    id: 2,
    title: "Moniteur d'atelier espaces verts H/F",
    type: "cdi",
    typeLabel: "CDI",
    location: "Saint-Maur-des-Fossés",
    locationSlug: "saint-maur",
    metier: "moniteur",
    metierLabel: "Moniteur d'atelier",
    description: "Encadrement de travailleurs en ESAT sur des activités d'espaces verts et jardinage. Formation assurée.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tags: ["ESAT", "Espaces verts", "Encadrement"],
    posted: "Il y a 5 jours",
    salary: "2200€ - 2500€ brut/mois",
    experience: "2 ans minimum",
    link: "offre-detail.html?id=2"
  },
  {
    id: 3,
    title: "Aide-soignant H/F",
    type: "cdd",
    typeLabel: "CDD 6 mois",
    location: "Vitry-sur-Seine",
    locationSlug: "vitry",
    metier: "aide-soignant",
    metierLabel: "Aide-soignant",
    description: "Soins d'hygiène et de confort auprès de résidents en FAM. Travail en équipe pluridisciplinaire.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tags: ["Soins", "FAM", "Équipe"],
    posted: "Il y a 1 semaine",
    salary: "Selon grille FPH",
    experience: "Diplôme requis",
    link: "offre-detail.html?id=3"
  },
  {
    id: 4,
    title: "Infirmier diplômé d'État H/F",
    type: "cdi",
    typeLabel: "CDI",
    location: "Champigny-sur-Marne",
    locationSlug: "champigny",
    metier: "infirmier",
    metierLabel: "Infirmier",
    description: "Soins infirmiers, coordination avec les médecins, suivi des traitements. MAS de 50 résidents.",
    image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tags: ["Soins", "MAS", "Coordination"],
    posted: "Il y a 2 jours",
    salary: "2400€ - 2800€ brut/mois",
    experience: "1 an minimum",
    link: "offre-detail.html?id=4"
  },
  {
    id: 5,
    title: "Psychologue clinicien H/F",
    type: "cdi",
    typeLabel: "CDI",
    location: "Créteil",
    locationSlug: "creteil",
    metier: "psychologue",
    metierLabel: "Psychologue",
    description: "Évaluations psychologiques, suivis thérapeutiques, soutien aux équipes. Master 2 requis.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tags: ["Psychologie", "Évaluation", "Thérapie"],
    posted: "Il y a 4 jours",
    salary: "Selon expérience",
    experience: "3 ans minimum",
    link: "offre-detail.html?id=5"
  },
  {
    id: 6,
    title: "Directeur d'établissement H/F",
    type: "cdi",
    typeLabel: "CDI",
    location: "Ivry-sur-Seine",
    locationSlug: "ivry",
    metier: "directeur",
    metierLabel: "Directeur",
    description: "Direction d'un foyer d'hébergement de 45 résidents. Management d'équipe, gestion budgétaire.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tags: ["Direction", "Management", "Gestion"],
    posted: "Il y a 1 semaine",
    salary: "Selon profil",
    experience: "5 ans minimum",
    link: "offre-detail.html?id=6"
  },
  {
    id: 7,
    title: "Éducateur de jeunes enfants H/F",
    type: "cdd",
    typeLabel: "CDD 12 mois",
    location: "Bonneuil-sur-Marne",
    locationSlug: "bonneuil",
    metier: "educateur",
    metierLabel: "Éducateur spécialisé",
    description: "Accompagnement de jeunes enfants en situation de handicap. UEMA (unité autiste).",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tags: ["Petite enfance", "Autisme", "Éducation"],
    posted: "Il y a 3 jours",
    salary: "Selon grille FPH",
    experience: "Débutant accepté",
    link: "offre-detail.html?id=7"
  }
];

// --------------------------------------------------------------------------
// STATE PRIVÉ
// --------------------------------------------------------------------------

const state = {
  filters: {
    type: '',         // '', 'cdi', 'cdd', 'interim', 'stage'
    metier: '',       // '', 'educateur', 'infirmier', etc.
    location: '',
    search: ''
  },
  activeChips: [],
  currentPage: 1,
  itemsPerPage: 6,
  sortBy: 'date'
};

// --------------------------------------------------------------------------
// ÉLÉMENTS DOM (initialisés dans init)
// --------------------------------------------------------------------------

let elements = {};

// --------------------------------------------------------------------------
// FONCTIONS UTILITAIRES
// --------------------------------------------------------------------------

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

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// --------------------------------------------------------------------------
// FONCTIONS PURES (Exportables)
// --------------------------------------------------------------------------

export function filterJobs(currentState, allData) {
  let filtered = [...allData];

  if (currentState.filters.type) {
    filtered = filtered.filter(job => job.type === currentState.filters.type);
  }

  if (currentState.filters.metier) {
    filtered = filtered.filter(job => job.metier === currentState.filters.metier);
  }

  if (currentState.filters.location) {
    filtered = filtered.filter(job => job.locationSlug === currentState.filters.location);
  }

  if (currentState.filters.search) {
    const searchLower = currentState.filters.search.toLowerCase();
    filtered = filtered.filter(job =>
      job.title.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  return filtered;
}

export function sortJobResults(results, sortBy) {
  switch(sortBy) {
    case 'date-asc':
      return results.sort((a, b) => a.posted.localeCompare(b.posted));
    case 'date-desc':
      return results.sort((a, b) => b.posted.localeCompare(a.posted));
    case 'location':
      return results.sort((a, b) => a.location.localeCompare(b.location));
    default:
      return results;
  }
}

export function paginateJobs(data, page, perPage) {
  const totalPages = Math.ceil(data.length / perPage);
  const startIndex = (page - 1) * perPage;
  const items = data.slice(startIndex, startIndex + perPage);
  
  return { items, totalPages };
}

// --------------------------------------------------------------------------
// FONCTIONS DOM
// --------------------------------------------------------------------------

function createJobCard(item) {
  return `
    <article class="job-card" role="listitem" tabindex="0" aria-labelledby="job-title-${item.id}">
      <div class="job-card__media">
        <img src="${item.image}" alt="${escapeHtml(item.title)} - ${escapeHtml(item.location)}" loading="lazy">
        <span class="job-card__type">${escapeHtml(item.type)}</span>
      </div>
      <div class="job-card__content">
        <h3 class="job-card__title" id="job-title-${item.id}">
          <a href="${item.link}">${escapeHtml(item.title)}</a>
        </h3>
        <p class="job-card__location">${escapeHtml(item.location)}</p>
        <p class="job-card__description">${escapeHtml(item.description)}</p>
        <div class="job-card__meta">
          <span class="meta-item">${escapeHtml(item.experience)}</span>
          <span class="meta-item">${escapeHtml(item.posted)}</span>
        </div>
        <div class="job-card__tags">
          ${item.tags.slice(0, 3).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
        <div class="job-card__actions">
          <a href="${item.link}" class="btn btn-primary">Voir l'offre →</a>
        </div>
      </div>
    </article>
  `;
}

function renderJobResults(results) {
  const { items: paginatedResults, totalPages } = paginateJobs(results, state.currentPage, state.itemsPerPage);

  if (paginatedResults.length === 0) {
    if (elements.gridView) {
      elements.gridView.classList.add('hidden');
      elements.gridView.hidden = true;
    }
    if (elements.emptyState) {
      elements.emptyState.classList.remove('hidden');
      elements.emptyState.hidden = false;
    }
    if (elements.pagination) {
      elements.pagination.classList.add('hidden');
      elements.pagination.hidden = true;
    }
    return;
  }

  if (elements.emptyState) {
    elements.emptyState.classList.add('hidden');
    elements.emptyState.hidden = true;
  }
  if (elements.gridView) {
    elements.gridView.classList.remove('hidden');
    elements.gridView.hidden = false;
    elements.gridView.innerHTML = paginatedResults.map(item => createJobCard(item)).join('');
  }

  if (totalPages > 1 && elements.pagination) {
    renderJobPagination(totalPages);
    elements.pagination.classList.remove('hidden');
    elements.pagination.hidden = false;
  } else if (elements.pagination) {
    elements.pagination.classList.add('hidden');
    elements.pagination.hidden = true;
  }
}

function renderJobPagination(totalPages) {
  let html = '';
  
  html += `<button class="pagination-btn" id="prev-page" aria-label="Page précédente" ${state.currentPage === 1 ? 'disabled' : ''}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>`;

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

  html += `<button class="pagination-btn" id="next-page" aria-label="Page suivante" ${state.currentPage === totalPages ? 'disabled' : ''}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>`;

  if (elements.pagination) {
    elements.pagination.innerHTML = html;
  }
}

function updateJobResultsCount(count) {
  if (elements.resultsCount) {
    const plural = count > 1 ? 's' : '';
    elements.resultsCount.textContent = `${count} offre${plural}`;
  }
}

function updateJobActiveChips() {
  if (!elements.activeFiltersContainer) return;

  const chips = [];

  if (state.filters.type) {
    const typeLabels = {
      'cdi': 'CDI',
      'cdd': 'CDD',
      'interim': 'Intérim',
      'stage': 'Stage'
    };
    chips.push({ key: 'type', label: typeLabels[state.filters.type] || state.filters.type, value: state.filters.type });
  }

  if (state.filters.metier) {
    const metierLabels = {
      'educateur': 'Éducateur spécialisé',
      'aide-soignant': 'Aide-soignant',
      'infirmier': 'Infirmier',
      'moniteur': 'Moniteur d\'atelier',
      'psychologue': 'Psychologue',
      'directeur': 'Directeur'
    };
    chips.push({
      key: 'metier',
      label: metierLabels[state.filters.metier] || state.filters.metier,
      value: state.filters.metier
    });
  }

  if (state.filters.location) {
    const locationLabels = {
      'creteil': 'Créteil',
      'saint-maur': 'Saint-Maur',
      'vitry': 'Vitry-sur-Seine',
      'champigny': 'Champigny-sur-Marne',
      'ivry': 'Ivry-sur-Seine',
      'bonneuil': 'Bonneuil-sur-Marne'
    };
    chips.push({
      key: 'location',
      label: locationLabels[state.filters.location] || state.filters.location,
      value: state.filters.location
    });
  }

  if (state.filters.search) {
    chips.push({ key: 'search', label: `"${state.filters.search}"`, value: state.filters.search });
  }

  state.activeChips = chips;

  if (chips.length > 0) {
    elements.activeFiltersContainer.innerHTML = chips.map(chip => `
      <button class="filter-chip active" data-key="${chip.key}" data-value="${chip.value}" aria-label="Supprimer le filtre ${chip.label}">
        ${chip.label}
        <span class="remove" aria-hidden="true">×</span>
      </button>
    `).join('');
  } else {
    elements.activeFiltersContainer.innerHTML = '';
  }
}

function toggleJobClearFiltersButton() {
  if (elements.clearFiltersBtn) {
    const hasFilters = state.filters.type || state.filters.metier || state.filters.location || state.filters.search;
    elements.clearFiltersBtn.hidden = !hasFilters;
  }
}

// --------------------------------------------------------------------------
// EVENT HANDLERS
// --------------------------------------------------------------------------

function handleJobFilterChanges() {
  if (elements.typeSelect) {
    elements.typeSelect.addEventListener('change', (e) => {
      state.filters.type = e.target.value;
      state.currentPage = 1;
      applyJobFilters();
    });
  }

  if (elements.metierSelect) {
    elements.metierSelect.addEventListener('change', (e) => {
      state.filters.metier = e.target.value;
      state.currentPage = 1;
      applyJobFilters();
    });
  }

  if (elements.locationSelect) {
    elements.locationSelect.addEventListener('change', (e) => {
      state.filters.location = e.target.value;
      state.currentPage = 1;
      applyJobFilters();
    });
  }

  if (elements.sortSelect) {
    elements.sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      state.currentPage = 1;
      applyJobFilters();
    });
  }
}

function handleJobSearch() {
  if (!elements.searchInput) return;

  const debouncedSearch = debounce(() => {
    state.filters.search = elements.searchInput.value.trim();
    state.currentPage = 1;
    applyJobFilters();
  }, 300);

  elements.searchInput.addEventListener('input', debouncedSearch);
}

function handleJobChipClick() {
  if (!elements.activeFiltersContainer) return;

  elements.activeFiltersContainer.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;

    const key = chip.dataset.key;
    
    if (key === 'search') {
      state.filters.search = '';
      if (elements.searchInput) elements.searchInput.value = '';
    } else if (key === 'type') {
      state.filters.type = '';
      if (elements.typeSelect) elements.typeSelect.value = '';
    } else {
      state.filters[key] = '';
      if (elements[`${key}Select`]) {
        elements[`${key}Select`].value = '';
      }
    }

    state.currentPage = 1;
    applyJobFilters();
  });
}

function handleJobClearFilters() {
  if (!elements.clearFiltersBtn) return;

  elements.clearFiltersBtn.addEventListener('click', () => {
    state.filters = { type: '', pole: '', location: '', search: '' };
    state.currentPage = 1;
    
    if (elements.searchInput) elements.searchInput.value = '';
    if (elements.typeSelect) elements.typeSelect.value = '';
    if (elements.poleSelect) elements.poleSelect.value = '';
    if (elements.locationSelect) elements.locationSelect.value = '';
    if (elements.sortSelect) elements.sortSelect.value = 'date';
    
    applyJobFilters();
  });
}

function handleJobPagination() {
  if (!elements.pagination) return;

  elements.pagination.addEventListener('click', (e) => {
    const btn = e.target.closest('.pagination-btn');
    if (!btn || btn.disabled) return;
    
    if (btn.id === 'prev-page' && state.currentPage > 1) {
      state.currentPage--;
    } else if (btn.id === 'next-page') {
      const filtered = filterJobs(state, jobData);
      const totalPages = Math.ceil(filtered.length / state.itemsPerPage);
      if (state.currentPage < totalPages) {
        state.currentPage++;
      }
    } else if (btn.dataset.page) {
      state.currentPage = parseInt(btn.dataset.page, 10);
    }

    const filtered = filterJobs(state, jobData);
    renderJobResults(filtered);
    
    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// --------------------------------------------------------------------------
// MAIN FILTER FUNCTION
// --------------------------------------------------------------------------

function applyJobFilters() {
  if (elements.gridView) elements.gridView.innerHTML = '';
  if (elements.loading) elements.loading.classList.remove('hidden');
  if (elements.gridView) elements.gridView.classList.add('hidden');
  if (elements.pagination) elements.pagination.classList.add('hidden');
  if (elements.emptyState) elements.emptyState.classList.add('hidden');

  setTimeout(() => {
    let filtered = filterJobs(state, jobData);
    filtered = sortJobResults(filtered, state.sortBy);

    renderJobResults(filtered);
    updateJobResultsCount(filtered.length);
    updateJobActiveChips();
    toggleJobClearFiltersButton();

    if (elements.loading) elements.loading.classList.add('hidden');
  }, 300);
}

// --------------------------------------------------------------------------
// INIT
// --------------------------------------------------------------------------

export function initCareerFilters(rootElement = document) {
  const gridView = rootElement.getElementById('jobs-grid');
  if (!gridView) {
    console.warn('Grille de jobs non trouvée (#jobs-grid). Filtres non initialisés.');
    return;
  }

  elements = {
    searchInput: rootElement.getElementById('job-search'),
    typeSelect: rootElement.getElementById('job-type'),
    metierSelect: rootElement.getElementById('job-metier'),
    locationSelect: rootElement.getElementById('job-location'),
    sortSelect: null, // Pas de tri dans carrieres.html original
    clearFiltersBtn: rootElement.getElementById('clear-filters'),
    activeFiltersContainer: rootElement.getElementById('active-filters'),
    gridView: gridView,
    resultsCount: rootElement.getElementById('jobs-count'),
    emptyState: rootElement.getElementById('empty-state'),
    loading: rootElement.getElementById('loading'),
    pagination: null // Pas de pagination dans carrieres.html original
  };

  handleJobFilterChanges();
  handleJobSearch();
  handleJobChipClick();
  handleJobClearFilters();
  handleJobPagination();

  applyJobFilters();

  console.log('Career Filters initialized');
  console.log(`${jobData.length} offres chargées`);
}
