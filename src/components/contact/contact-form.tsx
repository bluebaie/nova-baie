'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import { CheckCircle } from 'lucide-react'

import { submitContact } from '@/lib/contact/submit'
import { CONTACT_LIMITS } from '@/lib/contact/validation'

const inputClass =
  'w-full rounded-xl border border-nova-navy/15 bg-white px-4 py-3 text-sm text-nova-navy placeholder:text-nova-text/40 focus:outline-none focus:ring-2 focus:ring-nova-blue/20 focus:border-nova-blue/40 transition-all duration-200'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const t = useTranslations('contact.form')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [structure, setStructure] = useState('')
  const [typeProjet, setTypeProjet] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [website, setWebsite] = useState('')
  const busy = useRef(false)
  const statusRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus()
  }, [status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (busy.current) return
    busy.current = true
    setStatus('loading')
    try {
      await submitContact({ nom, email, telephone, structure, typeProjet, message, website })
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      busy.current = false
    }
  }

  if (status === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="py-8 text-center">
        <CheckCircle className="mx-auto h-10 w-10 text-green-500" />
        <h3 className="mt-4 font-semibold text-nova-navy">{t('successTitle')}</h3>
        <p className="mt-2 text-sm text-nova-text">{t('successDescription', { email })}</p>
        <Link href="/services" className="mt-6 inline-block text-sm font-medium text-nova-blue">
          {t('successCta')}
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={status === 'loading'} className="flex flex-col gap-4">
      <div hidden aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-nom" className="mb-1.5 block text-xs font-medium text-nova-navy">
            {t('name')} <span className="text-nova-blue">*</span>
          </label>
          <input id="contact-nom" name="nom" autoComplete="name" maxLength={CONTACT_LIMITS.nom} type="text" required value={nom} onChange={(e) => setNom(e.target.value)} placeholder={t('namePlaceholder')} className={inputClass} />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-nova-navy">
            {t('email')} <span className="text-nova-blue">*</span>
          </label>
          <input id="contact-email" name="email" autoComplete="email" maxLength={CONTACT_LIMITS.email} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('emailPlaceholder')} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-telephone" className="mb-1.5 block text-xs font-medium text-nova-navy">{t('phone')}</label>
          <input id="contact-telephone" name="telephone" autoComplete="tel" maxLength={CONTACT_LIMITS.telephone} type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder={t('phonePlaceholder')} className={inputClass} />
        </div>
        <div>
          <label htmlFor="contact-structure" className="mb-1.5 block text-xs font-medium text-nova-navy">{t('structure')}</label>
          <input id="contact-structure" name="structure" autoComplete="organization" maxLength={CONTACT_LIMITS.structure} type="text" value={structure} onChange={(e) => setStructure(e.target.value)} placeholder={t('structurePlaceholder')} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-type" className="mb-1.5 block text-xs font-medium text-nova-navy">
          {t('projectType')} <span className="text-nova-blue">*</span>
        </label>
        <select id="contact-type" name="typeProjet" required value={typeProjet} onChange={(e) => setTypeProjet(e.target.value)} className={inputClass}>
          <option value="">{t('projectTypePlaceholder')}</option>
          <option value="presence">{t('options.presence')}</option>
          <option value="conversion">{t('options.conversion')}</option>
          <option value="acquisition">{t('options.acquisition')}</option>
          <option value="maintenance">{t('options.maintenance')}</option>
          <option value="conseil">{t('options.conseil')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-nova-navy">
          {t('message')} <span className="text-nova-blue">*</span>
        </label>
        <textarea id="contact-message" name="message" maxLength={CONTACT_LIMITS.message} required value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t('messagePlaceholder')} className={`${inputClass} min-h-[120px] resize-y`} />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-2 w-full cursor-pointer rounded-full bg-nova-navy py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-nova-blue disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            {t('sending')}
          </span>
        ) : t('submit')}
      </button>

      <div ref={statusRef} tabIndex={-1} role="alert" aria-live="assertive">
      {status === 'error' && (
        <p className="mt-1 text-xs text-red-700">
          {t('error')}{' '}
          <a href="mailto:contact.novabaie@gmail.com" className="underline">
            contact.novabaie@gmail.com
          </a>
        </p>
      )}
      </div>
    </form>
  )
}
