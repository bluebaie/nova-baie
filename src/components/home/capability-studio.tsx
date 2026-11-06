'use client';

import { useId, useState, type KeyboardEvent } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';

export type CapabilityPanel = { id: 'create' | 'connect' | 'develop'; label: string; mark: string; title: string; description: string };

function CurrentArtwork({ current }: { current: CapabilityPanel['id'] }) {
  return <div className={`current-art current-art--${current}`} aria-hidden="true">
    <svg className="current-drawing" viewBox="0 0 760 500" fill="none">
      <defs><linearGradient id={`ink-${current}`} x1="64" y1="50" x2="690" y2="470"><stop stopColor="#91e0d0" /><stop offset="1" stopColor="#ddc59d" /></linearGradient></defs>
      {current === 'create' && <>
        <path data-draw d="M100 335C105 175 220 78 375 92c144 12 245 117 265 263" stroke={`url(#ink-${current})`} strokeWidth="1.4" />
        <path data-draw d="M84 380C213 357 258 166 417 133c116-24 200 32 259 114" stroke="white" strokeOpacity=".58" />
        <path data-draw d="M113 410C248 378 296 242 425 197c90-31 165-6 226 38" stroke="white" strokeOpacity=".26" />
        <circle cx="390" cy="237" r="164" stroke={`url(#ink-${current})`} strokeOpacity=".45" />
        <text x="312" y="280" fill="#f6f5ef" fontSize="104" fontFamily="serif" fontStyle="italic">N</text>
        <circle cx="565" cy="150" r="4" fill="#ddc59d" />
      </>}
      {current === 'connect' && <>
        <path data-draw d="M125 367 257 240 381 318 512 145 650 225" stroke={`url(#ink-${current})`} strokeWidth="1.6" />
        <path data-draw d="M125 367 385 407 512 145M257 240 650 225M257 240 385 407" stroke="white" strokeOpacity=".26" />
        <circle cx="125" cy="367" r="16" fill="#071f2b" stroke="#91e0d0" strokeWidth="2" />
        <circle cx="257" cy="240" r="11" fill="#91e0d0" /><circle cx="381" cy="318" r="7" fill="#ddc59d" />
        <circle cx="512" cy="145" r="19" fill="#071f2b" stroke="#ddc59d" strokeWidth="2" />
        <circle cx="650" cy="225" r="12" fill="#91e0d0" /><circle cx="385" cy="407" r="8" fill="white" />
        <circle className="signal-pulse" cx="512" cy="145" r="37" stroke="#ddc59d" />
      </>}
      {current === 'develop' && <>
        <path data-draw d="M115 330C260 290 300 150 451 139c75-5 130 28 192 85" stroke={`url(#ink-${current})`} strokeWidth="1.6" />
        <path data-draw d="M117 368C275 332 319 197 460 185c72-6 119 20 181 65" stroke="white" strokeOpacity=".56" />
        <path data-draw d="M118 407C295 373 344 242 474 230c56-5 104 13 166 43" stroke="white" strokeOpacity=".27" />
        <circle cx="472" cy="188" r="135" stroke="#91e0d0" strokeOpacity=".38" />
        <path d="M472 188 585 90M472 188l130 9" stroke="#ddc59d" strokeWidth="1.5" />
        <circle cx="585" cy="90" r="5" fill="#ddc59d" /><circle cx="602" cy="197" r="4" fill="#91e0d0" />
      </>}
    </svg>
    <span className="art-coordinate art-coordinate--a">50°12’N</span><span className="art-coordinate art-coordinate--b">BAIE / STUDIO</span>
    <span className="art-orbit" />
  </div>;
}

export function CapabilityStudio({ panels, hint }: { panels: CapabilityPanel[]; hint: string }) {
  const t = useTranslations('visual');
  const [active, setActive] = useState(0);
  const uid = useId();
  const current = panels[active];
  const choose = (index: number) => setActive((index + panels.length) % panels.length);
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); choose(active + 1); document.getElementById(`${uid}-tab-${(active + 1) % panels.length}`)?.focus(); }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); choose(active - 1); document.getElementById(`${uid}-tab-${(active + panels.length - 1) % panels.length}`)?.focus(); }
    if (event.key === 'Home') { event.preventDefault(); choose(0); document.getElementById(`${uid}-tab-0`)?.focus(); }
    if (event.key === 'End') { event.preventDefault(); choose(panels.length - 1); document.getElementById(`${uid}-tab-${panels.length - 1}`)?.focus(); }
  };

  return <div className="capability-studio" data-reveal>
    <div className="capability-rail" role="tablist" aria-label={hint} aria-orientation="vertical">
      {panels.map((panel, index) => <button key={panel.id} id={`${uid}-tab-${index}`} className="capability-tab" type="button" role="tab" aria-selected={active === index} aria-controls={`${uid}-panel`} tabIndex={active === index ? 0 : -1} onClick={() => choose(index)} onKeyDown={onKeyDown}>
        <span className="capability-tab-index">0{index + 1}</span><span className="capability-tab-name">{panel.label}</span><ArrowRight aria-hidden="true" />
      </button>)}
      <span className="capability-rail-label">{hint} / 03</span>
    </div>
    <div className="capability-stage" id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`}>
      <CurrentArtwork key={current.id} current={current.id} />
      <div className="capability-copy" key={current.id}>
        <p className="eyebrow">{current.mark}</p><h3>{current.title}</h3><p>{current.description}</p>
        <Link href={`/services#${current.id === 'create' ? 'identity' : current.id === 'connect' ? 'business' : 'maintenance'}`} className="studio-link">{t('exploreExpertise')} <ArrowUpRight aria-hidden="true" /></Link>
      </div>
      <span className="stage-index" aria-hidden="true">0{active + 1}<i>/</i>03</span>
    </div>
  </div>;
}
