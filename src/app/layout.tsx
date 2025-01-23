import { Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { Language } from '@/types/locale';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import LoadingProvider from '@/context/LoadingContext';

import { Roboto, Public_Sans } from 'next/font/google';
import { antdTheme } from '@/styles/antdTheme';
import { variables } from '@/styles/global';
import '@/styles/global.scss';

const globalFont = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

const headingFont = Public_Sans({
  weight: ['100', '300', '400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#f25019',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Language }>;
}>) {
  const { lang } = await params;
  const messages = await getMessages();

  return (
    <html lang={lang}>
      <head>
        <style>
          {`
            :root {
              --font-family: ${globalFont.style.fontFamily};
              --font-family-heading: ${headingFont.style.fontFamily};
              --body-color: ${variables.bodyColor};
              --body-secondary-color: ${variables.bodyColorSecondary};
              --body-bg: ${variables.bodyBg};
              --heading-color: ${variables.colorHeading};
              --color-primary: ${variables.colorPrimary};
              --color-secondary: ${variables.colorSecondary};
              --color-tertiary: ${variables.colorTertiary};
              --color-orange: ${variables.colorOrange};
              --color-required: ${variables.colorRequired};
            }
          `}
        </style>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AntdRegistry>
            <ConfigProvider theme={antdTheme}>
              <LoadingProvider>{children}</LoadingProvider>
            </ConfigProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
