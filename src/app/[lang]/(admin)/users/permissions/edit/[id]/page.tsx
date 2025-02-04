import { getTranslations } from 'next-intl/server';
import MainContent from '@/components/layout/MainContent';
import UpdatePermissionForm from '@/components/form/UpdatePermissionForm';
import { fetchData } from '@/utils/fetchData';
import { UserPermission } from '@/enums/user';
import { FetchDataTypes } from '@/enums';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('seo.permissions.title'),
    description: t('seo.permissions.description'),
    keywords: t('seo.permissions.keywords'),
  };
}

export default async function UpdatePermissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const permission = await fetchData(FetchDataTypes.Permission, id);

  return (
    <MainContent role={UserPermission.UpdatePermission}>
      <UpdatePermissionForm permission={permission} />
    </MainContent>
  );
}
