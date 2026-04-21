'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const MAKE_WEBHOOK_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL || ''

const inputClass =
  'w-full rounded-xl border border-nova-navy/15 bg-white px-4 py-3 text-sm text-nova-navy placeholder:text-nova-text/40 focus:outline-none focus:ring-2 focus:ring-nova-blue/20 focus:border-nova-blue/40 transition-all duration-200'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [structure, setStructure] = useState('')
  const [typeProjet, setTypeProjet] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!MAKE_WEBHOOK_URL) { setStatus('error'); return }
    setStatus('loading')
    try {
      await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom, email, telephone, structure, typeProjet, message,
          source: 'Site Nova Baie',
          date: new Date().toISOString()
        })
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-8 text-center">
        <CheckCircle className="mx-auto h-10 w-10 text-green-500" />
        <h3 className="mt-4 font-semibold text-nova-navy">Message envoyé !</h3>
        <p className="mt-2 text-sm text-nova-text">
          Je vous réponds sous 24h à l&apos;adresse {email}. En attendant, n&apos;hésitez pas à consulter les offres.
        </p>
        <Link
          href="/services"
          className="mt-6 inline-block text-sm font-medium text-nova-blue"
        >
          Voir les offres →
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-nova-navy">
            Nom <span className="text-nova-blue">*</span>
          </label>
          <input
            type="text"
            required
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Votre nom"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-nova-navy">
            Email <span className="text-nova-blue">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-nova-navy">
            Téléphone
          </label>
          <input
            type="tel"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            placeholder="+33 6 00 00 00 00"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-nova-navy">
            Structure
          </label>
          <input
            type="text"
            value={structure}
            onChange={(e) => setStructure(e.target.value)}
            placeholder="Nom de votre hébergement ou structure"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-nova-navy">
          Type de projet <span className="text-nova-blue">*</span>
        </label>
        <select
          required
          value={typeProjet}
          onChange={(e) => setTypeProjet(e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>Choisir une offre...</option>
          <option>Site Présence — à partir de 800€</option>
          <option>Site Conversion — à partir de 1 500€</option>
          <option>Site Acquisition — à partir de 3 000€</option>
          <option>Maintenance uniquement</option>
          <option>Je ne sais pas encore — besoin de conseils</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-nova-navy">
          Message <span className="text-nova-blue">*</span>
        </label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Décrivez votre structure, votre projet et vos objectifs..."
          className={`${inputClass} min-h-[120px] resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-2 w-full cursor-pointer rounded-full bg-nova-navy py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-nova-blue disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'loading' ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Envoi en cours...
          </span>
        ) : (
          'Envoyer ma demande'
        )}
      </button>

      {status === 'error' && (
        <p className="mt-1 text-xs text-red-500/80">
          Une erreur est survenue. Écrivez-nous directement à{' '}
          <a href="mailto:contact.novabaie@gmail.com" className="underline">
            contact.novabaie@gmail.com
          </a>
        </p>
      )}
    </form>
  )
}
