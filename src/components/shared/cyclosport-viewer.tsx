'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import s from './cyclosport.module.css';

type Shot = { src: string; alt: string; width: number; height: number };

/**
 * One shared dialog for every enlargeable capture of the case study.
 * Server-rendered buttons carry `data-csc-zoom`; clicks are delegated here so
 * the captures themselves stay server components.
 */
export function CyclosportViewer({ closeLabel }: { closeLabel: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [shot, setShot] = useState<Shot | null>(null);

  useEffect(() => {
    const root = dialog.current?.closest('article');
    if (!root) return;
    const onClick = (event: MouseEvent) => {
      const button = (event.target as HTMLElement).closest<HTMLElement>('[data-csc-zoom]');
      if (!button || !root.contains(button)) return;
      trigger.current = button;
      setShot({ src: button.dataset.src ?? '', alt: button.dataset.alt ?? '', width: Number(button.dataset.width), height: Number(button.dataset.height) });
    };
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (shot && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [shot]);

  return <dialog ref={dialog} className={s.lightbox} aria-label={shot?.alt ?? closeLabel}
    onClose={() => { setShot(null); trigger.current?.focus(); }}
    onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
    <button type="button" className={s.close} onClick={() => dialog.current?.close()} aria-label={closeLabel}><X aria-hidden="true" /></button>
    {shot && <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="96vw" quality={95} />}
  </dialog>;
}

type CockpitItem = { id: string; label: string; body: string; alt: string; src: string };

export function CyclosportCockpit({ label, items, enlarge }: { label: string; items: readonly CockpitItem[]; enlarge: string }) {
  const [active, setActive] = useState(0);
  const item = items[active];
  return <div className={s.cockpit} data-csc-cockpit>
    <div className={s.cockpitTabs} role="group" aria-label={label}>
      {items.map((entry, index) => <button key={entry.id} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
        <span>{String(index + 1).padStart(2, '0')}</span>{entry.label}
      </button>)}
    </div>
    <div className={s.cockpitScreen}>
      <span className={s.hud} aria-hidden="true"><i /><i /><i /><i /></span>
      <button type="button" className={s.zoom} data-csc-zoom data-src={item.src} data-alt={item.alt} data-width={1898} data-height={990} aria-label={`${enlarge} : ${item.label}`}>
        <Image key={item.src} src={item.src} alt={item.alt} width={1898} height={990} sizes="(min-width: 1024px) 860px, 94vw" quality={90} />
        <span className={s.zoomHint}><Maximize2 size={14} aria-hidden="true" />{enlarge}</span>
      </button>
    </div>
    <p className={s.cockpitBody} aria-live="polite"><strong>{item.label}</strong>{item.body}</p>
  </div>;
}
