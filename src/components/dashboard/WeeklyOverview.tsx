import { Progress } from 'antd';
import { getLocale } from 'next-intl/server';
import { capitalize, formatMoney } from '@/utils/stringHelpers';
import CardHeader from '@/components/dashboard/CardHeader';
import WeeklyOverviewChart from '@/components/dashboard/WeeklyOverviewChart';
import { variables } from '@/styles/global';

export default async function WeeklyOverview() {
  const locale = await getLocale();

  const dailyStats = [40.12, 65.5, 50.68, 45.4, 90.0, 55.21, 70.69];
  const currentDay = new Date('01-15-2025').getDay();
  const progresColors = ['primary', 'secondary', 'tertiary'];

  const data = {
    vi: {
      title: 'Thống kê hàng tuần',
      description: 'Tổng quan về thu nhập hàng tuần',
      totals:
        dailyStats.reduce((acc, value, index) => {
          if (index < currentDay) return acc + value;
          return acc;
        }, 0) * 25000,
      summary: 'Bạn đã thông báo về tuần này so với tuần trước',
      stats: {
        heading: 'Tổng',
        labels: ['Th.2', 'Th.3', 'Th.4', 'Th.5', 'Th.6', 'Th.7', 'CN'],
        data: dailyStats.map((r) => r * 25000),
      },
      topItems: [
        { name: 'Sản phẩm một', amount: 369 * 25000 },
        { name: 'Sản phẩm hai', amount: 300 * 25000 },
        { name: 'Sản phẩm ba', amount: 268 * 25000 },
      ],
    },
    en: {
      title: 'Weekly Overview',
      description: 'Weekly Earnings Overview',
      totals: dailyStats.reduce((acc, value, index) => {
        if (index < currentDay) return acc + value;
        return acc;
      }, 0),
      summary: 'You informed of this week compared to last week',
      stats: {
        heading: 'Total',
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: dailyStats,
      },
      topItems: [
        { name: 'Item One', amount: 369 },
        { name: 'Item Two', amount: 300 },
        { name: 'Item Three', amount: 268 },
      ],
    },
  };

  const currentData = data[locale as keyof typeof data];

  return (
    <div className="flex flex-col">
      <CardHeader
        className="w-full"
        title={currentData.title}
        subtitle={currentData.description}
      />
      <div className="p-5">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-5 flex flex-col justify-center">
            <div className="text-3xl font-bold text-primary">
              {formatMoney(currentData.totals, locale)}
            </div>
            <p className="mt-3 text-body-secondary">{currentData.summary}</p>
          </div>
          <div className="col-span-7">
            <WeeklyOverviewChart
              heading={currentData.stats.heading}
              categories={currentData.stats.labels}
              data={currentData.stats.data}
            />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-10 rounded-md border border-gray-200 p-5">
          {currentData.topItems &&
            currentData.topItems.map((item, index) => (
              <div key={index} className="flex flex-col items-start pr-5">
                <div className="flex items-center">
                  <span
                    className={`relative mr-3 flex size-7 items-center justify-center overflow-hidden rounded-[4px] text-center text-${progresColors[index]}`}
                  >
                    <span className="font-medium">{index + 1}</span>
                    <span
                      className={`pointer-events-none absolute left-0 top-0 size-full opacity-15 bg-${progresColors[index]}`}
                    ></span>
                  </span>
                  <span className="font-bold">{item.name}</span>
                </div>
                <div className="py-4 text-2xl font-medium">
                  {formatMoney(item.amount, locale)}
                </div>
                <Progress
                  strokeColor={
                    variables[
                      `color${capitalize(progresColors[index])}` as keyof typeof variables
                    ]
                  }
                  className="!block min-w-28 !leading-[0px]"
                  percent={40}
                  size="small"
                  showInfo={false}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
