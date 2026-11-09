import Image from 'next/image';
import { Barlow_Condensed } from 'next/font/google';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Maximize2 } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { CyclosportMotion } from './cyclosport-motion';
import { CyclosportCockpit, CyclosportViewer } from './cyclosport-viewer';
import s from './cyclosport.module.css';

const display = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '800'], style: ['normal', 'italic'], variable: '--csc-display', display: 'swap' });

const media = '/media/projects/csc/optimized';
const identity = '/media/projects/csc/identite-csc';
const SITE = 'https://www.cyclosportcrotellois.fr/';

const copy = {
  fr: {
    crumbs: ['Accueil', 'Réalisations'], crumbLabel: 'Fil d’Ariane', back: 'Toutes les réalisations',
    kicker: 'Nova Baie × CSC — Projet phare', club: 'CycloSport Crotellois', titleA: 'Une identité', titleB: 'en mouvement',
    lead: 'Un écosystème digital au service d’un club cycliste, de ses membres et de sa vie associative.',
    start: 'Prendre le départ', place: 'Le Crotoy · Baie de Somme', credit: 'Photo · Eric & Élo',
    bib: 'Portfolio Nova Baie', annotation: 'le concept du club', sticker: 'BAIE EN MOUVEMENT · LE CROTOY · CSC · ',
    disciplines: ['Route', 'Gravel', 'VTT', 'Cyclo-cross', 'Beach race'],
    act2: '02 — Le défi digital', challenge: 'Un club qui roule. Une plateforme qui suit le rythme.',
    challengeBody: ['Actualités, événements, inscriptions, partenaires, nouveaux membres, prise de contact : la vie d’un club cycliste se raconte et s’organise toute l’année. Le CSC avait besoin d’un environnement numérique structuré pour réunir sa communication, ses contenus et ses fonctions associatives.', 'Nova Baie a conçu l’ensemble : la direction artistique web, le site public et un back-office sur mesure, pensé pour que les membres du bureau publient et gèrent eux-mêmes les contenus du club.'],
    roleLabel: 'Rôle de Nova Baie', roles: ['Direction artistique web', 'Conception UX', 'Développement du site public', 'Développement du back-office', 'Référencement naturel'],
    profileTitle: 'Le profil de l’étape', profile: [['Raconter', 'Actualités, galeries, nouveaux membres'], ['Organiser', 'Événements, éditions, inscriptions'], ['Fédérer', 'Partenaires, contact, messages'], ['Piloter', 'Médias, utilisateurs, rôles, journal']],
    peloton: 'Le collectif du CSC en bord de mer. Photographie fournie par le club.', pelotonAlt: 'Huit cyclistes du CSC en maillot orange et noir, alignés devant leurs vélos en bord de mer sous un ciel bleu',
    act3: '03 — Identité & direction artistique', identityTitle: 'Noir. Orange. Mouvement.',
    identityBody: 'Le site prolonge le maillot du club : un noir profond, un orange vif et une typographie condensée qui claque comme un titre de course. Le concept « Baie en mouvement » relie la photographie sportive, les tracés graphiques et le territoire.',
    palette: [['Noir course', '#0A0A0A'], ['Orange maillot', '#FF5A20'], ['Crème', '#F4F1EA']],
    typeTitle: 'Titres', typeBody: 'Textes', typeNote: 'Barlow Condensed pour l’impact, Inter pour la lecture.',
    logos: 'Déclinaisons web de l’identité, dérivées du maillot du club.', logoAlt: 'Logo de navigation CSC Le Crotoy sur fond noir',
    principles: [['Photographie d’abord', 'Les membres du club, en course et en sortie, portent chaque page.'], ['Le point orange', 'Chaque grand titre se termine par un point orange, comme une ligne d’arrivée.'], ['Tracés et courbes', 'Des lignes de parcours relient les rubriques et rythment les en-têtes.'], ['Mouvement mesuré', 'Photos en léger dézoom à l’arrivée, désactivé lorsque le visiteur réduit les animations.']],
    detailTitle: 'Détail · titre d’accueil', detailAlt: 'Détail du titre d’accueil du site du CSC : « Rouler ensemble, entre terre et mer. » en lettres condensées blanches avec un point orange',
    detailScale: 'Résolution d’origine',
    speedKicker: 'Transition', speedTitle: 'De la photo à l’interface, le même élan.', cyclocrossAlt: 'Coureur du CSC en maillot orange lancé dans une épreuve de cyclo-cross boueuse, dossard 66',
    act4: '04 — L’expérience web publique', publicTitle: 'Un site qui donne envie de rouler.',
    publicBody: 'Des pages construites comme des affiches de course : grandes photographies, titres condensés, repères numérotés. Chaque rubrique garde la même énergie, de l’accueil au contact.',
    enlarge: 'Agrandir', desktopNote: 'Captures desktop du site du club',
    screens: {
      home: ['Accueil', '« Rouler ensemble, entre terre et mer. »', 'Accueil du site du CSC : deux cyclistes du club, titre « Rouler ensemble, entre terre et mer » et navigation noire'],
      practices: ['Accueil · Pratiques', 'La route et le hors bitume, face à face', 'Section des pratiques : « La route » et « Hors bitume » en deux grandes photographies'],
      club: ['Le Club', 'Cinq terrains de jeu', 'Page Le Club : « Nos terrains de jeu », route, gravel, VTT, cyclo-cross et beach race'],
      offroad: ['Tout-terrain', 'Gravel, VTT, cyclo-cross, beach race', 'Page Hors bitume : quatre photographies verticales de disciplines et grand titre'],
      news: ['Actualités', 'Le journal du club, filtrable', 'Page Actualités : en-tête noir avec vélo filaire, filtres par catégorie et liste d’articles'],
      contact: ['Contact', 'Écrire au bureau du club', 'En-tête de la page Contact : « Contacter le club » sur une touche de peinture orange'],
      lineart: ['Détail graphique', 'Vélo filaire et tracé orange', 'Détail de l’en-tête Actualités : vélo dessiné en lignes grises et courbe orange']
    },
    gridKicker: 'De l’image au système', gridTitle: 'De la vitrine au moteur.', gridBody: 'Derrière chaque page publique, un back-office. Le tracé devient grille : bienvenue dans la mécanique du club.',
    act5: '05 — Le moteur métier', engineTitle: 'Un back-office taillé pour la vie du club.',
    engineBody: 'Le bureau publie, organise et pilote depuis une administration sécurisée. Chaque module correspond à un geste réel du club.',
    layers: [['Site public', 'Pages, actualités, événements, formulaires d’inscription et de contact.'], ['Gestion métier', 'Publication, ordre d’affichage, saisons, inscriptions, partenaires et messages.'], ['Base de données', 'Contenus, médias et inscriptions structurés, avec des règles d’accès appliquées par la base.'], ['Administration sécurisée', 'Connexion, rôles et permissions configurables, journal d’activité.']],
    cockpitLabel: 'Écrans du back-office',
    cockpit: [
      { id: 'news', label: 'Actualités', body: 'Rédiger, publier, masquer ou archiver ; choisir les articles mis en avant sur l’accueil.', alt: 'Back-office du CSC, module Actualités : articles publiés, positions sur l’accueil et actions Modifier, Masquer, Archiver' },
      { id: 'members', label: 'Nouveaux membres', body: 'Présenter les arrivants de la saison, avec une autorisation de publication suivie pour chaque fiche.', alt: 'Back-office du CSC, module Nouveaux membres : choix de la saison et fiches affichées avec autorisation' },
      { id: 'partners', label: 'Partenaires', body: 'Classer les partenaires, gérer leur visibilité et leur présence sur l’accueil.', alt: 'Back-office du CSC, module Partenaires : liste ordonnée avec logos, visibilité et présence sur l’accueil' },
      { id: 'media', label: 'Médias des pages', body: 'Choisir la photo de chaque emplacement du site, avec son cadrage et son état de publication.', alt: 'Back-office du CSC, module Médias des pages : emplacements photo de l’accueil avec leur état En ligne' }
    ],
    anonymised: 'Captures anonymisées : noms, visages et identifiants floutés.',
    startList: 'La liste de départ', startListNote: 'Modules développés pour l’administration du club',
    modules: [['Tableau de bord', 'Vue d’ensemble à la connexion.'], ['Actualités', 'Articles, galeries jusqu’à dix photos, mise en avant sur l’accueil.'], ['Nouveaux membres', 'Saisons et autorisations de publication.'], ['Événements', 'Éditions, séries récurrentes et pages d’événement.'], ['Inscriptions', 'Inscription en ligne ou lien vers une billetterie externe, export des inscrits.'], ['Partenaires', 'Fiches, logos, ordre et visibilité.'], ['Messages', 'Formulaire de contact et boîte de réception, avec statuts et attribution.'], ['Photos & médias', 'Médiathèque du site.'], ['Médias des pages', 'Emplacements photo de chaque page.'], ['Utilisateurs & rôles', 'Superadmin, Communication, Contact : permissions configurables.'], ['Journal d’activité', 'Traçabilité des actions d’administration.']],
    act6: '06 — Technologie & architecture', techTitle: 'Une mécanique solide, pensée pour durer.',
    stack: [['Next.js & React', 'Pages rapides rendues côté serveur et interface d’administration dans une même application.'], ['TypeScript', 'Un code typé, plus sûr à faire évoluer.'], ['Supabase', 'Base PostgreSQL, authentification et stockage des médias, avec des règles d’accès appliquées par la base.'], ['Vercel', 'Hébergement et déploiements, avec des environnements de prévisualisation.']],
    pillars: [['Architecture', 'Site public et administration partagent les mêmes données, sans double saisie.'], ['Contenus', 'Chaque contenu a un statut : brouillon, publié, masqué ou archivé.'], ['Permissions', 'Des rôles distincts pour la communication, les messages et l’administration.'], ['Maintenance', 'Évolutions de la base de données versionnées et rejouables.'], ['Évolutivité', 'De nouveaux modules peuvent s’ajouter sans refondre l’existant.'], ['Responsive', 'Parcours contrôlés de 320 à 1280 pixels de large.'], ['Qualité', 'Tests automatisés et recettes navigateur à chaque lot.']],
    act7: '07 — Ligne d’arrivée', finale: ['Des identités fortes.', 'Des expériences sur mesure.', 'Des outils qui font avancer les organisations.'],
    finaleBody: 'Club, association ou entreprise : Nova Baie conçoit l’image, le site et la plateforme qui vont avec.',
    cta: 'Lancer votre projet', visit: 'Visiter le site du CSC', portfolio: 'Toutes les réalisations', next: 'Réalisation suivante', nextName: 'Blue Baie Conciergerie'
  },
  en: {
    crumbs: ['Home', 'Projects'], crumbLabel: 'Breadcrumb', back: 'All projects',
    kicker: 'Nova Baie × CSC — Flagship project', club: 'CycloSport Crotellois', titleA: 'An identity', titleB: 'in motion',
    lead: 'A digital ecosystem serving a cycling club, its members and its community life.',
    start: 'Take the start', place: 'Le Crotoy · Bay of Somme', credit: 'Photo · Eric & Élo',
    bib: 'Nova Baie portfolio', annotation: 'the club’s concept', sticker: 'BAIE EN MOUVEMENT · LE CROTOY · CSC · ',
    disciplines: ['Road', 'Gravel', 'MTB', 'Cyclo-cross', 'Beach race'],
    act2: '02 — The digital challenge', challenge: 'A club on the move. A platform that keeps pace.',
    challengeBody: ['News, events, registrations, partners, new members, enquiries: a cycling club’s life is told and organised all year round. The CSC needed a structured digital environment bringing together its communication, its content and its association tools.', 'Nova Baie designed the whole system: the web art direction, the public website and a bespoke back office, built so that committee members can publish and manage the club’s content themselves.'],
    roleLabel: 'Nova Baie’s role', roles: ['Web art direction', 'UX design', 'Public website development', 'Back office development', 'Search engine optimisation'],
    profileTitle: 'The stage profile', profile: [['Tell', 'News, galleries, new members'], ['Organise', 'Events, editions, registrations'], ['Unite', 'Partners, contact, messages'], ['Steer', 'Media, users, roles, activity log']],
    peloton: 'The CSC riders by the sea. Photograph supplied by the club.', pelotonAlt: 'Eight CSC riders in orange and black jerseys lined up in front of their bikes by the sea under a blue sky',
    act3: '03 — Identity & art direction', identityTitle: 'Black. Orange. Motion.',
    identityBody: 'The website extends the club jersey: deep black, vivid orange and condensed type that hits like a race headline. The “Baie en mouvement” concept connects sports photography, graphic routes and the landscape.',
    palette: [['Race black', '#0A0A0A'], ['Jersey orange', '#FF5A20'], ['Cream', '#F4F1EA']],
    typeTitle: 'Headlines', typeBody: 'Body text', typeNote: 'Barlow Condensed for impact, Inter for reading.',
    logos: 'Web variations of the identity, derived from the club jersey.', logoAlt: 'CSC Le Crotoy navigation logo on black',
    principles: [['Photography first', 'Club members, racing and riding together, carry every page.'], ['The orange dot', 'Every major headline ends with an orange dot, like a finish line.'], ['Routes and curves', 'Route lines connect sections and set the rhythm of page headers.'], ['Measured motion', 'Photos gently zoom out on arrival, disabled when visitors reduce motion.']],
    detailTitle: 'Detail · homepage headline', detailAlt: 'Detail of the CSC homepage headline “Rouler ensemble, entre terre et mer.” in white condensed letters with an orange dot',
    detailScale: 'Original resolution',
    speedKicker: 'Transition', speedTitle: 'From photograph to interface, the same momentum.', cyclocrossAlt: 'CSC rider in an orange jersey racing through a muddy cyclo-cross course, race number 66',
    act4: '04 — The public web experience', publicTitle: 'A website that makes you want to ride.',
    publicBody: 'Pages built like race posters: large photographs, condensed headlines, numbered markers. Every section keeps the same energy, from the homepage to the contact page.',
    enlarge: 'Enlarge', desktopNote: 'Desktop captures of the club website',
    screens: {
      home: ['Homepage', '“Rouler ensemble, entre terre et mer.”', 'CSC website homepage: two club riders, the headline “Rouler ensemble, entre terre et mer” and a black navigation bar'],
      practices: ['Homepage · Disciplines', 'Road and off-road, side by side', 'Disciplines section: “La route” and “Hors bitume” as two large photographs'],
      club: ['The Club', 'Five playgrounds', 'Club page: “Nos terrains de jeu”, road, gravel, mountain biking, cyclo-cross and beach racing'],
      offroad: ['Off-road', 'Gravel, MTB, cyclo-cross, beach racing', 'Off-road page: four vertical discipline photographs and a large headline'],
      news: ['News', 'The club journal, with filters', 'News page: black header with a line-drawn bike, category filters and article list'],
      contact: ['Contact', 'Writing to the club committee', 'Contact page header: “Contacter le club” over an orange brush stroke'],
      lineart: ['Graphic detail', 'Line-drawn bike and orange route', 'Detail of the News header: bike drawn in grey lines and an orange curve']
    },
    gridKicker: 'From image to system', gridTitle: 'From showcase to engine.', gridBody: 'Behind every public page sits a back office. The route becomes a grid: welcome to the club’s machinery.',
    act5: '05 — The business engine', engineTitle: 'A back office built around club life.',
    engineBody: 'The committee publishes, organises and manages from a secure administration area. Each module matches a real club task.',
    layers: [['Public website', 'Pages, news, events, registration and contact forms.'], ['Business logic', 'Publishing, display order, seasons, registrations, partners and messages.'], ['Database', 'Structured content, media and registrations, with access rules enforced by the database.'], ['Secure administration', 'Sign-in, configurable roles and permissions, activity log.']],
    cockpitLabel: 'Back office screens',
    cockpit: [
      { id: 'news', label: 'News', body: 'Write, publish, hide or archive articles; choose which ones are featured on the homepage.', alt: 'CSC back office, News module: published articles, homepage positions and Edit, Hide, Archive actions' },
      { id: 'members', label: 'New members', body: 'Introduce the season’s newcomers, with a tracked publication consent for each profile.', alt: 'CSC back office, New members module: season selector and displayed profiles with consent' },
      { id: 'partners', label: 'Partners', body: 'Order partners and manage their visibility and homepage presence.', alt: 'CSC back office, Partners module: ordered list with logos, visibility and homepage presence' },
      { id: 'media', label: 'Page media', body: 'Choose the photograph for each slot of the website, with its framing and publication status.', alt: 'CSC back office, Page media module: homepage photo slots with their Online status' }
    ],
    anonymised: 'Anonymised captures: names, faces and user details blurred.',
    startList: 'The start list', startListNote: 'Modules developed for the club administration',
    modules: [['Dashboard', 'An overview at sign-in.'], ['News', 'Articles, galleries of up to ten photos, homepage features.'], ['New members', 'Seasons and publication consent.'], ['Events', 'Editions, recurring series and event pages.'], ['Registrations', 'Online registration or a link to an external ticketing page, attendee export.'], ['Partners', 'Profiles, logos, order and visibility.'], ['Messages', 'Contact form and shared inbox, with statuses and assignment.'], ['Photos & media', 'Website media library.'], ['Page media', 'Photo slots for every page.'], ['Users & roles', 'Superadmin, Communication, Contact: configurable permissions.'], ['Activity log', 'Traceability of administration actions.']],
    act6: '06 — Technology & architecture', techTitle: 'Solid mechanics, built to last.',
    stack: [['Next.js & React', 'Fast server-rendered pages and the administration interface in one application.'], ['TypeScript', 'Typed code that is safer to evolve.'], ['Supabase', 'PostgreSQL database, authentication and media storage, with access rules enforced by the database.'], ['Vercel', 'Hosting and deployments, with preview environments.']],
    pillars: [['Architecture', 'The public website and the administration share the same data, with no double entry.'], ['Content', 'Every item has a status: draft, published, hidden or archived.'], ['Permissions', 'Separate roles for communication, messages and administration.'], ['Maintenance', 'Versioned, replayable database changes.'], ['Scalability', 'New modules can be added without rebuilding what exists.'], ['Responsive', 'Journeys checked from 320 to 1280 pixels wide.'], ['Quality', 'Automated tests and browser acceptance runs for every phase.']],
    act7: '07 — Finish line', finale: ['Strong identities.', 'Tailored experiences.', 'Tools that move organisations forward.'],
    finaleBody: 'Club, association or business: Nova Baie designs the image, the website and the platform behind it.',
    cta: 'Start your project', visit: 'Visit the CSC website', portfolio: 'All projects', next: 'Next project', nextName: 'Blue Baie Conciergerie'
  }
} as const;

