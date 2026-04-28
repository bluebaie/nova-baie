"use client";

import Image from "next/image";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

type Demo = {
  id: string;
  label: string;
  subtitle: string;
  domain: string;
  video?: string;
  image?: string;
};

const demos: Demo[] = [
  {
    id: "gites",
    label: "Gîtes en Baie",
    subtitle: "Site vitrine multi-hébergements en Baie de Somme",
    domain: "gite-baie.com",
    video: "/videos/gites-en-baie-demo.mp4",
  },
  {
    id: "sainte-foy",
    label: "Sainte-Foy",
    subtitle: "Site vitrine hébergement montagne / location saisonnière",
    domain: "ski-saintefoy.com",
    video: "/videos/sainte-foy-demo.mp4",
  },
  {
    id: "le-bout-du-monde",
    label: "Le Bout du Monde",
    subtitle: "Deux gîtes d'exception en Baie de Somme",
    domain: "le-bout-du-monde.org",
    image: "/images/realisation-le-bout-du-monde.jpg",
  },
];

export function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % demos.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative isolate mx-auto w-full max-w-[680px]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-8 -z-10 blur-3xl bg-[radial-gradient(circle_at_50%_50%,rgba(46,123,198,0.25),transparent_70%)]" />

      {/* MacBook mockup */}
      <div className="relative" style={{ filter: "drop-shadow(0 40px 80px rgba(10,22,40,0.6))" }}>

        {/* ── Screen lid ── */}
        <div
          className="overflow-hidden rounded-[1.6rem]"
          style={{ background: "linear-gradient(160deg,#3e3e40,#28282a)", padding: "3px" }}
        >
          {/* Black bezel */}
          <div className="overflow-hidden rounded-[1.35rem] bg-[#080808]">

            {/* macOS title bar */}
            <div className="flex items-center gap-[6px] bg-[#1c1c1e] px-4 py-[10px]">
              {/* Traffic lights */}
              <span className="h-[11px] w-[11px] rounded-full bg-[#FF5F57] shadow-[0_0_5px_rgba(255,95,87,0.5)]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#FFBD2E] shadow-[0_0_5px_rgba(255,189,46,0.4)]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#28C840] shadow-[0_0_5px_rgba(40,200,64,0.4)]" />

              {/* URL bar */}
              <div className="ml-3 flex flex-1 justify-center">
                <div className="flex items-center gap-1.5 rounded-md bg-[#2c2c2e] px-3 py-[3px] text-[11px] text-white/40">
                  <Globe className="h-2.5 w-2.5 shrink-0" strokeWidth={1.5} />
                  {demos[activeIndex].domain}
                </div>
              </div>
            </div>

            {/* Screen content */}
            <div className="relative aspect-[16/10] overflow-hidden bg-nova-navy">
              {demos.map((demo, index) => (
                <div
                  key={demo.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    activeIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {demo.video && (
                    <video
                      className="h-full w-full object-cover"
                      src={demo.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  )}
                  {demo.image && (
                    <Image
                      src={demo.image}
                      alt={demo.label}
                      fill
                      sizes="680px"
                      className="object-cover object-top"
                    />
                  )}
                </div>
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-nova-navy/55 via-transparent to-transparent" />

              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                Sites déjà réalisés
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-xl border border-white/15 bg-nova-navy/60 p-4 backdrop-blur-md">
                  <p className="text-sm font-semibold text-white">
                    {demos[activeIndex].label}
                  </p>
                  <p className="mt-0.5 text-sm text-white/75">
                    {demos[activeIndex].subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Hinge ── */}
        <div
          className="mx-3"
          style={{
            height: "4px",
            background: "linear-gradient(to bottom, #4a4a4c, #2c2c2e)",
          }}
        />

        {/* ── Aluminum base ── */}
        <div
          className="relative overflow-hidden rounded-b-[1.6rem]"
          style={{
            height: "44px",
            background: "linear-gradient(to bottom, #c0c0c2 0%, #a0a0a2 50%, #8c8c8e 100%)",
          }}
        >
          {/* Top sheen */}
          <div className="absolute inset-x-0 top-0 h-px bg-white/40" />

          {/* Trackpad */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[5px]"
            style={{
              width: "80px",
              height: "24px",
              background: "rgba(160,160,162,0.5)",
              border: "1px solid rgba(120,120,122,0.55)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.12)",
            }}
          />
        </div>
      </div>

      {/* Slide selector buttons */}
      <div className="mt-5 flex flex-wrap gap-3">
        {demos.map((demo, index) => (
          <button
            key={demo.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeIndex === index
                ? "border-white/20 bg-white text-nova-navy"
                : "border-white/20 bg-white/8 text-white hover:bg-white/14"
            }`}
          >
            {demo.label}
          </button>
        ))}
      </div>
    </div>
  );
}
