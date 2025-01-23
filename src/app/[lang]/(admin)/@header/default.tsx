'use client';

import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useAdminLayout } from '@/context/AdminLayoutContext';
import { useTranslations } from 'next-intl';
import HeaderUser from '@/components/user/HeaderUser';
import HeaderNotification from '@/components/notification/HeaderNotification';

export default function Header() {
  const t = useTranslations();
  const { collapsed, toggleCollapsed } = useAdminLayout();

  return (
    <>
      <div className="flex justify-between bg-white min-h-[60px]">
        <div className="px-5">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined className="!text-[20px]" /> : <MenuFoldOutlined className="!text-[20px]" />}
            onClick={() => toggleCollapsed()}
            style={{
              width: 60,
              height: 60,
            }}
            aria-label={t('sidebar.button_label')}
          />
        </div>
        <div className="flex flex-row items-center px-5">
          <HeaderNotification />
          <HeaderUser />
        </div>
      </div>
    </>
  );
}
