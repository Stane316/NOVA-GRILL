# 🚀 02 - Déploiement Cloud en Production sur Vercel

## 1. Objectif du fichier
Ce guide explique de manière chirurgicale comment déployer votre application Nova Grill sur **Vercel**, la plateforme cloud leader pour le développement et l'hébergement rapide d'applications d'envergure. Nous couvrirons tout le cycle, du raccordement Git jusqu'à la compilation optimisée en production.

---

## 2. Ce que ce fichier va accomplir
En suivant ce manuel, vous allez :
* Créer et configurer un compte professionnel Vercel.
* Raccorder de manière sécurisée votre dépôt GitHub contenant le code source.
* Injecter les variables d'environnement confidentielles (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, etc.).
* Automatiser le pipeline CI/CD pour que chaque mise à jour sur votre branche `main` déclenche instantanément une nouvelle mise en ligne.
* Résoudre tout incident lié au processus de compilation.

---

## 3. Pré-requis
* Votre code d'origine doit être hébergé sur un dépôt Git (GitHub, GitLab ou Bitbucket).
* Disposer de vos clés publiques d'API Supabase de production.
* Avoir installé vos dépendances et validé le build en local (`npm run build` réussi).

---

## 4. Étapes Détaillées

### Étape 4.1 : Inscription et Connexion sur Vercel
1. Ouvrez votre navigateur et accédez à [Vercel](https://vercel.com).
2. Cliquez sur le bouton **"Sign Up"** (Inscription) en haut à droite.
3. Choisissez l'option d'authentification **"Continue with GitHub"** (Recommandé). Cela associera directement vos deux comptes et facilitera l'importation de vos dépôts.
4. Suivez les étapes de validation de sécurité par double facteur (2FA) si activé sur GitHub.

### Étape 4.2 : Importation du Projet Nova Grill
1. Sur le tableau de bord principal de Vercel (Dashboard), cliquez sur le bouton bleu **"Add New..."** en haut à droite, puis sélectionnez **"Project"**.
2. Une liste de vos dépôts GitHub s'affiche. Si votre dépôt n'apparaît pas, tapez `restaurant-nova-grill` ou validez l'accès de l'application Vercel à votre organisation GitHub via le bouton d'autorisation.
3. Cliquez sur le bouton bleu **"Import"** en regard de votre dépôt.

### Étape 4.3 : Configuration du Build et des Commandes de Production
Vercel va détecter automatiquement que le projet utilise la configuration de compilation de type Vite.
Validez bien les réglages par défaut suivants :
* **Framework Preset :** Vite ou Other (Laissez la détection automatique s'exécuter)
* **Root Directory :** `./` (Racine de votre workspace)
* **Build Command :** `npm run build`
* **Output Directory :** `dist`
* **Install Command :** `npm install`

### Étape 4.4 : Injection des Variables d'Environnement Clés (Crucial !)
Avant d'appuyer sur le bouton de livraison finale, vous devez déclarer vos clés d'accès de production Supabase :
1. Déroulez la section nommée **"Environment Variables"**.
2. Ajoutez les couples de variables confidentiels suivants :
   * **Clé 1 :** 
     * **Nom :** `VITE_SUPABASE_URL`
     * **Valeur :** Votre URL d'instance API Rest (Exemple : `https://xyzabc.supabase.co`)
   * **Clé 2 :**
     * **Nom :** `VITE_SUPABASE_ANON_KEY`
     * **Valeur :** Votre clé d'API anonyme (Exemple : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   * **Clé 3 (Facultative pour Analytics) :**
     * **Nom :** `VITE_GA_MEASUREMENT_ID`
     * **Valeur :** Votre ID de mesure GA4 d'origine (Exemple : `G-XXXXXXXXXX`)

3. Cliquez sur le bouton vert **"Deploy"**.

---

## 5. Explications Ultra Pédagogiques
Vercel fonctionne sur le concept d'architecture **Serverless** et de **CDN mondial répliqué**. 
Lors de chaque clic sur "Deploy" ou de chaque modification poussée par Git (`git push`), un serveur de compilation éco-responsable (Build Sandbox) s'active pour installer vos packages, transformer vos fichiers TypeScript en fichiers JavaScript ultra-optimisés, appliquer la minification de code CSS et enregistrer ces livrables statiques sur des dizaines de centres de données répartis à travers le monde. Cela garantit un affichage instantané pour vos visiteurs, y compris sur les smartphones connectés en réseau cellulaire local à Abomey-Calavi.

---

## 6. Captures Mentales / Explications Visuelles

Imaginez le processus de déploiement comme une chaîne d'assemblage automatisée :

```
[ Dépôt local Git ] ──(git push)──> [ GitHub (Source d'origine) ]
                                                    │
                                            (Signal webhook)
                                                    ▼
                                            [ Vercel Cloud ]
                                    • Sandbox Node.js s'instancie
                                    • Télécharge les dépendances (npm install)
                                    • Compile et minifie les fichiers (Vite)
                                    • Injecte les variables d'environnement
                                                    │
                                                    ▼
                                    [ CDN Planétaire Sécurisé HTTPS ]
                                    (Le site est en ligne en ~45s !)
```

---

## 7. Erreurs Fréquentes

### Erreur A : Échec d'exécution de `tsc` ou `vite build` à la compilation
* **Symptômes :** Vercel affiche une alerte rouge "Build Failed" ou "Command returned exit code 1".
* **Cause :** Des erreurs strictes d'écriture de types TypeScript ou des avertissements d'imports non spécifiés bloquent le compilation en mode de production stricte.

### Erreur B : Plantage de chargement ("Supabase URL is required")
* **Symptômes :** Le site s'ouvre sur une page blanche ou sur l'état de simulation au lieu des vraies données de production.
* **Cause :** Mauvaise orthographe ou omission des variables d'environnement à l'étape 4.4.

---

## 8. Solutions

### Résolution pour l'Erreur A :
1. Exécutez localement la commande `npm run build` ou `npx tsc --noEmit` pour localiser le fichier et la ligne exacte causant le conflit.
2. Rectifiez le typage problématique ou l'import orphelin, validez le build local, puis poussez à nouveau le correctif vers GitHub.

### Résolution pour l'Erreur B :
1. Sur l'interface Vercel, allez sur votre projet, cliquez sur l'onglet **"Settings"** (Paramètres), puis sur **"Environment Variables"** dans le menu latéral.
2. Vérifiez la conformité parfaite de l'écriture en majuscules (pas d'espace blanc avant ou après les clés) pour les variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.
3. Lancez un déploiement manuel de la branche pour re-compiler avec les bonnes clés d'API (Allez sur **"Deployments"** > **"Redeploy"**).

---

## 9. Checklist de Validation
- [ ] Le compte Vercel est dument activé et authentifié avec GitHub.
- [ ] Le pipeline d'automatisation CI/CD s'exécute sans erreur lors de chaque validation Git.
- [ ] Les clés publiques `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` sont injectées.
- [ ] Le site présente un certificat de chiffrement d'origine vert et sécurisé HTTPS.
- [ ] Un test de bout en bout d'affichage des spécialités extraites de Supabase est concluant.
