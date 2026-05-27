# 🛡️ 07 - Row Level Security (RLS) & Storage Policies

## 1. Objectif du fichier
Ce guide détaille la mise en place des politiques de sécurité fines de PostgreSQL (**Row Level Security - RLS**) et des règles d'accès de stockage sur Supabase. L'objectif est d'accorder aux simples visiteurs anonymes un accès en lecture seule très rapide, tout en verrouillant hermétiquement les privilèges d'écriture et d'administration aux seuls utilisateurs authentifiés.

---

## 2. Pré-requis
* Avoir créé l'ensemble des tables PostgreSQL du schéma ([`04_database_setup.md`](./04_database_setup.md)).
* Avoir créé le compte d'administration initial ([`06_authentication.md`](./06_authentication.md)).

---

## 3. Sécuriser les Tables SQL (RLS de Base de Données)

Par défaut sur Supabase, toutes les tables créées publiquement dans le schéma public sont dépourvues de politiques, ce qui signifie que n'importe quel internaute ayant la clé publique anon-key peut écraser, d'après les API REST, les contenus du restaurant. **Nous devons activer la sécurité RLS sur nos 4 tables d'administration.**

Dans votre **SQL Editor**, exécutez le script d'application suivant :

```sql
-- =========================================================================
-- ACTIVATION DE LA SÉCURITÉ RLS SUR LES TABLES NOVA GRILL
-- =========================================================================

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_videos ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------------------
-- POLITIQUES POUR LA TABLE [site_settings]
-- -------------------------------------------------------------------------

-- 1. Lecture autorisée pour tout le monde (Public)
CREATE POLICY "lecture_site_settings_publique" ON public.site_settings
    FOR SELECT USING (true);

-- 2. Écriture réservée aux administrateurs connectés
CREATE POLICY "ecriture_site_settings_admin" ON public.site_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- -------------------------------------------------------------------------
-- POLITIQUES POUR LA TABLE [gallery_items]
-- -------------------------------------------------------------------------

-- 1. Lecture autorisée pour tout le monde
CREATE POLICY "lecture_gallery_publique" ON public.gallery_items
    FOR SELECT USING (true);

-- 2. Écriture réservée aux gérants connectés
CREATE POLICY "ecriture_gallery_admin" ON public.gallery_items
    FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- -------------------------------------------------------------------------
-- POLITIQUES POUR LA TABLE [hero_media]
-- -------------------------------------------------------------------------

-- 1. Lecture autorisée pour tout le monde
CREATE POLICY "lecture_hero_publique" ON public.hero_media
    FOR SELECT USING (true);

-- 2. Écriture réservée aux gérants connectés
CREATE POLICY "ecriture_hero_admin" ON public.hero_media
    FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- -------------------------------------------------------------------------
-- POLITIQUES POUR LA TABLE [event_videos]
-- -------------------------------------------------------------------------

-- 1. Lecture autorisée pour tout le monde
CREATE POLICY "lecture_event_videos_publique" ON public.event_videos
    FOR SELECT USING (true);

-- 2. Écriture réservée aux gérants connectés
CREATE POLICY "ecriture_event_videos_admin" ON public.event_videos
    FOR ALL TO authenticated USING (true) WITH CHECK (true);
```

---

## 4. Sécuriser les Buckets de Stockage (RLS de Supabase Storage)

De la même façon, n'importe qui ne doit pas pouvoir téléverser, écraser ou purger les médias d'arrière-plan de vos buckets `hero-media`, `gallery` ou `events`.

Pour paramétrer les règles de stockage :
1. Rendez-vous dans l'onglet **"Storage"** de Supabase, puis cliquez sur **"Policies"** dans l'arborescence de gauche.
2. Sous chaque bucket (`hero-media`, `gallery`, `events`), configurez les règles d'accès de stockage à l'aide des scripts SQL pré-calculés en cliquant sur **"New Policy"** (puis choisissez l'option avancée **"For full customization / Use SQL"**) :

```sql
-- =========================================================================
-- EXPÉDITION DES POLITIQUES DE STOCAKGE POUR L'ADMINISTRATION
-- =========================================================================

-- Autoriser la lecture publique de tous les objets de stockage
CREATE POLICY "Accès public en lecture seule" ON storage.objects
    FOR SELECT USING ( bucket_id IN ('hero-media', 'gallery', 'events') );

-- Autoriser le téléversement (INSERT) uniquement aux managers de session
CREATE POLICY "Téléversement réservé aux gérants connectés" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK ( bucket_id IN ('hero-media', 'gallery', 'events') );

-- Autoriser le remplacement (UPDATE) uniquement aux managers de session
CREATE POLICY "Modification réservée aux gérants connectés" ON storage.objects
    FOR UPDATE TO authenticated WITH CHECK ( bucket_id IN ('hero-media', 'gallery', 'events') );

-- Autoriser la purge (DELETE) uniquement aux managers de session
CREATE POLICY "Suppression réservée aux gérants connectés" ON storage.objects
    FOR DELETE TO authenticated USING ( bucket_id IN ('hero-media', 'gallery', 'events') );
```

---

## 5. Erreurs Courantes & Résolutions

### Erreur A : Échec d'affichage des contenus ("No policies defined")
* **Symptôme :** Les appels réseau de lecture retournent un tableau vide. 
* **Cause :** Vous avez activé le verrou général RLS (`ALTER TABLE ENABLE ROW LEVEL SECURITY`) mais vous avez omis de déclarer les politiques d'autorisation d'ouverture de lecture (`FOR SELECT USING (true)`).
* **Résolution :** Exécutez le script SQL ci-dessus pour réinjecter les 4 politiques d'accès de lecture publique "SELECT".

### Erreur B : Téléversement impossible de gros fichiers vidéo ("Internal Server Error")
* **Symptôme :** Erreur rouge `403 Forbidden` ou `413 Payload Too Large` dans l'admin.
* **Résolution :** Lisez [`05_storage_setup.md`](./05_storage_setup.md) pour ajuster les restrictions de taille définies sur chacun de vos répertoires physiques de stockage.

---

## 6. Checklist Finale d'Évaluation de Fin d'Étape
* [ ] Vos 4 tables `site_settings`, `gallery_items`, `hero_media` et `event_videos` portent l'étiquette `"RLS Enabled"` dans l'éditeur de tables Supabase.
* [ ] Toutes les requêtes `SELECT` anonymes sont validées et n'exigent pas de clé d'authentification utilisateur.
* [ ] Toute action d'écriture (`INSERT`, `UPDATE`, `DELETE`) en dehors d'une session administrateur authentifiée produit un code de retour sécurisé `401 Unauthorized` ou `403 Forbidden`.
* [ ] Les 3 buckets de stockage ont leurs politiques correspondantes configurées et verrouillées.
