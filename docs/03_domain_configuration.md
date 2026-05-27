# 🌐 03 - Liaison DNS & Configuration de Nom de Domaine Personnalisé

## 1. Objectif du fichier
Ce guide détaille de bout en bout la démarche réseau permettant de relier votre plateforme Nova Grill installée sur Vercel à votre nom de domaine professionnel de marque (Exemple : `restaurant-nova-grill.com` ou `novagrill.com`), d'harmoniser le routage et de chiffrer l'ensemble de l'expérience utilisateur.

---

## 2. Ce que ce fichier va accomplir
En parcourant cet ouvrage d'ingénierie DevOps, vous allez :
* Découvrir comment lier vos serveurs Vercel à votre bureau d'enregistrement DNS (LWS, Hostinger, OVH, GoDaddy...).
* Configurer les pointages réseau incontournables (directeurs d’aiguillage) pour le nom de domaine nu et le sous-domaine `www`.
* Automatiser la redirection universelle contre le duplicate content.
* Valider la signature et la mise en cache de l'autorité de chiffrement SSL.

---

## 3. Pré-requis
* Disposer du nom de domaine professionnel acheté chez votre bureau d'enregistrement (Registrar).
* Votre application doit être compilée et déployée sur Vercel d'origine ([`02_vercel_deployment.md`](./02_vercel_deployment.md)).
* Accéder à l'interface de contrôle technique DNS de votre registraire.

---

## 4. Étapes Détaillées

### Étape 4.1 : Enregistrement du Domaine sur la Plateforme Vercel
1. Ouvrez votre console projet d'administration sur **Vercel**.
2. Allez sur l’onglet supérieur **"Settings"** (Paramètres), puis cliquez sur **"Domains"** dans l'arborescence de gauche.
3. Saisissez le nom exact en minuscules (Exemple : `restaurant-nova-grill.com`) et cliquez sur le bouton bleu **"Add"**.
4. Vercel va analyser le domaine et vous suggérer d'injecter deux variantes afin d'assurer l'accessibilité globale :
   * Le domaine nu : `restaurant-nova-grill.com`
   * Le sous-domaine : `www.restaurant-nova-grill.com`
5. Sélectionnez la configuration recommandée qui redirige automatiquement le domaine nu `restaurant-nova-grill.com` vers sa version complète `www.restaurant-nova-grill.com` pour maximiser la conservation des performances de recherche (Link juice SEO).

### Étape 4.2 : Configuration DNS de Pointage chez votre Hébergeur (Registrar)
Connectez-vous sur votre console d'hébergement d'origine (Ex: Hostinger, OVH...). Ouvrez l'outil de gestion de la **Zone DNS** (DNS Zone Editor) et apportez les deux modifications cruciales :

#### Modification 1 : Mettre à jour l'enregistrement d'origine `A` (Domaine Nu)
Cet aiguilleur relie directement la marque racine aux serveurs centraux de diffusion Vercel.
* **Type d'enregistrement :** `A`
* **Hôte/Host/Sous-domaine :** `@` (ou laissez ce champ vide)
* **Cible/Valeur/Destination :** `76.76.21.21` (Adresse IP fixe de diffusion planétaire de Vercel)
* **TTL :** Par défaut ou `3600` secondes

