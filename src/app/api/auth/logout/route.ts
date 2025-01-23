import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { convertToString } from '@/utils/stringHelpers';
import { authLogout } from '@/services/auth';
import { COOKIES, MESSAGE } from '@/constants';

export async function POST() {
  const cookieStore = await cookies();
  const refreshTokenEncrypted = cookieStore.get(
    COOKIES.REFRESH_TOKEN_NAME
  )?.value;
  if (refreshTokenEncrypted) {
    const dataDecrypt = await decrypt(refreshTokenEncrypted);

    if (dataDecrypt?.payload) {
      const refreshToken: string = convertToString(dataDecrypt?.payload);
      const logoutStatus = await authLogout(refreshToken);

      if (logoutStatus) {
        const response = NextResponse.json({ success: true });
        // Clear cookies or session
        response.cookies.delete(COOKIES.ACCESS_TOKEN_NAME);
        response.cookies.delete(COOKIES.REFRESH_TOKEN_NAME);
        return response;
      }
    }
  }

  return new NextResponse(JSON.stringify({ error: MESSAGE.SERVER_ERROR }), {
    status: 500,
  });
}
