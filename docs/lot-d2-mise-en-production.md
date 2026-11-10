# Lot D.2 — Mise en production

> **Statut : PUBLIÉ** le 10 novembre 2026 sur **https://www.nova-baie.com**.
> Formulaire par envoi SMTP direct (sans Make), consentement Analytics conforme, réception confirmée par le propriétaire.

## 1. Déploiement

| Élément | Valeur |
|---|---|
| Commit publié | `4d7bfce` (branche `lot-final-publication`, poussée sur `origin`) |
| Déploiement de production | `dpl_9xnFxVYvJ8y59CWZUptb8C8cjJKN` · https://nova-baie-6petm9x3l-bluebaiesociety-9893s-projects.vercel.app |
| URL de production | https://www.nova-baie.com (alias de ce déploiement) |
| Prévisualisation validée avant publication | `dpl_7o7iDGkvKpNiU3FjtSqxUbRyPe3N` (même commit, alias de recette `nova-baie-recette.vercel.app`, protégé par l’authentification Vercel) |
| Ancienne production (point de restauration) | `dpl_ALXppFqKJihS6uhPLR12iQWuBbqS` (3 mai 2026) |
| Projet Vercel | `bluebaiesociety-9893s-projects/nova-baie` (déploiements par CLI) |

Les déploiements sont construits depuis un export propre du commit (`git archive`). Aucun fichier local n’est envoyé (`media-sources/`, `.env.local`, `artifacts/`). Analyse de l’export avant envoi : aucun secret, aucune capture d’administration non anonymisée.

## 2. Formulaire : envoi SMTP direct, sans Make

### Audit Blue Baie (lecture seule)

Dépôt `github.com/bluebaie/bluebaie`, cloné en lecture seule hors des projets (aucune modification) :
- `src/lib/serverEmail.ts` : Nodemailer, `service: "gmail"` ou `SMTP_HOST`/`SMTP_PORT`, authentification `SMTP_USER`/`SMTP_PASS` (ou `GMAIL_USER`/`GMAIL_PASS`, mot de passe d’application).
- `/api/contact` : contrôle d’origine, champ piège, validation, quota, `await transporter.sendMail()` avant de répondre ; le site écrit dans sa propre boîte.
- Le projet Vercel `bluebaie` possède ses propres variables Gmail (noms seuls consultés). Elles n’ont pas été réutilisées : le propriétaire a choisi un compte dédié, `contact.novabaie@gmail.com`, sans dépendance entre les sites.
- Blue Baie utilise `nodemailer 10.1.2`, concerné par trois avis de sécurité modérés sur l’analyse des adresses (corrigés à partir de 10.1.4). Nova Baie utilise `10.1.7`. Blue Baie n’a pas été modifié : mise à jour recommandée.

### Solution retenue

- `src/lib/serverEmail.ts` (Nodemailer 10.1.7) :
  - Gmail SMTP avec mot de passe d’application (`SMTP_USER`, `SMTP_PASS`) ; `SMTP_HOST`/`SMTP_PORT` optionnels ;
  - délais de connexion bornés ;
  - expéditeur authentifié « Site Nova Baie » `<contact.novabaie@gmail.com>`, destinataire `contact.novabaie@gmail.com` (`CONTACT_TO_EMAIL` optionnel) ;
  - visiteur en `Reply-To` uniquement ;
  - objet « Nova Baie — Nouvelle demande de contact » ;
  - HTML échappé et texte brut : nom, email, téléphone, structure, type de projet, message, date et heure (Paris), origine (formulaire FR/EN), référence technique ;
  - succès seulement si le serveur SMTP a accepté le destinataire.
