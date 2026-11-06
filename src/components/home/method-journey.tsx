'use client';

import { useId, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export type JourneyStep = { id: string; title: string; description: string; index: number };

export function MethodJourney({ steps, routeLabel, start, end, hint }: { steps: JourneyStep[]; routeLabel: string; start: string; end: string; hint: string }) {
  const t = useTranslations('visual');
  const [active, setActive] = useState(0);
  const uid = useId();
  const choose = (index: number) => setActive((index + steps.length) % steps.length);
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); choose(active + 1); document.getElementById(`${uid}-point-${(active + 1) % steps.length}`)?.focus(); }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); choose(active - 1); document.getElementById(`${uid}-point-${(active + steps.length - 1) % steps.length}`)?.focus(); }
    if (event.key === 'Home') { event.preventDefault(); choose(0); document.getElementById(`${uid}-point-0`)?.focus(); }
    if (event.key === 'End') { event.preventDefault(); choose(steps.length - 1); document.getElementById(`${uid}-point-${steps.length - 1}`)?.focus(); }
  };
  return <div className="journey" data-reveal>
    <div className="journey-map">
      <p className="journey-map-label">{routeLabel}</p>
      <div className="journey-endpoints"><span>{start}</span><span>{end}</span></div>
      <svg className="journey-route" viewBox="0 0 1200 210" fill="none" aria-hidden="true" preserveAspectRatio="none">
        <path className="journey-route-ghost" d="M30 152C120 152 127 51 235 51s113 107 221 107 102-96 207-96 105 96 213 96 110-106 215-106 115 99 182 99" />
        <path className="journey-route-draw" data-draw d="M30 152C120 152 127 51 235 51s113 107 221 107 102-96 207-96 105 96 213 96 110-106 215-106 115 99 182 99" />
        <path className="journey-route-mobile-ghost" d="M38 5C18 39 70 55 40 84s-2 42 0 62-4 37 0 56" />
        <path className="journey-route-mobile-draw" data-draw d="M38 5C18 39 70 55 40 84s-2 42 0 62-4 37 0 56" />
      </svg>
      <div className="journey-points" role="tablist" aria-label={hint}>
        {steps.map((step, index) => <button key={step.id} id={`${uid}-point-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls={`${uid}-step-panel`} tabIndex={active === index ? 0 : -1} className="journey-point" onClick={() => choose(index)} onKeyDown={onKeyDown}>
          <span className="journey-point-dot"><i /></span><span className="journey-point-index">0{step.index}</span><span className="journey-point-label">{step.title}</span>
        </button>)}
      </div>
    </div>
    <div className="journey-detail" id={`${uid}-step-panel`} role="tabpanel" aria-labelledby={`${uid}-point-${active}`}>
      <p className="eyebrow">{t('journeyStage', { current: `0${steps[active].index}` })}</p><h3>{steps[active].title}</h3><p>{steps[active].description}</p>
      <span className="journey-detail-index" aria-hidden="true">0{steps[active].index}<ArrowUpRight /></span>
    </div>
  </div>;
}
