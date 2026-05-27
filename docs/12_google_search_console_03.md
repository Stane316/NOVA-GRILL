# 🔍 12 - Google Search Console (Partie 3 : Performance & Résolution d'Erreurs)

## 1. Objectif du fichier
Ce manuel technique vous apprend à interpréter les diagnostics de recherche de la Google Search Console, à identifier et corriger les erreurs d'exploration de votre plateforme immersive, et à analyser vos performances de trafic organique pour accroître les réservations de Nova Grill.

---

## 2. Ce que ce fichier va accomplir
En parcourant ce document, vous serez capable de :
* Lire et optimiser le rapport d’**Indexation des pages** de Google.
* Décrypter et résoudre les avertissements techniques les plus fréquents (Erreurs 404, Exclusions canoniques, "Explorée, non indexée").
* Suivre l'évolution de vos indicateurs de croissance (Clics, Impressions, CTR moyen, Position).
* Rédiger des correctifs de référencement ciblés.

---

## 3. Pré-requis
* Avoir indexé votre propriété sur Google Search Console ([`10_google_search_console_01.md`](./10_google_search_console_01.md)).
* Avoir soumis le fichier `sitemap.xml` d'origine ([`11_google_search_console_02.md`](./11_google_search_console_02.md)).
* Le site doit enregistrer ses premières requêtes et visites d'utilisateurs réels (quelques jours de mise en ligne).

---

## 4. Étapes Détaillées

### Étape 4.1 : Analyse du Rapport d'Indexation (Pages)
1. Ouvrez votre console d'administration [Search Console](https://search.google.com/search-console).
2. Dans le menu de gauche, cliquez sur **"Pages"** sous la rubrique **"Indexation"**.
3. Deux compteurs colorés résument l'état de votre site :
   * **Pages indexées (Vert) :** Nombre d'adresses officiellement visibles par les internautes sur le moteur de recherche Google.
   * **Pages non indexées (Gris) :** Adresses découvertes par Googlebot mais écartées volontairement pour des raisons techniques ou d'organisation de contenu.

### Étape 4.2 : Traitement et Résolution des Erreurs Fréquentes d'Analyse
Faites défiler le tableau inférieur intitulé **"Pourquoi les pages ne sont pas indexées"** :

#### Incident A : "Page avec redirection" ou "Exclue en raison d'une balise canonique"
* **Symptômes :** Google liste votre site en version nue `http://...` ou sans `www` dans la catégorie exclue.
* **Résolution :** C'est un comportement parfaitement normal et sain. Puisque vous avez configuré une redirection universelle automatique vers la version d'autorité HTTPS avec `www` ([`03_domain_configuration.md`](./03_domain_configuration.md)), Google écarte sagement les variantes orphelines pour éviter la dilution du référencement. Aucune action n'est requise.

#### Incident B : "Détectée, mais pas actuellement indexée"
* **Symptômes :** Google connaît l'existence de la page mais n'a pas encore planifié son exploration physique par manque de bande passante ou d'autorité.
* **Résolution :** Forcez l'autorité en initiant un partage de lien actif sur des canaux fiables (Ex: fiche Google Business Profile, comptes réseaux sociaux officiels du restaurant) pour inciter Googlebot à accélérer la lecture.

#### Incident C : "Introuvable (404)" ou "Erreur de serveur (5xx)"
* **Symptômes :** Les rapports de Google relèvent des erreurs d'adresses inexistantes.
* **Résolution :** Créez des règles de redirection ou assurez-vous de la restauration globale de votre base de données.

### Étape 4.3 : Lecture de votre Tableau d'Indicateurs de Performance
1. Cliquez sur l'onglet supérieur gauche nommé **"Performances"**.
2. Quatre grandes métriques de pilotage mesurent votre croissance organique :
   * **Nombre total de clics (Bleu) :** Nombre de fois où un utilisateur a cliqué sur votre lien depuis les résultats de recherche d'origine.
   * **Nombre total d'impressions (Violet) :** Nombre de fois où un utilisateur a vu s'afficher le lien de Nova Grill à l'écran lors d'une recherche.
   * **CTR moyen (Vert) :** Taux de clics (Clics / Impressions). Plus ce pourcentage est élevé, plus votre titre et votre description sont incitatifs !
   * **Position moyenne (Orange) :** Votre classement moyen parmi les résultats d'affichage (Exemple : une position de `1.2` sur *"restaurant grillades calavi"* prouve que vous dominez le marché local).

