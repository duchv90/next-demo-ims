import { getFormatter, getLocale } from 'next-intl/server';
import CardHeader from '@/components/dashboard/CardHeader';
import { formatMoney } from '@/utils/stringHelpers';
import * as FLAGS from 'country-flag-icons/react/3x2';

export default async function SalesByCountry() {
  const locale = await getLocale();
  const format = await getFormatter();

  const data = {
    vi: {
      title: 'Thống kê theo quốc gia',
      description: 'Doanh số hàng tháng trên từng quốc gia',
    },
    en: {
      title: 'Sales By Country',
      description: 'Total monthly sales in each country',
    },
  };

  const items = [
    {
      flag: 'US',
      name: 'United States',
      sales: 2123,
      total: {
        vi: 500 * 25000,
        en: 500,
      },
    },
    {
      flag: 'BR',
      name: 'Brazil',
      sales: 1686,
      total: {
        vi: 400 * 25000,
        en: 400,
      },
    },
    {
      flag: 'VN',
      name: 'Vietnam',
      sales: 945,
      total: {
        vi: 300 * 25000,
        en: 300,
      },
    },
    {
      flag: 'AU',
      name: 'Australia',
      sales: 805,
      total: {
        vi: 100 * 25000,
        en: 100,
      },
    },
    {
      flag: 'FR',
      name: 'France',
      sales: 774,
      total: {
        vi: 100 * 25000,
        en: 100,
      },
    },
    {
      flag: 'CN',
      name: 'China',
      sales: 611,
      total: {
        vi: 100 * 25000,
        en: 100,
      },
    },
  ];

  const currentData = data[locale as keyof typeof data];

  return (
    <div className="flex h-full flex-col">
      <CardHeader
        className="w-full"
        title={currentData.title}
        subtitle={currentData.description}
      />
      <div className="grid grid-cols-1 gap-y-3 p-5">
        {items.map((item, index) => {
          const Flag = item.flag
            ? FLAGS[item.flag as keyof typeof FLAGS]
            : null;
          return (
            <div className="flex justify-between" key={index}>
              <div className="flex items-center">
                {Flag && (
                  <div className="relative mr-3 size-10 min-w-10 overflow-hidden rounded-full">
                    <Flag
                      title="United States"
                      className="absolute left-1/2 top-0 h-full -translate-x-1/2 object-cover object-center"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="text-base font-semibold">{item.name}</div>
                  <div className="text-sm">
                    {formatMoney(
                      item.total[locale as keyof typeof item.total],
                      locale,
                    )}
                  </div>
                </div>
              </div>
              <div className="text-base font-semibold text-green-500">
                {format.number(item.sales)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
