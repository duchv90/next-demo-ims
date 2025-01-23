import { DATE_TIME_FORMAT, LOCALES } from '@/constants';

const TIME_UNITS = {
  d: 86400000,
  h: 3600000, // hours to milliseconds
  m: 60000, // minutes to milliseconds
  s: 1000, // seconds to milliseconds
};

export const isStringEmpty = (str: string | null): boolean => {
  if (typeof str === 'string') return str.trim().length === 0;

  return false;
};

export const convertExpireTimeToMilliseconds = (expireTime: string): number => {
  const regex = /(\d+)(d|h|m|s)/g; // Regex to match number followed by a unit
  let totalMilliseconds = 0;
  let match;

  while ((match = regex.exec(expireTime)) !== null) {
    const amount: number = parseInt(match[1], 10);
    const unit: keyof typeof TIME_UNITS = match[2] as keyof typeof TIME_UNITS;

    if (TIME_UNITS[unit]) {
      totalMilliseconds += amount * TIME_UNITS[unit];
    }
  }

  return totalMilliseconds;
};

export const convertToString = (
  value: string | undefined | unknown,
): string => {
  if (typeof value === 'string') return value;

  return String(value);
};

export const formatNotificationTime = (
  value: string,
  locale: string,
  translate: any, // eslint-disable-line
): string => {
  if (isStringEmpty(value)) {
    return translate('time.default');
  }

  const now = new Date();
  const date = new Date(value);
  const between = now.getTime() - date.getTime();

  if (between / TIME_UNITS.m < 60) {
    const minuteCount = Math.floor(between / TIME_UNITS.m);
    return translate(
      minuteCount === 1 ? 'time.minute_ago.one' : 'time.minute_ago.more',
      { minute: minuteCount },
    );
  } else if (between / TIME_UNITS.h < 24) {
    const hourCount = Math.floor(between / TIME_UNITS.h);
    return translate(
      hourCount === 1 ? 'time.hour_ago.one' : 'time.hour_ago.more',
      { hour: hourCount },
    );
  } else if (between / TIME_UNITS.d < 2) {
    const dayCount = Math.floor(between / TIME_UNITS.d);
    return translate(
      dayCount === 1 ? 'time.day_ago.one' : 'time.day_ago.more',
      { day: dayCount },
    );
  } else {
    return new Date(value).toLocaleDateString(locale, DATE_TIME_FORMAT);
  }
};

export const formatDateTime = (date: Date, locale: string): string => {
  return date ? date.toLocaleDateString(locale, DATE_TIME_FORMAT) : '';
};

export const capitalize = (string: string): string => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatMoney = (
  value: number,
  language: string,
  currentCurrency?: string,
): string => {
  const currentLocale = LOCALES.find((locale) => locale.language === language);
  const moneyLocale = `${language}-${currentLocale?.region}`;
  const currency = currentCurrency || currentLocale?.currency || 'USD';
  return new Intl.NumberFormat(moneyLocale, {
    style: 'currency',
    currency,
  }).format(value);
};

export const parseParamsToURL = (
  baseURL: string,
  params: Record<string, string | number | null> | null,
): string => {
  const url = new URL(baseURL);
  const searchParams = new URLSearchParams(url.search);

  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key]) {
      searchParams.set(key, params[key].toString());
    }
  }

  url.search = searchParams.toString();
  return url.toString();
};
