# ⚡ 12 - Performance & Animation Optimization

## 1. Objectif du fichier
Ce guide détaille les stratégies de performance appliquées sur l'application Web Nova Grill pour assurer un temps de chargement éclair, un score d'affichage supérieur sur mobile, et des animations cinématiques fluides s'exécutant à 60 ou 120 images par seconde (Frames Per Second) sans ralentissement (jank).

---

## 2. Pré-requis
* Être à l'aise avec les concepts fondamentaux de performance Web (First Contentful Paint, Cumulative Layout Shift, Largest Contentful Paint).
* Comprendre le fonctionnement de la librairie d'animation `motion` (`motion/react`).

---

## 3. Optimisation et fluidité des Animations

Pour éviter de surcharger le processeur graphique (GPU) des téléphones portables et conserver des glissements à la précision chirurgicale, les principes suivants sont implémentés :

### 3.1. Favoriser les propriétés matérielles accélérées
Dans l'ensemble de nos composants interactifs, les animations n'altèrent jamais des propriétés géométriques lourdes à recalculer par le moteur de rendu du navigateur (ex: `width`, `height`, `margin`, `top`, `left`).
* **Règle absolue :** Nous animons uniquement les attributs de transformation 2D accélérés et d'opacité :
  * `scale` (échelle de calque)
  * `rotate` (angles de rotation)
  * `translate` / `x` / `y` (déplacement de perspective)
  * `opacity` (affichage de fondu enchaîné)

```tsx
// Exemple d'un composant de transition cinématique ultra-performant (motion)
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
/>
```

### 3.2. Suspension des calculs en arrière-plan (Inactive Tab throttling)
L'application suspend automatiquement l'exécution des boucles d'animation intensives et des flux vidéo quand l'utilisateur change d'onglet ou réduit sa fenêtre. Cela empêche la surchauffe thermique inutile des batteries des terminaux mobiles.

---

## 4. Latence réseau et Lazy Loading (Chargement à la Demande)

### 4.1. Images réactives et attributs d'affichage
Pour éliminer les déformations de mise en page intempestives pendant le chargement (Cumulative Layout Shift - CLS) :
* Toutes les images de la grille possèdent des ratios d'aspect fixes prédéterminés par Tailwind CSS (`aspect-square`, `aspect-[16/10]`).
* Le navigateur réserve ainsi exactement l'espace requis à l'écran en pixels avant même que le fichier média physique de l'image ne soit téléchargé, stabilisant totalement le défilement.
* L'attribut `loading="lazy"` est positionné sur les clichés du bas de page pour repousser leur téléchargement jusqu'à ce que le visiteur s'en approche au défilement.

### 4.2. Flux vidéo différé et attribut `preload="none"` ou `preload="metadata"`
Les balises `<video>` utilisées sur le site client (hormis le fond cinématique Hero du sommet) n'écrivent pas d'appel réseau complet de streaming au lancement d'origine :
* Elles utilisent l'attribut `preload="metadata"` pour interroger uniquement la durée et les dimensions de la vidéo.
* La lecture automatique (`autoplay`) est cantonnée à un flux de basse précision sans son (`muted loop playsInline`) pour contourner les blocages de gestion d'énergie des batteries Android/iOS.

---

## 5. Performance Réseau sur les Périphériques Mobiles

À l'aide du chargement unifié de données hybride de `SiteContext.tsx`, l'application utilise une mise en cache temporaire des données textuelles. En cas d'affaiblissement complet de la couverture 3G/4G au carrefour Tankpè, le site conserve son ergonomie car les structures de base textuelles restent exploitables sans générer d'erreurs de scripts JavaScript visibles.

---

## 6. Diagnostics Utiles avec Chrome DevTools

Pour mesurer et valider l'impact de ces techniques :
1. Ouvrez l'inspecteur de développement Chrome (**Chrome DevTools** - Touche `F12` sur Windows/Linux).
2. Rendez-vous dans l'onglet **"Lighthouse"**.
3. Cochez le mode de navigation **"Mobile"** et relancez le test d'audit global.
4. Pour surveiller les saccades de défilement cinématique, allez dans l'onglet de performances graphiques complémentaire de Chrome et cochez l'option **"FPS Meter"** afin d'afficher à l'écran la fréquence de rafraîchissement matérielle réelle en hz.

---

## 7. Checklist d'Évaluation de Fin d'Étape
* [ ] La landing page obtient un score de performance d'au moins `85+` sur le test d'audit mobile Google PageSpeed Insights.
* [ ] Les images de la galerie n'entraînent aucun décalage de structure (Cumulative Layout Shift égal à `0` ou proche).
* [ ] Le défilement au doigt sur smartphone s'exécute de manière ultra-fluide sans aucun ralentissement ou décalage.
* [ ] Les vidéos se lancent d'elles-mêmes sans bloquer le rendu général de l'affichage.
