import Link from "next/link";
import { Container } from "@/components/ui/container";

const plans = [
  {
    price: "29€",
    name: "Maintenance Essentielle",
    desc: "Mises à jour + 1 modif/mois",
    featured: false,
  },
  {
    price: "59€",
    name: "Maintenance Confort",
    desc: "Modifications + rapport perf.",
    featured: true,
    badge: "Le plus choisi",
  },
  {
    price: "99€",
    name: "Maintenance Active",
    desc: "Modifications illimitées + SEO",
    featured: false,
  },
];

export function MaintenanceSection() {
  return (
    <section className="border-t border-nova-navy/6 bg-white py-12 md:py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">

          {/* Gauche */}
          <div>
            <span className="inline-flex rounded-full bg-nova-horizon px-4 py-1.5 text-xs uppercase tracking-widest text-nova-navy">
              Après la livraison
            </span>
            <h2 className="mt-5 text-nova-navy">
              Votre site reste suivi et performant
            </h2>
            <p className="mt-4 text-sm leading-8 text-nova-text">
              Chaque site Nova Baie inclut 3 mois de maintenance offerts. À l&apos;issue,
              vous choisissez librement de continuer avec un forfait mensuel — la plupart
              de nos clients le font, parce que ça leur évite de s&apos;en préoccuper.
            </p>
            <p className="mt-4 text-xs italic text-nova-text/60">
              Hébergement, nom de domaine, mises à jour : on gère si vous voulez.
            </p>
          </div>

          {/* Droite */}
          <div className="flex flex-col gap-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={[
                  "flex items-center gap-4 rounded-xl border px-5 py-4",
                  plan.featured
                    ? "border-transparent bg-nova-navy"
                    : "border-nova-navy/6 bg-nova-sand",
                ].join(" ")}
              >
                <span
                  className={[
                    "shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold",
                    plan.featured
                      ? "bg-nova-blue/20 text-white"
                      : "bg-nova-horizon text-nova-navy",
                  ].join(" ")}
                >
                  {plan.price}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium ${
                        plan.featured ? "text-white" : "text-nova-navy"
                      }`}
                    >
                      {plan.name}
                    </span>
                    {plan.featured && plan.badge && (
                      <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white/70">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-0.5 text-xs ${
                      plan.featured ? "text-white/70" : "text-nova-text"
                    }`}
                  >
                    {plan.desc}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-1">
              <Link
                href="/services"
                className="text-sm font-medium text-nova-blue transition-colors hover:text-nova-navy"
              >
                Voir tous les forfaits →
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
