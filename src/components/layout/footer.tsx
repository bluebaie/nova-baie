import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/lib/navigation'
import { Container } from '@/components/ui/container'
import { SocialLinks } from '@/components/ui/social-links'
import { company } from '@/lib/site-data'

export async function Footer() {
  const t = await getTranslations('footer')

  const footerLinks = [
    { href: '/services' as const, label: t('links.services') },
    { href: '/realisations' as const, label: t('links.realisations') },
    { href: '/a-propos' as const, label: t('links.about') },
    { href: '/contact' as const, label: t('links.contact') },
    { href: '/mentions-legales' as const, label: t('links.mentions') },
  ]

  return (
    <footer className="mt-20 border-t border-nova-navy/10 bg-white">
      <Container>
        <div className="grid gap-12 py-14 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-nova-navy">
                <Image
                  src="/logo-nova-baie.jpg"
                  alt="Nova Baie - Agence web création sites tourisme"
                  fill
                  sizes="(max-width: 768px) 32px, 36px"
                  className="object-contain"
                />
              </div>
              <span className="text-base font-semibold text-nova-navy">{company.name}</span>
            </div>
            <p className="mt-4 max-w-xl">{t('description')}</p>
            <p className="mt-6 text-sm text-nova-text">{company.descriptor}</p>
            <div className="mt-6">
              <SocialLinks variant="footer" />
            </div>
          </div>

          <nav aria-label="Liens du site">
            <h3 className="text-sm font-semibold text-nova-navy">{t('linksTitle')}</h3>
            <div className="mt-3 grid gap-3">
              {footerLinks.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-nova-text hover:text-nova-navy">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="border-t border-nova-navy/10 py-4 text-center text-xs text-nova-text/50">
          {t('copyright', { year: new Date().getFullYear() })}
        </div>
      </Container>
    </footer>
  )
}
