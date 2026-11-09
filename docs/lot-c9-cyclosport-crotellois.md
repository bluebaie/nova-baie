# Lot C.9 — CycloSport Crotellois · Racing Digital Experience

Réalisation phare du portfolio Nova Baie. Route : `/realisations/cyclosport-crotellois` (FR) et `/en/realisations/cyclosport-crotellois` (EN). Lien définitif : `https://www.cyclosportcrotellois.fr/`.

## 1. État Git initial

9 novembre 2026, branche `lot-c8-refuge-marmotte` (HEAD `058ae83`, précédé de `9329a43`). Arbre de travail déjà modifié par les lots précédents, non commités : route des réalisations, `globals.css`, `creative-motion.tsx`, `projects.ts`, `middleware.ts`, tests content/routing/SEO, suppression de `public/favicon.ico`, composants et tests Bout du Monde et Gîtes en Baie, médias Blue Baie, Saint-Jean, Gîtes en Baie, Bout du Monde et CSC non suivis.

Branche locale créée sans toucher à l’arbre : `lot-c9-cyclosport-crotellois` (depuis `058ae83`). Aucun fichier d’un autre lot supprimé, réinitialisé ou écrasé. Middleware, favicon et `creative-motion.tsx` non modifiés par ce lot. Aucun push, aucun déploiement.

Instructions lues : `AGENTS.md`, `CLAUDE.md`, rapport `docs/lot-c8-refuge-marmotte.md` (conventions de composants isolés, de recette et de commit sélectif). `node_modules/next/dist/docs/` n’existe pas dans Next 15.5.29 installé ; les API utilisées (App Router, `generateMetadata`, `next/image`, `next/font/google`) sont celles déjà employées par le dépôt.

## 2. Sources CSC utilisées

- Dépôt local du club `C:\Users\bapti\dev\csc-web`, consulté **en lecture seule** (aucune commande d’écriture, aucun fichier `.env` ouvert, aucune connexion Supabase) :
  - `package.json` : Next.js 16.4.5, React 19.2, TypeScript, `@supabase/ssr`, `@supabase/supabase-js`, Tailwind CSS 4, Zod ; `vercel.json` présent.
  - `src/app` : accueil, `le-club`, route, tout-terrain, `ecole-de-velo`, `actualites`, `evenements/[slug]`, `randonnee-vtt`, `la-crotelloise`, `partenaires`, `contact`, `admin` (connexion, réinitialisation du mot de passe).
  - `supabase/migrations` : 19 migrations (profils, médias, emplacements, événements, actualités, partenaires, inscriptions, nouveaux membres, permissions et audit, messages de contact, galeries).
  - `02_PROJECT_DOCS/AUDIT_PREPRODUCTION_CSC_V1.md` (6 nov.) et `RAPPORT_CHANTIER_B_2026-11-09.md` (état courant).
- Captures fournies dans `public/media/projects/csc/`.
- Lien Vercel de prévisualisation : **non utilisé dans la page, les métadonnées ni le sitemap** (contrôlé par test). Les captures fournies ont suffi ; aucune navigation authentifiée ni appel au back-office réel.

### Ce qui est présenté comme développé (preuves dans les rapports CSC)

Site public (accueil, club, route, tout-terrain, actualités et articles, événements, partenaires, contact) ; back-office : tableau de bord, actualités (publication, masquage, archivage, ordre sur l’accueil, galeries jusqu’à dix photos), nouveaux membres (saisons, autorisations), événements (éditions, séries récurrentes), inscriptions (internes ou lien externe, export), partenaires (ordre, visibilité, accueil), messages (formulaire public, boîte de réception, statuts, attribution), photos & médias, médias des pages, utilisateurs et rôles Superadmin / Communication / Contact à permissions configurables, journal d’activité.

### Ce qui n’est volontairement pas revendiqué

