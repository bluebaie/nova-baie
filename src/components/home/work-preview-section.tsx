import { getLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Link } from '@/lib/navigation';
import { featuredProjectIds, localizeProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/shared/project-card';

export async function WorkPreviewSection() {
  const t = await getTranslations('work');
  const projects = localizeProjects(await getLocale()).filter(project => featuredProjectIds.some(id => id === project.id));
  return <section className="section-padding bg-nova-sand" aria-label={t('eyebrow')}><Container>
    <SectionHeading eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map(project => <ProjectCard key={project.id} project={project} compact />)}</div>
    <Link href="/realisations" className="mt-8 inline-block text-sm font-medium text-nova-blue">{t('cta')} →</Link>
  </Container></section>;
}
