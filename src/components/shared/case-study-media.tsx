'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
  image: string;
  mobileImage?: string;
  title: string;
  desktopLabel: string;
  mobileLabel: string;
  alt: string;
};

export function CaseStudyMedia({ image, mobileImage, title, desktopLabel, mobileLabel, alt }: Props) {
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');
  const showingMobile = view === 'mobile' && Boolean(mobileImage);
  return <div className="case-media-viewer" data-case-media>
    {mobileImage && <div className="case-media-controls" role="group" aria-label={title}>
      <button type="button" aria-pressed={!showingMobile} onClick={() => setView('desktop')} data-media-view="desktop">{desktopLabel}</button>
      <button type="button" aria-pressed={showingMobile} onClick={() => setView('mobile')} data-media-view="mobile">{mobileLabel}</button>
    </div>}
    <figure className={`case-media-frame case-media-frame--${showingMobile ? 'mobile' : 'desktop'}`} data-active-view={showingMobile ? 'mobile' : 'desktop'}>
      <div className="case-media-screen">
        <Image key={showingMobile ? mobileImage : image} src={showingMobile ? mobileImage! : image} alt={showingMobile ? `${alt} — ${mobileLabel}` : alt} fill sizes={showingMobile ? '(min-width: 1024px) 28vw, 58vw' : '(min-width: 1024px) 76vw, 100vw'} />
      </div>
      <figcaption>{showingMobile ? mobileLabel : desktopLabel} / {title}</figcaption>
    </figure>
  </div>;
}
