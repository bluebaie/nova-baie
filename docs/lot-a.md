# LOT A — consolidation locale

## Périmètre et référence

Départ : `bbea356f9d6fe971c0a815be2f0310039a81a8e3`, branche `main` propre.
Travail : `refonte-nova-baie-2026`. Aucune modification de main, aucun push,
déploiement, migration ou appel aux services clients.

AGENTS.md et CLAUDE.md lus. `node_modules/next/dist/docs` est absent dans cette
distribution Next 15 : documentation officielle **version 15** consultée pour
les route handlers, error/not-found et ESLint avant l'implémentation.

## Contrat de contact connu

Le contrat antérieur était un POST JSON navigateur vers Make avec :

| Champ | Type | Limite actuelle |
| --- | --- | --- |
| nom | string, obligatoire | 120 caractères |
| email | string, obligatoire | 254 |
| telephone | string, facultatif | 40 |
| structure | string, facultatif | 200 |
| typeProjet | string, obligatoire | presence / conversion / acquisition / maintenance / conseil |
| message | string, obligatoire | 5000 |
| source | string | `Site Nova Baie`, généré par le serveur |
| date | string | ISO UTC, généré par le serveur |

Les champs métier et les noms du payload Make sont conservés. Téléphone et
structure absents deviennent des chaînes vides comme dans l'ancien formulaire.
Le honeypot `website` est réservé à la route interne et n'est jamais transmis.
Champs supplémentaires et injections de contrôles sont rejetés. Normalisation
Unicode NFC, espaces de bord supprimés, fins de ligne du message normalisées.
Corps limité à 24 000 octets, lecture limitée à 5 secondes.

Chemin : navigateur → `/api/contact` → validation/origine → Redis atomique → Make.
Webhook privé limité à HTTPS et aux hôtes `hook.<région>.make.com`, sans redirection.
Un ancien hôte Integromat ou un relais personnalisé n'est **pas présumé compatible** :
validation humaine et adaptation explicite nécessaires si c'est le cas.
Les erreurs et réponses amont ne sont jamais copiées dans la réponse publique.
Aucun contenu de demande, URL privée ou email n'est journalisé par ce code.

| Résultat | HTTP |
| --- | --- |
| Accepté par l'endpoint Make | 202, code `accepted` |
| Entrée incorrecte / trop volumineuse | 400 / 413 |
| Origine absente ou non autorisée | 403 |
| Mauvais Content-Type | 415 |
| Limite atteinte | 429 et Retry-After |
| Configuration ou limiteur indisponible | 503 |
| Erreur HTTP, réseau ou redirection de Make | 502 |
| Timeout de Make | 504 |

Ni nouvelle tentative automatique ni stockage durable. Une demande peut avoir
été acceptée par Make avant une perte réseau : un nouvel envoi manuel peut créer
un doublon. Résoudre l'idempotence avec le stockage du LOT D et le scénario distant.
Une réponse 2xx de Make peut elle-même être personnalisée : vérifier humainement
son sens avant activation. Ne garantit ni email livré ni traitement du scénario.

## Limitation serverless sans mémoire locale

Adaptateur REST Redis compatible avec EVAL ; **aucun service provisionné ni
abonnement ajouté**. Il faut un stockage partagé déjà autorisé ou choisir une autre
protection partagée avant activation. En son absence, échec fermé (503).

Script Lua atomique, clés partageant le même hash-tag Redis Cluster : plafond
global de 100 envois/heure et 3 par email/15 minutes. Clés email HMAC-SHA256 avec
secret privé, TTL respectifs 3600 et 900 secondes. Les compteurs consomment une
tentative avant Make, même si l'appel échoue. Aucune adresse IP n'est collectée
et aucun en-tête de proxy n'est arbitrairement considéré fiable.

Limites : ce n'est pas une protection DDoS ; une personne malveillante peut épuiser
le plafond global ou cibler un email. Origin et honeypot ne constituent pas des
preuves humaines. Vérifier les protections et quotas de la plateforme ; toute
configuration WAF distante doit être approuvée. Le limiteur conserve des
identifiants pseudonymisés temporaires : ce n'est pas une absence de traitement
de données personnelles. Exécution réelle Redis, débit, quotas et TTL restent à
valider dans un environnement isolé autorisé.

## Variables privées, sans valeurs

