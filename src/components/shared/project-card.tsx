import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import type { LocalizedProject } from '@/lib/projects';
import { ProjectVideo } from './project-video';

export async function ProjectCard({ project, compact = false, position }: { project: LocalizedProject; compact?: boolean; position?: number }) {
  const t = await getTranslations('common');
  const visual = await getTranslations('visual');
  const hasDetail = project.detailStatus === 'published';
  const internalHref = `/realisations/${project.slug}`;
  const actionLabel = hasDetail ? visual('imageActionDetail', { title: project.title }) : visual('imageActionExternal', { title: project.title });
  const Art = <div className={`project-art ${project.mobileImage ? 'project-art--duo' : ''}`} data-c2-art>
    {project.image && <div className="project-art-main">
      <Image src={project.image} alt={project.imageAlt ?? t('capture', { title: project.title })} fill priority={compact && position === 1} sizes={compact ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 58vw, 100vw'} />
    </div>}
    {project.mobileImage && <div className="project-art-mobile"><Image src={project.mobileImage} alt="" fill sizes="(min-width: 1024px) 15vw, 32vw" /></div>}
    {!project.image && <div className="project-art-unavailable"><svg viewBox="0 0 600 400" fill="none" aria-hidden="true"><path d="M-20 280C112 146 220 346 337 216S500 72 630 133"/><path d="M-25 324C116 190 233 390 354 260S512 116 635 177"/><circle cx="355" cy="217" r="112" /></svg></div>}
    {project.logo && <div className="project-art-client-logo"><Image src={project.logo} alt="" width={72} height={72} /></div>}
    <svg className="project-art-orbit" viewBox="0 0 600 400" fill="none" aria-hidden="true"><ellipse cx="300" cy="200" rx="265" ry="132" transform="rotate(-18 300 200)"/><ellipse cx="300" cy="200" rx="195" ry="205" transform="rotate(23 300 200)"/><path d="M28 270C154 160 260 330 395 168S551 91 598 116" /></svg>
    {(hasDetail || project.externalUrl) && <span className="project-art-action">{hasDetail ? visual('caseStudy') : t('openWebsite')} <ArrowUpRight aria-hidden="true" /></span>}
  </div>;
  const siteLink = project.externalUrl ? <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="project-visit" data-project-visit>
    <span className="project-visit-label">{t('openWebsite')}</span><span className="project-visit-domain">{new URL(project.externalUrl).hostname.replace(/^www\./, '')}</span><ArrowUpRight aria-hidden="true" />
  </a> : null;

  return <article id={project.id} data-project={project.id} className={`project-card project-card--immersive ${project.homeVisible ? 'project-card--feature' : ''} ${!project.image ? 'project-card--text' : ''}`} data-reveal>
    <div className="project-card-art-wrap">
      {project.image && (hasDetail ? <Link href={internalHref} className="project-art-link" aria-label={actionLabel} data-project-image-link>{Art}</Link>
        : project.externalUrl ? <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="project-art-link" aria-label={actionLabel} data-project-image-link>{Art}</a> : Art)}
      {!compact && project.video && project.image && <ProjectVideo src={project.video} poster={project.image} label={t('video', { title: project.title })} />}
    </div>
    <div className="project-copy">
      <div className="project-meta"><p>{project.category}</p><p className="project-status">{t(project.status)}</p></div>
      <h3>{hasDetail ? <Link href={internalHref} className="project-title-link" data-project-detail-link>{project.title}</Link> : project.title}</h3>
      <p>{compact ? project.summary : project.description}</p>
      {!compact && <ul className="project-tags" aria-label={project.title}>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
      <div className="project-actions">
        {hasDetail && <Link href={internalHref} className="project-discover" data-project-detail-link>{t('discoverProject')} <ArrowUpRight aria-hidden="true" /></Link>}
        {siteLink}
      </div>
    </div>
  </article>;
}
