export default function DashboardCard({
  className,
  children,
}: Readonly<{ className?: string; children: React.ReactNode }>) {
  return (
    <div
      className={`bg-white rounded-md shadow-dashboard h-full ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  );
}