- MAKE_WEBHOOK_URL
- CONTACT_ALLOWED_ORIGINS : origines exactes séparées par des virgules, sans slash final.
- CONTACT_REDIS_REST_URL : endpoint HTTPS du service déjà approuvé.
- CONTACT_REDIS_REST_TOKEN
- CONTACT_RATE_LIMIT_SECRET : au moins 32 caractères aléatoires.

L'ancienne variable publique doit être supprimée de la configuration distante
uniquement lors d'une intervention autorisée. L'ancien webhook ayant été publié
dans le navigateur, envisager sa rotation et les dépendances du scénario avec
l'administrateur. Aucune valeur existante n'a été consultée ou recopiée.

## Routage / SEO technique

Conservation de toutes les pages éditoriales et des URL `/services`, `/actualites`,
`/a-propos`, `/realisations`, `/contact`, `/mentions-legales` et de leurs équivalents EN.
La suppression du fichier isolé `/realisations/page.tsx` supprime uniquement sa
redirection concurrente : la vraie page localisée reste accessible à la même URL.
Robots est désormais produit uniquement par `src/app/robots.ts`, sans blocage de
`/_next/` ni règle Googlebot contradictoire. Robots n'est pas un contrôle d'accès.
Mentions légales conservées en noindex, retirées du sitemap ; aucune URL éditoriale
indexable retirée. Dates lastmod omises faute de dates fiables.
Canonicals et hreflang sont associés à chaque page ; x-default pointe vers FR.
Titres déjà marqués Nova Baie en valeur absolue pour éviter le doublon du template.
La directive index/follow globale redondante est retirée : l'indexation reste le
comportement par défaut, les mentions conservent leur noindex et la 404 reçoit le
noindex de Next sans métadonnées contradictoires.
Aucun repositionnement commercial n'est effectué.

| Entrée | Résultat attendu |
| --- | --- |
| `/`, `/services`, `/realisations`, `/actualites`, `/a-propos`, `/contact`, `/mentions-legales` | 200 FR avec contexte FR |
| mêmes routes sous `/en` | 200 EN |
| mêmes routes sous `/fr` | redirection vers URL sans préfixe |
| slash final | normalisation sans boucle |
| route inconnue FR/EN | 404 localisée, noindex |
| robots.txt / sitemap.xml | 200, source unique / 12 URL indexables |
| POST contact sans configuration | 503, aucun appel Make |
| GET contact API | 405 |

La détection linguistique next-intl existante est conservée : une requête sans
préfixe avec préférence/cookie anglais peut rediriger vers EN. Les tests FR fixent
leur contexte linguistique pour ne pas confondre ce comportement avec une boucle.

## Dépendances et avis

Next 15.5.15 → 15.5.29 ; React/DOM 19.2.4 → 19.2.9 ; sharp 0.34.5 transitif →
0.35.5 direct ; PostCSS 8.5.10 → 8.5.32, y compris sous Next via override.
ESLint 9 et config Next 15 déclarés explicitement ; ESLint 9 est déprécié par le
registre mais reste choisi pour la compatibilité du socle Next 15. Réexaminer lors
de la future mise à niveau de la chaîne, sans masquer ce point.
Override minimatch 11.0.4 limité à typescript-estree pour son avis d'amplification.
Les overrides nécessitent une revue à chaque mise à jour de Next / typescript-eslint.
tsx et dépendances transitives ciblées corrigés sans audit fix --force.

Sources officielles consultées le 5 novembre 2026 :
- https://github.com/vercel/next.js/security/advisories
- https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw
- https://github.com/vercel/next.js/security/advisories/GHSA-7qx7-33qx-rqx2
- https://github.com/vercel/next.js/security/advisories/GHSA-f3mh-rxg3-f5g2
- https://github.com/vercel/next.js/security/advisories/GHSA-pc58-hwjq-p385
- https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components
- https://github.com/vercel/next.js/releases/tag/v15.5.29
- https://github.com/react/react/releases/tag/v19.2.9

Les avis de novembre affichent parfois « None » comme correctif alors que la
version installée est au-delà de leur plage annoncée. Ne pas déduire d'un audit npm
vide que toutes les conditions d'exploitation sont exclues. La route de contact
reconstruit sa réponse et ne relaie jamais une Response amont ; runtime Node sans
session sensible sur route Edge. L'exposition réelle de la production reste inconnue.

