import { PaginatedUsers } from '@/types/users';
import { PaginatedRoles } from '@/types/roles';
import { PaginatedPermissions } from '@/types/permissions';
import { parseParamsToURL } from '@/utils/stringHelpers';
import { DEFAULT_PAGE_SIZE } from '@/constants';
import { API_INTERNAL } from '@/constants/api';

export const getUsers = async (
  params: Record<string, string | number> = {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  },
): Promise<PaginatedUsers | null> => {
  try {
    const url = parseParamsToURL(
      `${process.env.NEXT_PUBLIC_BASE_URL}${API_INTERNAL.GET_USER}`,
      params,
    );

    const response = await fetch(url, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();

      return {
        users: data.users,
        total: data.total,
        page: data.page,
        pageSize: data.pageSize,
      };
    }

    return null;
  } catch {
    console.error('Failed to fetch data');
    return null;
  }
};

export const getRoles = async (
  params: Record<string, string | number> = {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  },
): Promise<PaginatedRoles | null> => {
  try {
    const url = parseParamsToURL(
      `${process.env.NEXT_PUBLIC_BASE_URL}${API_INTERNAL.GET_ROLE}`,
      params,
    );

    const response = await fetch(url, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();

      return {
        roles: data.roles,
        total: data.total,
        page: data.page,
        pageSize: data.pageSize,
      };
    }

    return null;
  } catch {
    console.error('Failed to fetch data');
    return null;
  }
};

export const getPermissions = async (
  params: Record<string, string | number> = {
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  },
): Promise<PaginatedPermissions | null> => {
  try {
    const url = parseParamsToURL(
      `${process.env.NEXT_PUBLIC_BASE_URL}${API_INTERNAL.GET_PERMISSION}`,
      params,
    );

    const response = await fetch(url, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();

      return {
        permissions: data.permissions,
        total: data.total,
        page: data.page,
        pageSize: data.pageSize,
      };
    }

    return null;
  } catch {
    console.error('Failed to fetch data');
    return null;
  }
};
