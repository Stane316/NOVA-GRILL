# 🚀 13 - Production Deployment Guide (Vercel)

## 1. Objectif du fichier
Ce guide détaille pas-à-pas la procédure de déploiement d’origine en production du site Nova Grill. Nous ciblons la plateforme d'hébergement performante **Vercel** pour connecter à chaud votre dépôt Git, compiler les livrables statiques optimisés, et mettre le portail en ligne avec un certificat SSL sécurisé gratuit.

---

## 2. Pré-requis
* Détenir un compte sur [GitHub.com](https://github.com) ou une autre plateforme d'hébergement de dépôt Git.
* Ouvrir ou associer un compte sur [Vercel.com](https://vercel.com) (connexion via votre compte GitHub recommandée).
* Avoir validé l'intégralité du fonctionnement local et de l'authentification.

---

## 3. Publication Initiale des Sources vers GitHub

Pour que Vercel puisse automatiser la re-compilation à chaque modification, vous devez lier votre dossier local à un dépôt Git distant :

1. Initiez un dépôt Git local s'il n'est pas déjà configuré :
   ```bash
   git init
   git add .
   git commit -m "feat: initial release immersive premium Nova Grill"
   ```
2. Créez un nouveau dépôt vide privé ou public sur l'interface GitHub.
3. Liez votre dossier au serveur GitHub d'origine et envoyez les fichiers :
   ```bash
   git remote add origin https://github.com/votre-compte/restaurant-nova-grill.git
   git branch -M main
   git push -u origin main
   ```

---

## 4. Connexion du Projet sur l'Interface Vercel

1. Rendez-vous sur votre console d’accueil **Vercel Dashboard**.
2. Cliquez sur le bouton bleu **"Add New..."** puis choisissez **"Project"**.
3. Importez votre dépôt fraîchement poussé depuis la liste de suggestions de repositories (**"Import Git Repository"**).

### 4.1. Configuration des paramètres de compilation Vercel

Vercel configure par défaut intelligemment les paramètres de compilation de type Vite. Validez simplement ces réglages :

```
┌─────────────────────────────────────────────────────────────┐
│                 Vercel Build Configurations                 │
├─────────────────────────────────────────────────────────────┤
│  • Framework Preset: Other (ou let Vite auto-detect)        │
│  • Build Command   : npm run build                          │
│  • Output Directory: dist                                    │
│  • Install Command : npm install                            │
└─────────────────────────────────────────────────────────────┘
```

### 4.2. Saisie des Variables d'Environnement de Production (Crucial !)
Déroulez l'onglet caché nommé **"Environment Variables"** pour enregistrer vos clés d'accès de production Supabase configurées à l'étape [`03_environment_variables.md`](./03_environment_variables.md) :

* **Clé 1 :**
  Name : `VITE_SUPABASE_URL`  
  Value : `https://[votre-id-projet].supabase.co`
* **Clé 2 :**
  Name : `VITE_SUPABASE_ANON_KEY`  
  Value : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

4. Cliquez enfin sur le bouton vert **"Deploy"**.

Vercel va provisionner un conteneur cloud de compilation, installer l'arbre de paquets npm locaux, exécuter le script de build statique d'optimisation de Vite, et générer les fichiers statiques de production. Cette opération dure environ **35 à 60 secondes**.

Une fois le livrable déployé, Vercel affiche de fabuleux feux d'artifice à l'écran et vous attribue une adresse d'accès publique de type `https://nom-du-projet.vercel.app` sécurisée sous protocole HTTPS.

---

## 5. Résolution d'Erreurs de Compilation Fréquentes (Build Failures)

### Erreur A : Échec d'exécution de `tsc --noEmit` à la compilation (Linter Error)
* **Symptôme :** Le build crash sur Vercel à cause d'un avertissement ou d'une erreur de type TypeScript non résolue localement.
* **Résolution :** L'arbre de types du projet Nova Grill est entièrement sain. Néanmoins, si vous avez ajouté de nouvelles variables ou apporté des modifications manuelles qui violent le typage strict, résolvez ces alertes localement en exécutant à la main `npm run lint` ou `npx tsc --noEmit` sur votre terminal système avant de repousser vers GitHub.

### Erreur B : Oubli de déclaration des variables sur Vercel
* **Symptôme :** Le site s'affiche mais charge les données de simulation au lieu des vraies données Supabase.
* **Résolution :** Rendez-vous dans les options du projet de votre console Vercel, allez dans **"Settings"** > **"Environment Variables"**, ajoutez vos variables valides, puis relancez un déploiement manuel (**"Redeploy"**) de la branche principale afin d'intégrer à chaud les bonnes clés API.

---

## 6. Checklist de Validation Finale de Déploiement
* [ ] Le dépôt Git de production est raccordé de manière fonctionnelle à Vercel.
* [ ] Le processus de compilation complète aboutit à uploader un dossier `/dist` valide.
* [ ] Vos clés secrètes d'environnement REST s'affichent correctement configurées sur Vercel.
* [ ] L'inspecteur web ne retourne aucun échec réseau lors des appels réseau HTTPS de production.
