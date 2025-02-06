'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Button, GetProp, Table, TableColumnsType, TableProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/es/table/interface';
import { PaginatedRoles, RoleDataTable, RoleTableParams } from '@/types/roles';
import { formatDateTime } from '@/utils/stringHelpers';
import { getRoles } from '@/services/api';
import { useRouter } from '@/i18n/routing';
import SearchDataTable from '@/components/ui/SearchDataTable';
import AddedMessage from '@/components/ui/AddedMessage';
import Delete from '@/components/user/roles/Delete';
import { SESSIONS, Urls } from '@/constants';

export default function RoleList({
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
  const initialData: PaginatedRoles = {
    roles: [],
    total: 0,
    page: isNaN(currentPage) ? 1 : currentPage,
    pageSize: isNaN(currentPageSize) ? 10 : currentPageSize,
  };
  const router = useRouter();

  const [tableParams, setTableParams] = useState<
    RoleTableParams<
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
  const [roles, setRoles] = useState<RoleDataTable[]>(initialData.roles);
  const [total, setTotal] = useState(initialData.total);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: TableColumnsType<RoleDataTable> = [
    {
      title: t('role.name'),
      dataIndex: 'name',
    },
    {
      title: t('role.description'),
      dataIndex: 'description',
    },
    {
      title: t('role.created_at'),
      dataIndex: 'createdAt',
      render: (createdAt: string) =>
        formatDateTime(new Date(createdAt), currentLocale),
    },
    {
      title: t('role.updated_at'),
      dataIndex: 'updatedAt',
      render: (updatedAt: string) =>
        formatDateTime(new Date(updatedAt), currentLocale),
    },
    {
      title: t('role.actions'),
      dataIndex: 'id',
      key: 'delete',
      width: 180,
      render: (value, record, index) => {
        const updateURL = `${Urls.editRoles}/${value}`;
        const onClick = () => router.push(updateURL);
        return (
          <div className="flex gap-3" data-value={value} data-index={index}>
            <Button type="link" onClick={onClick}>
              {t('form.button_label.edit')}
            </Button>
            <Delete id={record.id} name={record.name} />
          </div>
        );
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<RoleDataTable> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange: TableProps<RoleDataTable>['onChange'] = (
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
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const params: Record<string, number> = {};
        if (tableParams.pagination) {
          if (tableParams.pagination.current)
            params.page = tableParams.pagination.current;
          if (tableParams.pagination.pageSize)
            params.pageSize = tableParams.pagination.pageSize;
        }
        const response = await getRoles(params);
        setRoles(response?.roles || []);
        setTotal(response?.total || 0);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, [tableParams]);

  return (
    <>
      <div className="mb-5 flex items-end justify-between py-3">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{t('role.title')}</h1>
          <p className="mt-1 text-body-secondary">
            {t('role.page_description')}
          </p>
        </div>
        <div className="flex items-center">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            loading={loading}
            onClick={() => router.push(Urls.newRoles)}
          >
            {t('role.create')}
          </Button>
        </div>
      </div>
      <div className="rounded-sm bg-white p-3 shadow-dashboard">
        <AddedMessage name={SESSIONS.ROLE_CREATE_SUCCESS} />
        <div className="flex justify-between p-3">
          <div className="flex items-center gap-2 whitespace-nowrap font-medium">
            {selectedRowKeys.length > 0 && (
              <>
                <span className="pr-3">
                  {t('role.items_selected', {
                    count: selectedRowKeys.length,
                  })}
                </span>
                <Button className="min-w-20" danger size="small">
                  {t('role.delete')}
                </Button>
                <span className="w-8"></span>
              </>
            )}
          </div>
          <SearchDataTable />
        </div>
        <Table<RoleDataTable>
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
