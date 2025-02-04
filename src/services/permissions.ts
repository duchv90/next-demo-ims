import 'server-only';

import { PermissionFormValues } from '@/types/permissions';
import requestOptions from '@/utils/requestOptions';
import { parseParamsToURL } from '@/utils/stringHelpers';
import { API } from '@/constants/api';
import { ApiResponse } from '@/types/api';

export const getPermissions = async (
  accessToken: string,
  page?: number,
  pageSize?: number,
) => {
  try {
    const url = parseParamsToURL(API.GET_PERMISSIONS, {
      page: page || null,
      pageSize: pageSize || null,
    });
    const response = await fetch(url, requestOptions('GET', accessToken));

    if (response.ok) {
      const responseData = await response.json();

      if (responseData.success) {
        return {
          permissions: responseData.data?.permissions || [],
          total: responseData.data?.total || 0,
          page: responseData.data.page,
          pageSize: responseData.data.pageSize,
        };
      }
    }

    return null;
  } catch {
    console.error('Unable to connect to server');
    return null;
  }
};

export const getPermission = async (accessToken: string, id: string) => {
  try {
    const response = await fetch(
      `${API.GET_PERMISSION}/${id}`,
      requestOptions('GET', accessToken),
    );

    if (response.ok) {
      const responseData = await response.json();

      if (
        responseData.success &&
        responseData.data &&
        !responseData.data.isEmpty
      ) {
        return responseData.data;
      }
    }

    return null;
  } catch {
    console.error('Unable to connect to server');
    return null;
  }
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

  try {
    const response = await fetch(
      API.CREATE_PERMISSION,
      requestOptions('POST', accessToken, JSON.stringify(permission)),
    );

    if (response.ok) {
      const responseData = await response.json();

      if (responseData.success) {
        return {
          error: false,
          data: responseData.data,
        };
      }
    }

    return {
      error: true,
      message: 'Unable to create permission',
      data: null,
    };
  } catch {
    return {
      error: true,
      message: 'Unable to connect to server',
      data: null,
    };
  }
};

export const deletePermission = async (
  accessToken: string,
  id: string,
): Promise<ApiResponse<object | null>> => {
  try {
    const response = await fetch(
      `${API.DELETE_PERMISSION}/${id}`,
      requestOptions('DELETE', accessToken),
    );

    if (response.ok) {
      const responseData = await response.json();

      if (responseData.success) {
        return {
          error: false,
          data: responseData.data,
        };
      }
    }

    return {
      error: true,
      message: 'Unable to delete permission',
      data: null,
    };
  } catch {
    return {
      error: true,
      message: 'Unable to connect to server',
      data: null,
    };
  }
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

  try {
    const response = await fetch(
      `${API.UPDATE_PERMISSION}/${id}`,
      requestOptions('PATCH', accessToken, JSON.stringify(permission)),
    );

    if (response.ok) {
      const responseData = await response.json();

      if (responseData.success) {
        return {
          error: false,
          data: responseData.data,
        };
      }
    }

    return {
      error: true,
      message: 'Unable to update permission',
      data: null,
    };
  } catch {
    return {
      error: true,
      message: 'Unable to connect to server',
      data: null,
    };
  }
};
