'use server';

import { PermissionFormValues } from '@/types/permissions';
import {
  createPermission,
  deletePermission,
  updatePermission,
} from '@/services/permissions';
import { handleResponse } from '@/utils/fetchData';

export const handleAddPermission = async (permission: PermissionFormValues) =>
  handleResponse(createPermission, permission);

export const handleDeletePermission = async (id: string) =>
  handleResponse(deletePermission, id);

export const handleUpdatePermission = async (
  id: string,
  permission: PermissionFormValues,
) => handleResponse(updatePermission, id, permission);
