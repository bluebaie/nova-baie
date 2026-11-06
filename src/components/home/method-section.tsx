import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { HorizonMark } from '@/components/ui/horizon-mark';
import { processIds } from '@/lib/expertises';

export async function MethodSection() {
  const t = await getTranslations('method');
  return <section className="section-padding" aria-labelledby="method-title"><Container><div className="method-layout">
    <div className="method-heading" data-reveal><p className="eyebrow">{t('eyebrow')}</p><h2 id="method-title">{t('title')}</h2><p>{t('description')}</p><div className="method-symbol"><HorizonMark /></div></div>
    <ol>{processIds.map((id, index) => <li key={id} className="method-step" data-reveal><span aria-hidden="true">0{index + 1}</span><div><h3>{t(`steps.${id}.title`)}</h3><p>{t(`steps.${id}.description`)}</p></div></li>)}</ol>
  </div></Container></section>;
}
