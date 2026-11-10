import Image from 'next/image';
import { ArrowDown, ArrowLeft, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { GitesEnBaieGallery, type GitesGalleryImage } from './gites-en-baie-gallery';

const root = '/media/projects/gite-en-baie';
const screenshots = {
  atmosphere: `${root}/optimized/hero-atmosphere.webp`,
  home: `${root}/optimized/home-desktop.webp`,
  stays: `${root}/optimized/accommodations.webp`,
  destinations: `${root}/optimized/destinations.webp`,
};

const content = {
  fr: {
    back: 'Toutes les réalisations', eyebrow: 'ÉTUDE DE CAS / HOSPITALITÉ & EXPÉRIENCE DIGITALE', location: 'BAIE DE SOMME · SAINT-VALERY-SUR-SOMME · MARQUENTERRE',
    titleA: 'La baie', titleB: 'en partage.', lead: 'Un site multi-hébergements qui relie les lieux, les séjours et les paysages de la Baie de Somme.', visit: 'Visiter le site', scroll: 'Entrer dans le projet', note: 'UNE DESTINATION · PLUSIEURS ADRESSES',
    introKicker: '01 / UN TERRITOIRE, PLUSIEURS SÉJOURS', introTitle: 'Chaque adresse ouvre une autre fenêtre sur la baie.', introText: 'Gîtes en Baie rassemble plusieurs hébergements autour d’un même territoire. Le site accompagne les visiteurs de la première image jusqu’aux détails utiles pour choisir un lieu de séjour.', introAside: 'L’expérience commence par une ligne d’horizon. Elle se prolonge par la découverte des adresses et de ce qui les entoure.',
    siteKicker: '02 / LA DÉCOUVERTE EN LIGNE', siteTitle: 'D’abord ressentir. Puis trouver sa place.', siteText: 'La page d’accueil installe le décor, les pages de logements donnent à chaque adresse sa visibilité et les contenus de découverte élargissent le regard au territoire.', galleryTitle: 'Un parcours, de la baie aux hébergements.', open: 'Agrandir la capture', close: 'Fermer la capture agrandie',
    gallery: [
      { src: screenshots.home, label: 'La baie en ouverture', alt: 'Capture authentique de la page d’accueil Gîtes en Baie, avec vue aérienne de Saint-Valery-sur-Somme et une présentation des séjours.' },
      { src: screenshots.stays, label: 'Les hébergements', alt: 'Capture authentique de la page qui présente plusieurs hébergements Gîtes en Baie.' },
      { src: screenshots.destinations, label: 'Explorer le territoire', alt: 'Capture authentique d’une page de découverte des destinations de la Baie de Somme.' },
    ] satisfies readonly GitesGalleryImage[],
    craftKicker: '03 / LA COMPOSITION ÉDITORIALE', craftTitle: 'Un site pensé comme une promenade.', craftText: 'La hiérarchie alterne les grands repères visuels et les informations de séjour. Le paysage attire le regard, tandis que la navigation guide vers les hébergements, leurs caractéristiques et les étapes suivantes.',
    pillars: [
      { number: '01', title: 'Donner le ton', body: 'Une entrée panoramique fait de la baie le fil visuel qui rassemble les différentes adresses.' },
      { number: '02', title: 'Distinguer les lieux', body: 'Le catalogue permet de parcourir les hébergements et de comparer leurs situations et leurs ambiances.' },
      { number: '03', title: 'Prolonger la découverte', body: 'Les contenus consacrés aux environs donnent des repères pour imaginer son séjour au-delà du logement.' },
    ],
    closingKicker: 'NOVA BAIE / DIRECTION ARTISTIQUE · CONCEPTION · DÉVELOPPEMENT', closingTitle: 'Votre lieu a une histoire à faire découvrir.', closingText: 'Nous créons des sites sur mesure qui donnent une place juste à votre activité, à vos images et à l’expérience que vous proposez.', contact: 'Parlons de votre projet', portfolio: 'Revenir aux réalisations',
  },
  en: {
    back: 'All projects', eyebrow: 'CASE STUDY / HOSPITALITY & DIGITAL EXPERIENCE', location: 'BAY OF SOMME · SAINT-VALERY-SUR-SOMME · MARQUENTERRE',
    titleA: 'The bay,', titleB: 'shared.', lead: 'A multi-property website connecting places to stay with the landscapes of the Bay of Somme.', visit: 'Visit the website', scroll: 'Explore the project', note: 'ONE DESTINATION · MANY STAYS',
    introKicker: '01 / ONE LANDSCAPE, MANY STAYS', introTitle: 'Each address opens another window onto the bay.', introText: 'Gîtes en Baie brings several stays together around one landscape. The website guides visitors from the first image to the practical details that help them choose where to stay.', introAside: 'The experience begins at the horizon. It continues through the places and the landscape around them.',
    siteKicker: '02 / DISCOVERING ONLINE', siteTitle: 'Feel the place. Then find your way in.', siteText: 'The homepage sets the scene, property pages give each address its own space, and destination content widens the view to the surrounding area.', galleryTitle: 'A journey from the bay to the stays.', open: 'Enlarge capture', close: 'Close enlarged capture',
    gallery: [
      { src: screenshots.home, label: 'The bay, first', alt: 'Authentic Gîtes en Baie homepage capture, with an aerial view of Saint-Valery-sur-Somme and an introduction to the stays.' },
      { src: screenshots.stays, label: 'The places to stay', alt: 'Authentic capture of the page presenting several Gîtes en Baie accommodations.' },
      { src: screenshots.destinations, label: 'Explore the landscape', alt: 'Authentic capture of a destination discovery page for the Bay of Somme.' },
    ] satisfies readonly GitesGalleryImage[],
    craftKicker: '03 / EDITORIAL COMPOSITION', craftTitle: 'A website shaped like a walk.', craftText: 'The hierarchy alternates strong visual landmarks with useful stay information. The landscape draws visitors in, while navigation leads to the properties, their features and the next steps.',
    pillars: [
      { number: '01', title: 'Set the mood', body: 'A panoramic opening makes the bay the visual thread connecting the different addresses.' },
      { number: '02', title: 'Give each stay its place', body: 'The property collection makes it possible to browse stays and compare their settings and atmosphere.' },
      { number: '03', title: 'Keep exploring', body: 'Local discovery content offers context for imagining a stay beyond the accommodation itself.' },
    ],
    closingKicker: 'NOVA BAIE / ART DIRECTION · DESIGN · DEVELOPMENT', closingTitle: 'Your place has a story worth discovering.', closingText: 'We create bespoke websites that give your business, imagery and visitor experience the space they deserve.', contact: 'Let’s talk about your project', portfolio: 'Back to projects',
  },
} as const;

export function GitesEnBaieCase({ locale }: { locale: string }) {
  const lang = locale === 'en' ? 'en' : 'fr';
  const text = content[lang];

  return <article className="geb-case" data-case-style="editorial" data-case-hero>
    <header className="geb-hero surface-dark" data-creative-scene>
      <div className="geb-hero-image" data-geb-depth><Image src={screenshots.atmosphere} alt="" fill priority sizes="100vw" quality={86} /></div>
      <div className="geb-hero-veil" aria-hidden="true" />
      <svg className="geb-hero-current" viewBox="0 0 1440 520" preserveAspectRatio="none" fill="none" aria-hidden="true"><path data-draw d="M-40 352C151 203 249 403 421 314S682 197 834 284 1112 389 1480 178"/><path data-draw d="M-40 377C151 228 249 428 421 339S682 222 834 309 1112 414 1480 203"/></svg>
      <Container>
        <Link href="/realisations" className="geb-back"><ArrowLeft aria-hidden="true" />{text.back}</Link>
        <div className="geb-hero-copy" data-reveal>
          <p className="geb-kicker">{text.eyebrow}</p>
          <p className="geb-location">{text.location}</p>
          <h1>{text.titleA}<br /><em>{text.titleB}</em></h1>
          <p className="geb-hero-lead">{text.lead}</p>
          <div className="geb-hero-actions"><a href="https://www.gite-baie.com/" target="_blank" rel="noopener noreferrer" className="geb-visit">{text.visit}<ArrowUpRight aria-hidden="true" /></a><a href="#geb-intro" className="geb-scroll">{text.scroll}<ArrowDown aria-hidden="true" /></a></div>
        </div>
        <div className="geb-hero-index"><span>GÎTES EN BAIE</span><span>{text.note}</span><span>01 — 03</span></div>
      </Container>
      <span className="geb-orbit geb-orbit--one" aria-hidden="true" /><span className="geb-orbit geb-orbit--two" aria-hidden="true" />
    </header>

    <div className="geb-seam geb-seam--to-paper" aria-hidden="true"><svg viewBox="0 0 1440 140" preserveAspectRatio="none" fill="none"><path data-draw d="M-25 53C153 123 264 11 438 69S738 137 887 70 1180 15 1465 88"/><path data-draw d="M-25 75C153 145 264 33 438 91S738 159 887 92 1180 37 1465 110"/></svg></div>

    <section className="geb-intro" id="geb-intro" data-creative-scene><Container>
      <div className="geb-intro-grid"><div className="geb-intro-heading"><p className="geb-kicker">{text.introKicker}</p><h2>{text.introTitle}</h2><span aria-hidden="true" className="geb-handnote">la baie, en filigrane</span></div>
        <div className="geb-intro-copy"><p>{text.introText}</p><blockquote>{text.introAside}</blockquote><div className="geb-coordinates"><span>GÎTES EN BAIE</span><i /><span>HOSPITALITÉ · TERRITOIRE · DÉCOUVERTE</span></div></div></div>
      <div className="geb-intro-figure" data-geb-depth><Image src={screenshots.stays} alt={lang === 'en' ? 'Accommodation collection presented on the Gîtes en Baie website' : 'Collection d’hébergements présentée sur le site Gîtes en Baie'} fill sizes="(min-width: 1000px) 86vw, 100vw" quality={90} /><span className="geb-figure-label">{lang === 'en' ? 'THE COLLECTION / BAY OF SOMME' : 'LA COLLECTION / BAIE DE SOMME'}</span></div>
    </Container></section>

    <div className="geb-seam geb-seam--to-night" aria-hidden="true"><svg viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none"><path data-draw d="M-20 98C182 42 261 112 433 66S720 16 895 72 1190 120 1460 44"/><path data-draw d="M-20 114C182 58 261 128 433 82S720 32 895 88 1190 136 1460 60"/></svg></div>

    <section className="geb-discovery" data-creative-scene><Container>
      <div className="geb-discovery-head"><div><p className="geb-kicker">{text.siteKicker}</p><h2>{text.siteTitle}</h2></div><p>{text.siteText}</p></div>
      <div className="geb-gallery-layout"><div className="geb-gallery-side-note"><span>02</span><p>{lang === 'en' ? 'Browse places. Find a point of view.' : 'Parcourir les lieux. Trouver son horizon.'}</p><svg viewBox="0 0 180 110" fill="none" aria-hidden="true"><path data-draw d="M3 91C40 11 61 109 91 54S141 12 177 37"/></svg></div><div className="geb-gallery-main"><h3>{text.galleryTitle}</h3><GitesEnBaieGallery items={text.gallery} title={text.galleryTitle} openLabel={text.open} closeLabel={text.close} /></div></div>
    </Container></section>

    <section className="geb-craft" data-creative-scene><div className="geb-craft-graphic" aria-hidden="true"><svg viewBox="0 0 700 720" fill="none"><circle cx="350" cy="360" r="248"/><circle cx="350" cy="360" r="194"/><circle cx="350" cy="360" r="139"/><path data-draw d="M28 494C177 381 179 257 330 301S523 486 677 145"/><path data-draw d="M0 542C150 429 202 333 354 377S548 514 700 211"/></svg><span>80° 08′ N<br />BAIE DE SOMME</span></div><Container>
      <div className="geb-craft-heading"><p className="geb-kicker">{text.craftKicker}</p><h2>{text.craftTitle}</h2><p>{text.craftText}</p></div>
      <div className="geb-pillars">{text.pillars.map((item, index) => <article className="geb-pillar" key={item.number} data-reveal><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.body}</p></div><MoveUpRight aria-hidden="true" className="geb-pillar-arrow" /><i aria-hidden="true" className={`geb-pillar-orbit geb-pillar-orbit--${index + 1}`} /></article>)}</div>
      <div className="geb-destination-frame"><Image src={screenshots.destinations} alt={lang === 'en' ? 'Destination discovery content on the Gîtes en Baie website' : 'Contenus de découverte des destinations sur le site Gîtes en Baie'} fill sizes="(min-width: 1000px) 75vw, 96vw" quality={90} /><span>{lang === 'en' ? 'THE BAY AS A PLACE TO EXPLORE' : 'LA BAIE COMME TERRITOIRE À EXPLORER'}</span></div>
    </Container></section>

    <div className="geb-seam geb-seam--to-final" aria-hidden="true"><svg viewBox="0 0 1440 150" preserveAspectRatio="none" fill="none"><path data-draw d="M-30 74C180 12 262 122 460 81S740 11 920 70 1216 125 1470 49"/><path data-draw d="M-30 94C180 32 262 142 460 101S740 31 920 90 1216 145 1470 69"/></svg></div>

    <section className="geb-finale" data-creative-scene><div className="geb-finale-landscape" aria-hidden="true"><Image src={screenshots.atmosphere} alt="" fill sizes="100vw" quality={84} /></div><div className="geb-finale-light" aria-hidden="true" /><svg className="geb-finale-lines" viewBox="0 0 1440 440" preserveAspectRatio="none" fill="none" aria-hidden="true"><path data-draw d="M-30 292C180 100 322 355 511 229S867 104 1042 233 1282 301 1470 130"/><path data-draw d="M-30 320C180 128 322 383 511 257S867 132 1042 261 1282 329 1470 158"/></svg><Container><div className="geb-finale-copy" data-reveal><p className="geb-kicker">{text.closingKicker}</p><h2>{text.closingTitle}</h2><p>{text.closingText}</p><Button href="/contact">{text.contact}<ArrowUpRight aria-hidden="true" /></Button><div className="geb-finale-links"><Link href="/realisations">{text.portfolio}<ArrowLeft aria-hidden="true" /></Link><a href="https://www.gite-baie.com/" target="_blank" rel="noopener noreferrer">{text.visit}<ArrowUpRight aria-hidden="true" /></a></div></div></Container></section>
  </article>;
}
