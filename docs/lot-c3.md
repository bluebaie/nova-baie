# Nova Baie — LOT C.3

## État Git

- Branche de travail : `refonte-nova-baie-c3`.
- Base conservée : commit LOT C.2 `1d7ab2a19d06589d025e1c0792f2d553cfc61f92`.
- Les lots A, B, C et C.2 restent dans l’historique ; aucun push, déploiement, appel Make ou changement distant n’a été effectué.
- Aucun secret ou environnement réel n’a été lu ni utilisé.

## Direction artistique et corrections

Le LOT C.3 affine la scène existante « L’horizon devient une interface » au lieu de la remplacer. Les animations GSAP/ScrollTrigger, la parallaxe, les interactions des capacités, les tracés SVG, les compositions desktop/mobile, les transitions, les préférences de mouvement réduit et le formulaire sécurisé sont conservés.

Les marques projetées par le portfolio proviennent maintenant des données authentiques : le logo Blue Baie officiel apparaît sur la carte et la fiche Blue Baie ; la fiche Saint-Jean s’appuie sur son identité et ses captures publiques réelles. Les monogrammes décoratifs « NB » et leurs règles CSS ont été supprimés. Les captures privées d’administration ne sont pas publiées.

Les retouches comprennent :

- une variante de fiche `ecosystem` Blue Baie et une variante `editorial` Saint-Jean, pilotées par les données projet et composées avec des modules réutilisables ;
- un hero de fiche plus éditorial, avec titre contenu, identité client, activité, localisation, liens visibles, captures desktop et téléphone en perspective ;
- une étude d’interface desktop/mobile avec contrôles clavier/tactiles accessibles ;
- un schéma Blue Baie simplifié à partir des éléments de périmètre documentés. Le texte précise qu’il ne décrit pas l’architecture interne ; aucune donnée privée n’est montrée ;
- une composition de direction artistique spécifique à Saint-Jean plutôt qu’une répétition du schéma Blue Baie ;
- des tailles, respirations, contrastes et niveaux de superposition revus sur les capacités, les titres et les fiches mobiles ;
- des SVG explicitement non remplis. Les chemins ouverts ne produisent donc pas de formes noires implicites ; ils utilisent toujours les animations de tracé existantes ;
- un raccord du schéma Blue Baie aux tracés animés existants.

## Fiches de réalisations et médias

Les deux fiches publiées disposent de métadonnées uniques, canonical/hreflang, JSON-LD, liens vers le portfolio, CTA et liens externes avec `noopener noreferrer`. Les routes sont pré-rendues en FR et EN. `CycloSport Crotellois` reste en finalisation et brouillon ; les autres fiches incomplètes restent exclues des routes publiques.

Médias effectivement réutilisés :

- `/images/logo-blue-baie.png` — logo Blue Baie existant ;
- `/images/projects/blue-baie-public.webp` et `/images/projects/blue-baie-mobile.webp` — captures publiques existantes ;
- `/images/projects/saint-jean-public.webp` et `/images/projects/saint-jean-mobile.webp` — captures publiques existantes, qui montrent la marque Saint-Jean.

Médias manquants : aucun fichier de logo Saint-Jean autonome ni vidéo promotionnelle Saint-Jean n’a été trouvé. Les fiches ne fabriquent pas de logo ni de capture de remplacement. Les galeries réutilisent les captures desktop/mobile disponibles ; une galerie plus riche nécessitera d’autres captures publiques autorisées. Les médias existants des autres projets restent inchangés.

Le modèle local des projets conserve les identifiants, slugs, statuts, publication, visibilités, ordres d’accueil et portfolio indépendants, traductions, logos, médias, expertises, technologies, URLs et dates. Les variantes visuelles, l’activité et la localisation des études de cas sont portées par les données traduites. Aucun back-office, stockage ou authentification n’a été ajouté.

## Tests et revue

**Réalisé et testé :**

