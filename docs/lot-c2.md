# Nova Baie — LOT C.2 : Creative Excellence

État au 6 novembre 2026. Branche locale `refonte-nova-baie-c2`, issue du commit LOT C `c4cf4b1c5543e977b3d84cd64b5507812ba5c91f`. `main` n’a pas été modifiée. Aucun push, déploiement, changement Vercel/Make/GTM, secret réel ni appel de formulaire client n’a été effectué.

## Direction artistique

La direction « **L’horizon devient une interface** » reprend l’horizon du logo Nova Baie comme grammaire graphique : tracés topographiques, courbes SVG, repères de coordonnées, lignes de passage et compositions de lumière inspirées de la baie. Le bleu nuit, le turquoise, le champagne, l’ivoire, le logo officiel et la photographie aérienne originale restent les repères de marque. Les sections alternent scènes sombres et éditoriales lumineuses, avec davantage d’asymétrie, de relief et de typographie de grande échelle.

Les références consultées sont [From Another](https://www.fromanother.love/), [Stefan Vitasovic](https://stefanvitasovic.dev), [DNA Studio](https://dnastudio.sa/en) et les articles Codrops sur les [transitions SVG avec GSAP](https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/) et la [typographie au défilement](https://tympanus.net/codrops/2023/01/18/on-scroll-typography-animations/). Elles ont guidé l’étude de la composition par scènes, des révélations et de la profondeur ; aucune mise en page ni ressource n’a été copiée.

## Système, interactions et bibliothèques

- Le hero conserve sa structure validée et ajoute une parallaxe modérée sur la photo, l’horizon vectoriel et une lumière d’eau liée au pointeur. Elle est réservée aux écrans larges et pointeurs non tactiles ; le contenu HTML reste visible avant JavaScript.
- Les capacités deviennent trois scènes interactives « Créer / Connecter / Faire évoluer », illustrées par des SVG Nova Baie (monogramme, réseau, tracés). Les onglets sont pilotables au clavier.
- La méthode devient un parcours visuel sélectionnable, avec rail SVG desktop et chemin distinct mobile.
- Le portfolio utilise des cadrages authentiques en grand format, une composition desktop/mobile uniquement lorsqu’une capture mobile réelle existe, des actions séparées pour « Découvrir la réalisation » et « Visiter le site », et des présentations typographiques quand aucune image n’existe.
- Deux études de cas publiées et traduites sont accessibles : `/realisations/blue-baie-conciergerie` et `/realisations/conciergerie-saint-jean`. Les autres slugs restent non publiés et exclus des paramètres statiques. CycloSport demeure « en finalisation » sans étude de cas ni lien inventé.
- `src/components/ui/creative-motion.tsx` charge GSAP et ScrollTrigger à l’approche des scènes, seulement à partir de 768 px, sans préférence de mouvement réduit, et anime les tracés SVG / images via `transform`. Le défilement reste natif ; aucun pin ni WebGL n’est utilisé.
- GSAP `3.15.1`, sous sa [licence standard](https://gsap.com/community/standard-license/), est la seule dépendance de production ajoutée. L’usage commercial est permis selon ses conditions publiées. Aucun React Bits, moteur 3D, service externe ou abonnement n’a été ajouté.

Le système d’espacement, de composition, de couleur, d’états, d’élévation et de responsive s’appuie sur les tokens déjà présents dans `src/app/globals.css`. Playfair Display et Inter, déjà chargées par `next/font`, restent en place : aucune nouvelle police ou ressource distante n’a été introduite.

## Portfolio, données et contenus

`src/lib/projects.ts` est la source de données locale extensible des projets : ID et slug stables, statut d’avancement, publication de l’étude, visibilité et ordre d’accueil, ordre portfolio indépendant, contenus FR/EN, catégorie, expertises/technologies vérifiées, logo, capture principale, variantes mobile, galerie, vidéo, lien externe daté comme vérifié, contenu de cas et métadonnées SEO. Les listes et tris sont calculés depuis ces champs ; les libellés ne codent aucun total de références.

Les captures utilisées sont les ressources déjà présentes pour les quatre projets concernés (Blue Baie, Saint-Jean, Le Bout du Monde et Gîtes en Baie). Les captures Blue Baie et Saint-Jean proviennent des sites publics ; aucun écran privé ni résultat client non fourni n’est exposé. Les sites des références ayant une URL déclarée ont répondu HTTP 200 lors d’une vérification publique GET le 6 novembre 2026 ; les tests de navigateur bloquent les domaines externes et ne les ouvrent donc pas. Le CycloSport n’a pas de visuel public validé dans le dépôt. Aucun logo de projet ou vidéo Saint-Jean autorisé n’est disponible ; ils ne sont pas simulés. Les vidéos historiques du Bout du Monde, Gîtes en Baie et Refuge ne sont montées qu’après activation volontaire, sans son ni préchargement.

Blue Baie Conciergerie est présenté comme étude de cas la plus riche et décrit l’activité publique de conciergerie en Baie de Somme, le site `bluebaie.fr`, les outils métier et la relation publique avec Conciergerie Saint-Jean. Les textes ne contiennent ni données internes, ni statistiques, ni témoignages inventés.

## Fichiers concernés

Les changements applicatifs portent sur :

- `src/lib/projects.ts` ; `src/app/[locale]/realisations/[slug]/page.tsx` ; `src/app/sitemap.ts`.
- `src/components/ui/creative-motion.tsx`, `src/components/ui/motion-scene.tsx` et `src/components/shared/project-card.tsx` / `project-video.tsx`.
- `src/components/home/hero-section.tsx`, `capabilities-section.tsx`, `capability-studio.tsx`, `method-section.tsx`, `method-journey.tsx` et `work-preview-section.tsx`.
- `src/app/[locale]/layout.tsx`, `services/page.tsx`, `realisations/page.tsx`, `contact/page.tsx`, `src/app/globals.css`, `messages/fr.json`, `messages/en.json`.
- `package.json`, `package-lock.json`, `tests/content.test.ts`, `tests/seo.test.ts`, `tests/browser/local.spec.ts`, `tests/browser/visual.spec.ts`, `tests/browser/c2-review.spec.ts` et `scripts/lighthouse-c2.mjs`.

Les routes A/B, le contrat de formulaire sécurisé, son API, les validations, les protections antiabus, les données Make, les URL publiques historiques, robots, hreflang, sitemap et schémas commerciaux existants sont conservés. Le sitemap ajoute les deux nouvelles fiches dans chaque langue. Les fiches produisent des métadonnées uniques, canoniques, alternates et `CreativeWork` structurés.

## Avant / après et mesures de performance

Avant C.2 : direction raffinée mais séquences plus statiques, capacités sous forme de colonnes classiques, étapes de méthode verticales et portfolio en cadres de captures. Après C.2 : scènes éditoriales sombres et lumineuses, art vectoriel interactif, méthode sur un tracé sélectionnable, mises en page asymétriques, cartes média immersives et études de cas avec contenu vérifié.

`npm run build` avec la procédure SWC WASM Windows (Next `15.5.29`) produit 24/24 pages statiques/générées, dont les quatre fiches publiées (deux slugs × deux langues). Les bundles partagés restent à 103 kB. L’accueil affiche 130 kB First Load JS contre 126 kB dans le relevé LOT C, soit environ 4 kB supplémentaires ; le chunk GSAP/ScrollTrigger est chargé à la demande sur desktop lorsque la scène est proche de l’écran. Les pages secondaires restent entre 120 et 126 kB selon la table de build. Le build conserve l’avertissement connu Next : une route au runtime Edge ne peut pas être générée statiquement ; le build réussit.

Mesures Lighthouse 13.6.0 reproductibles, build local, Chrome headless, throttling simulé, hôtes HTTPS bloqués : les rapports JSON sont dans `test-results/lighthouse-c2/` (ignoré par Git). Scores :

| Page | Mobile perf. / accessibilité / BP / SEO | LCP / FCP / TBT / CLS | Desktop perf. / accessibilité / BP / SEO | LCP / FCP / TBT / CLS |
| --- | --- | --- | --- | --- |
| Accueil | 95 / 100 / 100 / 92 | 2 946 ms / 914 ms / 38 ms / 0,0002 | 96 / 100 / 100 / 92 | 2 826 ms / 911 ms / 16 ms / 0,0002 |
| Expertises | 100 / 100 / 100 / 92 | 911 ms / 911 ms / 13 ms / 0,0001 | 100 / 100 / 100 / 92 | 908 ms / 908 ms / 14 ms / 0,0001 |
| Réalisations | 100 / 100 / 100 / 92 | 911 ms / 911 ms / 10 ms / 0,0003 | 100 / 100 / 100 / 92 | 910 ms / 910 ms / 16 ms / 0,0003 |
| Contact | 100 / 100 / 100 / 92 | 910 ms / 910 ms / 10 ms / 0,0001 | 100 / 100 / 100 / 92 | 909 ms / 909 ms / 12 ms / 0,0001 |

Lighthouse LOT C relevait accueil mobile 95 (LCP 2,867 s) et desktop 100 (LCP 0,601 s). La mesure mobile C.2 reste comparable (95, +79 ms LCP), mais la mesure desktop est sensiblement moins bonne (96, LCP 2,826 s). Le FCP desktop C.2 (~0,91 s contre 0,248 s précédemment) suggère une variation de l’environnement de mesure ou une régression de laboratoire. Il ne faut pas conclure que la performance terrain s’est dégradée sans profil matériel et trace de référence identiques ; ce résultat constitue néanmoins un point de contrôle à refaire sur un environnement stable avant publication. INP terrain n’est pas mesurable sans utilisateurs. Le SEO Lighthouse local de 92 est identique à la lecture LOT C et reste pénalisé par l’écart entre le domaine local et les URL canoniques de production.

Le script reproductible prend une origine locale optionnelle et peut réduire le périmètre, par exemple : `node scripts/lighthouse-c2.mjs http://localhost:3147 / mobile,desktop`. Par défaut il contrôle les quatre pages commerciales en mobile et desktop et écrit `test-results/lighthouse-c2/summary.json`.

## Recette et preuves visuelles

Résultats exécutés :

- `npm run lint` : réussi, zéro avertissement.
- `npm run typecheck` : réussi.
- `npm test` : 64/64 réussis après les ultimes assertions de contenu éditorial.
- `npm run build` : réussi avec `NEXT_TEST_WASM_DIR` pointant sur `node_modules/@next/swc-wasm-nodejs` ; 24 routes générées.
- `npm run test:e2e` : 55/55 cas ont affiché un résultat réussi lors de la passe finale. Le wrapper Playwright/Next a conservé son serveur enfant après le dernier test sous Windows ; le processus local a été arrêté ensuite. Aucun échec de test n’a été affiché.
- Recette axe-core : les huit combinaisons langue × largeurs testées couvrent six pages chacune (quatre pages commerciales et deux études publiées) ; après correction du contraste de la signature décorative des études, les huit vues ont passé zéro violation.
- La recette Playwright ciblée C.2 a passé les deux parcours (desktop interactif et mobile). Les vidéos valides sont `test-results/c2-review-C2-motion-review-90518-y-scene-work-and-case-study/video.webm` et `test-results/c2-review-C2-motion-review-f2c01-able-without-pointer-motion/video.webm`. Elles sont locales, ignorées par Git, et ne contiennent aucune interaction avec les domaines tiers.
- Les captures complémentaires sont sous `test-results/` : `lot-c2-home-desktop.png`, `lot-c2-portfolio-desktop.png`, `lot-c2-case-mobile.png`, ainsi que les vues `lot-c-fr-{home,services,realisations,contact}-{390,768,1024,1440}.png` et leurs versions EN produites par la revue axe. Elles ne sont pas suivies par Git.
- `npm audit --omit=dev` : zéro vulnérabilité dans les dépendances de production.

Les tests de formulaire utilisent une réponse simulée/route locale. Aucun appel Make réel n’a été fait. Les liens de sortie sont vérifiés dans le DOM et leurs URL contrôlées séparément par GET public ; Playwright bloque toute navigation externe.

## Accessibilité, sécurité, coût et maintenance

La navigation clavier est assurée pour les onglets d’expertises et de méthode ; les cartes ont une action réelle au clavier, les liens externes utilisent `target="_blank"` et `rel="noopener noreferrer"`, les vidéos sont activées volontairement et les états focus sont audités. Axe ne signale pas de violation sur les vues couvertes. Les tests valident `prefers-reduced-motion`, sans remplacer une revue manuelle lecteur d’écran/clavier.

Le transport du formulaire reste intact et n’a pas été dirigé vers Make pendant les tests. Les secrets n’ont pas été lus ou modifiés. La motion GSAP n’est chargée que dans les scènes pertinentes, sur desktop et sans mouvement réduit ; le mouvement natif reste disponible. Pas de nouvelle dépense récurrente. Maintenance : conserver les ordres indépendants des projets, ne publier une étude qu’après contrôle des textes/médias/droits et garder l’inventaire des liens vérifiés à jour.

## Reste à valider et ressources manquantes

**RÉALISÉ :** direction C.2, scènes de capacités, interactions de méthode, portfolio, fiches dynamiques, modèle de données extensible, SEO local et parcours responsive.

**TESTÉ :** build, liens internes, formulaires simulés, FR/EN, métadonnées, route publiée/non publiée, images, réduction du mouvement, navigation mobile/desktop, captures et vidéos locales ; axe zéro violation sur les vues indiquées.

**RESTE À VÉRIFIER :** confirmer les droits de publication des captures publiques et des logos des clients ; récupérer une capture authentique du CycloSport après validation de livraison et autorisation ; obtenir, si souhaité, une source vidéo Saint-Jean autorisée ; refaire la mesure desktop sur le même runner stable que le LOT C ; revue manuelle de contraste/contextes, lecteur d’écran et navigateurs secondaires.

**BLOQUÉ :** aucun média manquant ne bloque l’architecture. CSC reste non indexé et sans lien/image public.

**DÉCISION UTILISATEUR NÉCESSAIRE :** revue visuelle et validation des droits des captures avant publication. Aucune action administrateur distante n’a été entreprise.

## Prévisualisation et retour arrière

Prérequis : versions Node/npm indiquées dans `package.json`, dépendances présentes. Pour démarrer localement :

```powershell
npm ci
$env:NEXT_TEST_WASM_DIR = (Resolve-Path node_modules/@next/swc-wasm-nodejs).Path
npm run build
npm run start -- --hostname localhost --port 3147
```

Ouvrir `http://localhost:3147/` (FR), `/services`, `/realisations`, `/contact`, `/en/` et les deux URLs de fiches publiées. La vidéo de revue est lisible dans un lecteur WebM à partir des deux chemins ci-dessus ; les PNG de revue sont sous `test-results/`.

Retour arrière local : annuler le commit de livraison C.2 ou revenir au commit du LOT C `c4cf4b1c5543e977b3d84cd64b5507812ba5c91f` sur la branche de travail. Aucun changement distant n’est à inverser.
