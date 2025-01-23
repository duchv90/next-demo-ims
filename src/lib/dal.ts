import 'server-only';

import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { COOKIES } from '@/constants';
import { getRefreshAccessToken, verify, getUserInfo } from '@/services/auth';
import { convertToString } from '@/utils/stringHelpers';
import { createTokenSession } from '@/lib/token';
import { UserProfileCompact } from '@/types/users';

const verifyRefreshToken = async () => {
  const cookieStore = await cookies();
  const refreshTokenEncrypted = cookieStore.get(
    COOKIES.REFRESH_TOKEN_NAME,
  )?.value;

  if (refreshTokenEncrypted) {
    const dataDecrypt = await decrypt(refreshTokenEncrypted);

    if (dataDecrypt?.payload) {
      const refreshToken: string = convertToString(dataDecrypt?.payload);
      const userTokens = await getRefreshAccessToken(refreshToken);

      if (userTokens) {
        const response = await verify(userTokens.accessToken);

        if (response && response.authenticated) {
          await createTokenSession(
            userTokens.accessToken,
            userTokens.refreshToken,
          );

          return {
            isAuthenticated: response.authenticated,
          };
        }
      }
    }
  }

  // Remove token from cookies
  cookieStore.delete(COOKIES.ACCESS_TOKEN_NAME);
  cookieStore.delete(COOKIES.REFRESH_TOKEN_NAME);

  return { isAuthenticated: false };
};

export const verifySession = async () => {
  const cookieStore = await cookies();
  const accessTokenEncrypted = cookieStore.get(
    COOKIES.ACCESS_TOKEN_NAME,
  )?.value;

  if (accessTokenEncrypted) {
    const dataDecrypt = await decrypt(accessTokenEncrypted);
    if (dataDecrypt?.payload) {
      const accessToken: string = convertToString(dataDecrypt?.payload);
      const response = await verify(accessToken);

      if (response && response.authenticated) {
        return {
          isAuthenticated: response.authenticated,
        };
      }
    }
  }

  // Refresh Access Token
  return await verifyRefreshToken();
};

export const getCurrentUser = async (): Promise<UserProfileCompact | null> => {
  const cookieStore = await cookies();
  const accessTokenEncrypted = cookieStore.get(
    COOKIES.ACCESS_TOKEN_NAME,
  )?.value;

  if (accessTokenEncrypted) {
    const dataDecrypt = await decrypt(accessTokenEncrypted);
    if (dataDecrypt?.payload) {
      const accessToken: string = convertToString(dataDecrypt?.payload);
      const userData = await getUserInfo(accessToken);

      if (userData) {
        return {
          id: userData.id,
          firstName: userData?.firstName || '',
          lastName: userData?.lastName || '',
          avatar: userData?.avatar || '',
          roles: userData?.roles || [],
          permissions: userData?.permissions || [],
        };
      }
    }
  }

  return null;
};
