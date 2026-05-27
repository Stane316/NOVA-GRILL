# 🔄 10 - Dynamic Hydration & Multi-Mode Engine

## 1. Objectif du fichier
Ce guide explique comment le système d'État réactif de l'application (`SiteContext.tsx` et `supabase.ts`) orchestre la récupération, l'hydratation et le rafraîchissement en direct des données. Il détaille le fonctionnement de l'architecture double mode (Dual-Mode Engine) qui bascule automatiquement d'une instance Supabase branchée à une simulation locale réactive en Local Storage.

---

## 2. Pré-requis
* Être familiarisé avec le hook React `useContext` et la gestion d'effet `useEffect`.
* Avoir configuré ses tables PostgreSQL de production ([`04_database_setup.md`](./04_database_setup.md)).

---

## 3. Architecture du Dual-Mode Engine

Pour pallier d’éventuelles latences de réseau, pannes temporaires de service cloud ou simplement pour permettre d’évaluer, de designer et de configurer l’intégralité de l’application sans avoir encore de compte Supabase, nous avons programmé un système hybride de détection de connectivité à l'initialisation du fichier `/src/lib/supabase.ts` :

```tsx
// Détecteur de connexion Supabase en production
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || "";
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "";

const isProductionSupabaseSet = 
  supabaseUrl && 
  supabaseUrl !== "YOUR_SUPABASE_URL" && 
  supabaseAnonKey && 
  supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY";

// Si les clés réelles de l'utilisateur sont fournies, initialisation du client physique
// Sinon, renvoi d'une instance nulle. L'application bascule alors en mode simulation.
export const supabase = isProductionSupabaseSet 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
```

---

## 4. Rôle de SiteContext (`SiteContext.tsx`)

Le `SiteContext.tsx` enveloppe l'intégralité du site public et de la console d'administration au sommet de la hiérarchie DOM. Il orchestre :
1. **L'initialisation parallélisée :** Au lancement (`useEffect`), le contexte appelle parallèlement les méthodes du moteur unifié `simulationDB`.
2. **L'évaluation conditionnelle :** 
   * **Si `supabase` est actif :** Les appels réseau d'API interrogent directement les tables PostgreSQL publiques de votre hébergeur Supabase.
   * **Si `supabase` est nul (Mode Simulation) :** Les fonctions lisent le stockage persistant Local Storage (`localStorage.getItem('nova_...')`). Si le Local Storage est vide, le système réinjecte des données témoins intégrées de secours (Mock Data prédéfinie) pour conserver l'esthétique finale intacte.
3. **Le multiplexage :** L'objet réactif renvoyé s'organise ainsi :

```typescript
interface SiteContextType {
  settings: SiteSettings;      // Textes d'en-tête, horaires, téléphone, abonnés TikTok
  gallery: DBGalleryItem[];    // Liste ordonnée de la grille photo/vidéo interactive
  heroMedia: HeroMedia;        // Vidéo d'ambiance et poster de transition du Hero
  eventVideos: DBEventVideo[];  // Liste de clips d'ambiance du carrousel d'événements
  loading: boolean;            // État de chargement initial pour afficher le spinner
  refreshData: () => Promise<void>; // Fonction permettant de forcer un rafraîchissement réseau après édition
}
```

---

## 5. Exemple Pratique de Raccordement Composant : `TikTokBuzz.tsx`

La landing page se connecte de façon à la fois réactive et sécurisée à l'état hydraté sans se préoccuper de l'architecture d'origine sous-jacente (Local Storage contre Supabase réel) :

```tsx
import { useSite } from "../lib/context/SiteContext";

export default function TikTokBuzz() {
  const { settings, eventVideos } = useSite();

  return (
    <div>
      {/* Affichage direct et dynamique des compteurs d'abonnés actualisables */}
      <h2>{settings.follower_count || "11.2K"} abonnés enflammés</h2>
      
      {/* Rendu dynamique du carrousel de clips d'événements */}
      <div className="grid">
        {eventVideos.map((video) => (
          <video key={video.id} src={video.video_url} poster={video.thumbnail_url} />
        ))}
      </div>
    </div>
  );
}
```

---

## 6. Synchronisation des Modifications depuis le Panneau d'Administration
Lorsqu'un gérant clique sur le bouton de sauvegarde d'un paramètre :
1. Le composant d'administration appelle la méthode asynchrone mutante correspondante (ex : `simulationDB.updateSettings(...)`).
2. À la suite de la validation réseau confirmée, l'administrateur déclenche la fonction globale de notification de rafraîchissement : `refreshData()`.
3. Le site entier est immédiatement reconnecté avec les nouveaux contenus actualisés, sans exiger de rechargement complet de la page du navigateur Web de l'utilisateur !

---

## 7. Checklist Finale d'Évaluation de Fin d'Étape
* [ ] Le site s’affiche correctement avec les textes par défaut à l'initialisation.
* [ ] L'inspecteur web ne remonte aucune boucle infinie ou échec critique de rafraîchissement d'état.
* [ ] Les modifications apportées dans la console d’administration se reportent de suite sur la landing page sans exiger d'actualiser la page.
