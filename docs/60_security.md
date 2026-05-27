# 🔒 60 - Sécurité Totale, RLS & Protection des Données

## 1. Objectif du fichier
Ce document technique dresse le catalogue exhaustif des mesures et protocoles de haute sécurité déployés sur l’architecture de Nova Grill, garantissant l'intégrité de la base de données PostgreSQL, la confidentialité des comptes administrateurs de la marque, et la protection absolue des canaux de versements multimédias.

---

## 2. Ce que ce fichier va accomplir
En vous appropriant les directives de ce manuel de référence en cybersécurité, vous allez :
* Comprendre le blindage de l'accès à la console d'administration de Nova Grill.
* Auditer et valider les politiques de sécurité par ligne (Row Level Security - RLS) de Supabase.
* Sécuriser les dossiers d'upload d'images contre toute intrusion ou fichier malveillant.
* Chiffrer l'ensemble des flux d'échanges d'informations à l'aide des protocoles réseaux recommandés.

---

## 3. Pré-requis
* Disposer d'un compte de développement actif sur votre console centrale [Supabase](https://supabase.com).
* Votre application web de production de Nova Grill doit utiliser l'adresse sécurisée HTTPS d'autorité ([`03_domain_configuration.md`](./03_domain_configuration.md)).

---

## 4. Étapes Détaillées

### Étape 4.1 : Blindage de l'Authentification Admin (Supabase Auth)
Le panneau de contrôle administrateur de Nova Grill permet de piloter la carte culinaire globale. Nous renforçons son autorité par plusieurs verrous clés :
1. **L'unicité de compte d'accès :** Aucun sélecteur d'enregistrement d'utilisateurs n'est accessible sur le site public pour écarter toute inscription pirate. Seul l'administrateur d'origine, authentifié par email d'entreprise et mot de passe hautement résistant, peut s'authentifier.
2. **Le mode d'encapsulation de session (Session Management) :** Les jetons d'authentification cryptographiques sont conservés avec prudence au sein d'une mémoire de session asynchrone sécurisée (`sessionStorage`), s'effaçant automatiquement à la fermeture du navigateur de l'administrateur afin d'écarter le détournement de session sur terminal tiers partagé.

### Étape 4.2 : Sécurisation de l’Accès Base de Données (Row Level Security - RLS)
Par défaut, une base de données d'accès sans RLS permet à n'importe quel internaute de lire ou de saboter votre contenu en exécutant de simples requêtes d'injection dans la console Web de son navigateur.
Pour prémunir Nova Grill contre ce risque, nous avons soudé des règles de sécurité **Row Level Security** sur 100% de nos tables SQL de production :
1. **La Lecture Publique Libre :** Tout visiteur anonyme de passage sur le site public de Nova Grill peut exécuter des requêtes de type `SELECT` pour lire sans encombre la carte des mets, les soirées de la marque et les vidéos TikTok d'arrière-plan.
2. **L'Écriture Sécurisée Restreinte (Admin Only) :** Toutes les opérations de modification structurelle de la base de données (Requêtes de types `INSERT`, `UPDATE` ou `DELETE`) sont immédiatement rejetées par le moteur PostgreSQL, **sauf** si l'internaute présente un jeton d'authentification valide, certifiant qu'il s'agit bien de l'administrateur légitime et authentifié de Nova Grill.

```sql
-- Exemple de politique de sécurité SQL RLS pour la table des spécialités culinaires
ALTER TABLE public.specialties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select of specialties" 
ON public.specialties FOR SELECT USING (true);

CREATE POLICY "Allow authenticated administrators write access" 
ON public.specialties FOR ALL TO authenticated 
USING (auth.role() = 'authenticated');
```

