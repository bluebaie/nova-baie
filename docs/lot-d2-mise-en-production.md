# Lot D.2 — Mise en production

> **Statut : NON PUBLIÉ.** Tous les contrôles techniques de la prévisualisation sont réussis, mais deux points bloquants restent ouverts (§7). Conformément à la consigne, la production n’a pas été modifiée : `www.nova-baie.com` sert toujours le déploiement du 3 mai 2026.

## 1. Commit, branche et déploiements

| Élément | Valeur |
|---|---|
| Branche | `lot-final-publication` (poussée sur `origin`, 18 commits au-dessus de `origin/main`, fast-forward possible) |
| Commit validé en prévisualisation | `15c601e` |
| Prévisualisation validée | `dpl_5wVskLTa8V4ramVPuQMHFKWUk7GG` · https://nova-baie-lljx0pr6n-bluebaiesociety-9893s-projects.vercel.app (alias de recette `nova-baie-recette.vercel.app`, protégé par l’authentification Vercel) |
| Prévisualisation précédente | `dpl_3ysiCRBQkympbiPT4KKQkAHYYiaE` (commit `a3fea24`) |
| Production actuelle (inchangée) = point de restauration | `dpl_ALXppFqKJihS6uhPLR12iQWuBbqS` · https://nova-baie-pxye12xb1-bluebaiesociety-9893s-projects.vercel.app · alias `www.nova-baie.com`, `nova-baie.com` |
| Projet Vercel | `bluebaiesociety-9893s-projects/nova-baie`, déploiements par CLI (pas d’intégration Git) |
| `main` | non modifié (`bbea356`) |

Les déploiements sont construits depuis un export propre du commit (`git archive`) : aucun fichier local (`media-sources/`, `.env.local`, `artifacts/`) ne peut être envoyé. Analyse de l’export avant envoi : aucun secret, aucune capture d’administration non anonymisée.

## 2. Consentement et mesure d’audience

**Audit** : le conteneur GTM `GTM-MV4VJGBB` ne contient que Google Analytics 4 (`G-J6GHY673DS` : balise Google sur `gtm.init` et un événement GA4 sur chaque page), sans condition de consentement. Aucun autre traceur (Meta, Ads, LinkedIn, Hotjar…). **Le site en ligne collecte donc sans consentement** jusqu’à la publication de ce lot.

**Correction** :
- GTM n’est plus chargé par le layout. Il n’est injecté qu’après acceptation. Le `<noscript>` GTM, qui chargeait GTM sans consentement, est supprimé.
- Panneau non bloquant « Tout refuser / Personnaliser / Tout accepter », trois boutons de même poids, accessible au clavier. Choix conservé 6 mois, puis redemandé. Lien « Gérer les cookies » dans le pied de page de chaque page.
- Consent Mode v2 : `default` tout refusé, puis `update` mesure accordée, publicité refusée ; `ads_data_redaction`.
- Durée des cookies GA limitée à 395 jours (13 mois, recommandation CNIL ; GA4 utilise 2 ans par défaut).
- Retrait : statut refusé, suppression des cookies `_ga*`, rechargement sans GTM.
- Politique « Données personnelles » et « Cookies » mise à jour (FR/EN), ancre `#cookies`.

**Vérification réelle dans Chrome** (prévisualisation) :

| Scénario | Résultat |
|---|---|
| Première visite, aucun choix | Aucun script GTM, aucune requête Google, pas de `dataLayer` |
| Tout refuser | Choix enregistré, toujours aucune requête Google |
| Rouvrir via « Gérer les cookies » | Panneau détaillé, interrupteur à l’état enregistré |
| Tout accepter | `gtm.js`, `gtag/js`, puis `g/collect` `page_view` avec `gcs=G101` (mesure accordée, publicité refusée) ; cookies `_ga`, `_ga_J6GHY673DS` à 395 jours |
| Retrait (anglais, « Refuse all ») | Cookies GA supprimés, page rechargée sans GTM ni requête Google |
| Version anglaise | Panneau, lien « Manage cookies » et formulaire traduits |

