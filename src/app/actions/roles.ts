'use server';

import { RoleFormValues } from '@/types/roles';
import { createRole, deleteRole, updateRole } from '@/services/roles';
import { handleResponse } from '@/utils/fetchData';

export const handleAddRole = async (
  roleData: RoleFormValues,
  permissions: string[],
) => handleResponse(createRole, roleData, permissions);

export const handleDeleteRole = async (id: string) =>
  handleResponse(deleteRole, id);

export const handleUpdateRole = async (
  id: string,
  roleData: RoleFormValues,
  permissionIds: string[],
) => handleResponse(updateRole, id, roleData, permissionIds);
