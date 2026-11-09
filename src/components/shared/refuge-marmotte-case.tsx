import Image from 'next/image';
import { ArrowDown, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { RefugeMarmotteGallery } from './refuge-marmotte-gallery';
import { RefugeMarmotteMotion } from './refuge-marmotte-motion';
import s from './refuge-marmotte.module.css';

function Mountains({ dusk = false }: { dusk?: boolean }) {
  return <svg className={s.mountains} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" fill="none" aria-hidden="true">
    <defs><linearGradient id={dusk ? 'rm-dusk' : 'rm-sky'} x1="720" y1="0" x2="720" y2="900" gradientUnits="userSpaceOnUse"><stop stopColor={dusk ? '#172c38' : '#132d3b'} /><stop offset=".6" stopColor="#667d83"/><stop offset="1" stopColor="#cad1ca"/></linearGradient><radialGradient id={dusk ? 'rm-light-end' : 'rm-light'}><stop stopColor="#f4d8b0" stopOpacity=".65"/><stop offset="1" stopColor="#f4d8b0" stopOpacity="0"/></radialGradient></defs>
    <path fill={`url(#${dusk ? 'rm-dusk' : 'rm-sky'})`} d="M0 0h1440v900H0z"/>
    <ellipse cx="1070" cy="370" rx="530" ry="440" fill={`url(#${dusk ? 'rm-light-end' : 'rm-light'})`}/>
    <circle cx="1060" cy="300" r="48" fill="#f1d8b2" opacity=".8"/>
    <g data-rm-depth><path d="M-90 690 105 445 210 520 412 255 573 468 705 350 908 548 1100 390 1510 680V950H-90Z" fill="#8d9b9b"/><path d="m210 520 202-265 161 213-101-65-58-91-60 136-34-21-46 83Z" fill="#e3e6df"/><path d="m705 350-84 110 83-49 43 45 25-12 136 104Z" fill="#d6ddda"/></g>
    <g data-rm-depth><path d="M-100 750 80 650 245 706 488 466 643 654 821 514 998 699 1180 513 1510 738V1000H-100Z" fill="#3d5961"/><path d="m245 706 243-240 155 188-114-87-52-46-74 96-26-7Z" fill="#a2b3b3"/><path d="m821 514-93 117 93-55 77 56Z" fill="#a2b3b3"/></g>
    <g data-rm-depth><path d="M-100 790 90 754 290 826 518 701 716 819 935 720 1152 809 1345 674 1530 777V1100H-100Z" fill="#183a40"/>{Array.from({length: 21}, (_, i) => <path key={i} d={`M${i*81-70} ${790+(i%4)*19}l-22 60h13l-26 44h70l-26-44h13Z`} fill="#102f34" />)}</g>
    <path data-rm-route d="M-30 826 170 791 292 839 519 718 718 836 935 737 1150 826 1345 691 1480 766" stroke="#dbb587" strokeWidth="1.5"/>
  </svg>;
}

function Contours() {
  return <svg className={s.contours} viewBox="0 0 1200 700" fill="none" aria-hidden="true">{Array.from({ length: 13 }, (_, i) => <path key={i} data-rm-route={i % 4 === 0 ? '' : undefined} d={`M${-170+i*9} ${570+i*18}C${80+i*5} ${570-i*25} ${160+i*18} ${70+i*13} ${470+i*5} ${150+i*15}S${820+i*16} ${660-i*15} ${1340-i*4} ${90+i*22}`} />)}</svg>;
}

export function RefugeMarmotteCase({ locale }: { locale: string }) {
  const en = locale === 'en';
  const t = en ? {
    back: 'All projects', tag: 'NOVA BAIE / ALPINE DIGITAL EXPERIENCE', place: 'SAINTE-FOY-TARENTAISE · FRENCH ALPS', title: 'Le Refuge de', sub: 'la Marmotte.', lead: 'From the vastness of the Alps to the intimacy of a refuge. A bespoke website for a mountain apartment.', enter: 'Follow the ridge', illustration: 'Original alpine illustration · an imagined landscape',
    act1: '01 / A SENSE OF PLACE', intro: 'Outside, the mountains. Inside, a place to belong.', introBody: 'Le Refuge de la Marmotte is a duplex apartment for four guests in Sainte-Foy-Tarentaise. Its website brings together the mountain setting, wood interiors and useful information for planning a stay.', brief: 'THE NOVA BAIE APPROACH', briefBody: 'Translate the character of a holiday apartment into a clear digital experience. Let imagery invite visitors in, then make the essentials easy to find.',
    act2: '02 / TRANSLATING THE ATMOSPHERE', craft: 'The cool of the peaks. The warmth of wood.', craftBody: 'The client website pairs a dark panoramic opening with light, rounded panels. Wood interiors bring warmth to a restrained black-and-white interface. Photography leads; typography keeps the journey clear.', detail: 'Detail from the supplied website gallery capture', palette: ['Night', 'Glacier', 'Wood'],
    act3: '03 / THE WEBSITE, IN VIEW', screen: 'A window onto the stay.', screenBody: 'Three authentic desktop captures. The opening landscape, the apartment gallery and the route to contact and booking.',
    act4: '04 / THE VISITOR’S PATH', journey: 'From a first impression to a clear next step.', steps: [['Discover', 'The opening view introduces the apartment and its mountain setting.'], ['Explore', 'The photo gallery, comfort information and location help visitors picture their stay.'], ['Get in touch', 'A contact form and an external booking link make the next step visible.']],
    act5: '05 / NOVA BAIE’S CREATIVE SIGNATURE', map: 'A landscape becomes a language.', mapBody: 'A ridge becomes a line. A line becomes a frame. This case study follows a continuous graphic route from alpine relief to the website interface.', mapNote: 'CREATIVE CARTOGRAPHY / ORIGINAL VECTOR COMPOSITION', disciplines: 'ART DIRECTION / WEB DESIGN / DEVELOPMENT',
    act6: 'THE NEXT HORIZON', final: 'Give your place a digital presence.', finalBody: 'A distinctive identity. A considered journey. A website shaped around your business.', contact: 'Let’s talk about your project', visit: 'Visit the client website', portfolio: 'Back to projects',
  } : {
    back: 'Toutes les réalisations', tag: 'NOVA BAIE / EXPÉRIENCE DIGITALE ALPINE', place: 'SAINTE-FOY-TARENTAISE · ALPES FRANÇAISES', title: 'Le Refuge de', sub: 'la Marmotte.', lead: 'De l’immensité des Alpes à l’intimité d’un refuge. Un site sur mesure pour un appartement à la montagne.', enter: 'Suivre la crête', illustration: 'Illustration alpine originale · paysage imaginaire',
    act1: '01 / L’ESPRIT DU LIEU', intro: 'Dehors, l’immensité. Dedans, un refuge.', introBody: 'Le Refuge de la Marmotte est un appartement duplex pour quatre voyageurs à Sainte-Foy-Tarentaise. Son site réunit le décor montagnard, les intérieurs boisés et les informations utiles pour préparer un séjour.', brief: 'L’INTENTION NOVA BAIE', briefBody: 'Traduire le caractère d’un appartement de vacances en une expérience digitale lisible. Laisser les images inviter au séjour, puis rendre l’essentiel facile à trouver.',
    act2: '02 / TRADUIRE L’ATMOSPHÈRE', craft: 'La fraîcheur des sommets. La chaleur du bois.', craftBody: 'Le site client associe une ouverture panoramique sombre à des panneaux clairs et arrondis. Les intérieurs boisés réchauffent une interface sobre, noire et blanche. La photographie attire ; la typographie donne les repères.', detail: 'Détail de la capture de galerie fournie', palette: ['Nuit', 'Glacier', 'Bois'],
    act3: '03 / LE SITE EN SCÈNE', screen: 'Une fenêtre sur le séjour.', screenBody: 'Trois captures desktop authentiques. Le paysage en ouverture, la galerie de l’appartement et le parcours vers le contact et la réservation.',
    act4: '04 / LE PARCOURS DU VISITEUR', journey: 'De la première émotion au prochain pas.', steps: [['Découvrir', 'La vue d’ouverture présente l’appartement et son environnement montagnard.'], ['Se projeter', 'La galerie, les informations de confort et la localisation aident à imaginer son séjour.'], ['Passer à l’échange', 'Un formulaire de contact et un lien de réservation externe rendent la suite du parcours visible.']],
    act5: '05 / LA SIGNATURE CRÉATIVE NOVA BAIE', map: 'Du relief naît un langage.', mapBody: 'Une crête devient une ligne. Une ligne devient un cadre. Cette étude de cas suit un tracé graphique continu, du relief alpin à l’interface du site.', mapNote: 'CARTOGRAPHIE CRÉATIVE / COMPOSITION VECTORIELLE ORIGINALE', disciplines: 'DIRECTION ARTISTIQUE / WEB DESIGN / DÉVELOPPEMENT',
    act6: 'LE PROCHAIN HORIZON', final: 'Donnons une présence digitale à votre lieu.', finalBody: 'Une identité singulière. Un parcours soigné. Un site conçu autour de votre activité.', contact: 'Parlons de votre projet', visit: 'Visiter le site client', portfolio: 'Retour aux réalisations',
  };
  return <article className={s.case} data-refuge-case>
    <RefugeMarmotteMotion />
    <header className={s.hero}>
      <Mountains />
      <div className={s.heroShade} />
      <div className={s.wrap}>
        <Link href="/realisations" className={s.back}><ArrowLeft size={16} aria-hidden="true" />{t.back}</Link>
        <div className={s.heroCopy} data-rm-title><p className={s.kicker}>{t.tag}</p><p className={s.location}>{t.place}</p><h1>{t.title}<br /><em>{t.sub}</em></h1><p className={s.lead}>{t.lead}</p><a className={s.follow} href="#refuge-story">{t.enter}<ArrowDown size={18} aria-hidden="true" /></a></div>
        <div className={s.heroFoot}><span>LE REFUGE DE LA MARMOTTE</span><span>{t.illustration}</span><span>01 — 06</span></div>
      </div>
    </header>

    <section id="refuge-story" className={s.intro}>
      <div className={s.ascent} aria-hidden="true"><svg viewBox="0 0 1440 160" preserveAspectRatio="none" fill="none"><path data-rm-route d="M-20 20 250 60 450 15 680 125 850 50 1070 70 1460 10" /></svg></div>
      <div className={s.wrap}><p className={s.kicker}>{t.act1}</p><div className={s.introGrid}><h2>{t.intro}</h2><div><p>{t.introBody}</p><p className={s.label}>{t.brief}</p><p>{t.briefBody}</p></div></div><div className={s.facts}><span>SAINTE-FOY-TARENTAISE</span><span>{en ? 'DUPLEX APARTMENT' : 'APPARTEMENT DUPLEX'}</span><span>{en ? '4 GUESTS' : '4 VOYAGEURS'}</span></div></div>
    </section>

    <section className={s.craft}><div className={`${s.wrap} ${s.craftGrid}`}><figure className={s.interior}><div><Image src="/media/projects/le-refuge-de-la-marmotte/optimized/interior-detail.webp" alt={en ? 'Wood interior visible in the authentic apartment gallery capture' : 'Intérieur boisé visible dans la capture authentique de la galerie de l’appartement'} fill sizes="(min-width: 900px) 540px, 92vw" quality={95}/></div><figcaption>{t.detail}</figcaption><span className={s.cross} aria-hidden="true">+</span></figure><div className={s.craftCopy}><p className={s.kicker}>{t.act2}</p><h2>{t.craft}</h2><p>{t.craftBody}</p><div className={s.palette}>{t.palette.map((color, index) => <div key={color}><i style={{ background: ['#142c36', '#edf0e9', '#b58358'][index] }} /><span>{color}</span><small>{['01', '02', '03'][index]}</small></div>)}</div></div></div></section>

    <section className={s.showcase}><div className={s.peakFrame} aria-hidden="true"><svg viewBox="0 0 1440 260" preserveAspectRatio="none"><path d="M0 260 340 150 570 10 850 150 1130 65 1440 260Z" fill="#142c36"/><path data-rm-route d="M0 260 340 150 570 10 850 150 1130 65 1440 260" fill="none" stroke="#b58358" /></svg></div><div className={s.wrap}><div className={s.sectionHead}><div><p className={s.kicker}>{t.act3}</p><h2>{t.screen}</h2></div><p>{t.screenBody}</p></div><div data-rm-frame><RefugeMarmotteGallery en={en} /></div></div></section>

    <section className={s.journey}><div className={s.wrap}><p className={s.kicker}>{t.act4}</p><h2>{t.journey}</h2><ol>{t.steps.map(([title, body], index) => <li key={title}><span className={s.stepNumber}>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div><span className={s.stepDot} aria-hidden="true" /></li>)}</ol></div></section>

    <section className={s.signature}><Contours /><div className={s.wrap}><p className={s.kicker}>{t.act5}</p><div className={s.signatureGrid}><div><h2>{t.map}</h2><p>{t.mapBody}</p></div><div className={s.mapMark} aria-hidden="true"><svg viewBox="0 0 400 350" fill="none"><path d="m30 280 103-131 55 58 55-117 132 190Z" stroke="currentColor"/><path d="m133 149 4 55 51 3 55-117-15 104 147 86" stroke="currentColor" opacity=".5"/><circle cx="243" cy="90" r="11" stroke="currentColor"/><path data-rm-route d="M30 280h344M243 90V25h100" stroke="currentColor"/><text x="258" y="45" fill="currentColor" fontSize="10" letterSpacing="3">NOVA BAIE</text></svg><span>RELIEF → INTERFACE</span></div></div><div className={s.mapFooter}><span>{t.mapNote}</span><span>{t.disciplines}</span></div></div></section>

    <section className={s.finale}><Mountains dusk /><div className={s.finaleShade}/><div className={s.wrap}><div className={s.finalCopy}><p className={s.kicker}>{t.act6}</p><h2>{t.final}</h2><p>{t.finalBody}</p><Link className={s.cta} href="/contact">{t.contact}<ArrowUpRight size={20} aria-hidden="true" /></Link><div className={s.finalLinks}><a href="https://www.ski-saintefoy.com/" target="_blank" rel="noopener noreferrer">{t.visit}<ArrowUpRight size={16} aria-hidden="true" /></a><Link href="/realisations">{t.portfolio}<ArrowLeft size={16} aria-hidden="true" /></Link></div></div></div></section>
  </article>;
}
