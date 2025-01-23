import { Skeleton } from 'antd';

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-col py-5 pl-8">
      <Skeleton active />
      <Skeleton active className="mt-3" />
      <Skeleton active className="mt-3" />
      <Skeleton active className="mt-3" />
      <Skeleton active className="mt-3" />
    </div>
  );
}
