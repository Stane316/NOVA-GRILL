# ⚡ 50 - Optimisation de la Performance & Fluidité d'Expérience

## 1. Objectif du fichier
Ce guide technique synthétise les pratiques d’optimisation des performances d’envergure déployées sur la plateforme Nova Grill pour maintenir une fluidité d’affichage à 60 images par seconde (FPS) consécutivement lors de l'exploration de notre aventure cinématique.

---

## 2. Ce que ce fichier va accomplir
En vous appropriant ces concepts de génie logiciel, vous allez :
* Optimiser les animations d’état complexes orchestrées par les moteurs de rendu.
* Configurer et pré-calculer les requêtes multimédias lourdes (Images WebP de haute fidélité, vidéos légères).
* Orchestrer la mise en sommeil sélective des sections narratives non visibles à l'écran (Lazy loading).
* Réduire l'empreinte carbone et thermique de votre application pour préserver les batteries des smartphones de vos visiteurs à Calavi.

---

## 3. Pré-requis
* Votre code d'origine doit utiliser un framework d'animation réactif fluide (comme Motion ou GSAP).
* Avoir accès aux dossiers `/src/components` et `/src/index.css`.

---

## 4. Étapes Détaillées

### Étape 4.1 : Domination des Rendu d'Animations via l'Accélération Matérielle (GPU)
Animer des propriétés css classiques de type `width`, `height`, `top` ou `left` force le navigateur à recalculer l'intégralité du design à chaque image, ce qui sature le microprocesseur central (CPU).
1. Pour écarter ce goulot d'étranglement, privilégiez toujours l'usage exclusif de propriétés animables d'accélération matérielle : **`transform`** (composantes `translateX`, `translateY`, `rotate`, `scale`) et **`opacity`**.
2. **La propriété de rendu `will-change` (À manipuler avec une sagesse absolue) :** Sur l'écran géant d'accueil cinématique de Nova Grill, l'arrière-plan interactif intègre de subtils mouvements de particules ou d'images. Appliquer la directive `will-change: transform, opacity;` dans vos classes css de composants mobiles force la puce graphique (GPU) à réserver de la mémoire vidéo, décongestionnant le calcul.

### Étape 4.2 : Traitement d'Art en Compression d'Images (La Révolution WebP)
Héberger des photos brutes de type `.png` ou `.jpg` issues d'un boîtier pro charge des fichiers de 5 à 15 Mo sur le téléphone de vos convives d'Abomey-Calavi, ce qui bloque le chargement et détruit le référencement.
1. Avant tout versement dans l'espace de stockage de la marque (Storage ou dossier local), convertissez systématiquement vos photos au format universel compressé de nouvelle génération **`.webp`**.
2. Utilisez un logiciel graphique ou un utilitaire en ligne gratuit pour positionner la qualité de compression sur un ratio d'excellence de **`80%`**. La perte esthétique visuelle est stérile pour l'œil humain, mais elle divise la taille globale du fichier d'origine par dix !
3. Ne dépassez jamais la barre supérieure de de **`500 Ko`** par illustration, d'autant que la majorité des conteneurs d'images n'ont pas de besoin de dépasser les dimensions limites horizontales de `1920` pixels.

### Étape 4.3 : Automatisation de la Diffusion Vidéo d’Arrière-plan (Background Video)
Le dôme de feu d'accueil charge une vidéo immersive en arrière-plan. Pour empêcher un temps de latence de page blanche :
1. Limitez la durée physique de la vidéo à une boucle courte saine de de **`10` à `15` secondes** maximum.
2. Compressez la piste vidéo avec le codec d'autorité **HEVC / H.265** ou **AV1** (taille finale idéale inférieure à **`5 Mo`**).
3. configurez l'élément balise HTML avec les attributs sélectifs de fluidité d'expérience suivants :
   `<video playsInline autoPlay muted loop preload="auto" src="..." />`.
   * *La mention `muted` est impérative d'autant que sans elle, la quasi-totalité des navigateurs modernes (Chrome, Safari) suspendent l'autolancement de la vidéo pour protéger l'utilisateur d'un son indésirable.*

---

## 5. Explications Ultra Pédagogiques
La performance technique est le berceau de l'émotion esthétique. Aucune direction artistique, aussi premium soit-elle, ne survivra à un site qui bégaye ou s'affiche après 10 secondes d'attente sur le smartphone d'un client impatient situé au carrefour Tankpè. En isolant les calculs graphiques dans la puce de traitement vidéo (GPU), en compressant à chaud les images et en forçant l'autolancement fluide des vidéos, la marque Nova Grill s'anime de façon naturelle et cinématographique à chaque mouvement de défilement.

---

## 6. Captures Mentales / Explications Visuelles

Imaginez comment le navigateur traite vos animations :

```
[ Mauvaise Pratique CPU ] (Bégaiement graphique) :
Animer : height du composant (De 100px à 500px)
Action : CPU recalcule à chaud la hauteur, repousse le footer, recrée le design de la landing page.
FPS moyen : ~15 images par seconde (Saccade).

[ Bonne Pratique GPU ] (Fluidité d'horlogerie) :
Animer : transform translateY du composant (De 0 à 100px)
Action : GPU déplace le composant sur sa propre feuille de calcul sans toucher au reste de la page.
FPS moyen : ~60 images par seconde (Parfaite fluidité !).
```

---

## 7. Erreurs Fréquentes

### Erreur A : Verser des images d'origine brutes de type `.jpg` dans le Bucket Admin
* **Symptômes :** Ralentissement dramatique lors du premier chargement de la terrasse et de la galerie, perte de points de performance.
* **Cause :** L'administrateur verse des photos brutes sortant de l'appareil de 8 Mo.

### Erreur B : Ne pas activer l'attribut de boucle `loop` ou `playsInline` sur la vidéo d'accueil
* **Symptômes :** La vidéo s'immobilise après une lecture ou s'ouvre sur un lecteur noir plein écran indésirable sur les iPhones (iOS).
* **Cause :** Oubli de l'étiquette indispensable de conformité mobile `playsInline`.

---

## 8. Solutions

### Résolution pour l'Erreur A :
1. Intégrez une protection d’évaluation de poids d'origine dans la console d'administration de Nova Grill.
2. Formez l'administrateur du restaurant à l’utilisation d’un outil de compression d'images avant l'upload.

### Résolution pour l'Erreur B :
1. Inspectez le fichier du composant `/src/components/Hero.tsx`.
2. Assurez-vous d'avoir inséré l'ensemble des balises de conformité multimédia mobile :
   `<video playsInline autoPlay muted loop ... />`.

---

## 9. Checklist de Validation
- [ ] Les animations critiques d'ouverture de page s'exécutent sur les propriétés de types `transform` ou `opacity`.
- [ ] L'ensemble des clichés photographiques de la terrasse et du dôme sont de format compressé `.webp`.
- [ ] Aucune ressource image de premier plan ne surpasse le poids cible de 500 Ko.
- [ ] La vidéo d'arrière-plan d'accueil est compressée sous le seuil technique de 5 Mo et embarque l'attribut `playsInline`.
- [ ] L'application conserve une fluidité d'affichage stable lors de l'exploration sous l'outil de simulation d'un smartphone.
