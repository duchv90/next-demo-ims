'use client';

import { useCallback, useState } from 'react';
import { Button, Card, Empty, Flex, Form, Input } from 'antd';
import { useTranslations } from 'next-intl';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from '@/i18n/routing';
import { RoleFormValues, RoleInfo } from '@/types/roles';
import { handleUpdateRole } from '@/app/actions/roles';
import MessageAlert from '@/components/ui/MessageAlert';
import { Urls } from '@/constants';
import RolePermissions from '../user/RolePermissions';

const initialMessage = {
  status: false,
  message: '',
};

export default function UpdateRoleForm({ data }: { data: RoleInfo | null }) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialMessage);
  const [success, setSuccess] = useState(initialMessage);
  const [permissions, setPermissions] = useState<string[]>(
    data && data.permissionIds ? data.permissionIds : [],
  );

  const validateMessages = {
    required: t('form.required'),
    types: {
      email: t('form.invalid_email'),
      number: t('form.invalid_number'),
    },
  };

  const updatePermissions = (newPermissions: string[]) => {
    setPermissions(newPermissions);
  };

  const onFinish = useCallback(
    async (values: RoleFormValues) => {
      setLoading(true);
      setError(initialMessage);
      setSuccess(initialMessage);

      if (data) {
        const response = await handleUpdateRole(data.id, values, permissions);

        if (response) {
          if (response.error) {
            setError({
              status: response.error,
              message: response.message || '',
            });
          } else {
            setSuccess({
              status: true,
              message: t('role.update_role_success'),
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
    [data, permissions],
  );

  return (
    <Form
      className="flex h-full max-h-full flex-col"
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      validateMessages={validateMessages}
      onFinish={onFinish}
      initialValues={data || {}}
    >
      <div className="mb-5 flex items-end justify-between py-3">
        <div className="flex items-center">
          <Link
            className="mr-3 flex items-center text-body hover:text-primary"
            href={Urls.roles}
          >
            <ArrowLeftOutlined style={{ fontSize: 20 }} />
          </Link>
          <h1 className="text-2xl font-bold">{t('role.update_role')}</h1>
        </div>
        <div className="flex items-center">
          <Button
            className="min-w-20"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            <span className="font-semibold uppercase">{t('role.save')}</span>
          </Button>
        </div>
      </div>
      {data ? (
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
                    {t('role.name')}
                  </span>
                }
                rules={[{ required: true }]}
                wrapperCol={{ span: 12 }}
                extra={t('role.name_subtext')}
              >
                <Input placeholder={t('role.name_placeholder')} />
              </Form.Item>
              <Form.Item
                name="description"
                label={
                  <span className="font-semibold text-body">
                    {t('role.description')}
                  </span>
                }
                extra={t('role.description_subtext')}
                style={{ marginBottom: 0 }}
              >
                <Input.TextArea
                  rows={4}
                  placeholder={t('role.description_placeholder')}
                />
              </Form.Item>
            </Card>
            <Card className="w-full shadow-dashboard">
              <RolePermissions
                permissionIds={permissions}
                updatePermissions={updatePermissions}
              />
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
