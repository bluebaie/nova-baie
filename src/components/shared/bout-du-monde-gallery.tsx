'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';

type GalleryItem = { src: string; label: string; alt: string };

export function BoutDuMondeGallery({ items, title, openLabel, closeLabel }: { items: readonly GalleryItem[]; title: string; openLabel: string; closeLabel: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const active = items[activeIndex];

  return <div className="bdm-gallery" aria-label={title}>
    <div className="bdm-gallery-stage">
      <div className="bdm-gallery-orbit" aria-hidden="true"><svg viewBox="0 0 600 460" fill="none"><path d="M24 332C112 80 207 423 301 196S476 81 581 155"/><path d="M5 370C113 116 220 461 316 231S493 116 605 193"/></svg><span>LE BOUT DU MONDE · BAIE DE SOMME</span></div>
      <button className="bdm-gallery-image" type="button" aria-label={`${openLabel}: ${active.label}`} onClick={() => dialogRef.current?.showModal()} key={active.src}>
        <Image src={active.src} alt={active.alt} fill sizes="(min-width: 1100px) 72vw, 94vw" quality={90} />
        <span className="bdm-gallery-expand"><Maximize2 aria-hidden="true"/>{openLabel}</span>
      </button>
      <div className="bdm-gallery-caption"><span>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span><strong>{active.label}</strong></div>
    </div>
    <div className="bdm-gallery-rail" role="group" aria-label={title}>
      {items.map((item, index) => <button type="button" key={item.src} aria-pressed={activeIndex === index} onClick={() => setActiveIndex(index)}>
        <span>{String(index + 1).padStart(2, '0')}</span>{item.label}
      </button>)}
    </div>
    <dialog className="bdm-lightbox" ref={dialogRef} aria-label={title} onClick={event => { if (event.target === dialogRef.current) dialogRef.current?.close(); }}>
      <button className="bdm-lightbox-close" type="button" aria-label={closeLabel} onClick={() => dialogRef.current?.close()}><X aria-hidden="true"/></button>
      <figure><Image src={active.src} alt={active.alt} fill sizes="95vw" quality={95}/><figcaption>{active.label}</figcaption></figure>
    </dialog>
  </div>;
}
