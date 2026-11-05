# Nova Baie

Site Next.js App Router bilingue : français sans préfixe, anglais sous `/en`.
Le LOT A consolide le socle existant ; aucune refonte graphique ni administration.

## Prérequis et installation locale

- Node.js **24.19.0** (`.nvmrc`), famille Node 24 LTS ; npm **11.17.0**.
- `npm ci` installe exactement le verrou. Ne pas utiliser `audit fix --force`.
- `npm run dev` démarre le serveur de développement.
- `npm run lint`, `npm run typecheck`, `npm test` vérifient le code.
- `npm run build` produit un build local ; `npm start` le sert localement.
- `npm run check` enchaîne lint, types, tests unitaires puis build.
- `npm run test:e2e` utilise le build existant et **Google Chrome installé** ; lance un serveur exclusivement sur `localhost:3146`. Ne pas lancer sur un autre serveur.

Les tests navigateur bloquent les requêtes hors de cette origine et neutralisent
les variables de contact du serveur de test. Les tests unitaires injectent des
réponses HTTP fictives ; aucun webhook réel n'est utilisé.

`next/font` conserve Inter et Playfair Display ; le premier build peut télécharger
ces polices. Le compilateur SWC WASM officiel est disponible comme secours local
si le système refuse le binaire natif. Voir les limites Windows dans
[le dossier LOT A](docs/lot-a.md). Ne pas désactiver la sécurité Windows.

## Contact : configuration privée requise

Voir `.env.example` : aucune valeur réelle n'est fournie. Ne pas copier une valeur
de secret dans le code, la documentation ou la conversation.

Le navigateur appelle uniquement `POST /api/contact`. Cette route valide les
données, contrôle l'origine, applique une limitation distribuée puis appelle Make
avec un délai de 8 secondes. Le navigateur attend au maximum 20 secondes.
Seul un HTTP 2xx de Make conduit à `202 {code: "accepted"}`. Cela indique une
acceptation par le service HTTP, pas la livraison d'un email.

Le formulaire est **indisponible (503) tant que sa configuration privée et sa
limitation distribuée ne sont pas valides**. Ce comportement est volontaire.
La création d'un service ou une configuration distante exige un accord humain.

Aucune conservation durable des demandes n'est ajoutée. Le futur LOT D devra la
prévoir. Ne pas supposer que Make stocke ou livre les demandes sans vérification.

## Sécurité et opérations

- Ne jamais exposer de webhook via une variable `NEXT_PUBLIC_*`.
- Les dépendances de sécurité sont épinglées et les overrides documentés.
- `npm audit` consulte le registre, sans modifier l'application distante.
- Les scripts `scripts/compress-*.mjs` **réécrivent des médias** ; ils ne font pas
  partie des vérifications et ne doivent pas être exécutés sans besoin explicite.
- Les contrôles ne prouvent pas la conformité RGPD ; GTM, les prestataires et les
  durées de conservation nécessitent une revue humaine.
- Aucune publication automatique ni CI de déploiement n'est ajoutée.

Voir [docs/lot-a.md](docs/lot-a.md) pour le contrat Make, la matrice des routes,
les décisions de sécurité et la liste des interventions administrateur.
