# Logo – Note pour l’intégration WordPress (FSE)

Ce document décrit comment permettre à la cliente de changer le logo plus tard dans le thème FSE, et comment autoriser l’usage d’un logo SVG en sécurité.

---

## Changer le logo dans le thème FSE

- Dans le thème FSE, utiliser le bloc **« Logo du site »** (Site Logo) dans la **template part header**.
- La cliente pourra alors sélectionner une image depuis la **Médiathèque** et la définir comme logo du site, sans toucher au code.

---

## Autoriser les SVG en sécurité

WordPress n’autorise pas par défaut l’upload de fichiers SVG (risques de sécurité). Pour utiliser le logo Apogei au format SVG :

1. **Installer un plugin de type Safe SVG** (sanitization à l’upload) : par exemple **Safe SVG** ou équivalent, qui nettoie le fichier SVG à l’upload.
2. **Uploader le logo** (ex. `logo_apogei.svg`) dans la Médiathèque.
3. **Choisir ce média** dans le bloc **Site Logo** du header.

À retenir pour l’implémentation du header dans le thème : bloc Site Logo + option SVG via plugin Safe SVG (ou similaire).

---

*Référence pour l’implémentation du header dans le thème FSE – prototype Apogei 94.*
