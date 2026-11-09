# Lot C.8 — Le Refuge de la Marmotte

## État Git initial et périmètre

Le 9 novembre 2026, branche initiale `refonte-nova-baie-le-bout-du-monde`. L’arbre contenait déjà des changements non commités : route des réalisations, CSS global, CreativeMotion, données projets, middleware, tests content/routing/SEO, suppression de `public/favicon.ico`, fichiers des lots Bout du Monde et Gîtes en Baie et médias Saint-Jean/Blue Baie. Aucun de ces travaux n’a été supprimé ou réinitialisé.

Branche locale créée : `lot-c8-refuge-marmotte`. Aucun push et aucun déploiement. Les fichiers communs sont modifiés uniquement pour l’intégration C.8. Le CSS et les animations nouveaux sont isolés au Refuge ; ni le middleware ni le favicon ni les réalisations précédentes n’ont été modifiés par ce lot.

Instructions lues : AGENTS.md, CLAUDE.md, skill Sites et référence de prévisualisation locale. `node_modules/next/dist/docs/` est absent du paquet installé Next 15.5.29. La documentation officielle version 15 a été consultée en remplacement : https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata. Audit des quatre composants SaintJeanCase, BlueBaieCase, BoutDuMondeCase et GitesEnBaieCase, des galeries, de CreativeMotion, du portfolio, du SEO et du sitemap existants.

## Sources et informations vérifiées

https://www.ski-saintefoy.com/ consulté directement par HTTP, statut 200. Le navigateur de recherche n’y accédait pas ; la récupération directe autorisée a fonctionné. Copie de travail non destinée au commit : `artifacts/lot-c8/client.html`.

Le site présente un appartement duplex pour quatre voyageurs à Sainte-Foy-Tarentaise, une galerie, des informations de confort et de localisation, une navigation Accueil / Appartement / Station / Contact, un formulaire et un lien de réservation externe. L’étude de cas ne reprend ni avis chiffrés ni temps de trajet ni prestations non vérifiées. Elle ne prétend pas montrer un moteur de réservation intégré. Aucun formulaire client n’a été envoyé, aucune réservation effectuée. Les captures sont desktop ; aucune fausse vue mobile ni promesse de recette mobile du site client.

## Médias et droits

Contrairement au signalement initial, les trois JPG sont non vides, décodables et exploitables :

| Original conservé | Octets | Dimensions | Contenu |
| --- | ---: | --- | --- |
| Capture d'écran 2026-11-08 111910.jpg | 486566 | 1917 × 1031 | Accueil, montagne, présentation |
| Capture d'écran 2026-11-08 111944.jpg | 321520 | 1916 × 1035 | Galerie de l’appartement |
| Capture d'écran 2026-11-08 112033.jpg | 242508 | 1917 × 1022 | Contact et réservation |

Dérivés WebP qualité 94, sans réduction de dimensions hors retrait de 17 pixels à droite (barre de défilement) : home 465500 octets, gallery 258518 octets, contact 176500 octets. Un recadrage documentaire `interior-detail.webp` de 625 × 590 pixels provient uniquement de la photographie déjà visible dans la deuxième capture. Le script `scripts/lot-c8-media.mjs` rend la génération reproductible. Aucun original écrasé.

Usage : captures fournies expressément par le propriétaire pour cette étude de cas. Pas de téléchargement ou de republication de nouvelles photographies depuis le site public. Paysages, sapins, crêtes, soleil, relief filaire et courbes : SVG originaux créés dans ce lot. Le hero porte la mention « Illustration alpine originale · paysage imaginaire ». Ils ne représentent pas une vue documentaire du logement. Aucun média tiers ajouté.

## Direction artistique et narration

Concept : « De l’immensité des Alpes à l’intimité d’un refuge ». Bleu nuit `#142c36`, glacier `#edf0e9`, vert minéral et cuivre clair `#dbb587`. Le noir/blanc et les boiseries observés dans le site client sont commentés et visibles dans les captures. Les tons alpins complémentaires appartiennent à la scénographie Nova Baie.

