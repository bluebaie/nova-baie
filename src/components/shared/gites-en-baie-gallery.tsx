'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';

export type GitesGalleryImage = { src: string; label: string; alt: string };

export function GitesEnBaieGallery({ items, title, openLabel, closeLabel }: {
  items: readonly GitesGalleryImage[];
  title: string;
  openLabel: string;
  closeLabel: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const active = items[activeIndex];
  if (!active) return null;

  return <div className="geb-gallery" aria-label={title}>
    <div className="geb-gallery-stage">
      <div className="geb-gallery-mark" aria-hidden="true"><span>GÎTES EN BAIE</span><svg viewBox="0 0 460 250" fill="none"><path d="M4 183C92 141 119 221 194 176S299 111 456 139"/><path d="M4 202C92 160 119 240 194 195S299 130 456 158"/></svg></div>
      <button className="geb-gallery-image" type="button" aria-label={`${openLabel}: ${active.label}`} onClick={() => dialogRef.current?.showModal()} key={active.src}>
        <Image src={active.src} alt={active.alt} fill sizes="(min-width: 1100px) 76vw, 94vw" quality={92} />
        <span className="geb-gallery-expand"><Maximize2 aria-hidden="true" />{openLabel}</span>
      </button>
      <div className="geb-gallery-caption"><span>{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span><strong>{active.label}</strong></div>
    </div>
    <div className="geb-gallery-rail" role="group" aria-label={title}>
      {items.map((item, index) => <button type="button" key={item.src} aria-pressed={activeIndex === index} onClick={() => setActiveIndex(index)}>
        <span>{String(index + 1).padStart(2, '0')}</span>{item.label}
      </button>)}
    </div>
    <dialog className="geb-lightbox" ref={dialogRef} aria-label={title} onClick={event => { if (event.target === dialogRef.current) dialogRef.current?.close(); }}>
      <button className="geb-lightbox-close" type="button" aria-label={closeLabel} onClick={() => dialogRef.current?.close()}><X aria-hidden="true" /></button>
      <figure><Image src={active.src} alt={active.alt} fill sizes="95vw" quality={96} /><figcaption>{active.label}</figcaption></figure>
    </dialog>
  </div>;
}
