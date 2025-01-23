'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button, GetProp, Table, TableColumnsType, TableProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/es/table/interface';
import {
  PaginatedPermissions,
  PermissionDataTable,
  PermissionTableParams,
} from '@/types/permissions';
import { formatDateTime } from '@/utils/stringHelpers';
import SearchDataTable from '@/components/ui/SearchDataTable';
import { getPermissions } from '@/services/api';
import { useRouter } from '@/i18n/routing';
import { DEFAULT_PAGE_SIZE, Urls } from '@/constants';

export default function PermissionList({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  const t = useTranslations();
  const currentLocale = useLocale();
  const currentPage = parseInt(page as string, 10);
  const currentPageSize = parseInt(pageSize as string, 10);
  const initialData: PaginatedPermissions = {
    permissions: [],
    total: 0,
    page: isNaN(currentPage) ? 1 : currentPage,
    pageSize: isNaN(currentPageSize) ? DEFAULT_PAGE_SIZE : currentPageSize,
  };
  const router = useRouter();

  const [tableParams, setTableParams] = useState<
    PermissionTableParams<
      Exclude<GetProp<TableProps, 'pagination'>, boolean>,
      null,
      null,
      null
    >
  >({
    pagination: {
      current: initialData.page,
      pageSize: initialData.pageSize,
      total: initialData.total,
    },
  });

  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<PermissionDataTable[]>(
    initialData.permissions,
  );
  const [total, setTotal] = useState(initialData.total);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: TableColumnsType<PermissionDataTable> = [
    {
      title: t('permission.name'),
      dataIndex: 'name',
    },
    {
      title: t('permission.description'),
      dataIndex: 'description',
    },
    {
      title: t('permission.created_at'),
      dataIndex: 'createdAt',
      render: (createdAt: string) =>
        formatDateTime(new Date(createdAt), currentLocale),
    },
    {
      title: t('permission.updated_at'),
      dataIndex: 'updatedAt',
      render: (updatedAt: string) =>
        formatDateTime(new Date(updatedAt), currentLocale),
    },
    {
      title: t('permission.actions'),
      dataIndex: '',
      key: 'delete',
      width: 180,
      render: () => (
        <div className="flex gap-3">
          <a>{t('permission.edit')}</a>
          <a>{t('role.delete')}</a>
        </div>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<PermissionDataTable> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange: TableProps<PermissionDataTable>['onChange'] = (
    pagination,
  ) => {
    setTableParams({
      pagination,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setRoles([]);
    }
  };

  useEffect(() => {
    const fetchPermissions = async () => {
      setLoading(true);
      const params: Record<string, number> = {};
      if (tableParams.pagination) {
        if (tableParams.pagination.current)
          params.page = tableParams.pagination.current;
        if (tableParams.pagination.pageSize)
          params.pageSize = tableParams.pagination.pageSize;
      }
      const response = await getPermissions(params);
      setRoles(response?.permissions || []);
      setTotal(response?.total || 0);
      setLoading(false);
    };
    fetchPermissions();
  }, [tableParams]);

  return (
    <>
      <div className="mb-5 flex items-end justify-between py-3">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{t('permission.title')}</h1>
          <p className="mt-1 text-body-secondary">
            {t('permission.page_description')}
          </p>
        </div>
        <div className="flex items-center">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            loading={loading}
            onClick={() => router.push(Urls.newPermissions)}
          >
            {t('permission.create')}
          </Button>
        </div>
      </div>
      <div className="rounded-sm bg-white p-3 shadow-dashboard">
        <div className="flex justify-between p-3">
          <div className="flex items-center gap-2 whitespace-nowrap font-medium">
            {selectedRowKeys.length > 0 && (
              <>
                <span className="pr-3">
                  {t('permission.items_selected', {
                    count: selectedRowKeys.length,
                  })}
                </span>
                <Button className="min-w-20" danger size="small">
                  {t('permission.delete')}
                </Button>
                <span className="w-8"></span>
              </>
            )}
          </div>
          <SearchDataTable />
        </div>
        <Table<PermissionDataTable>
          loading={loading}
          columns={columns}
          dataSource={roles}
          rowSelection={rowSelection}
          pagination={{ ...tableParams.pagination, total }}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}
