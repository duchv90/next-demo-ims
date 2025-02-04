'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Alert, Button, Card, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useRouter } from '@/i18n/routing';
import { PermissionFormValues } from '@/types/permissions';
import { handleAddPermission } from '@/app/actions/permisstions';
import { SESSIONS, Urls } from '@/constants';

export default function NewPermissionForm() {
  const t = useTranslations();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });

  const validateMessages = {
    required: t('form.required'),
    types: {
      email: t('form.invalid_email'),
      number: t('form.invalid_number'),
    },
  };

  const onFinish = async (values: PermissionFormValues) => {
    setLoading(true);
    setError({ status: false, message: '' });

    const data = await handleAddPermission(values);

    if (data?.error) {
      setError({ status: data.error, message: data.message || '' });
    } else if (data) {
      sessionStorage.setItem(
        SESSIONS.PERMISSION_CREATE_SUCCESS,
        t('permission.create_success'),
      );
      router.push(Urls.permissions);
    } else {
      setError({ status: true, message: 'Unable to connect to server' });
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
          <Link
            className="mr-3 flex items-center text-body hover:text-primary"
            href={Urls.permissions}
          >
            <ArrowLeftOutlined style={{ fontSize: 20 }} />
          </Link>
          <h1 className="text-2xl font-bold">
            {t('permission.new_permission')}
          </h1>
        </div>
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
      <div className="scrollbar-thumb-primary-500 scrollbar-track-primary-200 max-h-[calc(100%-86px)] flex-grow overflow-y-auto scrollbar-thin">
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
      </div>
    </Form>
  );
}
