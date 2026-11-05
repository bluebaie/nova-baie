# LOT B — Repositionnement et architecture éditoriale

## 1. État Git initial et périmètre

- Branche : `refonte-nova-baie-2026`, arbre propre.
- Départ : `3b953cc9926d112472e6b1d05ec5ec314432dde3` (LOT A).
- `main` conservée à `bbea356f9d6fe971c0a815be2f0310039a81a8e3`.
- AGENTS.md, CLAUDE.md et docs/lot-a.md lus. Documentation locale Next absente ;
  guides officiels version 15 relus pour Server/Client Components et generateMetadata.
- Aucun push, déploiement, changement Vercel/Make/GTM, secret réel ou service payant.
- Aucun back-office ni nouvelle bibliothèque. Le LOT C n'est pas commencé.

## 2. Architecture et positionnement

Navigation principale : Accueil `/`, Expertises `/services`, Réalisations
`/realisations`, Contact `/contact`. Mêmes URL sous `/en` pour l'anglais.
Le label public change, l'URL historique `/services` reste identique.
À propos `/a-propos` et Publications `/actualites` sont conservées, accessibles
depuis le footer et hors navigation principale. Mentions et confidentialité
restent dans `/mentions-legales`, avec l'ancre `#confidentialite` dans les deux langues.
Aucune page géographique ou fiche projet supplémentaire.

L'accueil comporte six sections : hero, capacités, sélection de réalisations,
démarche, signature Blue Baie, appel au contact. Le portfolio arrive en troisième
position, sans actualités, statistiques ou offres intercalées. L'accueil emploie
des résumés de projets ; le portfolio précise le périmètre et les médias.

Signature : agence de développement digital & solutions technologiques.
Promesse : expériences digitales remarquables et technologies utiles à l'activité.
Publics : entreprises, associations et organisations. L'histoire touristique
est contextualisée, sans spécialisation exclusive ni grande équipe revendiquée.
La page À propos précise que l'activité est portée principalement par un développeur.

## 3. Pages, composants et sources de contenu

- `messages/fr.json` / `messages/en.json` : textes éditoriaux et UI, expertises,
  démarche, contact, métadonnées et informations légales reprises du socle.
- `src/lib/expertises.ts` : identifiants des sept expertises, trois groupes de
  capacités et six étapes. Traductions identifiées par clé, pas par index.
- `src/lib/projects.ts` : six identités stables, statut, URL confirmée, médias et
  textes FR/EN. Aucune fusion de tableaux de traduction par position.
- `src/lib/actualites-data.ts` : publications historiques localisées par identifiant.
- `src/lib/site-data.ts` : coordonnées publiques uniquement ; anciens exports
  offres, prix, cibles et statistiques supprimés.
- `src/lib/page-metadata.ts`, `structured-data.ts` : génération commune cohérente.
- Pages localisées principales et secondaires restructurées ; routes conservées.
- Hero, méthode, présentation Blue Baie, CTA et aperçu des projets simplifiés.
- `capabilities-section.tsx` ajouté ; `project-card.tsx` rendu serveur ;
  `project-video.tsx` limite l'interactivité à l'ouverture volontaire de la vidéo.
- Header : quatre liens, menu mobile et libellés accessibles traduits, fermeture
  sur changement de langue et retour du focus avec Échap. Footer : liens secondaires.
- Les messages transmis au provider client sont limités aux composants interactifs.
- Formulaire : libellés et taxonomie uniquement, logique sécurisée conservée.

Composants supprimés, devenus inutiles : offer-card, offers-section,
target-section, reasons-section, maintenance-section, latest-actualites-section,
hero-showcase. Leurs fonctions utiles sont reprises dans la structure compacte.
Les fichiers médias associés ne sont ni supprimés ni recompressés.

## 4. Portfolio exact et médias

Les périmètres des trois références récentes viennent de la demande utilisateur ;
les interfaces privées n'ont pas été inspectées ni capturées.

| Identifiant | Réalisation et périmètre affiché | Statut | Média utilisé |
| --- | --- | --- | --- |
| blue-baie | Blue Baie Conciergerie : site public, écosystème métier, réservations, intégrations, automatisations, administration | Réalisé | Aucun : capture publique manquante |
| saint-jean | Conciergerie Saint-Jean : site premium terminé, direction artistique, back-office métier | Réalisé | Aucun : capture publique manquante |
| csc | CycloSport Crotellois : événements, actualités, contenus administrables | En finalisation | Aucun : capture publique et URL manquantes |
| bout-du-monde | Le Bout du Monde : présentation de deux gîtes et de leur identité | Réalisé | `realisation-le-bout-du-monde.jpg`, vidéo `le-bout-du-monde-demo.mp4` |
| gites-en-baie | Gîtes en Baie : site multi-hébergements et parcours vers la réservation | Réalisé | `project-gites-en-baie.jpg`, vidéo `gites-en-baie-demo.mp4` |
| refuge-marmotte | Le Refuge de la Marmotte : hébergement, galerie, localisation et réservation | Réalisé | `project-ski-saintefoy.jpg`, vidéo `sainte-foy-demo.mp4` |

