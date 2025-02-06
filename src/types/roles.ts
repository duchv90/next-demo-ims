export interface Role {
  id: string;
  name: string;
  description?: string;
  updated: string;
  created: string;
}

export interface RoleInfo {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  permissionIds?: string[];
}

export interface RoleDataTable extends RoleInfo {
  key: string;
}

export interface RoleTableParams<T, U, V, W> {
  pagination?: T;
  sortField?: U;
  sortOrder?: V;
  filters?: W;
}

export interface PaginatedRoles {
  roles: RoleDataTable[];
  total: number;
  page: number;
  pageSize: number;
}

export interface RoleFormValues {
  name: string;
  description?: string;
}
