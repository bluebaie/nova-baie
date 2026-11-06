'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Play, X } from 'lucide-react';

type GalleryItem = { src: string; alt: string; label: string; shape: string };

export function SaintJeanGallery({ items, openLabel, closeLabel, previousLabel, nextLabel }: { items: GalleryItem[]; openLabel: string; closeLabel: string; previousLabel: string; nextLabel: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const show = (index: number) => { setActive(index); dialog.current?.showModal(); };
  const close = () => { dialog.current?.close(); setActive(null); };
  const move = (direction: number) => setActive(current => current === null ? 0 : (current + direction + items.length) % items.length);
  return <>
    <div className="sj-gallery-grid">{items.map((item, index) => <figure key={item.src} className={`sj-gallery-item sj-gallery-item--${item.shape}`}>
      <button type="button" aria-label={`${openLabel}: ${item.label}`} onClick={() => show(index)}><Image src={item.src} alt={item.alt} fill quality={90} sizes={item.shape === 'wide' ? '(min-width: 900px) 76vw, 100vw' : item.shape === 'phone' ? '(min-width: 900px) 24vw, 48vw' : '(min-width: 900px) 42vw, 100vw'} /><span className="sj-gallery-zoom" aria-hidden="true">+</span></button>
      <figcaption><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</figcaption>
    </figure>)}</div>
    <dialog ref={dialog} className="sj-lightbox" aria-label={openLabel} onClick={event => { if (event.target === dialog.current) close(); }} onClose={() => setActive(null)}>
      <button className="sj-lightbox-close" type="button" aria-label={closeLabel} onClick={close}><X aria-hidden="true" /></button>
      <button className="sj-lightbox-prev" type="button" aria-label={previousLabel} onClick={() => move(-1)}><ArrowLeft aria-hidden="true" /></button>
      {active !== null && <figure><Image src={items[active].src} alt={items[active].alt} width={items[active].shape === 'phone' ? 1220 : 1917} height={items[active].shape === 'phone' ? 2712 : items[active].src.endsWith('home-desktop.jpg') ? 1017 : 1036} quality={95} sizes="90vw" priority /><figcaption>{items[active].label} · {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</figcaption></figure>}
      <button className="sj-lightbox-next" type="button" aria-label={nextLabel} onClick={() => move(1)}><ArrowRight aria-hidden="true" /></button>
    </dialog>
  </>;
}

export function SaintJeanFilm({ src, poster, label, alt }: { src: string; poster: string; label: string; alt: string }) {
  const [started, setStarted] = useState(false);
  return <div className="sj-film" data-film-player>
    {started ? <video src={src} poster={poster} aria-label={alt} controls playsInline preload="metadata" /> : <button type="button" className="sj-film-cover" aria-label={label} onClick={() => setStarted(true)}><Image src={poster} alt="" fill sizes="(min-width: 900px) 88vw, 100vw" /><span><Play aria-hidden="true" fill="currentColor" />{label}</span></button>}
    <p className="sj-film-rights">{alt}</p>
  </div>;
}
