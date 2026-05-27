# 🔍 10 - Google Search Console (Partie 1 : Création & Validation DNS)

## 1. Objectif du fichier
Ce guide vous accompagne pas-à-pas dans l'initiation de votre **Google Search Console**, le portail officiel de Google pour superviser, analyser et optimiser la présence organique de l'art culinaire de Nova Grill sur le moteur de recherche Google.

---

## 2. Ce que ce fichier va accomplir
En suivant cette notice, vous allez :
* Découvrir comment créer un compte Search Console de niveau professionnel.
* Déclarer une propriété de type **Domaine** (Solution la plus puissante pour le SEO moderne).
* Récupérer votre clé textuelle unique de signature DNS (TXT).
* L'intégrer chez votre hébergeur d'origine (Registrar) pour prouver à Google que vous êtes l'unique propriétaire légitime de Nova Grill.

---

## 3. Pré-requis
* Disposer d'un compte de messagerie Google (Gmail ou Google Workspace).
* Disposer d'un accès administrateur à votre bureau d'enregistrement DNS ([`03_domain_configuration.md`](./03_domain_configuration.md)).
* Accéder à votre nom de domaine de production définitif (Ex: `restaurant-nova-grill.com`).

---

## 4. Étapes Détaillées

### Étape 4.1 : Création de votre Compte Professionnel
1. Connectez-vous à votre navigateur avec votre compte Gmail d'entreprise d'administration du restaurant.
2. Allez sur le portail d'accueil de la [Google Search Console](https://search.google.com/search-console/about).
3. Cliquez sur le bouton bleu **"Commencer maintenant"** (Start now).

### Étape 4.2 : Sélection de la Méthode d'Enregistrement de Propriété
Un panneau d'accueil vous propose deux options de déclaration de site :
* **Option A : "Domaine" (Domain Property) - Recommandé et traité dans ce guide.**
  * *Pourquoi ?* Cette option indexera automatiquement TOUS les sous-domaines (`www.restaurant-nova-grill.com`, `restaurant-nova-grill.com`, etc.) ainsi que les protocoles `http` et `https`.
* **Option B : "Préfixe de l'URL".**
  * Moins puissante, car elle requiert de créer autant de propriétés que de variantes d'adresses.

1. Saisissez votre adresse de domaine nu dans la colonne de gauche sous le titre **"Domaine"** (Exemple : `restaurant-nova-grill.com` sans `https://` ni `www`).
2. Cliquez sur **"Continuer"**.

### Étape 4.3 : Récupération de l'Enregistrement de Validation DNS
1. Google affiche une boîte de dialogue nommée **"Valider la propriété du domaine via un enregistrement DNS"**.
2. Copiez la clé de validation unique fournie dans le champ d'entrée de saisie. Elle commence généralement par `google-site-verification=...`.

### Étape 4.4 : Injection de l'Enregistrement TXT chez votre Hébergeur (Registrar)
1. Ouvrez un nouvel onglet et connectez-vous à votre registrar (Hostinger, OVH, LWS...).
2. Rendez-vous dans le panneau d'administration de votre **Zone DNS**.
3. Cliquez sur le bouton d'ajout d'une nouvelle ligne réseau : **"Add New Record"**.
4. Configurez-la avec les valeurs exactes suivantes :
   * **Type d'enregistrement :** `TXT`
   * **Hôte/Host/Sous-domaine :** `@` ou laissez ce champ vide.
   * **Valeur/Valeur TXT/Destination :** Collez la clé copiée précédemment (`google-site-verification=...`).
   * **TTL :** Laissez par défaut ou positionnez sur `3600` secondes.
5. Cliquez sur **"Sauvegarder"** ou **"Enregistrer"**.

### Étape 4.5 : Confirmation de l'Autorité dans la Google Search Console
1. Retournez sur l'onglet de votre Google Search Console d'origine.
2. Cliquez sur le bouton d'évaluation de couleur grise : **"Valider"** (Verify).
3. Google va interroger instantanément les serveurs DNS de votre adresse pour authentifier l'enregistrement TXT.
4. Dès la découverte de l'enregistrement, un panneau vert triomphal s'ouvre : **"La propriété a été validée !"**.

---

## 5. Explications Ultra Pédagogiques
La validation par clé secrète TXT est la preuve de confiance absolue de l'Internet mondial. Puisque seul l'administrateur système de la marque Nova Grill détient les identifiants d'accès chez le bureau d'enregistrement DNS, Google utilise cette méthode pour s'assurer que vous êtes bien le propriétaire exclusif du restaurant et que vous seul avez le privilège d'analyser les flux de mots-clés d'accès et d'orienter l'indexation.

---

## 6. Captures Mentales / Explications Visuelles

```
[ Google Search Console ] ── Génère la clé TXT secret ──> google-site-verification=XYZ
                                                                  │
                                                       (Vous copiez-collez la clé)
                                                                  ▼
                                                      [ Bureau d'Enregristrement DNS ]
                                                      Type : TXT | Valeur : google-site-verify...
                                                                  │
                                                        (Google interroge la zone)
                                                                  ▼
[ Google Search Console ] <── Valide l'autorité ! ───── [ Serveurs DNS Publics ]
```

---

## 7. Erreurs Fréquentes

### Erreur A : Message "La validation a échoué" à l'appui du bouton de Google
* **Symptômes :** Google Search Console affiche une boîte rouge indiquant qu'aucun enregistrement d'identification n'a été découvert.
* **Cause :** L'enregistrement TXT a été mal recopié ou la propagation du protocole DNS n'a pas encore fini d'irradier le réseau.

### Erreur B : Injection du code dans un mauvais champ d'édition chez le registrar
* **Symptômes :** Le bureau d'enregistrement refuse d'enregistrer la ligne DNS.
* **Cause :** Vous avez essayé d'ajouter la clé dans un enregistrement de type `CNAME` ou `A` au lieu d'un enregistrement exclusif de type `TXT`.

---

## 8. Solutions

### Résolution pour l'Erreur A :
1. Ne paniquez pas. Les modifications apportées sur la zone DNS globale peuvent réclamer quelques instants pour se répercuter sur les serveurs d'interrogation de Google (généralement 1 à 10 minutes).
2. Patientez 5 minutes et appuyez à nouveau sur le bouton de validation. Si l'erreur subsiste, assurez-vous de ne pas avoir de guillemets doubles accidentels au début ou à la fin du texte de validation de Google.

### Résolution pour l'Erreur B :
1. Supprimez l'enregistrement erroné.
2. Créez bien une nouvelle ligne en précisant le type exact **`TXT`** (et non un autre type d'aiguilleur) dans le sélecteur proposé par votre bureau d'enregistrement.

---

## 9. Checklist de Validation
- [ ] Le domaine racine `restaurant-nova-grill.com` a été saisi sans en-tête d'adresse protocolaire inutile.
- [ ] La clé secrète de type `google-site-verification` a été copiée sans caractère orphelin.
- [ ] Une ligne DNS exclusive de type `TXT` est opérationnelle chez votre hébergeur.
- [ ] Le panneau vert de validation victorieuse a été affiché et validé par Google.
- [ ] Vous avez accès pleinement au tableau de bord Search Console de Nova Grill.
