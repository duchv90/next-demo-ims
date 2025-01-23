'use server';

import { cookies } from 'next/headers';
import { COOKIES } from '@/constants';
import { createSession } from '@/lib/session';

export async function createTokenSession(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  const accessTokenExpirationTime: string = process.env.ACCESS_TOKEN_EXPIRATION_TIME || '30m';
  const refreshTokenExpirationTime: string = process.env.REFRESH_TOKEN_EXPIRATION_TIME || '7d';

  await createSession(
    cookieStore,
    COOKIES.ACCESS_TOKEN_NAME,
    accessToken,
    accessTokenExpirationTime
  );
  await createSession(
    cookieStore,
    COOKIES.REFRESH_TOKEN_NAME,
    refreshToken,
    refreshTokenExpirationTime
  );
}
