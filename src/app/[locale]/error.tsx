'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Container } from '@/components/ui/container';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('errors');
  return <section className="bg-nova-sand py-20 pt-40"><Container>
    <h1>{t('title')}</h1><p role="alert" className="mt-5">{t('description')}</p>
    <button type="button" onClick={reset} className="mt-8 rounded-full bg-nova-navy px-6 py-3 text-white">{t('retry')}</button>
    <Link href="/" className="ml-6 text-nova-blue">{t('home')}</Link>
  </Container></section>;
}
