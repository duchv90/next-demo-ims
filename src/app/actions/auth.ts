'use server';

import { getTranslations } from 'next-intl/server';
import { authLogin } from '@/services/auth';
import { isStringEmpty } from '@/utils/stringHelpers';
import { UserLogin } from '@/types/users';
import { Urls } from '@/constants';
import { createTokenSession } from '@/lib/token';

export async function handleSignIn(formData: FormData) {
  const t = await getTranslations();

  const username: string = formData.get('username')?.toString() || '';
  const password: string = formData.get('password')?.toString() || '';

  interface loginData {
    status?: string;
    username?: boolean;
    password?: boolean;
    access_token?: string;
    refresh_token?: string;
  }

  const userLogin: UserLogin<loginData> = {
    error: true,
    data: {}
  };

  if (!isStringEmpty(username) && !isStringEmpty(password)) {
    const auth: UserLogin<loginData> = await authLogin(username, password);

    if (auth.error) {
      // USER_NOT_FOUND, WRONG_PASSWORD, USER_NOT_ACTIVE, SERVER_ERROR, INVALID_REQUEST
      const errorStatus = auth.data.status || 'INVALID_REQUEST';
      userLogin.message = t(`login.messages.${errorStatus}`);
      if (auth.data.status === 'WRONG_PASSWORD') userLogin.data.password = true;
    } else {
      // LOGIN SUCCESSED
      userLogin.error = false;
      userLogin.redirect = Urls.dashboard;

      // Set cookie access_token and refresh_token
      if (auth.data.access_token && auth.data.refresh_token) {
        await createTokenSession(auth.data.access_token, auth.data.refresh_token);
      }
    }
  }

  return userLogin;
}
