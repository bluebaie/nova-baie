'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

type Project = {
  title: string
  category: string
  description: string
  image: string
  imageAlt?: string
  url: string
  tags: string[]
  stats: string
  previewBg: string
}

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations('common')
  const [imgError, setImgError] = useState(false)

  return (
    <article className="card-premium group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative h-52 w-full overflow-hidden" style={{ background: project.previewBg }}>
        {!imgError && (
          <Image
            src={project.image}
            alt={project.imageAlt ?? `Site web ${project.title} - Réalisation Nova Baie`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        )}
        {imgError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm italic text-white/40">{project.title}</span>
          </div>
        )}
        <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-1.5 bg-black/25 px-3 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <div className="mx-2 flex-1 truncate rounded-full bg-white/15 px-3 py-0.5 text-center text-[10px] text-white/50">
            {project.url.replace('https://', '').replace('www.', '')}
          </div>
        </div>
        <div className="absolute left-3 top-3 z-30">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-nova-navy backdrop-blur">
            {t('siteRealized')}
          </span>
        </div>
      </div>

      <div className="p-6">
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-nova-text">{project.category}</p>
        <h3 className="mt-2">{project.title}</h3>
        <p className="mt-3 text-sm leading-7">{project.description}</p>
        <p className="mt-3 text-xs font-medium text-nova-blue">{project.stats}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-nova-horizon px-3 py-1 text-xs font-medium text-nova-navy">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 border-t border-nova-navy/8 pt-4">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-nova-blue transition-colors hover:text-nova-navy"
          >
            {t('seeSite')}
          </a>
        </div>
      </div>
    </article>
  )
}
