# QWEN_GUIDE – Projet Apogei 94 (qwenz_apogei_v1)

Ce fichier définit les règles à respecter pour toute intervention de Qwen / Qwen Code sur ce projet front (HTML, SCSS, JS) en vue d’une future intégration en thème enfant FSE WordPress.

---

## 1. Objectifs du projet

- Conserver le **design system** déjà mis en place (tokens dérivés de `tokens.json` / `theme.json` Qwen : couleurs, typo Aptos, spacing, radius, ombres, etc.).
- Garder la **structure UX** des pages générées (accueil, `etablissements.html`, `etablissement-detail.html`, `don.html`, `offre-detail.html`, `postuler.html`, etc.).
- Préparer un code **propre, factorisé et maintenable** pour un futur thème enfant **Full Site Editing (FSE)** :
  - SCSS modulaires,
  - conventions BEM,
  - JavaScript structuré et performant,
  - conformité accessibilité & performance.

---

## 2. Règles générales (IMPORTANT)

1. **Ne jamais renommer une classe CSS existante** sans m’en demander explicitement l’autorisation dans la réponse.
2. **Ne jamais supprimer un commentaire existant** dans les fichiers HTML, SCSS ou JS.
3. Ne pas changer le sens fonctionnel d’un composant (calculateur d’impact, filtres établissements, formulaires, etc.) sans justification argumentée.
4. Toujours privilégier la **compatibilité future WordPress FSE** (possibilité de transformer les composants en blocs ou template parts).
5. Rester strictement aligné sur le **design system** déjà utilisé dans les prototypes (variables CSS : `--color-*`, `--space-*`, `--radius-*`, `--shadow-*`, etc.).

---

## 3. Structure SCSS attendue

Le CSS actuel est principalement en `<style>` inline dans les pages. L’objectif est de le refactoriser en SCSS modulaires.

### 3.1. Organisation des fichiers

Proposer et utiliser une structure de ce type (sans renommer les classes existantes) :

- `scss/`
  - `_tokens.scss`  
    - mapping des variables CSS/`theme.json` (`--color-bg-brand`, `--space-lg`, etc.) vers des variables/mixins Sass si nécessaire.
  - `_mixins.scss`  
    - mixins pour : réponses responsive, focus states, cartes, boutons, grids, etc.
  - `_base.scss`  
    - reset, base typographique, utilitaires globaux (`.container`, `.section-padding`, `.sr-only`, etc.).
  - `_layout.scss`  
    - layout généraux (header, footer, grid globales, sections).
  - `_components.scss`  
    - composants réutilisables : boutons `.btn`, badges, cards (`.story-card`, `.job-card`, `.establishment-card`, etc.).
  - `_pages.scss`  
    - styles spécifiques par page si nécessaire (`.hero`, `.impact-strip`, `.donation-layout`, pages établissements…).
  - `main.scss`  
    - fichier d’assemblage qui importe tous les partiels ci-dessus.

### 3.2. Conventions BEM

- Ne pas renommer les classes existantes, mais structurer les **nouveaux ajouts** selon BEM :

  - `block` : composant autonome (`.header`, `.hero`, `.impact-strip`, `.establishment-card`, `.job-card`, `.donation-calculator`…).
  - `block__element` : élément interne (`.hero__title`, `.hero__media`, `.job-card__meta`, `.donation-calculator__slider`…).
  - `block--modifier` : variante (`.btn--primary`, `.btn--ghost`, `.establishment-card--highlighted`, `.section--muted`…).

- Pour les classes déjà existantes non-BEM (`.hero-grid`, `.story-grid`, etc.), les conserver telles quelles et, si besoin, ajouter **en plus** des classes BEM sans casser l’existant.

### 3.3. Mixins appréciés

Créer des mixins SCSS réutilisables, par exemple :

- `@mixin responsive($breakpoint)` pour les media queries type (`tablet`, `desktop`).
- `@mixin focus-ring($color)` pour un focus accessible (équivalent des styles `focus-visible` déjà présents).
- `@mixin card-elevation($level)` pour appliquer les ombres et transitions définies par les tokens (`--shadow-sm`, `--shadow-md`, etc.).
- `@mixin button-variant($bg, $color, $border)` pour les variantes `.btn` (primary, ghost, outline...).
- `@mixin fluid-space($property, $from, $to)` si tu souhaites une interpolation fluide de spacing/typo.

Tout nouveau mixin doit rester cohérent avec les variables déjà existantes dans le CSS généré.

