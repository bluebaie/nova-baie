import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/ui/page-hero';
import { Container } from '@/components/ui/container';
import { ProjectCard } from '@/components/shared/project-card';
import { FinalCtaSection } from '@/components/home/final-cta-section';
import { localizeProjects } from '@/lib/projects';
import { pageMetadata } from '@/lib/page-metadata';
import { Breadcrumbs, JsonLd, siteUrl } from '@/components/seo/json-ld';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { return pageMetadata((await params).locale, 'realisations', '/realisations'); }
export default async function RealisationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('realisations');
  const projects = localizeProjects(locale);
  return <>
    <Breadcrumbs locale={locale} trail={[{ name: t('eyebrow'), path: '/realisations' }]} />
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: t('metaTitle'), description: t('metaDescription'), url: siteUrl(locale, '/realisations'), mainEntity: { '@type': 'ItemList', itemListElement: projects.filter(project => project.detailStatus === 'published').map((project, index) => ({ '@type': 'ListItem', position: index + 1, name: project.title, url: siteUrl(locale, `/realisations/${project.slug}`) })) } }} />
    <PageHero eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />
    <section className="portfolio-section work-section--immersive"><Container>
      <h2>{t('listTitle')}</h2>
      <div className="projects-grid projects-grid--immersive portfolio-scene" data-creative-scene>{projects.map((project, index) => <ProjectCard key={project.id} project={project} position={index + 1} />)}</div>
    </Container></section>
    <FinalCtaSection />
  </>;
}
