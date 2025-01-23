import { getTranslations } from 'next-intl/server';
import MainContent from '@/components/layout/MainContent';
import UserList from '@/components/user/UserList';
import { SearchParams } from '@/types';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { UserPermission } from '@/constants/user';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('seo.users.title'),
    description: t('seo.users.description'),
    keywords: t('seo.users.keywords'),
  };
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page = '1', pageSize = DEFAULT_PAGE_SIZE.toString() } =
    await searchParams;

  return (
    <MainContent role={UserPermission.ViewUser}>
      <UserList page={page.toString()} pageSize={pageSize.toString()} />
    </MainContent>
  );
}
