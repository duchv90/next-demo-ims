export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Locked = 'locked',
}

export enum UserRole {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  User = 'User',
}

export enum UserPermission {
  ViewUser = 'view_users',
  CreateUser = 'add_users',
  UpdateUser = 'update_users',
  DeleteUser = 'delete_users',
  ViewRole = 'view_roles',
  CreateRole = 'add_roles',
  UpdateRole = 'update_roles',
  DeleteRole = 'delete_roles',
  ViewPermission = 'view_permissions',
  CreatePermission = 'add_permissions',
  UpdatePermission = 'update_permissions',
  DeletePermission = 'delete_permissions',
}
