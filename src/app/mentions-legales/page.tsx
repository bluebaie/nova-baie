export const metadata = {
  title: 'Mentions légales — Nova Baie',
  description: 'Informations légales relatives au site nova-baie.com : éditeur, hébergement, propriété intellectuelle, données personnelles et cookies.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.nova-baie.com/mentions-legales' }
}

import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";

const sections = [
  {
    title: "Éditeur du site",
    content:
      "Nova Baie — [Forme juridique à compléter] — SIRET : [à compléter] — Adresse : [à compléter] — Email : contact.novabaie@gmail.com",
  },
  {
    title: "Hébergement",
    content:
      "Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.",
  },
  {
    title: "Propriété intellectuelle",
    content:
      "L'ensemble des contenus présents sur ce site (textes, visuels, logo) sont la propriété exclusive de Nova Baie. Toute reproduction est interdite sans autorisation préalable.",
  },
  {
    title: "Données personnelles",
    content:
      "Les informations collectées via le formulaire de contact sont utilisées uniquement pour répondre à votre demande. Elles ne sont pas transmises à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de modification et de suppression de vos données.",
  },
  {
    title: "Cookies",
    content:
      "Ce site n'utilise pas de cookies publicitaires. Des cookies techniques peuvent être utilisés pour le bon fonctionnement du site.",
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Légal"
        title="Mentions légales"
        description="Informations légales relatives au site nova-baie.com et à son éditeur."
      />

      <section className="py-12 md:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="mt-10 mb-3 font-semibold text-nova-navy">
                  {section.title}
                </h3>
                <p className="text-sm leading-8 text-nova-text">{section.content}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
