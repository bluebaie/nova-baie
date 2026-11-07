# Nova Baie — LOT C.5.1 · Blue Baie

## État Git et périmètre

- Branche locale : `refonte-nova-baie-c5-blue-baie`.
- Commit de départ observé : `808adb136416b813e6f08fb2b1ddc27785565358`.
- Aucun push, déploiement, changement distant ni appel à un service Blue Baie.
- Le lot reste limité au dépôt Nova Baie. Les originaux et ressources non retenues ne sont ni déplacés ni supprimés.

## Démonstration de l'espace métier

Une scène interactive React/CSS présente huit vues : aperçu d'activité, calendrier, logements, fiche logement, facturation, édition de contenus, visibilité/SEO et intégrations/IA. Les vues sont des reconstitutions originales, pas des captures du produit de production. Elles utilisent exclusivement des données fictives déterministes. Le bandeau « Interface de démonstration — données fictives » est visible au-dessus de l'interface et rappelé dans chaque panneau, y compris en anglais.

Les noms, dates, logements, montants et indicateurs montrés sont inventés pour la démonstration. Aucune performance commerciale ou SEO n'est suggérée comme réelle. Les contrôles de la maquette qui ne réalisent pas d'action produit sont présentés comme des éléments visuels non interactifs.

Le complément de huit captures internes annoncé n'était pas présent dans `public/media/projects/blue-baie/` au moment de cette inspection : le sous-dossier `screens/` contient les huit captures du site public (`contact.png`, `home-desktop.png`, `home-mobile1.jpg`, `logement-detail.png`, `logements.png`, `mobile2.jpg`, `secteurs.png`, `services.png`). Un premier écran de tableau de bord avait été observé en lecture seule lors de l'inventaire C5.1 précédent ; il montrait un planning hebdomadaire opérationnel et des rubriques de navigation, avec des données nominatives et opérationnelles. Il n'a pas été copié dans `public/`, redessiné au pixel près ni ajouté à Git. Les huit nouveaux écrans détaillés sont reconstitués à partir de la liste fonctionnelle fournie, sans comparaison visuelle directe. Les captures expurgées ou les références visuelles doivent être fournies dans le dépôt si une correspondance précise avec le logiciel réel est attendue.

### Périmètre fonctionnel représenté

- Le site public et les parcours propriétaires/voyageurs sont présentés par les captures publiques déjà utilisées dans le LOT C.5.
- Le présent complément décrit, à partir du périmètre transmis par le propriétaire, les outils de planning/réservation, les fiches logements, la facturation, les contenus, le référencement et le pilotage opérationnel.
- Beds24 est nommé comme moteur externe intégré ; Nova Baie ne revendique pas sa création.
- Keycafe et Zoho sont montrés comme intégrations annoncées dans le périmètre, sans identifiants, flux détaillés ni assertion sur leur état opérationnel actuel.
- Les vues de calendrier et de facturation sont des scénarios fictifs et ne prouvent ni transactions, ni montants, ni résultats.
- Aucune capacité d'IA n'est annoncée comme livrée. La scène distingue l'IA comme piste à qualifier/perspective future ; un statut de développement précis reste à confirmer.

## Narration et architecture des médias

La nouvelle séquence se place après les éléments factuels de la plateforme. Elle combine navigation par onglets (clavier flèches haut/bas et activation), panneaux dédiés, bandeau de démonstration permanent, transitions discrètes, annotations de confidentialité, et mise en page adaptée aux écrans tactiles. Le mode de mouvement réduit coupe l'animation d'entrée et les transitions décoratives.

`src/lib/project-case-media.ts` conserve le modèle local des médias avec identifiant stable, projet, type, emplacement, état éditorial, ordre, titre, description et texte alternatif FR/EN. Les contenus opérationnels absents restent sans URL et avec un état tel que `privacy-review`, `awaiting-media` ou `needs-verification`; ils ne peuvent donc pas apparaître dans les galeries publiées. Ce modèle ne crée ni base de données ni back-office.

## Données internes et confidentialité

Aucun média privé n'est utilisé dans l'interface de démonstration. Les captures de production annoncées devront être conservées hors du dossier public. Pour une éventuelle publication ultérieure, demander des dérivés validés et expurgés : noms/coordonnées des voyageurs, informations de séjour, détails logement non publics, données et relevés financiers, identifiants, codes d'accès et tokens. Les variantes originales doivent rester intactes et ne pas être ajoutées au dépôt/public.

Les huit vues demandées sont représentées comme démonstrations dans le navigateur ; aucune image raster générée depuis le back-office n'est nécessaire ni incluse dans le lot. Playwright peut produire des captures de revue de la page, qui ne constituent pas des captures du produit Blue Baie.

## SEO, accueil et portfolio

L'URL, le canonical, les alternates FR/EN, les métadonnées et le sitemap existants sont conservés. Le texte de la carte Blue Baie sur l'accueil et le portfolio précise désormais la plateforme métier, l'espace d'administration, le planning, les intégrations et automatisations au lieu de réduire la réalisation à un site web. Les actions « découvrir la réalisation » et « visiter le site » restent distinctes. Aucun prix, compteur de projets ou nouvelle URL n'est ajouté.

La fiche reste une étude de cas Nova Baie. Les pages publiques de Blue Baie et les entrées d'accueil/portfolio Nova Baie fournissent le maillage existant ; aucun changement SEO de route n'est requis.

