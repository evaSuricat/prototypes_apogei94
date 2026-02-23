/**
 * Donation Calculator Module
 * 
 * Gère le calculateur d'impact pour la page de don (don.html).
 * Permet de sélectionner un montant, une fréquence, et affiche l'impact social.
 * 
 * @module donation-calculator
 */

// --------------------------------------------------------------------------
// STATE PRIVÉ
// --------------------------------------------------------------------------

const state = {
  currentAmount: 50,
  currentFrequency: 'one-time'
};

// --------------------------------------------------------------------------
// FONCTIONS PURES (Business Logic)
// --------------------------------------------------------------------------

/**
 * Calcule l'impact social basé sur le montant du don.
 * Fonction pure : pas d'effets de bord, retourne toujours le même résultat pour les mêmes arguments.
 * 
 * @param {number} amount - Le montant du don en euros
 * @returns {{ meals: number, hours: number, workshops: number }} L'impact calculé
 */
function calculateImpact(amount) {
  // Ratios d'impact (exemples)
  const MEAL_RATIO = 3.33;      // 1 repas = ~3.33€
  const HOUR_RATIO = 10;        // 1h accompagnement = ~10€
  const WORKSHOP_RATIO = 16.67; // 1 atelier = ~16.67€

  return {
    meals: Math.round(amount / MEAL_RATIO),
    hours: Math.round(amount / HOUR_RATIO),
    workshops: Math.round(amount / WORKSHOP_RATIO)
  };
}

// --------------------------------------------------------------------------
// FONCTIONS DOM (UI Updates)
// --------------------------------------------------------------------------

/**
 * Met à jour l'affichage du montant et de l'impact dans le DOM.
 * 
 * @param {HTMLElement} rootElement - L'élément racine dans lequel chercher les éléments du calculateur
 */
function updateDisplay(rootElement = document) {
  const displayAmount = rootElement.getElementById('display-amount');
  const buttonAmount = rootElement.getElementById('button-amount');
  const impact1 = rootElement.getElementById('impact-1');
  const impact2 = rootElement.getElementById('impact-2');
  const impact3 = rootElement.getElementById('impact-3');
  const amountBtns = rootElement.querySelectorAll('.amount-btn');
  const customAmountInput = rootElement.getElementById('custom-amount');

  // Mise à jour des montants affichés
  if (displayAmount) displayAmount.textContent = state.currentAmount;
  if (buttonAmount) buttonAmount.textContent = `${state.currentAmount}€`;

  // Calcul et mise à jour de l'impact
  const impact = calculateImpact(state.currentAmount);
  if (impact1) impact1.textContent = `${impact.meals} repas adaptés`;
  if (impact2) impact2.textContent = `${impact.hours}h d'accompagnement`;
  if (impact3) impact3.textContent = `${impact.workshops} ateliers thérapeutiques`;

  // Mise à jour des états actifs des boutons
  amountBtns.forEach(btn => {
    const btnAmount = parseInt(btn.dataset.amount, 10);
    btn.classList.toggle('active', btnAmount === state.currentAmount);
  });

  // Désactiver visuellement les boutons prédéfinis si un montant personnalisé est saisi
  if (customAmountInput && customAmountInput.value && parseInt(customAmountInput.value, 10) !== state.currentAmount) {
    amountBtns.forEach(btn => btn.classList.remove('active'));
  }
}

/**
 * Valide le montant saisi.
 * 
 * @param {number} value - Le montant à valider
 * @returns {boolean} true si le montant est valide, false sinon
 */
function isValidAmount(value) {
  return value && value >= 1 && value <= 10000;
}

// --------------------------------------------------------------------------
// GESTIONNAIRES D'ÉVÉNEMENTS
// --------------------------------------------------------------------------

/**
 * Gère le clic sur les boutons de montant prédéfinis.
 * 
 * @param {Event} event - L'événement de clic
 * @param {HTMLElement} rootElement - L'élément racine
 */
