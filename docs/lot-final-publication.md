# Lot final — Préparation à la publication

Branche `lot-final-publication` (depuis `e14be20`, lot C.9). Aucun push, aucun déploiement.

## 1. Correction visuelle — CycloSport Crotellois (accueil et portfolio)

- Nouveau visuel de carte `public/media/projects/csc/optimized/card-csc.webp` (1600 × 1312, 88 Ko), généré par `node scripts/lot-final-csc-card.mjs` à partir des dérivés existants. Composition graphique sur l’identité noir/orange du club : en-tête Actualités du site (vélo filaire, titre condensé, tracé orange), module Actualités du back-office (capture anonymisée) et en-tête Contact (coup de pinceau orange), sur un grand pan orange incliné, des lignes de vitesse, une trajectoire et des courbes de baie. Aucune photo de coureurs mise en avant.
- Le visuel dit à la fois « site public » et « plateforme métier », comme le reste du portfolio Nova Baie (fenêtres de navigateur, profondeur, ombres).
- Seule la donnée `image`/`imageAlt` de la carte change (`src/lib/projects.ts`). La page d’étude de cas CSC, son hero, son image Open Graph et ses données structurées sont inchangés. Qualité d’image 90 pour la carte, comme Blue Baie et Saint-Jean, afin que les textes des captures restent nets.

## 2. SEO technique

| Sujet | Avant | Après |
|---|---|---|
| Redirections de langue | Une URL française pouvait être redirigée (307) vers `/en` selon la langue du navigateur ou le cookie `NEXT_LOCALE` | `localeDetection: false` : chaque URL sert toujours sa langue ; hreflang et sélecteur de langue relient les versions (recommandation Google). Normalisation `/fr/...` → `/...` conservée, sans boucle. Test unitaire ajouté |
| Sitemap | URL simples | Chaque URL déclare ses alternates fr/en/x-default (`xhtml:link`) ; priorité 0,8 pour l’étude de cas phare |
| Données structurées globales | `WebSite` + `ProfessionalService` (zone : Somme, Côte d’Opale) | `WebSite` lié à l’éditeur ; `ProfessionalService` avec adresse complète (mentions légales), zone France + territoires, `contactPoint`, `hasOfferCatalog` (7 services), `knowsAbout` élargi (sites internet, plateformes, associations et clubs, tourisme, immobilier, SEO) |
| Fil d’Ariane | Uniquement CSC | `BreadcrumbList` sur Expertises, Réalisations, Publications, À propos, Contact et les 6 études de cas |
| Pages | — | Expertises : `ItemList` de `Service` + `FAQPage` ; Réalisations : `CollectionPage` + `ItemList` des études de cas ; Contact : `ContactPage` |
| Métadonnées globales | — | `robots` index/follow + `max-image-preview: large`, `applicationName`, mots-clés élargis, `og:url` par langue |
| Search Console | Rien | Balise de vérification Google générée si la variable `GOOGLE_SITE_VERIFICATION` est définie (aucun jeton inventé) |
| Cache des fichiers publics | `max-age=1 an, immutable` sur des fichiers non versionnés (une image remplacée ne se serait jamais rafraîchie) | 7 jours + `stale-while-revalidate` ; les images optimisées par Next gardent leur propre cache |

Audit automatisé `node scripts/seo-audit.mjs http://localhost:3158 [--external]` (lit le sitemap, 24 pages FR/EN) : statut 200, title ≤ 75, description 70–175, canonical exact, hreflang fr/en/x-default, pas de `noindex`, un seul H1, aucun saut de niveau de titre, toutes les images avec `alt`, JSON-LD valide, Open Graph + Twitter, `lang` correct, 26 liens internes en 200. **Résultat : aucun problème.**

`robots.txt` autorise tout sauf `/api/` et `/admin/` et déclare le sitemap. Les mentions légales restent volontairement en `noindex`, hors sitemap.

## 3. SEO éditorial et positionnement

Ton premium conservé, champ sémantique élargi sans texte de remplissage :
- **Accueil** : title « Nova Baie — Création de sites internet & plateformes métier », description « studio digital… partout en France… entreprises, associations et clubs » ; accroche « Studio digital · Sites internet & plateformes métier sur mesure » ; texte d’introduction citant entreprises, associations, clubs sportifs, tourisme, immobilier.
- **Nouvelle section d’accueil « Pour qui »** (entre Réalisations et Méthode) : tourisme & hébergements, conciergeries & immobilier, associations & clubs sportifs, artisans & commerces, TPE & PME, marques & projets privés, avec un lien vers l’étude de cas correspondante quand elle existe (Gîtes en Baie, Blue Baie, CSC). Contenu utile et maillage interne vers les études de cas.
- **Expertises** : title/description orientés création de site, plateformes métier, SEO ; **FAQ de 7 questions** en `<details>` natif (zone d’intervention France, secteurs, reprise d’existant, SEO, suivi après mise en ligne, démarrage). Aucune promesse de prix ou de délai, ce que vérifie le test existant.
- **Réalisations** : description citant la plateforme CSC, les écosystèmes de conciergerie et les sites d’hébergement.
- **À propos** : nouveau bloc « Des sites et des outils pour des métiers très différents » ; « Un ancrage en Baie de Somme, des projets partout en France » ; boutons vers les réalisations et le contact.
- **Contact** : description et localisation « Baie de Somme · projets partout en France ».
- **Pied de page** et `alt` du logo : studio digital, sites internet, plateformes métier.
- Versions anglaises équivalentes.

## 4. Conversion

