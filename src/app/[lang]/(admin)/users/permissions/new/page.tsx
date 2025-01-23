import { getTranslations } from 'next-intl/server';
import MainContent from '@/components/layout/MainContent';
import NewPermission from '@/components/user/NewPermission';
import { UserPermission } from '@/constants/user';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('seo.permissions.title'),
    description: t('seo.permissions.description'),
    keywords: t('seo.permissions.keywords'),
  };
}

export default function NewRolePage() {
  return (
    <MainContent role={UserPermission.CreatePermission}>
      <NewPermission />
    </MainContent>
  );
}
