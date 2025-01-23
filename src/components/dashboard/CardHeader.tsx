'use client';

import { Dropdown, MenuProps } from 'antd';
import { useTranslations } from 'next-intl';
import SvgEllipsisVertical from '@/styles/svgs/ellipsis-vertical.svg';

export default function CardHeader({
  className,
  title,
  subtitle,
}: Readonly<{
  className?: string;
  title?: string;
  subtitle?: string;
}>) {
  const t = useTranslations();
  const items: MenuProps['items'] = [
    {
      label: (<button type="button">{t('dashboard.view_more')}</button>),
      key: '0',
    },
    {
      label: (<button type="button">{t('dashboard.delete')}</button>),
      key: '1',
    },
  ];

  return (
    <div
      className={`relative flex justify-between items-start p-5 pb-0${
        className !== undefined ? ` ${className}` : ''
      }`}
    >
      <div className="mr-3">
        {title && <h2 className="text-xl font-semibold">{title}</h2>}
        {subtitle && <p className="text-base text-gray-500">{subtitle}</p>}
      </div>
      <Dropdown
        menu={{items}}
        placement="bottomRight"
        trigger={['click']}
      >
        <button
          className="flex items-center justify-center size-9 p-0 rounded-full text-gray-400 text-xl transition duration-300 hover:bg-gray-200 hover:text-body-secondary [&.ant-dropdown-open]:bg-gray-200 [&.ant-dropdown-open]:text-body-secondary"
          type="button"
          aria-label="More options"
        >
          <SvgEllipsisVertical className="size-5" />
        </button>
      </Dropdown>
    </div>
  );
}
