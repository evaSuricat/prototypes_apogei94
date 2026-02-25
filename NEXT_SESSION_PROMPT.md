# 🚀 PROMPT POUR NOUVELLE SESSION

**Copie-colle ce prompt au début de ta prochaine session avec Qwen Code :**

---

```markdown
# CONTEXTE PROJET - Apogei 94 Refonte

## 📋 RÉSUMÉ RAPIDE

**Projet :** Refonte site Apogei 94 (HTML/CSS/JS → Vite build)  
**Repo :** https://github.com/evaSuricat/prototypes_apogei94  
**Prod :** https://prototypes.evapogei.fr/qwen_apogei_v1/  
**Hébergement :** Infomaniak (PHP, PAS Node.js)

## 🎯 OBJECTIF DE CETTE SESSION

[INSÈRE TON OBJECTIF ICI : ex. "Créer la page À propos"]

## 📁 FICHIERS À OUVRIR

**Obligatoire :**
- `NOTES.md` (mémoire du projet)
- [Fichiers spécifiques à ta tâche]

**Structure :**
```
qwen_apogei_v1/
├── scss/
│   ├── _tokens.scss
│   ├── _mixins.scss
│   ├── _base.scss
│   ├── _layout.scss
│   ├── _components.scss
│   └── _pages/
│       ├── _home.scss
│       ├── _don.scss
│       ├── _etablissements.scss
│       ├── _carrieres.scss
│       └── [NOUVEAU]
├── js/
│   ├── main.js
│   └── modules/
│       ├── donation-calculator.js
│       ├── filters-establishments.js
│       ├── filters-jobs.js
│       └── application-form.js
├── dist/ (build output - EXCLU de Git)
├── *.html (7 pages existantes)
├── package.json
├── vite.config.js
└── NOTES.md (CE FICHIER)
```

## 🔧 WORKFLOW À SUIVRE

```bash
# 1. Build (compile SCSS + Vite)
npm run build
# → Équivaut à : npm run build:css && vite build

# 2. Preview local
npm run preview
# → http://localhost:4173/
# OU Live Server : dist/index.html → Live Server

# 3. Deploy
# FileZilla → dist/ → /www/prototypes/qwen_apogei_v1/

# 4. Commit
git add .
git commit -m "Message"
git push origin main
```

## ⚠️ CONTRAINTES IMPORTANTES

1. **QWEN_GUIDE.md** : À respecter strictement
   - ❌ Aucun renommage de classes existantes
   - ❌ Aucune suppression de commentaires
   - ✅ Classes BEM en PLUS des existantes

2. **Hébergement** : Infomaniak = PHP (PAS Node.js)
   - ✅ Build local obligatoire
   - ✅ Deploy via FTP (FileZilla)

3. **Git** : Code source uniquement
   - ❌ dist/ exclu (dans .gitignore)
   - ✅ scss/, js/, html inclus

## 📞 RESSOURCES

- **Design System :** `scss/_tokens.scss`
- **Règles dev :** `QWEN_GUIDE.md`
- **Déploiement :** `DEPLOY.md`
- **Mémoire projet :** `NOTES.md`

## 🎯 POUR COMMENCER

1. Lis `NOTES.md` (section "CONTEXTE RAPIDE")
2. Ouvre les fichiers pertinents pour la tâche
3. Dis-moi : "On commence [FEATURE]"

---

**Merci de garder ce contexte en tête pour toute la session !**
```

---

## 📝 INSTRUCTIONS POUR TOI

### **AVANT de fermer cette session :**

1. **Commit tes changements :**
   ```bash
   git add .
   git commit -m "Session 2 - Build CSS fix"
   git push origin main
   ```

2. **Vérifie que NOTES.md est à jour :**
   - ✅ OUI (je viens de le faire)

3. **Ferme les fichiers ouverts** (sauf NOTES.md)

---

### **POUR LA PROCHAINE SESSION :**

1. **Ouvre VS Code**
   ```
   File → Open Folder → qwen_apogei_v1/
   ```

2. **Ouvre NOTES.md en premier**
   ```
   → Lis "CONTEXTE RAPIDE" (2 min)
   → Lis "Session du 21 Février 2026 (SESSION 2)" (1 min)
   ```

3. **Copie-colle le prompt ci-dessus** dans la nouvelle conversation

4. **Remplis l'objectif :**
   ```markdown
   ## 🎯 OBJECTIF DE CETTE SESSION
   
   Créer la page "À propos" avec :
   - Histoire de l'asso
   - Équipe
   - Chiffres clés
   ```

5. **Ouvre les fichiers pertinents** selon la tâche

---

## ✅ CHECKLIST DE FERMETURE

- [ ] NOTES.md est à jour ✅
- [ ] Git commit + push fait
- [ ] Fichiers inutiles fermés
- [ ] Prompt pour prochaine session copié
- [ ] Prêt à fermer cette conversation

---

**À la prochaine session !** 🚀
