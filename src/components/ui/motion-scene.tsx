'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Progressive enhancement only. No element is hidden in SSR or without JavaScript.
export function MotionScene() {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(min-width: 64rem) and (hover: hover) and (pointer: fine)');
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    const reset = () => {
      cancelAnimationFrame(frame);
      hero?.style.removeProperty('--hero-x');
      hero?.style.removeProperty('--hero-y');
    };
    const move = (event: PointerEvent) => {
      if (!hero || reduced.matches || !pointer.matches || document.hidden) return;
      cancelAnimationFrame(frame);
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - .5) * 12;
      const y = ((event.clientY - rect.top) / rect.height - .5) * 8;
      frame = requestAnimationFrame(() => {
        hero.style.setProperty('--hero-x', `${x.toFixed(1)}px`);
        hero.style.setProperty('--hero-y', `${y.toFixed(1)}px`);
      });
    };
    const configure = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      reset();
      if (reduced.matches || !('IntersectionObserver' in window)) return;
      const duration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--duration-reveal')) || 700;
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer?.unobserve(entry.target);
          const animation = entry.target.animate([{ opacity: .6, transform: 'translateY(18px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration, easing: 'cubic-bezier(.2,.75,.2,1)' });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      }, { threshold: .12 });
      document.querySelectorAll('[data-reveal]').forEach(element => observer?.observe(element));
    };
    configure();
    hero?.addEventListener('pointermove', move, { passive: true });
    hero?.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', reset);
    reduced.addEventListener('change', configure);
    pointer.addEventListener('change', reset);
    return () => {
      observer?.disconnect(); reset(); animations.forEach(animation => animation.cancel());
      hero?.removeEventListener('pointermove', move); hero?.removeEventListener('pointerleave', reset);
      document.removeEventListener('visibilitychange', reset);
      reduced.removeEventListener('change', configure); pointer.removeEventListener('change', reset);
    };
  }, [pathname]);
  return null;
}
