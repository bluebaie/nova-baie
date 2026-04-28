import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { ContactForm } from '@/components/contact/contact-form';
import { company } from '@/lib/site-data';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const base = locale === 'fr' ? 'https://www.nova-baie.com' : 'https://www.nova-baie.com/en';
  return {
    title: `${t('title')} — Nova Baie`,
    description: t('description'),
    alternates: { canonical: `${base}/contact` },
    openGraph: { title: t('title'), description: t('description'), url: `${base}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-nova-navy pb-16 pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,123,198,0.15),transparent_50%)]" />
        <Container>
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-xs uppercase tracking-widest text-white/70">
              {t('eyebrow')}
            </span>
            <h1 className="mt-6 text-balance text-white">{t('title')}</h1>
            <p className="mt-6 max-w-2xl leading-8 text-white/75">{t('description')}</p>
          </div>
        </Container>
      </section>

      {/* Contenu */}
      <section className="bg-nova-sand py-12 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_0.5fr] lg:items-start">
            {/* Formulaire */}
            <div className="rounded-[1.5rem] border border-nova-navy/6 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-nova-navy">{t('form.title')}</h2>
              <p className="mb-6 mt-2 text-sm text-nova-text">{t('form.subtitle')}</p>
              <ContactForm />
            </div>

            {/* Infos */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-nova-navy/8 bg-white p-6">
                <p className="mb-4 text-base font-semibold text-nova-navy">{t('info.title')}</p>
                <div className="flex flex-col gap-3">
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center gap-3 text-sm text-nova-navy transition-colors hover:text-nova-blue"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-nova-blue" />
                    {company.email}
                  </a>
                  <a
                    href={`tel:${company.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-sm text-nova-navy transition-colors hover:text-nova-blue"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-nova-blue" />
                    {company.phone}
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-nova-blue" />
                    <span className="text-sm text-nova-text">{t('info.location')}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-nova-navy p-6">
                <p className="mb-4 text-sm font-semibold text-white">{t('info.nextSteps')}</p>
                <div className="flex flex-col gap-2">
                  <p className="text-sm leading-7 text-white/75">{t('info.step1')}</p>
                  <p className="text-sm leading-7 text-white/75">{t('info.step2')}</p>
                  <p className="text-sm leading-7 text-white/75">{t('info.step3')}</p>
                </div>
              </div>

              <div className="rounded-xl bg-nova-horizon p-4">
                <p className="text-center text-xs leading-6 text-nova-navy">{t('info.reassurance')}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
