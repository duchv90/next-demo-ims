export type Language = 'en' | 'vi';

export type Locale = {
  language: Language;
  region?: string;
  currency?: string;
  flag?: string;
};
