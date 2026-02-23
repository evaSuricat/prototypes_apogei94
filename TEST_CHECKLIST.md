# 🧪 TEST AUTOMATISÉ - Refactor Apogei 94

## Checklist par page

### Pour CHAQUE page HTML, vérifier :

#### 1. Structure HTML
- [ ] `<link rel="preload" href="css/main.css">` présent
- [ ] `<link rel="stylesheet" href="css/main.css">` présent
- [ ] Skip-link présente (`<a href="#main-content" class="sr-only skip-link">`)
- [ ] Pas de `<style>` inline
- [ ] Pas de `<script>` inline (sauf modules ES6)

#### 2. CSS
- [ ] `css/main.css` existe et fait < 150 Ko
- [ ] Tous les composants de la page ont des styles dans SCSS
- [ ] Pas d'erreurs de compilation SCSS

#### 3. JavaScript (si module)
- [ ] Module créé dans `js/modules/`
- [ ] Import dans `js/main.js`
- [ ] Initialisation détecte correctement la page
- [ ] Console log au chargement : "✅ [Module] initialized"

#### 4. Tests fonctionnels (si JS)
- [ ] Tous les IDs HTML correspondent aux selectors JS
- [ ] Les boutons/fonctions inline sont exposés globalement (window.*)
- [ ] La validation fonctionne (si formulaire)
- [ ] Les events listeners sont attachés

---

## Pages à tester

### ✅ TERMINÉES

| Page | CSS | JS | Tests | Notes |
|------|-----|-----|-------|-------|
| `don.html` | ✅ | ✅ | ✅ | Calculateur OK |
| `etablissements.html` | ✅ | ✅ | ✅ | Filtres + Leaflet OK |
| `carrieres.html` | ✅ | ✅ | ✅ | Filtres jobs OK |
| `postuler.html` | ✅ | ✅ | ⚠️ | **Formulaire à re-tester** |

### ⚠️ À VALIDER

| Page | CSS | JS | Tests | Notes |
|------|-----|-----|-------|-------|
| `index.html` | ✅ | ❌ | ❓ | CSS uniquement - test visuel |
| `etablissement-detail.html` | ✅ | ❌ | ❓ | CSS + JS inline à extraire |
| `offre-detail.html` | ✅ | ❌ | ❓ | CSS + JS inline à extraire |

---

## Commandes de test

### 1. Vérifier qu'une page n'a pas de style/script inline

```bash
# Compter les <style> dans un fichier
grep -c "<style>" etablissements.html  # Devrait être 0

# Compter les <script> inline (pas type="module")
grep -c "<script>" etablissements.html  # Devrait être 0
```

### 2. Vérifier les liens CSS

```bash
# Vérifier preload + stylesheet
grep "preload.*main.css" index.html  # Devrait trouver 1
grep "stylesheet.*main.css" index.html  # Devrait trouver 1
```

### 3. Vérifier skip-link

```bash
grep "skip-link" index.html  # Devrait trouver 1
```

### 4. Vérifier compilation SCSS

```bash
sass scss/main.scss css/main.css --no-source-map
# Si erreur → corriger avant de continuer
```

---

## Tests spécifiques par module JS

### donation-calculator.js
```javascript
// Dans la console du navigateur :
typeof initDonationCalculator  // 'function'
document.getElementById('donate-form')  // Existe
// Cliquer boutons montant → updateDisplay() appelé
```

### filters-establishments.js
```javascript
// Dans la console :
typeof initEstablishmentsFilters  // 'function'
document.getElementById('grid-view')  // Existe
// Changer filtres → applyFilters() appelé
// Cliquer "Carte" → Leaflet s'initialise
```

### filters-jobs.js
```javascript
// Dans la console :
typeof initCareerFilters  // 'function'
document.getElementById('jobs-grid')  // Existe
// Changer filtres → applyJobFilters() appelé
```

### application-form.js
```javascript
// Dans la console :
typeof initApplicationForm  // 'function'
document.getElementById('application-form')  // Existe
window.nextStep  // 'function' (exposé globalement)
window.previousStep  // 'function' (exposé globalement)
// Remplir étape 1 + cliquer Suivant → validation + étape 2
```

---

## Rapport de bugs

Si un test échoue, noter :

```
PAGE: [nom de la page]
PROBLÈME: [description]
CONSOLE: [messages d'erreur]
SELECTEUR: [selector qui ne marche pas]
ID_MANQUANT: [ID HTML vs JS]
SOLUTION: [ce qu'il faut corriger]
```

---

## Prochaines étapes

1. ✅ Exécuter tous les tests ci-dessus
2. ✅ Corriger tous les bugs trouvés
3. ✅ Extraire JS inline restant (etablissement-detail, offre-detail)
4. ✅ Re-tester toutes les pages
5. ✅ Documenter dans README.md

---

**Dernière mise à jour:** 21 Février 2026
**Statut:** En cours
