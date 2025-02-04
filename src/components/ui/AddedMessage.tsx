'use client';

import { useEffect, useState } from 'react';
import { Alert } from 'antd';

export default function AddedMessage({ name }: { name: string }) {
  const [createSucessMessage, setCreateSucessMessage] = useState('');

  useEffect(() => {
    const permissionCreateSuccess = sessionStorage.getItem(name);
    if (permissionCreateSuccess) {
      setCreateSucessMessage(permissionCreateSuccess);
      sessionStorage.removeItem(name);
    }
  }, [name]);

  return (
    <>
      {createSucessMessage !== '' && (
        <Alert message={createSucessMessage} type="success" showIcon closable />
      )}
    </>
  );
}
