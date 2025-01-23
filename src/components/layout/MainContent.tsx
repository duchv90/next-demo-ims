'use client';

import { useLocale } from 'next-intl';
import { Urls } from '@/constants';
import { UserPermission, UserRole } from '@/constants/user';
import { useUser } from '@/context/UserContext';
import { redirect } from '@/i18n/routing';

export default function MainContent({
  role,
  className,
  children,
}: Readonly<{
  role?: UserPermission;
  className?: string;
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const locale = useLocale();

  // Check role permissions
  // Admin API already check permissions, so just need to check more on client side.
  if (role) {
    if (
      !user?.roles?.includes(UserRole.SuperAdmin) &&
      !user?.permissions?.includes(role)
    ) {
      redirect({
        href: Urls.unauthorized,
        locale: locale,
      });
    }
  }

  return (
    <div
      className={`overflow-hidden py-5 pl-8${className ? ` ${className}` : ''}`}
    >
      <div className="h-main-content overflow-y-auto pr-8 scrollbar-thin">
        {children}
      </div>
    </div>
  );
}
