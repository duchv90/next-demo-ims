import { Layout } from 'antd';
import PageLoading from '@/components/common/PageLoading';
import PreLoading from '@/components/common/PreLoading';
import AdminLayoutProvider from '@/context/AdminLayoutContext';
import UserProvider from '@/context/UserContext';
import { UserProfileCompact } from '@/types/users';
import { getCurrentUser } from '@/lib/dal';

export default async function AdminLayout({
  header,
  children,
  sidebar,
  footer,
}: Readonly<{
  header: React.ReactNode;
  children: React.ReactNode;
  sidebar: React.ReactNode;
  footer: React.ReactNode;
}>) {
  const user: UserProfileCompact | null = await getCurrentUser();

  return (
    <AdminLayoutProvider>
      <UserProvider initialUser={user}>
        <Layout className="relative flex !min-h-[100vh] flex-row">
          {sidebar}
          <Layout>
            {header}
            {children}
            {footer}
          </Layout>
          <PageLoading />
          <PreLoading />
        </Layout>
      </UserProvider>
    </AdminLayoutProvider>
  );
}
