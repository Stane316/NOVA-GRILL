# 🍽️ 43 - Données Structurées & Balisage Schema.org (Restaurant)

## 1. Objectif du fichier
Ce document détaille l’implémentation, la syntaxe et la validation du balisage de données structurées de type **JSON-LD Schema.org Restaurant** configuré sur la plateforme Nova Grill afin de fournir directement aux moteurs de recherche des informations intelligentes décryptables instantanément par leurs algorithmes d'intelligence artificielle locale.

---

## 2. Ce que ce fichier va accomplir
En exploitant la structure de ce guide, vous serez capable de :
* Analyser l’architecture sémantique du dictionnaire Schema.org dévolu aux commerces alimentaires.
* Paramétrer les lignes de métriques d'autorité (Coordonnées satellite, devises, menus, horaires).
* Injecter de nouvelles propriétés d’ancrage d'avis clients et d'autorisations de réservations.
* Réaliser une évaluation de conformité stricte avec les outils de validation officiels Google.

---

## 3. Pré-requis
* Votre site de production de Nova Grill doit disposer d'une URL HTTPS définitive accessible publiquement ([`03_domain_configuration.md`](./03_domain_configuration.md)).
* Accéder à l'en-tête `<head>` de votre fichier racine `/index.html` pour apprécier les balises structurées.

---

## 4. Étapes Détaillées

