import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useUser } from '@/context/UserContext';
import UserAvatar from '@/components/user/UserAvatar';
import HeaderUserDropdown from '@/components/user/HeaderUserDropdown';

export default function HeaderUser() {
  const { user } = useUser();
  const userLetters = user?.lastName
    ? `${user?.firstName.substring(0, 1) || ''}${user.lastName.substring(0, 1)}`
    : user?.firstName.substring(0, 2) || '';

  return (
    <>
      {user && (
        <Dropdown
          className="ml-5"
          dropdownRender={() => <HeaderUserDropdown />}
          placement="bottomRight"
          trigger={['click']}
        >
          <div className="flex cursor-pointer items-center py-[14px] font-bold text-body-secondary">
            <UserAvatar image={user?.avatar} name={userLetters} />
            <div className="px-2">{`${user.firstName} ${user.lastName}`}</div>
            <span className="text-xs">
              <DownOutlined />
            </span>
          </div>
        </Dropdown>
      )}
    </>
  );
}
