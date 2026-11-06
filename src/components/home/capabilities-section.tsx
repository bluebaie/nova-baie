import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { CapabilityStudio, type CapabilityPanel } from './capability-studio';

const ids = ['create', 'connect', 'develop'] as const;

export async function CapabilitiesSection() {
  const t = await getTranslations('capabilities');
  const visual = await getTranslations('visual');
  const panels: CapabilityPanel[] = ids.map(id => ({
    id,
    label: t(`${id}.label`),
    mark: t(`${id}.mark`),
    title: t(`${id}.title`),
    description: t(`${id}.description`)
  }));

  return <section className="capabilities-scene surface-dark" id="creative-capabilities" aria-labelledby="capabilities-title" data-creative-scene>
    <svg className="capabilities-topo" viewBox="0 0 1440 180" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-80 135C175 15 305 180 550 78S945 5 1110 78s280 115 440 5" />
      <path d="M-60 155C190 35 330 195 565 97s390-67 555 0 270 100 430 0" />
    </svg>
    <Container>
      <div className="capabilities-masthead" data-reveal>
        <div><p className="eyebrow">{visual('capabilities')}</p><h2 id="capabilities-title">{t('title')}</h2></div>
        <p className="capabilities-note">{t('sceneDescription')}</p>
      </div>
      <CapabilityStudio panels={panels} hint={t('sceneHint')} />
    </Container>
    <svg className="scene-crossing" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 94C255 5 380 132 690 70S1160 18 1440 64" /></svg>
  </section>;
}
