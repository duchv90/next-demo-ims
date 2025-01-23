export default function NotificationStatus({
  unread,
}: Readonly<{ unread: boolean }>) {
  return (
    <>
      {unread && (
        <div className="absolute top-1/2 right-4 -mt-1 size-2 rounded-full bg-blue-600"></div>
      )}
    </>
  );
}
