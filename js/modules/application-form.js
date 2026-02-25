/**
 * Postuler - Application Form Module
 * 
 * Gère le formulaire de candidature multi-étapes pour postuler.html.
 * 
 * @module application-form
 */

// --------------------------------------------------------------------------
// STATE PRIVÉ
// --------------------------------------------------------------------------

const state = {
  currentStep: 1,
  totalSteps: 3,
  formData: {
    // Step 1: Coordonnées
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    codePostal: '',
    ville: '',
    
    // Step 2: Parcours
    formation: '',
    experience: '',
    disponibilite: '',
    permisB: false,
    
    // Step 3: Documents
    cv: null,
    lettre: null,
    pieces: null
  },
  errors: {}
};

// --------------------------------------------------------------------------
// ÉLÉMENTS DOM
// --------------------------------------------------------------------------

let elements = {};

// --------------------------------------------------------------------------
// FONCTIONS UTILITAIRES
// --------------------------------------------------------------------------

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidPhone(phone) {
  const re = /^[\d\s.+-]{10,}$/;
  return re.test(phone);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// --------------------------------------------------------------------------
// VALIDATION
// --------------------------------------------------------------------------

function validateStep(step) {
  console.log(`🔍 validateStep(${step}) appelé`);
  const errors = {};
  
  if (step === 1) {
    // Validation Step 1: Coordonnées
    console.log('  Validation étape 1: Coordonnées');
    if (!state.formData.nom || state.formData.nom.trim() === '') {
      errors.nom = 'Le nom est obligatoire';
      console.log('    Erreur: nom vide');
    }
    
    if (!state.formData.prenom || state.formData.prenom.trim() === '') {
      errors.prenom = 'Le prénom est obligatoire';
      console.log('    Erreur: prenom vide');
    }
    
    if (!state.formData.email || state.formData.email.trim() === '') {
      errors.email = "L'email est obligatoire";
      console.log('    Erreur: email vide');
    } else if (!isValidEmail(state.formData.email)) {
      errors.email = "L'email n'est pas valide";
      console.log('    Erreur: email invalide');
    }
    
    if (state.formData.telephone && !isValidPhone(state.formData.telephone)) {
      errors.telephone = 'Le téléphone n\'est pas valide';
      console.log('    Erreur: telephone invalide');
    }
  }
  
  if (step === 2) {
    // Validation Step 2: Parcours
    console.log('  Validation étape 2: Parcours');
    console.log(`    message (lettre): "${state.formData.message?.substring(0, 50)}..."`);
    console.log(`    experience: "${state.formData.experience?.substring(0, 50)}..."`);
    console.log(`    disponibilite: "${state.formData.disponibilite}"`);
    
    if (!state.formData.message || state.formData.message.trim().length < 100) {
      errors.message = 'La lettre de motivation doit faire au moins 100 caractères';
      console.log('    Erreur: lettre trop courte');
    }
    
    if (!state.formData.experience || state.formData.experience.trim().length < 50) {
      errors.experience = 'L\'expérience doit faire au moins 50 caractères';
      console.log('    Erreur: experience trop courte');
    }
    
    if (!state.formData.disponibilite || state.formData.disponibilite.trim() === '') {
      errors.disponibilite = 'La disponibilité est obligatoire';
      console.log('    Erreur: disponibilite vide');
    }
  }
  
  if (step === 3) {
    // Validation Step 3: Documents
    console.log('  Validation étape 3: Documents');
    if (!state.formData.cv) {
      errors.cv = 'Le CV est obligatoire';
      console.log('    Erreur: cv manquant');
    }
    if (!state.formData.rgpd) {
      errors.rgpd = 'Vous devez accepter la politique de confidentialité';
      console.log('    Erreur: rgpd non coché');
    }
  }
  
  state.errors = errors;
  const isValid = Object.keys(errors).length === 0;
  console.log(`  Validation ${isValid ? 'RÉUSSIE' : 'ÉCHOUÉ'}: ${Object.keys(errors).length} erreurs`);
  return isValid;
}

// --------------------------------------------------------------------------
// UI UPDATES
// --------------------------------------------------------------------------

function updateProgressSteps() {
  const steps = elements.progressSteps || [];
  
  steps.forEach((step, index) => {
    const stepNumber = index + 1;
    
    if (stepNumber < state.currentStep) {
      step.classList.add('completed');
      step.classList.remove('active');
      step.querySelector('.progress-step-number').innerHTML = '✓';
    } else if (stepNumber === state.currentStep) {
      step.classList.add('active');
      step.classList.remove('completed');
      step.querySelector('.progress-step-number').textContent = stepNumber;
    } else {
      step.classList.remove('active');
      step.classList.remove('completed');
      step.querySelector('.progress-step-number').textContent = stepNumber;
    }
  });
  
  // Update aria
  const progressBar = elements.progressBar;
  if (progressBar) {
    progressBar.setAttribute('aria-valuenow', state.currentStep);
  }
}

function showStep(step) {
  console.log(`📍 showStep(${step}) appelé`);
  
  const sections = elements.formSections || [];
  console.log(`  ${sections.length} sections trouvées`);
  
  sections.forEach((section, index) => {
    const sectionNum = index + 1;
    const isVisible = sectionNum === step;
    
    console.log(`  Section ${sectionNum}: ${isVisible ? 'VISIBLE' : 'CACHÉE'}`);
    
    if (isVisible) {
      section.classList.remove('hidden');
      section.hidden = false;
      section.style.display = 'block';
    } else {
      section.classList.add('hidden');
      section.hidden = true;
      section.style.display = 'none';
    }
  });
  
  updateProgressSteps();
  updateButtons();
  
  // Scroll to top of form
  const formContainer = elements.formContainer;
  if (formContainer) {
    formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function updateButtons() {
  if (elements.prevBtn) {
    elements.prevBtn.style.visibility = state.currentStep === 1 ? 'hidden' : 'visible';
  }
  
  if (elements.nextBtn) {
    if (state.currentStep === state.totalSteps) {
      elements.nextBtn.textContent = 'Envoyer ma candidature';
      elements.nextBtn.querySelector('svg')?.remove();
    } else {
      elements.nextBtn.innerHTML = `
        Suivant
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
  }
}

function showErrors(step) {
  // Clear previous errors
  document.querySelectorAll('.form-error.visible').forEach(el => {
    el.classList.remove('visible');
  });
  document.querySelectorAll('.form-input.error, .form-textarea.error, .form-select.error').forEach(el => {
    el.classList.remove('error');
  });
  
  // Show new errors
  Object.keys(state.errors).forEach(field => {
    const input = document.getElementById(field);
    const errorEl = document.getElementById(`${field}-error`);
    
    if (input) {
      input.classList.add('error');
    }
    
    if (errorEl && state.errors[field]) {
      errorEl.textContent = state.errors[field];
      errorEl.classList.add('visible');
    }
  });
}

function showSuccessMessage() {
  console.log('✅ Affichage du message de succès');
  
  // Hide ONLY the form, not the entire container
  const form = elements.form;
  if (form) {
    form.classList.add('hidden');
    form.hidden = true;
    form.style.display = 'none';
    console.log('  Formulaire caché');
  }
  
  // Hide other elements (progress steps, job summary, etc.)
  const progressSteps = document.querySelector('.progress-steps');
  if (progressSteps) {
    progressSteps.style.display = 'none';
  }
  
  const jobSummary = document.querySelector('.job-summary');
  if (jobSummary) {
    jobSummary.style.display = 'none';
  }
  
  const formHeader = document.querySelector('.form-header');
  if (formHeader) {
    formHeader.style.display = 'none';
  }
  
  // Show success message
  if (elements.successMessage) {
    elements.successMessage.classList.remove('hidden');
    elements.successMessage.hidden = false;
    elements.successMessage.style.display = 'block';
    elements.successMessage.classList.add('visible');
    console.log('  Message de succès affiché');
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --------------------------------------------------------------------------
// EVENT HANDLERS
// --------------------------------------------------------------------------

function handleInput(e) {
  const field = e.target.id;
  const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  
  state.formData[field] = value;
  
  // Clear error on input
  if (state.errors[field]) {
    delete state.errors[field];
    const input = document.getElementById(field);
    const errorEl = document.getElementById(`${field}-error`);
    
    if (input) input.classList.remove('error');
    if (errorEl) errorEl.classList.remove('visible');
  }
}

function handleFileChange(e) {
  const field = e.target.id;
  const file = e.target.files[0];
  
  console.log(`📎 handleFileChange: ${field}`, file ? file.name : 'aucun fichier');
  
  if (file) {
    state.formData[field] = file;
    
    // Update UI to show file is selected
    const wrapper = e.target.closest('.form-file-wrapper');
    if (wrapper) {
      // Check if file-name element exists, create if not
      let fileName = wrapper.querySelector('.file-name');
      if (!fileName) {
        fileName = document.createElement('p');
        fileName.className = 'file-name';
        fileName.style.cssText = 'margin-top: var(--space-sm); font-weight: var(--font-weight-semibold);';
        wrapper.insertBefore(fileName, wrapper.querySelector('.file-types').nextSibling);
      }
      
      fileName.textContent = `✓ ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      fileName.style.color = 'var(--color-text-success)';
      
      // Clear any error
      const errorEl = document.getElementById(`${field}-error`);
      if (errorEl) {
        errorEl.classList.remove('visible');
      }
      e.target.classList.remove('error');
      
      console.log(`  ✅ Fichier ${field} chargé: ${file.name}`);
    }
  }
}

function handleNext() {
  console.log(`🔵 handleNext() appelé - currentStep: ${state.currentStep}`);
  
  if (validateStep(state.currentStep)) {
    console.log('✅ Validation réussie');
    if (state.currentStep < state.totalSteps) {
      state.currentStep++;
      console.log(`➡️ Passage à l'étape ${state.currentStep}`);
      showStep(state.currentStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.log('📤 Envoi du formulaire');
      submitForm();
    }
  } else {
    console.log('❌ Validation échouée:', state.errors);
    showErrors(state.currentStep);
    // Scroll to first error
    const firstError = document.querySelector('.form-input.error, .form-textarea.error, .form-select.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

function handlePrev() {
  if (state.currentStep > 1) {
    state.currentStep--;
    showStep(state.currentStep);
  }
}

function submitForm() {
  // Simulate form submission
  const submitBtn = elements.nextBtn;
  const originalText = submitBtn.innerHTML;
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Envoi en cours...';
  
  // Simulate API call
  setTimeout(() => {
    console.log('✅ Formulaire soumis avec succès');
    console.log('📄 Données:', state.formData);
    
    showSuccessMessage();
    
    // Reset form
    state.currentStep = 1;
    state.formData = {
      civilite: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      codePostal: '',
      ville: '',
      formation: '',
      experience: '',
      disponibilite: '',
      permisB: false,
      cv: null,
      lettre: null,
      pieces: null
    };
  }, 2000);
}

// --------------------------------------------------------------------------
// EXPOSE GLOBAL FUNCTIONS (for inline onclick handlers)
// --------------------------------------------------------------------------

// Expose nextStep and previousStep globally for backward compatibility
if (typeof window !== 'undefined') {
  window.nextStep = function(step) {
    console.log(`🔘 nextStep(${step}) called from inline handler`);
    handleNext();
  };
  
  window.previousStep = function(step) {
    console.log(`🔙 previousStep(${step}) called from inline handler`);
    handlePrev();
  };
}

// --------------------------------------------------------------------------
// INIT
// --------------------------------------------------------------------------

export function initApplicationForm(rootElement = document) {
  const form = rootElement.getElementById('application-form');
  if (!form) {
    console.warn('⚠️ Formulaire non trouvé (#application-form). Module non initialisé.');
    return;
  }
  
  console.log('🔍 Initialisation du formulaire...');
  
  // Store elements
  elements = {
    formContainer: rootElement.querySelector('.form-container'),
    successMessage: rootElement.getElementById('success-message'),
    progressSteps: rootElement.querySelectorAll('.progress-steps .progress-step'),
    progressBar: rootElement.querySelector('[role="progressbar"]'),
    formSections: rootElement.querySelectorAll('.form-section[data-step]'),
    prevBtn: rootElement.querySelector('button[data-action="prev"]'),
    nextBtn: rootElement.querySelector('button[data-action="next"]'),
    form: form
  };
  
  console.log(`📦 Éléments trouvés: ${elements.formSections.length} sections`);
  
  // IMPORTANT: Show ALL sections first (remove any inline display:none)
  elements.formSections.forEach((section, index) => {
    section.style.display = 'block';
    section.hidden = false;
    section.classList.remove('hidden');
    console.log(`  Section ${index + 1}: display=block`);
  });
  
  // Add event listeners to ALL inputs including file inputs
  const allInputs = form.querySelectorAll('input, textarea, select');
  console.log(`📋 ${allInputs.length} inputs trouvés`);
  
  allInputs.forEach(input => {
    console.log(`  Input: ${input.id} (${input.type})`);
    if (input.type === 'file') {
      input.addEventListener('change', handleFileChange);
      console.log(`    → Event listener change ajouté`);
    } else {
      input.addEventListener('input', handleInput);
    }
  });
  
  // Bind step navigation (data-action) and file triggers (data-trigger="file" data-target="id")
  form.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const trigger = btn.getAttribute('data-trigger');
    if (action === 'next') {
      e.preventDefault();
      handleNext();
    } else if (action === 'prev') {
      e.preventDefault();
      handlePrev();
    } else if (trigger === 'file') {
      const targetId = btn.getAttribute('data-target');
      if (targetId) {
        e.preventDefault();
        const input = rootElement.getElementById(targetId);
        if (input && input.type === 'file') input.click();
      }
    }
  });
  
  // Prevent default form submission BUT handle submit button
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('📤 Formulaire soumis - handling submission');
    
    // If we're on the last step, submit
    if (state.currentStep === state.totalSteps) {
      handleNext();
    }
  });
  
  // Initialize - show step 1
  console.log('✅ Affichage étape 1');
  showStep(1);
  
  console.log('✅ Application Form initialized');
  console.log(`📝 ${state.totalSteps} étapes`);
}
