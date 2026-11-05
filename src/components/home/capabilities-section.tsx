import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Link } from '@/lib/navigation';
import { capabilityGroups } from '@/lib/expertises';

export async function CapabilitiesSection() {
  const t = await getTranslations('capabilities');
  return <section className="section-padding bg-white" aria-labelledby="capabilities-title"><Container>
    <h2 id="capabilities-title">{t('title')}</h2>
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {capabilityGroups.map((id, index) => <article key={id} className="card-premium p-6">
        <span className="font-mono text-sm text-nova-blue" aria-hidden="true">0{index + 1}</span>
        <h3 className="mt-3 text-xl">{t(`${id}.title`)}</h3>
        <p className="mt-3 text-sm leading-7">{t(`${id}.description`)}</p>
      </article>)}
    </div>
    <Link href="/services" className="mt-6 inline-block text-sm font-medium text-nova-blue">{t('cta')} →</Link>
  </Container></section>;
}