- Envoi réel par Gmail (le rapport CSC indique « Gmail réel non connecté ; envoi simulé »).
- Mise en production : le rapport CSC du 9/11 indique qu’aucune Production Supabase/Vercel ni domaine n’étaient créés à cette date. La page ne dit ni « en ligne » ni « en construction ».
- École de vélo (lancement public désactivé côté CSC) et La Crotelloise (404 volontaire) : non mentionnées.
- Statistiques, conformité, MFA, notifications : non mentionnés.
- Aucun chiffre de performance ou de test du CSC n’est affiché. Seule mention chiffrée liée aux recettes : « parcours contrôlés de 320 à 1280 pixels », issue du rapport du chantier B (largeurs simulées 320 à 1280 px).
- Sécurité : seules des notions génériques (« règles d’accès appliquées par la base », « connexion, rôles et permissions »). Aucun identifiant de projet, nom de table sensible, clé ou réglage.

## 3. Inventaire des 14 éléments médias

| # | Original (conservé, non modifié) | Dimensions | Contenu | Usage |
|---|---|---|---|---|
| 1 | `identite-csc/` (17 fichiers) | — | Logos web : navigation fond sombre, horizontal clair, maillot, blason, favicons, icônes, aperçu, note `LIRE_AVANT_INTEGRATION.txt` | Logos navigation, maillot, blason |
| 2 | `076ea223-….png` | 1672 × 941 | Photo collective : 8 cyclistes CSC en bord de mer | Acte II, image de partage |
| 3 | `FB_IMG_1793002768704.jpg` | 1365 × 2048 | Coureur CSC en cyclo-cross, dossard 66, signature « Eric & Élo » | Hero, transition B |
| 4 | `Capture … 174557.jpg` | 1912 × 986 | Accueil : « Rouler ensemble, entre terre et mer » | Image portfolio, transition B, détail typographique |
| 5 | `… 174646.jpg` | 1917 × 982 | Accueil : La route / Hors bitume | Acte IV |
| 6 | `… 174739.jpg` | 1917 × 987 | Le Club : « Nos terrains de jeu » | Acte IV |
| 7 | `… 174819.jpg` | 1915 × 987 | Le Club : « Ils rejoignent le CSC », portraits et prénoms de nouveaux membres | **Exclue** (visages et prénoms) |
| 8 | `… 174905.jpg` | 1917 × 987 | Tout-terrain : « Hors bitume » | Acte IV |
| 9 | `… 174951.jpg` | 1917 × 987 | Actualités | Acte IV, détail graphique |
| 10 | `… 175019.jpg` | 1917 × 990 | Contact (hero + avis « Version de démonstration ») | Acte IV, recadrée au hero |
| 11 | `… 175127.jpg` | 1912 × 985 | Back-office Actualités | Acte V, anonymisée |
| 12 | `… 175201.jpg` | 1917 × 990 | Back-office Nouveaux membres | Acte V, anonymisée |
| 13 | `… 175236.jpg` | 1917 × 992 | Back-office Partenaires | Acte V, anonymisée |
| 14 | `… 175338.jpg` | 1917 × 990 | Back-office Médias des pages | Acte V, anonymisée |

Couleurs relevées dans les captures : noir `#0A0A0A`, orange `#FF5A20`, crème `#F4F1EA`. Polices du site CSC (vérifiées dans `src/app/layout.tsx` du dépôt CSC) : Barlow Condensed et Inter.

**Réserve d’identité** : la note `LIRE_AVANT_INTEGRATION.txt` précise que les logos sont « des interprétations graphiques inspirées du maillot, pas des fichiers vectoriels officiels » à faire valider par le club. La page les présente comme « déclinaisons web de l’identité, dérivées du maillot du club ». Validation du club à confirmer avant publication.

## 4. Visuels sélectionnés et optimisés

Script reproductible : `node scripts/lot-c9-media.mjs` → `public/media/projects/csc/optimized/` (WebP 84–92, JPEG pour l’Open Graph). Aucun agrandissement : résolutions d’origine ou réductions.

