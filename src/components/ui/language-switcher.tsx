'use client'

import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/lib/navigation'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'

export function LanguageSwitcher() {
  const t = useTranslations('lang')
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  const [isPending, startTransition] = useTransition()

  const currentLocale = (params.locale as string) ?? 'fr'
  const nextLocale = currentLocale === 'fr' ? 'en' : 'fr'

  const handleSwitch = () => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <button
      type="button"
      onClick={handleSwitch}
      disabled={isPending}
      className="flex h-8 items-center rounded-full border border-nova-navy/15 px-3 text-xs font-medium text-nova-navy/60 transition-all duration-200 hover:border-nova-navy/30 hover:text-nova-navy disabled:opacity-50"
      aria-label={t('switchTo')}
    >
      {nextLocale === 'en' ? t('en') : t('fr')}
    </button>
  )
}
