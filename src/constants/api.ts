export const API_URL: string = process.env.API_URL || '';

export const API = {
  LOGIN: `${API_URL}/auth/login`,
  LOGOUT: `${API_URL}/auth/logout`,
  AUTH_VERIFY: `${API_URL}/auth/verify`,
  USER_INFO: `${API_URL}/users/info`,
  GET_USERS: `${API_URL}/users`,
  GET_ROLES: `${API_URL}/roles`,
  GET_ROLE: `${API_URL}/roles`,
  CREATE_ROLE: `${API_URL}/roles`,
  UPDATE_ROLE: `${API_URL}/roles`,
  GET_PERMISSIONS: `${API_URL}/permissions`,
  GET_PERMISSION: `${API_URL}/permissions`,
  CREATE_PERMISSION: `${API_URL}/permissions`,
  UPDATE_PERMISSION: `${API_URL}/permissions`,
  DELETE_ROLE: `${API_URL}/roles`,
  DELETE_PERMISSION: `${API_URL}/permissions`,
  REFRESH_ACCESS_TOKEN: `${API_URL}/auth/refresh-token`,
};

export const API_INTERNAL = {
  NOTIFICATION: '/api/notifications',
  LOGOUT: '/api/auth/logout',
  GET_USER: '/api/users',
  GET_ROLE: '/api/roles',
  GET_PERMISSION: '/api/permissions',
};
