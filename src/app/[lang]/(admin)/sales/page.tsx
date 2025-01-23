import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('seo.sales.title'),
    description: t('seo.sales.description'),
    keywords: t('seo.sales.keywords'),
  };
}

export default async function SalesPage() {
  return (
    <div className="p-5">
      <h1>SALES PAGE</h1>
    </div>
  );
}