**Conséquence sur la mesure** : seules les visites consenties seront mesurées ; les volumes GA4 baisseront par rapport à la collecte actuelle, non conforme.

## 3. Formulaire de contact

**Avant** (site en ligne) : le navigateur envoyait directement au webhook Make via `NEXT_PUBLIC_MAKE_WEBHOOK_URL`, donc l’URL du webhook était lisible dans le JavaScript public. Le message de succès s’affichait **sans vérifier la réponse**, et un échec de Make passait inaperçu. Aucune limitation anti-abus.

**Après** : route serveur `/api/contact` (origine autorisée, JSON uniquement, validation stricte, champ piège, taille max, limitation 3 envois / 15 min par email et 100 / h au total), puis transmission au **même** webhook Make (aucune seconde automatisation). Succès affiché uniquement sur réponse 202.

Configuration Vercel ajoutée (valeurs jamais affichées) :
- `MAKE_WEBHOOK_URL` (copie serveur du webhook existant) ;
- `CONTACT_ALLOWED_ORIGINS` (production : `www.nova-baie.com`, `nova-baie.com` ; préversion : `nova-baie-recette.vercel.app`) ;
- `CONTACT_RATE_LIMIT_SECRET` (aléatoire) ;
- Upstash for Redis `nova-baie-contact-limiter`, **offre gratuite**, région fra1 (Francfort), relié à Production et Preview (`CONTACT_KV_REST_API_*`).

**Tests réels dans Chrome** :

| Test | Résultat |
|---|---|
| Envoi vide | Bloqué par le navigateur (nom, email, message), aucun appel serveur |
| Email invalide / champ piège rempli / champ inconnu | 400, rien n’est transmis à Make |
| GET sur l’API | 405 |
| « TEST NOVA BAIE » (≈ 10 h 20) | 202, message de succès affiché |
| « TEST NOVA BAIE (2/2) » (≈ 10 h 35) | 202, message de succès, `generate_lead` reçu par GA4 |
| JavaScript public | Aucune trace du webhook ni des secrets Redis (14 scripts analysés) |
| **Réception par l’entreprise** | ❌ **Non reçue** selon le propriétaire. Absente aussi de `bluebaiesociety@gmail.com` |

Un 202 signifie seulement que Make a accepté la requête. Un webhook Make répond « Accepted » même si le scénario est désactivé (les données sont alors mises en file d’attente). La charge utile envoyée est identique à celle de l’ancien formulaire (`nom, email, telephone, structure, typeProjet, message, source, date`). Le blocage se situe donc dans Make : scénario, connexion email ou destinataire. Comme l’ancien formulaire ne contrôlait pas la réponse, **il est possible que des demandes du site en ligne aient déjà été perdues**.

**Conversion** : `generate_lead` est envoyé seulement après le 202 serveur, avec consentement, sans donnée personnelle (`form_id`, `project_type`, `language`). Première tentative non transmise par la balise Google de GTM ; corrigée avec `send_to: G-J6GHY673DS`, puis vérifiée (`g/collect en=generate_lead`).

## 4. Domaine et redirections (production actuelle)

- `https://www.nova-baie.com` : 200, HSTS 2 ans, servi par Vercel (cdg1). URL canonique unique.
- `http://` → `https://` : 308.
- `https://nova-baie.com` → `https://www.nova-baie.com` : **307 (temporaire)**. À passer en 308 permanent dans Vercel → Domains (`nova-baie.com` → Redirect to `www.nova-baie.com`, 308) au moment de la publication.
- Anciennes URL : toutes les URL du sitemap en ligne existent dans la nouvelle version (aucune redirection nécessaire). `/fr/…` → `/…` sans boucle (tests unitaires + préversion). Plus de redirection selon la langue du navigateur ou du cookie.

## 5. CycloSport Crotellois

`www.cyclosportcrotellois.fr` et `cyclosportcrotellois.fr` ne résolvent pas, y compris via le DNS public de Google (8.8.8.8), et le domaine n’est pas rattaché au compte Vercel. Le domaine ne semble pas enregistré ou pointé. **Bloquant de publication** sur décision du propriétaire. Le lien reste configuré tel quel, sans statut provisoire.

