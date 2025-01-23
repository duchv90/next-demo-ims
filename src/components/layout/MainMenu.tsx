'use client';

import { Menu } from 'antd';
import { useAdminLayout } from '@/context/AdminLayoutContext';
import { MAIN_MENU } from '@/constants/menu';
import AntdIcon from '@/components/common/AntdIcon';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import type { MainMenu, MenuItem } from '@/types/menu';

export default function MainMenu() {
  const { collapsed } = useAdminLayout();
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const findActiveMenuItemWithParents = (
    menu: MenuItem[],
    activeHref: string,
    parents: string[],
  ): { activeItem: MenuItem; parents: string[] } | null => {
    for (const item of menu) {
      if (item.href === activeHref) {
        return { activeItem: item, parents };
      }

      if (item.children && item.children.length > 0) {
        const found = findActiveMenuItemWithParents(item.children, activeHref, [
          ...parents,
          item.id,
        ]);
        if (found) {
          return found;
        }
      }
    }

    return null;
  };

  const activeMenuItem = findActiveMenuItemWithParents(MAIN_MENU, pathname, []);

  const items: MainMenu[] = MAIN_MENU.map((menu) => {
    return {
      key: menu.id,
      icon: menu.icon !== '' ? <AntdIcon name={menu.icon} /> : '',
      label: menu.label[currentLocale as keyof typeof menu.label] || '',
      onClick:
        menu.href && menu.href !== ''
          ? () => {
              router.push(menu.href || '');
            }
          : () => {},
      children: menu.children
        ? menu.children.map((subMenu) => ({
            key: subMenu.id,
            label: subMenu.label[currentLocale as keyof typeof subMenu.label],
            onClick:
              subMenu.href && subMenu.href !== ''
                ? () => {
                    router.push(subMenu.href || '');
                  }
                : () => {},
          }))
        : undefined,
    };
  });

  return (
    <div className="">
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        defaultSelectedKeys={
          activeMenuItem ? [activeMenuItem.activeItem.id] : []
        }
        defaultOpenKeys={activeMenuItem ? activeMenuItem.parents : []}
      />
    </div>
  );
}
