'use client';

import { useLocale, useTranslations } from 'next-intl';
import { handleSignIn } from '@/app/actions/auth';
import { Alert, Button, Form, Input } from 'antd';
import { useState } from 'react';
import { redirect } from '@/i18n/routing';
import { isStringEmpty } from '@/utils/stringHelpers';


export default function LoginForm() {
  type FieldType = {
    username?: string;
    password?: string;
  };

  const t = useTranslations('login');
  const currentLocale = useLocale();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    const formData: FormData = new FormData();

    Object.keys(values).forEach((key) => {
      const value: string = values[key as keyof typeof values] || '';
      formData.append(key, value);
    });

    const data = await handleSignIn(formData);

    if (data.error) {
      setError({
        status: data.error,
        message: data.message || '',
      })
    } else {
      const redirectURL: string = data.redirect || '';
      if (!isStringEmpty(redirectURL)) redirect({ href: redirectURL, locale: currentLocale });
    }

    setLoading(false);
  };

  return (
    <div className="px-[60px] py-6">
      <h2 className="mb-6 py-3 font-bold text-5xl">{t('title')}</h2>
      <Form
        name="login"
        layout="vertical"
        initialValues={{}}
        onFinish={onFinish}
        autoComplete="off"
      >
        {error.status && (
          <div className="mb-5">
            <Alert message={ error.message } type="error" closable />
          </div>
        )}
        <div className="mb-6">
          <label className="mb-2 block text-[14px] font-medium" htmlFor="login_username">{t('username.label')} <span className="px-1 text-required">*</span></label>
          <Form.Item
            className="!text-[14px]"
            name="username"
            rules={[{ required: true, message: t('username.required_message') }]}
          >
            <Input className="!border-0 !px-4" placeholder={t('username.placeholder')} type="email" />
          </Form.Item>
        </div>

        <div className="mb-6">
          <label className="block text-[14px] font-medium mb-2" htmlFor="login_username">{t('password.label')} <span className="px-1 text-required">*</span></label>
          <Form.Item
            className="!text-[14px]"
            name="password"
            rules={[{ required: true, message: t('password.required_message') }]}
          >
            <Input.Password className="!border-0 !px-4" placeholder={t('password.placeholder')} />
          </Form.Item>
        </div>

        <Form.Item className="!pt-5" label={null}>
          <Button className="w-full" type="primary" htmlType="submit" loading={loading}><span className="uppercase font-medium">{t('submit')}</span></Button>
        </Form.Item>
      </Form>
    </div>
  );
}
