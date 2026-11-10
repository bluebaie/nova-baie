import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
  // SEO: never redirect by browser language or cookie. Each URL always serves its own
  // language; hreflang links and the explicit language switch connect both versions.
  localeDetection: false,
});