| Dérivé | Dimensions | Poids |
|---|---|---|
| `actualites.webp` | 1796 × 987 | 109 Ko |
| `admin-media.webp` | 1898 × 990 | 183 Ko |
| `admin-members.webp` | 1898 × 990 | 80 Ko |
| `admin-news.webp` | 1898 × 985 | 89 Ko |
| `admin-partners.webp` | 1898 × 992 | 87 Ko |
| `club-terrains.webp` | 1796 × 987 | 250 Ko |
| `contact.webp` | 1796 × 655 | 63 Ko |
| `cyclocross.webp` | 1365 × 2048 | 316 Ko |
| `detail-lineart.webp` | 690 × 465 | 11 Ko |
| `detail-title.webp` | 960 × 660 | 62 Ko |
| `home-hero.webp` | 1796 × 986 | 137 Ko |
| `home-practices.webp` | 1796 × 903 | 157 Ko |
| `hors-bitume.webp` | 1796 × 987 | 270 Ko |
| `og-cyclosport-crotellois.jpg` | 1200 × 630 | 153 Ko |
| `peloton.webp` | 1672 × 941 | 270 Ko |

Traitements : retrait de la barre de défilement ; retrait d’un bouton flottant d’extension de navigateur présent sur toutes les captures (recadrage pour les captures publiques, interpolation de fond pour les écrans d’administration) ; contact limité au hero (l’avis temporaire de démonstration du site client n’est pas montré, sans rien affirmer sur l’envoi des messages) ; bande blanche sous la capture Pratiques retirée. `next/image` sert ensuite des variantes adaptées.

## 5. Politique d’anonymisation

Uniquement sur les dérivés, flou gaussien fort vérifié visuellement :
- Actualités : noms de deux coureurs dans le titre et l’adresse d’un article.
- Nouveaux membres : prénoms et portraits des trois fiches visibles.
- Partenaires : libellé d’une fiche de test interne (pas une donnée personnelle, mais sans intérêt public).
- Médias des pages : nom et rôle de l’utilisateur connecté.
- Capture « Ils rejoignent le CSC » exclue entièrement.

Aucune adresse électronique, aucun message et aucun identifiant n’apparaissent dans les dérivés. Mention visible sur la page : « Captures anonymisées : noms, visages et identifiants floutés. »

**Important** : les originaux d’administration et la capture des recrues restent dans `public/`, donc seraient servis publiquement s’ils étaient versionnés et déployés. Ils **ne sont pas inclus dans le commit** de ce lot (seuls `optimized/` et trois logos le sont). À déplacer hors de `public/` ou à garder non suivis avant toute publication.

## 6. Direction artistique

Concept « Racing Digital Experience » : l’énergie d’une affiche de course (noir, orange maillot, Barlow Condensed 800 en capitales, italiques de vitesse, point orange final des titres CSC) mise en scène avec la sobriété Nova Baie (grilles éditoriales, rythme crème / noir, annotations en Playfair italique de la charte Nova Baie). Motifs : trajectoire orange, lignes de vitesse, courbes de baie abstraites (motif graphique, pas une carte), dossard « N° 01 », sticker circulaire « Baie en mouvement », bande de course inclinée des disciplines, profil d’étape, grille de cockpit, damier d’arrivée. Pas de monogramme Nova Baie, pas de faux écran mobile, pas de faux tableau de bord ni de métrique inventée.

Police Barlow Condensed chargée via `next/font/google` (auto-hébergée, `display: swap`) dans le seul composant CSC.

## 7. Hero (Acte I)

Photographie de cyclo-cross dans un découpage parallélogramme, plan orange décalé en profondeur, dossard, sticker tournant, annotation manuscrite, crédit photo vertical « Eric & Élo ». H1 unique : « CycloSport Crotellois — Une identité en mouvement. ». Fil d’Ariane visible, vrai logo de navigation CSC, CTA « Prendre le départ ». Entrée synchronisée (tracé, masque photo, lignes de titre, textes). Sur mobile : photo au-dessus, titre ensuite, sans chevauchement.

## 8. Scènes et transitions