## 6. SEO opérationnel

Contrôles sur la prévisualisation (session authentifiée, 24 URL du sitemap) : 200, canonical exact vers `https://www.nova-baie.com…`, aucun `noindex`, un seul H1, Open Graph présent, 85 médias en 200, pas de GTM ni de webhook dans le HTML. `robots.txt` et `sitemap.xml` (avec alternates hreflang) validés au lot précédent.

**Après la publication**, à refaire sur l’URL publique : `robots.txt`, `sitemap.xml`, canonicals/hreflang, données structurées (Test des résultats enrichis), aperçus de partage, redirection 308 de l’apex.

**Search Console** : une propriété `nova-baie.com` existe déjà sur le compte `bluebaiesociety@gmail.com` (alertes reçues depuis avril 2026). Actions nécessitant l’accès au compte :
1. Vérifier que c’est une propriété **Domaine**. Sinon, l’ajouter (vérification DNS TXT chez le registrar ; `GOOGLE_SITE_VERIFICATION` reste disponible pour une propriété préfixe d’URL).
2. Soumettre `https://www.nova-baie.com/sitemap.xml`.
3. Inspecter puis demander l’indexation de : `/`, `/services`, `/realisations`, `/realisations/cyclosport-crotellois`, `/contact`, `/en`.
4. Suivre « Pages » (la nouvelle structure doit remplacer les anciens motifs « Page avec redirection » et « Exclue par la balise noindex » signalés en 2026) et « Performances ».
5. Relier GA4 à Search Console ; marquer `generate_lead` comme événement clé dans GA4.

L’indexation n’est ni immédiate ni garantie.

## 7. Blocages restant à résoudre

1. **Réception des messages (Make)**. Dans Make, ouvrir le scénario du webhook du site :
   - vérifier que le scénario est **activé** ;
   - consulter l’historique et la file du webhook : les deux messages « TEST NOVA BAIE » du 10 novembre doivent y figurer (s’ils sont en file, le scénario est arrêté) ;
   - vérifier la connexion du module d’envoi d’email (souvent une autorisation Gmail expirée) et l’adresse destinataire ;
   - relancer : les deux tests devraient alors arriver.
   
   Une fois la réception confirmée, la publication peut reprendre sans nouveau développement.
2. **Domaine CycloSport Crotellois** : enregistrer et pointer `cyclosportcrotellois.fr` (www), puis vérifier HTTPS.
3. **Webhook exposé** : l’URL du webhook Make est publique depuis environ 200 jours dans le JavaScript du site en ligne. Après publication, régénérer l’URL du webhook dans Make, mettre à jour `MAKE_WEBHOOK_URL` dans Vercel, puis supprimer `NEXT_PUBLIC_MAKE_WEBHOOK_URL`.

## 8. Procédure de publication (une fois les blocages levés)

1. `vercel deploy --prod` depuis un export propre de `15c601e`, ou `vercel promote dpl_5wVskLTa8V4ramVPuQMHFKWUk7GG` (préversion déjà validée ; les variables de production existent déjà).
2. Apex en 308 vers `www`.
3. Contrôles HTTP et Chrome sur `https://www.nova-baie.com` (consentement, formulaire avec un message « TEST NOVA BAIE », pages, sitemap).
4. Fast-forward de `main` sur `lot-final-publication`, puis push.

## 9. Retour arrière

Production actuelle : `dpl_ALXppFqKJihS6uhPLR12iQWuBbqS`. Après une publication, en cas de problème : `vercel rollback dpl_ALXppFqKJihS6uhPLR12iQWuBbqS` (ou Vercel → Deployments → ce déploiement → « Promote to Production »). Effet immédiat, sans reconstruction. Les nouvelles variables d’environnement n’affectent pas l’ancien déploiement.

## 10. Tests du code

ESLint et TypeScript sans erreur ; 80 tests unitaires réussis (dont consentement et routage). Builds de prévisualisation Vercel : succès.
