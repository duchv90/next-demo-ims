import NotificationIcon from '@/components/notification/NotificationIcon';
import NotificationStatus from '@/components/notification/NotificationStatus';
import { Notification } from '@/types/notification';

export default function NotificationItem({
  notification,
  unread,
  updateUnRead,
}: Readonly<{
  notification: Notification<object>;
  unread: boolean;
  updateUnRead: () => void;
}>) {
  const handleMouseEnter = (unread: boolean) => {
    if (unread) updateUnRead();
  };

  return (
    <div
      className={`relative p-4 border-b flex items-start transition hover:bg-secondary/5${unread ? ' bg-secondary/10' : ''}`}
      onMouseEnter={() => handleMouseEnter(unread)}
    >
      <div className="mr-3">
        <NotificationIcon type={notification.type || ''} />
      </div>
      <div className="flex flex-col mr-5">
        <h5 className="font-medium text-heading">{notification.title}</h5>
        <p className="text-body-secondary text-[13px] leading-4">
          {notification.body}
        </p>
        <p className="mt-2 text-gray-400 text-xs">{notification.created}</p>
      </div>
      <NotificationStatus unread={unread} />
    </div>
  );
}
