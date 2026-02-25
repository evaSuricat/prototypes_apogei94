# Apogei 94 – Guide pour les agents IA

Projet de refonte du site Apogei 94 (HTML, SCSS, Vanilla JS, Vite). Code préparé pour une future intégration en thème enfant **Full Site Editing (FSE) WordPress**.

## Règles à respecter

- **Référence :** [QWEN_GUIDE.md](QWEN_GUIDE.md) – règles de développement, architecture SCSS, conventions JS et accessibilité.
- **Ne pas renommer** les classes CSS existantes sans accord explicite.
- **Ne pas supprimer** les commentaires existants.
- Utiliser le **design system** (tokens dans `scss/_tokens.scss`).
- Rester en **Vanilla JS**, pas de framework.
- Conventions Cursor : voir [.cursor/rules/apogei-94.mdc](.cursor/rules/apogei-94.mdc).

## Structure

- **Pages :** 7 HTML à la racine ; point d’entrée JS : `js/main.js`.
- **Modules JS :** `js/modules/` (donation-calculator, filters-establishments, filters-jobs, application-form, establishment-tabs, offre-actions).
- **Styles :** `scss/main.scss` assemble tokens → mixins → base → layout → components → pages.

## Commandes

- `npm run build:css` – compile SCSS
- `npm run dev` – serveur Vite (port 3000)
- `npm run build` – build production
