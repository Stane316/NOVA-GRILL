# 📋 16 - Pre-Delivery Final Checklist

Ce guide constitue la feuille d'évaluation d'assurance-qualité finale (QA Checklist). Avant de remettre officiellement les clés de la plateforme Nova Grill au restaurant d'Abomey-Calavi, le Tech Lead du projet doit passer en revue et valider les critères de conformité techniques et artistiques ci-dessous :

---

## 🏗️ 1. Vérifications d'Infrastructure & Base de Données
- [ ] **Raccordement Supabase :** Le fichier `.env.local` (local) et les variables de production (Vercel) contiennent les vraies adresses clés et non les étiquettes de démonstration.
- [ ] **Tables existantes :** Les 4 tables SQL d'administration (`site_settings`, `gallery_items`, `hero_media`, `event_videos`) sont actives et visibles dans l'arborescence PostgreSQL.
- [ ] **Intégrité logique :** La table `site_settings` contient un seul enregistrement exclusif (`id = 1`) pour écarter tout risque d'historique dupliqué.
- [ ] **Données initiales :** Le script de seed a été exécuté avec succès pour pré-remplir l'ensemble des modules du site lors de l'activation en direct.

---

## 🔒 2. Vérifications de Sécurité (Security Audit)
- [ ] **Row Level Security (RLS) :** La ligne d'avertissement rouge RLS est activée sur les 4 tables PostgreSQL dans la console Supabase pour empêcher les injections malveillantes.
- [ ] **Directives d'Écriture :** Seuls les utilisateurs authentifiés de la table `auth.users` disposent du droit de mutation (`INSERT`, `UPDATE`, `DELETE`) de la base de données.
- [ ] **Inscription Bloquée :** L'interrupteur d'inscription de compte public libre-service (`Allow signups`) de Supabase Auth est désactivé pour interdire tout enregistrement de comptes sauvages par des internautes.
- [ ] **Stockage Protégé :** Les compartiments physiques de fichiers (Buckets) possèdent des politiques d’upload restrictives pour réserver l'ajout d'images et de clips aux managers munis d'un token valide.

---

## 👁️ 3. Vérifications Fonctionnelles de l'Administration
- [ ] **Console de Login :** La console de connexion est joignable à l'adresse `/login` ou `#/login` et repousse automatiquement les faux mots de passe.
- [ ] **Garde Routière (Route Guard) :** Tenter de forcer la route `#/admin` dans l'adresse système sans être authentifié redirige automatiquement l'utilisateur indésirable vers la zone de connexion.
- [ ] **Garde d'État d'Édition :** Un clic sur sauvegarder actualise l'ensemble du site de production en temps réel sans nécessiter de rechargement.
- [ ] **Déconnexion opérationnelle :** Cliquer sur le bouton de déconnexion efface le jeton en mémoire volatile et sécurise l'appareil d'édition.

---

## 🎨 4. Vérifications Esthétiques et Responsives (Client UI)
- [ ] **Rendu visuel :** Les transitions fluides des cadres, le défilement et le rideau d'accueil cinématique se comportent à la perfection.
- [ ] **Intégration d'Arrière-Plan :** Les vidéos Hero s'exécutent de manière fluide et automatique sous forme de boucle, avec une image de poster de transition par défaut.
- [ ] **Compatibilité Mobile :** Les liens directs comme le bouton WhatsApp ou le bouton d'itinéraire de géolocalisation se comportent à la perfection sur iPhone (iOS Safari) et Android (Chrome).
- [ ] **Échelle de Conteneur :** Toutes les photographies culinaires conservent leur ratio d'échelle et d'aspect d'origine pour éviter tout étirement disgracieux.

---

## 🔍 5. Vérifications SEO et Référencement
- [ ] **Balises présentes :** La balise canonique, le titre principal, les mots-clés optimisés régionaux et la description se cachent bien dans l'en-tête HTML de l'inspection de page.
- [ ] **Optimisation Locale (Geo-SEO) :** Les coordonnées de latitude et longitude sont dument enregistrées dans les géotags pour le carrefour Tankpè à Calavi.
- [ ] **Données JSON-LD :** Le script de données structurées conforme de type `Restaurant` est détecté et validé par l'outil de test d'extraits enrichis de Google.
- [ ] **Index Crawlers :** Les fichiers complémentaires `robots.txt` et `sitemap.xml` sont présents à la racine de la zone d'indexation locale du serveur et renvoient les bons pointeurs de routes d'ancres.

---

## 🚀 6. Déploiement & DNS
- [ ] **SSL (HTTPS) :** Le site s'ouvre sous chiffrement HTTPS d'origine.
- [ ] **Redirection de Nom de Domaine :** Les adresses nues du type `restaurant-nova-grill.com` pointent de manière efficace vers `www.restaurant-nova-grill.com` (ou inversement).
- [ ] **Optimisation de Compression :** Les clichés haute résolution partagés dans la galerie pèsent tous moins de 400 Ko pour préserver l'enveloppe de données cellulaires de vos clients locaux.
