'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

export function ProjectVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const [opened, setOpened] = useState(false);
  return <div className="video-control">
    {opened ? <video aria-label={label} src={src} poster={poster} controls muted playsInline preload="none" />
      : <button type="button" aria-expanded={false} onClick={() => setOpened(true)}><Play aria-hidden="true" />{label}</button>}
  </div>;
}
