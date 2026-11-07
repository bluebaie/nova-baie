# LOT C.5.3 — Blue Baie, creative motion

## État Git

- Branche de travail : `refonte-nova-baie-c5-3-motion`.
- Commit de départ : `cd717ee9c0a7dda54f0fe9e46e34778a543e4d5c` (C.5.2).
- Changements limités à la fiche Blue Baie, au système de motion partagé et à sa recette Playwright. Les médias utilisateurs non suivis sont restés intacts et non ajoutés.
- Aucun push, déploiement, appel aux services Blue Baie ou nouvelle dépendance.

## Direction et principes

Le fil graphique « From the coast to the code » relie maintenant les scènes par des courants SVG qui passent de courbes maritimes à des tracés plus structurés, puis à une ligne d'horizon. Les raccords emploient les couleurs des fonds adjacents pour adoucir les changements de lumière. Les transitions sont décoratives et ne portent pas de contenu essentiel.

Les références consultées ont servi à retenir des principes, pas à reprendre leur code : défilement natif pilotant progressivement une animation, révélation par trajectoire SVG, et continuité visuelle entre scènes. La documentation GSAP décrit les options de scrub, de déclenchement, de rafraîchissement et de pinning; aucun pinning n'a été ajouté. L'exemple Awwwards Convex Seascape met en avant un récit océanique immersif. Codrops a refusé la consultation automatisée (403) et les deux pages Awwwards Stillstrom/Hanwha Ocean ont expiré pendant la collecte; leur contenu n'est pas présenté comme analysé. Sources : [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [Convex Seascape Survey — Awwwards](https://www.awwwards.com/inspiration/zoom-in-convex-seascape-survey), [Codrops — SVG mask transitions](https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/), [Stillstrom — Awwwards](https://www.awwwards.com/inspiration/3d-scroll-stillstrom-by-maersk), [Hanwha Ocean — Awwwards](https://www.awwwards.com/inspiration/scroll-animation-fpso-floating-production-storage-and-offloading-hanwha-ocean).

## Changements

- Ajout de trois coutures SVG entre territoire et site, parcours public et plateforme, puis réseau et conclusion; un raccord complémentaire relie le descriptif de plateforme à l'interface de démonstration.
- GSAP/ScrollTrigger dessine ces lignes au scroll, donne une faible parallaxe à la photographie territoriale, fait émerger le panneau de démonstration par translation/échelle modérées et fait converger le tracé confirmé de l'écosystème. La lumière du final s'ouvre progressivement.
- Les huit onglets de démonstration, leur mention persistante de données fictives, les contenus, les médias et l'ordre de la page sont conservés.
- Les nouveaux mouvements se limitent à Blue Baie. Ils sont désactivés sur petit écran et avec `prefers-reduced-motion`. Ils n'utilisent que `transform` et le tracé SVG, sans pinning ni interception du défilement. Le contenu reste visible si GSAP ne se charge pas.
- Aucun asset ni coût tiers n'a été ajouté. Le chargement différé existant de GSAP demeure en place.

## Fichiers concernés

- `src/components/shared/blue-baie-case.tsx` — marqueurs de scènes et coutures SVG décoratives.
- `src/components/ui/creative-motion.tsx` — animations de la narration Blue Baie, isolées dans le contexte GSAP existant.
- `src/app/globals.css` — palette, raccords, tailles et règles mouvement réduit.
- `tests/browser/c5-3-blue-baie-motion.spec.ts` — parcours enregistré, captures par scène, défilement avant/arrière, huit onglets, contrôle de visibilité, overflow et mouvement réduit.

## Vérifications exécutées

- `npm run lint` : réussi.
- `npm run typecheck` : réussi.
- `npm run build` avec `NEXT_TEST_WASM_DIR` défini sur `node_modules/@next/swc-wasm-nodejs` : réussi; les routes FR/EN Blue Baie et Saint-Jean sont compilées.
- `git diff --check` : réussi.
- `npm test` : bloqué avant l'exécution des tests par Node 24 (`uv_os_get_passwd returned ENOMEM`). Relancé séparément avec le même résultat.
- `npm run test:e2e -- --grep C5.3` sur le port 3189, puis le test mouvement réduit sur 3192 : Playwright a lancé le serveur et annoncé le démarrage des tests, mais Chromium n'a produit ni assertion ni artefact et le processus ne répondait plus. Le contrôle navigateur n'est donc pas déclaré réussi.
- Lighthouse, FPS, captures visuelles réelles et vidéos de revue : non mesurés/non produits en raison de ce blocage de l'environnement navigateur. La recette est prête à générer les captures `test-results/lot-c5-3/*-1440.png` et la vidéo Playwright lors d'une exécution fonctionnelle.

## Performance, accessibilité et limites

Aucun chiffre de performance C.5.3 n'est avancé. Le code n'ajoute pas de dépendance ni de contenu vidéo/image. Les animations sont bornées, réversibles au scroll, rafraîchies après redimensionnement et nettoyées par le contexte GSAP déjà utilisé. Les vues mobile et réduite gardent les formes statiques et tout le contenu lisible. La validation visuelle du mouvement reste à effectuer dans Chromium; la recette doit être relancée avant validation artistique finale.

## Retour arrière et prévisualisation

Le retour arrière consiste à annuler le commit C.5.3 sur cette branche. Aucun original utilisateur n'est concerné.

```powershell
npm run dev -- --hostname localhost --port 3198
```

Ouvrir `http://localhost:3198/realisations/blue-baie-conciergerie` ou `/en/realisations/blue-baie-conciergerie`. Pour les captures et la vidéo automatisées, choisir un port libre via `$env:PLAYWRIGHT_PORT='3198'` puis lancer `npm run test:e2e -- --grep C5.3`.
