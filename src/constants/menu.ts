import { HeaderUserMenu } from '@/types/users';
import { Urls } from '@/constants';
import type { MenuItem } from '@/types/menu';

export const MENU_TYPES = {
  LINK: 'link',
  BUTTON: 'button',
};

export const headerUserMenus: HeaderUserMenu[] = [
  {
    type: MENU_TYPES.LINK,
    href: Urls.dashboard,
    text: 'header.profile',
    icon: 'ProfileOutlined',
  },
  {
    type: MENU_TYPES.LINK,
    href: Urls.homepage,
    text: 'header.settings',
    icon: 'SettingOutlined',
  },
  {
    type: MENU_TYPES.LINK,
    href: Urls.homepage,
    text: 'header.support',
    icon: 'PhoneOutlined',
  },
];

export const MAIN_MENU: MenuItem[] = [
  {
    id: '7c14adbf-e2b3-414c-ae36-af3abea684d4',
    href: Urls.dashboard,
    icon: 'HomeOutlined',
    label: {
      vi: 'Tổng quan',
      en: 'Dashboard',
    },
    disabled: false,
  },
  {
    id: '53d5a7e0-21b8-4970-a337-5262e1e923a2',
    href: Urls.sales,
    icon: 'HeartOutlined',
    label: {
      vi: 'Thống kê sales',
      en: 'Sales',
    },
    disabled: false,
  },
  {
    id: 'b691350c-89e4-49d1-9a32-4d6aba2fff3f',
    icon: 'UserOutlined',
    label: {
      vi: 'Quản lý người dùng',
      en: 'User Management',
    },
    disabled: false,
    children: [
      {
        id: '8870c0c7-2ed2-440e-9e8c-31e6df3e3146',
        href: Urls.users,
        icon: '',
        label: {
          vi: 'Người dùng',
          en: 'Users',
        },
        disabled: false,
      },
      {
        id: 'b5ad7444-8fbc-48ec-9e5e-8b99306dbd3f',
        href: Urls.roles,
        icon: '',
        label: {
          vi: 'Vai trò',
          en: 'Roles',
        },
        disabled: false,
      },
      {
        id: 'fc7bc517-8e7f-4698-86ef-a641f17fc4d2',
        href: Urls.permissions,
        icon: '',
        label: {
          vi: 'Phân quyền',
          en: 'Permissions',
        },
        disabled: false,
      },
    ],
  },
  {
    id: '7a879cfd-1c18-418f-8e53-fad9e2bef53e',
    icon: 'SettingOutlined',
    label: {
      vi: 'Thiết lập chung',
      en: 'General Settings',
    },
    disabled: false,
    children: [
      {
        id: '730140cb-70a1-43f0-bbef-59ad08e661b7',
        href: Urls.emailSettings,
        icon: '',
        label: {
          vi: 'Email',
          en: 'Email',
        },
        disabled: false,
      },
      {
        id: '59395b00-e260-4ad7-995f-8671a00664ec',
        href: Urls.logSettings,
        icon: '',
        label: {
          vi: 'Logs',
          en: 'Logs',
        },
        disabled: false,
      },
      {
        id: '15de0bf4-aeea-4497-a173-342a32549e39',
        href: Urls.preferences,
        icon: '',
        label: {
          vi: 'Cấu hình',
          en: 'Settings',
        },
        disabled: false,
      },
    ],
  },
];
