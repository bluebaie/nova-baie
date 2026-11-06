import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Link } from '@/lib/navigation';
import { featuredProjectIds, localizeProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/shared/project-card';

export async function WorkPreviewSection() {
  const t = await getTranslations('work');
  const projects = localizeProjects(await getLocale()).filter(project => featuredProjectIds.includes(project.id as typeof featuredProjectIds[number]));
  return <section className="work-section work-section--immersive"><Container>
    <div className="section-intro" data-reveal><div><p className="eyebrow">{t('eyebrow')}</p><h2>{t('title')}</h2><p>{t('description')}</p></div><Link href="/realisations" className="text-link">{t('cta')}<ArrowUpRight aria-hidden="true" /></Link></div>
    <div className="projects-grid projects-grid--immersive projects-grid--home portfolio-scene" data-creative-scene>{projects.map((project, index) => <ProjectCard key={project.id} project={project} compact position={index + 1} />)}</div>
  </Container></section>;
}
