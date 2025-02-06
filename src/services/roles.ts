import 'server-only';

import { ApiResponse } from '@/types/api';
import requestOptions from '@/utils/requestOptions';
import { parseParamsToURL } from '@/utils/stringHelpers';
import { fetchDataFromServer } from '@/utils/fetchData';
import { API } from '@/constants/api';
import { RoleFormValues } from '@/types/roles';

export const getRoles = async (
  accessToken: string,
  page?: number,
  pageSize?: number,
) => {
  const url = parseParamsToURL(API.GET_ROLES, {
    page: page || null,
    pageSize: pageSize || null,
  });
  const response = await fetchDataFromServer(
    url,
    requestOptions('GET', accessToken),
  );

  if (response.error) {
    console.error('Failed to fetch roles');
    return null;
  }

  return {
    roles: response.data?.roles || [],
    total: response.data?.total || 0,
    page: response.data.page,
    pageSize: response.data.pageSize,
  };
};

export const getRole = async (accessToken: string, id: string) => {
  const result = await fetchDataFromServer(
    `${API.GET_ROLES}/${id}`,
    requestOptions('GET', accessToken),
  );

  if (!result.error && result.data && !result.data.isEmpty) {
    return result.data;
  }

  return null;
};

export const createRole = async (
  accessToken: string,
  role: RoleFormValues,
  permissions: string[],
): Promise<ApiResponse<object | null>> => {
  if (!role)
    return {
      error: true,
      message: 'Role data is required',
      data: null,
    };

  if (!role.description || role.description === undefined) {
    role.description = '';
  }

  return await fetchDataFromServer(
    API.CREATE_ROLE,
    requestOptions(
      'POST',
      accessToken,
      JSON.stringify({
        name: role.name,
        description: role.description,
        permissionIds: permissions,
      }),
    ),
  );
};

export const deleteRole = async (
  accessToken: string,
  id: string,
): Promise<ApiResponse<object | null>> => {
  const url = `${API.DELETE_ROLE}/${id}`;
  return await fetchDataFromServer(url, requestOptions('DELETE', accessToken));
};

export const updateRole = async (
  accessToken: string,
  id: string,
  role: RoleFormValues,
  permissions: string[],
): Promise<ApiResponse<object | null>> => {
  if (!role)
    return {
      error: true,
      message: 'Role data is required',
      data: null,
    };

  if (!role.description || role.description === undefined) {
    role.description = '';
  }

  return await fetchDataFromServer(
    `${API.UPDATE_ROLE}/${id}`,
    requestOptions(
      'PATCH',
      accessToken,
      JSON.stringify({
        name: role.name,
        description: role.description,
        permissionIds: permissions,
      }),
    ),
  );
};
