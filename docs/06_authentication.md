# 🔐 06 - Administrator Authentication Setup

## 1. Objectif du fichier
Ce guide explique comment activer et paramétrer le service d'authentification par email/mot de passe de Supabase, créer le compte administrateur sécurisé et surtout désactiver les connexions/inscriptions libres du public afin d'empêcher les accès illégitimes à votre panneau de gestion.

---

## 2. Pré-requis
* Disposer d'un projet actif sur Supabase ([`02_supabase_project.md`](./02_supabase_project.md)).
* Définir à l'avance l'adresse email professionnelle qui sera assignée à la gestion administrative du restaurant (ex: `admin@restaurant-nova-grill.com`).

---

## 3. Paramétrer les Fournisseurs d'Authentification (Providers)

1. Dans la console Supabase, cliquez sur **"Authentication"** (icône de clé et d'utilisateur).
2. Rendez-vous dans le sous-onglet **"Providers"** du sous-menu de gauche.
3. Déroulez l'onglet **"Email"** :
   * Validez que l'interrupteur **"Enable Email Provider"** est coché sur **ON**.
   * Décochez impérativement la case **"Confirm email"** temporairement pour simplifier l'enrôlement initial de votre premier super-utilisateur, ou conservez-la cochée si vous êtes en mesure de valider le lien de confirmation envoyé dans la boîte mail.
   * Modifiez l'interrupteur **"Secure email change"** sur **ON** si ce n'est pas déjà le cas.

---

## 4. Mesure Pratique de Sécurité : Désactiver les Inscriptions Libres (Sign-up)
Puisque le site de Nova Grill ne contient pas d'espace client pour les visiteurs (seuls les gérants du restaurant ont le droit de se connecter au dashboard), **vous devez fermer les inscriptions publiques** d'utilisateurs.

1. Allez dans le menu **"Authentication"** > **"Settings"** de la console Supabase.
2. Dans la section **"User Signups"** :
   * Désactivez l'interrupteur **"Allow new users to sign up"** (Inscriptions Libres).
   * Décochez tout interrupteur favorisant une inscription publique sauvage.

```
┌─────────────────────────────────────────────────────────────┐
│             Authentication > Settings                       │
├─────────────────────────────────────────────────────────────┤
│  • Allow new users to sign up :  OFF [⚠️ IMPORTANT]         │
│  • Enable Email Provider      :  ON                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Création Manuelle du Premier Compte Administrateur

Une fois les inscriptions publiques de comptes bloquées sur le site client, il existe deux manières autorisées de créer le premier compte administrateur :

### Option A : Par l'interface graphique Supabase (La plus simple)
1. Allez dans la section **"Authentication"** > **"Users"**.
2. Cliquez sur le bouton bleu **"Add User"** puis sélectionnez **"Create User"**.
3. Saisissez l'email de l'administrateur (ex: `admin@restaurant-nova-grill.com`) et attribuez-lui un mot de passe fort d'au moins 12 caractères.
4. Cochez **"Auto-confirm User"** si le paramètre est affiché afin d'activer le compte instantanément sans envoi d'email de validation.
5. Cliquez sur **"Save"**. Le compte s'affiche désormais dans l'annuaire des utilisateurs autorisés.

### Option B : Par script SQL de force supérieure (SQL Editor)
Si l'interface graphique n'est pas accessible, vous pouvez injecter l'utilisateur d'administration directement dans le schéma de Supabase via l'éditeur SQL :

```sql
-- ATTENTION : Remplacer l'email et le hash du mot de passe si utilisé
-- Ce script génère un compte conforme dans la table auth interne de Supabase.
-- Préférer l'utilisation directe de l'interface "Users" de Supabase qui est plus robuste.
```

---

## 6. Erreurs Courantes & Solutions de Contournement

### Erreur A : Échec d'inscription d'un nouvel administrateur ("Sign-ups are disabled")
* **Symptôme :** Message d'erreur bloquant de Supabase.
* **Cause :** Vous avez verrouillé les inscriptions publiques à l'étape 4 avant de créer manuellement votre compte administrateur.
* **Résolution :** Réactivez momentanément l'interrupteur "Allow new users to sign up", créez votre premier compte administrateur, puis reverrouillez immédiatement après.

### Erreur B : Lien de confirmation par email expiré ou invalide
* **Symptôme :** L'authentification échoue après confirmation.
* **Résolution :** Désactivez l'attribut de confirmation "Confirm email" dans les options "Authentication > Providers" de Supabase ou utilisez l'action "Confirm User" (bouton à l'extrême droite de la ligne du profil utilisateur dans l'onglet Users) pour forcer sa validation manuelle.

---

## 7. Checklist d'Évaluation de Fin d'Étape
* [ ] Le fournisseur par email/mot de passe est coché actif.
* [ ] Les inscriptions publiques et sauvages d'utilisateurs sont bloquées dans les préférences.
* [ ] Un compte utilisateur unique valide est répertorié dans la console avec le statut "Confirmed".
