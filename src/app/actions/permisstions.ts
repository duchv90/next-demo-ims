'use server';

import { cookies } from 'next/headers';
import { PermissionFormValues } from '@/types/permissions';
import {
  createPermission,
  deletePermission,
  updatePermission,
} from '@/services/permissions';
import { decrypt } from '@/lib/session';
import { convertToString } from '@/utils/stringHelpers';
import { COOKIES } from '@/constants';

export async function handleAddPermission(permission: PermissionFormValues) {
  const cookieStore = await cookies();
  const accessTokenEncrypted = cookieStore.get(
    COOKIES.ACCESS_TOKEN_NAME,
  )?.value;

  if (accessTokenEncrypted) {
    const dataDecrypt = await decrypt(accessTokenEncrypted);
    if (dataDecrypt?.payload) {
      const accessToken: string = convertToString(dataDecrypt?.payload);
      const response = await createPermission(accessToken, permission);

      return response;
    }
  }

  return {
    error: true,
    message: 'Unable to connect to server. Please check your authentication.',
  };
}

export async function handleDeletePermission(id: string) {
  const cookieStore = await cookies();
  const accessTokenEncrypted = cookieStore.get(
    COOKIES.ACCESS_TOKEN_NAME,
  )?.value;

  if (accessTokenEncrypted) {
    const dataDecrypt = await decrypt(accessTokenEncrypted);
    if (dataDecrypt?.payload) {
      const accessToken: string = convertToString(dataDecrypt?.payload);
      const response = await deletePermission(accessToken, id);

      return response;
    }
  }

  return {
    error: true,
    message: 'Unable to connect to server. Please check your authentication.',
  };
}

export async function handleUpdatePermission(
  id: string,
  permission: PermissionFormValues,
) {
  const cookieStore = await cookies();
  const accessTokenEncrypted = cookieStore.get(
    COOKIES.ACCESS_TOKEN_NAME,
  )?.value;

  if (accessTokenEncrypted) {
    const dataDecrypt = await decrypt(accessTokenEncrypted);
    if (dataDecrypt?.payload) {
      const accessToken: string = convertToString(dataDecrypt?.payload);
      const response = await updatePermission(accessToken, id, permission);

      return response;
    }
  }

  return {
    error: true,
    message: 'Unable to connect to server. Please check your authentication.',
  };
}
