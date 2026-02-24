# 📤 GUIDE DE DÉPLOIEMENT - Apogei 94

## ✅ Méthode Recommandée : FTP + Vite

### Pourquoi cette méthode ?

- ✅ **Fiable** : Fonctionne à tous les coups
- ✅ **Simple** : Pas de configuration SSH complexe
- ✅ **Rapide** : Vite bundle tout en un seul fichier
- ✅ **Propre** : Uniquement les fichiers nécessaires sur le serveur

---

## 🚀 PROCÉDURE DE DÉPLOIEMENT

### Étape 1 : Build local

```bash
# Dans ton terminal (PowerShell)
cd c:\Users\pc\Desktop\tests_perso\qwen_apogei_v1
npm run build
```

**Résultat attendu :**
```
✓ built in XXXms
dist/
├── index.html
├── etablissements.html
├── carrieres.html
└── assets/
    ├── main-*.css
    └── main-*.js
```

---

### Étape 2 : Upload via FileZilla

#### 2.1 Connexion

1. **Ouvre FileZilla**
2. **Connecte-toi** :
   - **Hôte** : `ftp.evapogei.fr`
   - **Identifiant** : `prototypes@evapogei.fr`
   - **Mot de passe** : `***`
   - **Port** : `21`

#### 2.2 Navigation

**Côté distant (serveur) :**
```
/www/prototypes/qwen_apogei_v1/
```

**Côté local (ton PC) :**
```
c:/Users/pc/Desktop/tests_perso/qwen_apogei_v1/dist/
```

#### 2.3 Transfert

1. **Sélectionne TOUS les fichiers** dans `dist/` (côté local)
2. **Glisse-dépose** vers `/www/prototypes/qwen_apogei_v1/` (côté distant)
3. **Attends** la fin du transfert

---

### Étape 3 : Vérification

**Teste ton site :**
```
https://prototypes.evapogei.fr/qwen_apogei_v1/
```

**Vérifie chaque page :**
- ✅ [ ] index.html
- ✅ [ ] etablissements.html (filtres + carte)
- ✅ [ ] carrieres.html (filtres offres)
- ✅ [ ] don.html (calculateur)
- ✅ [ ] postuler.html (formulaire)

**Si problème :**
- `Ctrl + F5` pour vider le cache
- Vérifie la console (F12) pour erreurs

---

## 📋 CHECKLIST DE DÉPLOIEMENT

### Fichiers à uploader (depuis `dist/`) :

```
✅ index.html
✅ etablissements.html
✅ etablissement-detail.html
✅ don.html
✅ offre-detail.html
✅ postuler.html
✅ carrieres.html
✅ assets/ (dossier complet)
```

### Fichiers à NE PAS uploader :

```
❌ scss/
❌ js/
❌ css/
❌ node_modules/
❌ package.json
❌ vite.config.js
❌ .git/
❌ .gitignore
```

---

## 🔄 DÉPLOIEMENTS ULTÉRIEURS

### À chaque modification :

```bash
# 1. Build
npm run build

# 2. Upload via FileZilla
# FileZilla va détecter les fichiers modifiés
# et ne transférer que les changements
```

**Avantage de Vite :**
- Les fichiers ont des **hashs uniques** (`main-BSlOOlGz.js`)
- Seuls les fichiers modifiés sont transférés
- **Cache navigateur** automatiquement géré

---

## 🛠️ COMMANDES UTILES

```bash
# Développement local
npm run dev          # Serveur de dev (localhost:3000)

# Build production
npm run build        # Crée le dossier dist/

# Preview locale du build
npm run preview      # Teste le build en local
```

---

## 🐛 PROBLÈMES FRÉQUENTS

### 1. "404 Not Found" après déploiement

**Cause** : Mauvais chemin de déploiement

**Solution** :
```
Vérifie que tu es dans :
/www/prototypes/qwen_apogei_v1/

Et PAS dans :
/www/prototypes/
```

### 2. "CSS ne charge pas"

**Cause** : Fichiers assets/ mal uploadés

**Solution** :
```
1. Vérifie que assets/ existe sur le serveur
2. Vérifie les permissions (644 pour les fichiers)
3. Vide le cache (Ctrl + F5)
```

### 3. "Filtres ne fonctionnent pas"

**Cause** : JS bundle pas chargé

**Solution** :
```
1. Ouvre la console (F12)
2. Vérifie les erreurs 404
3. Vérifie que main-*.js existe dans assets/
```

---

## 📊 STRUCTURE FINALE SUR LE SERVEUR

```
/www/prototypes/
└── qwen_apogei_v1/              ← Dossier principal
    ├── index.html
    ├── etablissements.html
    ├── etablissement-detail.html
    ├── don.html
    ├── offre-detail.html
    ├── postuler.html
    ├── carrieres.html
    └── assets/
        ├── main-BSlOOlGz.css    ← CSS optimisé
        └── main-D4KsYIKJ.js     ← JS bundle (tous modules)
```

---

## 🎯 SCRIPT AUTOMATIQUE

Pour automatiser, utilise le script :

```bash
# Windows (PowerShell ou CMD)
deploy-infomaniak.bat
```

**Le script va :**
1. ✅ Lancer `npm run build`
2. ✅ Afficher les instructions de déploiement
3. ✅ Lister les fichiers à uploader

---

## 📞 SUPPORT

**En cas de problème :**

1. **Vérifie les logs de build** :
   ```bash
   npm run build --debug
   ```

2. **Vérifie la console navigateur** (F12) :
   - Erreurs 404
   - Problèmes CORS
   - Modules JS non chargés

3. **Vérifie FileZilla** :
   - Tous les fichiers sont transférés
   - Pas d'erreurs de transfert
   - Permissions correctes (644)

---

**Dernière mise à jour :** Février 2026  
**Version :** 1.0.0 (Vite build)
