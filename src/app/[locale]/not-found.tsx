import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import { Container } from '@/components/ui/container';

export default async function NotFound() {
  const t = await getTranslations('errors');
  return <section className="bg-nova-sand py-20 pt-40"><Container>
    <p className="text-nova-blue">404</p>
    <h1 className="mt-4">{t('notFoundTitle')}</h1>
    <p className="mt-5">{t('notFoundDescription')}</p>
    <Link href="/" className="mt-8 inline-flex rounded-full bg-nova-navy px-6 py-3 text-white">{t('home')}</Link>
  </Container></section>;
}
