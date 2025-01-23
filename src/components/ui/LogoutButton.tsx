'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { message } from 'antd';
import AntdIcon from '@/components/common/AntdIcon';
import { useRouter } from '@/i18n/routing';
import { Urls } from '@/constants';
import { LoadingOutlined } from '@ant-design/icons';
import { API_INTERNAL } from '@/constants/api';

export default function LogoutButton({
  className,
  iconName,
  label,
}: Readonly<{
  className?: string;
  iconName?: string;
  label?: string;
}>) {
  const t = useTranslations();
  const buttonClasses = className
    ? className
    : 'flex items-center w-full px-3 py-2 rounded-s text-body font-semibold hover:text-primary hover:bg-gray-100';
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_INTERNAL.LOGOUT, {
        method: 'POST',
      });

      if (response.ok) {
        router.push(Urls.login);
        router.refresh();
      } else {
        messageApi.open({
          type: 'error',
          content: t('logout.error_message'),
        });
      }
    } catch {
      messageApi.open({
        type: 'error',
        content: t('logout.error_message'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <button
        className={buttonClasses}
        type="button"
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? (
          <span className="flex w-full justify-center text-center">
            <LoadingOutlined className="mr-2" /> {t('general.loading')}
          </span>
        ) : (
          <>
            {iconName && (
              <AntdIcon
                name={iconName}
                className="relative -mt-[2px] mr-2 text-[16px]"
              />
            )}
            {label ? label : t('header.logout')}
          </>
        )}
      </button>
    </>
  );
}
