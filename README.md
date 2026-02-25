# Apogei 94 - Site Web

Refonte du site d'Apogei 94, association accompagnant les personnes en situation de handicap dans le Val-de-Marne.

## 📁 Structure du projet

```
qwen_apogei_v1/
├── scss/                      # Sources SCSS
│   ├── _tokens.scss           # Variables CSS (design tokens)
│   ├── _mixins.scss           # Mixins SCSS
│   ├── _base.scss             # Reset + utilitaires
│   ├── _layout.scss           # Header, footer, breadcrumb
│   ├── _components.scss       # Boutons, cards, badges...
│   └── _pages/                # Styles par page
│       ├── _don.scss
│       ├── _etablissements.scss
│       ├── _carrieres.scss
│       ├── _home.scss
│       ├── _detail.scss
│       ├── _postuler.scss
│       └── _offre-detail.scss
├── js/
│   ├── main.js                # Point d'entrée JS
│   └── modules/               # Modules ES6
│       ├── donation-calculator.js
│       ├── filters-establishments.js
│       ├── filters-jobs.js
│       └── application-form.js
├── css/
│   └── main.css               # CSS compilé
├── index.html                 # Page d'accueil
├── etablissements.html        # Liste des établissements
├── etablissement-detail.html  # Détail établissement
├── don.html                   # Page de don
├── offre-detail.html          # Détail offre d'emploi
├── postuler.html              # Formulaire de candidature
├── carrieres.html             # Page carrières
└── QWEN_GUIDE.md              # Guide de développement
```

## 🛠️ Développement

### Header et footer (inclusion au build)

Le header et le footer ne sont **pas dupliqués** dans les 7 pages HTML. Ils sont définis une seule fois dans `parts/header.html` et `parts/footer.html`. Les pages contiennent les placeholders `<!-- INCLUDE parts/header.html -->` et `<!-- INCLUDE parts/footer.html -->`, remplacés par le plugin Vite (`scripts/vite-plugin-html-include.js`) lors du **serveur de dev** (`npm run dev`) et du **build** (`npm run build`). Pour modifier le header ou le footer, éditer uniquement les fichiers dans `parts/`. Voir `docs/FSE_READINESS.md` pour le contrat FSE.

### Prérequis

- [Sass](https://sass-lang.com/) : `npm install -g sass`
- [Git](https://git-scm.com/)

### Lancer le watch SCSS

```bash
sass --watch scss/main.scss:css/main.css
```

### Ouvrir le projet

Ouvre simplement le dossier dans ton navigateur ou utilise un serveur local :

```bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx serve .
```

Puis visite : `http://localhost:8000/qwen_apogei_v1/`

## 📊 Stats

- **7 pages** refactorisées
- **11 fichiers SCSS** modulaires
- **4 modules JavaScript** ES6
- **-70%** de code (10 500 → 3 200 lignes)
- **-80%** de taille CSS (500 Ko → 100 Ko)

## ✅ Fonctionnalités

### Pages
- ✅ Accueil (`index.html`)
- ✅ Établissements avec filtres + carte Leaflet (`etablissements.html`)
- ✅ Détail établissement (`etablissement-detail.html`)
- ✅ Dons avec calculateur d'impact (`don.html`)
- ✅ Carrières avec filtres d'offres (`carrieres.html`)
- ✅ Détail offre d'emploi (`offre-detail.html`)
- ✅ Formulaire de candidature multi-étapes (`postuler.html`)

### JavaScript
- ✅ Calculateur de don (`donation-calculator.js`)
- ✅ Filtres établissements + Leaflet Maps (`filters-establishments.js`)
- ✅ Filtres offres d'emploi (`filters-jobs.js`)
- ✅ Formulaire de candidature (`application-form.js`)

### Accessibilité
- ✅ Skip-link sur toutes les pages
- ✅ `aria-live` sur les compteurs de résultats
- ✅ Navigation clavier (Tab, Enter, Space)
- ✅ Focus visible systématique
- ✅ `prefers-reduced-motion`

## 📝 Conventions

Voir `QWEN_GUIDE.md` pour :
- Les règles de développement
- L'architecture SCSS
- La structure des modules JS
- Les conventions d'accessibilité

## 🔄 Git Workflow

```bash
# Vérifier le statut
git status

# Ajouter les modifications
git add .

# Commiter
git commit -m "Description des changements"

# Pousser vers le remote (si configuré)
git push origin main
```

---

**Développé avec ❤️ pour Apogei 94**
