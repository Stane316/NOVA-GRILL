# 📖 Architecture & Documentation Technique - Nova Grill

Bienvenue dans la documentation officielle de **Nova Grill**, une plateforme web immersive haut de gamme pour le restaurant, bar et lounge premium situé à Abomey-Calavi (carrefour Tankpè, Bénin). 

Ce guide a été rédigé par l'architecte logiciel principal et le directeur technique du projet pour vous offrir une roadmap de configuration, de déploiement et de maintenance sans couture.

---

## 🏗️ Architecture Globale & Stack Technique

Le projet est conçu avec une architecture moderne, fluide et hautement performante (Jamstack / Single Page Application avec backend as a service). Elle repose sur les piliers suivants :

```
                  ┌──────────────────────────────────────────────┐
                  │              Interface Client                │
                  │   (Vite + React + Tailwind + Motion GSAP)    │
                  └──────────────────────┬───────────────────────┘
                                         │
                                         ▼
                  ┌──────────────────────────────────────────────┐
                  │                 SiteContext                  │
                  │        (Gestion d'état global réactif)       │
                  └──────────────────────┬───────────────────────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    ▼                                         ▼
       ┌─────────────────────────┐               ┌─────────────────────────┐
       │     Supabase Client     │               │    Mock Simulé Local    │
       │  (Mode Connecté / Live) │               │   (Mode Hors-ligne)     │
       └────────────┬────────────┘               └────────────┬────────────┘
                    │                                         │
                    ▼                                         ▼
       ┌─────────────────────────┐               ┌─────────────────────────┐
       │   Services Supabase     │               │      Simulation DB      │
       │  • Tables PostgreSQL    │               │  (Sauvegarde Local-   │
       │  • Buckets Storage      │               │   Storage réactive)     │
       │  • Authentification     │               └─────────────────────────┘
       └─────────────────────────┘
```

### 1. Frontend (Interface Utilisateur)
* **Framework :** React 18+ (avec Vite pour des builds ultra-rapides)
* **Styling :** Tailwind CSS (Vite Native Plugin) - Thème sombre premium "Embers & Charcoal"
* **Animations :** Motion (`motion/react`) pour les transitions narratives fluides et transitions d'états cinématiques
* **Icônes :** Lucide React

### 2. Backend & Base de données (Supabase)
* **Base de données :** PostgreSQL (hébergé sur Supabase)
* **Authentification :** Supabase Auth (gestion des administrateurs par email/password)
* **Stockage :** Supabase Storage (Buckets publics pour les images de la carte, des soirées et les vidéos TikTok)
* **Sécurité :** RLS (Row Level Security) protégeant les tables des accès non autorisés en écriture

### 3. Gestion d'État (Context & Hydratation)
* **SiteContext (`src/lib/context/SiteContext.tsx`) :** Gère le chargement parallélisé des données. Si Supabase n'est pas encore configuré ou s'il y a une panne réseau, l'application bascule automatiquement sur un système de **simulation réactive (Local Storage + Mock de secours)**. Cela garantit une disponibilité à 100% (Offline-First).

---

## 🗺️ Roadmap de la Documentation

Pour configurer et déployer ce projet de manière optimale, suivez scrupuleusement les guides ci-dessous dans l'ordre numérique :

### 🚀 Initialisation & Infrastructure Cloud
| Fichier | Titre | Description |
| :--- | :--- | :--- |
| **01** | [`01_project_setup.md`](docs/01_project_setup.md) | Initialisation locale, dépendances et premier démarrage. |
| **02** | [`02_supabase_project.md`](docs/02_supabase_project.md) | Création et paramétrage du projet sur la console Supabase. |
| **03** | [`03_environment_variables.md`](docs/03_environment_variables.md) | Configuration des secrets et jetons d'accès locaux/production. |
| **04** | [`04_database_setup.md`](docs/04_database_setup.md) | Schéma SQL, création des tables et des données de base. |
| **05** | [`05_storage_setup.md`](docs/05_storage_setup.md) | Configuration des buckets de stockage multimédia. |
| **06** | [`06_authentication.md`](docs/06_authentication.md) | Création et sécurisation du compte administrateur unique. |
| **07** | [`07_rls_security.md`](docs/07_rls_security.md) | Rédiger et appliquer les politiques de sécurité (RLS) PostgreSQL. |
| **08** | [`08_admin_dashboard.md`](docs/08_admin_dashboard.md) | Fonctionnement et présentation de la console d'administration. |
| **09** | [`09_upload_system.md`](docs/09_upload_system.md) | Architecture d'upload multimédia avec drag-and-drop. |
| **10** | [`10_dynamic_content.md`](docs/10_dynamic_content.md) | Lien entre l'état local réactif et la base de données. |

### 🌐 Déploiement & DNS Personnalisé
| Fichier | Titre | Description |
| :--- | :--- | :--- |
| **02_v** | [`02_vercel_deployment.md`](docs/02_vercel_deployment.md) | Guide de mise en production sur les réseaux CDN de Vercel. |
| **03_d** | [`03_domain_configuration.md`](docs/03_domain_configuration.md) | Liaison avec un nom de domaine personnalisé et chiffrement SSL. |

