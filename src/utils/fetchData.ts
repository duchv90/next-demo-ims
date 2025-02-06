'use server';

import { cookies } from 'next/headers';
import { decrypt, getAccessToken } from '@/lib/session';
import { ApiResponse } from '@/types/api';
import { getPermission } from '@/services/permissions';
import { getRole } from '@/services/roles';
import { convertToString } from '@/utils/stringHelpers';
import { FetchDataTypes } from '@/enums';
import { COOKIES } from '@/constants';

interface FetchDataResponse {
  error?: boolean;
  message?: string;
}

export const fetchData = async (type: FetchDataTypes, id: string) => {
  const cookieStore = await cookies();
  const accessTokenEncrypted = cookieStore.get(
    COOKIES.ACCESS_TOKEN_NAME,
  )?.value;

  if (accessTokenEncrypted) {
    const dataDecrypt = await decrypt(accessTokenEncrypted);
    if (dataDecrypt?.payload) {
      const accessToken: string = convertToString(dataDecrypt?.payload);
      let response = null;

      switch (type) {
        case FetchDataTypes.Permission:
          response = await getPermission(accessToken, id);
          break;
        case FetchDataTypes.Role:
          response = await getRole(accessToken, id);
          break;
        default:
          break;
      }

      return response;
    }
  }

  return null;
};

export const fetchDataFromServer = async (
  url: string,
  options: RequestInit,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok || !responseData.success) {
      return {
        error: true,
        message: responseData.message || 'Request failed',
        data: null,
      };
    }

    return {
      error: false,
      data: responseData.data,
    };
  } catch {
    return {
      error: true,
      message: 'Unable to connect to server',
      data: null,
    };
  }
};

export const handleResponse = async <T, A extends unknown[]>(
  action: (accessToken: string, ...args: A) => Promise<T>,
  ...args: A
): Promise<T | FetchDataResponse> => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return {
      error: true,
      message: 'Access token not found',
    };
  }

  try {
    return await action(accessToken, ...args);
  } catch {
    return {
      error: true,
      message: 'Unable to connect to server. Please check your authentication.',
    };
  }
};
