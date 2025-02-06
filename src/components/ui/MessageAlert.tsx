import { Alert } from 'antd';

export default function MessageAlert({
  message,
  type,
}: {
  message: string;
  type: 'success' | 'error';
}) {
  return <Alert className="w-full" message={message} type={type} closable />;
}
