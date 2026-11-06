import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { processIds } from '@/lib/expertises';
import { MethodJourney, type JourneyStep } from './method-journey';

export async function MethodSection() {
  const t = await getTranslations('method');
  const visual = await getTranslations('visual');
  const steps: JourneyStep[] = processIds.map((id, index) => ({
    id, title: t(`steps.${id}.title`), description: t(`steps.${id}.description`), index: index + 1
  }));
  return <section className="method-scene" aria-labelledby="method-title" id="creative-method" data-creative-scene>
    <Container>
      <div className="method-intro" data-reveal><div><p className="eyebrow">{t('eyebrow')}</p><h2 id="method-title">{t('title')}</h2></div><p>{t('description')}</p></div>
      <MethodJourney steps={steps} routeLabel={t('routeLabel')} start={t('routeStart')} end={t('routeEnd')} hint={visual('journeyHint')} />
    </Container>
  </section>;
}
