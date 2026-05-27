# ⚡ 02 - Supabase Project Creation

## 1. Objectif du fichier
Ce guide détaille la création pas-à-pas d'un nouveau projet de base de données et de services d'infrastructure directement sur la plateforme managée **Supabase**.

---

## 2. Pré-requis
* Un compte utilisateur actif sur [Supabase.com](https://supabase.com) (connexion via GitHub conseillée).
* Avoir validé l'étape de démarrage local du projet ([`01_project_setup.md`](./01_project_setup.md)).

---

## 3. Étapes de Création du Projet

### Étape 3.1 : Créer une organisation et un nouveau projet
1. Connectez-vous à la console d'administration de Supabase : [database.new](https://database.new) ou [https://supabase.com/dashboard](https://supabase.com/dashboard).
2. Cliquez sur le bouton vert **"New Project"**.
3. Sélectionnez votre organisation par défaut ou créez-en une nouvelle (ex: *"Nova Grill Group"*).

### Étape 3.2 : Remplir les informations du projet
Remplissez le formulaire de provisionnement avec les paramètres recommandés ci-dessous :

```
┌─────────────────────────────────────────────────────────────┐
│                 Formulaire "Create a new project"           │
├─────────────────────────────────────────────────────────────┤
│  • Name        : Nova Grill Production                      │
│  • Password    : [Générez un mot de passe fort et copiez-le]│
│  • Region      : EU (Frankfurt) - ou région la plus proche │
│  • Pricing Tier: Free (LARGEMENT suffisant pour débuter)   │
└─────────────────────────────────────────────────────────────┘
```

> ⚠️ **IMPORTANT :** Conservez précieusement le mot de passe de la base de données. Il sera requis si vous connectez ultérieurement un outil de migration SQL ou un outil d'analyse externe (DBeaver, pgAdmin) en mode direct.

### Étape 3.3 : Attendre le provisionnement
Supabase va créer et allouer votre conteneur de base de données PostgreSQL dédié, vos services d'authentification et votre système d'API REST. Cette opération prend généralement **1 à 2 minutes**. 

Une fois le provisionnement terminé, vous accédez à la page d'accueil de la console d'administration de votre projet.

---

## 4. Aperçu de la Console d'Administration

Familiarisez-vous avec les onglets de la barre latérale gauche de Supabase :
* **Table Editor (icône table) :** Pour visualiser et éditer manuellement vos tables SQL.
* **SQL Editor (icône de terminal avec un éclair `>_`) :** Pour écrire et exécuter des scripts de base de données, des triggers et des fonctions. C'est l'outil que nous utiliserons principalement pour configurer le schéma.
* **Database (icône de cylindre) :** Pour gérer les paramètres système de PostgreSQL.
* **Authentication (icône de clé / utilisateur) :** Pour surveiller la liste des utilisateurs de la console admin et gérer les règles de connexion.
* **Storage (icône de boîte ouverte) :** Pour configurer les répertoires et dossiers de sauvegarde de vos médias physiques.

---

## 5. Erreurs Possibles & Solutions

### Erreur A : Échec de création en raison de quota d'organisation dépassé
* **Cause :** Le compte Supabase gratuit limite chaque utilisateur à **2 projets gratuits simultanés**. Si vous avez déjà d'anciennes expériences endormies, la création échouera.
* **Résolution :** Supprimez ou mettez en pause l'un de vos anciens projets d'essai inutilisés sur Supabase avant de relancer la création.

### Erreur B : Temps de provisionnement anormalement long (bloqué à 99%)
* **Cause :** Panne réseau temporaire d'un datacenter AWS/GCP sous-jacent à Supabase.
* **Résolution :** Actualisez la page du navigateur. Si le problème persiste, vérifiez l'état de fonctionnement des services sur [status.supabase.com](https://status.supabase.com).

---

## 6. Checklist de Validation
Assurez-vous que les éléments suivants sont validés avant d'avancer :
* [ ] Le projet Supabase est créé et l'icône de chargement de provisionnement a disparu.
* [ ] Vous avez noté le mot de passe de la base de données dans un gestionnaire de mots de passe ou un fichier de notes sécurisé.
* [ ] Vous savez comment accéder à l'éditeur SQL de Supabase (`SQL Editor`).
