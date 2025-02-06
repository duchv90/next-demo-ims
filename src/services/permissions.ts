import 'server-only';

import { PermissionFormValues } from '@/types/permissions';
import requestOptions from '@/utils/requestOptions';
import { parseParamsToURL } from '@/utils/stringHelpers';
import { fetchDataFromServer } from '@/utils/fetchData';
import { API } from '@/constants/api';
import { ApiResponse } from '@/types/api';

export const getPermissions = async (
  accessToken: string,
  page?: number,
  pageSize?: number,
) => {
  const url = parseParamsToURL(API.GET_PERMISSIONS, {
    page: page || null,
    pageSize: pageSize || null,
  });
  const result = await fetchDataFromServer(
    url,
    requestOptions('GET', accessToken),
  );

  if (!result.error) {
    return {
      permissions: result.data?.permissions || [],
      total: result.data?.total || 0,
      page: result.data.page,
      pageSize: result.data.pageSize,
    };
  }

  return null;
};

export const getPermission = async (accessToken: string, id: string) => {
  const result = await fetchDataFromServer(
    `${API.GET_PERMISSION}/${id}`,
    requestOptions('GET', accessToken),
  );

  if (!result.error && result.data && !result.data.isEmpty) {
    return result.data;
  }

  return null;
};

export const createPermission = async (
  accessToken: string,
  permission: PermissionFormValues,
): Promise<ApiResponse<object | null>> => {
  if (!permission)
    return {
      error: true,
      message: 'Permission data is required',
      data: null,
    };

  if (!permission.description || permission.description === undefined) {
    permission.description = '';
  }

  return await fetchDataFromServer(
    API.CREATE_PERMISSION,
    requestOptions('POST', accessToken, JSON.stringify(permission)),
  );
};

export const deletePermission = async (
  accessToken: string,
  id: string,
): Promise<ApiResponse<object | null>> => {
  return await fetchDataFromServer(
    `${API.DELETE_PERMISSION}/${id}`,
    requestOptions('DELETE', accessToken),
  );
};

export const updatePermission = async (
  accessToken: string,
  id: string,
  permission: PermissionFormValues,
): Promise<ApiResponse<object | null>> => {
  if (!permission)
    return {
      error: true,
      message: 'Permission data is required',
      data: null,
    };

  if (!permission.description || permission.description === undefined) {
    permission.description = '';
  }

  return await fetchDataFromServer(
    `${API.UPDATE_PERMISSION}/${id}`,
    requestOptions('PATCH', accessToken, JSON.stringify(permission)),
  );
};
