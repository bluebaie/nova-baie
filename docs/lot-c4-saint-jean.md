# LOT C.4 — Étude de cas Conciergerie Saint-Jean

## État Git

- Branche de travail : `refonte-nova-baie-c4-saint-jean`.
- Commit de départ C.3 : `1a3c4db6dcedb659701f7114fe3494dab9b9a2ff`.
- Les commits A, B, C, C.2 et C.3 sont conservés.
- Aucun push, déploiement, changement distant ou appel Make n’a été effectué.
- Les médias source du propriétaire restent intacts. Le MP4 original n’est pas référencé par l’application et reste hors de l’index Git; seule sa version sans audio est utilisée par le site.

## Informations publiques vérifiées

La [page officielle Blue Baie consacrée à Saint-Jean](https://www.bluebaie.fr/conciergeriesaintjean) identifie Conciergerie Saint-Jean comme l’entité locale du groupe Blue Baie au Touquet et sur la Côte d’Opale. Elle décrit notamment la valorisation des logements, la création et la diffusion des annonces, la coordination des séjours et le suivi propriétaire. Elle cite Le Touquet-Paris-Plage, Stella-Plage, Berck-sur-Mer, Étaples-sur-Mer et Montreuil-sur-Mer.

L’[article officiel de présentation](https://www.bluebaie.fr/carnet-de-baie/blue-baie-conciergerie-renforce-sa-presence-au-touquet-avec-la-conciergerie-saint-jean) distingue le travail digital et les opérations de terrain. Aucun chiffre de réservation ou de performance de cette page n’est attribué à Nova Baie ou repris dans l’étude de cas.

Le domaine client `https://conciergeriesaintjean.fr/` reste le lien configuré dans les données projet et était noté comme vérifié le 6 novembre 2026. Le navigateur de test bloque par conception toute requête externe. Le site client direct n’a pas pu être récupéré par l’outil de consultation web lors de ce lot; la disponibilité et la destination finale après redirections sont donc à revérifier avant publication.

## Inventaire de la médiathèque fournie

Dimensions et poids observés avant traitement. Aucun original n’a été converti en place, déplacé ou supprimé.

| Fichier | Dimensions | Poids |
| --- | ---: | ---: |
| `presentation.mp4` | 1280 × 720, 30 s, H.264 + AAC | 11 651 266 o |
| `poster.jpg` | 1280 × 720 | 172 615 o |
| `screens/home-desktop.jpg` | 1915 × 1017 | 323 123 o |
| `screens/home-mobile1.jpg` | 1220 × 2712 | 1 415 742 o |
| `screens/home-mobile2.jpg` | 1220 × 2712 | 618 307 o |
| `screens/services.jpg` | 1917 × 1031 | 211 588 o |
| `screens/owners.jpg` | 1917 × 1026 | 254 961 o |
| `screens/logement.jpg` | 1916 × 1027 | 296 546 o |
| `screens/contact.jpg` | 1917 × 1027 | 250 017 o |
| `screens/detail-design.jpg` | 1917 × 1036 | 419 005 o |
| `brand/logo-conciergerie-saint-jean-champagne.png` | 1008 × 719, alpha | 30 561 o |
| `brand/logo-conciergerie-saint-jean-craie.png` | 1008 × 719, alpha | 30 576 o |
| `brand/logo-conciergerie-saint-jean-or.png` | 1008 × 719, alpha | 30 563 o |
| `brand/og-saint-jean.jpg` | 1200 × 630 | 113 693 o |
| `brand/social/accompagnement-accueil-chambre.jpg` | 1448 × 1086 | 232 390 o |
| `brand/social/accompagnement-mise-en-valeur-salon.jpg` | 1448 × 1086 | 262 340 o |
| `brand/social/accompagnement-reserve-chambre-orange.jpg` | 1448 × 1086 | 403 416 o |
| `brand/social/accompagnement-reserve-salon-balcon.jpg` | 1448 × 1086 | 435 791 o |
| `brand/social/accompagnement-respiration-terrasse.jpg` | 1448 × 1086 | 738 581 o |
| `brand/social/accompagnement-suivi-cuisine.jpg` | 1448 × 1086 | 353 460 o |
| `brand/social/og-berck.jpg` | 1200 × 630 | 108 409 o |
| `brand/social/og-etaples.jpg` | 1200 × 630 | 148 687 o |
| `brand/social/og-merlimont.jpg` | 1200 × 630 | 182 264 o |
| `brand/social/og-montreuil.jpg` | 1200 × 630 | 248 525 o |
| `brand/social/og-stella.jpg` | 1200 × 630 | 245 829 o |

Les captures et logos ont été ouverts avant sélection. La page utilise les huit captures, les trois variantes de logo, le visuel OG, et trois photographies originales de chambre, séjour et terrasse. Les autres images restent dans la médiathèque locale sans être utilisées. Le poster est conservé comme couverture du film.

## Direction artistique et narration livrées

- Hero sombre dédié à Saint-Jean : logo champagne officiel, localisation, titre éditorial mesuré, lien client visible, capture authentique desktop et écran mobile superposé.
- Séquence entreprise : service et territoires appuyés par les informations officielles Blue Baie et les photographies fournies.
- Séquence intervention : direction artistique, site public responsive et back-office métier avancé. Les écrans et données privés ne sont pas montrés.
- Galerie éditoriale des huit captures authentiques, avec compositions larges, moyennes et mobiles; chaque visuel ouvre un dialogue natif navigable au clavier (Échap, précédent/suivant, fermeture).
- Identité de marque : visuel OG et variantes réelles Or, Champagne et Craie.
- Film activé à la demande, lecteur natif contrôlable, sans lecture automatique et avec `preload="metadata"` après activation.
- Schéma éditorial public / visiteurs et propriétaires / back-office privé, explicitement qualifié de vue simplifiée et sans représentation de l’architecture interne.
- Conclusion CTA et liens croisés vers contact, portfolio et étude Blue Baie.
- Adaptation intégrale français/anglais; balises d’images contextualisées et focus visibles.

Les animations décoratives du hero sont des tracés SVG avec keyframes CSS et une révélation limitée dans le temps. Les animations GSAP/ScrollTrigger des scènes C.2/C.3 restent intactes sur les autres pages. Elles ne sont pas chargées pour deux tracés décoratifs Saint-Jean. Les effets sont désactivés avec `prefers-reduced-motion`.

## Vidéo et droits

`presentation-silent.mp4` a été dérivée localement avec FFmpeg à partir du média fourni : vidéo H.264 1280 × 720, 30 images/s, 30 secondes, sans piste audio, fast-start activé, CRF 24. Taille produite : 4 398 557 o, soit environ 62 % de moins que le fichier source. Le fichier audio AAC original n’est donc pas distribué par le lecteur du site. La piste Mixkit n’a pas été validée pour un usage commercial; le fichier original reste hors du dépôt suivi et ne doit pas être publié. Remplacement simple : fournir un fichier final autorisé puis modifier le chemin source du lecteur.

Les JPEG sont chargés avec `next/image`, dimensions intrinsèques et `sizes`; les images secondaires restent différées. Les originaux restent préservés dans `public/media/projects/conciergerie-saint-jean/`.

## SEO et liens

- URL française conservée : `/realisations/conciergerie-saint-jean`; équivalent anglais `/en/realisations/conciergerie-saint-jean`.
- Title et description uniques FR/EN centrés sur l’étude de cas de site internet et de conciergerie premium sur la Côte d’Opale.
- Canonical, alternates/hreflang, `CreativeWork`, Open Graph et Twitter maintenus; les cartes sociales Saint-Jean utilisent désormais `brand/og-saint-jean.jpg`.
- H1 unique, titres de sections hiérarchisés et liens internes vers Réalisations, Contact et l’étude Blue Baie.
- Le lien externe client conserve `target="_blank"` et `rel="noopener noreferrer"`.
- Aucun tarif, forfait, témoignage, métrique, promesse ou fonctionnalité privée ajouté.

## Harmonisation Accueil et Réalisations

Les cartes Saint-Jean de l’accueil et du portfolio emploient la capture desktop, la capture mobile et le logo Or authentiques. L’image mène vers la fiche interne; l’action distincte « Découvrir la réalisation » mène à la fiche; « Visiter le site » reste une action externe séparée. La carte vidéo utilise le poster fourni et le fichier silencieux, chargé uniquement après interaction. Blue Baie n’a pas été refait.

## Fichiers modifiés / créés

- `src/app/[locale]/realisations/[slug]/page.tsx` — branchement de la fiche signature et Open Graph/Twitter.
- `src/app/globals.css` — scène Saint-Jean, responsive, dialogue galerie, styles de focus et mouvement réduit.
- `src/components/shared/saint-jean-case.tsx` — narration locale bilingue et composition dédiée.
- `src/components/shared/saint-jean-media.tsx` — galerie accessible et lecteur vidéo différé.
- `src/components/shared/project-card.tsx`, `src/lib/projects.ts` — captures, logo, poster, galerie et vidéo silencieuse dans les cartes / données.
- `src/components/ui/creative-motion.tsx` reste inchangé dans la version finale; GSAP/ScrollTrigger n’est pas retiré.
- `playwright.config.ts`, `scripts/start-test-server.mjs`, scénarios Playwright — port configurable pour éviter les prévisualisations existantes; le test server n’hérite pas des secrets Make.
- `tests/browser/c4-saint-jean.spec.ts` et adaptations des attentes C.3 / tests de contenu.
- `public/media/projects/conciergerie-saint-jean/presentation-silent.mp4` — dérivé vidéo sans audio.
- Les captures et variantes sélectionnées de la médiathèque sont consommées directement depuis les chemins du dossier fourni.

## Tests et recette

**Réalisé / testé**

- `npm run lint` : réussi, 0 warning.
- `npm run typecheck` : réussi.
- `npm test` : 64 tests réussis, 0 échec.
- `npm run build` : réussi sous Windows avec `NEXT_TEST_WASM_DIR=node_modules/@next/swc-wasm-nodejs`; les routes FR/EN des deux études publiées sont générées statiquement.
- `npm run test:e2e` : 60 scénarios ont chacun affiché le statut réussi. Les vérifications couvrent contact local simulé, FR/EN, SEO, Blue Baie, Saint-Jean, quatre largeurs, axe, mouvement réduit, responsive et navigation. Le processus Playwright Windows est resté ouvert après l’affichage du 60e succès, comme le problème de nettoyage déjà documenté dans le rapport C.3; il a été interrompu après 60 secondes sans sortie. Playwright n’a donc pas produit son résumé final et le code de sortie du shell ne reflète pas les 60 succès affichés.
- Audit axe : aucun défaut signalé sur les pages et largeurs parcourues; Saint-Jean avait d’abord révélé des contrastes faibles, corrigés et recontrôlés.
- Images réelles chargées dans les tests navigateur; le lightbox s’ouvre au clavier et se ferme avec Échap; ouverture de la vidéo uniquement à la demande; assertions de canonical, hreflang, liens et éléments vidéo.
- Pas d’appel de formulaire vers Make. Les requêtes externes sont interceptées dans les tests C.4.
- Vidéos et captures Playwright locales créées sous `test-results/` (répertoire ignoré par Git), notamment les répertoires `c4-saint-jean-*` et les captures `lot-c4-saint-jean-fr-*.png` / `lot-c4-saint-jean-en-*.png`.

**Lighthouse local simulé**

Lighthouse 13.6.0, Chrome headless, desktop et simulation mobile, hôtes externes bloqués; résultats les plus récents après suppression du chargement GSAP propre à cette fiche :

| Version | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| FR mobile | 92 | 100 | 100 | 92 | 3255 ms | 72 ms | 0.0000 |
| EN mobile | 91 | 100 | 100 | 92 | 3135 ms | 171 ms | 0.0118 |
| FR desktop | 91 | 100 | 100 | 92 | 3136 ms | 187 ms | 0.0001 |
| EN desktop | 93 | 100 | 100 | 92 | 3132 ms | 75 ms | 0.0118 |

Les derniers rapports JSON se trouvent dans `test-results/lighthouse-c4-final-hero/`. Le LCP reste inférieur au baseline C.3 Saint-Jean (mobile 2339 ms, desktop 2222 ms; performance 98/99). Cette différence laboratoire est une **régression mesurée à examiner**, malgré axe à 100 et CLS très inférieur à 0,1; la variabilité de mesure et le contenu plus riche peuvent influencer les scores. Le rapport Lighthouse identifie la capture hero comme élément LCP. Le chargement GSAP de cette page a été retiré et remplacé par CSS pour les tracés décoratifs; GSAP reste actif sur les autres scènes. Le chargement eager du visuel mobile est désormais vérifié; les TBT varient de 72 à 187 ms dans cette dernière série. INP terrain n’est pas mesuré. Avant publication, profiler le chargement/hydratation du hero et viser une réduction du LCP sans retirer l’expérience visuelle.

## Réserves et validation humaine

- Valider les droits commerciaux de la bande-son originale avant d’envisager une version sonorisée. Le site emploie actuellement le dérivé muet.
- Confirmer que les logos et photographies fournies sont autorisés pour la vitrine Nova Baie.
- Revalider par un accès réseau autorisé le domaine client et son URL finale; les tests locaux n’ouvrent aucun lien externe.
- Confirmer l’exactitude du périmètre de back-office avant d’en publier davantage que le fait établi de son existence. Aucune capture privée n’est incluse.
- Confirmer l’équivalence des textes anglais avec le client avant publication éditoriale.
- La médiathèque est un jeu de fichiers local; le futur back-office n’est pas développé. Le schéma de projet existant reste la source des chemins portfolio; textes et blocs narratifs de cette étude sont encore codés localement.
- La comparaison Lighthouse est reproductible dans les mêmes conditions de ce lot, mais il faut profiler les écarts C.3/C.4 avant publication.

## Coût, sécurité, maintenance et retour arrière

- Aucune nouvelle dépendance, base de données, service payant, authentification ou intégration distante.
- Aucun changement au formulaire sécurisé. Les médias publics ne contiennent aucune capture du back-office ou donnée privée.
- Le traitement des images reste celui de `next/image`; le lecteur vidéo est natif et chargé après action.
- Retour arrière : rétablir le commit de départ `1a3c4db6dcedb659701f7114fe3494dab9b9a2ff` en revenant sur la branche C.3. Le MP4 utilisateur original n’a pas été modifié et les autres médias non utilisés restent dans le dossier local.

## Prévisualisation

Sur la branche C.4, depuis la racine du dépôt :

```powershell
$env:NEXT_TEST_WASM_DIR = (Resolve-Path 'node_modules/@next/swc-wasm-nodejs').Path
$env:NEXT_TELEMETRY_DISABLED = '1'
npm run build
npm run start -- --hostname localhost --port 3158
```

Ouvrir `http://localhost:3158/realisations/conciergerie-saint-jean` ou `/en/realisations/conciergerie-saint-jean`. Le port 3158 est suggéré pour ne pas interrompre la prévisualisation C.3 sur 3151; vérifier qu’il est libre avant lancement. Les enregistrements vidéo Playwright et captures de revue sont dans `test-results/`.
