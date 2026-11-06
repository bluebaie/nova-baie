'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/lib/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const t = useTranslations('nav');
  const header = useTranslations('header');
  const visual = useTranslations('visual');
  const navigation = [{ label: t('home'), href: '/' }, { label: t('services'), href: '/services' }, { label: t('realisations'), href: '/realisations' }, { label: t('contact'), href: '/contact' }];
  useEffect(() => { setIsOpen(false); }, [pathname, locale]);
  const links = navigation.map((item, index) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} className="nav-link"><span className="nav-index" aria-hidden="true">0{index + 1}</span>{item.label}</Link>);
  return <header className="site-header surface-dark" onKeyDown={event => { if (event.key === 'Escape') { setIsOpen(false); menuButton.current?.focus(); } }}>
    <Container><div className="header-inner">
      <Link href="/" className="brand"><Image src="/logo-nova-baie.jpg" alt={header('logoAlt')} width={48} height={48} priority /><span className="brand-name" aria-hidden="true">Nova <em>Baie</em></span></Link>
      <nav className="desktop-nav" aria-label={t('label')}>{links}</nav>
      <div className="header-actions"><LanguageSwitcher /><Button href="/contact">{header('requestProject')}</Button></div>
      <button ref={menuButton} type="button" className="menu-toggle" aria-expanded={isOpen} aria-controls={isOpen ? 'mobile-navigation' : undefined} aria-label={isOpen ? header('closeMenu') : header('openMenu')} onClick={() => setIsOpen(!isOpen)}>
        <span aria-hidden="true">{visual(isOpen ? 'close' : 'menu')}</span>{isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
    </div></Container>
    {isOpen && <div id="mobile-navigation" className="mobile-navigation">
      <nav aria-label={t('label')}>{links}</nav>
      <div className="mobile-actions"><LanguageSwitcher /><Button href="/contact" variant="dark">{header('requestProject')}</Button></div>
    </div>}
  </header>;
}
