# 🌐 14 - Custom Domain & DNS configuration

## 1. Objectif du fichier
Ce guide explique comment acquérir et associer un nom de domaine personnalisé premium (ex : `restaurant-nova-grill.com`) à votre serveur web Vercel, configurer les enroulements DNS (Domain Name System), activer la redirection automatique entre domaine nu et sous-domaine `www`, et générer le certificat d'autorité SSL de sécurité.

---

## 2. Pré-requis
* Détenir un nom de domaine valide réservé chez un registraire de confiance (Nominet, OVH, Hostinger, Namecheap, LWS...).
* Avoir déployé avec succès son application sur Vercel ([`13_deployment.md`](./13_deployment.md)).

---

## 3. Associer le Domaine sur la console Vercel

1. Sur votre tableau de bord **Vercel**, ouvrez les paramètres du projet et cliquez sur le menu **"Settings"** de la barre supérieure.
2. Cliquez sur l'onglet **"Domains"** dans la barre d'outils de gauche.
3. Saisissez votre adresse web ciblée dans le champ d'entrée de saisie en écriture directe (ex : `restaurant-nova-grill.com` ou `www.restaurant-nova-grill.com`).
4. Cliquez sur le bouton d'ajout : **"Add"**.
5. Vercel vous suggère alors d'enregistrer deux déclinaisons pour assurer une accessibilité complète :
   * Le domaine nu : `restaurant-nova-grill.com` (Root domain)
   * Le sous-domaine complet : `www.restaurant-nova-grill.com`
6. Nous vous conseillons de configurer la redirection automatique par défaut du root vers le sous-domaine `www` (ou l'inverse selon votre préférence de marque) afin de rassembler l'ensemble de votre autorité et de l'historique d'indexation SEO.

---

## 4. Configuration DNS chez votre Bureau d'Enregistrement (Registrar)

Connectez-vous sur l'interface d'administration réseau de votre hébergeur de domaine d'origine (ex : OVH, Hostinger...), allez dans l'onglet de gestion de **zone DNS** et configurez ces deux enregistrements incontournables :

### 1. Enregistrement A (Pour le domaine nu : `restaurant-nova-grill.com`)
Raccorde votre nom d'origine à l'adresse IP globale d'écoute des serveurs CDN internationaux de Vercel.
* **Type d'enregistrement :** `A`
* **Hôte/Host/Sous-domaine :** `@` (ou laissez ce champ vide)
* **Cible/Valeur/Value :** `76.76.21.21` (Adresse IP de pointage officielle d'entrée Vercel)
* **TTL :** Par défaut ou `3600` secondes

### 2. Enregistrement CNAME (Pour le sous-domaine : `www.restaurant-nova-grill.com`)
Fait pointer le sous-domaine vers le pont de routage intelligent de Vercel.
* **Type d'enregistrement :** `CNAME`
* **Hôte/Host/Sous-domaine :** `www`
* **Cible/Valeur/Value :** `cname.vercel-dns.com.` (N'oubliez pas le point de fin si requis par votre interface registraire)
* **TTL :** Par défaut ou `3600` secondes

```
┌─────────────────────────────────────────────────────────────┐
│                 Zone DNS du Registrar                       │
├─────────────────────────────────────────────────────────────┤
│  • Type A     | Host: @   | Value: 76.76.21.21              │
│  • Type CNAME | Host: www | Value: cname.vercel-dns.com.    │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Attestation de Certificat de Sécurité HTTPS (SSL)

Une fois les enregistrements DNS validés chez le registraire, Vercel va automatiquement interroger l'autorité de certification gratuite **Let's Encrypt** pour générer et lier un certificat SSL de type Wildcard.
* **Délai d'activation :** Les serveurs DNS mondiaux mettent en moyenne **5 minutes à 2 heures** pour propager de nouveaux réglages sur Terre (la propagation totale prend parfois exceptionnellement jusqu'à 24h).
* Pendant ce temps de transit, l'interface d'administration Vercel affiche l'étiquette rouge de vérification `"Pending Domain Verification"`. Dès que le routage est opérationnel, l'état bascule au vert étiqueté `"Valid Configuration"`.

---

## 6. Erreurs DNS Fréquentes & Corrections rapides

### Erreur A : Conflit d'enregistrements multiples (Erreur critique)
* **Symptôme :** Le site s'affiche de manière intermittente ou charge une page blanche ou une erreur de certificat SSL.
* **Cause :** Votre panneau de zone DNS contient de vieux enregistrements résiduels de type `A` ou `TXT` pointant vers un vieil hébergeur qui entrent en compétition avec les nouvelles directives Vercel.
* **Résolution :** Supprimez impérativement tous les anciens pointeurs de type `A` qui ciblent des adresses IP distinctes de `76.76.21.21` pour déléguer l'exclusivité du routage à Vercel.

### Erreur B : Le site s'affiche en version non sécurisée ("Votre connexion n'est pas privée")
* **Cause :** Le certificat SSL est en cours de propagation et n'est pas encore validé.
* **Résolution :** Patientez quelques minutes sans rafraîchir frénétiquement. Si l'erreur persiste au-delà de 2 heures, assurez-vous que les serveurs DNS secondaires d'OVH ou Hostinger ne filtrent pas les requêtes de signatures de certificats CAA.

---

## 7. Checklist Finale d'Évaluation de Fin d'Étape
* [ ] Saisir `restaurant-nova-grill.com` (sans le www) redirige instantanément l'utilisateur vers `https://www.restaurant-nova-grill.com`.
* [ ] L'icône de cadenas vert de chiffrement apparaît dans la barre d'adresse de tous les navigateurs de vos visiteurs.
* [ ] Le statut du domaine affiche `"Valid Configuration"` sur la console d'administration de Vercel.
