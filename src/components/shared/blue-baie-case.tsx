import Image from 'next/image';
import { ArrowDownRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { blueBaieCaseContent } from '@/lib/blue-baie-case-content';
import { getPublishedCaseMedia, type ProjectCaseMedia, type ProjectMediaLocale } from '@/lib/project-case-media';
import { BlueBaieGallery } from './blue-baie-gallery';
import { BlueBaieAdminDemo } from './blue-baie-admin-demo';

const root = '/media/projects/blue-baie';

export function BlueBaieCase({ locale, media }: { locale: string; media: readonly ProjectCaseMedia[] }) {
  const lang: ProjectMediaLocale = locale === 'en' ? 'en' : 'fr';
  const en = lang === 'en';
  const text = blueBaieCaseContent[lang];
  const galleryItems = getPublishedCaseMedia(media, 'public-gallery').map(item => ({ src: item.src, alt: item.alt[lang], label: item.title[lang], description: item.description[lang], kind: 'screen' as const }));
  const photos = getPublishedCaseMedia(media, 'hospitality-gallery').map(item => ({ id: item.id, src: item.src, alt: item.alt[lang], title: item.title[lang], description: item.description[lang] }));
  const platformRows = [
    { title: text.planningTitle, body: text.planningBody, evidence: text.evidenceLabel },
    { title: text.coordinationTitle, body: text.coordinationBody, evidence: text.evidenceLabel },
    { title: text.administrationTitle, body: text.administrationBody, evidence: text.evidenceLabel },
    { title: text.automationTitle, body: text.automationBody, evidence: text.scopeLabel },
  ];

  return <article className="bb-case" data-case-style="ecosystem" data-case-hero>
    <header className="bb-hero surface-dark">
      <Container>
        <Link href="/realisations" className="case-back"><ArrowLeft aria-hidden="true" />{text.back}</Link>
        <div className="bb-hero-layout">
          <div className="bb-hero-copy" data-reveal>
            <p className="bb-eyebrow">{text.case}</p>
            <Image className="bb-logo" src={`${root}/images/logo/logo-bluebaie.png`} alt="Blue Baie Conciergerie" width={96} height={96} priority />
            <p className="bb-location">{text.location}</p><h1>Blue Baie<br/><em>Conciergerie</em></h1>
            <p className="bb-lead">{text.lead}</p>
            <a className="bb-visit" href="https://www.bluebaie.fr/" target="_blank" rel="noopener noreferrer">{text.visit}<ArrowUpRight aria-hidden="true" /></a>
          </div>
          <div className="bb-hero-art" data-c2-art>
            <div className="bb-hero-coast"><Image src={`${root}/images/baie-saint-valery-hero.jpg`} alt="Vue de la Baie de Somme près de Saint-Valery" fill sizes="(min-width: 1024px) 52vw, 100vw" priority quality={88}/></div>
            <div className="bb-hero-screen"><Image src={`${root}/screens/home-desktop.png`} alt="Capture du site public Blue Baie sur ordinateur" fill sizes="(min-width: 1024px) 45vw, 90vw" priority fetchPriority="high" quality={90}/></div>
            <div className="bb-hero-phone"><Image src={`${root}/screens/derived/home-mobile-clean.webp`} alt="Capture mobile du site Blue Baie, sans interface système" fill sizes="(min-width: 1024px) 12vw, 28vw" quality={90}/></div>
            <svg viewBox="0 0 800 500" fill="none" aria-hidden="true"><path data-draw d="M4 370C160 190 260 450 408 246S625 104 798 148"/><path data-draw d="M18 407C177 227 276 487 425 283S641 141 800 185"/></svg>
            <span className="bb-coordinate">50°11′ N · 1°38′ E</span>
          </div>
        </div>
      </Container>
    </header>

    <section className="bb-origin section-padding" data-bb-scene="coast"><Container><div className="bb-origin-layout"><div className="bb-origin-image" data-bb-depth="coast"><Image src={`${root}/images/h1.jpg`} alt="Vue du littoral et d’un village de la Baie de Somme" fill sizes="(min-width: 900px) 54vw, 100vw" quality={88}/><span>BAIE DE SOMME / HAUTS-DE-FRANCE</span></div><div><p className="bb-eyebrow">01 / {en ? 'THE COMPANY' : 'L’ENTREPRISE'}</p><h2>{text.company}</h2><p>{text.companyText}</p><a href="https://www.bluebaie.fr/a-propos" target="_blank" rel="noopener noreferrer">{en ? 'About Blue Baie' : 'En savoir plus sur Blue Baie'}<ArrowUpRight aria-hidden="true"/></a></div></div></Container></section>

    <div className="bb-current-seam bb-current-seam--tide" aria-hidden="true" data-bb-seam="tide"><svg viewBox="0 0 1440 180" preserveAspectRatio="none" fill="none"><path d="M-20 95C185 30 300 156 508 91S820 28 1020 96 1280 138 1460 54"/><path d="M-20 113C185 48 300 174 508 109S820 46 1020 114 1280 156 1460 72"/><path d="M-20 132C185 67 300 193 508 128S820 65 1020 133 1280 175 1460 91"/></svg></div>

  <section className="bb-public section-padding" data-bb-scene="public"><Container><div className="bb-section-heading"><div><p className="bb-eyebrow">02 / {en ? 'PUBLIC WEBSITE' : 'SITE PUBLIC'}</p><h2>{text.public}</h2></div><p>{text.publicText}</p></div><p className="bb-gallery-note">{text.galleryNote}</p><BlueBaieGallery items={galleryItems} label={text.gallery} closeLabel={text.close}/></Container></section>

    <section className="bb-journeys section-padding" data-bb-scene="journeys"><Container><p className="bb-eyebrow">03 / {en ? 'VISITOR JOURNEYS' : 'PARCOURS PUBLICS'}</p><div className="bb-journey-heading"><h2>{text.journeys}</h2><p>{text.journeysText}</p></div><div className="bb-journey-rail"><a href="https://www.bluebaie.fr/confier-mon-logement" target="_blank" rel="noopener noreferrer"><span>01</span><strong>{text.owner}</strong><ArrowUpRight aria-hidden="true"/></a><a href="https://www.bluebaie.fr/nos-logements" target="_blank" rel="noopener noreferrer"><span>02</span><strong>{text.catalogue}</strong><ArrowUpRight aria-hidden="true"/></a><a href="https://www.bluebaie.fr/contact" target="_blank" rel="noopener noreferrer"><span>03</span><strong>{text.contact}</strong><ArrowUpRight aria-hidden="true"/></a></div></Container></section>

    <div className="bb-current-seam bb-current-seam--platform" aria-hidden="true" data-bb-seam="platform"><svg viewBox="0 0 1440 180" preserveAspectRatio="none" fill="none"><path d="M-20 90C170 90 245 24 420 90S676 155 800 90 1020 24 1120 90H1460"/><path d="M-20 110C170 110 245 44 420 110S676 175 800 110 1020 44 1120 110H1460"/></svg></div>

    <section className="bb-platform section-padding" data-bb-scene="platform"><Container>
      <div className="bb-platform-heading"><div><p className="bb-eyebrow">{text.platformEyebrow}</p><h2>{text.platformTitle}</h2></div><p>{text.platformIntro}</p></div>
      <div className="bb-platform-rows">{platformRows.map((row, index) => <article className="bb-platform-row" key={row.title}>
        <span className="bb-platform-index">{String(index + 1).padStart(2, '0')}</span>
        <div className="bb-platform-title"><p className="bb-platform-evidence">{row.evidence}</p><h3>{row.title}</h3></div>
        <p className="bb-platform-description">{row.body}</p>
        <svg className="bb-platform-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true"><circle cx="32" cy="32" r="22"/><path d={index === 0 ? 'M18 34h28M32 18v28' : index === 1 ? 'M18 32h28M32 18l14 14-14 14' : index === 2 ? 'M20 20h24v24H20zM25 27h14M25 33h14M25 39h8' : 'M15 42c12-24 22-24 34-20M39 16l10 6-8 8'} /></svg>
      </article>)}</div>
      <p className="bb-platform-privacy">{text.privateMediaNote}</p>
    </Container></section>

    <div className="bb-current-seam bb-current-seam--portal" aria-hidden="true" data-bb-seam="portal"><svg viewBox="0 0 1440 180" preserveAspectRatio="none" fill="none"><path d="M-20 115C170 115 220 115 330 115S450 48 570 48 710 48 800 115 920 160 1010 115 1120 70 1210 70H1460"/><path d="M-20 133C170 133 220 133 330 133S450 66 570 66 710 66 800 133 920 178 1010 133 1120 88 1210 88H1460"/></svg></div>
    <BlueBaieAdminDemo locale={locale}/>

    <section className="bb-ecosystem section-padding surface-dark" data-bb-scene="network"><Container><div className="bb-section-heading"><div><p className="bb-eyebrow">05 / {en ? 'DIGITAL ECOSYSTEM' : 'ÉCOSYSTÈME DIGITAL'}</p><h2>{text.system}</h2></div><p>{text.systemText}</p></div><div className="bb-system-map"><svg viewBox="0 0 1000 450" preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true"><path className="bb-flow-confirmed" data-bb-draw d="M180 220C330 220 335 112 500 112S670 220 820 220"/><path className="bb-flow-concept" data-bb-draw d="M180 250C330 250 335 340 500 340S670 250 820 250"/><circle cx="180" cy="235" r="8"/><circle cx="500" cy="112" r="6"/><circle cx="500" cy="340" r="6"/><circle cx="820" cy="235" r="8"/></svg><div className="bb-system-node bb-node-site"><span>01 / {text.confirmed}</span><strong>{text.site}</strong><small>bluebaie.fr</small></div><div className="bb-system-node bb-node-journey"><span>02</span><strong>{text.stays}</strong></div><div className="bb-system-node bb-node-ops"><span>03 / {text.concept}</span><strong>{text.operations}</strong></div><div className="bb-system-node bb-node-admin"><span>04 / {text.confirmed}</span><strong>{text.admin}</strong><small>{en ? 'Public project documentation' : 'Documentation publique du projet'}</small></div></div><div className="bb-map-legend"><span><i/> {text.confirmed}</span><span><i/> {text.concept}</span></div></Container></section>

    <section className="bb-imagery section-padding"><Container><div className="bb-section-heading"><div><p className="bb-eyebrow">06 / {en ? 'PLACE & HOSPITALITY' : 'TERRITOIRE & HOSPITALITÉ'}</p><h2>{text.imagery}</h2></div><p>{text.imageryText}</p></div><div className="bb-photo-grid">{photos.map((photo, index) => <figure className={`bb-photo bb-photo--${index}`} key={photo.id}><Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 42vw, (min-width: 600px) 60vw, 100vw" quality={86}/><figcaption><span>{photo.title}</span><small>{photo.description}</small></figcaption></figure>)}</div></Container></section>

    <section className="bb-sibling section-padding"><Container><div className="bb-sibling-image"><Image src="/media/projects/conciergerie-saint-jean/screens/home-desktop.jpg" alt={en ? 'Public homepage of Conciergerie Saint-Jean on the Opal Coast' : 'Page d’accueil publique de Conciergerie Saint-Jean, sur la Côte d’Opale'} fill sizes="(min-width: 900px) 42vw, 100vw" quality={86}/></div><div><p className="bb-eyebrow">07 / {en ? 'A WIDER ECOSYSTEM' : 'UN ÉCOSYSTÈME PLUS LARGE'}</p><h2>{text.ecosystem}</h2><p>{text.ecosystemText}</p><Link href="/realisations/conciergerie-saint-jean">{text.discoverSaint}<ArrowUpRight aria-hidden="true"/></Link></div></Container></section>

    <div className="bb-current-seam bb-current-seam--horizon" aria-hidden="true" data-bb-seam="horizon"><svg viewBox="0 0 1440 180" preserveAspectRatio="none" fill="none"><path d="M-20 100C180 100 235 100 360 100S560 100 690 100 880 100 1010 100 1230 100 1460 100"/><path d="M-20 119C180 119 235 119 360 119S560 119 690 119 880 119 1010 119 1230 119 1460 119"/></svg></div>
    <section className="bb-finale" data-bb-scene="finale"><div className="bb-finale-glow" aria-hidden="true"/><svg viewBox="0 0 1440 390" preserveAspectRatio="none" fill="none" aria-hidden="true"><path data-draw d="M-30 265C190 44 370 355 650 194S1070 38 1480 168"/><path data-draw d="M-30 305C190 84 370 395 650 234S1070 78 1480 208"/></svg><Container><div className="bb-finale-content" data-reveal><p className="bb-eyebrow">NOVA BAIE / {en ? 'DESIGN · DEVELOPMENT · SYSTEMS' : 'DESIGN · DÉVELOPPEMENT · SYSTÈMES'}</p><h2>{text.closing}</h2><p>{text.closingText}</p><Button href="/contact">{text.talk}<ArrowDownRight aria-hidden="true"/></Button><Link href="/realisations">{text.portfolio}<ArrowUpRight aria-hidden="true"/></Link></div></Container></section>
  </article>;
}
