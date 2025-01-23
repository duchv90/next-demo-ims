'use client';

import { Dropdown } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { BellOutlined } from '@ant-design/icons';
import { API_INTERNAL } from '@/constants/api';
import NotificationContent from '@/components/notification/NotificationContent';
import useFetch from '@/hooks/useFetch';
import { Notification } from '@/types/notification';
import { formatNotificationTime } from '@/utils/stringHelpers';

export default function HeaderNotification() {
  const { data, loading } = useFetch<Notification<object>[]>(
    API_INTERNAL.NOTIFICATION
  );
  const locale = useLocale();
  const t = useTranslations();

  let notifications: Notification<object>[] = [];

  if (data) {
    notifications = data.map((noti) => ({
      id: noti.id,
      isRead: noti.isRead,
      title: noti.title,
      body: noti.body,
      type: noti.type,
      created: formatNotificationTime(noti.timestamp || '', locale, t),
      metadata: noti.metadata,
    })).slice(0, 9);
  }

  return (
    <Dropdown
      dropdownRender={() => (
        <NotificationContent loading={loading} notifications={notifications} />
      )}
      placement="bottomRight"
      trigger={['click']}
    >
      <div className="cursor-pointer group flex items-center justify-center w-[50px] h-[60px]">
        <div className="relative px-2 py-1 text-body-secondary text-xl rounded-full transition group-hover:bg-gray-100/50">
          <BellOutlined className="relative" />
          <span className="absolute -top-[1px] -right-[2px] z-10 flex size-4">
            <span className="animate-slow-ping absolute rounded-full size-4 text-white bg-primary opacity-75"></span>
            <span className="relative block rounded-full size-full text-xs text-center font-medium text-white bg-primary">
              {notifications?.length || 0}
            </span>
          </span>
        </div>
      </div>
    </Dropdown>
  );
}