## Médias et éléments non retenus

- Réutilisation des huit captures publiques déjà enregistrées dans `blueBaieCaseMedia` et des photos publiques déjà autorisées.
- Aucun logo refabriqué.
- Le dossier `images/keycafe/` reste non utilisé dans le lot, car sa publication n'est pas nécessaire à la démonstration et pourrait exposer des détails d'accès.
- Les captures privées d'administration n'ont pas été reprises. L'écran de planning précédemment observé n'est pas référencé depuis l'application ni ajouté à Git. Les huit captures complémentaires ne sont pas présentes localement ; aucune n'est incluse. Le dossier public `admin-demo/` n'a pas été créé : seuls du code React/CSS et des captures Playwright de la page sont produits.

## Tests et performances

Recette locale :

- `npm run lint` : réussi, zéro avertissement.
- `npm run typecheck` : réussi après le build. Une première exécution lancée en parallèle du build a rencontré la régénération temporaire de `.next/types`; relancée de façon séquentielle, elle passe.
- `npm test` : 65 tests réussis.
- `npm run build` : réussi avec Next 15.5.29 et le compilateur WASM documenté par le dépôt. Première charge de la route dynamique : 134 kB (103 kB partagés, route mesurée à 10,1 kB par le résumé Next).
- `npm run test:e2e` : les 61 scénarios sont passés, dont les routes FR/EN, Saint-Jean, formulaires simulés et audits axe aux largeurs 390/768/1024/1440. Playwright a conservé un processus après les 61 réussites ; `Ctrl+C` a été nécessaire pour terminer le runner. Aucun test n'a appelé Make ou un service client.
- Après correction de la largeur interne mobile, tests Blue Baie FR/EN et axe mobile sur un build frais : 3/3 réussis. Le scénario vérifie les huit onglets, l'activation clavier, la largeur des indicateurs et les mentions fictives.
- Revue navigateur réelle des vues desktop et mobile. Captures de revue : `test-results/lot-c5-1-admin-demo-desktop.png`, `test-results/lot-c5-1-admin-integrations-desktop.png` et `test-results/lot-c5-1-admin-demo-mobile.png`. Vidéo Playwright : `test-results/c3-case-studies-C5-blue-ba-8df34-board-dialog-and-responsive/video.webm`. Ces fichiers sont ignorés par Git.
- Lighthouse local simulé avec le même script que le rapport C.5, sur la fiche Blue Baie, ressources externes bloquées :

| Forme | C.5 | C.5.1 | Écart | Accessibilité C.5.1 | TBT C.5.1 | CLS C.5.1 |
|---|---:|---:|---:|---:|---:|---:|
| Mobile simulé | 90 / LCP 3 523 ms | 88 / LCP 3 549 ms | −2 points / +26 ms | 100 | 180 ms | 0 |
| Desktop simulé | 91 / LCP 3 375 ms | 91 / LCP 3 397 ms | 0 point / +22 ms | 100 | 125 ms | 0,0001 |

Les mesures ne montrent pas de gain : léger écart du LCP et hausse du TBT mobile (79 ms dans la mesure C.5 précédente, 180 ms ici). Elles proviennent d'audits Lighthouse locaux simulés, pas de données d'utilisateurs. Les rapports JSON détaillés sont sous `test-results/lighthouse-c5-1/`. La taille first-load de la route est 134 kB ; la démonstration est chargée uniquement sur la fiche Blue Baie et n'ajoute aucun média ou service distant.

Les contrôles axe existants couvrent 390, 768, 1024 et 1440 px en français et en anglais. La scène mobile a aussi été examinée visuellement après correction du problème de colonnes internes. Les huit captures d'administration annoncées n'étant pas présentes dans le dépôt, aucune comparaison pixel à pixel avec le logiciel de production n'a été possible.

## Fichiers du lot

- `src/components/shared/blue-baie-admin-demo.tsx` — interface de démonstration bilingue et données fictives.
- `src/components/shared/blue-baie-case.tsx` — insertion de la scène et de ses textes factuels.
- `src/components/shared/blue-baie-gallery.tsx` — titre et description localisés dans la vue agrandie.
- `src/lib/blue-baie-case-content.ts` — narration plateforme/intégrations et limites d'affirmation.
- `src/lib/project-case-media.ts` — modèle ordonné et états de publication des médias.
- `src/lib/projects.ts` — description actualisée Blue Baie pour l'accueil et le portfolio.
- `src/app/[locale]/realisations/[slug]/page.tsx`, `src/app/globals.css` — branchement et styles responsive.
- `tests/content.test.ts`, `tests/browser/c3-case-studies.spec.ts` — garde-fous de médias et de démonstration.

## Retour arrière et prévisualisation

Le retour arrière se fait par réversion du commit C.5.1 sur la branche de travail ; ne pas réinitialiser le dépôt et ne pas toucher aux originaux utilisateur. Pour lancer le build local sur un port distinct :

```powershell
npm run build
npm run start -- --hostname localhost --port 3153
```

Puis ouvrir `http://localhost:3153/realisations/blue-baie-conciergerie` ou la route anglaise `/en/realisations/blue-baie-conciergerie`. Aucun appel Make ou service de production n'est requis.
