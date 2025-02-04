import { getTranslations } from 'next-intl/server';
import { SearchParams } from '@/types';
import MainContent from '@/components/layout/MainContent';
import PermissionList from '@/components/user/permissions/PermissionList';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { UserPermission } from '@/enums/user';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('seo.permissions.title'),
    description: t('seo.permissions.description'),
    keywords: t('seo.permissions.keywords'),
  };
}

export default async function UsersPermissionsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page = '1', pageSize = DEFAULT_PAGE_SIZE.toString() } =
    await searchParams;

  return (
    <MainContent role={UserPermission.ViewPermission}>
      <PermissionList page={page.toString()} pageSize={pageSize.toString()} />
    </MainContent>
  );
}
