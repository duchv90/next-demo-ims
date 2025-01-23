'use client';

import { Layout } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Urls } from '@/constants';
import { useAdminLayout } from '@/context/AdminLayoutContext';
import MainMenu from '@/components/layout/MainMenu';
import LocaleSwitcher from '@/components/common/LocaleSwitcher';

export default function Sidebar() {
  const { Sider } = Layout;
  const t = useTranslations();

  const { collapsed, toggleCollapsed } = useAdminLayout();

  return (
    <Sider
      trigger={null}
      width={260}
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
    >
      <div className="relative flex min-h-[60px] items-center justify-center px-[10px] pt-[5px] after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-[1px] after:border-solid after:border-white/10">
        <Link className="main-logo" href={Urls.homepage}>
          {/* <Image
            src={collapsed ? '/images/logo-text.svg' : '/images/logo.svg'}
            alt={t('general.title')}
            width={collapsed ? 70 : 110}
            height={collapsed ? 30 : 40}
          /> */}
          <Image
            src={collapsed ? '/images/golfzon.svg' : '/images/golfzon.svg'}
            alt={t('general.title')}
            width={collapsed ? 70 : 110}
            height={collapsed ? 30 : 40}
          />
        </Link>
      </div>
      <div className="py-5">
        <MainMenu />
      </div>
      <div className="block h-20"></div>
      <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center bg-white/5 py-6">
        <LocaleSwitcher color="text-white" compact={collapsed} />
      </div>
    </Sider>
  );
}
