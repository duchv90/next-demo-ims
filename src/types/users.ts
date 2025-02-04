import { UserStatus } from '@/enums/user';
import { ApiResponse } from '@/types/api';

export interface User {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  roles: string[];
  status: string;
  updated: string;
  created: string;
}

export interface UserLogin<T> extends ApiResponse<T> {
  redirect?: string;
}

export interface UserVerify {
  authenticated: boolean;
  message?: string;
}

export interface UserInfo {
  id: string;
  username: string;
  firstName: string;
  lastName?: string;
  avatar?: string;
  roles?: string[];
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileCompact {
  id: string;
  firstName: string;
  lastName?: string;
  avatar?: string | null;
  roles?: string[];
  permissions?: string[];
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
}

export interface HeaderUserMenu {
  type: string;
  href: string;
  text: string;
  icon?: string;
}

export interface UserDataTable extends UserInfo {
  key: string;
  fullName?: string;
  email?: string;
  status?: UserStatus;
}

export interface UserTableParams<T, U, V, W> {
  pagination?: T;
  sortField?: U;
  sortOrder?: V;
  filters?: W;
}

export interface PaginatedUsers {
  users: UserDataTable[];
  total: number;
  page: number;
  pageSize: number;
}

export interface GetUsersParams {
  page: number;
  pageSize: number;
}
