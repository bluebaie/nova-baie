# LOT C — Refonte visuelle Nova Baie

État au 6 novembre 2026. Travail local sur `refonte-nova-baie-2026`, commencé au commit LOT B `27c3b3c0baa9f43eb75f7e79e338e9115380fde9`. `main` n’a pas été modifiée. Aucun push, déploiement, réglage distant, envoi de contact ou appel Make n’a été effectué.

## Direction artistique et système de design

La direction conserve le logo d’horizon, la photo aérienne originale, le bleu nuit, le turquoise, le champagne et l’ivoire. La mise en page associe titres Playfair éditoriaux, textes Inter, grille asymétrique, grandes images et séquences alternées sombres et claires. Le premier écran présente immédiatement l’activité et son CTA. Les réalisations structurent une séquence importante de l’accueil et une page portfolio dédiée.

Les jetons de couleur, typographie, mesure, grille, espacements, rayons, ombres, focus et durées sont centralisés dans `src/app/globals.css`. Les anciens fichiers `tailwind.config.ts` et `src/lib/design-tokens.ts` n’étaient plus utilisés par Tailwind 4 ni par les composants ; ils ont été retirés pour éviter deux sources concurrentes.

## Animations et dépendances

Les animations de menu, liens, icônes, recadrages et entrée du hero utilisent CSS. `src/components/ui/motion-scene.tsx` ajoute progressivement une révélation courte à l’intersection et une parallaxe de quelques pixels sur les grands écrans avec pointeur fin. Le contenu HTML reste visible sans JavaScript. Les écouteurs, observateurs et animations sont nettoyés au changement de route ; `prefers-reduced-motion` désactive les transitions, le défilement fluide et les animations, et efface la parallaxe.

Aucune bibliothèque motion de production, aucun effet WebGL ni code React Bits n’a été ajouté. Motion a été évalué comme option de composition, mais ses fonctions nécessaires ici sont couvertes par CSS et Web Animations API, avec moins de JavaScript client. Lighthouse 13.6.0 et axe-core 4.14.0 sont les seuls ajouts au groupe de développement, pour les mesures et audits locaux ; ils ne sont pas inclus dans le bundle livré au navigateur. Lighthouse est sous licence Apache-2.0 ; axe-core sous MPL-2.0. Aucun service payant n’est utilisé.

## Pages, composants et contenus

Accueil, `/services` (libellé Expertises), `/realisations` et `/contact` gardent leurs URL et leurs traductions. Les routes anciennes et leur navigation, le bilingue, les sept expertises et les six projets sont conservés. Les pages Actualités, À propos, mentions légales, robots, sitemap, métadonnées et schémas sont restés fonctionnels.

Les compositions de page utilisent notamment `src/components/home/hero-section.tsx`, `capabilities-section.tsx`, `work-preview-section.tsx`, `method-section.tsx`, `about-link-section.tsx`, `final-cta-section.tsx`, `src/components/shared/project-card.tsx`, `src/components/layout/header.tsx` et `footer.tsx`, ainsi que les pages de services, réalisations et contact. Les contenus commerciaux existants n’ont pas été réécrits dans le cadre de l’habillage, aucun prix ni promesse nouvelle n’a été ajouté.

Blue Baie Conciergerie et Conciergerie Saint-Jean utilisent des captures des pages publiques, et leurs variantes mobile. Les URL ont répondu 200 lors de leur vérification du 5 novembre 2026. Les captures ont été réalisées en lecture seule par `scripts/capture-public-projects.mjs`, uniquement en GET/HEAD vers les deux hôtes autorisés, sans API, administration, tierces parties ni soumission de formulaire. Pour le bandeau de Saint-Jean, « Tout refuser » a été choisi dans un profil de navigateur jetable ; aucune préférence réelle n’a été changée. Les images optimisées se trouvent dans `public/images/projects/` : `blue-baie-public.webp`, `blue-baie-mobile.webp`, `saint-jean-public.webp`, `saint-jean-mobile.webp`.

Les quatre autres projets utilisent leurs médias existants dans `public/images/`. Le CycloSport Crotellois reste marqué « en finalisation » et conserve une présentation typographique sans capture inventée. Aucun visuel privé n’a été utilisé. Une vidéo Saint-Jean n’est pas disponible dans les médias validés et n’a pas été simulée. Les vidéos existantes des projets touristiques ne chargent leur lecteur qu’après activation volontaire ; elles n’ont ni autoplay ni préchargement.

Les captures de recette des quatre pages principales en français et en anglais, à 390 px et 1440 px, sont dans [`docs/lot-c-captures/`](./lot-c-captures/). Les tests ont aussi examiné 768 px et 1024 px. Les rendus de revue sont des captures pleine page de Chromium, pas des maquettes.

## Formulaire, sécurité et accessibilité

Le transport sécurisé, la validation, les états, les sujets envoyés et le contrat API des LOTS A/B restent inchangés. Seuls les styles du formulaire ont été ajustés. Les sept sujets et les trois champs requis ont été testés en français et en anglais avec réponses simulées. Aucun test navigateur n’a contacté Make ; le serveur de recette utilise des variables de contact vides et bloque les hôtes externes. Le secret webhook demeure absent des bundles client.

