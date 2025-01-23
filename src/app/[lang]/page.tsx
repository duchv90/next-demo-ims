import { redirect } from '@/i18n/routing';
import { Urls } from '@/constants';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('homepage');
  const currentLocale = await getLocale();

  redirect({ href: Urls.dashboard, locale: currentLocale });

  return (
    <div className="homepage">{t('title')}</div>
  );
}
