import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { LocalizedProject } from '@/lib/projects';
import { ProjectVideo } from './project-video';

export async function ProjectCard({ project, compact = false }: { project: LocalizedProject; compact?: boolean }) {
  const t = await getTranslations('common');
  return <article id={project.id} data-project={project.id} className="card-premium flex h-full flex-col overflow-hidden">
    {project.image && <div className="relative aspect-video bg-nova-navy">
      <Image src={project.image} alt={project.imageAlt ?? project.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 380px" className="object-cover object-top" />
    </div>}
    <div className="flex flex-1 flex-col p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-nova-blue">{t(project.status)}</p>
      <p className="mt-3 text-xs uppercase tracking-wider text-nova-text">{project.category}</p>
      <h3 className="mt-2 text-xl">{project.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7">{compact ? project.summary : project.description}</p>
      {!compact && <ul className="mt-4 flex flex-wrap gap-2" aria-label={project.title}>
        {project.tags.map(tag => <li key={tag} className="rounded-full bg-nova-horizon px-3 py-1 text-xs text-nova-navy">{tag}</li>)}
      </ul>}
      {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-5 border-t border-nova-navy/10 pt-4 text-sm font-medium text-nova-blue">{t('seeSite')} →</a>}
      {!compact && project.video && project.image && <ProjectVideo src={project.video} poster={project.image} label={t('video', { title: project.title })} />}
    </div>
  </article>;
}