---

## 4. Conventions JavaScript

Le JavaScript actuel comprend notamment :

- Le **système de filtrage** des établissements (state, debounce, accessibility, URL sync, etc.).
- La **page carrières** avec filtres jobs.
- La **page dons** avec calculateur d’impact, gestion de fréquence, formulaire. [file:34]

### 4.1. Organisation souhaitée

- Créer un dossier `js/` avec des modules séparés :

  - `filters-establishments.js`  
    - logique de filtre pour `etablissements.html`.
  - `filters-jobs.js`  
    - logique de filtre pour la page carrières / offres.
  - `donation-calculator.js`  
    - slider, montant personnalisé, fréquence, calcul d’impact et soumission de formulaire.
  - `accessibility.js`  
    - helpers génériques : gestion du skip-link, announcers ARIA, gestion `prefers-reduced-motion`, etc.
  - `utils.js`  
    - utilitaires génériques : `debounce`, `escapeHtml`, helpers de formatage (type, localisation, métier), gestion de query string pour les filtres.

- Utiliser **`DOMContentLoaded`** ou `type="module"` pour initialiser les scripts, en évitant les variables globales polluantes.

### 4.2. Style et meilleures pratiques

- Préférer des fonctions et constantes nommées (éviter les callbacks anonymes imbriqués lourds).
- Garder un **state central** pour chaque feature :

  - ex. `const state = { filters: {...}, currentPage: 1, itemsPerPage: 9 }` pour les filtres établissements.

- Utiliser des fonctions pures pour :

  - filtrer les données (`filterData(state, data)`),
  - rendre un bloc de HTML (`renderCard(item)`),
  - mettre à jour le DOM (en limitant les reflows et en regroupant les manipulations).

- Toujours gérer :

  - focus clavier (`Enter` / `Space` sur les cards interactives),
  - `aria-live` pour les compteurs de résultats,
  - `prefers-reduced-motion` pour réduire les animations si nécessaire.

- Ne pas introduire de framework JS, rester en **Vanilla JS** performant, compatible avec une intégration dans un thème FSE.

---

## 5. Accessibilité & performance

### 5.1. Accessibilité

- Conserver et renforcer les patterns déjà en place dans les prototypes :

  - `aria-live` pour les résultats des filtres,
  - `role="list"` / `role="listitem"` si nécessaire,
  - `aria-label` sur les boutons d’action,
  - skip-link `Aller au contenu principal`,
  - focus visible systématique sur tous les éléments interactifs.

- Vérifier que toutes les interactions soient utilisables au clavier uniquement (tab, shift+tab, enter/space).

### 5.2. Performance

- Continuer à utiliser :

  - `debounce` pour les champs de recherche (300 ms),
  - lazy loading des images (`loading="lazy"`),
  - aucun import de librairie JS externe inutile.

- Minimiser la duplication de CSS et JS entre pages ; mutualiser via les modules SCSS / JS décrits plus haut.

---

## 6. Ce que Qwen / Qwen Code est autorisé à faire

- Proposer un **plan de refactor** multi-fichiers (SCSS, JS, HTML) en respectant les règles ci-dessus.
- Créer de **nouveaux fichiers** (`scss/*.scss`, `js/*.js`) et adapter les `<link>` / `<script>` dans les pages HTML.
- Ajouter des **classes supplémentaires** (par ex. BEM ou utilitaires) sur les éléments existants, sans supprimer les classes actuelles.
- Ajouter des commentaires explicatifs **supplémentaires** (mais jamais supprimer les commentaires existants).
- Proposer des variantes UX / UI, à condition de **ne pas casser les hooks JS existants** (classes, `data-attributes`).

---

## 7. Ce que Qwen / Qwen Code ne doit PAS faire

1. **Ne jamais renommer** les classes existantes (CSS / JS) sans accord explicite dans la réponse.
2. **Ne jamais supprimer** de commentaire dans aucun fichier.
3. Ne pas introduire de dépendances lourdes (framework JS, CSS framework complet, etc.).
4. Ne pas remplacer les variables CSS de tokens par des valeurs magiques (garder les tokens comme source de vérité).
5. Ne pas modifier les chemins de fichiers sans indiquer clairement le diff et les impacts.


## 8. Contexte UX et historique à lire

- Fichier `docs/chat-export-1771608881327.json` : export du chat Qwen original contenant tous les conseils UX détaillés.
- Fichier `docs/UX_NOTES.md` : synthèse des décisions UX/UI à respecter.

---
