# 🖥️ 08 - Administration Console Guide

## 1. Objectif du fichier
Ce guide décrit l'architecture visuelle et le code logique du panneau de contrôle d'administration du gérant, comment y accéder de manière protégée sous double garde routière, et comment orchestrer les rafraîchissements dynamiques.

---

## 2. Pré-requis
* Être connecté au site local ou de production.
* Disposer d'un profil administrateur enregistré sur Supabase ([`06_authentication.md`](./06_authentication.md)).

---

## 3. Accéder à l'Interface d'Administration

Pour protéger le panneau d'administration des tentatives de repérage et de dictionnaire automatique, il n'existe pas de lien textuel direct visible dans le footer public.

1. Pour y accéder, ouvrez votre navigateur et modifiez l'adresse de navigation en ajoutant l'un ou l'autre de ces suffixes d'ancres de routage à chaud :
   * **URL de redirection directe :** `https://votre-site.com/#/login`
   * **Alternative :** `https://votre-site.com/login`
2. Saisissez vos identifiants d'administration (Email & Mot de passe).
3. Cliquez sur **"Accéder au Sanctuaire"**.

Une fois authentifié, l'ancre se réoriente instantanément sur le panneau sécurisé interne : `#/admin`, et vous accédez au tableau de bord.

---

## 4. Double Garde de Routage (Garde Route)

Le chargement et l'affichage de l'administration sont protégés dans le contrôleur principal de l'application (`/src/App.tsx`) par deux garde-fous consécutifs :

```tsx
// Extrait de protection de la console dans App.tsx
useEffect(() => {
  if (currentRoute === "admin" && !session) {
    // Si l'utilisateur tente de charger l'administration sans session
    // Il est instantanément éjecté et redirigé vers l'interface de connexion
    window.location.hash = "#/login";
    setCurrentRoute("login");
  }
}, [currentRoute, session]);
```

1. **Garde d'État Client :** Si un utilisateur force l'ancre `#/admin` dans la barre d'adresse de son navigateur sans détenir de jeton `session` stocké en mémoire de session volatile, le routeur l'éjecte vers `/login`.
2. **Garde d'API de Production (RLS) :** Même si un hacker arrivait par ruse à modifier l'état JavaScript de son navigateur local pour afficher artificiellement les boutons du dashboard, toute action de sauvegarde ou de suppression sur le serveur Supabase serait bloquée par PostgreSQL avec une erreur `401 Unauthorized` ou `403 Forbidden`car le jeton d'authentification valide est absent des en-têtes réseau HTTP.

---

## 5. Description de l'Interface d'Administration

Le tableau de bord est organisé en onglets de pilotage interactifs :

### Section 1 : Configuration Générale (Settings)
* **Champs de contrôle :** Titre Hero (landing), Sous-titre cinématique, Numéro de téléphone direct WhatsApp, Adresse exacte de Calavi, et horaires d'ouverture.
* **Compteurs Réseaux Sociaux :** Synchronisez manuellement le compteur d'abonnés de votre TikTok dans l'interface pour l'afficher sur la landing page.

### Section 2 : Édition du Média Hero d'Arrière-Plan
* Permet de téléverser une vidéo d'arrière-plan de 10-15 secondes au format `.mp4` qui tournera en boucle cinématique en haut du site client, ainsi qu'une image de transition (Poster) pour les connexions lentes.

### Section 3 : Galerie & Cartes de Présentation (Gallery Items)
* **Création d'élément :** Ajoutez des images prises en cuisine ou d'événements de mixologie, spécifiez le titre créatif à afficher au survol, et définissez l'indicateur d'échelle d'affichage responsive (`aspect-square`, `aspect-[16/10]`, `aspect-[3/4]`).
* **Supression :** Supprimez instantanément un cliché obsolète de la grille d'un simple clic sur le bouton de suppression.

### Section 4 : Flux de Vidéos d'Événements (Event Videos)
* Permet d'importer des stories ou vidéos courtes de soirées, de lier un fichier vidéo direct, de configurer la jaquette d'aperçu de transition et d'organiser l'ordre d'affichage chronologique globale.

---

## 6. Déconnexion Sécurisée (Logout)

Cliquez sur le bouton de déconnexion rouge **"Quitter le Sanctuaire"** en haut à droite pour :
1. Purger l'état réactif local de l'application (`setSession(null)`).
2. Purger les jetons d'identification de la mémoire volatile de session storage (`sessionStorage.removeItem`).
3. Forcer la purge active du cookie de session côté client.

---

## 7. Erreurs Possibles & Diagnostics

### Erreur A : Le formulaire d'administration tourne en boucle à la sauvegarde
* **Cause :** L'adresse URL de votre projet Supabase ou vos jetons sont mal orthographiés dans votre composant d'environnement `.env.local` et l'appel de requête est en timeout réseau.
* **Résolution :** Lisez [`03_environment_variables.md`](./03_environment_variables.md) pour ajuster votre fichier d'environnement.

---

## 8. Checklist d'Évaluation de Fin d'Étape
* [ ] Vous parvenez à charger l’interface de login à l'adresse dynamique `/login` ou `#/login`.
* [ ] Un mot de passe erroné affiche un panneau d'alerte rouge explicite.
* [ ] Un identifiant valide vous connecte et révèle le tableau de bord d'administration.
* [ ] Cliquer sur déconnexion purge votre session et vous protège contre tout retour en arrière de page.
