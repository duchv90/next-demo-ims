'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Button, Dropdown } from 'antd';

import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import Flag from '@/components/ui/Flag';
import { DownOutlined } from '@ant-design/icons';
import type { Placement } from '@/types/antd';
import { LOCALES } from '@/constants';

export default function LocaleSwitcher({
  placement,
  color,
  compact,
}: Readonly<{ placement?: Placement; color?: string; compact?: boolean }>) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const currentLanguage = LOCALES.find((l) => l.language === locale);

  const handleChange = (newLocale: string) => {
    if (locale !== newLocale) {
      router.push(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  const LocaleSwitcherDropdown = () => {
    return (
      <div className="ant-dropdown-menu min-w-44">
        <div className="grid grid-cols-1 gap-y-1">
          {routing.locales.map((value: string) => {
            const language = LOCALES.find((l) => l.language === value);
            const isActive = locale === value;

            return (
              <div key={value}>
                {language && (
                  <Button
                    className="w-full"
                    type="text"
                    onClick={() => handleChange(value)}
                  >
                    <span
                      className={`flex w-full items-center justify-center ${
                        isActive ? 'text-primary' : 'text-body-secondary'
                      }`}
                    >
                      {language.flag && (
                        <Flag
                          name={t(`general.locales.${language.language}`)}
                          src={language.flag}
                        />
                      )}
                      <span className="ml-2 text-[15px] font-medium">
                        {t(`general.locales.${language.language}`)}
                      </span>
                    </span>
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {currentLanguage && (
        <Dropdown
          dropdownRender={() => LocaleSwitcherDropdown()}
          placement={placement || 'bottom'}
          arrow={!compact}
        >
          <div
            className={`flex items-center ${
              color ? color : 'text-body-secondary'
            }`}
          >
            {currentLanguage.flag && (
              <Flag
                name={t(`general.locales.${currentLanguage.language}`)}
                src={currentLanguage.flag}
              />
            )}
            <span
              className={`ml-2 text-[15px] font-medium ${compact ? 'hidden' : ''}`}
            >
              {t(`general.locales.${currentLanguage.language}`)}
            </span>
            <span className={`ml-2 text-xs ${compact ? 'hidden' : ''}`}>
              <DownOutlined />
            </span>
          </div>
        </Dropdown>
      )}
    </>
  );
}
