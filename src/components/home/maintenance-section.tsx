import Link from "next/link";
import { Container } from "@/components/ui/container";

export function MaintenanceSection() {
  return (
    <section className="border-t border-nova-blue/15 bg-nova-horizon py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-nova-horizon px-4 py-1.5 text-xs uppercase tracking-widest text-nova-navy">
            Après la livraison
          </span>
          <h2 className="mt-5 text-nova-navy">
            Votre site livré, suivi et maintenu
          </h2>
          <p className="mt-4 text-sm leading-8 text-nova-text">
            Chaque projet inclut un accompagnement post-lancement. On reste disponibles après la mise en ligne.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-nova-navy px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
            >
              Parlons de votre projet
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
