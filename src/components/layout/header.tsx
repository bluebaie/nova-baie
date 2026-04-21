"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="glass-header fixed inset-x-0 top-0 z-50">
      <Container>
        <div className="flex h-24 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-nova-navy">
              <Image
                src="/logo-nova-baie.jpg"
                alt="Nova Baie - Agence web création sites tourisme"
                fill
                sizes="36px"
                priority
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold tracking-tight text-nova-navy">
              Nova Baie
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative pb-1 text-sm transition-colors"
                >
                  <span
                    className={cn(
                      "transition-colors duration-200",
                      active ? "text-nova-navy" : "text-nova-text group-hover:text-nova-navy"
                    )}
                  >
                    {item.label}
                  </span>

                  <span
                    className={cn(
                      "absolute left-0 -bottom-0.5 h-[1.5px] bg-gradient-to-r from-nova-blue to-nova-navy transition-all duration-300",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Button href="/contact">Demander un site</Button>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-nova-navy/10 p-3 text-nova-navy transition hover:bg-nova-horizon md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {isOpen && (
        <div className="border-t border-nova-navy/10 bg-white md:hidden">
          <Container>
            <div className="flex flex-col gap-2 py-6">
              {navigation.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm text-nova-text transition-colors hover:bg-nova-horizon hover:text-nova-navy",
                      active && "bg-nova-horizon text-nova-navy"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="pt-3">
                <Button href="/contact" className="w-full">
                  Demander un site
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}