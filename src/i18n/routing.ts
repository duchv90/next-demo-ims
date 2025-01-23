import { defineRouting, LocalePrefix } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { Language } from '@/types/locale';
import { LOCALES } from '@/constants';

export type RoutingConfig = {
  locales: Language[];
  defaultLocale: Language;
  localePrefix: LocalePrefix; // always, as-needed, never
  localeDetection: boolean;
};

const localePrefix: LocalePrefix = 'always';

const routingConfig: RoutingConfig = {
  locales: LOCALES.map((locale) => locale.language),
  defaultLocale: LOCALES[0].language,
  localePrefix: localePrefix,
  localeDetection: false,
};

export const routing = defineRouting(routingConfig);
 
// Lightweight wrappers around Next.js navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);
