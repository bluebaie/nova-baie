import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export async function FinalCtaSection() {
  const t = await getTranslations('finalCta');
  return <section className="section-padding"><Container>
    <div className="rounded-[2rem] bg-nova-navy p-8 md:p-12">
      <p className="text-xs uppercase tracking-widest text-white/80">{t('eyebrow')}</p>
      <h2 className="mt-4 max-w-3xl text-white">{t('title')}</h2>
      <p className="mb-8 mt-5 max-w-2xl text-white/90">{t('description')}</p>
      <Button href="/contact" variant="light">{t('cta')}</Button>
    </div>
  </Container></section>;
}
