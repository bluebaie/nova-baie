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
    <section className="section-padding"><Container>
      <h2 className="mb-8 text-2xl">{t('listTitle')}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{localizeProjects(locale).map(project => <ProjectCard key={project.id} project={project} />)}</div>
    </Container></section>
    <FinalCtaSection />
  </>;
}
