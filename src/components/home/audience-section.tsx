import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/navigation';

// Sectors Nova Baie works for. A case study link is shown only where a published one exists.
const audiences = [
  { id: 'tourism', href: '/realisations/gites-en-baie' },
  { id: 'realestate', href: '/realisations/blue-baie-conciergerie' },
  { id: 'clubs', href: '/realisations/cyclosport-crotellois' },
  { id: 'crafts' },
  { id: 'smb' },
  { id: 'brands' }
] as const;

export async function AudienceSection() {
  const t = await getTranslations('audiences');
  return <section className="audience-section" aria-labelledby="audience-title">
    <svg className="audience-orbit" viewBox="0 0 1200 600" fill="none" aria-hidden="true"><ellipse cx="600" cy="300" rx="560" ry="210" transform="rotate(-8 600 300)" /><path d="M-20 470C230 330 420 560 690 420S1010 180 1220 250" /></svg>
    <Container>
      <div className="audience-layout">
        <div className="audience-intro" data-reveal>
          <p className="eyebrow">{t('eyebrow')}</p>
          <h2 id="audience-title">{t('title')}</h2>
          <p>{t('description')}</p>
          <Button href="/contact" variant="dark">{t('cta')}</Button>
        </div>
        <ol className="audience-list">
          {audiences.map((audience, index) => <li key={audience.id} className="audience-item" data-reveal>
            <span className="audience-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h3>{t(`items.${audience.id}.title`)}</h3>
            <p>{t(`items.${audience.id}.description`)}</p>
            {'href' in audience && <Link href={audience.href} className="audience-link">{t('see')}<ArrowUpRight aria-hidden="true" /></Link>}
          </li>)}
        </ol>
      </div>
    </Container>
  </section>;
}