1. Hero : paysage vectoriel à trois profondeurs, lumière, titre éditorial, repère géographique, lien d’ascension.
2. Récit : nature précise de l’hébergement, intention de conception, repères factuels.
3. Direction artistique : intérieur authentique recadré, typographie et palette.
4. Interface : crête géométrique, cadre progressivement révélé, trois captures sélectionnables et agrandissables.
5. Parcours : découvrir, se projeter, contacter/réserver via un lien externe.
6. Signature : courbes topographiques et relief filaire annoté ; conclusion en paysage lumineux, CTA contact, liens site client/portfolio, fondu vers le footer existant.

Les six actes du brief sont présents ; le récit et la direction artistique se partagent le premier mouvement avant la grande scène d’interface. Pas de cartes empilées, de téléphone inventé, de monogramme NB ni de tarif Nova Baie.

## Animations et transitions

GSAP/ScrollTrigger déjà installés, chargés par import dynamique. Entrée du titre, parallaxe douce des reliefs, tracé progressif des crêtes, masque polygonal montagne → cadre rectangulaire de l’interface, courbes topographiques qui accompagnent la signature finale. Défilement natif, aucun blocage/pin, contenu présent sans JavaScript.

GSAP context et matchMedia nettoyés au démontage. Animations réservées aux écrans d’au moins 768 px sans préférence de réduction des mouvements. Le changement de préférence est pris en charge par matchMedia. Mobile et reduced-motion : composition statique complète, galerie interactive et liens disponibles. Dialog natif : fermeture Échap, focus captif et restitution au déclencheur, bouton de fermeture nommé. Images dimensionnées et chargées paresseusement ; hero purement vectoriel, sans image critique lourde.

## Composants et intégration

- `refuge-marmotte-case.tsx` : rendu serveur, textes FR/EN, paysages SVG et narration.
- `refuge-marmotte.module.css` : styles et responsive isolés.
- `refuge-marmotte-gallery.tsx` : sélection des captures et dialog clavier.
- `refuge-marmotte-motion.tsx` : animations locales et nettoyage.
- Route existante `[locale]/realisations/[slug]/page.tsx` : branche de rendu dédiée.
- `src/lib/projects.ts` : publication du Refuge, textes FR/EN, captures, suppression de la référence vidéo générique ; ordre portfolio et visibilité accueil conservés.
- Tests content et SEO : date de vérification non figée et nouvelle entrée bilingue.
- `tests/browser/refuge-marmotte-case.spec.ts` : recette dédiée.
- Scripts média et inspection/performance reproductibles.

## SEO FR/EN

H1 unique « Le Refuge de la Marmotte », H2 éditoriaux hiérarchisés, descriptions et titres spécifiques dans les deux langues. Canonical français sans `/fr`, anglais sous `/en`. Hreflang fr/en/x-default via `localeAlternates` existant. Open Graph article et Twitter large image via la capture authentique d’accueil. CreativeWork JSON-LD factuel avec Nova Baie comme créateur. Les deux URL rejoignent automatiquement le sitemap par `publishedCaseStudies`. Alt des captures traduits et illustrations décoratives masquées aux lecteurs d’écran. Liens internes contact et réalisations via la navigation localisée existante.

## Tests et recette

ESLint complet, TypeScript, 74 tests unitaires et build de production : réussis. Le premier passage unitaire signalait deux attentes figées devenues obsolètes : date exacte de vérification et nombre d’entrées du sitemap. Elles ont été mises à jour sans affaiblir la vérification des liens HTTPS et des URL bilingues.

Première recette navigateur : captures des quatre largeurs, galerie et WCAG AA sans violation ; échec final du scénario au moment du CTA français après navigation anglaise. Cause : le test conservait volontairement le cookie de langue anglais puis cherchait un libellé français. Correction du scénario : effacement du cookie avant sa nouvelle visite française ; comportement multilingue du produit conservé.

