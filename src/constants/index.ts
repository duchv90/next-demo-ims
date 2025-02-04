import { Locale } from '@/types/locale';

export const Urls = {
  homepage: '/',
  login: '/login',
  unauthorized: '/unauthorized',
  dashboard: '/dashboard',
  sales: '/sales',
  users: '/users',
  roles: '/users/roles',
  newRoles: '/users/roles/new',
  permissions: '/users/permissions',
  newPermissions: '/users/permissions/new',
  editPermissions: '/users/permissions/edit',
  emailSettings: '/settings/email',
  logSettings: '/settings/logs',
  preferences: '/settings/preferences',
};

export const COOKIES = {
  ACCESS_TOKEN_NAME:
    process.env.NODE_ENV === 'production'
      ? 'hvduc_at_c308385b2018da47f5c48b7475e38881'
      : 'dev_access_token',
  REFRESH_TOKEN_NAME:
    process.env.NODE_ENV === 'production'
      ? 'hvduc_rt_73de272367659fb1179945c9e6c7987d'
      : 'dev_refresh_token',
};

export const SESSIONS = {
  PERMISSION_CREATE_SUCCESS: 'new_permission_added_successfully',
};

export const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric', // 'numeric' | '2-digit' | undefined;
  month: '2-digit', // 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
  day: '2-digit', // 'numeric' | '2-digit' | undefined;
};

export const DATE_TIME_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric', // 'numeric' | '2-digit' | undefined;
  month: '2-digit', // 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
  day: '2-digit', // 'numeric' | '2-digit' | undefined;
  hour: 'numeric', // 'numeric' | '2-digit' | undefined;
  minute: 'numeric', // 'numeric' | '2-digit' | undefined;
};

export const MESSAGE = {
  SERVER_ERROR: '500 Internal Server Error',
};

export const LOCALES: Locale[] = [
  {
    language: 'vi',
    region: 'VN',
    currency: 'VND',
    flag: '/images/flags/vn.svg',
  },
  {
    language: 'en',
    region: 'US',
    currency: 'USD',
    flag: '/images/flags/us.svg',
  },
];

export const COLORS = [
  '#008FFB',
  '#00E396',
  '#FEB019',
  '#FF4560',
  '#775DD0',
  '#3f51b5',
  '#03a9f4',
  '#4caf50',
  '#f9ce1d',
  '#FF9800',
  '#33b2df',
  '#546E7A',
  '#d4526e',
  '#13d8aa',
  '#A5978B',
  '#4ecdc4',
  '#c7f464',
  '#81D4FA',
  '#fd6a6a',
  '#2b908f',
  '#f9a3a4',
  '#90ee7e',
  '#fa4443',
  '#69d2e7',
  '#449DD1',
  '#F86624',
  '#662E9B',
  '#C5D86D',
  '#D7263D',
  '#1B998B',
  '#2E294E',
  '#F46036',
  '#E2C044',
  '#F9C80E',
  '#EA3546',
  '#43BCCD',
  '#5C4742',
  '#8D5B4C',
  '#5A2A27',
  '#C4BBAF',
  '#A300D6',
  '#7D02EB',
  '#5653FE',
  '#2983FF',
  '#00B1F2',
];

export const DEFAULT_PAGE_SIZE = 20;
