import { getTranslations } from 'next-intl/server';
import MainContent from '@/components/layout/MainContent';
import NewRole from '@/components/user/NewRole';
import { UserPermission } from '@/enums/user';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('seo.roles.title'),
    description: t('seo.roles.description'),
    keywords: t('seo.roles.keywords'),
  };
}

export default function NewRolePage() {
  return (
    <MainContent role={UserPermission.CreateRole}>
      <NewRole />
    </MainContent>
  );
}
