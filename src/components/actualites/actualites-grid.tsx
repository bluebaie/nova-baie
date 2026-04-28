'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { actualites, type Actualite } from '@/lib/actualites-data'

const categoryStyles: Record<string, string> = {
  Réalisation: 'bg-nova-blue text-white',
  Lancement: 'bg-nova-navy text-white',
  Coulisse: 'bg-nova-sage text-nova-ink',
  Conseil: 'bg-nova-horizon text-nova-navy',
}

function ActualiteCard({ item }: { item: Actualite }) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = item.contenuComplet && item.contenuComplet !== item.resume

  return (
    <article className="flex flex-col rounded-[1.5rem] border border-nova-navy/8 bg-white p-7 shadow-[0_4px_20px_rgba(22,58,112,0.05)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(22,58,112,0.10)]">
      <div className="flex items-center justify-between gap-3">
        <time className="text-xs text-nova-text/55">{item.date}</time>
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${
            categoryStyles[item.categorie] ?? 'bg-nova-horizon text-nova-navy'
          }`}
        >
          {item.categorie}
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold leading-7 text-nova-navy">
        {item.titre}
      </h3>

      <div className="mt-3 flex-1 text-sm leading-7 text-nova-text">
        {expanded ? (
          <span className="whitespace-pre-line">{item.contenuComplet}</span>
        ) : (
          item.resume
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-nova-navy/6 pt-4">
        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-medium text-nova-blue transition-colors hover:text-nova-navy"
          >
            {expanded ? 'Réduire' : 'Lire la suite'}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                expanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        )}

        {item.lien && (
          <a
            href={item.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs text-nova-text/50 transition-colors hover:text-nova-navy"
          >
            {item.labelLien ?? item.lien} →
          </a>
        )}
      </div>
    </article>
  )
}

export function ActualitesGrid() {
  const sorted = [...actualites].sort((a, b) => b.id - a.id)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {sorted.map((item) => (
        <ActualiteCard key={item.id} item={item} />
      ))}
    </div>
  )
}
