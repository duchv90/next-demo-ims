import { NextRequest, NextResponse } from 'next/server';
import { getUsers } from '@/services/users';
import { decrypt } from '@/lib/session';
import { convertToString } from '@/utils/stringHelpers';
import { COOKIES, DEFAULT_PAGE_SIZE } from '@/constants';
import { UserStatus } from '@/constants/user';
import { PaginatedUsers, User, UserDataTable } from '@/types/users';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page');
    const pageSize = url.searchParams.get('pageSize');

    const pageNumber = page ? parseInt(page, 10) : 1;
    const pageSizeNumber = pageSize
      ? parseInt(pageSize, 10)
      : DEFAULT_PAGE_SIZE;

    const paginatedUsers: PaginatedUsers = {
      users: [],
      total: 0,
      page: pageNumber,
      pageSize: pageSizeNumber,
    };

    const cookies = req.cookies;
    const accessTokenEncrypted = cookies.get(COOKIES.ACCESS_TOKEN_NAME)?.value;

    if (accessTokenEncrypted) {
      const dataDecrypt = await decrypt(accessTokenEncrypted);
      if (dataDecrypt?.payload) {
        const accessToken: string = convertToString(dataDecrypt?.payload);
        const userData = await getUsers(
          accessToken,
          pageNumber,
          pageSizeNumber,
        );

        if (userData) {
          paginatedUsers.users = userData.users.map(
            (user: User): UserDataTable => ({
              key: user.id,
              id: user.id,
              username: user.username,
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              fullName: `${user.firstName || ''} ${user.lastName || ''}`,
              email: user.email,
              roles: user.roles,
              status: user.status as UserStatus,
              createdAt: user.created,
              updatedAt: user.updated,
            }),
          );
          paginatedUsers.total = userData.total;
        }
      }
    }

    return NextResponse.json(paginatedUsers);
  } catch (error) {
    console.error('Failed to fetch data: ', error);
    return NextResponse.error();
  }
}
