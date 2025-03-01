'use client';

import { useState, useCallback } from 'react';
import { Button, Card, Empty, Flex, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import { Permission, PermissionFormValues } from '@/types/permissions';
import { Link } from '@/i18n/routing';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Urls } from '@/constants';
import { handleUpdatePermission } from '@/app/actions/permisstions';
import MessageAlert from '@/components/ui/MessageAlert';

const initialMessage = {
  status: false,
  message: '',
};

export default function UpdatePermissionForm({
  permission,
}: {
  permission: Permission | null;
}) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialMessage);
  const [success, setSuccess] = useState(initialMessage);

  const validateMessages = {
    required: t('form.required'),
    types: {
      email: t('form.invalid_email'),
      number: t('form.invalid_number'),
    },
  };

  const onFinish = useCallback(
    async (values: PermissionFormValues) => {
      setLoading(true);
      setError(initialMessage);
      setSuccess(initialMessage);

      if (permission) {
        const data = await handleUpdatePermission(permission.id, values);

        if (data) {
          if (data.error) {
            setError({ status: data.error, message: data.message || '' });
          } else {
            setSuccess({
              status: true,
              message: t('permission.update_permission_success'),
            });
          }
        } else {
          setError({
            status: true,
            message: t('common.messages.server_error'),
          });
        }
      }

      setLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [permission],
  );

  return (
    <Form
      className="flex h-full max-h-full flex-col"
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      validateMessages={validateMessages}
      onFinish={onFinish}
      initialValues={permission || {}}
    >
      <div className="mb-5 flex items-end justify-between py-3">
        <div className="flex items-center">
          <Link
            className="mr-3 flex items-center text-body hover:text-primary"
            href={Urls.permissions}
          >
            <ArrowLeftOutlined style={{ fontSize: 20 }} />
          </Link>
          <h1 className="text-2xl font-bold">
            {t('permission.update_permission')}
          </h1>
        </div>
        <div className="flex items-center">
          <Button
            className="min-w-20"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            <span className="font-semibold uppercase">
              {t('permission.save')}
            </span>
          </Button>
        </div>
      </div>
      {permission ? (
        <div className="scrollbar-thumb-primary-500 scrollbar-track-primary-200 max-h-[calc(100%-86px)] flex-grow overflow-y-auto scrollbar-thin">
          <Flex gap="large" align="start" vertical>
            {error.status && (
              <MessageAlert message={error.message} type="error" />
            )}
            {success.status && (
              <MessageAlert message={success.message} type="success" />
            )}
            <Card className="w-full shadow-dashboard">
              <Form.Item
                name="name"
                label={
                  <span className="font-semibold text-body">
                    {t('permission.name')}
                  </span>
                }
                rules={[{ required: true }]}
                wrapperCol={{ span: 12 }}
                extra={t('permission.name_subtext')}
              >
                <Input placeholder={t('permission.name_placeholder')} />
              </Form.Item>
              <Form.Item
                name="description"
                label={
                  <span className="font-semibold text-body">
                    {t('permission.description')}
                  </span>
                }
                extra={t('permission.description_subtext')}
                style={{ marginBottom: 0 }}
              >
                <Input.TextArea
                  rows={4}
                  placeholder={t('permission.description_placeholder')}
                />
              </Form.Item>
            </Card>
          </Flex>
        </div>
      ) : (
        <Card className="w-full shadow-dashboard">
          <Empty />
        </Card>
      )}
    </Form>
  );
}
