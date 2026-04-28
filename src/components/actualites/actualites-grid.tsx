'use client'

import { useState } from 'react'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { actualites, type Actualite } from '@/lib/actualites-data'
import { ImageCarousel } from './image-carousel'

const categoryStyles: Record<string, string> = {
  Réalisation: 'bg-nova-blue text-white',
  Lancement: 'bg-nova-navy text-white',
  Coulisse: 'bg-nova-sage text-white',
  Conseil: 'bg-nova-horizon text-nova-navy',
}

function ActualiteCard({ item }: { item: Actualite }) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = item.contenuComplet && item.contenuComplet !== item.resume
  const images = item.images ?? []

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(22,58,112,0.08)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(22,58,112,0.14)]">
      {/* Carousel ou placeholder */}
      <div className="relative">
        {images.length > 0 ? (
          <ImageCarousel images={images} alt={item.titre} />
        ) : (
          <div className="aspect-square w-full bg-gradient-to-br from-nova-horizon to-nova-blue/20" />
        )}
        {/* Badge catégorie superposé */}
        <span
          className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-sm ${
            categoryStyles[item.categorie] ?? 'bg-nova-horizon text-nova-navy'
          }`}
        >
          {item.categorie}
        </span>
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-6">
        <time className="text-xs text-nova-text/50">{item.date}</time>

        <h3 className="mt-2 text-base font-semibold leading-7 text-nova-navy">
          {item.titre}
        </h3>

        <div className="mt-3 flex-1 text-sm leading-7 text-nova-text">
          {expanded ? (
            <span className="whitespace-pre-line">{item.contenuComplet}</span>
          ) : (
            item.resume
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-nova-navy/6 pt-4">
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
              className="ml-auto flex items-center gap-1.5 text-xs text-nova-text/50 transition-colors hover:text-nova-navy"
            >
              {item.labelLien ?? item.lien}
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export function ActualitesGrid() {
  const sorted = [...actualites].sort((a, b) => b.id - a.id)

  return (
    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
      {sorted.map((item) => (
        <ActualiteCard key={item.id} item={item} />
      ))}
    </div>
  )
}
