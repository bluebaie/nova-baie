import { getTranslations } from 'next-intl/server';
import { Container } from './container';
import { Button } from './button';
import { HorizonMark } from './horizon-mark';

export async function PageHero({ eyebrow, title, description, actions = true, expertisesLink = true }: {
  eyebrow: string; title: string; description: string; actions?: boolean; expertisesLink?: boolean;
}) {
  const t = await getTranslations('common');
  return <section className="page-hero surface-dark">
    <div className="page-hero-ornament"><HorizonMark /></div>
    <Container>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-hero-description">{description}</p>
      {actions && <div className="hero-actions">
        <Button href="/contact">{t('talkProject')}</Button>
        {expertisesLink && <Button href="/services" variant="secondary">{t('seeExpertises')}</Button>}
      </div>}
    </Container>
  </section>;
}
