# Nova Baie — LOT C.5 · Blue Baie Conciergerie

## État Git et périmètre

- Base : commit `bba13d1cfa203966e431c9d059664e23f8129abc` sur `refonte-nova-baie-c4-saint-jean`.
- Travail local sur `refonte-nova-baie-c5-blue-baie`. Aucun push, déploiement, changement distant ou appel à Make/Beds24/Zoho.
- Les originaux Saint-Jean non suivis et les médias Blue Baie non retenus sont préservés et ne sont pas inclus dans le lot.
- Le dossier `images/keycafe/` n’est pas utilisé : ces ressources ne sont pas publiées.

## Sources publiques et faits retenus

Sources consultées le 6 novembre 2026 :

- [Site Blue Baie](https://www.bluebaie.fr/) : activité publique de conciergerie et de gestion de séjours en Baie de Somme.
- [Services](https://www.bluebaie.fr/nos-services), [logements](https://www.bluebaie.fr/nos-logements), [secteurs](https://www.bluebaie.fr/secteurs), [à propos](https://www.bluebaie.fr/a-propos) et [présentation de Saint-Jean](https://www.bluebaie.fr/conciergeriesaintjean) : parcours et territoires présentés publiquement.
- [Article Blue Baie sur sa structuration numérique](https://www.bluebaie.fr/carnet-de-baie/blue-baie-conciergerie-change-d-echelle-le-digital-comme-base-de-developpement), publié le 19 juin 2026 : évoque le site, un espace d’administration sécurisé et une application d’administration.
- [Mentions légales Blue Baie](https://www.bluebaie.fr/mentions-legales) : attribuent la conception et le développement du site à Nova Baie.

Les textes distinguent l’activité de Blue Baie des interventions de Nova Baie. Aucune métrique de vente, de réservation, de référencement ou de performance n’est revendiquée. Les intégrations et relations métier ne sont pas représentées comme une architecture réseau connue : le schéma marque les éléments documentés d’un trait plein et les relations explicatives d’un trait discontinu.

## Direction artistique et architecture

La fiche `/realisations/blue-baie-conciergerie` conserve l’URL et les variantes FR/EN, mais dispose désormais d’une narration propre à Blue Baie : paysage littoral, bleu profond, turquoise, captures de l’expérience publique et schéma d’écosystème. Elle n’emprunte pas la scénographie champagne de Saint-Jean.

Huit séquences structurent l’étude : hero composite desktop/mobile, ancrage territorial, galerie publique accessible en dialogue agrandissable, parcours propriétaires/logements/contact, schéma documenté/illustratif, photographie d’hospitalité, lien vers Saint-Jean et conclusion avec CTA Nova Baie. La galerie, l’image de partage et les médias sont gérés séparément des contenus textuels de la fiche. `src/lib/projects.ts` reste la source de la carte, de l’ordre, du statut, du lien externe et des métadonnées localisées.

Le dialogue galerie utilise l’élément natif `<dialog>` : fermeture clavier/Escape, bouton de fermeture explicite, contrôle tactile et alternatives textuelles. Les captures restent visibles dans le HTML sans dépendre de GSAP. La page réutilise les animations et le système existants ; aucune bibliothèque ni police supplémentaire n’a été ajoutée.

## Médias inspectés et sélectionnés

Les captures ci-dessous proviennent du dossier utilisateur `public/media/projects/blue-baie/screens/` :

| Fichier | Dimensions intrinsèques | Utilisation |
|---|---:|---|
| `home-desktop.png` | 1912 × 1027 · 1,93 MB | Hero, portfolio, galerie |
| `home-mobile1.jpg` | 1220 × 2712 · 1,38 MB | Hero mobile et portfolio |
| `mobile2.jpg` | 1220 × 2712 · 0,99 MB | Galerie, vue mobile complémentaire |
| `services.png` | 1916 × 1022 · 0,20 MB | Galerie |
| `logements.png` | 1916 × 1032 · 1,24 MB | Galerie |
| `logement-detail.png` | 1912 × 1037 · 1,42 MB | Galerie |
| `secteurs.png` | 1910 × 1031 · 1,31 MB | Galerie |
| `contact.png` | 1912 × 1035 · 0,16 MB | Galerie |

Sélection photographique réelle : `images/baie-saint-valery-hero.jpg` (1536 × 1024 · 0,46 MB) pour le hero ; `images/h1.jpg` (1536 × 1024 · 0,39 MB) pour la scène territoriale ; `h3.jpg` (4080 × 3060 · 4,56 MB), `h4.jpg` (1448 × 1086 · 0,58 MB), `h10.jpg` (1536 × 1024 · 0,33 MB), `h13.jpg` (4080 × 3060 · 4,99 MB), `h16.jpg` (1536 × 1024 · 0,25 MB) pour l’hospitalité et le littoral. La séquence vers Saint-Jean réemploie sa capture publique déjà suivie par Git (`conciergerie-saint-jean/screens/home-desktop.jpg`). `images/logo/logo-bluebaie.png` (1024 × 1024 · 0,13 MB, transparent) est le logo fourni, conservé sans recoloration. `images/og/blue-baie-og.jpg` (1200 × 630 · 0,22 MB) sert au partage social.

Les images utilisent `next/image`, tailles responsives, compression Next et chargement différé hors médias prioritaires du hero. Les originaux n’ont pas été modifiés. Les autres photographies, variantes de logo et ressources Keycafe restent hors de la sélection. Le dossier ne fournit pas de vidéo Blue Baie : aucune vidéo client n’est inventée ou chargée.
Les paramètres `sizes`, `quality`, `priority` et `fetchPriority` suivent la [référence Image Next.js 15](https://nextjs.org/docs/15/app/api-reference/components/image).

## SEO et portfolio

- Title et description spécifiques, canonical et hreflang FR/EN conservés via le mécanisme commun.
- Open Graph et Twitter emploient l’image Blue Baie dédiée.
- Le sitemap inclut les deux variantes de la fiche publiée via `publishedCaseStudies`.
- Hiérarchie éditoriale avec un H1 unique, sections H2, alt text descriptifs et liens internes vers réalisations, contact et Saint-Jean.
- Les cartes d’accueil et de portfolio utilisent la nouvelle capture, le vrai logo, une variante mobile authentique et conservent les actions distinctes « découvrir la réalisation » / « visiter le site ».
- Ordres et statut des projets inchangés ; pas de compteur fixe ni de nouvelle page géographique.

## Fichiers du lot

- `src/components/shared/blue-baie-case.tsx` — étude de cas personnalisée bilingue.
- `src/components/shared/blue-baie-gallery.tsx` — galerie et dialogue accessible.
- `src/app/[locale]/realisations/[slug]/page.tsx` — rendu dédié et image sociale.
- `src/app/globals.css` — styles responsives spécifiques et logo de marque.
- `src/lib/projects.ts`, `src/components/shared/project-card.tsx` — données, visuels de portfolio et métadonnées.
- `tests/content.test.ts`, `tests/browser/c3-case-studies.spec.ts`, `tests/browser/local.spec.ts` — couverture de données, galerie, liens, bilingue et métadonnées.
- Médias sélectionnés listés ci-dessus ; `test-results/lot-c5-blue-baie-{desktop,mobile}.png` et vidéos Playwright locales, ignorés par Git.

## Recette

Résultats de la recette locale finale :

- `npm run build` : réussi avec SWC WASM sous Windows ; les deux routes Blue Baie FR/EN sont pré-rendues.
- `npm run lint` et `npm run typecheck` : réussis.
- `npm test` : 64 réussis, aucun échec. Le sandbox échoue avant le démarrage de Node (`uv_os_get_passwd ENOMEM`) ; la même commande a été exécutée localement hors sandbox et passe.
- `npm run test:e2e` : 61 réussis, aucun échec. Cela inclut le hero, les parcours, le portfolio, les cas Blue Baie et Saint-Jean, le formulaire simulé, les métadonnées, le clavier, le mouvement réduit et axe.
- Après le dernier ajustement de recette média, les deux tests ciblés C5 (FR/EN, galerie, capture et responsive) ont réussi. Dans ce run ciblé, Playwright est resté actif après le résultat des tests ; le processus a été interrompu manuellement. Le run complet de 61 tests, lui, s’est terminé normalement.
- axe WCAG 2 A/AA, 2.1 AA et 2.2 AA : aucune violation sur les pages principales et les deux études de cas, en FR/EN à 390, 768, 1024 et 1440 px.
- La galerie Blue Baie affiche huit captures authentiques ; Playwright vérifie le décodage des médias, l’ouverture/fermeture au clavier, les liens, les canonicals/hreflang et l’absence de débordement mobile. Les visuels de revue se trouvent dans `test-results/lot-c5-blue-baie-{desktop,mobile,photography}.png` ; les enregistrements WebM dans les dossiers de résultats Playwright `test-results/`.
- Lighthouse local sur `/realisations/blue-baie-conciergerie`, simulation mobile et desktop, avec Chrome headless, chargement externe bloqué :

| Forme | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | FCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Mobile simulé | 90 | 100 | 100 | 92 | 3 523 ms | 1 218 ms | 79 ms | 0 |
| Desktop simulé | 91 | 100 | 100 | 92 | 3 375 ms | 1 217 ms | 75 ms | 0,0001 |

Ces mesures sont des audits locaux simulés, pas des données d’utilisateurs. Le rapport C4.1 mentionne un LCP d’environ 3,2 s sur ses essais Saint-Jean : le parcours, le contenu et l’élément LCP diffèrent, donc la comparaison n’est pas strictement équivalente et aucun gain n’est annoncé. La capture LCP Blue Baie est chargée depuis le HTML, avec `fetchPriority="high"`; l’audit confirme la priorité appliquée. Le contrôle de liens externes dans Playwright reste bloqué pour empêcher toute navigation hors site ; les URL officielles ont été relevées sur les pages sources publiques.

## Performance, sécurité, maintenance et coût

Pas de dépendance, service payant, stockage ou flux serveur ajouté. La galerie ajoute une interaction client limitée à la fiche ; le reste de la page est rendu par serveur. L’image principale et la capture desktop sont prioritaires ; les autres images restent différées. Le build rapporte une charge initiale de 128 kB pour la route dynamique et 103 kB partagés (valeurs de compilation, pas des mesures Web Vitals). LCP/CLS/INP réels ne sont pas mesurés ici.

## Retour arrière

Le lot est isolé sur `refonte-nova-baie-c5-blue-baie`. Pour revenir à C4.1, sélectionner le commit de base `bba13d1` dans Git. Les originaux utilisateur n’étant pas modifiés, leur présence n’est pas affectée par le retour arrière. Ne pas utiliser de reset destructif sur le dossier média.
