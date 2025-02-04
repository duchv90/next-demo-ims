import type { GetProp, TableColumnsType, TransferProps } from 'antd';

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
  description?: string;
  createdAt?: string;
  updatedAt?: string;
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

export interface PermissionsTransferProps
  extends TransferProps<GetProp<TransferProps, 'dataSource'>[number]> {
  dataSource: PermissionDataTable[];
  leftColumns: TableColumnsType<PermissionDataTable>;
  rightColumns: TableColumnsType<PermissionDataTable>;
}

export interface PermissionFormValues {
  name: string;
  description?: string;
}
