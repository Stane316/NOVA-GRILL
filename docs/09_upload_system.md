# 📤 09 - Advanced Media Upload System

## 1. Objectif du fichier
Ce guide détaille le fonctionnement, l'architecture d'upload et les meilleures pratiques d'ingestion de fichiers médias volumineux. Il explique comment le système drag-and-drop gère la validation, le transfert vers Supabase Storage, la conversion de prévisualisation et l'optimisation des débits.

---

## 2. Pré-requis
* Avoir configuré les 3 buckets publics (`hero-media`, `gallery`, `events`) sur Supabase ([`05_storage_setup.md`](./05_storage_setup.md)).
* Utiliser un navigateur récent acceptant les API HTML5 standard de glisser-déposer (`DragEvent`).

---

## 3. Architecture d'Upload (Dual Mode)

Pour offrir une expérience de développement et d'évaluation sans couture, l'architecture d'intégration d'upload bascule intelligemment d'un mode de stockage à l'autre :

```
                        ┌───────────────────────────────┐
                        │      Fichier Sélectionné      │
                        │     (Drag & Drop / Input)     │
                        └───────────────┬───────────────┘
                                        │
                                        ▼
                        ┌───────────────────────────────┐
                        │     Validations Systèmes      │
                        │     • Extension, MimeType     │
                        │     • Taille d'octets max     │
                        └───────────────┬───────────────┘
                                        │
                       ┌────────────────┴────────────────┐
                       ▼                                 ▼
         [ Mode Supabase Connecté ]          [ Mode Simulation Local ]
         • Upload vers Bucket public         • FileReader JS s'active
         • getPublicUrl de Supabase          • Convertit le fichier en base64
         • URL publique persistante          • Blob d'aperçu d'échantillon
```

---

## 4. Guide des Tailles et Formats Recommandés

Pour préserver la vitesse d'affichage des smartphones de vos visiteurs à Calavi (qui peuvent naviguer en 3G/4G saccadée), vous devez **impérativement compresser** vos médias avant de les téléverser dans le panneau d'administration :

### 📷 Images (Galerie, Jaquettes)
* **Formats exclusifs favorisés :** `.webp` ou `.jpg` compressés. (Évitez le `.png` d'origine pour les photographies de plats culinaires car ils pèsent souvent 3 à 5 fois plus chaud).
* **Résolution idéale :** Largeur maximale de `1200px` (suffisant pour de la haute définition sur des dalles retina).
* **Poids de consigne :** Entre 100 Ko et `400 Ko` maximum par image.

### 🎥 Vidéos (Bannière Hero, Clips Soirées)
* **Format exclusif :** `.mp4` encodé en Codec **H.264** ou **AV1** (pour assurer une lecture compatible sur tous les navigateurs Safari iOS et Chrome Android d'origine).
* **Résolution idéale :** `1080p` (1920x1080) pour le fond d'écran principal, et `720p` (1280x720) pour les aperçus TikTok verticaux.
* **Poids de consigne :** Max `5 Mo` pour la vidéo Hero, et `12 Mo` pour les autres enregistrements.

---

## 5. Explications Ligne par Ligne du Système de Validation

Dans l'application, l'analyse d'envoi de fichier exécute une batterie de tests d'intégrité avant son expédition réseau :

```ts
// Illustration du workflow de validation de fichier (AdminDashboard.tsx)
const validateAndUploadFile = async (file: File) => {
  // 1. Filtrage sur le type de contenu (Mime)
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  
  if (!isImage && !isVideo) {
    throw new Error("Seuls les formats images et vidéos sont acceptés.");
  }

  // 2. Filtrage sur le poids matériel
  const maxSize = isVideo ? 25 * 1024 * 1024 : 5 * 1024 * 1024; // 25Mo vidéo, 5Mo image
  if (file.size > maxSize) {
    throw new Error(`Fichier trop lourd. Limite : ${isVideo ? "25 Mo" : "5 Mo"}.`);
  }

  // Si tout est validé, envoi vers Supabase Storage
  return await simulationDB.uploadMedia(bucketName, file);
};
```

---

## 6. Erreurs d'Upload Fréquentes & Corrections

### Erreur A : Erreur du serveur `413 Payload Too Large`
* **Symptôme :** Téléversement bloqué à mi-parcours.
* **Cause :** Votre fichier dépasse la taille maximale globale autorisée par la configuration de vos buckets sur Supabase Storage.
* **Résolution :** Lisez le guide [`05_storage_setup.md`](./05_storage_setup.md) pour modifier la limite de taille ou passez votre fichier vidéo dans l'outil d'optimisation gratuit **Handbrake** (ou convertisseur en ligne) pour en diviser le débit.

### Erreur B : Téléversement gelé à "Uploading..." (Pas de code d'erreur)
* **Symptôme :** Le spinner tourne indéfiniment.
* **Cause :** Conflit de politique RLS sur le bucket ciblé empêchant l'écriture, ou perte de connexion Internet locale.
* **Résolution :** Vérifiez les politiques de stockage définies à l'étape [`07_rls_security.md`](./07_rls_security.md). Fermez puis rechargez votre panneau d'administration pour revalider votre session d'écriture.

---

## 7. Outils Recommandés pour l'Optimisation des Médias
* **TinyPNG / TinyJPG (En ligne) :** Pour diviser par 4 le poids des images de la galerie sans perte de clarté perceptible.
* **Squoosh.app (Par Google) :** outil en ligne permettant de convertir vos images directement au format `.webp` nouvelle génération en ajustant finement la réglette de qualité.
* **Handbrake (Logiciel ordinateur gratuit) :** Le meilleur utilitaire d'encodage vidéo au monde. Cochez l'option **"Web Optimized"** et choisissez le préréglage vidéo `Fast 1080p30` ou `Fast 720p30` pour diviser le poids de vos fichiers par 10 sans dégradation visible.
