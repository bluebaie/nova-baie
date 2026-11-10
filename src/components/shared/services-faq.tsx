import { getMessages, getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { JsonLd } from '@/components/seo/json-ld';

type FaqMessages = { faq: { items: [string, string][] } };

/** Native <details> FAQ (keyboard accessible, no client JS) with matching FAQPage data. */
export async function ServicesFaq() {
  const t = await getTranslations('faq');
  const items = ((await getMessages()) as unknown as FaqMessages).faq.items;
  return <section className="faq-section" aria-labelledby="faq-title">
    <JsonLd data={{
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: items.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } }))
    }} />
    <Container><div className="faq-layout">
      <div data-reveal><p className="eyebrow">{t('eyebrow')}</p><h2 id="faq-title">{t('title')}</h2></div>
      <div className="faq-list">{items.map(([question, answer]) => <details key={question} className="faq-item">
        <summary>{question}</summary><p>{answer}</p>
      </details>)}</div>
    </div></Container>
  </section>;
}
