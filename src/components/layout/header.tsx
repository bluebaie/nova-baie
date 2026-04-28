'use client'

import Image from 'next/image'
import { usePathname } from '@/lib/navigation'
import { Link } from '@/lib/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { SocialLinks } from '@/components/ui/social-links'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('nav')
  const tHeader = useTranslations('header')

  const navigation = [
    { label: t('home'), href: '/' },
    { label: t('services'), href: '/services' },
    { label: t('realisations'), href: '/realisations' },
    { label: t('actualites'), href: '/actualites' },
    { label: t('about'), href: '/a-propos' },
    { label: t('contact'), href: '/contact' },
  ]

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="glass-header fixed inset-x-0 top-0 z-50">
      <Container>
        <div className="flex h-24 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-nova-navy">
              <Image
                src="/logo-nova-baie.jpg"
                alt="Nova Baie - Agence web création sites tourisme"
                fill
                sizes="36px"
                priority
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight text-nova-navy">Nova Baie</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative pb-1 text-sm transition-colors"
                >
                  <span className={cn('transition-colors duration-200', active ? 'text-nova-navy' : 'text-nova-text group-hover:text-nova-navy')}>
                    {item.label}
                  </span>
                  <span className={cn('absolute left-0 -bottom-0.5 h-[1.5px] bg-gradient-to-r from-nova-blue to-nova-navy transition-all duration-300', active ? 'w-full' : 'w-0 group-hover:w-full')} />
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <SocialLinks variant="header" />
            <span className="h-5 w-px bg-nova-navy/15" aria-hidden="true" />
            <LanguageSwitcher />
            <Button href="/contact">{tHeader('requestSite')}</Button>
          </div>

          <button
            type="button"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-nova-navy/10 p-3 text-nova-navy transition hover:bg-nova-horizon md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {isOpen && (
        <div className="border-t border-nova-navy/10 bg-white md:hidden">
          <Container>
            <div className="flex flex-col gap-2 py-6">
              {navigation.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'rounded-xl px-4 py-3 text-sm text-nova-text transition-colors hover:bg-nova-horizon hover:text-nova-navy',
                      active && 'bg-nova-horizon text-nova-navy'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <div className="flex items-center gap-3 pt-3">
                <LanguageSwitcher />
              </div>
              <div className="pt-1">
                <Button href="/contact" className="w-full">{tHeader('requestSite')}</Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
