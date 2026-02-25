# 📒 NOTES DE DÉVELOPPEMENT - Apogei 94

**Projet :** Refonte site Apogei 94  
**Repo :** https://github.com/evaSuricat/prototypes_apogei94  
**Prod :** https://prototypes.evapogei.fr/qwen_apogei_v1/  
**Dernière session :** 21 Février 2026

---

## 🎯 CONTEXTE RAPIDE (à lire AVANT de commencer)

**Architecture :**
- **Build :** Vite (npm run build → dist/)
- **CSS :** SCSS modulaire (7 fichiers _pages/)
- **JS :** Modules ES6 (4 modules dans js/modules/)
- **Deploy :** FTP manuel (FileZilla)
- **Hébergement :** Infomaniak (PHP, PAS Node.js)

**Pages existantes :**
- ✅ index.html (Accueil)
- ✅ etablissements.html (Filtres + Leaflet Map)
- ✅ etablissement-detail.html (Détail)
- ✅ don.html (Calculateur d'impact)
- ✅ carrieres.html (Filtres offres)
- ✅ postuler.html (Formulaire multi-étapes)
- ✅ offre-detail.html (Détail offre)

**À faire :**
- ❌ Page "À propos"
- ❌ Page "Contact"
- ❌ Améliorations UX mobile
- ❌ Tests accessibilité

---

## 📁 STRUCTURE DU PROJET

```
qwen_apogei_v1/
├── scss/
│   ├── _tokens.scss           # Variables CSS
│   ├── _mixins.scss           # Mixins
│   ├── _base.scss             # Reset + utilitaires
│   ├── _layout.scss           # Header, footer
│   ├── _components.scss       # Boutons, cards...
│   └── _pages/
│       ├── _don.scss
│       ├── _etablissements.scss
│       ├── _carrieres.scss
│       ├── _home.scss
│       ├── _detail.scss
│       ├── _postuler.scss
│       └── _offre-detail.scss
├── js/
│   ├── main.js                # Entry point
│   └── modules/
│       ├── donation-calculator.js
│       ├── filters-establishments.js
│       ├── filters-jobs.js
│       └── application-form.js
├── dist/                      # Build output (EXCLU de Git)
├── *.html                     # 7 pages HTML
├── package.json               # Scripts npm
├── vite.config.js             # Config Vite
├── .gitignore                 # Exclure dist/, node_modules/
├── DEPLOY.md                  # Guide déploiement
├── README.md                  # Documentation
├── QWEN_GUIDE.md              # Règles dev
└── NOTES.md                   # CE FICHIER
```

---

## 📅 Session du 21 Février 2026 (DERNIÈRE SESSION)

### ✅ Ce qu'on a fait :

- [x] Migration vers Vite build system
- [x] Configuration Git + GitHub
- [x] Déploiement Infomaniak via FTP
- [x] Nettoyage structure projet
- [x] Documentation (DEPLOY.md, README.md)
- [x] Configuration SSH + GitHub Keys
- [x] Workflow Git optimisé

### 📁 Fichiers créés/modifiés :

| Fichier | Action | Notes |
|---------|--------|-------|
| `vite.config.js` | Créé | Config Vite + base path |
| `package.json` | Créé | Scripts: dev, build, preview |
| `.gitignore` | Modifié | Exclure dist/, node_modules/ |
| `DEPLOY.md` | Créé | Guide complet déploiement |
| `README.md` | Créé | Documentation projet |
| `GIT_WORKFLOW.md` | Créé | (supprimé depuis - obsolète) |
| `NOTES.md` | Créé | Mémoire entre sessions |
| `scss/_pages/*.scss` | Créé | 7 fichiers page styles |
| `js/modules/*.js` | Créé | 4 modules ES6 |

### 🎨 Décisions importantes :

| Sujet | Décision | Pourquoi |
|-------|----------|----------|
| **Build** | Vite | Rapide, moderne, bundle unique |
| **Deploy** | FTP manuel | Infomaniak = PHP (pas Node.js) |
| **Git** | Code source uniquement | dist/ exclu (build artifact) |
| **Workflow** | npm run build → FileZilla → git | Simple, fiable |
| **Node.js serveur** | NON | Hébergement PHP standard |
| **GitHub Actions** | À faire plus tard | Automatisation future |

### ⚠️ POINTS D'ATTENTION (IMPORTANT !)

| Problème | Solution |
|----------|----------|
| **Infomaniak PAS Node.js** | Build local obligatoire |
| **SSH ne résout pas h2web478** | Utiliser FTP, pas rsync |
| **MIME type modules JS** | Résolu par Vite bundle |
| **dist/ dans Git** | EXCLU (dans .gitignore) |

### 📋 Prochaines étapes (PRIORITÉS)

**Priorité 1 :**
- [ ] Ajouter page "À propos" (about.html)
- [ ] Ajouter page "Contact" (contact.html)

**Priorité 2 :**
- [ ] Améliorer UX mobile (responsive)
- [ ] Tests accessibilité (WCAG 2.1)

**Priorité 3 :**
- [ ] Optimiser performances (Lighthouse 90+)
- [ ] GitHub Actions (auto deploy)

---

## 🚀 COMMANDES UTILES

```bash
# Développement (local)
npm run dev              # Vite dev server → http://localhost:3000

# Build (production)
npm run build            # → dist/

# Git
git status               # État du repo
git add .                # Ajouter fichiers
git commit -m "Message"  # Commit
git push origin main     # Push GitHub

# Deploy (manuel)
# 1. npm run build
# 2. FileZilla → dist/ → /www/prototypes/qwen_apogei_v1/
# 3. Test: https://prototypes.evapogei.fr/qwen_apogei_v1/
```

---

## 📞 RESSOURCES

| Fichier | Description |
|---------|-------------|
| `scss/_tokens.scss` | Design System (couleurs, typo, spacing) |
| `QWEN_GUIDE.md` | Règles de développement (QWEN_GUIDE.md) |
| `DEPLOY.md` | Guide complet de déploiement |
| `README.md` | Documentation du projet |
| `vite.config.js` | Configuration Vite |
| `package.json` | Scripts npm + dépendances |

**Liens externes :**
- **Repo GitHub :** https://github.com/evaSuricat/prototypes_apogei94
- **Prod :** https://prototypes.evapogei.fr/qwen_apogei_v1/
- **Infomaniak :** https://manager.infomaniak.com

---

## 🧠 POUR REPRENDRE CE PROJET (instructions pour Qwen Code)

**Si tu es Qwen Code et que tu reprends ce projet :**

1. **Lis ce fichier NOTES.md** (section "CONTEXTE RAPIDE")
2. **Ouvre les fichiers pertinents** selon la tâche :
   - Nouvelle page → `scss/_pages/`, `*.html`
   - Nouveau module → `js/modules/`, `js/main.js`
   - Styles globaux → `scss/_layout.scss`, `scss/_components.scss`
3. **Respecte QWEN_GUIDE.md** (règles : pas de renommage, pas de suppression commentaires)
4. **Build avant deploy** : `npm run build`
5. **Commit après chaque feature** : `git add . && git commit -m "..."`

---

**Dernière mise à jour :** 21 Février 2026 (Session 2)  
**Prochaine session :** [DATE]  
**Objectif :** [FEATURE À AJOUTER]

---

## 📅 Session du 21 Février 2026 (SESSION 2 - Build & CSS)

### ✅ Ce qu'on a fait :

- [x] **Correction du build CSS** : Ajout de `npm run build:css` avant `vite build`
- [x] **Mise à jour package.json** : Scripts build:css + build enchaînés
- [x] **Documentation** : NOTES.md mis à jour avec workflow complet
- [x] **Settings VS Code** : .vscode/settings.json créé

### 🔧 PROBLÈME RÉSOLU

| Problème | Cause | Solution |
|----------|-------|----------|
| **CSS pas affiché en local** | Vite ne bundle pas le CSS automatiquement | Ajout `build:css` script |
| **Liens cassés en preview** | `base: './'` dans vite.config.js | Tester directement en prod ou Live Server |
| **css/main.css inexistant** | SCSS non compilé avant build Vite | `npm run build:css && vite build` |

### 📁 Fichiers modifiés :

| Fichier | Modification |
|---------|--------------|
| `package.json` | Ajout script `build:css` + enchaînement dans `build` |
| `NOTES.md` | Mis à jour avec nouveau workflow |

### 🚀 WORKFLOW CORRIGÉ (À SUIVRE)

```bash
# Build (CSS + Vite automatiquement)
npm run build
# → Équivaut à : npm run build:css && vite build

# Preview local
npm run preview
# → http://localhost:4173/

# OU Live Server (meilleur pour les liens)
# Ouvre dist/index.html → Live Server

# Deploy
# FileZilla → dist/ → /www/prototypes/qwen_apogei_v1/

# Commit
git add .
git commit -m "Message"
git push origin main
```

### ⚠️ POINTS D'ATTENTION

| Point | Solution |
|-------|----------|
| **Preview Vite = liens cassés** | Utiliser Live Server ou test direct fichier |
| **CSS non bundle par Vite** | Compilation SCSS manuelle avant build |
| **base: './'** | Configuré pour prod (sous-dossier Infomaniak) |

---
