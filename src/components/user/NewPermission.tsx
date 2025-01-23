'use client';

import { useTranslations } from 'next-intl';
import { Button, Card, Flex, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from '@/i18n/routing';
import { Urls } from '@/constants';

export default function NewPermission() {
  const t = useTranslations();

  return (
    <div className="flex h-full max-h-full flex-col">
      <div className="mb-5 flex items-end justify-between py-3">
        <div className="flex items-center">
          <Link
            className="mr-3 text-body hover:text-primary"
            href={Urls.permissions}
          >
            <ArrowLeftOutlined style={{ fontSize: 20 }} />
          </Link>
          <h1 className="text-2xl font-bold">
            {t('permission.new_permission')}
          </h1>
        </div>
        <div className="flex items-center">
          <Button className="min-w-20" type="primary">
            <span className="font-semibold uppercase">
              {t('permission.save')}
            </span>
          </Button>
        </div>
      </div>
      <div className="scrollbar-thumb-primary-500 scrollbar-track-primary-200 max-h-[calc(100%-86px)] flex-grow overflow-y-auto scrollbar-thin">
        <Flex gap="large" align="start" vertical>
          <Card className="w-full shadow-dashboard">
            <Form name="validateOnly" layout="vertical" autoComplete="off">
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
            </Form>
          </Card>
        </Flex>
      </div>
    </div>
  );
}
