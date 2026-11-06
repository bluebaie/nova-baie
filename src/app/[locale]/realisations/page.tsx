import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/ui/page-hero';
import { Container } from '@/components/ui/container';
import { ProjectCard } from '@/components/shared/project-card';
import { FinalCtaSection } from '@/components/home/final-cta-section';
import { localizeProjects } from '@/lib/projects';
import { pageMetadata } from '@/lib/page-metadata';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { return pageMetadata((await params).locale, 'realisations', '/realisations'); }
export default async function RealisationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('realisations');
  return <>
    <PageHero eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
    <section className="portfolio-section surface-dark"><Container>
      <h2>{t('listTitle')}</h2>
      <div className="projects-grid">{localizeProjects(locale).map(project => <ProjectCard key={project.id} project={project} />)}</div>
    </Container></section>
    <FinalCtaSection />
  </>;
}
