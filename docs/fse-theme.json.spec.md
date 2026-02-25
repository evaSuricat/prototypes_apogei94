# Spécification theme.json – Mapping depuis _tokens.scss

Ce document décrit comment mapper les variables CSS du prototype (`scss/_tokens.scss`) vers les clés du fichier `theme.json` d’un thème FSE. Il sert de base pour créer ou mettre à jour le `theme.json` du thème enfant Apogei 94.

**Source de vérité prototype :** `scss/_tokens.scss`

---

## 1. Couleurs (settings.color)

| _tokens.scss (--color-*) | theme.json (settings.color.palette) |
|--------------------------|--------------------------------------|
| --color-bg-default       | slug: `bg-default`, color: #f9f9f9  |
| --color-bg-surface       | slug: `bg-surface`, color: #ffffff  |
| --color-bg-brand         | slug: `bg-brand`, color: #00619b    |
| --color-bg-brand-subtle  | slug: `bg-brand-subtle`             |
| --color-text-default     | slug: `text-default`                |
| --color-text-secondary   | slug: `text-secondary`              |
| --color-text-inverse     | slug: `text-inverse`                |
| --color-text-brand       | slug: `text-brand`                  |
| --color-border-default   | slug: `border-default`              |
| --color-border-focus    | slug: `border-focus`                |
| … (toutes les entrées --color-*) | Même logique : slug = nom sans préfixe (ex. bg-accent-green), color = valeur hex |

Les couleurs “sémantiques” (success, warning, error, info, accent-*) sont déjà présentes dans _tokens.scss ; les reporter dans `settings.color.palette` avec un slug cohérent (ex. `bg-success`, `text-error`).

---

## 2. Typographie (settings.typography)

| _tokens.scss | theme.json (settings.typography) |
|--------------|----------------------------------|
| --font-family | fontFamilies : body, heading (Aptos + fallbacks) |
| --font-size-caption-sm … --font-size-display-lg | fontSizes : slug (caption-sm, body, h1 … display-lg), size en rem |
| --font-weight-regular … bold | Réutiliser dans styles, pas de preset dédié WP par défaut |
| --line-height-* | lineHeight dans styles globaux ou par bloc |

---

## 3. Spacing (settings.spacing)

| _tokens.scss (--space-*) | theme.json (settings.spacing.spacingSizes) |
|--------------------------|--------------------------------------------|
| --space-xs (8px)         | slug: 10, size: "0.5rem" ou "8px"         |
| --space-sm (12px)        | slug: 20, size: "0.75rem"                 |
| --space-md (16px)        | slug: 30, size: "1rem"                    |
| --space-lg (24px)        | slug: 40                                  |
| --space-xl (32px)        | slug: 50                                  |
| --space-2xl … 3xl        | slug: 60, etc.                            |

Les slugs numériques (10, 20, 30…) sont courants en FSE ; on peut aussi utiliser des slugs sémantiques (xs, sm, md) si le thème les expose.

---

## 4. Layout (contentSize / wideSize)

| _tokens.scss | theme.json |
|--------------|------------|
| --container-content: 620px | layout.contentSize: "620px" |
| --container-wide: 1280px   | layout.wideSize: "1280px"   |

---

## 5. Non couvert par theme.json (CSS custom properties)

Les éléments suivants n’ont pas d’équivalent direct dans `theme.json` ; les garder en variables CSS dans le thème (fichier SCSS ou `styles.css` généré) :

- **Radius :** --radius-sm, --radius-md, --radius-lg, --radius-xl, --radius-full
- **Shadows :** --shadow-sm … --shadow-xl, --shadow-focus, --shadow-focus-error
- **Duration / Easing :** --duration-*, --easing-*
- **Z-index :** --z-base, --z-dropdown, --z-sticky, --z-overlay, --z-modal, etc.

Convention possible dans le thème : préfixe `--apogei--` (ex. `--apogei--radius--md`, `--apogei--space--sm`) pour éviter les conflits avec les presets WP (`--wp--preset--*`).

---

## 6. Fichier brouillon

Un brouillon minimal `fse-theme-draft.json` est fourni dans `docs/` pour illustrer la structure (version 2, palette réduite, typo, layout). À adapter selon le thème parent et les besoins du projet.
