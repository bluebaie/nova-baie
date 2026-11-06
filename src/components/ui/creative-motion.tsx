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
          gsap.utils.toArray<HTMLElement>('[data-c2-art] .project-art-main img, [data-c2-art] .case-hero-art img').forEach(image => {
            gsap.fromTo(image, { yPercent: 7, scale: 1.06 }, {
              yPercent: -5, scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: image.closest('[data-c2-art]') ?? image, start: 'top bottom', end: 'bottom top', scrub: 0.7 }
            });
          });
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
