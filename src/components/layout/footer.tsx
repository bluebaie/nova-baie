import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { company } from "@/lib/site-data";

const footerLinks = [
  { href: "/services", label: "Création de site web tourisme" },
  { href: "/realisations", label: "Nos réalisations" },
  { href: "/a-propos", label: "À propos de Nova Baie" },
  { href: "/contact", label: "Demander un devis" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

export function Footer() {
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
            <p className="mt-4 max-w-xl">{company.footerText}</p>
            <p className="mt-6 text-sm text-nova-text">
              {company.descriptor}
            </p>
          </div>

          <nav aria-label="Liens du site">
            <h3 className="text-sm font-semibold text-nova-navy">Nova Baie</h3>
            <div className="mt-3 grid gap-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-nova-text hover:text-nova-navy"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      <div className="border-t border-nova-navy/10 py-4 text-center text-xs text-nova-text/50">
          © {new Date().getFullYear()} Nova Baie — Tous droits réservés
        </div>
      </Container>
    </footer>
  );
}
