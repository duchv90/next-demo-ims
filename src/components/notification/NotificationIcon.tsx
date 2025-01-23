import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons';

export default function NotificationIcon({ type }: Readonly<{ type: string }>) {
  let icon = <></>;

  switch (type) {
    case 'success':
      icon = <div className="text-green-600 text-lg"><CheckCircleOutlined /></div>;
      break;
    case 'warning':
      icon = <div className="text-yellow-600 text-lg"><WarningOutlined /></div>;
      break;
    case 'error':
      icon = <div className="text-red-600 text-lg"><ExclamationCircleOutlined /></div>;
      break;
    default:
      icon = <div className="text-blue-600 text-lg"><InfoCircleOutlined /></div>;
      break;
  }

  return icon;
}
