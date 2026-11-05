import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import { Container } from '@/components/ui/container';

export async function AboutLinkSection() {
  const t = await getTranslations('aboutLink');
  return <section className="section-padding bg-white"><Container>
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-widest text-nova-blue">{t('eyebrow')}</p>
      <h2 className="mt-4">{t('title')}</h2>
      <p className="mt-5">{t('description')}</p>
      <Link href="/a-propos" className="mt-5 inline-block text-sm font-medium text-nova-blue">{t('cta')} →</Link>
    </div>
  </Container></section>;
}