Recette responsive et interactive : réussie à 390, 768, 1024 et 1440 px. Trois onglets, chargement des images, ouverture/fermeture Échap, restitution du focus, canonical FR/EN, hreflang, CreativeWork, liens externes, portfolio, retour arrière, CTA contact, défilement rapide, reduced-motion et absence d’erreur JavaScript vérifiés. Axe WCAG 2 A/AA, 2.1 AA et 2.2 AA : aucune violation à 390 et 1440 px. Captures pleine page dans `test-results/refuge-{390,768,1024,1440}.png`, anglais desktop `test-results/refuge-en.png` et mobile `test-results/refuge-en-mobile.png`. Captures de scènes et mesure locale dans `artifacts/lot-c8/` (artefacts de travail, hors commit).

Le lanceur global Playwright du dépôt se bloque au nettoyage du serveur enfant sous Windows après avoir affiché le scénario réussi. Il a été arrêté. Une configuration de recette temporaire sans gestion de serveur (`artifacts/lot-c8/playwright.config.ts`) permet une exécution avec sortie normale sur un serveur de production lancé séparément à localhost:3158. Commande : `$env:PLAYWRIGHT_PORT='3158'; npm run test:e2e -- --config artifacts/lot-c8/playwright.config.ts --grep 'Refuge'`. Cette configuration locale n’est pas intégrée au dépôt.

Résultat final de cette exécution : **2 tests Playwright réussis, code de sortie 0, 20,8 secondes**. Le second test vérifie les cinq fiches actuellement publiées en FR, EN et via la normalisation `/fr`, avec cinq redirections maximum, le sitemap bilingue, Open Graph et le favicon réellement déclaré dans le HTML (HTTP 200). Il s’adapte aux fiches publiées du checkout pour conserver l’isolation du commit C.8.

Inspection visuelle humaine par l’agent : composition mobile et desktop, lisibilité, espacement, header, transitions, galerie, cartographie et footer. Une correction issue de cette inspection remplace l’agrandissement CSS d’une capture par un vrai recadrage à résolution source, sans texte parasite.

## Performance et limites

Build : pages statiques FR/EN ; groupe des fiches à 12,8 kB et 137 kB First Load JS (mesure du groupe partagé des études de cas, pas un audit exclusif Refuge). Aucun nouveau paquet installé. Mesure finale locale Chrome desktop sans throttling après correction du recadrage : LCP 432 ms, CLS 0,000081, 418405 octets de ressources chargées au démarrage. Ces chiffres de laboratoire local ne sont pas des mesures terrain ni des scores Lighthouse mobile. Le script d’inspection permet de les reproduire. La galerie conserve volontairement une qualité élevée pour les textes des captures. Le serveur Next génère aussi ses variantes optimisées.

Réserves : absence du guide Next local, recette du site client mobile non réalisée et non revendiquée, aucune vérification de transaction de réservation ni de livraison du formulaire client. La validation artistique finale appartient au propriétaire.

## Prévisualisation

Commande : `npm run dev -- --hostname 127.0.0.1 --port 3158`.

- FR : http://127.0.0.1:3158/realisations/le-refuge-de-la-marmotte
- EN : http://127.0.0.1:3158/en/realisations/le-refuge-de-la-marmotte

Serveur de recette : production locale via `npm run test:e2e -- --grep 'Refuge:'` (port 3146 par défaut, variable PLAYWRIGHT_PORT pour changer). Aucun service externe de publication utilisé.

## État Git final

Commit local ciblé préparé sur `lot-c8-refuge-marmotte` : quatre composants dédiés, trois captures originales et quatre dérivés, deux scripts, tests ciblés, rapport et seules modifications C.8 des quatre fichiers partagés route/projets/content/SEO. Les versions indexées de ces fichiers ont été reconstruites depuis HEAD avec uniquement les ajouts du Refuge. Les changements antérieurs Bout du Monde/Gîtes en Baie, CSS global, animation partagée, favicon, middleware et tests associés restent dans l’arbre de travail, hors de ce commit. Le test SEO attend 18 URL dans le commit isolé (trois fiches publiées) et 22 dans l’arbre de travail complet (cinq fiches publiées) : la différence appartient aux lots antérieurs préservés. Aucune manipulation destructive. Aucun push. Aucun déploiement.
