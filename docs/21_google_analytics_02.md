# 📊 21 - Google Analytics GA4 (Partie 2 : Analyse de Trafic & Conversions)

## 1. Objectif du fichier
Ce guide d'exploitation vous apprend à décrypter les tableaux de bord stratégiques de Google Analytics 4, à suivre l'acquisition d'audience locale et à mesurer scientifiquement les conversions opérationnelles de Nova Grill (clics WhatsApp et prises de réservations).

---

## 2. Ce que ce fichier va accomplir
En suivant cette notice, vous allez :
* Apprivoiser l'ergonomie globale des rapports GA4.
* Analyser l'origine de votre clientèle locale (Rapports d'acquisition géographique).
* Évaluer la performance du système de conversion immersif (Suivi des événements personnalisés).
* Distinguer les indicateurs clés de saine rétention (Taux d'engagement, durée moyenne).

---

## 3. Pré-requis
* Avoir implémenté et validé l'identifiant de mesure GA4 de production ([`20_google_analytics_01.md`](./20_google_analytics_01.md)).
* Votre application doit enregistrer des sessions réelles depuis plusieurs jours.

---

## 4. Étapes Détaillées

### Étape 4.1 : Lecture de la Console "Temps Réel" (Real-time Report)
Le rapport en temps réel montre l'activité en cours sur votre site de restaurant au cours des 30 dernières minutes.
1. Connectez-vous sur [Google Analytics](https://analytics.google.com/).
2. Dans la barre de navigation latérale de gauche, cliquez sur **"Rapports"** (Reports), puis sélectionnez **"Tems réel"** (Real-time).
3. Une carte interactive s'anime : vous pouvez visualiser d'où se connectent vos visiteurs d'Abomey-Calavi, de Cotonou ou d'ailleurs, quelles sections ils lisent, et si des réservations tombent en direct !

### Étape 4.2 : Suivi de la Performance Géographique et de l'Origine des Clients
Pour savoir d'où vient l'essentiel de votre trafic :
1. Dans le menu de gauche de l'onglet rapports, dépliez la section **"Utilisateur"** (User) > **"Attributs utilisateur"** (User attributes) > **"Détails sur la zone géographique"** (Tech details / Demographics).
2. Classez les données par **"Pays"** puis par **"Ville"** (City).
3. Cela vous permet d'évaluer le taux de pénétration de la marque : une forte représentation de connexions issues d'Abomey-Calavi valide l'efficacité de vos actions locales.

### Étape 4.3 : Évaluation des Conversions Opérationnelles (Custom Events)
L'application intègre nativement des traceurs d'événements exclusifs dans son code source pour piloter vos conversions :
1. Dans l'onglet rapports, accédez à **"Engagement"** > **"Événements"** (Events).
2. Une table synthétique liste le volume total d'apparition des comportements d'intérêts :
   * **`click_whatsapp_floating` :** Un internaute a cliqué sur le bouton flottant vert pour engager un dialogue direct avec l'équipe commerciale sur WhatsApp.
   * **`submit_reservation` :** Un client a rempli et envoyé le formulaire d'enclave pour privatiser une table à la date souhaitée.
   * **`page_view` :** volume condensé de consultations globales de l'aventure immersive.

```
┌─────────────────────────────────────────────────────────────┐
│             Tableau des Événements GA4 (Exemple)            │
├─────────────────────────────────────────────────────────────┤
│ • click_whatsapp_floating │ Catégorie : Conversion │ OK     │
│ • submit_reservation      │ Catégorie : Conversion │ OK     │
└─────────────────────────────────────────────────────────────┘
```

### Étape 4.4 : Surveillance du Taux d'Engagement vs. Taux de Rebond
GA4 met l'accent sur la qualité de l'attention des visiteurs.
1. Allez dans **"Engagement"** > **"Aperçu"** (Engagement overview).
2. Étudiez la valeur moyenne de la métrique **"Taux d'engagement"** (Engagement rate).
3. Un taux élevé (supérieur à 60% pour notre design immersif de restaurant) démontre que les utilisateurs ne quittent pas immédiatement après l'arrivée, mais prolongent l'exploration au milieu des animations cinématiques pour lire la carte.

---

## 5. Explications Ultra Pédagogiques
Mesurer des clics génériques est inutile. Pour un restaurant premium comme Nova Grill, seule la conversion transactionnelle prime : savoir si un visiteur s'est transformé en client attablé devant un dôme ardent. En capturant finement chaque clic sur la ligne d'information WhatsApp ou chaque envoi de formulaire de table de grillades, GA4 chiffre avec précision la valeur économique générée par votre présence numérique.

---

## 6. Captures Mentales / Explications Visuelles

```
           [ Un Internaute consulte Nova Grill ]
                            │
              (Il clique sur "WhatsApp Live")
                            │
                            ▼
        [ Code Source React de l'Application ]
  trackGAEvent("click_whatsapp_floating", "Conversion", ...)
                            │
                            ▼
           [ Tableau de Pilotage Google GA4 ]
  ┌─────────────────────────────────────────────────┐
  │ Événement : click_whatsapp_floating              │
  │ Volume : +150 conversions cette semaine !       │
  └─────────────────────────────────────────────────┘
```

---

## 7. Erreurs Fréquentes

### Erreur A : Ne comptabiliser aucune conversion sur l'événement `submit_reservation`
* **Symptômes :** Les événements standards remontent bien mais l'événement personnalisé de réservation reste absent de la table après plusieurs jours.
* **Cause :** Les utilisateurs locaux privilégient le contact direct par téléphone ou WhatsApp, ignorant le formulaire statique.

### Erreur B : Confusion entre clics réels et clics répétés (Double counting)
* **Symptômes :** Volumétrie d'événements anormalement élevée par rapport au nombre d'utilisateurs uniques réels.
* **Cause :** Un même internaute a cliqué plusieurs fois de suite par impatience sur le bouton flottant au cours de la même session.

---

## 8. Solutions

### Résolution pour l'Erreur A :
1. Dynamisez l'attrait esthétique de votre section de réservation en l'agrémentant d'un encart poétique.
2. Ajoutez un incitatif textuel (Ex: *"Réservez via ce formulaire pour bénéficier d'une boisson d'accueil offerte consécutivement"*).

### Résolution pour l'Erreur B :
1. Dans les analyses de rapports, triez vos graphiques non pas par "Nombre d'événements" mais par **"Nombre total de conversions"** ou en configurant la métrique "Utilisateurs actifs" (Active Users) ayant accompli l'action.

---

## 9. Checklist de Validation
- [ ] Le panneau en temps réel est capable de tracer les connexions actives sans erreur.
- [ ] Les rapports d'acquisition révèlent la zone géographique de l'audience locale.
- [ ] L'événement personnalisé d'enclin au clic `click_whatsapp_floating` est correctement enregistré par GA4.
- [ ] L'événement personnalisé d'engagement de réservation `submit_reservation` est actif dans les rapports.
- [ ] Le taux d'engagement global est suivi et audité de manière mensuelle pour raffiner la narration immersive du site.
