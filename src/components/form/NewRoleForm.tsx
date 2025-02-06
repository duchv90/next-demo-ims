'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Alert, Button, Card, Flex, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useRouter } from '@/i18n/routing';
import { RoleFormValues } from '@/types/roles';
import { handleAddRole } from '@/app/actions/roles';
import RolePermissions from '@/components/user/RolePermissions';
import { SESSIONS, Urls } from '@/constants';

export default function NewRoleForm() {
  const t = useTranslations();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });
  const [permissions, setPermissions] = useState<string[]>([]);

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

  const onFinish = async (values: RoleFormValues) => {
    setLoading(true);
    setError({ status: false, message: '' });

    const data = await handleAddRole(values, permissions);

    if (data?.error) {
      setError({ status: data.error, message: data.message || '' });
    } else if (data) {
      sessionStorage.setItem(
        SESSIONS.ROLE_CREATE_SUCCESS,
        t('role.create_success'),
      );
      router.push(Urls.roles);
    } else {
      setError({ status: true, message: t('common.messages.server_error') });
    }

    setLoading(false);
  };

  return (
    <Form
      className="flex h-full max-h-full flex-col"
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <div className="mb-5 flex items-end justify-between py-3">
        <div className="flex items-center">
          <Link className="mr-3 text-body hover:text-primary" href={Urls.roles}>
            <ArrowLeftOutlined style={{ fontSize: 20 }} />
          </Link>
          <h1 className="text-2xl font-bold">{t('role.new_role')}</h1>
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
      <div className="scrollbar-thumb-primary-500 scrollbar-track-primary-200 max-h-[calc(100%-86px)] flex-grow overflow-y-auto scrollbar-thin">
        <Flex gap="large" align="start" vertical>
          {error.status && (
            <Alert
              className="w-full"
              message={error.message}
              type="error"
              closable
            />
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
    </Form>
  );
}
