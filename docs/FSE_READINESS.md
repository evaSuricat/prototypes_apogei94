# Contrat FSE – Apogei 94

Ce document décrit le contrat d’intégration du prototype vers un thème enfant WordPress Full Site Editing (FSE). Il sert de référence pour implémenter les parties validées du prototype dans le thème, sans grosse refactorisation.

---

## 1. Template parts (header / footer)

| Partie   | Fichier canonique (prototype) | Slug FSE | Area FSE |
|----------|-------------------------------|----------|----------|
| Header   | `parts/header.html`           | `header` | `header` |
| Footer   | `parts/footer.html`           | `footer` | `footer` |

- **Source de vérité :** les fichiers dans `parts/` à la racine du prototype. Toute modification du header ou du footer se fait **uniquement** dans `parts/header.html` et `parts/footer.html`.
- **Inclusion au build :** les 7 pages HTML contiennent les placeholders `<!-- INCLUDE parts/header.html -->` et `<!-- INCLUDE parts/footer.html -->`. Le plugin Vite `scripts/vite-plugin-html-include.js` remplace ces placeholders par le contenu des fichiers `parts/` lors du **serveur de dev** (`npm run dev`) et du **build** (`npm run build`). Aucune duplication du header/footer dans les pages sources.
- **Intégration thème :** au moment de l’implémentation FSE, copier `parts/header.html` et `parts/footer.html` dans le thème enfant (dossier `parts/` du thème) et les déclarer comme template parts avec les slug/area ci-dessus. En WordPress, les liens et l’élément “actif” (menu courant) pourront être gérés par le bloc Navigation ou par le thème (PHP/JS).
- **Lien actif dans la nav :** le module `js/modules/header-active-link.js` marque le lien correspondant à la page courante avec `class="active"` et `aria-current="page"`. Cette logique est **réutilisable telle quelle dans le thème FSE** : enqueue le même script (ou son équivalent) sur le front pour que le header affiche le bon lien actif sans recoder le header.
- **Logo :** pour que la cliente puisse changer le logo plus tard, voir `docs/LOGO_WORDPRESS.md` (bloc Site Logo, SVG via Safe SVG).

---

## 2. Design tokens (source unique)

- **Fichier source :** `scss/_tokens.scss` (variables CSS : `--color-*`, `--space-*`, `--radius-*`, `--shadow-*`, typo, etc.).
- **Règle :** tout nouveau token ou variable “design” doit être ajouté dans `_tokens.scss` ; pas de valeurs magiques dans les composants.
- **Pour FSE :** un fichier de spec ou un brouillon `theme.json` est disponible dans `docs/` (voir section 4) pour mapper ces variables vers les clés `theme.json` (palette, typography, spacing, etc.) au moment de la création ou de la mise à jour du thème enfant.

---

## 3. Modules JavaScript

Liste des modules du prototype (point d’entrée : `js/main.js`) à prendre en compte pour l’intégration :

| Module                      | Fichier                          | Pages concernées        |
|----------------------------|----------------------------------|-------------------------|
| Lien actif header          | `js/modules/header-active-link.js` | Toutes (nav principale) |
| Calculateur de don         | `js/modules/donation-calculator.js` | don.html                |
| Filtres établissements     | `js/modules/filters-establishments.js` | etablissements.html     |
| Filtres offres d’emploi    | `js/modules/filters-jobs.js`     | carrieres.html          |
| Formulaire de candidature  | `js/modules/application-form.js` | postuler.html           |
| Onglets + galerie          | `js/modules/establishment-tabs.js` | etablissement-detail.html |
| Print + partage            | `js/modules/offre-actions.js`    | offre-detail.html       |

- En FSE : enqueue ces scripts par template/page ou via des blocs selon la stratégie du thème. Les sélecteurs et `data-*` utilisés dans le prototype doivent être conservés (voir section 5).

---

## 4. Option theme.json (spec / brouillon)

- Un fichier de **spécification** et un **brouillon** sont dans `docs/` :
  - `docs/fse-theme.json.spec.md` : mapping des variables de `scss/_tokens.scss` vers les clés FSE (`settings.color.palette`, `settings.typography`, `settings.spacing`, etc.).
  - `docs/fse-theme-draft.json` : brouillon minimal `theme.json` (palette, typo, layout). À adapter lors de la création ou de la mise à jour du `theme.json` du thème enfant.

---

## 5. Classes et IDs à ne pas casser

Pour que le prototype et le thème restent alignés, les éléments suivants ne doivent pas être renommés sans accord explicite (voir QWEN_GUIDE.md) :

- **Layout global :** `.header`, `.header-content`, `.container`, `.nav-links`, `.header-actions`, `.footer`, `.footer-grid`, `.footer-col`, `.footer-copyright`, `.footer-logo`, `.footer-description`
- **Accessibilité :** `.sr-only`, `.skip-link`, `#main-content`
- **Composants :** `.btn`, `.btn-primary`, `.btn-outline`, `.logo`, et les classes des cartes / formulaires utilisées par les modules JS
- **Hooks JS :** `#donate-form`, `#application-form`, `#grid-view`, `#jobs-grid`, `data-page`, `data-action`, `data-trigger`, `data-target`, `data-share`, `.share-btn`, `.progress-steps`, `.form-section[data-step]`, etc.

Toute nouvelle classe peut suivre BEM ; les classes existantes sont conservées.

---

## 6. Rappel des règles (QWEN_GUIDE)

- Ne jamais renommer une classe CSS existante sans accord explicite.
- Ne jamais supprimer un commentaire existant (HTML, SCSS, JS).
- Rester en Vanilla JS, pas de framework ; design system via `_tokens.scss`.

---

*Document de référence pour l’intégration FSE – prototype Apogei 94.*
