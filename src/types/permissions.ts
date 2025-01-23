export interface Permission {
  id: string;
  name: string;
  description?: string;
  updated: string;
  created: string;
}

export interface PermissionInfo {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface PermissionDataTable extends PermissionInfo {
  key: string;
}

export interface PermissionTableParams<T, U, V, W> {
  pagination?: T;
  sortField?: U;
  sortOrder?: V;
  filters?: W;
}

export interface PaginatedPermissions {
  permissions: PermissionDataTable[];
  total: number;
  page: number;
  pageSize: number;
}