function handleAmountBtnClick(event, rootElement) {
  const btn = event.currentTarget;
  const amount = parseInt(btn.dataset.amount, 10);
  
  if (!isNaN(amount)) {
    state.currentAmount = amount;
    
    const customAmountInput = rootElement.getElementById('custom-amount');
    if (customAmountInput) {
      customAmountInput.value = '';
    }
    
    updateDisplay(rootElement);
  }
}

/**
 * Gère la saisie du montant personnalisé.
 * 
 * @param {Event} event - L'événement d'input
 * @param {HTMLElement} rootElement - L'élément racine
 */
function handleCustomAmountInput(event, rootElement) {
  const value = parseInt(event.target.value, 10);
  
  if (isValidAmount(value)) {
    state.currentAmount = value;
    updateDisplay(rootElement);
  }
}

/**
 * Gère le clic sur les boutons de fréquence.
 * 
 * @param {Event} event - L'événement de clic
 */
function handleFrequencyBtnClick(event) {
  const btn = event.currentTarget;
  const frequency = btn.dataset.frequency;
  
  if (frequency) {
    state.currentFrequency = frequency;
    
    // Mise à jour visuelle des boutons de fréquence
    const frequencyBtns = document.querySelectorAll('.frequency-btn');
    frequencyBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}

/**
 * Gère la soumission du formulaire de don.
 * 
 * @param {Event} event - L'événement de submit
 */
function handleFormSubmit(event) {
  event.preventDefault();

  // En production : redirection vers la passerelle de paiement (HelloAsso/Stripe)
  const frequencyLabel = state.currentFrequency === 'one-time' ? 'Unique' : 'Mensuel';
  
  console.log('✅ Redirection vers le paiement sécurisé');
  console.log(`Montant: ${state.currentAmount}€`);
  console.log(`Fréquence: ${frequencyLabel}`);
  console.log('Intégration HelloAsso/Stripe à implémenter');
  
  // Pour le débogage : afficher une alerte (à retirer en production)
  // alert(`✅ Redirection vers le paiement sécurisé\n\nMontant: ${state.currentAmount}€\nFréquence: ${frequencyLabel}\n\nIntégration HelloAsso/Stripe à implémenter`);
}

// --------------------------------------------------------------------------
// POINT D'ENTRÉE PRINCIPAL
// --------------------------------------------------------------------------

/**
 * Initialise le calculateur de don.
 * À appeler après le chargement du DOM.
 * 
 * @param {HTMLElement} rootElement - L'élément racine dans lequel initialiser le calculateur (par défaut : document)
 */
function initDonationCalculator(rootElement = document) {
  // Vérifier que le formulaire existe
  const donateForm = rootElement.getElementById('donate-form');
  if (!donateForm) {
    console.warn('⚠️ Formulaire de don non trouvé (#donate-form). Calculateur non initialisé.');
    return;
  }

  // Sélection des éléments
  const amountBtns = rootElement.querySelectorAll('.amount-btn');
  const customAmountInput = rootElement.getElementById('custom-amount');
  const frequencyBtns = rootElement.querySelectorAll('.frequency-btn');

  // Attache des event listeners - Boutons de montant
  amountBtns.forEach(btn => {
    btn.addEventListener('click', (event) => handleAmountBtnClick(event, rootElement));
  });

  // Attache des event listeners - Input montant personnalisé
  if (customAmountInput) {
    customAmountInput.addEventListener('input', (event) => handleCustomAmountInput(event, rootElement));
  }

  // Attache des event listeners - Boutons de fréquence
  frequencyBtns.forEach(btn => {
    btn.addEventListener('click', handleFrequencyBtnClick);
  });

  // Attache des event listeners - Formulaire
  donateForm.addEventListener('submit', handleFormSubmit);

  // Initialisation de l'affichage
  updateDisplay(rootElement);

  console.log('✅ Donation Calculator initialized');
  console.log('💰 Impact Calculator active');
}

// --------------------------------------------------------------------------
// EXPORTS
// --------------------------------------------------------------------------

export { initDonationCalculator, calculateImpact, updateDisplay };
