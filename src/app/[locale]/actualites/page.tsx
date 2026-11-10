import { pageMetadata } from '@/lib/page-metadata';
import { getActualites } from '@/lib/actualites-data';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { ActualitesGrid } from '@/components/actualites/actualites-grid';
import { Breadcrumbs } from '@/components/seo/json-ld';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, 'actualites', '/actualites');
}

export default async function ActualitesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('actualites');

  return (
    <>
      <Breadcrumbs locale={locale} trail={[{ name: t('eyebrow'), path: '/actualites' }]} />
      <section className="relative overflow-hidden bg-nova-navy pb-12 pt-32 md:pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,123,198,0.2),transparent_50%)]" />
        <Container>
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-xs uppercase tracking-widest text-white/70">
              {t('eyebrow')}
            </span>
            <h1 className="mt-5 text-white">{t('title')}</h1>
            <p className="mt-4 leading-8 text-white/70">{t('description')}</p>
          </div>
        </Container>
      </section>

      <section className="bg-nova-sand py-12 md:py-20">
        <Container>
          <ActualitesGrid items={getActualites(locale)} />
        </Container>
      </section>
    </>
  );
}
