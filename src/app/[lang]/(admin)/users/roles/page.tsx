import { getTranslations } from 'next-intl/server';
import MainContent from '@/components/layout/MainContent';
import RoleList from '@/components/user/RoleList';
import { SearchParams } from '@/types';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { UserPermission } from '@/constants/user';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('seo.roles.title'),
    description: t('seo.roles.description'),
    keywords: t('seo.roles.keywords'),
  };
}

export default async function UsersRolesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page = '1', pageSize = DEFAULT_PAGE_SIZE.toString() } =
    await searchParams;

  return (
    <MainContent role={UserPermission.ViewRole}>
      <RoleList page={page.toString()} pageSize={pageSize.toString()} />
    </MainContent>
  );
}
