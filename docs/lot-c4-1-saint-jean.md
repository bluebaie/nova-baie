# LOT C.4.1 — Finitions Saint-Jean

## État Git

- Branche conservée : `refonte-nova-baie-c4-saint-jean`.
- Commit de départ : `774f8f4d4e1fa7b0da772fea118f12c287e08bc9`.
- Les fichiers utilisateur non suivis dans `public/media/projects/blue-baie/` ainsi que les originaux Saint-Jean non suivis ont été laissés intacts et hors du commit.
- Aucun push, déploiement, changement de service distant ou appel Make.

## Correctifs réalisés

- Les captures de site Saint-Jean utilisent `quality=90` dans le hero, la galerie et les cartes projet, `95` dans le zoom plein écran. La qualité Next par défaut est 75 ; le réglage est limité aux médias Saint-Jean qui contiennent de la typographie d'interface.
- Le hero est maintenant marqué `fetchPriority="high"`, en plus de son chargement prioritaire. Le téléphone du hero reste différé.
- Les tailles `sizes` de la carte portfolio sont ajustées à sa colonne (44vw desktop, 88vw tablette, 100vw mobile). Les captures sources restent servies par `next/image` et ne sont pas forcées en original.
- La taille de l'image logo projet respecte la source 1008 × 719 et sa taille réelle d'affichage, plutôt que de demander une miniature carrée 72 × 72.
- La carte Saint-Jean utilise la variante officielle champagne avec transparence. Sa plaque bleue a été supprimée ; aucune règle ne touche au logo Blue Baie. Le logo de la fiche conserve sa variante champagne sur fond sombre.
- La conclusion a sa propre scène bleu nuit, une lumière champagne, des courbes d'horizon, un contenu révélé par le système existant, et un CTA avec retour visuel au survol et au focus. Le titre, son paragraphe et le bouton ont des espacements séparés.
- Le diagramme factuel « site public / voyageurs et propriétaires / back-office métier » conserve ses libellés et reçoit des tracés SVG reliés, dessinés par GSAP/ScrollTrigger à proximité du viewport. Aucune interface privée ou capacité nouvelle n'est représentée.
- La version mobile masque les liaisons décoratives du diagramme et garde les trois blocs lisibles en colonne.

## Netteté et médias

Les huit captures d'écran fournies sont des JPEG authentiques, de dimensions intrinsèques suivantes :

| Capture | Dimensions |
| --- | ---: |
| `screens/home-desktop.jpg` | 1915 × 1017 |
| `screens/home-mobile1.jpg` | 1220 × 2712 |
| `screens/home-mobile2.jpg` | 1220 × 2712 |
| `screens/services.jpg` | 1917 × 1031 |
| `screens/owners.jpg` | 1917 × 1026 |
| `screens/logement.jpg` | 1916 × 1027 |
| `screens/contact.jpg` | 1917 × 1027 |
| `screens/detail-design.jpg` | 1917 × 1036 |

À 100 % dans le navigateur Playwright/Chrome, le hero desktop a sélectionné `home-desktop.jpg&w=1080&q=90` pour environ 694 px CSS à 1440 px ; à 390 px, il a sélectionné `w=640&q=90` pour environ 335 px CSS. En contexte portfolio, la largeur de la colonne est désormais correctement décrite à Next/Image. Le zoom plein écran utilise des dimensions portrait pour les vues téléphone, ce qui évite de leur attribuer le ratio paysage des captures desktop.

Les originaux sont nets à l'inspection visuelle ; aucun média source n'a été remplacé, filtré ou réécrit. Les captures d'interface sont servies à une qualité supérieure à la configuration par défaut. Les aperçus optimisés sont mis en cache par Next ; le rendu observé est suffisamment détaillé à l'échelle affichée. La source mobile `home-mobile1.jpg` reste une capture très haute (1220 × 2712) et n'est pas agrandie artificiellement.

Les trois variantes officielles de logo sont des PNG transparents 1008 × 719 (`champagne`, `craie`, `or`). Le portfolio et l'accueil utilisent `brand/logo-conciergerie-saint-jean-champagne.png` sans fond CSS. Les vues de revue ont été enregistrées dans `test-results/c4-1-review/`.

## Performance locale

Les mesures sont des audits Lighthouse 13.6 simulés sur le build local, hôtes externes bloqués ; elles ne sont pas des données terrain. Le rapport C.4 consignait une passe mobile à 92 / LCP 3255 ms / TBT 72 ms / CLS 0 et desktop à 91 / 3136 ms / 187 ms / 0.0001. Deux passes C.4.1 après compilation ont donné :

