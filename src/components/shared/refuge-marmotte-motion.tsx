'use client';

import { useEffect, useRef } from 'react';

export function RefugeMarmotteMotion() {
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
        mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
          gsap.from('[data-rm-title]', { y: 24, opacity: 0, duration: 1.2, ease: 'power2.out', clearProps: 'all' });
          root.querySelectorAll('[data-rm-depth]').forEach((layer, index) => {
            gsap.to(layer, { y: (index + 1) * 22, ease: 'none', scrollTrigger: { trigger: layer.closest('header, section'), start: 'top top', end: 'bottom top', scrub: 0.8 } });
          });
          root.querySelectorAll<SVGPathElement>('[data-rm-route]').forEach(path => {
            const length = path.getTotalLength();
            gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: path.closest('section, header'), start: 'top 85%', end: 'bottom 35%', scrub: 0.6 } });
          });
          gsap.fromTo('[data-rm-frame]', { clipPath: 'polygon(0 28%, 28% 0, 72% 0, 100% 28%, 100% 100%, 0 100%)', y: 45 }, { clipPath: 'polygon(0 0, 28% 0, 72% 0, 100% 0, 100% 100%, 0 100%)', y: 0, ease: 'none', scrollTrigger: { trigger: '[data-rm-frame]', start: 'top 95%', end: 'top 30%', scrub: 0.7 } });
        });
      }, root);
      cleanup = () => { mm.revert(); ctx.revert(); };
    });
    return () => { disposed = true; cleanup(); };
  }, []);
  return <span ref={marker} hidden />;
}
