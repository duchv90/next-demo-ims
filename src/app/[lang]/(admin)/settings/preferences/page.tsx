import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('seo.settings_preferences.title'),
    description: t('seo.settings_preferences.description'),
    keywords: t('seo.settings_preferences.keywords'),
  };
}

export default async function SettingsPreferencesPage() {
  return (
    <div className="p-5">
      <h1>Preferences PAGE</h1>
    </div>
  );
}
