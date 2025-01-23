import { MenuProps } from 'antd';

export type MainMenu = Required<MenuProps>['items'][number];

export type MenuItem = {
  id: string;
  href?: string;
  icon: string;
  label: {
    vi: string;
    en: string;
  };
  disabled: boolean;
  pathnames?: string[];
  children?: MenuItem[];
};
