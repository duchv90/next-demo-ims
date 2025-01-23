import { useTranslations } from 'next-intl';

export default function NotificationContentHeader({
  unReadCount,
}: Readonly<{ unReadCount: number }>) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <span className="text-base font-medium pr-4">
        {t('notification.title')}
      </span>
      <span className="ml-4 px-2 py-[1px] text-secondary bg-secondary/10 text-xs rounded-sm">
        {t('notification.unread', { count: unReadCount })}
      </span>
    </div>
  );
}
