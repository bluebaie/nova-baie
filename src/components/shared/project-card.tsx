import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { LocalizedProject } from '@/lib/projects';
import { ProjectVideo } from './project-video';

export async function ProjectCard({ project, compact = false }: { project: LocalizedProject; compact?: boolean }) {
  const t = await getTranslations('common');
  const business = ['blue-baie', 'saint-jean'].includes(project.id);
  return <article id={project.id} data-project={project.id} className={`project-card ${business ? 'project-card--business' : ''} ${!project.image ? 'project-card--text' : ''}`} data-reveal>
    {project.image ? <div className="project-media">
      <div className="project-window" aria-hidden="true"><i /><i /><i /><span>{project.url ? new URL(project.url).hostname.replace('www.', '') : project.title}</span></div>
      <picture>{project.mobileImage && <source media="(max-width: 639px)" srcSet={project.mobileImage} />}<Image src={project.image} alt={project.imageAlt ?? t('capture', { title: project.title })} fill sizes={compact ? '(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 50vw, 100vw'} /></picture>
      <div className="project-image-overlay" aria-hidden="true"><span><ArrowUpRight /></span></div>
    </div> : <div className="project-monogram" aria-hidden="true">03.</div>}
    <div className="project-copy">
      <div className="project-meta"><p>{project.category}</p><p className="project-status">{t(project.status)}</p></div>
      <h3>{project.title}</h3><p>{compact ? project.summary : project.description}</p>
      {!compact && <ul className="project-tags" aria-label={project.title}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
      {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link"><span>{t('seeSite')}</span><ArrowUpRight aria-hidden="true" /></a>}
      {!compact && project.video && project.image && <ProjectVideo src={project.video} poster={project.image} label={t('video', { title: project.title })} />}
    </div>
  </article>;
}
