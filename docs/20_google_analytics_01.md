# 📊 20 - Google Analytics GA4 (Partie 1 : Création de Propriété & Mesure ID)

## 1. Objectif du fichier
Ce guide détaille pas-à-pas comment initier votre compte **Google Analytics 4 (GA4)**, générer votre jeton d'identification unique (Measurement ID) pour enregistrer et analyser scientifiquement le comportement d'engagement des visiteurs de Nova Grill.

---

## 2. Ce que ce fichier va accomplir
En suivant cette notice, vous allez :
* Créer un compte Google Analytics (ou greffer une propriété sur un compte existant).
* Configurer un flux de données Web calibré pour le site.
* Récupérer votre identifiant de mesure unique `G-XXXXXXXXXX`.
* Comprendre où configurer cet identifiant dans votre pipeline d'intégration (Vercel et local).

---

## 3. Pré-requis
* Détenir un compte de messagerie Google (Gmail ou Google Workspace).
* Avoir déployé le site de Nova Grill à sa destination finale ([`03_domain_configuration.md`](./03_domain_configuration.md)).

---

## 4. Étapes Détaillées

### Étape 4.1 : Inscription et Création de votre Compte Global
1. Ouvrez votre navigateur et accédez à la plateforme d'accueil de [Google Analytics](https://analytics.google.com/).
2. Connectez-vous avec l'adresse mail officielle du restaurant.
3. Cliquez sur le bouton bleu **"Créer un compte"** (Create account).
4. **Nom du compte :** Renseignez le nom de marque **`Nova Grill`**.
5. Cochez l'ensemble des cases de partage de données proposées par Google pour bénéficier du support technique et de l'intelligence artificielle d'ajustement. Cliquez sur **"Suivant"** (Next).

### Étape 4.2 : Paramétrage de la Propriété Web (Property Setup)
Une propriété Analytics représente l'environnement de données de votre application.
1. **Nom de la propriété :** Renseignez **`Nova Grill Production`**.
2. **Fuseau horaire des rapports :** Choisissez **`Bénin`** (GMT+1) ou votre pays d'activité cible afin d'aligner la datation des rapports quotidiens à votre rythme local.
3. **Devise :** Sélectionnez **`Franc CFA Ouest-Africain (XOF)`** ou l'unité monétaire de votre pays.
4. Cliquez sur **"Suivant"**.
5. Renseignez la description de votre entreprise :
   * **Catégorie :** *Alimentation et boissons* (Food & Drink).
   * **Taille :** *Petite entreprise (1 à 10 employés)*.
6. Cliquez sur **"Suivant"** et sélectionnez vos objectifs commerciaux de référence (Sélectionnez *Générer des prospects* - Generate leads, et *Examiner le comportement des utilisateurs* - Examine user behavior).
7. Cliquez sur **"Créer"** et acceptez les conditions générales d'utilisation de Google Analytics.

### Étape 4.3 : Configuration du Flux de Données Web (Data Stream)
1. Dans le panneau de sélection de plateforme, cliquez sur le bouton de sélection **"Web"**.
2. **URL du site :** Saisissez l'adresse canonique absolue HTTPS de votre restaurant (Exemple : `https://www.restaurant-nova-grill.com`).
3. **Nom du flux :** Renseignez **`Flux Web Nova Grill`**.
4. Laissez l'interrupteur **`Mesure améliorée`** (Enhanced Measurement) coché actif (Google va analyser automatiquement les clics sortants, défilements et recherches de manière autonome).
5. Cliquez sur le bouton bleu **"Créer un flux"** (Create stream).

### Étape 4.4 : Extraction de l'ID de Mesure (Measurement ID)
1. Une fois le flux initié, une fenêtre de dialogue d'état s'affiche.
2. Repérez la section intitulée **"ID de mesure"** (Measurement ID) en haut à droite.
3. Copiez le code s'affichant sous le format exact **`G-XXXXXXXXXX`** (Le code commence toujours par un G majuscule).

### Étape 4.5 : Injection du jeton dans votre Configuration
Pour activer le moteur de suivi dynamique, insérez cet identifiant de mesure dans vos variables environnementales :
* **En Local (`.env.local`) :**
  ```env
  VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```
* **Sur Vercel (`Settings > Environment Variables`) :**
  Ajoutez une nouvelle variable portant la clé exacte `VITE_GA_MEASUREMENT_ID` et affectez-lui votre jeton `G-XXXXXXXXXX` ([`02_vercel_deployment.md`](./02_vercel_deployment.md)).

---

## 5. Exceptions Ultra Pédagogiques
L'identifiant de mesure est le code postal d'aiguillage de vos métriques. La plateforme Nova Grill intègre de base un chargeur asynchrone autonome (`/src/lib/analytics.ts`). Si vous ne renseignez aucun jeton (ou conservez la clé de simulation par défaut), le moteur d'écoute se désactive de manière silencieuse sans générer de ralentissement ou d'alerte pour votre internaute. Dès que vous configurez le bon attribut d'environnement, le site se connecte en direct aux serveurs Google à l'ouverture de la page !

---

## 6. Captures Mentales / Explications Visuelles

```
[ Console Google Analytics ] ──── Génère l'ID ────> G-9X8W7V6U5T
                                                           │
                                             (Vous enregistrez la clé)
                                                           ▼
                                            [ Variables Vercel Cloud ]
                                            VITE_GA_MEASUREMENT_ID = G-9X8W7V6U5T
                                                           │
                                                    (Build de prod)
                                                           ▼
[ Client de passage ] ── Ouvre le restaurant ──> [ Script d'écoute actif ! ]
```

---

## 7. Erreurs Fréquentes

### Erreur A : Message indiquant "Aucune donnée reçue" dans Analytics
* **Symptômes :** Google Analytics maintient une bannière d'alerte rouge stipulant que le flux web ne collecte aucune donnée.
* **Cause :** Vous venez d'insérer votre code. Il existe un délai de latence de sécurité chez Google (environ 2 à 12 heures) avant d'activer le reporting.

### Erreur B : Utiliser un identifiant de type Universal Analytics obsolète `UA-XXXXX-X`
* **Symptômes :** Le tracking ne démarre jamais et console du navigateur lève des erreurs.
* **Cause :** Vous essayez d'injecter une ancienne étiquette Google Analytics (discontinuée en 2023).

---

## 8. Solutions

### Résolution pour l'Erreur A :
1. Accédez au site de production, cliquez sur le bouton de réservation, défilez, puis laissez le site ouvert.
2. Allez dans l'onglet **"Rapports > Temps réel"** de Google Analytics pour valider la détection immédiate de votre terminal (Visite enregistrée depuis Abomey-Calavi).

### Résolution pour l'Erreur B :
1. Répétez sagement les étapes de la section 4.
2. Créez impérativement un flux de type **Google Analytics 4 (GA4)** pour obtenir un jeton valide commençant par **`G-`**.

---

## 9. Checklist de Validation
- [ ] Le fuseau horaire de reporting de la propriété cible est calé sur l'heure locale de votre commerce.
- [ ] Le code d'identifiant unique `G-XXXXXXXXXX` a été extrait et copié.
- [ ] L'identifiant est dument configuré dans les variables d'environnement locales et sur Vercel.
- [ ] Une mise en ligne d'évaluation a été déployée pour distribuer l'écouteur à chaud.
- [ ] Les rapports en temps réel ont validé le catalogage de votre propre terminal de navigation.
