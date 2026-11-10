import { pageMetadata } from '@/lib/page-metadata';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/ui/page-hero';
import { Container } from '@/components/ui/container';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    ...await pageMetadata(locale, 'mentions', '/mentions-legales'),
    robots: { index: false, follow: false },
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
        actions={false}
      />
      <section className="py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            {sections.map((section) => (
              <div key={section.title} id={section === sections[3] ? 'confidentialite' : section === sections[4] ? 'cookies' : undefined} className="scroll-mt-28">
                <h2 className="mb-3 mt-10 text-xl font-semibold text-nova-navy">{section.title}</h2>
                <p className="text-sm leading-8 text-nova-text">{section.content}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
