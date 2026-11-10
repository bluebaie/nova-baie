import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/lib/navigation';
import { Container } from '@/components/ui/container';
import { SocialLinks } from '@/components/ui/social-links';
import { ConsentSettingsButton } from '@/components/consent/consent-manager';

export async function Footer() {
  const t = await getTranslations('footer');
  const visual = await getTranslations('visual');
  const links = [{ href: '/services', label: 'services' }, { href: '/realisations', label: 'realisations' }, { href: '/contact', label: 'contact' }, { href: '/a-propos', label: 'about' }, { href: '/actualites', label: 'actualites' }, { href: '/mentions-legales', label: 'mentions' }, { href: '/mentions-legales#confidentialite', label: 'privacy' }];
  return <footer className="site-footer surface-dark"><Container>
    <div className="footer-top">
      <div><Link href="/" className="brand"><Image src="/logo-nova-baie.jpg" alt="Nova Baie" width={48} height={48} /><span className="brand-name" aria-hidden="true">Nova <em>Baie</em></span></Link>
        <p className="footer-description">{t('description')}</p><p className="footer-descriptor">{t('descriptor')}</p><div className="mt-6"><SocialLinks variant="footer" /></div>
      </div>
      <nav className="footer-nav" aria-label={t('linksTitle')}><h2>{t('linksTitle')}</h2><div className="footer-links">{links.map(link => <Link key={link.label} href={link.href}>{t(`links.${link.label}`)}</Link>)}<ConsentSettingsButton label={t('links.cookies')} /></div></nav>
    </div>
    <div className="footer-wordmark" aria-hidden="true">Nova Baie<span style={{ color: 'var(--gold)' }}>.</span></div>
    <div className="footer-bottom"><span>{t('copyright', { year: new Date().getFullYear() })}</span><span>{visual('location')}</span></div>
  </Container></footer>;
}
