"use client";

import { useEffect, useState } from "react";

const demos = [
  {
    id: "gites",
    label: "Gîtes en Baie",
    video: "/videos/gites-en-baie-demo.mp4",
    subtitle: "Site vitrine multi-hébergements en Baie de Somme",
  },
  {
    id: "sainte-foy",
    label: "Sainte-Foy",
    video: "/videos/sainte-foy-demo.mp4",
    subtitle: "Site vitrine hébergement montagne / location saisonnière",
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
      <div className="pointer-events-none absolute -inset-8 -z-10 blur-3xl bg-[radial-gradient(circle_at_50%_50%,rgba(46,123,198,0.25),transparent_70%)]" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 shadow-[0_30px_90px_rgba(10,22,40,0.35)] backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
          <span className="h-3 w-3 rounded-full bg-white/25" />
          <span className="h-3 w-3 rounded-full bg-white/15" />
          <span className="h-3 w-3 rounded-full bg-white/10" />
          <p className="ml-3 text-sm font-medium text-white/70">
            Réalisations Nova Baie
          </p>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-nova-navy">
          {demos.map((demo, index) => (
            <video
              key={demo.id}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              }`}
              src={demo.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-nova-navy/55 via-transparent to-transparent" />

          <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            Sites déjà réalisés
          </div>

          <div className="absolute bottom-5 left-5 right-5">
            <div className="rounded-2xl border border-white/15 bg-nova-navy/60 p-4 backdrop-blur-md">
              <p className="text-sm font-semibold text-white">
                {demos[activeIndex].label}
              </p>
              <p className="mt-1 text-sm text-white/75">
                {demos[activeIndex].subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

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