| Acte | Contenu |
|---|---|
| I | Hero |
| II — Le défi digital | Besoin et rôle de Nova Baie (sans problème inventé), profil d’étape « Raconter / Organiser / Fédérer / Piloter », photo collective |
| III — Identité | Palette inclinée, spécimen typographique, logos, détail du titre d’accueil à résolution d’origine, quatre principes |
| B — Vitesse | Photo lente, lignes rapides, capture d’accueil révélée par un masque oblique |
| IV — Expérience publique | Pratiques, Le Club, Hors bitume en bande pleine largeur, Actualités, détail graphique, Contact ; toutes agrandissables |
| C — De l’image au système | La trajectoire devient une grille en perspective qui se redresse |
| V — Moteur métier | Quatre couches : site public, gestion métier, base de données, administration sécurisée ; cockpit à quatre onglets (captures anonymisées) ; « liste de départ » des 11 modules |
| VI — Technologie | Next.js & React, TypeScript, Supabase, Vercel ; sept piliers en langage clair |
| VII — Ligne d’arrivée | Les fils convergent vers une ligne d’arrivée, signature Nova Baie, CTA contact, lien CSC, retour portfolio, réalisation suivante |

Transitions A (trajectoire hero → chapitre II), B, C et D (convergence finale) distinctes de Blue Baie et du Refuge. GSAP 3.15 et ScrollTrigger déjà présents, importés dynamiquement ; `gsap.context` + `matchMedia` nettoyés au démontage ; transformations, `clip-path` et tracés SVG uniquement ; aucun épinglage. Scènes de défilement à partir de 768 px ; entrée du hero partout ; `prefers-reduced-motion` : aucune animation GSAP, sticker, bande et lignes CSS figés. Contenu complet sans JavaScript.

## 9. Fonctionnalités CSC présentées

Voir §2. Les 11 modules de la « liste de départ » correspondent à des écrans existants (menu du back-office visible dans les captures) et aux recettes du rapport du chantier B.

## 10. Architecture et stack vérifiées

Next.js 16.4.5 / React 19.2 / TypeScript / Supabase (PostgreSQL, Auth, Storage, RLS) / Vercel (`vercel.json`, environnements Preview), vérifiés dans le dépôt CSC. Nova Baie n’est connecté à aucun service CSC ; aucune variable d’environnement, clé ou information d’administration copiée.

## 11. Intégration en première position

`src/lib/projects.ts` : CSC publié, `status: 'completed'`, `flagship: true`, `portfolioOrder: 1`, `homeOrder: 1`, domaine officiel, image, galerie, logo maillot, textes FR/EN. Ordre : CSC, Blue Baie, Saint-Jean, Le Bout du Monde, Gîtes en Baie, Refuge de la Marmotte (vérifié par test). Accueil : CSC en carte pleine largeur au-dessus de Blue Baie, Saint-Jean et Gîtes en Baie (visibilités d’accueil des autres lots inchangées). Classe `project-card--flagship` et règles CSS dédiées. Aucune date de mise en ligne, aucun badge de statut provisoire ; libellé « Réalisé » commun aux autres projets.

`externalUrlCheckedOn` n’est pas renseigné pour le CSC : le domaine ne résolvait pas encore le 9/11 (`curl` : « Could not resolve host »). Le test l’autorise uniquement pour le CSC. Aucun changement de données n’est nécessaire quand le domaine sera actif.

## 12. Versions FR / EN

Tous les textes sont rédigés dans les deux langues dans le composant et les données. Canonical FR sans préfixe, EN sous `/en`, `lang` correct, hreflang fr/en/x-default via `localeAlternates`.

## 13. Référencement

- Title FR « Site et plateforme pour club cycliste en Baie de Somme | Nova Baie » (66 car.) ; EN « Cycling club website and platform in the Bay of Somme | Nova Baie ».
- Meta descriptions spécifiques (≤ 170 car., testé).
- H1 unique, H2 par acte, H3 pour modules, couches, piliers.
- Open Graph article + Twitter large image : `og-cyclosport-crotellois.jpg` 1200 × 630.
- JSON-LD : `CreativeWork` (créateur Nova Baie, `about` : `SportsOrganization` CycloSport Crotellois, Le Crotoy) + `BreadcrumbList` ; fil d’Ariane visible.
- Sitemap : les deux URL ajoutées automatiquement via `publishedCaseStudies`.
- Alternatives textuelles descriptives FR/EN, décor masqué (`aria-hidden`).
- Intentions couvertes naturellement : site pour club cycliste / association sportive, plateforme associative, back-office sur mesure, gestion d’événements, Next.js, Supabase, Baie de Somme. Aucune statistique ni tarif.