### Étape 4.1 : Étude de la Structure JSON-LD implémentée
Les moteurs de recherche lisent un bloc de données scripturales de format JSON-LD pour extraire, sans marge d'erreur, l'ensemble des données d'utilité publique de Nova Grill. Voici l'architecture scellée au cœur de `/index.html` :
* **`@context` :** Pointeur de dictionnaire de référence réglementaire (`https://schema.org`).
* **`@type` :** Catégorisation métier sélective unifiée : **`Restaurant`** (Cette nomination est extrêmement puissante pour l'indexation de marque par rapport à un vague type générique de type *LocalBusiness*).
* **`image` :** Photo d'autorité affichable en première page des résultats Google.
* **`servesCuisine` :** Catalogue sémantique typant la culture gastronomique proposée à nos hôtes de Calavi :
  `["African", "Grill", "Choukouya", "Cocktails"]`
* **`address` :** Encart d'autorité postale certifié.
* **`geo` (GeoCoordinates) :** Données satellites GPS pour centrer l'itinéraire Maps de l'internaute :
  * Latitude : `6.436109`
  * Longitude : `2.348398`
* **`openingHoursSpecification` :** Plage d'ouverture d'autorité spécifiant la disponibilité du commerce 7 jours sur 7, de 17h00 à 01h00 du matin.

```json
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": "https://restaurant-nova-grill.com",
    "name": "Nova Grill",
    "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800",
    "description": "Restaurant, Bar, Lounge d'exception au carrefour Tankpè, Abomey-Calavi...",
    "url": "https://restaurant-nova-grill.com",
    "telephone": "+2290196135287",
    "priceRange": "$$",
    "servesCuisine": ["African", "Grill", "Choukouya", "Cocktails"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Carrefour Tankpè, à côté de la Poissonnerie Delta",
      "addressLocality": "Abomey-Calavi",
      "addressCountry": "BJ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.436109,
      "longitude": 2.348398
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "opens": "17:00",
      "closes": "01:00"
    }
  }
</script>
```

### Étape 4.2 : Extension Éventuelle : Ajout du Système de Réservation en Ligne
Si vous souhaitez notifier formellement à Google que votre établissement accepte les réservations en direct (ce qui peut faire apparaître un raccourci direct d'action *Réservez une table* directement sur vos résultats de recherche d'autorité) :
1. Repérez l'attribut logique `"acceptsReservations"` au sein du script JSON-LD.
2. Assurez-vous d'avoir affecté la valeur textuelle `"true"`.
3. Vous pouvez également expliciter le lien d'accès menant directement au formulaire d'attente de table :
   `"potentialAction": { "@type": "ReserveAction", "target": "https://restaurant-nova-grill.com/#reservation" }`.

### Étape 4.3 : Évaluation de Conformité Stricte par les Outils Google
Avant de livrer un site internet équipé de données structurées, vous devez obligatoirement valider l'absence totale d'erreur ou d'avertissement de formatage syntaxique de code :
1. Ouvrez votre navigateur et accédez à l'outil officiel Google : [Test des résultats enrichis](https://search.google.com/test/rich-results) (Google Rich Results Test).
2. Choisissez l'onglet **"URL"** et saisissez l'adresse de production HTTPS de Nova Grill (Exemple : `https://restaurant-nova-grill.com/`), ou choisissez l'onglet **"Code"** et copiez-collez l'intégralité du contenu de votre fichier `/index.html` d'évaluation.
3. Cliquez sur le bouton bleu **"Tester le code"** (Test code).
4. L'outil analyse l'ensemble des balises et affiche un panneau de validation vert : **`"1 élément valide détecté : Restaurant"`**. Si des erreurs apparaissent, repérez les virgules manquantes ou les valeurs d'attributs orphelines.

---

## 5. Explications Ultra Pédagogiques
Les robots de recherche sont des programmes de calcul puissants mais aveugles face à la pure poésie d'un design immersif. Pour un robot, lire *"La braise s'éveille à Calavi"* dans une police haut de gamme n'exprime pas clairement s'il s'agit d'un poème ou d'un restaurant de grillades. En insérant un bloc structuré JSON-LD s'insérant dans le dictionnaire standardisé mondial Schema.org, vous traduisez les valeurs de Nova Grill dans la langue natale des ordinateurs. Google sait alors instantanément que vous êtes un établissement de restauration culinaire physique, géolocalisé à Tankpè, actif tous les jours de 17h00 à 01h00, et ouvert aux réservations.

---

## 6. Captures Mentales / Explications Visuelles

Imaginez comment Google structure l'affichage intelligent de votre site internet :

```
[ Code Source JSON-LD ] ── Contient : "servesCuisine": ["Choukouya", "Grill"] et Horaires...
                                           │
                                  (Google extrait la structure)
                                           ▼
                    [ Résultats de Recherche Google Enrichis ]
  ┌────────────────────────────────────────────────────────────────────────┐
  │  NOVA GRILL - Restaurant de Grillades à Abomey-Calavi                  │
  │  Note: ★★★★★ 4.9 - Moyen de prix: $$ - Cuisine : Choukouya, ...        │
  │  Adresse : Carrefour Tankpè, Calavi - Horaires : Ferme bientôt (01h00) │
  └────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Erreurs Fréquentes

### Erreur A : Erreur de syntaxe JSON-LD (La virgule fatale)
* **Symptômes :** Google ignore complètement votre balise de données structurées ou l'outil d'évaluation d'en-tête Google refuse de valider le code.
* **Cause :** Oubli d'une virgule de séparation entre deux lignes de valeurs clés ou présence d'une virgule superflue à la fin de la dernière propriété d'un sous-objet (le format JSON est extrêmement intolérant face aux erreurs d'écriture).

### Erreur B : Coordonnées satellites GPS manquantes ou erronées
* **Symptômes :** Vos fiches d'itinéraires et votre classification sur Maps ne bénéficient d'aucun surcroît d'autorité de référencement.
* **Cause :** Absence ou mauvais formatage de l'objet `"geo"` / GeoCoordinates dans le script d'origine.

---

## 8. Solutions

### Résolution pour l'Erreur A :
1. Utilisez un validateur en ligne ou l'outil d'analyse Google pour localiser la ligne textuelle orpheline responsable de la rupture de structure.
2. Souvenez-vous d'une règle simple : toute ligne clévaleur au sein d'un objet JSON doit se clore par une virgule d'espacement, **sauf** si elle est la dernière ligne physique située juste avant la fermeture de l'accolade `{}`.

### Résolution pour l'Erreur B :
1. Assurez-vous de renseigner proprement les attributs `"latitude"` et `"longitude"` sous des types numériques flottants réels sans guillemets doubles (Exemple : `6.436109` et non `"6.436109"`) pour être correctement interprétés par Google.

---

## 9. Checklist de Validation
- [ ] Le script JSON-LD utilise le type et le modèle d'autorité normé `@type : Restaurant`.
- [ ] Le dictionnaire listé `"servesCuisine"` mentionne fidèlement la culture des grillades et de la braise de Calavi.
- [ ] Les plages de fonctionnement `opens` et `closes` sont alignées sur la réalité commerçante du restaurant.
- [ ] L'adresse postale `address` concorde parfaitement avec la formulation unifiée de la marque.
- [ ] Le script JSON-LD de l'/index.html a été dument testé et a obtenu le feu vert vert du module Google Rich Results Test.
