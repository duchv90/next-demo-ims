'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { headerUserMenus } from '@/constants/menu';
import { HeaderUserMenu } from '@/types/users';
import AntdIcon from '@/components/common/AntdIcon';
import LogoutButton from '@/components/ui/LogoutButton';

export default function HeaderUserDropdown() {
  const t = useTranslations();

  return (
    <div className="ant-dropdown-menu min-w-52">
      <ul className="list-none px-2 py-3">
        {headerUserMenus.map((menu: HeaderUserMenu, index: number) => {
          return (
            <li className="border-b border-dotted" key={index}>
              <Link
                className="flex w-full items-center rounded-s px-3 py-2 font-semibold text-body hover:bg-gray-100 hover:text-primary"
                href={menu.href}
              >
                <AntdIcon
                  name={menu.icon || ''}
                  className="relative -mt-[2px] mr-2 text-[16px]"
                />
                {t(menu.text)}
              </Link>
            </li>
          );
        })}
        <li>
          <LogoutButton iconName="LogoutOutlined" />
        </li>
      </ul>
    </div>
  );
}
