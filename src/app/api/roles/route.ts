import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';
import { PaginatedRoles, Role, RoleDataTable } from '@/types/roles';
import { getRoles } from '@/services/roles';
import { convertToString } from '@/utils/stringHelpers';
import { COOKIES, DEFAULT_PAGE_SIZE } from '@/constants';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page');
    const pageSize = url.searchParams.get('pageSize');

    const pageNumber = page ? parseInt(page, 10) : 1;
    const pageSizeNumber = pageSize
      ? parseInt(pageSize, 10)
      : DEFAULT_PAGE_SIZE;

    const paginatedRoles: PaginatedRoles = {
      roles: [],
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
        const rolesData = await getRoles(
          accessToken,
          pageNumber,
          pageSizeNumber,
        );

        if (rolesData) {
          paginatedRoles.roles = rolesData.roles.map(
            (role: Role): RoleDataTable => ({
              key: role.id,
              id: role.id,
              name: role.name,
              description: role.description || '',
              createdAt: role.created,
              updatedAt: role.updated,
              permissionIds: [],
            }),
          );
          paginatedRoles.total = rolesData.total;
        }
      }
    }

    return NextResponse.json(paginatedRoles);
  } catch (error) {
    console.error('Failed to fetch data: ', error);
    return NextResponse.error();
  }
}
