# 🔑 03 - Environment Variables Setup

## 1. Objectif du fichier
Ce guide explique comment extraire les clés de connexion API de votre console Supabase, configurer les fichiers d'environnement locaux du projet et enregistrer les clés de production sur votre hébergeur final de manière sécurisée.

---

## 2. Pré-requis
* Avoir créé son projet sur Supabase ([`02_supabase_project.md`](./02_supabase_project.md)).
* Disposer d'un éditeur de code ouvert sur le projet.

---

## 3. Récupérer les Clés API sur Supabase

1. Connectez-vous sur votre tableau de bord Supabase.
2. Dans le menu de gauche, tout en bas, cliquez sur **"Project Settings"** (icône d'engrenage).
3. Cliquez ensuite sur l'onglet **"API"**.
4. Vous y trouverez deux variables clés dont nous avons besoin :
   * **Project URL** (ex: `https://abcdxyzabcdxyzabcd.supabase.co`)
   * **API Keys (anon/public)** (ex: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

```
┌─────────────────────────────────────────────────────────────┐
│                 Menu Settings > API                         │
├─────────────────────────────────────────────────────────────┤
│  • URL      :  https://[votre-id].supabase.co              │
│  • anon key :  eyJhbGciOiJIUzI1NiIsInR5ci...                │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Configuration Locale (Fichier `.env`)

Vite exige que toutes les variables d'environnement exposées à l'application cliente commencent obligatoirement par le préfixe `VITE_`.

### Étape 4.1 : Créer votre fichier d'environnement local
À la racine du projet, créez un fichier nommé `.env.local` (ou éditez le `.env` s'il existe).

### Étape 4.2 : Renseigner les clés de configuration
Collez les valeurs récupérées à l'étape précédente comme suit :

```env
# / .env.local
# URL de l'instance de votre projet Supabase
VITE_SUPABASE_URL=https://[votre-id-projet].supabase.co

# Clé API publique anonyme de votre instance Supabase
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ **ATTENTION :** Dans ce projet, un système de repli local automatique a été configuré. Si `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` restent vides, l'application fonctionnera en **mode simulation** à l'aide du Local Storage de votre navigateur. Dès qu'elles sont renseignées, l'application se connecte **automatiquement** aux serveurs de production Supabase en direct.

---

## 5. Configuration en Production (Vercel ou Hébergeur Cloud)

Lorsque vous transférez ou déployez le projet en production :
* **N'uploadez jamais le fichier `.env.local` !** Ce fichier est inscrit dans votre `.gitignore` d'origine pour éviter les fuites de secrets sur les dépôts publics comme GitHub.
* Vous devez déclarer ces deux variables directement dans l'interface de configuration environnementale de votre hébergeur (onglet **"Environment Variables"** de Vercel par exemple).

---

## 6. Erreurs Courantes & Solutions

### Erreur A : `VITE_SUPABASE_URL` invalide ou mal formée
* **Symptôme :** Erreurs dans la console d'inspection réseau ou échec direct de connexion sur Supabase.
* **Résolution :** Assurez-vous de copier l'URL complète en incluant le protocole `https://`. Ne mettez pas de barre oblique de fin (`/`) ou de guillemets autour de l'adresse IP/URL.

### Erreur B : Clé `SERVICE_ROLE` utilisée au lieu de la clé `ANON`
* **Symptôme :** Failles de sécurité majeures ou alertes d'accès Supabase.
* **Résolution :** N'exposez **jamais** la clé `service_role` (qui possède les pouvoirs absolus de Super-administrateur sur votre base de données sans passer par les RLS) dans votre code client ou vos fichiers `.env.local`. Utilisez exclusivement la clé **`anon` (public / anon key)**.

---

## 7. Checklist Finale de Validation
* [ ] Le fichier `.env.local` a été créé à la racine exacte du projet.
* [ ] Les deux variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` y sont dument déclarées.
* [ ] Le fichier `.env.local` est bien répertorié dans le fichier `.gitignore` afin d'éviter toute publication accidentelle sur GitHub.