### 🔍 Visibilité, Google & Écoute de Trafic
| Fichier | Titre | Description |
| :--- | :--- | :--- |
| **10_g** | [`10_google_search_console_01.md`](docs/10_google_search_console_01.md) | Google Search Console : Inscription et validation DNS du site. |
| **11_g** | [`11_google_search_console_02.md`](docs/11_google_search_console_02.md) | Google Search Console : Soumission et lecture du plan sitemap.xml. |
| **12_g** | [`12_google_search_console_03.md`](docs/12_google_search_console_03.md) | Google Search Console : Analyse de trafic et corrections d'erreurs. |
| **20_g** | [`20_google_analytics_01.md`](docs/20_google_analytics_01.md) | Google Analytics 4 : Initiation et code de suivi d'environnement. |
| **21_g** | [`21_google_analytics_02.md`](docs/21_google_analytics_02.md) | Google Analytics 4 : Événements de conversions et rapports en direct. |
| **30_g** | [`30_google_business_profile_01.md`](docs/30_google_business_profile_01.md) | Google Business Profile : Établissement de la vitrine locale Maps. |
| **31_g** | [`31_google_business_profile_02.md`](docs/31_google_business_profile_02.md) | Google Business Profile : Collecte d'avis 5★ et publication du menu. |

### 🎯 Référencement Sémantiques, Performance & Sécurité
| Fichier | Titre | Description |
| :--- | :--- | :--- |
| **40_s** | [`40_seo_architecture.md`](docs/40_seo_architecture.md) | Optimisations des métadonnées primaires et balises canoniques. |
| **41_s** | [`41_local_seo.md`](docs/41_local_seo.md) | Stratégie SEO locale : Mots-clés géolocalisés et Geo Meta Tags. |
| **42_s** | [`42_open_graph_social.md`](docs/42_open_graph_social.md) | Protocole Open Graph d'autorité pour les partages WhatsApp & Facebook. |
| **43_s** | [`43_schema_org_restaurant.md`](docs/43_schema_org_restaurant.md) | Données structurées JSON-LD normées de style Restaurant pour Google. |
| **50_p** | [`50_performance_optimization.md`](docs/50_performance_optimization.md) | Fluidité d'horlogerie (GPU), compression WebP et H.265. |
| **51_p** | [`51_mobile_optimization.md`](docs/51_mobile_optimization.md) | Ergonomie tactile (Touch Target), mobile smooth scroll et viewport. |
| **60_s** | [`60_security.md`](docs/60_security.md) | Row Level Security (RLS) PostgreSQL et protection des uploads. |
| **61_s** | [`61_backups_monitoring.md`](docs/61_backups_monitoring.md) | Sauvegardes automatisées, surveillance Uptime et journaux d'erreurs. |

### 📈 Conversions Tactiles & Homologation Finale
| Fichier | Titre | Description |
| :--- | :--- | :--- |
| **70_c** | [`70_conversion_system.md`](docs/70_conversion_system.md) | Tunnel d'acquisition web : Ergonomie des formulaires de réservation. |
| **71_c** | [`71_whatsapp_conversion.md`](docs/71_whatsapp_conversion.md) | Intégration du bouton WhatsApp flottant et messages pré-remplis. |
| **80_f** | [`80_final_launch_checklist.md`](docs/80_final_launch_checklist.md) | Feuille de route d'homologation complète d'assurance qualité. |

### 🛠️ Résolution d'incidents (Guides Legacy)
| Fichier | Titre | Description |
| :--- | :--- | :--- |
| **11** | [`11_seo_setup.md`](docs/11_seo_setup.md) | Optimisations SEO legacy et balises d'origines. |
| **12** | [`12_performance_optimization.md`](docs/12_performance_optimization.md) | Optimisation de chargement multimédia legacy. |
| **13** | [`13_deployment.md`](docs/13_deployment.md) | Guide de mise en production générique. |
| **14** | [`14_domain_configuration.md`](docs/14_domain_configuration.md) | Liaison DNS et redirection d'origines. |
| **15** | [`15_troubleshooting.md`](docs/15_troubleshooting.md) | Guide d'identification et de résolution des erreurs courantes. |
| **16** | [`16_final_checklist.md`](docs/16_final_checklist.md) | Feuille de route de livraison legacy. |

---

## 🚀 Prérequis Système

Pour démarrer ce projet sur votre machine locale, assurez-vous de disposer de :
* **Node.js :** Version `18.20.0` ou supérieure (moteur d'exécution JavaScript)
* **npm :** Version `9.x` ou supérieure (gestionnaire de paquets)
* **Un éditeur de code :** VS Code avec les extensions recommandées (ESLint, Prettier, TailwindCSS IntelliSense)
* **Un compte Supabase :** Pour l'évaluation de la production (gratuit)

---

## 🔒 Règles de Sécurité Fondamentales

1. **Pas de clés secrètes dans Git :** Ne commitez jamais votre fichier `.env` ou `.env.local`. Utilisez toujours les secrets de plateforme en production.
2. **RLS actif par défaut :** N'activez jamais une table en accès public sans politiques (policies) restrictives. Tout accès en écriture (`INSERT`, `UPDATE`, `DELETE`) doit passer par un token d'authentification valide.
3. **Optimisation des médias :** Les vidéos à charger en arrière-plan ne doivent pas dépasser 5 Mo. Les images doivent être au format `.webp` compressé (max 500 Ko).
