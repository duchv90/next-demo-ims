'use client';

import { useState } from 'react';
import { Button, notification, Popconfirm } from 'antd';
import { useTranslations } from 'next-intl';
import { handleDeletePermission } from '@/app/actions/permisstions';

export default function Delete({ id, name }: { id: string; name: string }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const handleNotification = (content: string) => {
    setConfirmLoading(false);
    setOpen(false);
    api.error({
      message: t('common.delete_error_title'),
      description: content,
    });
  };

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    const data = await handleDeletePermission(id);

    if (data) {
      if (data.error) {
        handleNotification(data.message || '');
        return;
      }
    } else {
      handleNotification('Unable to connect to server');
      return;
    }

    setConfirmLoading(false);
    setOpen(false);

    window.location.reload();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Popconfirm
        title={t('common.delete_confirm_title')}
        description={t('permission.delete_confirm', { name })}
        open={open}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
        placement="left"
        okText={t('common.ok_button')}
        cancelText={t('common.cancel_button')}
      >
        <Button type="link" onClick={showPopconfirm}>
          {t('permission.delete')}
        </Button>
      </Popconfirm>
    </>
  );
}
