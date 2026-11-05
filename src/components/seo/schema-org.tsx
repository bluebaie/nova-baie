import { getTranslations } from 'next-intl/server';
import { expertiseIds } from '@/lib/expertises';
import { buildStructuredData } from '@/lib/structured-data';

export default async function SchemaOrg({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const expertise = await getTranslations({ locale, namespace: 'expertises' });
  const schema = buildStructuredData(locale, t('metaDescription'), expertiseIds.map(id => expertise(`${id}.title`)));
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}
