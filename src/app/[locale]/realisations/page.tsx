import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/ui/page-hero';
import { Container } from '@/components/ui/container';
import { ProjectCard } from '@/components/shared/project-card';
import { projects } from '@/lib/site-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'realisations' });
  const base = locale === 'fr' ? 'https://www.nova-baie.com' : 'https://www.nova-baie.com/en';
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `${base}/realisations` },
    openGraph: { title: t('metaTitle'), description: t('metaDescription'), url: `${base}/realisations` },
  };
}

export default async function RealisationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('realisations');
  const tWork = await getTranslations('work');
  const translatedProjects = tWork.raw('projects') as Array<{
    title: string;
    category: string;
    description: string;
    tags: string[];
    stats: string;
  }>;

  const mergedProjects = projects.map((p, i) => ({
    ...p,
    ...(translatedProjects[i] ?? {}),
  }));

  return (
    <>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />
      <section className="section-padding">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {mergedProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