#### Modification 2 : Enregistrer le pointeur de type `CNAME` (Sous-domaine `www`)
Mappe le trafic du sous-domaine sur le réseau d'équilibrage de charge dynamique de Vercel.
* **Type d'enregistrement :** `CNAME`
* **Hôte/Host/Sous-domaine :** `www`
* **Cible/Valeur/Destination :** `cname.vercel-dns.com.` (Insérez le point final si réclamé par votre hébergeur d'origine)
* **TTL :** Par défaut ou `3600` secondes

```
┌─────────────────────────────────────────────────────────────┐
│               Zone DNS à configurer chez l'Hébergeur       │
├─────────────────────────────────────────────────────────────┤
│  • Type A     │ Hôte : @   │ Valeur : 76.76.21.21           │
│  • Type CNAME │ Hôte : www │ Valeur : cname.vercel-dns.com. │
└─────────────────────────────────────────────────────────────┘
```

### Étape 4.3 : Propagation Globale et Validation SSL
1. Retournez dans l'onglet "Settings" > "Domains" de votre console Vercel.
2. Vercel effectue automatiquement un ping toutes les 15 secondes pour interroger l'état global de propagation de vos nouvelles coordonnées DNS.
3. Dès que l'aiguillage est résolu sur Terre, la mention d'attente rouge `"Pending Domain Verification"` s'efface pour laisser place à la certification de conformité verte **`"Valid Configuration"`**.
4. Vercel sollicite alors de manière indépendante l'autorité **Let's Encrypt** afin de générer votre certificat de chiffrement d'origine SSL. Cette étape est immédiate et s'exécute en moins de 30 secondes.

---

## 5. Explications Ultra Pédagogiques
Le protocole DNS agit comme l'annuaire universel de l'Internet. Quand un client à Cotonou ou à Calavi saisit `novagrill.com`, son navigateur interroge les serveurs racines DNS mondiaux pour traduire ce nom textuel en adresse IP matérielle (Ex: `76.76.21.21`). En redirigeant les serveurs de pointage DNS d'origine vers l'infrastructure d'optimisation intelligente de Vercel, l'intégralité du trafic Web mondial transite par des serveurs proxy à haute connectivité, ce qui sécurise et accélère le chargement de votre site d'art culinaire.

---

## 6. Captures Mentales / Explications Visuelles

```
[ Navigateur Visiteur ] ── Saisit www.novagrill.com ──> [ Serveur DNS Local ]
                                                                │
                                                         Interroge Zone DNS
                                                                ▼
[ Navigateur Visiteur ] <── Obtient cname.vercel-dns.com ───────┘
          │
          └─(Se connecte de manière chiffrée HTTPS SSL)──> [ CDN Vercel ]
                                                                │
                                              Sert la Landing Page de Nova Grill !
```

---

## 7. Erreurs Fréquentes

### Erreur A : Conflit d'enregistrements multiples de type `A`
* **Symptômes :** Accès instable au site (Un coup il charge Vercel, un coup il renvoie vers une page d'attente d'hébergement par défaut ou une erreur DNS).
* **Cause :** Il existe plusieurs enregistrements de type `A` sur l'hôte racine `@` qui s'affrontent en parallèle pour l'autorité de domaine.

### Erreur B : Message de sécurité "La connexion à ce site n'est pas sécurisée"
* **Symptômes :** Page de garde rouge de Google Chrome bloquant l'accès à la landing page.
* **Cause :** Le certificat SSL est en cours de création ou la propagation DNS n'est pas terminée au niveau mondial.

---

## 8. Solutions

### Résolution pour l'Erreur A :
1. Allez dans le gestionnaire de zone DNS de votre bureau d'enregistrement.
2. Recherchez les anciens enregistrements de type `A` ou `AAAA` qui pointent vers les adresses IP d'origine de votre registraire.
3. Supprimez-les impérativement. Conservez un seul et unique enregistrement de type `A` ciblant la valeur exclusive `76.76.21.21`.

### Résolution pour l'Erreur B :
1. Patientez 5 à 15 minutes sans recharger de manière intensive. La propagation DNS mondiale réclame parfois un court temps de latence technique pour se répercuter sur l'ensemble des continents de la planète.
2. Si le problème persiste après 2 heures, assurez-vous de n'avoir configuré aucune restriction d'autorité de certification de type CAA dans vos lignes DNS.

---

## 9. Checklist de Validation
- [ ] Le domaine complet est correctement enregistré dans les options d'hébergement Vercel.
- [ ] L'ancien paramétrage DNS de type `A` est nettoyé pour écarter tout conflit.
- [ ] L'aiguillage de type `A` sur la racine pointe exclusivement sur `76.76.21.21`.
- [ ] L'aiguillage de type `CNAME` sur le sous-domaine `www` pointe sur `cname.vercel-dns.com.`.
- [ ] Saisir l'adresse sans le sous-domaine redirige vers l'adresse d'autorité chiffrée HTTPS de destination : `https://www.restaurant-nova-grill.com`.
