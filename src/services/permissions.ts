import 'server-only';

import requestOptions from '@/utils/requestOptions';
import { API } from '@/constants/api';
import { parseParamsToURL } from '@/utils/stringHelpers';

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
