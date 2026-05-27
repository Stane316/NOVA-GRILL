# 📦 01 - Project Setup & Local Initialization

## 1. Objectif du fichier
Ce guide explique comment cloner le projet, installer l'ensemble des dépendances système de la stack React + Vite, démarrer le serveur de développement local et valider que l'environnement est prêt.

---

## 2. Pré-requis
* Être en possession des sources du projet Nova Grill.
* Installer **Node.js** (v18+) et **npm** (v9+) sur votre machine locale.
* Connaître les commandes de base d'un terminal Unix/Powershell.

---

## 3. Étapes Détaillées d'Installation

### Étape 3.1 : Clonage ou extraction des sources
Décompressez l'archive du projet ou clonez le dépôt Git dans votre répertoire de travail local :
```bash
cd /votre/espace/developpeurs
# ou git clone <url-du-depot> restaurant-nova-grill
cd restaurant-nova-grill
```

### Étape 3.2 : Installation des dépendances npm
Exécutez la commande d'installation pour télécharger et lier l'arbre de dépendances (React 18, Tailwind CSS v4, Motion, Lucide Icon, etc.) :
```bash
npm install
```

> ⚠️ **Note système :** Ne forcez pas avec `--legacy-peer-deps` sauf en cas d'incompatibilité majeure détectée avec de vieux paquets. L'arbre de dépendances actuel est validé et exempt de conflits.

### Étape 3.3 : Démarrage du serveur de développement local
Pour lancer le serveur de développement à chaud (HMR configuré par défaut hors environnements sandboxés d'édition) :
```bash
npm run dev
```

Par défaut, le serveur de développement démarre :
* Sur l'adresse : `http://localhost:3000` ou `http://localhost:5173` selon le fichier de configuration de l'infrastructure locale.
* Dans le conteneur sandbox AI Studio, le port système externe de routage est obligatoirement le port `3000`.

---

## 4. Commandes Exactes à Retenir

| Action | Commande | Description |
| :--- | :--- | :--- |
| **Installer** | `npm install` | Résout et installe toutes les dépendances définies dans `package.json`. |
| **Dev** | `npm run dev` | Lance le serveur local avec rechargement automatique à chaud. |
| **Lint** | `npm run lint` | Exécute la vérification typée TypeScript globale via le compilateur `tsc --noEmit`. |
| **Build** | `npm run build` | Compile le site en fichiers statiques minimisés optimisés dans `/dist`. |

---

## 5. Explications Détaillées de la Structure Locale
Après installation, l'arbre d'exécution principal ressemble à ceci :
* `/src` : Répertoire contenant l'intégralité du code applicatif.
  * `/src/main.tsx` : Point d'entrée principal qui monte l'application React dans le DOM HTML.
  * `/src/App.tsx` : Composant racine gérant le routage réactif entre le site public et la console d'administration.
  * `/src/index.css` : Chargement des variables de thème CSS globales (Tailwind v4) et des polices.
  * `/src/components` : Contient l'ensemble des modules autonomes de l'interface (Hero, Story, Specialties...).
  * `/src/lib/context` : SiteContext pour le chargement unifié de la configuration et des vidéos.

---

## 6. Erreurs Possibles & Diagnostics

### Erreur A : `vite : commande introuvable` ou `cross-env: command not found`
* **Cause :** Les dépendances globales ou de développement internes n'ont pas fini de s'installer ou le dossier `node_modules` est manquant.
* **Résolution :** Supprimez le dossier caché temporaire et relancez une installation complète.
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Erreur B : Résolution de port occupée (Port 3000 déjà utilisé)
* **Cause :** Un autre service (par exemple une autre instance locale ou un serveur Docker) écoute déjà sur le port de démarrage d'entrée.
* **Résolution :** Libérez le port ou modifiez le port client dans `vite.config.ts`, ou exécutez la commande d'allocation libre automatique de port alternative de Vite :
  ```bash
  npm run dev -- --port 3002
  ```

---

## 7. Checklist Finale de Validation
Avant de passer à l'étape suivante, cochez impérativement les critères suivants :
* [ ] Le répertoire `node_modules` est généré avec succès.
* [ ] La commande `npm run lint` s'exécute sans aucune erreur de typage ou de syntaxe.
* [ ] Le serveur local démarre et vous pouvez afficher la landing page immersive en ouvrant l'adresse locale indiquée dans votre navigateur.
