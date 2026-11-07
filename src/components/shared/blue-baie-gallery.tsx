'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

type Item = { src: string; alt: string; label: string; description?: string; kind: 'screen' | 'photo' };

export function BlueBaieGallery({ items, label, closeLabel }: { items: Item[]; label: string; closeLabel: string }) {
  const [active, setActive] = useState<Item | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (active && !node.open) node.showModal();
    if (!active && node.open) node.close();
  }, [active]);

  return <>
    <div className="bb-gallery" aria-label={label}>
      {items.map((item, index) => <button className={`bb-gallery-item bb-gallery-item--${index % 5}`} type="button" key={item.src} onClick={() => setActive(item)} aria-label={`${label}: ${item.label}`}>
        <span className={`bb-gallery-image bb-gallery-image--${item.kind}`}><Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 48vw, (min-width: 640px) 80vw, 100vw" quality={88} /></span>
        <span className="bb-gallery-caption"><span>{String(index + 1).padStart(2, '0')}</span>{item.label}<span aria-hidden="true">↗</span></span>
      </button>)}
    </div>
    <dialog ref={dialog} className="bb-lightbox" aria-label={active?.label ?? label} onClose={() => setActive(null)} onClick={(event) => { if (event.target === dialog.current) setActive(null); }}>
      {active && <div className="bb-lightbox-content"><button type="button" className="bb-lightbox-close" onClick={() => setActive(null)} aria-label={closeLabel}><X aria-hidden="true" /></button><Image src={active.src} alt={active.alt} fill sizes="95vw" quality={92} priority /><div className="bb-lightbox-caption"><p>{active.label}</p>{active.description && <p>{active.description}</p>}</div></div>}
    </dialog>
  </>;
}
