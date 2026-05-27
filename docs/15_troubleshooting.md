# 🛠️ 15 - Troubleshooting & Advanced Diagnostic

Bienvenue dans l'annuaire d'aide technique de la plateforme Nova Grill. Ce document recense les symptômes anormaux, les causes racines matérielles et les instructions d'alignement pour remettre l'application en ordre de marche.

---

## 🚀 GUIDE SUMMARY INDEX
* [SECTION 1: Problèmes d'Authentification & d'Accès](#-1-problemes-dauthentification--dacces)
* [SECTION 2: Défauts d'Upload & Perte d'Images](#-2-defauts-dupload--perte-dimages)
* [SECTION 3: Problèmes de RLS & SQL](#-3-problemes-de-rls--sql)
* [SECTION 4: Anomalies d'Affichage & d'Animations](#-4-anomalies-daffichage--danimations)

---

## 🔒 1. Problèmes d'Authentification & d'Accès

### Symptôme 1.1 : Message d'erreur "Invalid login credentials" à la connexion admin
* **Diagnostic :** L'adresse email ou le mot de passe est rejeté par Supabase Auth.
* **Correction :**
  1. Vérifiez s'il n'y a pas d'espace invisible copié en trop à la fin de l'email ou du mot de passe.
  2. Allez dans votre menu de gestion **"Authentication > Users"** de Supabase et réinitialisez le mot de passe de l'administrateur manuellement en cliquant sur le profil.
  3. Assurez-vous que l'en-tête de votre console locale `.env.local` cible la bonne base de données en production et non un projet d'essai obsolète.

### Symptôme 1.2 : "Sign-ups are disabled for this project"
* **Diagnostic :** Une nouvelle connexion tente de s'inscrire, mais l'inscription en libre-service a été fermée conformément aux consignes de sécurité ([`06_authentication.md`](./06_authentication.md)).
* **Correction :**
  N'essayez pas de contourner cette erreur. Seul un administrateur déjà authentifié a le droit de manipuler le projet. Si vous souhaitez inscrire un nouveau collaborateur, créez son profil de force graphique depuis l'onglet **"Authentication > Users"** sur la console d'administration de Supabase.

---

## 📤 2. Défauts d'Upload & Perte d'Images

### Symptôme 2.1 : Message d'erreur "Access Denied" ou "Missing or insufficient permissions" lors d'un upload
* **Diagnostic :** L'authentification client s'exécute correctement, mais le stockage Supabase rejette le fichier physique d'image ou de vidéo.
* **Correction :**
  1. **Vérification du statut Public :** Allez dans l'onglet **"Storage"** de Supabase, cliquez sur les paramètres à côté du nom de votre bucket (ex: `gallery`) et vérifiez que l'interrupteur **"Public Bucket"** est bien enfoncé sur **ON**.
  2. **Vérification des Politiques de Stockage :** Allez dans "Storage > Policies" et validez que les permissions SQL de lecture d'écriture anonyme ou certifiée d'administration de buckets sont dument enregistrées (Reportez-vous au guide [`07_rls_security.md`](./07_rls_security.md)).

### Symptôme 2.2 : Temps d'attente d'upload infini ou plantage à 99% d'une vidéo
* **Diagnostic :** La bande passante montante locale est trop faible ou le fichier vidéo n'est pas compressé et sature le tampon réseau.
* **Correction :**
  1. Utilisez le convertisseur informatique gratuit **Handbrake** pour ramener le poids du fichier vidéo en deçà de **5 Mo** en re-paramétrant le profil d'envoi en encodage Web standard (`Fast 1085p30 Web Optimized`).
  2. Divisez par deux la résolution de téléchargement d'origine de l'image (max 1080p).

---

## 🗄️ 3. Problèmes de RLS & SQL

### Symptôme 3.1 : Le site affiche un tableau vide en lecture (Aucun média ou texte par défaut)
* **Diagnostic :** Vous avez activé le garde RLS (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`) pour protéger la base de données, mais vous avez omis d'ajouter la politique de lecture anonyme "SELECT publique". Par conséquent, PostgreSQL applique la politique stricte de rejet absolu par défaut et bloque les requêtes de vos simples visiteurs.
* **Correction :**
  Rendez-vous dans votre SQL Editor et injectez la règle d'ouverture d'accès suivante :
  ```sql
  -- Forcer l'autorisation de lecture anonyme sur l'ensemble de la carte
  CREATE POLICY "Lecture anonyme publique" ON public.gallery_items
  FOR SELECT USING (true);
  ```

---

## 🎨 4. Anomalies d'Affichage & d'Animations

### Symptôme 4.1 : Ralentissements d'images saccadées lors du défilement des sections
* **Diagnostic :** Le profil s'exécute sur un téléphone portable d'entrée de gamme ou un processeur économique saturé en ressources.
* **Correction :**
  1. Compressez l'ensemble des arrière-plans d'origine au format `.webp`.
  2. N'exécutez pas de vidéos lourdes en arrière-plan sans l'attribut `poster=""` de repli fluide.
  3. Fermez les applications de débogage ou d'enregistrement écran tierces connectées à votre écran.
