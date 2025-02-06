import { useTranslations } from 'next-intl';
import { Flex, TableColumnsType, TransferProps } from 'antd';
import {
  PaginatedPermissions,
  PermissionDataTable,
  PermissionsTransferProps,
} from '@/types/permissions';
import RolePermissionsTransfer from '@/components/user/RolePermissionsTransfer';
import useFetch from '@/hooks/useFetch';
import { parseParamsToURL } from '@/utils/stringHelpers';
import { API_INTERNAL } from '@/constants/api';

export default function RolePermissions({
  permissionIds,
  updatePermissions,
}: Readonly<{
  permissionIds: string[];
  updatePermissions: (newPermissions: string[]) => void;
}>) {
  const t = useTranslations();

  const params = {
    page: '1',
    pageSize: '1000',
  };
  const url = parseParamsToURL(
    `${process.env.NEXT_PUBLIC_BASE_URL}${API_INTERNAL.GET_PERMISSION}`,
    params,
  );

  const { data } = useFetch<PaginatedPermissions>(url);
  const permissions =
    data?.permissions.map((permission) => ({
      key: permission.id,
      id: permission.id,
      name: permission.name,
      description: permission.description,
    })) || [];

  const columns: TableColumnsType<PermissionDataTable> = [
    {
      dataIndex: 'name',
      title: t('permission.name'),
    },
    {
      dataIndex: 'description',
      title: t('permission.description'),
    },
  ];

  const filterOption = (input: string, item: PermissionDataTable) =>
    item.name?.includes(input) || item.description?.includes(input) || false;

  const onChange: PermissionsTransferProps['onChange'] = (
    nextTargetKeys: TransferProps['targetKeys'],
  ) => {
    if (nextTargetKeys) {
      updatePermissions(nextTargetKeys as string[]);
    }
  };

  return (
    <Flex align="start" gap="middle" vertical>
      <div className="w-full">
        <h3 className="text-lg font-bold">{t('permission.transfer.title')}</h3>
        <p className="mt-[2px] text-body-secondary">
          {t('permission.transfer.description')}
        </p>
      </div>
      <RolePermissionsTransfer
        dataSource={permissions}
        targetKeys={permissionIds}
        showSearch
        showSelectAll={false}
        onChange={onChange}
        filterOption={filterOption}
        leftColumns={columns}
        rightColumns={columns}
        locale={{
          itemUnit: t('common.item_unit'),
          itemsUnit: t('common.items_unit'),
          notFoundContent: t('common.not_found_content'),
          searchPlaceholder: t('permission.transfer.search_placeholder'),
        }}
      />
    </Flex>
  );
}