- `/api/contact` : réponse 202 avec référence (`NB-…`) **après** acceptation SMTP ; 502/504 sans détail en cas d’échec ou de dépassement de délai (20 s). Journal serveur limité à l’événement, la référence, la durée et le code SMTP : jamais de contenu ni d’adresse.
- Protections conservées : origine, JSON uniquement, taille maximale, validation stricte (y compris contre l’injection d’en-têtes), champ piège, Upstash Redis (3 par email / 15 min, 100 / h au total), fermeture en cas d’indisponibilité (503).
- **Make supprimé** : code, appels HTTP, validation des réponses Make, textes du formulaire (« service de transmission »), politique de confidentialité, `.env.example`, et variables Vercel `MAKE_WEBHOOK_URL` et `NEXT_PUBLIC_MAKE_WEBHOOK_URL` du projet nova-baie. Le compte et le scénario Make n’ont pas été touchés.
- **Risque résiduel** : l’ancienne URL du webhook Make a été publique environ 200 jours (JavaScript de l’ancienne production, toujours servie par l’ancien déploiement conservé pour la restauration). Elle ne sert plus à Nova Baie. La désactiver ou la régénérer dans Make supprime ce risque.

### Configuration Vercel (noms seuls, valeurs jamais affichées)

`SMTP_USER`, `SMTP_PASS` (saisie par le propriétaire), `CONTACT_ALLOWED_ORIGINS`, `CONTACT_RATE_LIMIT_SECRET`, `CONTACT_KV_REST_API_URL`/`_TOKEN` (Upstash `nova-baie-contact-limiter`, offre gratuite, fra1), en Production et Preview.

### Essais réels

| Essai | Environnement | Résultat |
|---|---|---|
| Envoi vide | Preview | Bloqué par le navigateur, aucun appel |
| Email invalide, champ piège, champ inconnu | Preview | 400, aucun email |
| « TEST NOVA BAIE SMTP DIRECT (FR) », formulaire français | Preview | Succès, SMTP accepté, réf. `NB-41D9B47FEC` (795 ms) |
| « … (EN) », formulaire anglais | Preview | Succès, réf. `NB-A8083BFF23` (724 ms) |
| 3ᵉ envoi même email / 4ᵉ envoi | Preview | 202 (`NB-E370C8B320`) puis **429**, `Retry-After: 859`, aucun email |
| « … (production) » | **Production** | Succès, réf. `NB-7C8C6A716A` (859 ms) |
| `generate_lead` | Preview + production | Envoyé seulement après le 202, sous consentement, paramètres `form_id`, `project_type` (aucune donnée personnelle) |
| Rejet / non-distribution | — | Aucun message de rejet constaté |
| **Réception** | — | **Confirmée par le propriétaire** pour les 3 envois de la préversion dans `contact.novabaie@gmail.com`. La boîte n’est pas accessible depuis l’environnement de recette (navigateur non connecté à ce compte) : réception non observée directement par l’agent. Réception de l’envoi de production à confirmer |
| **Reply-To** | — | En-tête vérifié par test unitaire. Le propriétaire a répondu à un message ; **la réponse n’était pas arrivée dans `bluebaiesociety@gmail.com` 30 min après.** Hypothèse : l’email étant envoyé de `contact.novabaie@gmail.com` à lui-même, Gmail peut le traiter comme un message « envoyé par moi » et diriger la réponse vers lui-même. À vérifier (§7). L’adresse du prospect figure toujours dans le message, cliquable |

## 3. Consentement et mesure d’audience

Contrôles réels en production (Chrome) : première visite **sans aucune requête tierce** (ni GTM ni Google), panneau Refuser / Personnaliser / Accepter. Après acceptation : `page_view` avec Consent Mode v2 (`gcs=G101`, mesure accordée, publicité refusée), cookies `_ga` et `_ga_J6GHY673DS` à 395 jours. Refus, modification ultérieure et retrait validés au lot précédent. Seules les visites consenties sont mesurées. Les traces de test ont été effacées du navigateur de recette.

## 4. Domaine, redirections, routage

