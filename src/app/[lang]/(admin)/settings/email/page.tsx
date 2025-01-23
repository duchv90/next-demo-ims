import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('seo.settings_email.title'),
    description: t('seo.settings_email.description'),
    keywords: t('seo.settings_email.keywords'),
  };
}

export default async function SettingsEmailPage() {
  return (
    <div className="p-5">
      <h1>Settings -&gt; Email PAGE</h1>
    </div>
  );
}
