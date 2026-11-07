# LOT C.5.2 — Finitions de la fiche Blue Baie

## État Git et périmètre

- Branche de travail : `refonte-nova-baie-c5-2-finitions`.
- Base conservée : `c030c99692c5eb5de25ae72fb089dc26f31ad4d8` (C.5.1).
- Aucun changement à `main`, aucun push, déploiement, appel API distant ou modification de production.
- Les médias non suivis fournis par l’utilisateur, dont `images/keycafe/` et les médias Saint-Jean, sont restés intacts et n’ont pas été ajoutés au commit.
- `CLAUDE.md` est absent. `AGENTS.md` demande de consulter la documentation Next locale; `node_modules/next/dist/docs/` n’est pas disponible dans cette installation. Aucun nouvel API Next n’a été introduit.

## Diagnostic et corrections

### Grille de la plateforme

La grille `.bb-platform-row` déclarait trois colonnes tandis que le SVG enfant était forcé en colonne 1 et ligne 1. L’auto-placement des autres enfants pouvait alors envoyer la description dans une colonne implicite de 48 px. À 1440 px, la recette Playwright mesurait cette largeur; elle a servi de garde-fou pendant la correction.

La structure utilise maintenant quatre colonnes explicites sur grand écran : index, titre, texte et pictogramme. Sous 1120 px, le texte passe sur une deuxième rangée et utilise l’espace disponible. La correction des sélecteurs a également supprimé le conflit de spécificité avec l’ancienne règle ciblant tous les SVG. Les paragraphes des quatre rangées ont été vérifiés à 390, 768, 1024, 1440 et 1920 px.

### Titre admin et header

Le titre de la démonstration héritait de la couleur sombre globale des titres, sans bénéficier de `.surface-dark`. Il est maintenant explicitement ivoire (`#f5f4ed`) sur le fond nuit. Un `id` de section et un `scroll-margin-top` dédié au titre complètent le décalage global pour l’accès direct par ancre. La recette vérifie la couleur, la visibilité, les ancres EN et l’absence de recouvrement sous le header.

### Densité, transitions et CTA

- La hauteur minimale inutilisée de l’application admin a été retirée; le panneau conserve sa hauteur dictée par son contenu.
- Le ruban de données fictives peut se replier proprement.
- Les fonds plateforme, admin, écosystème et conclusion sont raccordés par des dégradés océaniques plus graduels.
- La conclusion garde ses tracés SVG, reçoit une lumière turquoise/champagne modérée, une largeur typographique maîtrisée et un survol du CTA basé sur `transform` et `box-shadow`.
- Le mouvement du CTA est désactivé avec `prefers-reduced-motion`. Les animations déjà présentes ne sont pas retirées.

### Captures mobile

Les JPG originaux n’ont pas été écrasés. Deux dérivés WebP recadrés retirent les éléments système visibles sur les originaux :

| Dérivé public | Source conservée | Dimensions / poids | Usage |
|---|---|---:|---|
| `screens/derived/home-mobile-clean.webp` | `screens/home-mobile1.jpg` | 1220 × 2278 / 249 714 octets | Hero, galerie, cartes portfolio |
| `screens/derived/content-mobile-clean.webp` | `screens/mobile2.jpg` | 1220 × 2465 / 236 222 octets | Galerie du parcours mobile |

L’inspection visuelle confirme qu’aucune barre d’état, batterie, barre d’adresse ou commande système n’apparaît dans ces cadrages. Les deux sources originales restent disponibles dans le dépôt local et ne sont pas référencées par le rendu public.

## Recette navigateur et preuves visuelles

Une recette dédiée (`tests/browser/c5-2-blue-baie-visual.spec.ts`) inspecte les dix scènes à 390, 768, 1024, 1440 et 1920 px. Elle mesure les paragraphes métier, contrôle la couleur et l’opacité des titres, les largeurs de document, les images échouées, les huit onglets interactifs et la séparation titre/paragraphe du final. Elle vérifie aussi la route anglaise, le canonical/hreflang, le mouvement réduit et l’ancre du titre admin.

Captures Playwright de revue, conservées localement et ignorées par Git :

- `test-results/lot-c5-2/blue-baie-full-390.png` — parcours mobile complet.
- `test-results/lot-c5-2/section-{1..10}-{390,768,1024,1440,1920}.png` — état de chaque scène aux cinq formats.
- `test-results/lot-c5-2/admin-{390,768,1024,1440,1920}.png` — démonstration admin au premier onglet.

