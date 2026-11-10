'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// GSAP is loaded only after a creative scene approaches the viewport. Scroll stays native.
export function CreativeMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 768px)');
    if (reduce.matches || !desktop.matches || !('IntersectionObserver' in window)) return;
    const scenes = [...document.querySelectorAll<HTMLElement>('[data-creative-scene], [data-case-hero], .portfolio-scene')];
    if (!scenes.length) return;
    let cancelled = false;
    let cleanup = () => {};
    const boot = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled || reduce.matches) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.matchMedia().add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
          gsap.utils.toArray<SVGPathElement>('[data-draw]').forEach(path => {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
            gsap.to(path, {
              strokeDashoffset: 0,
              ease: 'none',
              scrollTrigger: { trigger: path.closest('[data-creative-scene], [data-case-hero], .portfolio-scene') ?? path, start: 'top 86%', end: 'bottom 20%', scrub: 0.65 }
            });
          });
          gsap.utils.toArray<HTMLElement>('[data-c2-art] .project-art-main img, [data-c2-art] .case-hero-art img, .bdm-hero-stack img, [data-bdm-parallax] img, [data-geb-depth] img').forEach(image => {
            gsap.fromTo(image, { yPercent: 7, scale: 1.06 }, {
              yPercent: -5, scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: image.closest('[data-c2-art]') ?? image, start: 'top bottom', end: 'bottom top', scrub: 0.7 }
            });
          });

          // Blue Baie's case-study motion follows one current: coast, interface, platform, horizon.
          // It is scoped to this article, uses native scrolling, and never hides essential content.
          const blueBaie = document.querySelector<HTMLElement>('.bb-case');
          if (blueBaie) {
            gsap.utils.toArray<SVGPathElement>('[data-bb-seam] path', blueBaie).forEach(path => {
              const length = path.getTotalLength();
              gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
                strokeDasharray: length,
                strokeDashoffset: 0,
                ease: 'none',
                immediateRender: false,
                scrollTrigger: { trigger: path.closest('[data-bb-seam]') ?? path, start: 'top 92%', end: 'bottom 18%', scrub: 0.55, invalidateOnRefresh: true }
              });
            });

            gsap.utils.toArray<HTMLElement>('[data-bb-depth="coast"]', blueBaie).forEach(layer => {
              gsap.fromTo(layer, { yPercent: 3, scale: 1.015 }, {
                yPercent: -3,
                scale: 1,
                ease: 'none',
                immediateRender: false,
                scrollTrigger: { trigger: layer, start: 'top bottom', end: 'bottom top', scrub: 0.8, invalidateOnRefresh: true }
              });
            });

            const adminShell = blueBaie.querySelector<HTMLElement>('.bb-admin-shell');
            if (adminShell) {
              gsap.fromTo(adminShell, { y: 28, scale: 0.985 }, {
                y: 0,
                scale: 1,
                ease: 'none',
                immediateRender: false,
                scrollTrigger: { trigger: adminShell, start: 'top 92%', end: 'top 42%', scrub: 0.6, invalidateOnRefresh: true }
              });
            }

            gsap.utils.toArray<SVGPathElement>('.bb-system-map .bb-flow-confirmed', blueBaie).forEach(path => {
              const length = path.getTotalLength();
              gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
                strokeDasharray: length,
                strokeDashoffset: 0,
                ease: 'none',
                immediateRender: false,
                scrollTrigger: { trigger: path.closest('.bb-ecosystem') ?? path, start: 'top 80%', end: 'center 48%', scrub: 0.65, invalidateOnRefresh: true }
              });
            });

            const finaleGlow = blueBaie.querySelector<HTMLElement>('.bb-finale-glow');
            if (finaleGlow) {
              gsap.fromTo(finaleGlow, { scale: 0.88, opacity: 0.62 }, {
                scale: 1.06,
                opacity: 1,
                ease: 'none',
                immediateRender: false,
                scrollTrigger: { trigger: finaleGlow.closest('.bb-finale') ?? finaleGlow, start: 'top bottom', end: 'center 55%', scrub: 0.7, invalidateOnRefresh: true }
              });
            }
          }
        });
      }, document.querySelector('main') ?? document.body);
      cleanup = () => context.revert();
      ScrollTrigger.refresh();
    };
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      void boot();
    }, { rootMargin: '220px 0px' });
    scenes.forEach(scene => observer.observe(scene));
    const onMotionChange = () => { if (reduce.matches) { observer.disconnect(); cleanup(); } };
    reduce.addEventListener('change', onMotionChange);
    return () => { cancelled = true; observer.disconnect(); cleanup(); reduce.removeEventListener('change', onMotionChange); };
  }, [pathname]);
  return null;
}
