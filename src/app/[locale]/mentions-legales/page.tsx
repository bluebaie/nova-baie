import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/ui/page-hero';
import { Container } from '@/components/ui/container';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'mentions' });
  const base = locale === 'fr' ? 'https://www.nova-baie.com' : 'https://www.nova-baie.com/en';
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: { index: false, follow: false },
    alternates: { canonical: `${base}/mentions-legales` },
  };
}

export default async function MentionsLegalesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('mentions');
  const sections = t.raw('sections') as Array<{ title: string; content: string }>;

  return (
    <>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />
      <section className="py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-3 mt-10 font-semibold text-nova-navy">{section.title}</h3>
                <p className="text-sm leading-8 text-nova-text">{section.content}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