Une inspection des rendus réels dans Chromium a été faite, notamment du parcours complet mobile, de la scène admin et de la scène plateforme desktop. Ces captures sont des preuves de revue du site Nova Baie, pas des captures supplémentaires du logiciel Blue Baie.

## Tests

- `npm run lint` : réussi, aucun avertissement.
- `npm run typecheck` : réussi.
- `npm test` : 65/65 réussis.
- `npm run build` avec le compilateur WASM Windows documenté : réussi; les routes Blue Baie FR/EN et Saint-Jean FR/EN sont générées.
- `npm run test:e2e -- --grep "C5.2"` : 2/2 scénarios réussis, incluant toutes les largeurs et les huit vues.
- `npm run test:e2e -- --grep "C5 Blue Baie|C5.2"` : 3/3 scénarios réussis, dont la route anglaise et les liens/galeries existants.
- Axe (`art review fr 390` et `art review /en 390`) : zéro violation sur ces deux parcours ciblés. Les tests d’accessibilité couvrent la page avec les autres pages du même lot visuel existant.
- `git diff --check` : aucun whitespace error.
- Aucun formulaire n’a été soumis; aucune requête Make ou service client n’a été déclenchée.

Le runner Playwright conserve parfois un processus après la réussite de tous les scénarios; `Ctrl+C` a été utilisé après l’affichage du succès. Les assertions et captures se terminent avant ce blocage du runner.

## Performance — Lighthouse local simulé

Même script Lighthouse du dépôt, route Blue Baie seule, ressources externes bloquées. Deux passages locaux ont montré de la variabilité :

| C.5.1 de référence | Dernière mesure C.5.2 | Passage précédent C.5.2 |
|---|---:|---:|
| Mobile : performance 88, LCP 3549 ms, TBT 180 ms, CLS 0 | performance 87, LCP 3822 ms, TBT 138 ms, CLS 0 |
| Desktop : performance 91, LCP 3397 ms, TBT 125 ms, CLS 0,0001 | performance 91, LCP 3380 ms, TBT 108 ms, CLS 0,0001 |

Le passage C.5.2 précédent a donné 90 / LCP 3567 ms / TBT 110 ms sur mobile et 91 / 3379 ms / 124 ms sur desktop. Le score desktop reste stable; le LCP mobile n’est pas amélioré de façon fiable et sa dernière mesure est plus lente que C.5.1. Les mesures sont simulées et varient localement; elles ne représentent pas les données réelles des visiteurs. Les captures mobiles plus légères réduisent le poids des dérivés publics, mais ne suffisent pas à établir un gain de LCP.

## Fichiers du lot

- `src/app/globals.css` — grille responsive, lisibilité admin, espaces, ancre, transitions, CTA et réduction de mouvement.
- `src/components/shared/blue-baie-admin-demo.tsx` — ancre de section.
- `src/components/shared/blue-baie-case.tsx` — dérivé mobile du hero, structure de grille et classe de pictogramme.
- `src/lib/project-case-media.ts`, `src/lib/projects.ts` — références aux dérivés mobiles publics.
- `tests/content.test.ts` — assertion sur la source mobile Blue Baie.
- `tests/browser/c5-2-blue-baie-visual.spec.ts` — recette visuelle multi-largeur et EN.
- `public/media/projects/blue-baie/screens/derived/*.webp` — nouveaux dérivés issus uniquement des captures publiques.

Saint-Jean, son contenu, ses médias et le formulaire sécurisé ne sont pas modifiés. Les captures privées d’administration ne sont ni lues ni intégrées.

## Performance, sécurité, maintenance et retour arrière

Aucune dépendance, base de données, API ou ressource distante n’a été ajoutée. La galerie admin conserve ses données déterministes fictives et son avertissement permanent. Les assets sources restent séparés des dérivés. Les seules limites de performance constatées sont celles du LCP mobile simulé mentionnées ci-dessus.

Le retour arrière consiste à révoquer le commit C.5.2 sur la branche de travail; ne pas réinitialiser la branche ni toucher aux médias originaux. Les dérivés peuvent être retirés avec ce même revert puisqu’ils sont limités aux deux nouveaux fichiers WebP.

## Prévisualisation

```powershell
npm run start -- --hostname localhost --port 3178
```

Ouvrir `http://localhost:3178/realisations/blue-baie-conciergerie` ou `/en/realisations/blue-baie-conciergerie`.