- Bloc d’appel final (accueil, expertises, réalisations) : phrase de réassurance (premier échange avant toute proposition) et contacts directs cliquables, email et téléphone.
- « Pour qui » se termine par « Présenter votre projet » ; À propos dispose désormais de deux appels à l’action.
- CSC, projet le plus complet, reste en tête de l’accueil et du portfolio avec un visuel aussi fort que les autres.

## 5. Préparation à la publication

- **Lots précédents intégrés** : Le Bout du Monde, Gîtes en Baie, correctif de routage `/fr`, favicon et tests associés, validés visuellement mais jamais commités, sont inclus dans le commit final avec les médias réellement utilisés.
- **Originaux hors de `public/`** : 85 fichiers non utilisés par le site (≈ 55 Mo : originaux CSC dont captures d’administration non anonymisées, PNG et vidéos sources des autres lots, doublons) déplacés vers `media-sources/` (ignoré par Git). Rien n’est supprimé. `scripts/lot-c9-media.mjs` lit désormais ses originaux depuis `media-sources/csc/` et reproduit les dérivés à l’identique. `artifacts/` est également ignoré.
- **Test obsolète corrigé** : `local.spec.ts` cliquait un bouton vidéo Bout du Monde qui n’existe plus ; la vidéo du portfolio est celle de Saint-Jean.
- **Statuts** : six réalisations « Réalisé », aucune mention provisoire dans les textes publics (vérifié).

## 6. Tests

- ESLint, TypeScript : réussis. Tests unitaires : 76/76.
- Build de production : réussi.
- Audit SEO et liens : aucun problème (voir §2). Liens externes : 200 pour tous les sites clients et réseaux, sauf LinkedIn (403, blocage des robots par LinkedIn, à vérifier à la main) et `www.cyclosportcrotellois.fr` (DNS non résolu, voir §7).
- Pages modifiées à 390 et 1440 px (accueil, réalisations, expertises, à propos, accueil EN) : aucun débordement, aucune erreur JS, axe WCAG 2.2 AA sans violation.
- Playwright de non-régression sur le build de production final : **59/59 réussis** (CSC, Refuge, Gîtes en Baie, Bout du Monde, Saint-Jean, Blue Baie C5.2/C5.3, recette générale `local.spec.ts` complète).
- Trois tests anciens ajustés au nouveau contenu, sans affaiblir leur intention : 7 sections sur l’accueil (ajout de « Pour qui ») ; lecture du premier script JSON-LD (schéma du site), les pages portant maintenant aussi fil d’Ariane et données de page, avec vérification « pas de prix » étendue à tous les scripts ; bouton vidéo Saint-Jean au lieu de Bout du Monde.
- Défaut trouvé et corrigé par ces tests : la page 404 portait deux balises `robots` (directive globale `index, follow` + `noindex`). La directive globale est retirée (l’indexation est le comportement par défaut) ; seules les directives d’aperçu Googlebot restent. 404 et mentions légales : un seul `noindex`.
- Mesures de laboratoire local (Chrome, sans bridage) : LCP 172–592 ms, CLS ≤ 0,0002 sur accueil, expertises et réalisations à 390 et 1440 px. Pas des données terrain.

## 7. À faire manuellement après mise en ligne

1. **Consentement cookies (avant la mise en ligne)** : Google Tag Manager (`GTM-MV4VJGBB`) est chargé sans bandeau de consentement, et des requêtes Google Analytics ont été observées au chargement des pages. En France (CNIL), la mesure d’audience Google Analytics exige un consentement préalable. Configurer un bandeau (CMP) et le Consent Mode dans GTM, ou n’activer que des balises exemptées. Le texte « Cookies » des mentions légales est à aligner sur la configuration retenue.
2. **Search Console** : ajouter la propriété de domaine `nova-baie.com` (vérification DNS recommandée) ou définir `GOOGLE_SITE_VERIFICATION` dans Vercel puis redéployer ; soumettre `https://www.nova-baie.com/sitemap.xml` ; demander l’indexation de l’accueil, des Expertises et de l’étude CSC ; surveiller « Pages » et « Performances ».
3. **Domaine** : `www.nova-baie.com` comme domaine principal dans Vercel, redirection 308 de `nova-baie.com` vers `www`, HTTPS.
4. **CycloSport Crotellois** : `www.cyclosportcrotellois.fr` ne résolvait toujours pas le 10 novembre 2026. Le lien est affiché comme définitif. Vérifier le DNS et le certificat dès la mise en ligne du club, puis renseigner `externalUrlCheckedOn`.
5. **Google Business Profile** (Saint-Quentin-en-Tourmont, catégorie « Concepteur de sites Web ») et Bing Webmaster Tools : importer la propriété depuis Search Console.
6. **Partage social** : contrôler les aperçus (LinkedIn Post Inspector, débogueur Facebook) de l’accueil et de l’étude CSC.
7. **Analytics** : une fois le consentement en place, relier GA4 à Search Console, puis suivre impressions, clics, requêtes et pages, ainsi que les envois du formulaire de contact (événement à créer dans GTM).
8. Lien LinkedIn de l’entreprise (403 pour les robots) : vérifier dans un navigateur.

## 8. Prévisualisation

```
npm run build
npx next start --port 3158
```
- http://localhost:3158/ (CSC en tête, section « Pour qui »)
- http://localhost:3158/realisations
- http://localhost:3158/services (FAQ)
- http://localhost:3158/a-propos
- http://localhost:3158/en
- http://localhost:3158/sitemap.xml

Recette locale Windows : si l’optimiseur d’images se bloque sur cache froid (pages Blue Baie, nombreux encodages AVIF simultanés), redémarrer le serveur. Ce comportement est propre à l’environnement local ; Vercel optimise les images sur son infrastructure.