- `npm run lint` — réussi, zéro avertissement ;
- `npm run typecheck` — réussi ;
- `npm test` — 64/64 tests réussis ;
- `npm run build` — réussi avec SWC WASM sous Windows ; 24/24 routes générées, dont les quatre études de cas publiées FR/EN ; avertissement Edge runtime préexistant maintenu ;
- `npm run test:e2e` — les 58 scénarios ont tous affiché ✓ : enregistrements C.2/C.3, routes FR/EN, formulaire simulé pour 202/429/500/504, images, navigation, sécurité du formulaire, réductions de mouvement, contrôles responsive et axe ;
- axe-core : aucune violation sur les pages contrôlées aux largeurs 390, 768, 1024 et 1440 px dans les deux langues ;
- recette C.3 dédiée : chargement des captures réelles, bonne variante et URL client, attributs sécurisés, affichage desktop/mobile, focus/clavier, absence de débordement horizontal à 390 px, présence du logo Blue Baie au centre du schéma ;
- aucun test de contact n’a appelé Make ; les réponses HTTP sont simulées localement ;
- les vidéos Playwright C.3 ont été enregistrées dans `test-results/c3-case-studies-C3-blue-ba-eea27-ols-keyboard-and-responsive/video.webm`, `test-results/c3-case-studies-C3-concier-f98c7-ols-keyboard-and-responsive/video.webm` et `test-results/c3-case-studies-C3-keeps-i-933b7-educed-motion-compatibility/video.webm` ; elles sont ignorées par Git ;
- captures pleine page et revue visuelle réelle sous Chrome dans `test-results/`, notamment les vues C.3 des fiches `lot-c3-case-blue-baie-mobile.png`, `lot-c3-case-saint-jean-mobile.png` et les captures du lecteur média. Les tests visuels couvrent les quatre pages commerciales et les fiches dans les deux langues.

**Réserve sur le runner :** après l’affichage des 58 résultats positifs, le processus Playwright est resté ouvert lors de la fermeture du serveur de test Windows. Il a été interrompu manuellement après la fin des scénarios ; le shell n’a donc pas fourni son résumé de sortie propre. Le comportement de nettoyage du serveur est déjà documenté dans la recette C.2. Les scénarios et vidéos sont disponibles dans `test-results/`.

## Mesures Lighthouse locales

Lighthouse 13.6.0 a mesuré le build local avec throttling simulé, Chrome headless et les hôtes HTTPS bloqués. Les rapports JSON sont sous `test-results/lighthouse-c3/` (données locales ignorées par Git). INP réel ne peut pas être mesuré dans ce test de laboratoire.

| Page | Mobile : Perf. / A11y / SEO ; LCP / TBT / CLS | Desktop : Perf. / A11y / SEO ; LCP / TBT / CLS |
| --- | --- | --- |
| Accueil | 91 / 100 / 92 ; 2 538 ms / 299 ms / 0,0000 | 95 / 100 / 92 ; 2 749 ms / 112 ms / 0,0002 |
| Expertises | 100 / 100 / 92 ; 914 ms / 52 ms / 0,0001 | 99 / 100 / 92 ; 913 ms / 99 ms / 0,0001 |
| Réalisations | 100 / 100 / 92 ; 978 ms / 74 ms / 0,0001 | 100 / 100 / 92 ; 955 ms / 80 ms / 0,0001 |
| Contact | 100 / 100 / 92 ; 911 ms / 59 ms / 0,0001 | 100 / 100 / 92 ; 911 ms / 50 ms / 0,0001 |
| Blue Baie | 99 / 100 / 92 ; 2 225 ms / 64 ms / 0,0001 | 98 / 100 / 92 ; 2 334 ms / 63 ms / 0,0001 |
| Saint-Jean | 98 / 100 / 92 ; 2 339 ms / 59 ms / 0,0001 | 99 / 100 / 92 ; 2 222 ms / 57 ms / 0,0001 |