## 14. Tests techniques

| Contrôle | Résultat |
|---|---|
| ESLint (`npm run lint`, 0 avertissement) | Réussi |
| TypeScript (`npm run typecheck`) | Réussi |
| Tests unitaires (`npm test`) | 75/75 réussis (arbre complet) |
| Build de production (`npm run build`) | Réussi ; fiches : 15,5 kB, 140 kB First Load JS (groupe partagé des études de cas) |
| Playwright CSC (`tests/browser/cyclosport-crotellois-case.spec.ts`) | 2/2 réussis : 4 largeurs, sections, images, visionneuse (Échap, retour du focus), cockpit, canonical/hreflang/OG/JSON-LD, liens officiels, absence de lien Vercel et de mention provisoire, axe WCAG 2.2 AA, mouvement réduit, version EN, ordre accueil/portfolio FR/EN, normalisation `/fr` sans boucle, sitemap |
| Régressions Refuge, Gîtes en Baie, Bout du Monde, Saint-Jean | Réussies |
| Régressions Blue Baie C5.2 / C5.3 | 4/4 réussis (après préchauffage séquentiel du cache d’images, voir ci-dessous) |
| `tests/browser/local.spec.ts` | 41/43 ; les 2 échecs portent sur une ligne héritée (clic sur un bouton vidéo Bout du Monde supprimé par le lot Bout du Monde non commité). Les assertions CSC de ce fichier, situées avant, passent |

Exécution finale répétée deux fois (CSC + Refuge) : **8/8 réussis**.

Un contrôle axe a signalé une fois un contraste insuffisant : les quatre couches de l’acte V apparaissaient avec une opacité liée au défilement ; arrêtées à mi-course, leurs textes étaient semi-transparents. Corrigé : seule la position est animée, le texte reste toujours opaque.

Blue Baie : après suppression de `.next`, le cache d’images était vide. À 1920 px, la page Blue Baie déclenche de nombreux encodages AVIF simultanés et l’optimiseur d’images de Next s’est bloqué sur une requête (`baie-saint-valery-hero.jpg`, puis `home-desktop.png`) ; les requêtes identiques attendaient ensuite indéfiniment, d’où des délais dépassés dans `page.goto`. Le même encodage par sharp seul prend 0,4 à 0,9 s, et la page Blue Baie n’est pas modifiée par ce lot. Après redémarrage et préchauffage séquentiel des 115 variantes d’images de la page : 4/4 réussis. Problème d’environnement de recette locale (Windows, cache froid), pas une régression ; à surveiller sur l’hébergement (cache CDN Vercel).

