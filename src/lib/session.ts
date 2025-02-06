import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import {
  convertExpireTimeToMilliseconds,
  convertToString,
} from '@/utils/stringHelpers';
import { cookies } from 'next/headers';
import { COOKIES } from '@/constants';

const secretKey: string = process.env.SESSION_SECRET || '';
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: string, expirationTime: string) {
  return new SignJWT({ payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(
  cookieStore: any, // eslint-disable-line
  name: string,
  value: string,
  expirationTime: string,
) {
  const expiresAt = new Date(
    Date.now() + convertExpireTimeToMilliseconds(expirationTime),
  );
  const session = await encrypt(value, expirationTime);

  cookieStore.set(name, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const accessTokenEncrypted = cookieStore.get(
    COOKIES.ACCESS_TOKEN_NAME,
  )?.value;

  if (!accessTokenEncrypted) {
    return null;
  }

  const dataDecrypt = await decrypt(accessTokenEncrypted);
  const accessToken = convertToString(dataDecrypt?.payload);

  if (!accessToken) {
    return null;
  }

  return accessToken;
};