Les images sont sous `public/images/`, les vidéos sous `public/videos/`.
Une carte sans média présente uniquement son texte : aucun visuel générique,
faux écran ni capture d'un autre projet ne sert de remplacement.
Les vidéos n'ont pas de src monté avant le clic d'ouverture ; puis preload=none,
contrôles natifs, sans autoplay. La lecture ne commence que sur action utilisateur.
La sélection d'accueil est Blue Baie / Saint-Jean / Gîtes en Baie.
L'application de chiffrage industriel est exclue.

### URL vérifiées le 5 novembre 2026

Lectures GET publiques seulement, sans connexion privée ni formulaire :

| Entrée | Destination / résultat |
| --- | --- |
| https://bluebaie.fr | https://www.bluebaie.fr/ — HTTP 200 |
| https://conciergeriesaintjean.fr | https://conciergeriesaintjean.fr/ — HTTP 200 |
| https://www.conciergeriesaintjean.fr | https://conciergeriesaintjean.fr/ — HTTP 200 |
| https://www.gite-baie.com/ | HTTP 200, titre Gîtes en Baie |
| https://www.le-bout-du-monde.org | HTTP 200, titre Le Bout du Monde |
| https://www.ski-saintefoy.com/ | HTTP 200, titre Le Refuge de la Marmotte |

CSC : aucune URL confirmée dans les sources consultées. Pas de lien inventé ou
vers un ancien site supposé. Confirmation demandée, absence traitée par omission du lien.
Ces contrôles de disponibilité ne prouvent pas l'intégralité des fonctions internes.

## 5. Français et anglais

Même structure de clés FR/EN, sept expertises et six projets complets dans les
deux langues. Libellés du menu, du formulaire, des états et des contrôles traduits.
La carte Le Bout du Monde ne retombe plus sur du français en anglais.

Les trois publications d'avril/mai 2026 gardent leurs dates, titres français et
médias d'origine. Le texte français est conservé largement, avec retrait des
chiffres non vérifiés et adaptation des phrases de spécialisation exclusive.
L'anglais est une adaptation éditoriale du propos, pas une fausse publication récente.
Les visuels historiques contiennent encore du français : une mention l'indique
sur la page anglaise. Le carrousel est désormais manuel, avec contrôles traduits.

## 6. Suppression du modèle tarifaire

Suppression des offres Présence / Conversion / Acquisition, données Essentiel /
Signature / Performance, prix, priceRange JSON-LD, tableaux commerciaux et ancien
composant OfferCard. Retrait des engagements 24 h, 48 h, trois à six semaines,
maintenance offerte et métriques d'hébergement utilisées comme preuves commerciales.
Le mot conversion reste pertinent dans l'expertise SEO, sans désigner un forfait.
La démarche sur mesure comporte échange, compréhension, conception, proposition
personnalisée, développement, validation et évolution.

Les médias binaires historiques sont conservés ; aucune opération de génération
ou de retouche n'a été effectuée. Les contrôles d'absence de prix concernent les
textes publics, les données structurées et le modèle de données.

## 7. SEO

URL, sitemap à 12 entrées, robots, normalisation FR/EN et hreflang du LOT A conservés.
Le matcher du middleware exclut désormais aussi `/opengraph-image` : le contrôle
HTTP de l'image générée a révélé qu'elle était auparavant capturée par la
localisation et retournait une 404. Correction ciblée, sans changement du routage des pages.
Titles, descriptions, H1 et contenu alignés sur le positionnement généraliste.
Métadonnées Open Graph/Twitter propres à chaque page, avec image générée mise à
jour ; l'ancien JPEG OG est conservé sur disque mais n'est plus référencé.
Les données structurées localisées décrivent WebSite et ProfessionalService,
avec sept domaines de connaissance, rattachement Blue Baie et zones desservies.
Aucune implantation supplémentaire inventée ; aucune note ou résultat chiffré.

Somme, Baie de Somme, Côte d'Opale et Pas-de-Calais sont intégrés dans le contexte
territorial réel. Les requêtes agence web, développement sur mesure, applications
métier, API, automatisation, IA et SEO restent des hypothèses sémantiques. Aucun
volume, classement ou gain de trafic connu ou promis sans données externes.
Les mentions restent noindex, hors sitemap ; confidentialité accessible par ancre.

## 8. Formulaire / contrat Make

Champs transmis à Make inchangés : nom, email, telephone, structure, typeProjet,
message, source et date. Source et date restent générés par le serveur.
Le honeypot reste interne. Seulement nom, email et message obligatoires.
Le sujet est facultatif, par défaut `other`.

| Code LOT B | Libellé FR |
| --- | --- |
| website | Site internet |
| business_app | Application métier |
| automation_api | Automatisation / intégration API |
| ai | Intelligence artificielle |
| identity_design | Identité / design |
| seo | SEO / visibilité |
| other | Autre projet |