| Profil | Performance | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: |
| Mobile, passe 1 | 88 | 3342 ms | 243 ms | 0 |
| Desktop, passe 1 | 87 | 3206 ms | 285 ms | 0.0001 |
| Mobile, passe 2 | 88 | 3197 ms | 273 ms | 0 |
| Desktop, passe 2 | 91 | 3192 ms | 188 ms | 0.0001 |

L'élément LCP reste la capture hero. Lighthouse confirme désormais que la ressource est visible dans le HTML initial, chargée sans lazy-loading et de priorité haute. Le transfert de l'image optimisée est court dans les traces observées, mais le LCP simulé varie et ne s'améliore pas de façon constante par rapport au relevé C.4. Aucune baisse de LCP n'est revendiquée. Les scores et TBT mobiles sont à recontrôler dans un environnement de mesure stable avant publication ; aucun INP terrain n'est disponible.

## Recette exécutée

- `npm run lint` : réussi, zéro warning.
- `npm run typecheck` : réussi.
- `npm test` : 64 tests réussis.
- `npm run build` : réussi avec la procédure WASM locale Windows ; routes statiques FR/EN générées, y compris les deux fiches de projets.
- `npm run test:e2e -- tests/browser/c4-saint-jean.spec.ts` : 3 scénarios affichés réussis (fiche française, fiche anglaise, carte accueil/portfolio). Vérifie médias, lien externe et `rel`, navigation clavier de la galerie, ouverture/fermeture du dialogue, lecteur vidéo déclenché à la demande, priorité du hero, variante et fond du logo, diagramme, ordre titre/texte/CTA et absence de débordement aux largeurs ciblées.
- `tests/browser/visual.spec.ts` : 4 scénarios FR et 4 EN affichés réussis aux largeurs 390, 768, 1024 et 1440 px. Chaque scénario parcourt accueil, expertises, réalisations, contact, Blue Baie et Saint-Jean ; les images visibles sont attendues chargées, le débordement est contrôlé et axe-core WCAG 2.1/2.2 AA ne signale aucune violation.
- Une revue Chrome des captures desktop et mobile a été réalisée. Le runner Playwright Windows reste ouvert après l'affichage de tous les succès et a dû être interrompu ; il n'a donc pas produit de résumé final ni un code de sortie nominal, problème déjà présent au LOT C.4.
- Aucun formulaire n'a été soumis ; aucun appel Make n'a été effectué.

## Fichiers concernés

- `src/app/globals.css` — identité du logo projet, diagramme, conclusion et responsive.
- `src/components/shared/project-card.tsx` — qualité, tailles et dimensions du logo Saint-Jean.
- `src/components/shared/saint-jean-case.tsx` — hero, tracés SVG et conclusion.
- `src/components/shared/saint-jean-media.tsx` — qualité, tailles et ratios du zoom galerie.
- `src/lib/projects.ts` — variante logo champagne.
- `tests/browser/c4-saint-jean.spec.ts` — assertions visuelles et fonctionnelles supplémentaires.
- `docs/lot-c4-1-saint-jean.md` — présent rapport.

## Limites, coûts et retour arrière

- Pas de nouvelle dépendance, service payant, requête distante ou modification du formulaire. GSAP/ScrollTrigger existant est réutilisé ; il ne se charge que pour la scène observée et reste neutralisé avec `prefers-reduced-motion`.
- Les originaux d'images et le MP4 utilisateur n'ont pas été modifiés. Le droit de diffusion commerciale de la piste audio reste à valider ; le site conserve la vidéo muette.
- Les vérifications axe portent sur les règles automatisables et ne remplacent pas une validation manuelle de contraste, lecteur d'écran et geste tactile. Les liens publics client n'ont pas été réouverts par le test, qui bloque les hôtes externes.
- Retour arrière : revenir au commit C.4 `774f8f4d4e1fa7b0da772fea118f12c287e08bc9` ou annuler uniquement le commit local C.4.1. Les médias non suivis ne font pas partie du commit.

## Prévisualisation locale

Depuis la racine du dépôt, avec un port libre (exemple 3170) :

```powershell
$env:NEXT_TEST_WASM_DIR = (Resolve-Path 'node_modules/@next/swc-wasm-nodejs').Path
$env:NEXT_TELEMETRY_DISABLED = '1'
npm run build
npm run start -- --hostname localhost --port 3170
```

Ouvrir `http://localhost:3170/realisations/conciergerie-saint-jean` ou `/en/realisations/conciergerie-saint-jean`. Aucun port ou service distant n'est modifié.