| Vérification | Résultat |
|---|---|
| `https://www.nova-baie.com` | 200, HSTS 2 ans, `X-Frame-Options`, `nosniff`, `Referrer-Policy` |
| `http://www.nova-baie.com` | 308 → HTTPS |
| `https://nova-baie.com/<chemin>` | **308** → `https://www.nova-baie.com/<chemin>` (passé de 307 temporaire à 308 permanent pendant ce lot) |
| `/fr/services` | 307 → `/services`, sans boucle |
| URL française avec un navigateur anglais | 200 en français (aucune redirection de langue) |
| Page inexistante | 404 |
| Anciennes URL | Toutes les URL de l’ancien sitemap existent toujours |

## 5. SEO opérationnel (production)

Audit `node scripts/seo-audit.mjs https://www.nova-baie.com --external` sur les 24 URL du sitemap : **aucun problème**. Contrôles : statut 200, title et description, canonical exact, hreflang fr/en/x-default, pas de `noindex`, un seul H1, aucun saut de titre, `alt` partout, JSON-LD valide, Open Graph et Twitter, `lang`, 26 liens internes. `robots.txt` et `sitemap.xml` en 200. Liens externes : 200, sauf LinkedIn (403 opposé aux robots) et CycloSport Crotellois (voir §6). 85 médias vérifiés en préversion.

## 6. CycloSport Crotellois

`www.cyclosportcrotellois.fr` ne résout toujours pas (DNS introuvable, y compris via 8.8.8.8). Le lien définitif est conservé tel quel, sans mention provisoire, conformément à la décision du propriétaire : l’indisponibilité temporaire est acceptée et ne bloque pas la publication. À contrôler dès le raccordement du domaine.

## 7. Points restants

1. **Reply-To** : dans `contact.novabaie@gmail.com`, ouvrir le dossier « Messages envoyés » et vérifier le destinataire de la réponse de test. Si Gmail a répondu à `contact.novabaie@gmail.com` au lieu du prospect, la correction simple consiste à envoyer depuis une autre adresse (variable `EMAIL_FROM`, par exemple un alias d’envoi), sans modifier le code.
2. Confirmer la réception de l’envoi de production (`NB-7C8C6A716A`).
3. Désactiver ou régénérer l’ancien webhook Make (URL publique pendant environ 200 jours).
4. Mettre à jour Nodemailer dans Blue Baie (10.1.2 → ≥ 10.1.4).
5. Domaine CycloSport Crotellois.
6. Si l’ancienne production n’est plus nécessaire pour une restauration, son JavaScript contenant l’ancien webhook peut être supprimé de Vercel après la période d’observation.

## 8. Restauration

`vercel rollback dpl_ALXppFqKJihS6uhPLR12iQWuBbqS` (ou Vercel → Deployments → ce déploiement → « Promote to Production »). Effet immédiat, sans reconstruction. L’ancienne version renverrait au formulaire Make (variable compilée dans son build) et à GTM sans consentement : n’utiliser qu’en cas d’incident majeur.

## 9. Search Console (accès au compte requis)

Une propriété `nova-baie.com` existe déjà sur le compte `bluebaiesociety@gmail.com` (alertes reçues depuis avril 2026).
1. Vérifier qu’il s’agit d’une propriété **Domaine** (sinon l’ajouter par enregistrement DNS TXT). `GOOGLE_SITE_VERIFICATION` est disponible pour une propriété préfixe d’URL.
2. Soumettre `https://www.nova-baie.com/sitemap.xml`.
3. Inspecter puis demander l’indexation de `/`, `/services`, `/realisations`, `/realisations/cyclosport-crotellois`, `/contact`, `/en`.
4. Suivre « Pages » et « Performances ».
5. Relier GA4 et Search Console ; marquer `generate_lead` comme événement clé dans GA4.

L’indexation n’est ni immédiate ni garantie.

## 10. Tests du code

ESLint et TypeScript sans erreur ; 79 tests unitaires réussis (contact SMTP, contenu de l’email, Reply-To, limiteur, consentement, routage, SEO) ; build de production réussi. Aucune modification du design, des études de cas, de l’ordre des projets ou du visuel CSC.