## En-têtes / conformité : décisions réservées

X-XSS-Protection retiré ; nosniff, DENY, referrer et poweredByHeader conservés.
HSTS : vérifier d'abord HTTPS, domaines et sous-domaines chez l'hébergeur ; ne pas
activer includeSubDomains/preload arbitrairement.
CSP : établir l'inventaire GTM, images, vidéos, polices et scripts inline, puis
étudier Report-Only et son récepteur avant enforcement. Aucun collecteur ajouté.
Permissions-Policy : confirmer les besoins caméra/micro/géolocalisation avant une
politique restrictive. Pas d'activation arbitraire.
GTM inchangé. Pas de bandeau cookies ou de consentement fictif ajouté. Inventorier
les balises et leurs déclenchements, puis décider du mécanisme nécessaire.
Mentions et confidentialité : vérifier Make, hébergement, quotas, sous-traitants,
conservation et droits. La phrase existante « pas transmis à des tiers » doit être
revue avant publication ; aucune conformité RGPD revendiquée.
CGU : déterminer le besoin avec le responsable juridique selon les usages réels ;
pas de comptes publics ni de service transactionnel ajoutés ici.

## Actions administrateur — aucune effectuée

1. Vercel : confirmer commit/runtime, version Node 24, domaines, HTTPS/HSTS, quotas,
   logs et protections plateforme ; préparer les variables privées, sans les exposer.
2. Valider une limitation partagée existante, son coût, sa région et son contrat.
   Aucun service payant ne peut être créé sans accord.
3. Make : confirmer hôte, payload, réponse HTTP, traitement, erreurs, conservation,
   quotas et éventuelle rotation du webhook. Tester seulement avec un scénario
   isolé et données fictives après autorisation distincte.
4. Google : examiner le conteneur GTM et Analytics/Search Console ; ne pas modifier
   les balises ou le consentement sans validation du traitement réel.
5. Valider les textes d'information, puis autoriser séparément toute publication.

## Retour arrière

Ne pas réinitialiser main. Les changements restent sur une branche locale.
Avant revue, conserver cette branche et revenir sur main avec un arbre propre si
nécessaire. Après commits, annuler un commit du lot par `git revert` sur une branche
de travail, puis `npm ci` et les contrôles. Ne pas utiliser reset --hard.
En cas de publication future autorisée, restaurer un déploiement validé seulement
avec accord, en évitant de réintroduire le webhook public ou des dépendances vulnérables.
Aucune migration de données ni intervention distante à annuler pour ce lot.

## Particularités de validation locale Windows

Le poste utilise Node 24.19.0 / npm 11.17.0. Sa politique de contrôle des
applications refuse le binaire natif SWC. Le paquet WASM officiel 15.5.29 a été
ajouté aux outils de développement. Aucun binaire n'a été débloqué et aucune
politique système n'a été changée. Le build local utilise, si nécessaire :

```powershell
$env:NEXT_TEST_WASM_DIR = (Resolve-Path node_modules/@next/swc-wasm-nodejs).Path
$env:NEXT_TELEMETRY_DISABLED = '1'
npm run build
```

Cette variable interne à Next sert uniquement au diagnostic local et ne doit pas
être configurée chez Vercel. Sur une machine où le compilateur natif est autorisé,
`npm run build` reste la commande normale. La configuration est désormais en
`next.config.mjs` avec annotation JSDoc NextConfig, sans changement fonctionnel,
pour éviter de dépendre de la transpilation TypeScript au démarrage du serveur.
Le runner navigateur choisit le secours WASM sur Windows et utilise Chrome
headless déjà installé. Aucune navigation externe n'est autorisée par les tests.

Le serveur de recette et son origine utilisent `localhost` (boucle locale).
La recette initiale liée à `127.0.0.1` a révélé un rewrite next-intl vers localhost
traité en redirection, empêchant les routes FR de répondre. Le lien entre l'origine
interne Next et le hostname de liaison doit rester cohérent. Un signalement proche
existe dans https://github.com/vercel/next.js/issues/94342 ; il ne constitue pas une
confirmation officielle de la cause sur toutes les plateformes. Aucun contournement
des protections Next ni confiance arbitraire dans Host/X-Forwarded-Host n'est ajouté.
Les tests de Vercel ou d'un hébergement lié à 0.0.0.0 restent requis avant publication.

