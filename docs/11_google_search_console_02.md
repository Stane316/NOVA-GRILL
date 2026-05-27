# 🔍 11 - Google Search Console (Partie 2 : Plan du Site & Soumission Sitemap)

## 1. Objectif du fichier
Ce guide explique comment cartographier les sections narratives de votre site immersif et soumettre de manière officielle le fichier d'arborescence (Sitemap) à Google Search Console pour indexer Nova Grill instantanément.

---

## 2. Ce que ce fichier va accomplir
En suivant cette documentation, vous allez :
* Découvrir l'emplacement et la composition du plan du site de Nova Grill (`sitemap.xml`).
* Déposer de manière formelle votre plan de site dans les serveurs d'administration de Google.
* Forcer les robots d'indexation (Googlebot) à visiter le site pour référencer la carte culinaire.
* Interpréter l'état de retour d'analyse fourni par la console.

---

## 3. Pré-requis
* Avoir validé et authentifié l'autorité d'accès DNS à votre Search Console ([`10_google_search_console_01.md`](./10_google_search_console_01.md)).
* Le site de production de Nova Grill doit être déployé et accessible en direct sur HTTPS ([`02_vercel_deployment.md`](./02_vercel_deployment.md)).
* Votre sitemap doit être déposé à la racine de votre hébergement publique.

---

## 4. Étapes Détaillées

### Étape 4.1 : Localisation et Vérification du Sitemap de Nova Grill
1. Ouvrez votre navigateur et saisissez l'adresse physique absolue d'accès à votre plan (Exemple : `https://www.restaurant-nova-grill.com/sitemap.xml`).
2. Le navigateur doit afficher une arborescence XML d'indexation saine, révélant la page d'accueil avec les priorités de rafraîchissement correspondantes, comme suit :
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.restaurant-nova-grill.com/</loc>
    <lastmod>2026-05-27</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Étape 4.2 : Soumission du Plan du Site dans l'Interface Google
1. Connectez-vous sur votre tableau de bord de la [Google Search Console](https://search.google.com/search-console).
2. Dans la barre d'outils latérale de gauche, sous le titre **"Indexation"**, cliquez sur l'onglet **"Sitemaps"**.
3. Une zone de saisie nommée **"Ajouter un sitemap"** s'affiche. L'URL d'autorité de votre domaine est pré-remplie.
4. Saisissez le chemin relatif d'accès exact dans le champ d'entrée : **`sitemap.xml`**.
5. Cliquez sur le bouton bleu **"Envoyer"** (Submit).

### Étape 4.3 : Évaluation du Point de Retour d'Indexation
1. Après l'appui, une petite fenêtre de dialogue s'ouvre : **"Le sitemap a été transmis avec succès"**.
2. Dans la table d'historique nommée **"Sitemaps envoyés"** en dessous, surveillez l'apparition de la ligne soumise :
   * **Statut :** Il doit afficher la mention verte **`"Opération réussie"`** (Success).
   * **Pages découvertes :** Google affiche le nombre total de pages répertoriées (Exemple : `1` pour notre SPA immersive ultra-saturée en contenu narratif).

### Étape 4.4 : Demande de Forçage Manuel d'Exploration (Inspection d'URL)
Si vous venez d'ouvrir le restaurant et souhaitez figurer sur Google sans attendre le passage aléatoire des robots de recherche :
1. En haut de votre console d'administration, cliquez sur la grande barre d'entrée de saisie de recherche : **"Inspecter n'importe quelle URL..."**.
2. Saisissez l'adresse URL absolue de votre site (Exemple : `https://www.restaurant-nova-grill.com/`).
3. Appuyez sur la touche `Entrée` de votre clavier.
4. Google va interroger la page en direct. Si la page n'est pas encore consignée, cliquez sur le bouton d'autorité : **"Demander une indexation"** (Request Indexing).

---

## 5. Explications Ultra Pédagogiques
Le fichier `sitemap.xml` est le plan architectural (la carte routière) transmis directement aux ingénieurs d'exploration de Google. Au lieu de laisser le robot Googlebot chercher de manière hasardeuse au milieu des méandres d'Internet pour localiser votre adresse de restaurant, la soumission de sitemap lui ouvre une porte d'entrée directe, accélérant le catalogage de votre marque gastronomique en moins de 24 heures !

---

## 6. Captures Mentales / Explications Visuelles

```
[ Votre Sandbox de Code ] ── Déploie sitemap.xml ──> [ Serveur Vercel Public ] Web
                                                                 │
                                                       (Vous déclarez le plan)
                                                                 ▼
[ Google Search Console ] ── Transmet l'arborescence ──> [ Googlebot Crawler ]
                                                                 │
                                                    (Indexation prioritaire à 100% !)
                                                                 ▼
                                                    [ Résultats Google Live ! ]
```

---

## 7. Erreurs Fréquentes

### Erreur A : Statut de soumission rouge affichant "Impossible de lire le sitemap"
* **Symptômes :** La ligne d'historique de sitemap s'affiche de couleur rouge avec une alerte d'échec technique.
* **Cause 1 :** L'adresse réseau définie dans l'arborescence XML `<loc>` utilise un autre nom de domaine que celui lié à votre Search Console.
* **Cause 2 :** Votre site n'est pas accessible publiquement ou retourne un code d'erreur réseau HTTP distinct du code de validation 200.

### Erreur B : Nombre de pages découvertes égal à 0
* **Symptômes :** Google confirme l'opération d'extraction mais ne découvre aucun contenu de page.
* **Cause :** Syntaxe XML mal forgée (balise orpheline ou mauvaise casse des attributs de balises).

---

## 8. Solutions

### Résolution pour l'Erreur A :
1. Ouvrez votre fichier `/public/sitemap.xml` et assurez-vous que toutes les adresses consignées rédigent de manière identique votre adresse URL canonique absolue HTTPS de production.
2. Validez que le fichier est bien accessible en ouvrant votre navigateur d'évaluation en mode privé. S'il s'affiche, la Search Console corrigera d'elle-même sa lecture lors du prochain essai (vous pouvez forcer un rafraîchissement d'essai).

### Résolution pour l'Erreur B :
1. Validez votre fichier sitemap avec un outil de validation XML gratuit en ligne.
2. Corrigez les balises, compilez à nouveau l'application, puis poussez la mise à jour sur Git pour mettre à disposition de Google une version de sitemap saine.

---

## 9. Checklist de Validation
- [ ] Le plan sitemap est joignable de manière opérationnelle à la racine publique de votre site.
- [ ] Le fichier sitemap est déclaré et envoyé dans l'onglet approprié de Google Search Console.
- [ ] Le statut d'analyse de Google est de couleur verte : **"Opération réussie"**.
- [ ] Une inspection d'URL sur l'adresse racine a été sollicitée pour forcer Googlebot à visiter le site.
- [ ] Les priorités d'importance (`priority`) et fréquences de mise à jour (`changefreq`) sont respectées.
