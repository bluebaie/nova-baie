'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import styles from './refuge-marmotte.module.css';

export function RefugeMarmotteGallery({ en }: { en: boolean }) {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const labels = en ? ['The first impression', 'Inside the apartment', 'Contact & booking'] : ['La première impression', 'Dans l’appartement', 'Contact & réservation'];
  const alts = en ? ['Authentic homepage capture with mountain photography and apartment introduction', 'Authentic website gallery showing the wood interior, bedroom, kitchen and station view', 'Authentic contact section with a form and an external booking link'] : ['Capture authentique de l’accueil : photographie de montagne et présentation de l’appartement', 'Galerie du site : intérieur boisé, chambre, cuisine et vue sur la station', 'Capture authentique de la section contact : formulaire et lien de réservation externe'];
  const src = `/media/projects/le-refuge-de-la-marmotte/optimized/${['home', 'gallery', 'contact'][active]}.webp`;
  return <div className={styles.gallery}>
    <div className={styles.browserTop}><span aria-hidden="true">● ● ●</span><span>ski-saintefoy.com</span><span>DESKTOP</span></div>
    <button className={styles.screen} type="button" onClick={() => dialog.current?.showModal()} aria-label={`${en ? 'Enlarge' : 'Agrandir'} : ${labels[active]}`}><Image src={src} alt={alts[active]} width={1900} height={1035} sizes="(min-width: 1440px) 1200px, 92vw" quality={95} /><span><Maximize2 size={16} aria-hidden="true" />{en ? 'Enlarge' : 'Agrandir'}</span></button>
    <div className={styles.tabs} role="group" aria-label={en ? 'Website captures' : 'Captures du site'}>{labels.map((label, index) => <button key={label} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span>{label}</button>)}</div>
    <dialog ref={dialog} className={styles.lightbox} aria-label={labels[active]} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}><button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label={en ? 'Close image' : 'Fermer l’image'}><X aria-hidden="true" /></button><Image src={src} alt={alts[active]} width={1900} height={1035} sizes="96vw" quality={100} /><p>{labels[active]}</p></dialog>
  </div>;
}
