'use client';

import { useEffect, useRef } from 'react';

/**
 * Signature motion of the CycloSport Crotellois case study.
 * Everything is readable without JavaScript; GSAP only enhances it.
 * Scroll-linked scenes run on screens ≥ 768 px without reduced-motion; the
 * hero entrance runs everywhere except with reduced motion.
 */
export function CyclosportMotion() {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = marker.current?.closest('article');
    if (!root) return;
    let disposed = false;
    let cleanup = () => {};
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      const ctx = gsap.context(() => {
        const q = <T extends Element = HTMLElement>(selector: string) => Array.from(root.querySelectorAll<T>(selector));
        const draw = (path: SVGPathElement, vars: gsap.TweenVars) => {
          const length = path.getTotalLength();
          return gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, ease: 'none', ...vars });
        };

        mm.add('(prefers-reduced-motion: no-preference)', () => {
          // Transition A, part 1 — the trajectory crosses the hero at load.
          const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
          q<SVGPathElement>('[data-csc-trajectory]').forEach(path => {
            const length = path.getTotalLength();
            intro.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0);
          });
          intro.from(q('[data-csc-photo]'), { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', duration: 1.1 }, 0.15)
            .from(q('[data-csc-line]'), { yPercent: 110, duration: 0.9, stagger: 0.12 }, 0.25)
            .from(q('[data-csc-in]'), { y: 18, opacity: 0, duration: 0.7, stagger: 0.06 }, 0.45);
        });

        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
          // Depth between hero planes.
          q('[data-csc-photo]').forEach(photo => gsap.to(photo, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: root.querySelector('[data-csc-hero]'), start: 'top top', end: 'bottom top', scrub: 0.6 } }));

          // Transition A, part 2 — the line relays into the next chapter and the stage profile.
          q<SVGPathElement>('[data-csc-draw]').forEach(path => draw(path, { scrollTrigger: { trigger: path.closest('section') ?? path, start: 'top 80%', end: 'center 45%', scrub: 0.6 } }));
          q('[data-csc-peloton] > div').forEach(frame => gsap.fromTo(frame, { clipPath: 'polygon(0 18%, 100% 0, 100% 82%, 0 100%)' }, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', ease: 'none', scrollTrigger: { trigger: frame, start: 'top 90%', end: 'center 50%', scrub: 0.6 } }));

          // Transition B — speed: photo slow, lines fast, capture revealed by a sweeping mask.
          q('[data-csc-depth="slow"]').forEach(photo => gsap.fromTo(photo, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: photo, start: 'top bottom', end: 'bottom top', scrub: 0.8 } }));
          q('[data-csc-speed] i').forEach((line, index) => gsap.fromTo(line, { xPercent: -60 - index * 6 }, { xPercent: 40 + index * 4, ease: 'none', scrollTrigger: { trigger: line.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.3 } }));
          q('[data-csc-reveal]').forEach(frame => gsap.fromTo(frame, { clipPath: 'polygon(0 0, 14% 0, 0 100%, 0 100%)' }, { clipPath: 'polygon(0 0, 130% 0, 100% 100%, 0 100%)', ease: 'none', scrollTrigger: { trigger: frame, start: 'top 92%', end: 'top 35%', scrub: 0.6 } }));
          q('[data-csc-bleed]').forEach(band => gsap.fromTo(band, { clipPath: 'polygon(0 12%, 100% 0, 100% 88%, 0 100%)' }, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', ease: 'none', scrollTrigger: { trigger: band, start: 'top 90%', end: 'center 55%', scrub: 0.6 } }));
          q('[data-csc-magnifier] > div').forEach(lens => gsap.fromTo(lens, { clipPath: 'circle(18% at 30% 40%)' }, { clipPath: 'circle(75% at 50% 50%)', ease: 'none', scrollTrigger: { trigger: lens, start: 'top 90%', end: 'top 40%', scrub: 0.6 } }));

          // Transition C — the route flattens into a working grid.
          q('[data-csc-grid]').forEach(plane => gsap.fromTo(plane, { rotateX: 58, scale: 1.25, opacity: 0.35 }, { rotateX: 0, scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: plane.parentElement, start: 'top 85%', end: 'center 45%', scrub: 0.7 } }));
          q('[data-csc-layer]').forEach((layer, index) => gsap.from(layer, { x: -30 - index * 10, ease: 'none', scrollTrigger: { trigger: layer, start: 'top 92%', end: 'top 65%', scrub: 0.5 } }));

          // Transition D — the strands converge on the finish line.
          q<SVGPathElement>('[data-csc-converge]').forEach((path, index) => draw(path, { scrollTrigger: { trigger: path.closest('section') ?? path, start: `top ${85 - index * 2}%`, end: 'center 55%', scrub: 0.6 } }));
        });
      }, root);
      cleanup = () => { mm.revert(); ctx.revert(); };
    });
    return () => { disposed = true; cleanup(); };
  }, []);
  return <span ref={marker} hidden />;
}
