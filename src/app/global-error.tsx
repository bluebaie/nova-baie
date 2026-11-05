'use client';

import Link from 'next/link';

// Self-contained bilingual fallback: no dependency on a potentially broken intl/layout provider.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="fr"><body style={{ margin: 0, background: '#F8F7F4', color: '#163A70', fontFamily: 'sans-serif' }}>
    <title>Nova Baie — Erreur / Error</title>
    <main style={{ maxWidth: 800, margin: '10vh auto', padding: 32 }}>
      <h1>Une erreur est survenue</h1><p role="alert">Veuillez réessayer ou revenir à l’accueil.</p>
      <div lang="en"><h2>Something went wrong</h2><p>Please try again or return to the homepage.</p></div>
      <button type="button" onClick={reset}>Réessayer / Try again</button>
      <p><Link href="/">Accueil</Link> · <Link href="/en">Home</Link></p>
    </main>
  </body></html>;
}
