import { getTranslations } from 'next-intl/server';
import MainContent from '@/components/layout/MainContent';
import NewPermissionForm from '@/components/form/NewPermissionForm';
import { UserPermission } from '@/enums/user';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('seo.permissions.title'),
    description: t('seo.permissions.description'),
    keywords: t('seo.permissions.keywords'),
  };
}

export default async function NewPermissionPage() {
  return (
    <MainContent role={UserPermission.CreatePermission}>
      <NewPermissionForm />
    </MainContent>
  );
}
