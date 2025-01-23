'use client';

import { useEffect, useState } from 'react';
import { Notification } from '@/types/notification';
import { useLocale, useTranslations } from 'next-intl';
import { Urls } from '@/constants';
import { Button } from 'antd';
import { redirect } from '@/i18n/routing';
import NotificationItem from '@/components/notification/NotificationItem';
import NotificationContentHeader from '@/components/notification/NotificationContentHeader';

export default function NotificationContent({
  loading,
  notifications,
}: {
  loading: boolean;
  notifications: Notification<object>[];
}) {
  const t = useTranslations();
  const currentLocale = useLocale();
  const [status, setStatus] = useState<boolean[]>([]);

  useEffect(() => {
    if (notifications) {
      setStatus(notifications.map((notification) => notification.isRead));
    }
  }, [notifications]);

  const updateUnRead = (index: number) => {
    if (!status[index]) {
      const newStatus = [...status];
      newStatus[index] = true;
      setStatus(newStatus);
    }
  }

  const handleViewNotifications = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    redirect({ href: Urls.homepage, locale: currentLocale });
  };

  return (
    <div className="ant-dropdown-menu w-96 max-w-[90vw] !p-0 text-sm">
      <NotificationContentHeader unReadCount={status.reduce((acc, curr) => curr ? acc : ++acc, 0)} />
      <div className="max-h-[480px] -mb-[1px] overflow-x-hidden overflow-y-auto scrollbar-thin">
        {!loading &&
          notifications &&
          notifications.map((item, index) => {
            if (item) {
              return <NotificationItem key={item.id} notification={item} unread={!status[index]} updateUnRead={() => updateUnRead(index)} />;
            }
            return null;
          })}
      </div>
      <div className="p-4 border-t">
        <Button
          className="block w-full"
          type="primary"
          onClick={handleViewNotifications}
        >
          {t('notification.view_all')}
        </Button>
      </div>
    </div>
  );
}
