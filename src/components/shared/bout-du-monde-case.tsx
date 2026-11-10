import Image from 'next/image';
import { ArrowDown, ArrowLeft, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { boutDuMondeCaseContent, type BoutDuMondeLocale } from '@/lib/bout-du-monde-case-content';
import { BoutDuMondeGallery } from './bout-du-monde-gallery';

const root = '/media/projects/le-bout-du-monde';

export function BoutDuMondeCase({ locale }: { locale: string }) {
  const lang: BoutDuMondeLocale = locale === 'en' ? 'en' : 'fr';
  const text = boutDuMondeCaseContent[lang];

  return <article className="bdm-case" data-case-style="editorial" data-case-hero>
    <header className="bdm-hero surface-dark" data-creative-scene>
      <Image className="bdm-hero-landscape" src={`${root}/ia/hero-poster.jpg`} alt="Gîte en bois au milieu d’une végétation dense, visuel d’ambiance du projet" fill priority quality={88} sizes="100vw" />
      <div className="bdm-hero-shade" aria-hidden="true" />
      <Container>
        <Link href="/realisations" className="bdm-back"><ArrowLeft aria-hidden="true"/>{text.back}</Link>
        <div className="bdm-hero-composition">
          <div className="bdm-hero-copy" data-reveal>
            <p className="bdm-kicker">{text.project}</p>
            <h1 className="bdm-wordmark">Le Bout<br/><em>du Monde</em></h1>
            <p className="bdm-location">SAINT-QUENTIN-EN-TOURMONT <i/> BAIE DE SOMME</p>
            <p className="bdm-hero-intro">{text.heroIntro}</p>
            <div className="bdm-hero-actions">
              <a className="bdm-visit" href="https://www.le-bout-du-monde.org/" target="_blank" rel="noopener noreferrer">{text.website}<ArrowUpRight aria-hidden="true"/></a>
              <a className="bdm-explore" href="#bdm-context">{text.explore}<ArrowDown aria-hidden="true"/></a>
            </div>
          </div>
          <div className="bdm-hero-stack" data-c2-art>
            <figure className="bdm-hero-screen bdm-hero-screen--back"><Image src={`${root}/preview-le-bout-du-monde.jpg`} alt="Capture du site : présentation des deux gîtes" fill sizes="(min-width: 1000px) 42vw, 82vw" quality={86}/><figcaption>01 / {text.heroNote}</figcaption></figure>
            <figure className="bdm-hero-screen bdm-hero-screen--front"><Image src={`${root}/realisation-le-bout-du-monde.jpg`} alt="Capture authentique de la page d’accueil du site" fill sizes="(min-width: 1000px) 48vw, 90vw" quality={90}/><figcaption>LE BOUT DU MONDE · SITE PUBLIC</figcaption></figure>
            <span className="bdm-orbit-note" aria-hidden="true">46°20′ N<br/>01°33′ E</span>
            <svg className="bdm-hero-line" viewBox="0 0 800 530" fill="none" aria-hidden="true"><path data-draw d="M8 390C141 235 219 465 361 277S590 106 792 163"/><path data-draw d="M8 423C141 268 219 498 361 310S590 139 792 196"/></svg>
          </div>
        </div>
        <div className="bdm-hero-foot"><span>{text.heroNote}</span><span>01 — 06</span></div>
      </Container>
    </header>

    <div className="bdm-seam bdm-seam--forest" aria-hidden="true"><svg viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none"><path data-draw d="M-20 90C164 90 230 28 374 84S620 144 743 80 966 28 1090 88 1320 136 1460 55"/><path data-draw d="M-20 108C164 108 230 46 374 102S620 162 743 98 966 46 1090 106 1320 154 1460 73"/></svg></div>

    <section id="bdm-context" className="bdm-context section-padding" data-creative-scene>
      <Container><div className="bdm-context-grid">
        <div className="bdm-context-heading"><p className="bdm-kicker">{text.introKicker}</p><h2>{text.introTitle}</h2><span className="bdm-handwritten" aria-hidden="true">prendre le temps</span></div>
        <div className="bdm-context-copy"><p>{text.introText}</p><blockquote>{text.introAside}</blockquote><div className="bdm-context-coord"><span>LE BOUT DU MONDE</span><span>HABITER · RESPIRER · DÉCOUVRIR</span></div></div>
      </div></Container>
      <div className="bdm-context-ribbon" aria-hidden="true"><span>WOOD / LIGHT / LANDSCAPE / WOOD / LIGHT / LANDSCAPE /</span></div>
    </section>

    <section className="bdm-identity section-padding" data-creative-scene>
      <Container><div className="bdm-identity-head"><p className="bdm-kicker">{text.identityKicker}</p><h2>{text.identityTitle}</h2><p>{text.identityText}</p></div>
        <div className="bdm-mosaic">
          <figure className="bdm-mosaic-photo bdm-mosaic-photo--large" data-bdm-parallax><Image src={`${root}/ia/gite%201/gite1-exterieur2.jpg`} alt="Façade en bois du premier gîte, intégrée à son écrin végétal" fill sizes="(min-width: 1000px) 53vw, 100vw" quality={88}/><figcaption><span>01</span>{text.identityLabels[0]}</figcaption></figure>
          <div className="bdm-mosaic-note"><span className="bdm-scribble" aria-hidden="true">✳</span><p>{text.identityLabels[1]}</p><small>LE BOUT DU MONDE / 2026</small></div>
          <figure className="bdm-mosaic-photo bdm-mosaic-photo--small" data-bdm-parallax><Image src={`${root}/ia/gite%202/gite2-chambre.jpg`} alt="Chambre lumineuse aux matières naturelles dans le second gîte" fill sizes="(min-width: 1000px) 32vw, 80vw" quality={86}/><figcaption><span>02</span>{text.identityLabels[2]}</figcaption></figure>
          <div className="bdm-mosaic-coordinate" aria-hidden="true"><span>UN LIEU À PART</span><svg viewBox="0 0 150 90" fill="none"><path d="M4 70C32 3 56 84 82 39S125 9 147 26"/></svg></div>
        </div>
      </Container>
    </section>

    <div className="bdm-seam bdm-seam--paper" aria-hidden="true"><svg viewBox="0 0 1440 130" preserveAspectRatio="none" fill="none"><path data-draw d="M-20 30C190 30 280 108 470 82S746 12 914 57 1204 105 1460 24"/><path data-draw d="M-20 48C190 48 280 126 470 100S746 30 914 75 1204 123 1460 42"/></svg></div>

    <section className="bdm-public section-padding" data-creative-scene>
      <Container><div className="bdm-public-heading"><div><p className="bdm-kicker">{text.galleryKicker}</p><h2>{text.galleryTitle}</h2></div><p>{text.galleryText}</p></div>
        <BoutDuMondeGallery items={text.screens} title={text.galleryTitle} openLabel={lang === 'en' ? 'Enlarge view' : 'Agrandir la vue'} closeLabel={lang === 'en' ? 'Close enlarged image' : 'Fermer l’image agrandie'}/>
      </Container>
    </section>

    <section className="bdm-stays section-padding" data-creative-scene>
      <Container><div className="bdm-stays-heading"><div><p className="bdm-kicker">{text.cottagesKicker}</p><h2>{text.cottagesTitle}</h2></div><p>{text.cottagesText}</p></div>
        <div className="bdm-stay-collage">{text.cottages.map((stay, index) => <figure className={`bdm-stay bdm-stay--${index + 1}`} key={stay.src} data-bdm-parallax>
          <Image src={stay.src} alt={stay.alt} fill sizes={index === 0 ? '(min-width: 1100px) 56vw, 100vw' : '(min-width: 1100px) 35vw, 82vw'} quality={88}/>
          <figcaption><span>{stay.note}</span><strong>{stay.label}</strong><i>0{index + 1}</i></figcaption>
        </figure>)}</div>
      </Container>
      <svg className="bdm-stays-drawing" viewBox="0 0 1440 260" preserveAspectRatio="none" fill="none" aria-hidden="true"><path data-draw d="M-50 211C175 21 280 264 494 151S838 47 1000 149 1260 230 1490 49"/><path data-draw d="M-50 232C175 42 280 285 494 172S838 68 1000 170 1260 251 1490 70"/></svg>
    </section>

    <section className="bdm-responsive section-padding" data-creative-scene>
      <Container><div className="bdm-responsive-layout">
        <div className="bdm-responsive-copy"><p className="bdm-kicker">{text.mobileKicker}</p><h2>{text.mobileTitle}</h2><p>{text.mobileText}</p><div className="bdm-breakpoints" aria-hidden="true"><span>WIDE</span><i/><span>COMPACT</span><i/><span>POCKET</span></div></div>
        <figure className="bdm-responsive-photo" data-bdm-parallax><Image src={`${root}/ia/gite%202/gite2-sdb.jpg`} alt={lang === 'en' ? 'Bathroom materials and natural light in cottage 2' : 'Matières et lumière naturelle dans la salle de bain du gîte 2'} fill sizes="(min-width: 900px) 46vw, 100vw" quality={86}/><figcaption>{lang === 'en' ? 'DETAIL / NATURAL MATERIALS' : 'DÉTAIL / MATIÈRES NATURELLES'}</figcaption><span className="bdm-responsive-stamp">LISIBLE<br/>À TOUTE<br/>ÉCHELLE</span></figure>
      </div></Container>
    </section>

    <section className="bdm-details section-padding" data-creative-scene>
      <Container><div className="bdm-details-top"><div><p className="bdm-kicker">{text.detailKicker}</p><h2>{text.detailTitle}</h2></div><p>{text.detailText}</p></div>
        <div className="bdm-detail-board"><figure className="bdm-detail-screen"><Image src={`${root}/preview-le-bout-du-monde.jpg`} alt={lang === 'en' ? 'Website capture showing the two cottage presentation cards' : 'Capture du site montrant les deux cartes de présentation des gîtes'} fill sizes="(min-width: 900px) 68vw, 94vw" quality={90}/><figcaption>LE BOUT DU MONDE / PAGE DE PRÉSENTATION</figcaption></figure>
          <ol>{text.details.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p><MoveUpRight aria-hidden="true"/></li>)}</ol>
          <span className="bdm-detail-seal" aria-hidden="true">UN SITE<br/>À HABITER</span>
        </div>
      </Container>
    </section>

    <div className="bdm-seam bdm-seam--ending" aria-hidden="true"><svg viewBox="0 0 1440 150" preserveAspectRatio="none" fill="none"><path data-draw d="M-20 95C187 95 275 23 454 85S720 151 875 91 1124 33 1460 96"/><path data-draw d="M-20 115C187 115 275 43 454 105S720 171 875 111 1124 53 1460 116"/></svg></div>

    <section className="bdm-finale" data-creative-scene><div className="bdm-finale-glow" aria-hidden="true"/><div className="bdm-finale-image" aria-hidden="true"><Image src={`${root}/ia/paysage/baie4.jpg`} alt="" fill sizes="100vw" quality={82}/></div><svg className="bdm-finale-lines" viewBox="0 0 1440 380" preserveAspectRatio="none" fill="none" aria-hidden="true"><path data-draw d="M-40 253C181 34 327 334 562 177S1018 34 1480 166"/><path data-draw d="M-40 286C181 67 327 367 562 210S1018 67 1480 199"/></svg>
      <Container><div className="bdm-finale-content" data-reveal><p className="bdm-kicker">{text.finalKicker}</p><h2>{text.finalTitle}</h2><p>{text.finalText}</p><Button href="/contact">{text.contact}<ArrowUpRight aria-hidden="true"/></Button><div className="bdm-finale-links"><Link href="/realisations">{text.portfolio}<ArrowLeft aria-hidden="true"/></Link><a href="https://www.le-bout-du-monde.org/" target="_blank" rel="noopener noreferrer">{text.website}<ArrowUpRight aria-hidden="true"/></a></div></div></Container>
    </section>
  </article>;
}
