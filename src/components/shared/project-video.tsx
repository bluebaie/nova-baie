'use client';

import { useState } from 'react';

export function ProjectVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const [opened, setOpened] = useState(false);
  return <div className="mt-4">
    {opened ? <video aria-label={label} src={src} poster={poster} controls playsInline preload="none" className="aspect-video w-full rounded-xl bg-nova-navy" />
      : <button type="button" aria-expanded={false} onClick={() => setOpened(true)} className="text-sm font-medium text-nova-navy underline underline-offset-4">{label}</button>}
  </div>;
}
