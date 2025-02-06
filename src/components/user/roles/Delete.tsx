'use client';

import { useState } from 'react';
import { Button, notification, Popconfirm } from 'antd';
import { useTranslations } from 'next-intl';
import { handleDeleteRole } from '@/app/actions/roles';

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

  const handleOk = async () => {
    setConfirmLoading(true);

    try {
      const data = await handleDeleteRole(id);

      if (data?.error) {
        handleNotification(data.message || '');
        return;
      }

      setConfirmLoading(false);
      setOpen(false);
      window.location.reload();
    } catch {
      handleNotification(t('common.messages.server_error'));
    }
  };

  return (
    <>
      {contextHolder}
      <Popconfirm
        title={t('common.delete_confirm_title')}
        description={t('role.delete_confirm', { name })}
        open={open}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={() => setOpen(false)}
        placement="left"
        okText={t('common.ok_button')}
        cancelText={t('common.cancel_button')}
      >
        <Button type="link" onClick={() => setOpen(true)}>
          {t('form.button_label.delete')}
        </Button>
      </Popconfirm>
    </>
  );
}
