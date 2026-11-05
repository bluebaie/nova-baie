import Link from 'next/link';

export default function RootNotFound() {
  return <html lang="fr"><body style={{ background: '#F8F7F4', color: '#163A70', fontFamily: 'sans-serif', padding: 32 }}>
    <h1>404 — Page introuvable</h1><p lang="en">Page not found</p>
    <p><Link href="/">Accueil</Link> · <Link href="/en">Home</Link></p>
  </body></html>;
}