### Étape 4.4 : Identification des Opportunités de Mots-Clés
1. Faites défiler vers le bas pour inspecter le tableau d'onglets de données.
2. Sous l'onglet **"Requêtes"** (Queries), étudiez les expressions textuelles exactes que saisissent vos clients d'Abomey-Calavi pour vous découvrir.
3. Si vous notez qu'une expression de type *"meilleur braise de chèvre calavi"* génère beaucoup d'impressions mais peu de clics, retouchez la description textuelle d'en-tête de votre site pour y faire figurer expressément ces termes clés et capter ce volume de trafic !

---

## 5. Explications Ultra Pédagogiques
La Search Console agit comme le stéthoscope médical de votre site internet. Elle n'indexe pas de manière magique, elle vous montre comment les robots perçoivent vos lignes de code, vos images et l'accessibilité de vos dômes ardents. En résolvant les erreurs d'exploration et en capitalisant sur les termes de recherche qui génèrent le plus de clics locaux, vous construisez une réputation digitale indéboulonnable pour Nova Grill.

---

## 6. Captures Mentales / Explications Visuelles

```
[ Tableau d'Indicateurs de Performance ] :
┌───────────────────────┬───────────────────────┐
│  CLICS : 1.2K (Bleu)  │  IMPRESSIONS: 45K (V)  │  ──> (Suivi de la courbe)
├───────────────────────┼───────────────────────┤
│  CTR MOYEN: 2.6% (Ve) │  POSITION MOYEN: 3.4  │
└───────────────────────┴───────────────────────┘

[ Onglet Requêtes ] ──> "novagrill calavi" : 450 Clics (Leader)
                    ──> "barbecue abomey-calavi" : 120 Clics (À optimiser !)
```

---

## 7. Erreurs Fréquentes

### Erreur A : Cliquer sur "Valider la correction" sans avoir résolu l'incident technique
* **Symptômes :** Google rejette votre demande de validation d'erreur de pages après quelques jours d'attente.
* **Cause :** Vous avez notifié la console de la correction d'une erreur (Ex: une erreur 404) sans avoir réellement créé de redirection de secours.

### Erreur B : Ne voir aucune donnée s'afficher dans l'onglet "Performance"
* **Symptômes :** Les courbes affichent un graphique plat désespérément vide.
* **Cause :** Le projet vient juste d'être validé en ligne. Google a besoin de 24h à 48h de délai de mise en cache système pour commencer à synthétiser et afficher les premières statistiques.

---

## 8. Solutions

### Résolution pour l'Erreur A :
1. N'utilisez le bouton "Valider la correction" qu'après avoir modifié la syntaxe orpheline ou validé la parfaite redirection réseau de l'adresse en erreur.
2. Testez l'URL corrigée avec l'outil d’**Inspection d’URL** en cliquant sur **"Tester l'URL en direct"** pour obtenir le feu vert officiel avant de lancer la validation.

### Résolution pour l'Erreur B :
1. Améliorez le démarrage en diffusant l'adresse d'accès absolue sur les annuaires d'Abomey-Calavi.
2. Patientez 48 heures pour apprécier l'apparition de vos premiers clics et de l'acquisition organique.

---

## 9. Checklist de Validation
- [ ] Le rapport "Pages d'indexation" est analysé et exempt d'erreur critique de type 500 (Server errors).
- [ ] Les exclusions de type canonique sont cataloguées et validées comme saines.
- [ ] Le tableau de bord "Performances" est inspecté de manière hebdomadaire pour cartographier les mots-clés d'acquisition.
- [ ] Les opportunités de croissance de mots-clés issues de Calavi sont réinvesties dans le récit culinaire du restaurant.
- [ ] L'outil d'inspection URL en direct a été testé avec mention favorable.