## Résultats de recette du 5 novembre 2026

| Contrôle | Résultat |
| --- | --- |
| `npm ci` | réussi, 380 paquets installés, aucun changement distant |
| `npm run lint` | réussi, zéro avertissement |
| `npm run typecheck` | réussi |
| `npm test` | 51 tests réussis, zéro échec/ignoré |
| `npm run build` avec secours WASM local | réussi, 20 pages générées |
| `npm run test:e2e` | 28 tests Chrome/HTTP réussis en 11,2 s |
| `npm audit --json` | zéro vulnérabilité déclarée, arbre complet |
| `npm audit --omit=dev --json` | zéro vulnérabilité déclarée, production |
| `git diff --check` | réussi |
| Comparaison binaire des visuels au commit de départ | 34 fichiers identiques |
| Comparaison des messages au départ | contenu commercial FR/EN identique, seuls messages de succès et nouvelles erreurs ajoutés |
| Header / footer / globals.css / main | identiques au départ |

Tests navigateur : 14 pages existantes, métadonnées, 2 routes 404, 8 réponses
simulées contact (202/500/429/504 en FR et EN), menu mobile et langue, chargement
réel du logo et du hero, normalisation/robots/sitemap/API non configurée, absence
des références privées dans les bundles clients. Toutes les requêtes navigateur
hors localhost sont bloquées. Aucun appel réel Make ou Redis n'a été effectué.
Les tests unitaires simulent les appels HTTP externes ; ils ne prouvent pas la
compatibilité d'un fournisseur Redis ni l'exécution de son Lua en production.

Le build signale que l'image Open Graph en runtime Edge n'est pas prérendue :
comportement attendu du code existant. Un build froid a aussi signalé une limite
d'invalidation du cache Webpack pour un import dynamique interne à next-intl ;
aucun échec de compilation. Pas de score Lighthouse ni de mesure terrain inventés.
First Load JS annoncé par Next : accueil 128 kB, contact 124 kB, commun 103 kB.
Ces valeurs ne constituent ni une comparaison avant/après ni une mesure Core Web Vitals.

Limites de recette : Chrome headless local seulement, pas Safari/Firefox ni audit
WCAG complet. Le fallback global d'erreur est typé/linté ; aucune exception serveur
de production n'a été provoquée pour le tester. L'envoi réel, les quotas, le
limiteur partagé, le consentement et le runtime Vercel restent à valider séparément.

## Fichiers du lot

Créés : `.env.example`, `.nvmrc`, `docs/lot-a.md`, `playwright.config.ts`,
`scripts/start-test-server.mjs`, `src/app/api/contact/route.ts`,
`src/lib/contact/handler.ts`, `rate-limit.ts`, `submit.ts`, `validation.ts`,
`src/lib/seo.ts`, `src/app/[locale]/[...rest]/page.tsx`,
`src/app/[locale]/error.tsx`, `src/app/[locale]/not-found.tsx`,
`src/app/global-error.tsx`, `src/app/not-found.tsx`, `tests/contact.test.ts`,
`tests/routing.test.ts`, `tests/seo.test.ts`, `tests/browser/local.spec.ts`.

Renommé : `next.config.ts` → `next.config.mjs` (mêmes options hors directive obsolète).

Modifiés : `.gitignore`, `README.md`, `package.json`, `package-lock.json`,
`eslint.config.mjs`, `postcss.config.mjs`, `messages/fr.json`, `messages/en.json`,
`src/app/layout.tsx`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`,
les pages localisées `services`, `realisations`, `actualites`, `a-propos`, `contact`,
`mentions-legales`, `src/app/robots.ts`, `src/app/sitemap.ts`,
`src/components/contact/contact-form.tsx`, `src/lib/site-data.ts` (import inutilisé).

Supprimés uniquement : `public/robots.txt` (source concurrente),
`src/app/realisations/page.tsx` (redirection concurrente ; URL publique conservée).

## Passage au LOT B

Revue humaine du code, des limites de sécurité et de la matrice SEO ; validation
du positionnement et des références avant modification éditoriale. Le LOT B peut
être préparé localement après cette revue. La publication demeure interdite sans
autorisation distincte et nécessite la configuration du contact, la recette
isolée autorisée de Make/Redis, le contrôle du runtime de déploiement et des
traitements GTM/confidentialité. Aucun stockage de prospects ni back-office ajouté.
