'use client';

import { useEffect, useState } from 'react';
import { useFormatter, useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

export default function ItemsOverviewChart({
  items,
  other,
}: Readonly<{
  items: { name: string; sales: number; image: string; color: string }[];
  other: {
    name: { vi: string; en: string };
    sales: number;
    image: string;
    color: string;
  };
}>) {
  const locale = useLocale();
  const format = useFormatter();
  const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

  const [state, setState] = useState<{
    options: object;
    series: number[];
  }>({
    options: {},
    series: [],
  });

  useEffect(() => {
    setState({
      series: [...items.map((item) => item.sales), other.sales],
      options: {
        labels: [
          ...items.map((item) => item.name),
          other.name[locale as keyof typeof other.name],
        ],
        colors: [...items.map((item) => item.color), other.color],
        tooltip: {
          y: {
            formatter: (value: number) => format.number(value),
          },
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                },
              },
            },
          },
        },
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col">
      <ApexChart
        options={state.options}
        series={state.series}
        type="donut"
        height={240}
      />
    </div>
  );
}
