'use client';

import { useLoading } from '@/context/LoadingContext';
import { Button } from 'antd';

export default function DashboardButton() {
  const { startLoading, stopLoading } = useLoading();

  const onClick = () => {
    startLoading();

    setTimeout(() => {
      stopLoading();
    }, 4600);
  };

  return (
    <Button className="block w-full" type="primary" onClick={onClick}>
      LOADING ....
    </Button>
  );
}
