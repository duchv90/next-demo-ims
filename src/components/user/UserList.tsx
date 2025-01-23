'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  GetProp,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from 'antd';
import { useTranslations } from 'next-intl';
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import UserAvatar from '@/components/user/UserAvatar';
import { PaginatedUsers, UserDataTable, UserTableParams } from '@/types/users';
import { getUsers } from '@/services/api';
import type { TableRowSelection } from 'antd/es/table/interface';
import { UserStatus } from '@/constants/user';

export default function UserList({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  const t = useTranslations();
  const currentPage = parseInt(page as string, 10);
  const currentPageSize = parseInt(pageSize as string, 10);
  const initialData: PaginatedUsers = {
    users: [],
    total: 0,
    page: isNaN(currentPage) ? 1 : currentPage,
    pageSize: isNaN(currentPageSize) ? 10 : currentPageSize,
  };

  const [tableParams, setTableParams] = useState<
    UserTableParams<
      Exclude<GetProp<TableProps, 'pagination'>, boolean>,
      null,
      null,
      null
    >
  >({
    pagination: {
      current: initialData.page,
      pageSize: initialData.pageSize,
    },
  });

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserDataTable[]>(initialData.users);
  const [total, setTotal] = useState(initialData.total);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: TableColumnsType<UserDataTable> = [
    {
      title: t('user.avatar'),
      dataIndex: 'avatar',
      width: 120,
      render: (avatar: string, record) => {
        const userLetters = record?.lastName
          ? `${record?.firstName.substring(0, 1) || ''}${record.lastName.substring(0, 1)}`
          : record?.firstName.substring(0, 2) || '';
        return <UserAvatar image={avatar} name={userLetters} />;
      },
    },
    {
      title: t('user.username'),
      dataIndex: 'username',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: t('user.full_name'),
      dataIndex: 'fullName',
      width: 150,
    },
    {
      title: t('user.email'),
      dataIndex: 'email',
    },
    {
      title: t('user.status.label'),
      dataIndex: 'status',
      width: 150,
      render: (status: UserStatus) => {
        const color = status === UserStatus.Active ? 'success' : 'error';
        const statusText = t(`user.status.${status}`);

        return (
          <Tag
            icon={
              status === UserStatus.Active ? (
                <CheckOutlined />
              ) : (
                <CloseOutlined />
              )
            }
            color={color}
          >
            {statusText}
          </Tag>
        );
      },
    },
    {
      title: t('user.roles'),
      dataIndex: 'roles',
      render: (roles: string[]) => (
        <div>
          {roles.map((role) => (
            <Tag key={role}>{role}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: t('user.actions'),
      dataIndex: '',
      key: 'delete',
      width: 180,
      render: () => (
        <div className="flex gap-3">
          <a>{t('user.edit')}</a>
          <a>{t('user.delete')}</a>
        </div>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<UserDataTable> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange: TableProps<UserDataTable>['onChange'] = (
    pagination,
  ) => {
    setTableParams({
      pagination,
    });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setUsers([]);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const params: Record<string, number> = {};
      if (tableParams.pagination) {
        if (tableParams.pagination.current)
          params.page = tableParams.pagination.current;
        if (tableParams.pagination.pageSize)
          params.pageSize = tableParams.pagination.pageSize;
      }
      const response = await getUsers(params);
      setUsers(response?.users || []);
      setTotal(response?.total || 0);
      setLoading(false);
    };

    fetchUsers();
  }, [tableParams]);

  return (
    <>
      <div className="mb-5 flex items-end justify-between py-3">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{t('user.title')}</h1>
          <p className="mt-1 text-body-secondary">
            {t('user.page_description')}
          </p>
        </div>
        <div className="flex items-center">
          <Button
            className=""
            type="primary"
            icon={loading ? <SyncOutlined spin /> : <PlusOutlined />}
            loading={loading}
          >
            {t('user.create')}
          </Button>
        </div>
      </div>
      <div className="rounded-sm bg-white p-3 shadow-dashboard">
        <Table<UserDataTable>
          loading={loading}
          columns={columns}
          dataSource={users}
          rowSelection={rowSelection}
          pagination={{ ...tableParams.pagination, total }}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}
