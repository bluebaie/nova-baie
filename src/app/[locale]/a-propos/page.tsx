import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/lib/navigation';
import { PageHero } from '@/components/ui/page-hero';
import { Container } from '@/components/ui/container';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  const base = locale === 'fr' ? 'https://www.nova-baie.com' : 'https://www.nova-baie.com/en';
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `${base}/a-propos` },
    openGraph: { title: t('metaTitle'), description: t('metaDescription'), url: `${base}/a-propos` },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');
  const timeline = t.raw('timeline') as Array<{ label: string; desc: string }>;
  const dnaValues = t.raw('dnaValues') as string[];

  return (
    <>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        description={t('description')}
      />

      {/* Histoire */}
      <section className="bg-white py-12 md:py-20">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-nova-navy/8 bg-nova-sand p-8">
              <span className="inline-flex rounded-full bg-nova-horizon px-4 py-1.5 text-xs uppercase tracking-widest text-nova-navy">
                {t('historyEyebrow')}
              </span>
              <h3 className="mt-5 text-nova-navy">{t('historyTitle')}</h3>
              <p className="mt-4 text-sm leading-8 text-nova-text">{t('historyP1')}</p>
              <p className="mt-4 text-sm leading-8 text-nova-text">{t('historyP2')}</p>
              <div className="mt-6 flex flex-col gap-4">
                {timeline.map((point) => (
                  <div key={point.label} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-nova-blue" />
                    <p className="text-sm leading-7 text-nova-text">
                      <span className="font-medium text-nova-navy">{point.label}</span>
                      {' — '}
                      {point.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-nova-navy p-8 text-white">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-white/70">
                {t('bbEyebrow')}
              </span>
              <h3 className="mt-5 text-white">{t('bbTitle')}</h3>
              <div className="mt-4 flex items-center gap-3">
                <Image
                  src="/images/logo-blue-baie.png"
                  alt="Logo Blue Baie Conciergerie"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <span className="font-semibold text-white">Blue Baie Conciergerie</span>
              </div>
              <p className="mt-4 text-sm leading-8 text-white/75">{t('bbDescription')}</p>
              <div className="mt-6">
                <a
                  href="https://bluebaie.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-nova-navy transition-all duration-200 hover:bg-white/90"
                >
                  {t('bbCta')}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & valeurs */}
      <section className="bg-nova-sand py-12 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[1.5rem] border border-nova-navy/8 bg-white p-8 md:p-10">
              <h2>{t('missionTitle')}</h2>
              <p className="mt-5 text-sm leading-8 text-nova-text">{t('missionP1')}</p>
              <p className="mt-5 text-sm leading-8 text-nova-text">{t('missionP2')}</p>
            </div>
            <div className="rounded-[1.5rem] border border-nova-navy/8 bg-white p-8 md:p-10">
              <h2>{t('dnaTitle')}</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {dnaValues.map((value) => (
                  <span
                    key={value}
                    className="rounded-full border border-nova-navy/10 bg-nova-horizon px-4 py-2 text-sm font-medium text-nova-navy"
                  >
                    {value}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-8 text-nova-text">{t('dnaDescription')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Partenaire */}
      <section className="bg-nova-navy py-10 md:py-16">
        <Container>
          <div className="flex flex-col items-center gap-6">
            <p className="text-sm uppercase tracking-widest text-white/60">{t('partnerLabel')}</p>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo-blue-baie.png"
                alt="Logo Blue Baie Conciergerie"
                width={56}
                height={56}
                className="rounded-full"
              />
              <span className="text-lg font-semibold text-white">Blue Baie Conciergerie</span>
            </div>
            <Link
              href="https://bluebaie.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              {t('partnerLink')}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
