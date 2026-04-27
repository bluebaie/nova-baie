export const metadata = {
  title: 'Contact — Devis gratuit sous 24h',
  description: 'Demandez un devis pour votre site web tourisme. Réponse sous 24h, devis gratuit et sans engagement. Conciergeries, gîtes, hôtels, hébergements.',
  alternates: { canonical: 'https://www.nova-baie.com/contact' },
  openGraph: {
    title: 'Contact — Nova Baie',
    description: 'Demandez un devis pour votre site web tourisme. Réponse sous 24h.',
    url: 'https://www.nova-baie.com/contact',
  },
}

import { Mail, Phone, MapPin } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { ContactForm } from '@/components/contact/contact-form'

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-nova-navy pb-16 pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,123,198,0.15),transparent_50%)]" />
        <Container>
          <div className="relative z-10 max-w-3xl">
          <span className="inline-flex rounded-full border border-white/20 bg-white/[0.08] px-4 py-1.5 text-xs uppercase tracking-widest text-white/70">
            Contact
          </span>
          <h1 className="mt-6 text-balance text-white">Parlons de votre projet</h1>
          <p className="mt-6 max-w-2xl leading-8 text-white/75">
            Devis gratuit, sans engagement. Je vous réponds sous 24h avec une première analyse de votre besoin.
          </p>
        </div>
        </Container>
      </section>

      {/* ── Contenu ── */}
      <section className="bg-nova-sand py-12 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_0.5fr] lg:items-start">

            {/* Colonne gauche — formulaire */}
            <div className="rounded-[1.5rem] border border-nova-navy/6 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-nova-navy">Votre demande</h2>
              <p className="mb-6 mt-2 text-sm text-nova-text">
                Remplissez ce formulaire — je reviens vers vous sous 24h avec une réponse claire.
              </p>
              <ContactForm />
            </div>

            {/* Colonne droite — infos */}
            <div className="flex flex-col gap-4">

              {/* Card 1 — contact direct */}
              <div className="rounded-2xl border border-nova-navy/8 bg-white p-6">
                <p className="mb-4 text-base font-semibold text-nova-navy">Me contacter directement</p>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:contact.novabaie@gmail.com"
                    className="flex items-center gap-3 text-sm text-nova-navy hover:text-nova-blue transition-colors"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-nova-blue" />
                    contact.novabaie@gmail.com
                  </a>
                  <a
                    href="tel:+33763546727"
                    className="flex items-center gap-3 text-sm text-nova-navy hover:text-nova-blue transition-colors"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-nova-blue" />
                    +33 7 63 54 67 27
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-nova-blue" />
                    <span className="text-sm text-nova-text">Baie de Somme, France</span>
                  </div>
                </div>
              </div>

              {/* Card 2 — étapes suivantes */}
              <div className="rounded-2xl bg-nova-navy p-6">
                <p className="mb-4 text-sm font-semibold text-white">Ce qui se passe ensuite</p>
                <div className="flex flex-col gap-2">
                  <p className="text-sm leading-7 text-white/75">01 — Je lis votre demande et analyse votre projet</p>
                  <p className="text-sm leading-7 text-white/75">02 — Je vous recontacte sous 24h</p>
                  <p className="text-sm leading-7 text-white/75">03 — Je vous envoie un devis détaillé sous 48h</p>
                </div>
              </div>

              {/* Card 3 — réassurance */}
              <div className="rounded-xl bg-nova-horizon p-4">
                <p className="text-center text-xs leading-6 text-nova-navy">
                  Réponse sous 24h · Devis gratuit · Sans engagement
                </p>
              </div>

            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
