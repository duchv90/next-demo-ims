import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';
import {
  PaginatedPermissions,
  Permission,
  PermissionDataTable,
} from '@/types/permissions';
import { getPermissions } from '@/services/permissions';
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

    const paginatedPermissions: PaginatedPermissions = {
      permissions: [],
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
        const permissionsData = await getPermissions(
          accessToken,
          pageNumber,
          pageSizeNumber,
        );

        if (permissionsData) {
          paginatedPermissions.permissions = permissionsData.permissions.map(
            (permission: Permission): PermissionDataTable => ({
              key: permission.id,
              id: permission.id,
              name: permission.name,
              description: permission.description || '',
              createdAt: permission.created,
              updatedAt: permission.updated,
            }),
          );
          paginatedPermissions.total = permissionsData.total;
        }
      }
    }

    return NextResponse.json(paginatedPermissions);
  } catch (error) {
    console.error('Failed to fetch data: ', error);
    return NextResponse.error();
  }
}
