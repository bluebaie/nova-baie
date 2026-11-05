import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { processIds } from '@/lib/expertises';

export async function MethodSection() {
  const t = await getTranslations('method');
  return <section className="section-padding bg-nova-navy" aria-labelledby="method-title"><Container>
    <p className="text-sm uppercase tracking-widest text-white/80">{t('eyebrow')}</p>
    <h2 id="method-title" className="mt-4 text-white">{t('title')}</h2>
    <p className="mt-5 max-w-3xl text-white/85">{t('description')}</p>
    <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {processIds.map((id, index) => <li key={id} className="rounded-2xl border border-white/15 p-5">
        <span className="font-mono text-sm text-white/70" aria-hidden="true">0{index + 1}</span>
        <h3 className="mt-2 text-lg text-white">{t(`steps.${id}.title`)}</h3>
        <p className="mt-2 text-sm leading-7 text-white/85">{t(`steps.${id}.description`)}</p>
      </li>)}
    </ol>
  </Container></section>;
}
