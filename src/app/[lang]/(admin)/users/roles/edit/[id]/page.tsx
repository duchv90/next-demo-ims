import { getTranslations } from 'next-intl/server';
import MainContent from '@/components/layout/MainContent';
import UpdateRoleForm from '@/components/form/UpdateRoleForm';
import { fetchData } from '@/utils/fetchData';
import { RoleInfo } from '@/types/roles';
import { RolePermission } from '@/types/permissions';
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

export default async function UpdateRolePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const role = await fetchData(FetchDataTypes.Role, id);
  let data: RoleInfo | null = null;
  if (role) {
    data = {
      id: role.id,
      name: role.name,
      description: role.description,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
      permissionIds: role.permissions.map(
        (permission: RolePermission) => permission.permissionId,
      ),
    };
  }

  return (
    <MainContent role={UserPermission.UpdateRole}>
      <UpdateRoleForm data={data} />
    </MainContent>
  );
}
