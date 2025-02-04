'use server';

import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { getPermission } from '@/services/permissions';
import { convertToString } from '@/utils/stringHelpers';
import { FetchDataTypes } from '@/enums';
import { COOKIES } from '@/constants';

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
        default:
          break;
      }

      return response;
    }
  }

  return null;
};
