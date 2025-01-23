'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PreLoading() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="fixed left-0 top-0 z-[1000] flex h-[100vh] w-[100vw] items-center justify-center bg-white">
          <div className="h-[90px] w-[90px] text-primary">
            <Image
              className="h-full w-full"
              src="/images/loading.gif"
              width={220}
              height={220}
              alt="Loading..."
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
}