Les anciens codes presence / conversion / acquisition / maintenance / conseil
ne sont plus acceptés par la validation. Le contrat de structure reste compatible,
mais **les filtres, branches, modèles ou mappings Make basés sur ces anciennes
valeurs doivent être examinés et adaptés par l'administrateur avant activation**.
Ne pas supposer que le scénario distant accepte déjà les nouveaux codes.
Aucun test réel n'a été exécuté et aucune configuration privée n'a été fournie.
Les limites de conservation, d'idempotence et de disponibilité du LOT A persistent.

## 9. Recette

| Contrôle | Résultat |
| --- | --- |
| npm run lint | Réussi, zéro avertissement |
| npm run typecheck | Réussi |
| npm test | 64 réussis, zéro échec / ignoré |
| Build de production local, méthode WASM du LOT A | Réussi, 20 pages générées |
| Navigateur / HTTP | 39 réussis en 31,6 secondes, zéro échec / ignoré |
| Comparaison au LOT A | 17 fichiers protégés et 34 médias identiques octet pour octet |

Les tests couvrent protection du formulaire, sept sujets et défaut other,
couverture FR/EN, six projets, absence de prix, routes, liens internes et ancres,
métadonnées, Open Graph/Twitter, schema, mobile, médias et vidéos à déclenchement
volontaire. Les appels de contact sont simulés ; le serveur de test ne possède
pas de configuration Make ou Redis réelle. Ressources externes bloquées dans Chrome.

Fichiers protégés comparés : route API contact, handler, rate-limit, submit,
routage et requête i18n, helper SEO du LOT A, robots, sitemap,
configuration Next, package et verrou, env.example, erreurs globales et locales.
Seules les adaptations explicitement autorisées de validation/typeProjet et des
libellés de formulaire sont appliquées au périmètre contact.
Captures de revue locales sous `test-results/lot-b-*.png`, ignorées par Git.
Captures d'accueil FR desktop et EN mobile examinées visuellement après correction
des polices ; vues du portfolio également produites pour la revue humaine.
La génération PNG Open Graph, les focus clavier et prefers-reduced-motion sont
vérifiés dans la recette. L'avertissement build sur l'image Edge non prérendue
reste attendu ; la route répond HTTP 200 avec une véritable image PNG.

## 10. Validation humaine et limites

- Confirmer les périmètres publics Blue Baie, Saint-Jean et CSC avant publication.
- Fournir des captures publiques autorisées de ces trois références, sans données privées.
- Confirmer l'URL publiable du CSC ; conserver le statut en finalisation jusque-là.
- Valider les textes FR/EN, la promesse et les adaptations d'archives.
- Vérifier le mapping des nouveaux sujets dans un scénario isolé autorisé.
- Configurer le contact et la protection partagée conformément au LOT A.
- Vérifier Vercel, GTM, consentement et traitements réels avant publication.
- Les mentions historiques d'identité légale sont reprises, non vérifiées juridiquement.
  Les phrases niant toute transmission à des tiers ou tout traceur ont été remplacées
  par les faits connus Make/GTM. Durées, bases et modalités complètes restent à valider.
- Pas d'audit WCAG complet, de mesure terrain ni de validation multi-navigateurs revendiqués.

## 11. Préparation du LOT C

Sections indépendantes, identifiants stables des expertises et projets, cartes
serveur et lecteur vidéo isolé. Logo, photographie aérienne, polices et médias
préservés. Aucun ajout Motion/Lenis/React Bits. Les bleus et l'univers photographique
restent ; les accents turquoise/dorés et la scénographie immersive seront à
travailler au LOT C, sans prétendre avoir livré cette direction artistique ici.
Focus visibles et reduced-motion ajoutés aux styles existants. Les alias des
polices sont résolus sur body, où next/font définit Inter et Playfair : correction
du fallback constaté visuellement, sans ajout ou remplacement de police.

## 12. Impacts

Performance : suppression du showcase vidéo automatique et de plusieurs sections
clients, pas de chargement vidéo initial, moins de messages sérialisés au navigateur.
La direction générale est favorable ; aucun gain Core Web Vitals n'est annoncé.
Le build annonce First Load JS accueil 126 kB (128 kB au LOT A), réalisations
126 kB (127 kB), actualités 123 kB (125 kB), contact 124 kB (inchangé), commun
103 kB (inchangé). Chiffres arrondis de Next, pas des mesures réseau terrain.
Sécurité : handler, limitation, timeout, filtrage d'origine et configuration privée
du LOT A conservés. Aucun backend ou service ajouté.
Maintenance : sources identifiées, projets sans index de traduction, mutualisation
des métadonnées et suppression du code d'offres devenu inutile.
Coûts : aucune dépendance ni abonnement supplémentaire.

## 13. Retour arrière

Conserver la branche ; annuler les commits du LOT B par git revert sur une branche
de travail, sans reset --hard ni modification de main. Refaire lint, types, tests,
build et recette. Aucune dépendance, migration ou configuration distante à restaurer.
Le retour au LOT A rétablit aussi l'ancienne taxonomie de formulaire : coordonner
tout éventuel mapping distant lors d'une publication ultérieure autorisée.