Erreur intermittente constatée une fois sur quatre exécutions du test Refuge (React #418, hydratation) lors d’une session longue ; 6/6 réussites ensuite en répétition. Non reproduite isolément, sans lien établi avec ce lot.

Infrastructure : le lanceur Playwright du dépôt se bloque sous Windows (constat du C.8). Recette sur serveur de production séparé avec la configuration locale non versionnée `artifacts/lot-c9/playwright.config.ts` :
`npm run build`, `npx next start --port 3158`, puis `$env:PLAYWRIGHT_PORT='3158'; npx playwright test --config artifacts/lot-c9/playwright.config.ts --grep CSC`.
Pendant la recette, un dossier `.next` mêlant artefacts de développement Turbopack et build a provoqué des erreurs 500 ; il a été supprimé (dossier ignoré par Git) et reconstruit.

## 15. Contrôles visuels

Script `node scripts/lot-c9-inspect.mjs [url] [dossier]` : pages complètes et chaque scène à 390, 768, 1024, 1440 px (FR) et 390, 1440 px (EN), mode normal et mouvement réduit (`REDUCED=1`). Sorties dans `artifacts/lot-c9/` (non versionné). Sur le build final : débordement horizontal 0, un seul H1, aucune image cassée, aucune erreur console, axe WCAG 2.2 AA sans violation, dans les 12 combinaisons.

Corrections issues de l’inspection : texte du sticker qui se chevauchait, annotation sur le sticker, spécimen « Aa » de mauvaise couleur, bande blanche sous une capture, ligne d’arrivée qui traversait le titre puis le lien « réalisation suivante », kicker chevauchant la photo en tablette et mobile, contraste des petites légendes et du crédit photo, décalage de mise en page mobile (CLS 0,175 → 0,002) causé par le fil d’Ariane passant sur deux lignes avant le chargement de la police.

Accueil et portfolio vérifiés FR/EN après passage du CSC en tête : 0 débordement.

## 16. Performance et accessibilité

Mesures de laboratoire local (Chrome, sans bridage, build de production ; pas des données terrain ni un score Lighthouse) : LCP 268 ms (390 px) / 304–652 ms (1440 px) ; CLS ≤ 0,011 ; accueil CLS 0,0002. Environ 1 Mo transféré au premier affichage de la fiche. JS client du lot : deux petits composants (motion, visionneuse/cockpit) ; GSAP en import dynamique. Images `next/image` dimensionnées, paresseuses hors hero.

Accessibilité : axe sans violation ; navigation clavier (onglets `aria-pressed`, visionneuse `<dialog>` native, Échap, retour du focus) ; focus visible orange ; contrastes AA (orange foncé `#C03D0B` sur fond crème) ; décor `aria-hidden` ; disciplines du bandeau défilant exposées en liste lisible par les lecteurs d’écran ; mouvement réduit respecté.

## 17. État Git final

Branche `lot-c9-cyclosport-crotellois`, commit local isolé (voir message « feat: create CycloSport Crotellois flagship case study »). Contenu : composants `cyclosport-*`, styles, scripts média/inspection, test navigateur, rapport, dérivés `optimized/` et trois logos utilisés. Fichiers partagés (`projects.ts`, route, `globals.css`, `project-card.tsx`, tests content/SEO/local) indexés depuis HEAD avec **uniquement** les ajouts C.9 ; le test SEO attend 20 URL dans le commit isolé (3 fiches de HEAD + CSC) et 24 dans l’arbre complet (6 fiches). Les travaux antérieurs non validés restent intacts dans l’arbre, hors commit. Les originaux CSC restent non suivis. Aucun push, aucun déploiement.

## 18. Prévisualisation locale

```
npm run dev -- --hostname 127.0.0.1 --port 3159
```
- FR : http://127.0.0.1:3159/realisations/cyclosport-crotellois
- EN : http://127.0.0.1:3159/en/realisations/cyclosport-crotellois
- Accueil : http://127.0.0.1:3159/

Version production : `npm run build` puis `npx next start --port 3158` → http://localhost:3158/realisations/cyclosport-crotellois (supprimer `.next` avant si un serveur de développement Turbopack a tourné entre-temps).

## 19. Points à contrôler avant publication globale

1. **Domaine** : `www.cyclosportcrotellois.fr` ne résolvait pas le 9/11. Vérifier DNS, HTTPS et redirection apex → www ; renseigner alors `externalUrlCheckedOn`.
2. **Logos** : validation par le club des déclinaisons « interprétées » du maillot.
3. **Originaux sensibles** : ne jamais versionner/déployer les captures d’administration et « Ils rejoignent le CSC » tant qu’elles sont dans `public/`.
4. **Droits** : accord du club pour les photographies et des photographes « Eric & Élo » (crédit affiché).
5. **Optimiseur d’images** : blocage observé en local sur cache froid avec de nombreux encodages AVIF simultanés (pages Blue Baie, voir §14). Vérifier le comportement sur la préproduction Vercel ; envisager des sources Blue Baie plus légères que les PNG de 2 Mo.
6. Erreur préexistante de l’accueil : clé React dupliquée `create` dans la section capacités (hors périmètre, non modifiée) ; avertissements Next sur `images.qualities` à configurer avant Next 16.
7. Ligne obsolète de `tests/browser/local.spec.ts` (bouton vidéo Bout du Monde) à mettre à jour par le lot concerné.
8. Validation artistique finale par le propriétaire.
