import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('seo.settings_logs.title'),
    description: t('seo.settings_logs.description'),
    keywords: t('seo.settings_logs.keywords'),
  };
}

export default async function SettingsLogsPage() {
  return (
    <div className="p-5">
      <h1>Logs PAGE</h1>
    </div>
  );
}
