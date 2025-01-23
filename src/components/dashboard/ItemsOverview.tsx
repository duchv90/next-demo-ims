import { getFormatter, getLocale } from 'next-intl/server';
import CardHeader from '@/components/dashboard/CardHeader';
import { shuffleColors } from '@/utils/colorHelpers';
import ItemsOverviewChart from '@/components/dashboard/ItemsOverviewChart';

export default async function ItemsOverview() {
  const locale = await getLocale();
  const format = await getFormatter();

  const data = {
    vi: {
      title: 'Thống kê theo mặt hàng',
      description: 'Tổng quan về thu nhập theo mặt hàng',
    },
    en: {
      title: 'Items Overview',
      description: 'Items Earnings Overview',
    },
  };

  const items = [
    {
      name: 'Outstock',
      sales: 2117,
      image: '/images/items/thumbnail1.png',
    },
    { name: 'Rubix', sales: 1059, image: '/images/items/thumbnail2.png' },
    { name: 'Manor', sales: 606, image: '/images/items/thumbnail3.png' },
    { name: 'Uray', sales: 577, image: '/images/items/thumbnail4.png' },
    { name: 'Petio', sales: 172, image: '/images/items/thumbnail5.png' },
    { name: 'BTrend', sales: 125, image: '/images/items/thumbnail6.jpg' },
    { name: 'Dimita', sales: 117, image: '/images/items/thumbnail7.png' },
    { name: 'Agota', sales: 92, image: '/images/items/thumbnail8.png' },
    { name: 'Ayo', sales: 176, image: '/images/items/thumbnail9.png' },
    { name: 'Demus', sales: 64, image: '/images/items/thumbnail10.png' },
  ];

  const colors = shuffleColors();
  const getColor = (index: number) => {
    return index < colors.length - 1
      ? colors[index]
      : colors[index % colors.length];
  };

  const currentItems = items.slice(0, 7).map((item, index) => ({
    ...item,
    color: getColor(index),
  }));

  const otherItems = items.slice(7).map((item) => item);

  const other = {
    name: {
      vi: 'Khác',
      en: 'Other',
    },
    image: '',
    sales: otherItems.reduce((acc, item) => acc + item.sales, 0),
    color: getColor(currentItems.length),
  };

  const currentData = data[locale as keyof typeof data];

  return (
    <div className="flex h-full flex-col">
      <CardHeader
        className="w-full"
        title={currentData.title}
        subtitle={currentData.description}
      />
      <div className="flex h-full flex-col justify-between">
        <div className="h-full p-5">
          <ItemsOverviewChart items={currentItems} other={other} />
        </div>
        <div className="grid grid-cols-4">
          {currentItems.map((item, index) => {
            const borderClasses =
              index % 3 === 0 &&
              index !== 0 &&
              index !== currentItems.length - 1
                ? 'border-t border-b border-dashed border-gray-200'
                : 'border-r border-t border-b border-dashed border-gray-200';

            return (
              <div
                key={item.name}
                className={`-mb-[1px] flex flex-col items-center justify-center ${borderClasses} p-3`}
              >
                <span className="text-body-secondary">
                  <span
                    className="relative -top-[2px] mr-1 inline-block size-[6px] rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  {item.name}
                </span>
                <span className="text-base font-bold">
                  {format.number(item.sales)}
                </span>
              </div>
            );
          })}
          {otherItems.length > 0 && (
            <div className="flex flex-col items-center justify-center p-3">
              <span className="text-body-secondary">
                <span
                  className="relative -top-[2px] mr-1 inline-block size-[6px] rounded-full"
                  style={{ backgroundColor: other.color }}
                ></span>
                {otherItems.length}{' '}
                {other.name[locale as keyof typeof other.name]}
              </span>
              <span className="text-base font-bold">
                {format.number(other.sales)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
