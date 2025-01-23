import MainContent from '@/components/layout/MainContent';
import { UserPermission } from '@/constants/user';

export default function NewRolePage() {
  return (
    <MainContent role={UserPermission.CreateRole}>
      <h1>New Role</h1>
    </MainContent>
  );
}