Pour les quatre pages principales, le LOT C.2 relevait respectivement 95/100/100/100 en performance mobile et 96/100/100/100 en desktop (accueil/expertises/réalisations/contact). C.3 mesure 91/100/100/100 en mobile et 95/99/100/100 en desktop. Les pages intérieures restent à 98–100. L’accueil présente un écart de score à investiguer avant publication : son LCP simulé est inférieur au relevé C.2 (2,54 s contre 2,95 s) mais son TBT mesuré est supérieur (299 ms contre 38 ms). Trois répétitions supplémentaires de l’accueil mobile donnent 92–93, LCP 2,56–3,02 s et TBT 121–215 ms. Ces écarts ne doivent pas être masqués par la variabilité de laboratoire ; il faut refaire la comparaison avec le même environnement contrôlé et profiler la tâche longue du document/chunk partagé avant mise en production. Aucun INP terrain n’est revendiqué.

Les fiches C.2 n’avaient pas de mesure Lighthouse de référence. Les deux nouvelles fiches mesurent 98–99 en performance et 100 en accessibilité dans ce profil. Le SEO Lighthouse local reste à 92, déjà documenté au C.2 : la canonique de production observée depuis localhost limite ce score et ne signifie pas que les balises publiées ont été remplacées. Les assertions unitaires et Playwright valident canoniques, langues et métadonnées.

## Fichiers modifiés ou créés

- `src/lib/projects.ts` — variantes et données traduites d’étude de cas ;
- `src/app/[locale]/realisations/[slug]/page.tsx` — composition des fiches ;
- `src/components/shared/case-study-media.tsx` — nouveau sélecteur d’interface desktop/mobile ;
- `src/components/shared/case-study-scope.tsx` — schéma Blue Baie ;
- `src/components/shared/project-card.tsx` — suppression du monogramme décoratif, logo client authentique ;
- `src/components/home/capabilities-section.tsx` — SVG de raccord sans remplissage implicite ;
- `src/components/home/capability-studio.tsx` — retrait du grand caractère décoratif ; interactions conservées ;
- `src/app/globals.css` — finitions de composition, typographie, transitions et responsive ;
- `messages/fr.json`, `messages/en.json` — libellés des nouveaux blocs et contrôles ;
- `tests/browser/c3-case-studies.spec.ts` — recette navigateur et enregistrements C.3 ;
- `tests/browser/visual.spec.ts` — captures visuelles clairement nommées C.3 ;
- `scripts/lighthouse-c2.mjs` — répertoire de sortie paramétrable par `LIGHTHOUSE_OUTPUT_DIR` pour préserver les rapports C.2 ;
- `docs/lot-c3.md` — ce compte rendu.

Aucune dépendance, police, bibliothèque, service payant, route administrative, base de données ou variable d’environnement n’a été ajoutée.

## Risques, limites et retour arrière

- Confirmer le droit d’utiliser les captures/logo clients et fournir un logo Saint-Jean autonome et une vidéo seulement si une version autorisée est disponible.
- Confirmer le contenu éditorial public de Blue Baie et Saint-Jean avant publication ; les données privées d’administration demeurent hors du site.
- Profiler le TBT de l’accueil dans une comparaison laboratoire contrôlée ; les premiers résultats C.3 ne montrent pas de dégradation CLS et maintiennent une accessibilité Lighthouse/axe à 100.
- Le runner Playwright Windows nécessite une vérification/fermeture manuelle après ses scénarios, sans effet sur le site.
- Aucun coût récurrent ni coût de dépendance supplémentaire.

Le retour arrière local est possible par un revert du commit LOT C.3 sur la branche `refonte-nova-baie-c3`. Les commits antérieurs ne sont ni réécrits ni supprimés. Ne pas fusionner ni publier avant revue humaine des fiches, des droits médias et du point TBT.

## Prévisualisation locale

Après installation déjà présente et compilation locale :

```powershell
$env:NEXT_TEST_WASM_DIR = (Resolve-Path 'node_modules/@next/swc-wasm-nodejs').Path
$env:NEXT_TELEMETRY_DISABLED = '1'
npm run build
npm run start -- --hostname localhost --port 3151
```

Ouvrir `http://localhost:3151/` ou `http://localhost:3151/en/`. Le port 3151 a été libre lors de la recette ; s’il est déjà occupé, choisir un autre port local libre. Aucun scénario Make n’est configuré dans le serveur de test.