type ScreenKey = keyof typeof copy.fr.screens;
const screenFiles: Record<ScreenKey, { src: string; width: number; height: number }> = {
  home: { src: `${media}/home-hero.webp`, width: 1796, height: 986 },
  practices: { src: `${media}/home-practices.webp`, width: 1796, height: 903 },
  club: { src: `${media}/club-terrains.webp`, width: 1796, height: 987 },
  offroad: { src: `${media}/hors-bitume.webp`, width: 1796, height: 987 },
  news: { src: `${media}/actualites.webp`, width: 1796, height: 987 },
  contact: { src: `${media}/contact.webp`, width: 1796, height: 655 },
  lineart: { src: `${media}/detail-lineart.webp`, width: 690, height: 465 }
};

function Screen({ id, t, sizes, className, priority = false }: { id: ScreenKey; t: (typeof copy)['fr' | 'en']; sizes: string; className?: string; priority?: boolean }) {
  const [label, title, alt] = t.screens[id];
  const file = screenFiles[id];
  return <figure className={`${s.screen} ${className ?? ''}`} data-csc-screen>
    <div className={s.browser} aria-hidden="true"><i /><i /><i /><span>cyclosportcrotellois.fr</span></div>
    <button type="button" className={s.zoom} data-csc-zoom data-src={file.src} data-alt={alt} data-width={file.width} data-height={file.height} aria-label={`${t.enlarge} : ${label}`}>
      <Image src={file.src} alt={alt} width={file.width} height={file.height} sizes={sizes} quality={90} priority={priority} />
      <span className={s.zoomHint}><Maximize2 size={14} aria-hidden="true" />{t.enlarge}</span>
    </button>
    <figcaption><span>{label}</span>{title}</figcaption>
  </figure>;
}

