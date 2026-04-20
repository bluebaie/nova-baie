import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { company } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        description="Que vous lanciez une activité, que vous souhaitiez monter en gamme ou refondre une présence existante, Nova Baie peut vous aider à construire un site plus juste, plus premium et plus efficace."
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-8 md:grid-cols-[1fr_0.85fr]">
            <form className="card-premium p-8 md:p-10">
              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-nova-navy">
                    Nom
                  </label>
                  <input className="w-full rounded-xl border border-nova-navy/10 bg-white px-4 py-3 outline-none focus:border-nova-blue" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-nova-navy">
                    Email
                  </label>
                  <input type="email" className="w-full rounded-xl border border-nova-navy/10 bg-white px-4 py-3 outline-none focus:border-nova-blue" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-nova-navy">
                    Structure
                  </label>
                  <input className="w-full rounded-xl border border-nova-navy/10 bg-white px-4 py-3 outline-none focus:border-nova-blue" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-nova-navy">
                    Type de projet
                  </label>
                  <select className="w-full rounded-xl border border-nova-navy/10 bg-white px-4 py-3 outline-none focus:border-nova-blue">
                    <option>Site Essentiel</option>
                    <option>Site Signature</option>
                    <option>Site Performance</option>
                    <option>Je ne sais pas encore</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-nova-navy">
                    Message
                  </label>
                  <textarea rows={6} className="w-full rounded-xl border border-nova-navy/10 bg-white px-4 py-3 outline-none focus:border-nova-blue" />
                </div>

                <div>
                  <Button href="#">Envoyer la demande</Button>
                </div>
              </div>
            </form>

            <div className="card-premium p-8 md:p-10">
              <h2>Contact direct</h2>
              <p className="mt-5">
                Vous pouvez aussi prendre contact directement pour présenter votre
                structure, votre projet ou votre besoin de refonte.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-nova-text">Email</p>
                  <p className="mt-2 text-lg text-nova-navy">{company.email}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-nova-text">Téléphone</p>
                  <p className="mt-2 text-lg text-nova-navy">{company.phone}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-nova-text">Base</p>
                  <p className="mt-2 text-lg text-nova-navy">{company.baseLocation}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}