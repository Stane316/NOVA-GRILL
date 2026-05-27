# 🗄️ 04 - Database Setup (PostgreSQL Schema)

## 1. Objectif du fichier
Ce guide contient le script SQL officiel de création des structures de base de données (tables, contraintes, index) nécessaires au fonctionnement de la plateforme Nova Grill, ainsi que les requêtes d'insertion des données d'initialisation (Seed Data).

---

## 2. Pré-requis
* Avoir installé et configuré ses variables d'environnement locales ([`03_environment_variables.md`](./03_environment_variables.md)).
* Accéder au module **"SQL Editor"** de votre tableau de bord Supabase.

---

## 3. Schéma SQL de Restauration Globale

Copiez l'intégralité du script SQL ci-dessous, collez-le dans une nouvelle fenêtre de requête de l'éditeur SQL de Supabase (bouton **"New Query"**), puis cliquez sur le bouton vert **"Run"** :

```sql
-- =========================================================================
-- SCRIPT DE CRÉATION DES STRUCTURES DE LA BASE DE DONNÉES - NOVA GRILL
-- =========================================================================

-- 1. Configuration de la table des paramètres du site
CREATE TABLE IF NOT EXISTS public.site_settings (
    id integer PRIMARY KEY DEFAULT 1,
    hero_title text NOT NULL,
    hero_subtitle text NOT NULL,
    phone text NOT NULL,
    address text NOT NULL,
    opening_hours text NOT NULL,
    tiktok_url text NOT NULL,
    tiktok_handle text NOT NULL,
    follower_count text NOT NULL,
    likes_count text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT is_singleton CHECK (id = 1)
);

COMMENT ON TABLE public.site_settings IS 'Paramètres globaux et compteurs réseaux sociaux du restaurant Nova Grill.';

-- 2. Configuration de la table de la galerie multimédia
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id text PRIMARY KEY,
    type text NOT NULL CHECK (type IN ('image', 'video')),
    title text NOT NULL,
    media_url text NOT NULL,
    aspect text NOT NULL DEFAULT 'aspect-square',
    order_index integer NOT NULL DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

COMMENT ON TABLE public.gallery_items IS 'Éléments d''images et vidéos interactives pour la grille de la galerie immersive.';

-- 3. Configuration de la table des bannières de fond (Hero Media)
CREATE TABLE IF NOT EXISTS public.hero_media (
    id text PRIMARY KEY DEFAULT 'hero-1',
    video_url text NOT NULL,
    poster_url text NOT NULL,
    mobile_video_url text DEFAULT '',
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT is_hero_singleton CHECK (id = 'hero-1')
);

COMMENT ON TABLE public.hero_media IS 'Vidéo et image fixe d''arrière-plan principal de la bannière cinématographique.';

-- 4. Configuration de la table des vidéos d'événements (TikTok / Reels)
CREATE TABLE IF NOT EXISTS public.event_videos (
    id text PRIMARY KEY,
    title text NOT NULL,
    video_url text NOT NULL,
    thumbnail_url text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

COMMENT ON TABLE public.event_videos IS 'Vidéos de soirées festives et d''événements TikTok importées ou enregistrées.';
```

---

## 4. Données de Départ Obligatoires (Seed Data)

Toujours dans l'éditeur SQL, exécutez le script d'insertion suivant afin d'éviter d'avoir un site vide lors de la première connexion live :

```sql
-- =========================================================================
-- DONNÉES DE SEED D'ORIGINE - NOVA GRILL
-- =========================================================================

-- Initialisation des paramètres globaux
INSERT INTO public.site_settings (
    id, 
    hero_title, 
    hero_subtitle, 
    phone, 
    address, 
    opening_hours, 
    tiktok_url, 
    tiktok_handle, 
    follower_count, 
    likes_count
) VALUES (
    1,
    'Quand les lumières baissent...',
    'Le Rituel de la Braise Pure',
    '+229 01 96 13 52 87',
    'Carrefour Tankpè, Abomey-Calavi, Bénin',
    'Ouvert tous les jours de 07h à 01h du matin',
    'https://www.tiktok.com/@restaurant.nova.grill',
    '@restaurant.nova.grill',
    '11.2K',
    '131.7K'
) ON CONFLICT (id) DO NOTHING;

-- Initialisation des images par défaut de la galerie
INSERT INTO public.gallery_items (id, type, title, media_url, aspect, order_index) VALUES
('gal-1', 'image', 'La Braise en Fusion', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', 'aspect-[16/10]', 0),
('gal-2', 'image', 'Le Célèbre Plat de 5K', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', 'aspect-square', 1),
('gal-3', 'image', 'Mixologie à Gogo', 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800', 'aspect-[3/4]', 2),
('gal-4', 'image', 'Saturday Live Beats', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800', 'aspect-[16/10]', 3)
ON CONFLICT (id) DO NOTHING;

-- Initialisation du fond vidéo d'en-tête (Hero)
INSERT INTO public.hero_media (id, video_url, poster_url) VALUES (
    'hero-1',
    'https://assets.mixkit.co/videos/preview/mixkit-barman-shaking-metal-shaker-creating-bubbles-34288-large.mp4',
    'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200'
) ON CONFLICT (id) DO NOTHING;

-- Initialisation des vidéos TikTok de démonstration
INSERT INTO public.event_videos (id, title, video_url, thumbnail_url, created_at) VALUES
('ev-1', 'DJ Deck Control Live', 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-dj-playing-music-on-a-dj-deck-42548-large.mp4', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600', now()),
('ev-2', 'Braise Intense de Chèvre', 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-barbecue-coal-burning-43093-large.mp4', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600', now() - interval '1 hour')
ON CONFLICT (id) DO NOTHING;
```

---

## 5. Explication Technique des Contraintes SQL
* **`id integer PRIMARY KEY DEFAULT 1 CONSTRAINT is_singleton CHECK (id = 1)` :** Cette contrainte garantit que la table `site_settings` contiendra TOUJOURS une seule et unique ligne (enregistrement id=1) représentant les paramètres d'en-tête du site. Tout essai d'insertion de ligne supplémentaire échouera via PostgreSQL, ce qui protège l'intégrité de l'application.
* **`id text PRIMARY KEY DEFAULT 'hero-1' CHECK (id = 'hero-1')` :** Même mécanisme protégeant le média Hero d'arrière-plan d'une démultiplication incongrue.

---

## 6. Erreurs Possibles & Solutions

### Erreur A : `relation <table_name> already exists`
* **Cause :** Vous essayez d'exécuter la commande de création sur des tables existantes.
* **Résolution :** L'instruction SQL inclut `IF NOT EXISTS` pour parer à ce problème. Si vous souhaitez écraser un ancien schéma erroné, vous devez d'abord nettoyer la base :
  ```sql
  DROP TABLE IF EXISTS public.site_settings CASCADE;
  DROP TABLE IF EXISTS public.gallery_items CASCADE;
  DROP TABLE IF EXISTS public.hero_media CASCADE;
  DROP TABLE IF EXISTS public.event_videos CASCADE;
  ```

---

## 7. Checklist Finale de Validation
* [ ] Le script complet a été exécuté sur l'éditeur SQL sans avertissement ou erreur de compilation PostgreSQL.
* [ ] La console de retour Supabase affiche `"Success! 0 rows affected"` ou `"Query returned successfully"`.
* [ ] Dans l'onglet **"Table Editor"**, les 4 tables `site_settings`, `gallery_items`, `hero_media`, et `event_videos` sont apparues dans le schéma public.
