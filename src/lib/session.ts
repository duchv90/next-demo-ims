import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { convertExpireTimeToMilliseconds } from '@/utils/stringHelpers';

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
    })
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(cookieStore: any, name: string, value: string, expirationTime: string) { // eslint-disable-line
  const expiresAt = new Date(Date.now() + convertExpireTimeToMilliseconds(expirationTime));
  const session = await encrypt(value, expirationTime);

  cookieStore.set(name, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}