axe-core n’a relevé aucune violation WCAG 2.0/2.1/2.2 A/AA dans les 32 combinaisons page, langue et largeur testées. Les contrôles navigateur couvrent les liens focalisables, le focus visible, le menu mobile, les erreurs et la préférence de réduction du mouvement. Ce résultat automatisé ne remplace pas une revue manuelle avec lecteur d’écran ni une validation juridique/conformité.

## Mesures locales

Build de production mesuré avec Next 15.5.29 et son fallback SWC WASM requis sur cet hôte Windows. Les bundles initiaux Next partagés affichés au build sont 103 kB ; l’entrée accueil ajoute 2,22 kB, Expertises 1,94 kB, Réalisations 2,22 kB et Contact 5,08 kB (valeurs Next, hors transfert des médias).

Lighthouse 13.6.0 a mesuré le build local, avec les requêtes `https://*` bloquées et sans utilisateur réel. Profil mobile 390×844 : accueil Performance 95, Accessibilité 100, Bonnes pratiques 100, SEO 92 ; LCP 2,867 s, FCP 0,913 s, TBT 89 ms, CLS 0,00011. Expertises, Réalisations et Contact : les rapports de ces passages donnent Performance/Accessibilité/Bonnes pratiques 100, SEO 92, FCP/LCP 0,757–0,758 s, TBT 8–10 ms et CLS ~0,00010. Accueil profil desktop : Performance/Accessibilité/Bonnes pratiques 100, SEO 92, FCP 0,248 s, LCP 0,601 s, TBT 0 ms et CLS 0,00020. Il s’agit de mesures de laboratoire sur cette machine, non de données terrain ni de valeurs garanties. Lighthouse écarte INP sans interactions de terrain.

Le SEO à 92 correspond au diagnostic Lighthouse local indiquant que la canonique de production pointe vers l’autre langue dans les `hreflang` vus depuis `localhost`. Les tests de métadonnées vérifient que les canoniques publiées restent sur `https://www.nova-baie.com`, que les paires `hreflang`, Open Graph, sitemap et schémas ne changent pas. Le domaine local n’est pas un hôte de production approprié pour valider cette règle ; le score SEO de laboratoire est donc à interpréter avec cette limite.

## Fichiers et validation

Les modifications couvrent les composants listés ci-dessus, `src/app/globals.css`, `src/app/[locale]/layout.tsx`, `messages/fr.json`, `messages/en.json`, `src/lib/projects.ts`, les styles du formulaire, `tests/content.test.ts`, un nouveau test navigateur axe/rendu `tests/browser/visual.spec.ts`, le script de captures et les dépendances de développement. Les routes de contact, validation/limitation, métadonnées SEO, middleware, traductions commerciales et schémas sécurisés existants n’ont pas été refondus.

Résultats exécutés :

- `npm run lint` : réussi, zéro avertissement.
- `npm run typecheck` : réussi.
- `npm test` : 64 tests réussis, zéro échec.
- `npm run build` : réussi avec `NEXT_TEST_WASM_DIR` pointant vers `node_modules/@next/swc-wasm-nodejs`. Next signale l’avertissement préexistant que le runtime Edge désactive la génération statique de sa route concernée ; le build termine correctement.
- `npm run test:e2e` : 49 tests réussis, zéro échec. Couverture FR/EN, URLs, menu, 404, SEO, liens internes, chargement d’images, vidéos à activation volontaire, formulaire simulé, absence de fuite du secret et 4 largeurs.
- Axe-core : zéro violation automatisée sur les 32 vues principales × langues × largeurs.
- Lighthouse : pages locales et états enregistrés temporairement dans `test-results/lighthouse/` (répertoire ignoré par Git).
- `git diff --check` : à exécuter avant revue finale.

## État et limites

**Réalisé :** direction visuelle, composants, transitions, états de menu, portfolio avec médias authentiques disponibles, captures desktop/mobile, amélioration de la mise en page mobile et maintien des contenus A/B.

**Testé :** lint, types, unitaires, build, navigateur, axe, Lighthouse et protections du formulaire dans le périmètre local décrit.

**Reste à vérifier :** rendu avec technologies d’assistance, navigation réelle avec clavier/souris sur plusieurs navigateurs, confirmation humaine des droits de réutilisation des captures publiques, disponibilité actuelle des sites tiers et source vidéo Saint-Jean.

**Bloqué :** aucune dépendance externe ne bloque le travail local. Le dossier et l’accès Vercel/Make/GTM n’ont pas été touchés.

**Décision utilisateur nécessaire :** revue visuelle des captures avant toute publication ; autorisation de la vidéo Saint-Jean et confirmation des droits des médias si une source est fournie.

Impact : la motion client repose sur un petit composant ciblé et les API natives, tandis que les autres pages restent principalement Server Components. Les captures publiques ajoutent environ 322 kB d’images WebP et n’alourdissent pas les routes qui ne les affichent pas. L’outil d’audit ajoute seulement des dépendances de développement. Pour revenir en arrière, restaurer le commit de départ `27c3b3c0baa9f43eb75f7e79e338e9115380fde9` ou annuler les fichiers du LOT C sur la branche de travail ; aucun changement distant n’existe à inverser.