/** Abstract bay contour lines — a graphic motif, not a geographic map. */
function BayLines({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
    {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${-60 + i * 14} ${120 + i * 70}C${260 + i * 10} ${40 + i * 62} ${420 - i * 8} ${420 + i * 30} ${700 + i * 6} ${330 + i * 40}S${1080 - i * 12} ${110 + i * 58} ${1500} ${190 + i * 66}`} />)}
  </svg>;
}

export function CyclosportCase({ locale }: { locale: string }) {
  const en = locale === 'en';
  const t = en ? copy.en : copy.fr;
  return <article className={`${s.case} ${display.variable}`} data-csc-case>
    <CyclosportMotion />
    <CyclosportViewer closeLabel={en ? 'Close image' : 'Fermer l’image'} />

    {/* ACT I — HERO */}
    <header className={s.hero} data-csc-hero>
      <BayLines className={s.bay} />
      <div className={s.speed} aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <i key={i} />)}</div>
      <svg className={s.trajectory} viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className={s.trajectoryGhost} d="M-40 700C190 560 330 820 610 640S960 250 1180 360 1420 760 1500 920" />
        <path data-csc-trajectory d="M-40 700C190 560 330 820 610 640S960 250 1180 360 1420 760 1500 920" />
      </svg>
      <div className={s.wrap}>
        <nav className={s.crumbs} aria-label={t.crumbLabel}><ol><li><Link href="/">{t.crumbs[0]}</Link></li><li><Link href="/realisations">{t.crumbs[1]}</Link></li><li aria-current="page">{t.club}</li></ol></nav>
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <p className={s.kicker} data-csc-in>{t.kicker}</p>
            <Image className={s.heroLogo} src={`${identity}/logo-navigation-fond-sombre.webp`} alt="CSC Le Crotoy" width={1150} height={280} sizes="200px" priority data-csc-in />
            <h1 className={s.title}>
              <span className={s.titleClub} data-csc-in>{t.club}</span>
              <span className={s.titleLine}><span data-csc-line>{t.titleA}</span></span>
              <span className={s.titleLine}><span data-csc-line>{t.titleB}<i className={s.dot} aria-hidden="true" /></span></span>
            </h1>
            <p className={s.lead} data-csc-in>{t.lead}</p>
            <a className={s.start} href="#csc-challenge" data-csc-in>{t.start}<ArrowDown size={18} aria-hidden="true" /></a>
          </div>
          <div className={s.heroVisual} data-csc-visual>
            <div className={s.slash} aria-hidden="true" />
            <div className={s.heroPhoto} data-csc-photo>
              <Image src={`${media}/cyclocross.webp`} alt={t.cyclocrossAlt} fill priority sizes="(min-width: 1024px) 46vw, 100vw" quality={84} />
            </div>
            <div className={s.bib} aria-hidden="true"><span>N°</span><strong>01</strong><small>{t.bib}</small></div>
            <svg className={s.sticker} viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="csc-ring" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0" /></defs>
              <circle cx="100" cy="100" r="96" />
              <text><textPath href="#csc-ring" textLength="462" lengthAdjust="spacing">{t.sticker}</textPath></text>
              <circle className={s.stickerDot} cx="100" cy="100" r="16" />
            </svg>
            <p className={s.annotation} aria-hidden="true"><svg viewBox="0 0 120 70" fill="none"><path d="M112 8C84 6 46 18 28 52m0 0 2-16m-2 16 15-7" /></svg>{t.annotation}</p>
            <span className={s.credit}>{t.credit}</span>
          </div>
        </div>
      </div>
      <div className={s.tape} aria-hidden="true"><div data-csc-tape>{[0, 1].map(k => <span key={k}>{t.disciplines.map(item => <b key={item}>{item}<i>/</i></b>)}<b>{t.place}<i>/</i></b></span>)}</div></div>
      <ul className={s.srDisciplines}>{t.disciplines.map(item => <li key={item}>{item}</li>)}</ul>
    </header>

    {/* ACT II — CHALLENGE (Transition A: the trajectory keeps running) */}
    <section id="csc-challenge" className={s.challenge}>
      <svg className={s.relay} viewBox="0 0 1440 220" preserveAspectRatio="none" fill="none" aria-hidden="true"><path data-csc-draw d="M1500 -10C1260 70 1100 40 900 120S420 190 -40 150" /></svg>
      <div className={s.wrap}>
        <p className={s.kicker}>{t.act2}</p>
        <div className={s.challengeGrid}>
          <h2>{t.challenge}</h2>
          <div className={s.challengeText}>{t.challengeBody.map(p => <p key={p}>{p}</p>)}
            <p className={s.label}>{t.roleLabel}</p>
            <ul className={s.roles}>{t.roles.map(role => <li key={role}>{role}</li>)}</ul>
          </div>
        </div>
        <div className={s.profile}>
          <h3 className={s.profileTitle}>{t.profileTitle}</h3>
          <svg viewBox="0 0 1200 180" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path className={s.profileFill} d="M0 170 120 150 230 160 320 96 420 120 520 70 640 104 760 40 880 86 1000 26 1110 70 1200 50V180H0Z" />
            <path data-csc-draw d="M0 170 120 150 230 160 320 96 420 120 520 70 640 104 760 40 880 86 1000 26 1110 70 1200 50" />
          </svg>
          <ol>{t.profile.map(([title, body], index) => <li key={title}><span>KM {String(index * 25).padStart(2, '0')}</span><strong>{title}</strong><small>{body}</small></li>)}</ol>
        </div>
      </div>
      <figure className={s.peloton} data-csc-peloton>
        <div><Image src={`${media}/peloton.webp`} alt={t.pelotonAlt} fill sizes="100vw" quality={84} /></div>
        <figcaption className={s.wrap}>{t.peloton}</figcaption>
      </figure>
    </section>

    {/* ACT III — IDENTITY */}
    <section className={s.identity}>
      <div className={s.wrap}>
        <p className={s.kicker}>{t.act3}</p>
        <div className={s.identityHead}><h2>{t.identityTitle}</h2><p>{t.identityBody}</p></div>
        <div className={s.identityBoard}>
          <div className={s.swatches}>{t.palette.map(([name, hex]) => <div key={hex} className={s.swatch} style={{ ['--swatch' as string]: hex }}><span>{name}</span><code>{hex}</code></div>)}</div>
          <div className={s.type}>
            <p className={s.typeSpecimen} aria-hidden="true">Aa<i className={s.dot} /></p>
            <dl><div><dt>{t.typeTitle}</dt><dd className={s.typeDisplay}>Barlow Condensed</dd></div><div><dt>{t.typeBody}</dt><dd>Inter</dd></div></dl>
            <p className={s.small}>{t.typeNote}</p>
          </div>
          <figure className={s.logos}>
            <div className={s.logoNav}><Image src={`${identity}/logo-navigation-fond-sombre.webp`} alt={t.logoAlt} width={1150} height={280} sizes="(min-width: 1024px) 340px, 70vw" /></div>
            <Image className={s.logoJersey} src={`${identity}/logo-maillot-csc.webp`} alt="" width={1200} height={1200} sizes="180px" />
            <Image className={s.logoShield} src={`${identity}/embleme-csc.webp`} alt="" width={1200} height={1200} sizes="150px" />
            <figcaption>{t.logos}</figcaption>
          </figure>
          <figure className={s.magnifier} data-csc-magnifier>
            <div><Image src={`${media}/detail-title.webp`} alt={t.detailAlt} width={960} height={660} sizes="(min-width: 1024px) 520px, 92vw" quality={92} /></div>
            <figcaption><span>{t.detailTitle}</span>{t.detailScale}</figcaption>
          </figure>
        </div>
        <ol className={s.principles}>{t.principles.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
      </div>
    </section>

    {/* Transition B — SPEED */}
    <section className={s.speedScene} aria-labelledby="csc-speed">
      <div className={s.speedLayer} aria-hidden="true" data-csc-speed>{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</div>
      <div className={s.wrap}>
        <div className={s.speedGrid}>
          <div className={s.speedPhoto} data-csc-depth="slow"><Image src={`${media}/cyclocross.webp`} alt="" fill sizes="(min-width: 1024px) 30vw, 60vw" quality={80} /></div>
          <div className={s.speedCopy}><p className={s.kicker}>{t.speedKicker}</p><h2 id="csc-speed">{t.speedTitle}</h2></div>
        </div>
        <div className={s.reveal} data-csc-reveal><Screen id="home" t={t} sizes="(min-width: 1360px) 1280px, 94vw" /></div>
      </div>
    </section>

    {/* ACT IV — PUBLIC EXPERIENCE */}
    <section className={s.public}>
      <div className={s.wrap}>
        <div className={s.publicHead}><div><p className={s.kicker}>{t.act4}</p><h2>{t.publicTitle}</h2></div><p>{t.publicBody}</p></div>
        <div className={s.duo}>
          <Screen id="practices" t={t} className={s.duoA} sizes="(min-width: 1024px) 760px, 94vw" />
          <Screen id="club" t={t} className={s.duoB} sizes="(min-width: 1024px) 560px, 94vw" />
        </div>
      </div>
      <div className={s.bleed} data-csc-bleed><div className={s.wrap}><Screen id="offroad" t={t} sizes="(min-width: 1360px) 1280px, 94vw" /></div></div>
      <div className={s.wrap}>
        <div className={s.trio}>
          <Screen id="news" t={t} className={s.trioA} sizes="(min-width: 1024px) 640px, 94vw" />
          <Screen id="lineart" t={t} className={s.trioB} sizes="(min-width: 1024px) 400px, 94vw" />
          <Screen id="contact" t={t} className={s.trioC} sizes="(min-width: 1024px) 860px, 94vw" />
        </div>
        <p className={s.small}>{t.desktopNote}</p>
      </div>
    </section>

    {/* Transition C — FROM IMAGE TO SYSTEM */}
    <section className={s.gridScene} aria-labelledby="csc-grid">
      <div className={s.gridPlane} aria-hidden="true" data-csc-grid>
        <svg viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none">
          {Array.from({ length: 13 }, (_, i) => <path key={`v${i}`} d={`M${i * 100} 0V600`} />)}
          {Array.from({ length: 7 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 100}H1200`} />)}
          <path className={s.gridRoute} data-csc-draw d="M0 520C160 460 260 540 400 400S700 160 800 300 1000 260 1200 100" />
          {[[400, 400], [600, 200], [800, 300], [1000, 200]].map(([x, y]) => <rect key={`${x}-${y}`} x={x - 7} y={y - 7} width="14" height="14" />)}
        </svg>
      </div>
      <div className={s.wrap}><p className={s.kicker}>{t.gridKicker}</p><h2 id="csc-grid">{t.gridTitle}</h2><p>{t.gridBody}</p></div>
    </section>

    {/* ACT V — BUSINESS ENGINE */}
    <section className={s.engine}>
      <div className={s.wrap}>
        <div className={s.engineHead}><div><p className={s.kicker}>{t.act5}</p><h2>{t.engineTitle}</h2></div><p>{t.engineBody}</p></div>
        <ol className={s.layers}>{t.layers.map(([title, body], index) => <li key={title} data-csc-layer><span className={s.layerIndex}>L{index + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
        <CyclosportCockpit label={t.cockpitLabel} items={t.cockpit.map(item => ({ ...item, src: `${media}/admin-${item.id}.webp` }))} enlarge={t.enlarge} />
        <p className={s.anonymised}>{t.anonymised}</p>
        <div className={s.startList}>
          <div><h3>{t.startList}</h3><p className={s.small}>{t.startListNote}</p></div>
          <ol>{t.modules.map(([name, body], index) => <li key={name}><span className={s.dossard}>{String(index + 1).padStart(2, '0')}</span><strong>{name}</strong><small>{body}</small></li>)}</ol>
        </div>
      </div>
    </section>

    {/* ACT VI — TECHNOLOGY */}
    <section className={s.tech}>
      <div className={s.wrap}>
        <p className={s.kicker}>{t.act6}</p>
        <h2>{t.techTitle}</h2>
        <ol className={s.stack}>{t.stack.map(([name, body], index) => <li key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{body}</p></li>)}</ol>
        <ul className={s.pillars}>{t.pillars.map(([name, body]) => <li key={name}><strong>{name}</strong><span>{body}</span></li>)}</ul>
      </div>
    </section>

    {/* ACT VII — FINISH LINE (Transition D) */}
    <section className={s.finale}>
      <svg className={s.converge} viewBox="0 0 1440 700" preserveAspectRatio="none" fill="none" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => <path key={i} data-csc-converge d={`M-20 ${260 + i * 46}C${360 + i * 12} ${260 + i * 46} ${760 - i * 20} ${520 + (i - 4) * 10} 1180 520`} />)}
        <path className={s.finishLine} d="M1180 380V640" />
      </svg>
      <div className={s.checker} aria-hidden="true" />
      <div className={s.wrap}>
        <p className={s.kicker}>{t.act7}</p>
        <h2 className={s.finaleTitle}>{t.finale.map(line => <span key={line}>{line}</span>)}</h2>
        <p className={s.finaleBody}>{t.finaleBody}</p>
        <div className={s.actions}>
          <Link className={s.cta} href="/contact">{t.cta}<ArrowUpRight size={20} aria-hidden="true" /></Link>
          <a className={s.ghost} href={SITE} target="_blank" rel="noopener noreferrer">{t.visit}<span>cyclosportcrotellois.fr</span><ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
        <div className={s.finaleLinks}>
          <Link href="/realisations"><ArrowLeft size={16} aria-hidden="true" />{t.portfolio}</Link>
          <Link href="/realisations/blue-baie-conciergerie"><span>{t.next}</span>{t.nextName}<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  </article>;
}
