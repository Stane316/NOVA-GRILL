# 📋 80 - Feuille de Route d’Homologation & Grand Lancement (Launch Checklist)

## 1. Objectif du fichier
Ce guide technique terminal rassemble l’ensemble des contrôles d’homologation, des validations d'assurance qualité et des opérations administratives indispensables à mener avec rigueur avant de livrer officiellement la machine digitale de Nova Grill au client de marque.

---

## 2. Ce que ce fichier va accomplir
En vous appuyant sur cette liste de contrôle d'élite (Launch Checklist), vous allez :
* Auditer de façon exhaustive la compatibilité multi-supports (Responsive design).
* Valider la conformité des protocoles de sécurité, de visibilité et d'indexation SEO.
* Consigner la saine propagation des systèmes d'écoute de trafic (Google Analytics, Search Console).
* Homologuer le tunnel de conversion des réservations (Formulaires, WhatsApp Live).
* Lancer la production d’art numérique en toute sérénité.

---

## 3. Pré-requis
* L'application web officielle Nova Grill doit être déployée sur Vercel et reliée à son domaine d'autorité ([`03_domain_configuration.md`](./03_domain_configuration.md)).
* Disposer de la totalité des accès d’administration requis sur les tableaux de bord d'analyses.

---

## 4. Étapes Détaillées

### Étape 4.1 : Phase d’Homologation Visuelle & Responsiveness (La terrasse tactile)
Effectuez une exploration croisée du site sur vos terminaux d'évaluation (iOs, Android, Firefox, Chrome, Edge) :
- [ ] **Défilement horizontal :** Glisser le pouce de bas en haut ne génère aucun roulis horizontal suspect de gauche à droite (`overflow-x` verrouillé).
- [ ] **Les Zones de Contacts tactiles :** L’ensemble des boutons de navigation supérieure, du formulaire et du dôme flottant WhatsApp s’activent d'un clic franc sans forcer à plisser les yeux.
- [ ] **L’Autoplay de la vidéo d'accueil :** La vidéo d’arrière-plan cinématique s'autolance sans délai ni blocage sur Safari Mobile et Android Chrome en mode d’économie d’énergie.

### Étape 4.2 : Phase d'Audit et Validation SEO Industrielle (Visibilité accrue)
Vérifiez l’existence physique et le formatage sémantique de vos balises d'autorité d'en-tête :
- [ ] **Les Métadonnées primaires :** Le titre de marque et la description incitative de 155 caractères sont présents et conformes dans l'en-tête HTML de la landing page.
- [ ] **La Balise Canonique :** L’ancre cible unifiée HTTPS est solidement dument déclarée pour écarter les incidents de duplicate content.
- [ ] **Robots et Sitemap.xml :** Les fichiers d'exploration et d'arborescence sont lisibles et indexés à la racine publique de votre domaine principal.
- [ ] **Données structurées JSON-LD :** Le script de données structurées exclusive de type `Restaurant` a décroché sa certification d'en-tête verte sous le test officiel des résultats enrichis de Google.

### Étape 4.3 : Phase d’Activation des Cabines d'Écoutes & Télémétries
Configurez les flux de télécommunications de données à chaud :
- [ ] **Google Search Console :** L'autorité d'accès DNS par clé TXT a été validée dument et le plan de site `sitemap.xml` est consigné sans erreur technique de lecture.
- [ ] **Google Analytics 4 :** L'ID unique de mesure de production `VITE_GA_MEASUREMENT_ID` est paramétré à chaud dans vos variables d'environnement Vercel et enregistre le monitoring en temps réel.
- [ ] **Avis et Réputation Google Business Profile :** La fiche d'établissement d'Abomey-Calavi est certifiée, localise précisément la terrasse festive, s'équipe de photos premium et affiche un code QR de collecte d'avis 5 étoiles.

---

## 5. Explications Ultra Pédagogiques
La veille de la livraison d'une plateforme d'envergure, le stress de l'ingénieur est un risque technique. Exécuter un protocole d'homologation formalisé permet d'éliminer toute approximation ou oubli de configuration d'en-tête (clés oubliées, balises canoniques de tests orphelines, etc.). En cochant l'un après l'autre ces verrous de protection, vous garantissez la livraison impeccable d'une machine de conversion d’élite, prête pour le grand public.

---

## 6. Captures Mentales / Explications Visuelles

```
           [ Lancement Officiel du Site de Nova Grill ]
                                │
              (Déroule la checklist d’Homologation)
                                │
   - Étape 1 : Visuels mobiles impeccables   ──> [ Validé ]
   - Étape 2 : Balises SEO & Canoniques      ──> [ Validé ]
   - Étape 3 : Télémétries & GA4 actives     ──> [ Validé ]
   - Étape 4 : Conversion de réservations    ──> [ Validé ]
                                │
                                ▼
         [ Lancement en Production Grand Public 100% Serein ]
```

---

## 7. Erreurs Fréquentes

### Erreur A : Déployer le site avec des clés d'API (API Keys) de développement temporaires
* **Symptômes :** Les uploads d'images ne fonctionnent plus ou le site retourne des erreurs après la coupure de vos serveurs locaux de tests.
* **Cause :** Les variables environnementales de production sur Vercel n'ont pas été mises à jour avec les véritables identifiants de production Supabase de la marque.

### Erreur B : Ne réaliser aucun test réel d'envoi de formulaire de réservation avant la mise en service
* **Symptômes :** Colère du client restaurant constatant que les réservations tombent dans le vide sans être relayées par les services d'administrations de la console d'accueil.
* **Cause :** Omettre de valider la cinématique d'écriture et de sérialisation base de données PostgreSQL de bout en bout.

---

## 8. Solutions

### Résolution pour l'Erreur A :
1. Avant tout lancement officiel, allez sur votre console de données Supabase de destination et récupérez vos clés de production definitives.
2. Écrasez sans ménagement vos clés d'environnement locales de tests au sein de l'onglet Vercel et forcez une compilation finale.

### Résolution pour l'Erreur B :
1. Accédez au site internet de Nova Grill en production comme un simple visiteur.
2. Formulez une fausse demande de réservation de table (Ex: Nom: *"Test Homologation"*, Terrasse, 4 personnes).
3. Connectez-vous sur votre tableau de bord de gestion d'en-tête de restaurant (Admin console) de Nova Grill et validez que la demande de réservation figure fiablement dans l'onglet des requêtes actives journalières.

---

## 9. Checklist de Validation
- [ ] L'affichage esthétique est d'un raffinement impeccable sur tous les smartphones, tablettes et ordinateurs testés.
- [ ] L'autorité et les balises d'indexation SEO guident fiablement les robots d'exploration.
- [ ] Le tracking en temps réel de Google Analytics GA4 est dument validé.
- [ ] Le plan sitemap a été transmis officiellement à la Google Search Console.
- [ ] Le processus d'enclave de réservation et le dialogue instantané via le bouton WhatsApp fonctionnent de manière chirurgicale.
- [ ] Le grand portail d'administration de Nova Grill est sécurisé, authentifié, et livré au propriétaire du restaurant en classe d'excellence !
