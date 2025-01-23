import { getLocale } from 'next-intl/server';
import CardHeader from '@/components/dashboard/CardHeader';
import DataAnalyticsChart from '@/components/dashboard/DataAnalyticsChart';

export default async function DataAnaltics() {
  const locale = await getLocale();

  const data = {
    vi: {
      title: 'Phân tích doanh số',
      description: 'Phân tích doanh số với dữ liệu hàng năm',
    },
    en: {
      title: 'Revenue Analytics',
      description: 'Revenue Analytics with annual data',
    },
  };

  const currentData = data[locale as keyof typeof data];

  return (
    <div className="flex h-full flex-col">
      <CardHeader
        className="w-full"
        title={currentData.title}
        subtitle={currentData.description}
      />
      <DataAnalyticsChart />
    </div>
  );
}
