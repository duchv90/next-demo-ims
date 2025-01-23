import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // eslint-disable-next-line
  if (!routing.locales.includes(locale as any)) notFound();

  // Ensure that a valid locale is used
  // eslint-disable-next-line
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/locales/${locale}.json`)).default,
  };
});
