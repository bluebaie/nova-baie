'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Actualite } from '@/lib/actualites-data';
import { ImageCarousel } from './image-carousel';

function ActualiteCard({ item }: { item: Actualite }) {
  const t = useTranslations('actualites');
  const locale = useLocale();
  const [expanded, setExpanded] = useState(false);
  return <article className="card-premium overflow-hidden">
    <ImageCarousel images={item.images ?? []} alt={item.title} />
    <div className="p-6">
      {locale === 'en' && <p className="mb-3 text-xs">{t('originalVisual')}</p>}
      <time dateTime={item.date} className="text-xs text-nova-text">{item.dateLabel}</time>
      <h2 className="mt-3 text-xl">{item.title}</h2>
      <p className="mt-4 text-sm leading-7">{item.summary}</p>
      <div id={item.id} hidden={!expanded} className="mt-4 whitespace-pre-line text-sm leading-7 text-nova-text">{item.body}</div>
      <button type="button" aria-expanded={expanded} aria-controls={item.id} onClick={() => setExpanded(!expanded)} className="mt-5 text-sm font-medium text-nova-blue">{expanded ? t('collapse') : t('readMore')}</button>
    </div>
  </article>;
}

export function ActualitesGrid({ items }: { items: Actualite[] }) {
  return <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{items.map(item => <ActualiteCard key={item.id} item={item} />)}</div>;
}
