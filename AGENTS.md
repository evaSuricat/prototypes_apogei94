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

- **Pages :** 7 HTML à la racine ; point d'entrée JS : `js/main.js`.
- **Modules JS :** `js/modules/` (donation-calculator, filters-establishments, filters-jobs, application-form, establishment-tabs, offre-actions).
- **Styles :** `scss/main.scss` assemble tokens → mixins → base → layout → components → pages.

## Commandes

- `npm run build:css` – compile SCSS
- `npm run dev` – serveur Vite (port 3000)
- `npm run build` – build production

## Cursor Cloud specific instructions

### Project overview

Apogei 94 is a static front-end website (7 HTML pages, vanilla JS + SCSS, Vite dev server). No backend, no database, no API. All content is hardcoded in HTML. See `README.md` for the full project structure.

### Running the dev server

```bash
npm run dev
```

Starts Vite on `localhost:3000` (configured in `vite.config.js`).

### Building

- `npm run build:css` — compiles SCSS to CSS (requires `sass` CLI installed globally)
- `npm run build` — runs SCSS compilation then Vite production build to `dist/`

### Key caveats

- **Sass is not in `package.json` dependencies** — it must be installed globally (`npm install -g sass`). The compiled `css/main.css` is committed, so Sass is only needed when modifying SCSS files.
- **Sass `@import` deprecation warnings** are expected and harmless; the project uses `@import` which is deprecated in Dart Sass 3.0 but still functional.
- **No linter or test framework** is configured in this project. No ESLint, Prettier, or test runner.
- **External CDN dependencies**: Leaflet (map on `etablissements.html`) and Unsplash images require internet access. The site functions without them but the map and images won't render.
- **Tunnel de test** : utiliser `~/cloudflared tunnel --url http://localhost:3000` pour exposer le dev server via un lien public (nécessite `allowedHosts: true` dans `vite.config.js`).
