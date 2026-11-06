import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Link } from '@/lib/navigation';
import { featuredProjectIds, localizeProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/shared/project-card';

export async function WorkPreviewSection() {
  const t = await getTranslations('work');
  const projects = localizeProjects(await getLocale()).filter(project => featuredProjectIds.some(id => id === project.id));
  return <section className="work-section surface-dark"><Container>
    <div className="section-intro" data-reveal><div><p className="eyebrow">{t('eyebrow')}</p><h2>{t('title')}</h2><p>{t('description')}</p></div><Link href="/realisations" className="text-link">{t('cta')}<ArrowUpRight aria-hidden="true" /></Link></div>
    <div className="projects-grid projects-grid--home">{projects.map(project => <ProjectCard key={project.id} project={project} compact />)}</div>
  </Container></section>;
}
