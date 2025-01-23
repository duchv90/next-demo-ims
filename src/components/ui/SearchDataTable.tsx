'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Input, InputRef } from 'antd';
import { FunnelPlotOutlined } from '@ant-design/icons';

export default function SearchDataTable() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const searchBoxRef = useRef<InputRef>(null);

  useEffect(() => {
    if (open) {
      searchBoxRef.current?.focus();
    }
  }, [open]);

  return (
    <div className="relative flex flex-grow justify-end gap-2">
      <div className="overflow-hidden">
        <Input.Search
          className="max-w-full transition-all duration-300"
          placeholder={t('permission.search_placeholder')}
          style={{ width: open ? 680 : 0, opacity: open ? 1 : 0 }}
          allowClear
          ref={searchBoxRef}
        />
      </div>
      <Button
        onClick={() => setOpen(!open)}
        icon={<FunnelPlotOutlined className="text-lg" />}
      >
        <span className="invisible absolute left-0 top-0">
          {t('permission.search')}
        </span>
      </Button>
    </div>
  );
}
