import { ThemeConfig } from 'antd';
import { variables } from './global';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: variables.colorPrimary,
    fontFamily: variables.fontFamily,
    fontSize: 14,
    colorTextBase: variables.bodyColor,
    colorBgBase: variables.bodyBg,
    colorBgLayout: variables.colorLayoutBg,
    controlHeight: 42,
    borderRadius: 4,
  },
  components: {
    Form: {
      labelRequiredMarkColor: '#ff4d4f',
      labelHeight: 24,
      verticalLabelPadding: '0 0 6px',
    },
    Layout: {
      siderBg: '#111c43',
    },
    Menu: {
      darkItemBg: 'transparent',
      darkItemColor: '#a3aed1',
      darkItemHoverBg: 'rgba(255, 255, 255, 0.1)',
      darkItemHoverColor: 'rgba(255, 255, 255, 1)',
      darkItemSelectedBg: 'rgba(255, 255, 255, 0.1)',
      darkItemSelectedColor: 'rgba(255, 255, 255, 1)',
      darkSubMenuItemBg: 'transparent',
      iconSize: 16,
      itemHeight: 46,
    },
  },
};
