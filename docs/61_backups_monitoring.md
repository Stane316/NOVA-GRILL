# 📈 61 - Supervision Technique, Backups & Continuité de Service

## 1. Objectif du fichier
Ce guide technique détaille l’ensemble des dispositifs de surveillance applicative (Monitoring), de sauvegarde automatisée (Backups) et de diagnostic d’anomalies déployés sur Nova Grill pour garantir une disponibilité supérieure à 99.9% de la plateforme commerciale du restaurant.

---

## 2. Ce que ce fichier va accomplir
En suivant cette documentation industrielle d’exploitation, vous allez :
* Découvrir comment configurer une cellule de surveillance de disponibilité gratuite (Uptime Monitoring).
* Planifier et vérifier les sauvegardes de sécurité quotidiennes de votre base PostgreSQL d'accès.
* Analyser les rapports d'erreurs en production à l'aide de solutions d'écoute (comme Sentry ou Vercel Analytics).
* Structurer un plan de continuité d'activité (PCA) en cas d'interruption réseau à Calavi.

---

## 3. Pré-requis
* Votre site de production Nova Grill doit être en ligne et validé ([`02_vercel_deployment.md`](./02_vercel_deployment.md)).
* Disposer d'un droit d'administration sur votre console de données [Supabase](https://supabase.com).

---

## 4. Étapes Détaillées

### Étape 4.1 : Planification des Sauvegardes de Base de Données (Supabase Backups)
Une panne d'origine humaine ou une erreur de manipulation de la carte du restaurant par l'administrateur de Nova Grill peut corrompre ou effacer vos données. Supabase orchestre des politiques de sauvegardes résistantes :
1. **Les Sauvegardes Physiques Automatisées quotidiennes :** Supabase réalise de base une sauvegarde complète journalière (Daily Backup) hautement compressée de votre base de données SQL. Ces clichés d'état sont conservés à des emplacements d'archives isolés géographiquement.
2. **Pour les projets d'envergure professionnels (Point-in-Time Recovery - PITR) :** Vous pouvez opter pour l'activation du module PITR de Supabase, permettant de rembobiner l'intégralité de l'état de la base de données à la seconde près en cas de sinistre.
3. **Exportation Manuelle Préventive de Sauvegarde (Le bouton de secours) :** Avant d'apporter une mise à jour d'importance ou de modifier le schéma des tables :
   * Accédez à votre console d'administration de projet Supabase d'origine.
   * Allez sur **"Database > Backups"**.
   * Cliquez sur le bouton d'action d'extraction : **"Download Backup"** pour enregistrer une copie de sécurité au format `.sql` localement sur votre poste de travail d'ingénieur.

### Étape 4.2 : Surveillance de Disponibilité Instantanée de Site (UptimeRobot Setup)
Pour être alerté par mail ou SMS en moins de 60 secondes si le site web de Nova Grill venait à devenir instable :
1. Ouvrez votre navigateur et inscrivez-vous sur le portail d'Uptime gratuit [UptimeRobot](https://uptimerobot.com/).
2. Sur votre tableau de bord, cliquez sur le bouton vert d'ajout : **"Add New Monitor"**.
3. Configurez les sélecteurs du formulaire technique :
   * **Monitor Type :** Choisissez **`HTTPS`** (La solution standard de contrôle réseau).
   * **Friendly Name :** Renseignez **`Production Nova Grill`**.
   * **URL (or IP) :** Indiquez votre adresse de marque absolue de production : `https://www.restaurant-nova-grill.com`.
   * **Monitoring Interval :** Ajustez le curseur temporel sur la cadence recommandée de **`5 minutes`** (UptimeRobot va interroger le site toutes les 5 minutes pour valider le code d'état HTTP 200).
4. Cochez votre adresse mail d'entreprise d'administration de restaurant sous l'option d'alertes rapides : **"Select Alert Contacts to Notify"**.
5. Cliquez sur **"Create Monitor"**.

### Étape 4.3 : Diagnostic de Plantages & Exception d'Écrans (Vercel Logs & Sentry)
Pour remonter les erreurs d'affichage ou les pannes inopinées des smartphones de vos visiteurs de Calavi :
1. **Les Journaux Système en direct d'origine de Vercel (Runtime Logs) :** Accédez à votre console projet sur Vercel, cliquez sur l'onglet supérieur **"Logs"**. Ce moniteur affiche en direct toutes les interrogations réseau et les plantages d'exécution s'exécutant sur votre plateforme.
2. **L'Intégration d'un Écouteur d'Exceptions (Sentry) :** Pour les marques d'envergure qui soignent chaque détail, vous pouvez installer le SDK de Sentry au cœur du code de votre application. Sentry compile de façon anonyme toutes les erreurs javascript physiques subies par vos internautes et vous transmet un rapport d'évaluation technique du terminal concerné pour vous aider à y remédier rapidement.

---

## 5. Explications Ultra Pédagogiques
La survie commerciale d’un restaurant premium dépend de la lisibilité constante de ses services. Si un prospect veut planifier un anniversaire ou un séminaire d'affaires à Nova Grill et trouve un site inaccessible ou cassé sans que l'équipe technique n'en soit informée, il réserve sagement chez un concurrent. Mettre sous surveillance électronique le serveur d’hébergement avec UptimeRobot et assurer des sauvegardes PostgreSQL quotidiennes protège de façon durable le chiffre d'affaires numérique de l'établissement.

---

## 6. Captures Mentales / Explications Visuelles

```
                  [ Moniteur d'Évalution UptimeRobot ]
                                   │
              (Ping toutes les 5 min sur novagrill)
                                   │
                ┌──────────────────┴──────────────────┐
                ▼                                     ▼
      [ Réponse Code 200 OK ]               [ Réponse Code 500 Erreur ]
                │                                     │
    (Tout va bien : Statut Vert)           (Alerte SMTP / SMS Immédiat !)
                                                      │
                                                      ▼
                                           [ Équipe Technique alertée ]
                                        Restaure la sauvegarde en 5 minutes !
```

---

## 7. Erreurs Fréquentes

### Erreur A : Être alerté de faux-positifs continuels par le moniteur de supervision
* **Symptômes :** Vous recevez des dizaines d'alertes d'indisponibilité par jour alors que le site de Nova Grill s'ouvre normalement sur votre ordinateur.
* **Cause :** L'adresse ur de destination à surveiller ou l'interval de ping configuré est instable, ou le serveur de Vercel subit des temps de mise en sommeil transitoires.

### Erreur B : Ne réaliser aucune sauvegarde de secours avant de modifier les clés du projet
* **Symptômes :** Perte irrémédiable de l'historique d'acquisition ou écrasement incontrôlable de la table des mets créés par l'administrateur.
* **Cause :** Exécuter des scripts d'éditions SQL directement en production sur Supabase sans extraction de sauvegarde locale préalable.

---

## 8. Solutions

### Résolution pour l'Erreur A :
1. Assurez-vous que l'URL d'évaluation paramétrée dans UptimeRobot utilise l'indication d'autorité en HTTPS sécurisé complet (Exemple : `https://www.restaurant-nova-grill.com`) et non sa version brute sans sécurité.
2. Positionnez l'intervalle de ping sur un rythme temporel standard de de **`5` ou `10` minutes** afin de lisser les variations mineures et d'éviter les faux signaux d'urgences d'alerte.

### Résolution pour l'Erreur B :
1. Prenez le réflexe de la sécurité. Avant toute manipulation d'importance de la structure SQL, téléchargez sagement le cliché d'origine au format `.sql` consigné dans `Database > Backups` de Supabase.
2. En cas de sinistre, vous n'aurez qu'à copier-coller cette feuille d'écriture SQL au sein de votre éditeur de requêtes (SQL Editor) Supabase pour restaurer l'intégralité de la configuration culinaire en moins de 3 minutes !

---

## 9. Checklist de Validation
- [ ] Les mécanismes de sauvegardes d'origine de Supabase sont opérationnels et validés quotidiennement.
- [ ] Un clone SQL manuel de secours a été téléchargé et validé sur le poste informatique de l'ingénieur en chef.
- [ ] Le site de production de Nova Grill est placé sous la surveillance active d'UptimeRobot HTTPS.
- [ ] L'adresse mail d'administration du restaurant est configurée pour recevoir les alertes immédiates en cas de coupure.
- [ ] Les rapports applicatifs de Vercel sont audités de façon périodique pour déceler et corriger les anomalies mineures.
