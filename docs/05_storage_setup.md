# 📁 05 - Storage Buckets Setup (Supabase Storage)

## 1. Objectif du fichier
Ce guide explique comment configurer les compartiments de stockage physiques (Buckets) dans le module Storage de Supabase pour héberger publiquement les fichiers d'images de la carte, des bannières animées, et les fichiers vidéos d'ambiance du restaurant.

---

## 2. Pré-requis
* Disposer d'un projet actif sur Supabase ([`02_supabase_project.md`](./02_supabase_project.md)).
* Connaître les extensions de fichiers à importer dans le projet (`.png`, `.jpg`, `.jpeg`, `.webp`, `.mp4`).

---

## 3. Configuration des Trois Buckets Clés
Pour assurer la parfaite cohésion avec l'algorithme d'upload de la console d'administration (`AdminDashboard.tsx`), vous devez obligatoirement déclarer **trois buckets distincts** :

| Nom exact du Bucket | Type d'accès | Rôle | Taille Max Autorisée |
| :--- | :--- | :--- | :--- |
| **`hero-media`** | Public | Vidéos d'en-tête cinématographiques et images d'attente (posters). | 15 Mo |
| **`gallery`** | Public | Images et vidéos de la carte culinaire et de la terrasse. | 5 Mo |
| **`events`** | Public | Vidéos d'événements live des soirées TikTok ou DJ sets. | 25 Mo |

---

## 4. Étapes Détaillées de Création d'un Bucket

Répétez les étapes de configuration ci-après pour chacun des 3 buckets :

1. Sur le tableau de bord Supabase, cliquez sur l'onglet **"Storage"** dans le menu de gauche (icône de boîte ouverte).
2. Cliquez sur le bouton de création : **"New Bucket"**.
3. Saisissez le nom exact en minuscules (ex : `hero-media` ou `gallery` ou `events`).
4. **⚠️ CRUCIAL :** Cochez impérativement la case à cocher **"Public Bucket"**. 
   * *Pourquoi ?* Si le bucket est privé, les URL d'accès générées par l'API contiendront des jetons d'expiration d'une heure. En cochant "Public", les adresses de vos médias seront fixes et durables pour les navigateurs de vos visiteurs.
5. Déployez l'onglet des restrictions de sécurité (**"Allowed content-type"** et **"Maximum file size"**) :
   * Saisissez la limite en octets appropriée.
   * Restreignez si souhaité aux types mime `image/*, video/*` pour filtrer les fichiers potentiellement suspects.
6. Cliquez sur le bouton de sauvegarde **"Save"**.

---

## 5. Explications Techniques sur la Récupération des URL Publiques

Dans votre code, après chaque téléversement d'image ou de vidéo, l'application utilise la fonction `getPublicUrl` du client Supabase :

```ts
// Illustration du workflow interne à l'application
const { data, error } = await supabase.storage.from("gallery").upload(filePath, file);
if (!error) {
  const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(filePath);
  // publicUrl retournée ressemble à :
  // https://[id-instance].supabase.co/storage/v1/object/public/gallery/[nom-fichier].webp
}
```

En validant que vos buckets d'origine sont **Publics**, cette URL d'accès sera directement résoluble par le composant `<img />` ou `<video />` HTML sans restriction CORS ou autorisation de session.

---

## 6. Erreurs Possibles & Solutions

### Erreur A : Erreur `Access Denied` à l'upload d'un média depuis l'admin
* **Cause 1 :** Le bucket n'a pas été configuré en mode **"Public"**, bloquant l'injection distante anonyme de clés initiales de mise en cache.
* **Cause 2 :** Les politiques de sécurité de stockage (RLS Storage) n'ont pas encore été rédigées. (Lisez [`07_rls_security.md`](./07_rls_security.md) pour y remédier).

### Erreur B : Les vidéos ne s'affichent pas en direct (Erreur `CORS` de lecture)
* **Symptôme :** Les inspecteurs navigateurs indiquent un blocage CORS sur le domaine Supabase.
* **Résolution :** Dans les préférences de stockage générales de Supabase, s'assurer que la politique CORS accepte le domaine racine de production de votre site (`*` ou votre nom de domaine).

---

## 7. Checklist d'Évaluation de Fin d'Étape
* [ ] Le stockage comprend 3 buckets configurés : `hero-media`, `gallery`, et `events`.
* [ ] La mention verte **"Public"** apparaît bien à côté du nom de chaque bucket dans la console.
* [ ] Les limites de téléchargements correspondantes de fichiers sont augmentées pour permettre de gros fichiers vidéos.
