import 'server-only';

import { API } from '@/constants/api';
import { ApiResponse } from '@/types/api';
import { UserInfo, UserToken, UserVerify } from '@/types/users';
import requestOptions from '@/utils/requestOptions';

export const authLogin = async (email: string, password: string) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const body = JSON.stringify({
    username: email,
    password: password,
  });

  const fetchLogin: ApiResponse<object> = await fetch(API.LOGIN, {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
  })
    .then(async (response) => {
      const error = !response.ok;
      const responseData = await response.json();

      // Debug: responseData.message
      const output = {
        error: error,
        data: responseData.data,
      };

      return output;
    })
    .then((data) => data)
    .catch(() => ({
      error: true,
      data: {
        status: 'SERVER_ERROR',
      },
    }));

  return fetchLogin;
};

export const authLogout = async (refreshToken: string): Promise<boolean> => {
  try {
    const response = await fetch(
      API.LOGOUT,
      requestOptions('POST', refreshToken),
    );
    return response.ok;
  } catch {
    console.error('Unable to connect to server');
    return false;
  }
};

export const getUserInfo = async (
  accessToken: string,
): Promise<UserInfo | null> => {
  try {
    const response = await fetch(
      API.USER_INFO,
      requestOptions('GET', accessToken),
    );

    if (response.ok) {
      const responseData = await response.json();

      if (responseData.success) {
        return {
          id: responseData.data?.id,
          username: responseData.data?.username,
          firstName: responseData.data?.profile?.firstName,
          lastName: responseData.data?.profile?.lastName,
          avatar: responseData.data?.profile?.avatarUrl,
          roles: responseData.data?.roles,
          permissions: responseData.data?.permissions,
        };
      }
    }

    return null;
  } catch {
    console.error('Unable to connect to server');
    return null;
  }
};

export const getRefreshAccessToken = async (
  refreshToken: string,
): Promise<UserToken | null> => {
  try {
    const response = await fetch(
      API.REFRESH_ACCESS_TOKEN,
      requestOptions('POST', refreshToken),
    );

    if (response.ok) {
      const responseData = await response.json();

      if (
        responseData?.data?.access_token &&
        responseData?.data?.refresh_token
      ) {
        return {
          accessToken: responseData.data.access_token,
          refreshToken: responseData.data.refresh_token,
        };
      }
    }

    return null;
  } catch {
    console.error('Unable to connect to server');
    return null;
  }
};

export const verify = async (accessToken: string): Promise<UserVerify> => {
  try {
    const response = await fetch(
      API.AUTH_VERIFY,
      requestOptions('POST', accessToken),
    );

    if (response.ok) {
      const responseData = await response.json();

      if (responseData.success && responseData.data.authenticated) {
        return {
          authenticated: responseData.data.authenticated,
        };
      }
    } else {
      console.log('Unable to connect to server');
    }

    return {
      authenticated: false,
    };
  } catch {
    console.error('Unable to connect to server');
    return {
      authenticated: false,
      message: 'SERVER_ERROR',
    };
  }
};