### Étape 4.3 : Protection des Uploads d'Images de la Carte (Bucket Storage Security)
Permettre à un administrateur d'uploader des fichiers photos de couverture de la terrasse ou d'assiettes de grillades présente un risque d'intrusion s'il verse accidentellement un script malveillant de type `.php` ou `.js`.
Pour y parer, le chargeur d'upload autonome de Nova Grill déploie une double couche de protection :
1. **Le filtrage et le contrôle d'extension strict de fichier :** L'interface d'upload n'accepte exclusivement que les formats d'extensions d'images standardisés de types **`.webp`**, **`.png`**, et **`.jpg`/`.jpeg`**. Tout autre format de fichier est instantanément rejeté.
2. **Limitation drastique de poids matériel :** Tout fichier photo surpassant la limite technique d'utilité publique de **`5 Mo`** se voit écarté à chaud pour prémunir le serveur de toute tentative de saturation de mémoire disque (Denial of Service - DoS).

---

## 5. Explications Ultra Pédagogiques
La sécurité est une suite de verrous de sécurité croisés. Il ne s'agit pas d'espérer que personne ne tente de forcer l'accès, mais de concevoir une architecture logicielle imperméable à la malveillance. En appliquant des verrous d'authentification de session stricte, en rendant les écritures base de données PostgreSQL tributaires d'un jeton d'authentification administrateur, et en flitrant de manière chirurgicale les transferts de fichiers d'images de plats, la plateforme Nova Grill assure la totale continuité d'activité de son outil commercial d'envergure.

---

## 6. Captures Mentales / Explications Visuelles

Imaginez le RLS comme un videur de sécurité à l'entrée de l'arrière-boutique de votre restaurant de Calavi :

```
[ Client de passage sur le site ] ── Demande : "Je veux lire le menu" ──> [ Base PostgreSQL ]
                                                                                   │
                                                                       (RLS valide : OK-SELECT)
                                                                                   ▼
[ Client de passage sur le site ] <── Reçoit les grillades du restaurant ──────────┘

[ Internaute malveillant (Injecte code) ] ── Demande : "Je veux supprimer la table" ──> [ Base PostgreSQL ]
                                                                                               │
                                                                                  (RLS bloque : NO-DELETE)
                                                                                               ▼
                                                                                  [ Accès Refusé 403 ! ]
```

---

## 7. Erreurs Fréquentes

### Erreur A : Oublier d'activer le RLS sur une nouvelle table créée en base
* **Symptômes :** N'importe quel pirate doué en informatique de Calavi peut vider ou vandaliser votre table à distance d'un simple script.
* **Cause :** Création physique de la table en panneau SQL sans appliquer la directive réglementaire `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`.

### Erreur B : Identité d'API et clés secrètes d'environnement exposées sur Git
* **Symptômes :** Votre console d'autorité Supabase lève des alertes de sécurité pour tentative de connexions ou vols de données.
* **Cause :** Commit accidentel du fichier confidentiel `.env` local dans votre dépôt d'évaluation public GitHub.

---

## 8. Solutions

### Résolution pour l'Erreur A :
1. Accédez au tableau d'administration de votre projet sur la console [Supabase](https://supabase.com/).
2. Allez dans l'onglet **"Authentication > Policies"** ou sur l'onglet d’édition de base de données.
3. Vérifiez que toutes vos tables dynamiques de production possèdent leur interrupteur de Row Level Security (RLS) allumé de couleur verte.

### Résolution pour l'Erreur B :
1. Ajoutez impérativement la mention du fichier `.env` et `.env.local` au sein de votre fichier d'exclusions de sauvegarde Git d'origine : **`.gitignore`**.
2. Si les clés ont déjà fuité sur le réseau public, régénérez instantanément vos jetons d'API (API Keys) depuis la console paramètres de votre projet Supabase d'origine et mettez à jour votre cloud Vercel.

---

## 9. Checklist de Validation
- [ ] Le RLS (Row Level Security) est officiellement allumé et actif sur l'intégralité des tables PostgreSQL.
- [ ] Les politiques d'écriture de données sont restreintes exclusivement aux jetons d'administrateurs certifiés.
- [ ] Le compte d'administration unique est renforcé par un mot de passe haut de gamme.
- [ ] Le chargeur d'upload filtre de façon imperméable les extensions et rejette les fichiers d'images dépassant 5 Mo.
- [ ] Le fichier confidentiel d'environnement `.env` est dument consigné dans vos exclusions Git de sécurité.
