import Link from "next/link";
import { Container } from "@/components/ui/container";
import { company, navigation } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-nova-navy/10 bg-white">
      <Container>
        <div className="grid gap-12 py-14 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="text-lg font-semibold text-nova-navy">{company.name}</div>
            <p className="mt-4 max-w-xl">{company.footerText}</p>
            <p className="mt-6 text-sm text-nova-text">
              {company.descriptor}
            </p>
          </div>

          <div className="grid gap-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-nova-text hover:text-nova-navy"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}