'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { formatMoney } from '@/utils/stringHelpers';
import dynamic from 'next/dynamic';

export default function TotalRevenue() {
  const locale = useLocale();
  const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

  const revenue = [150.50, 180.25, 220.75, 120.00, 290.00];
  const data = {
    vi: {
      title: 'Tổng doanh thu',
      description: 'Tổng doanh thu tháng này',
      totalRevenue: revenue.map((r) => r * 25000).reduce((a, b) => a + b, 0),
      data: revenue.map((r) => r * 25000),
    },
    en: {
      title: 'Total Revenue',
      description: 'Total Sales This Month',
      totalRevenue: revenue.reduce((a, b) => a + b, 0),
      data: revenue,
    },
  };

  const currentData = data[locale as keyof typeof data];

  const [state, setState] = useState<{ options: object; series: ApexAxisChartSeries }>({
    options: {},
    series: [],
  });

  useEffect(() => {
    setState({
      series: [
        {
          name: currentData.title,
          data: currentData.data,
        }
      ],
      options: {
        chart: {
          id: 'total-revenue',
          toolbar: { show: false },
          width: '100%',
          parentHeightOffset: 0,
          selection: { enabled: false },
          zoom: { enabled: false },
          pan: { enabled: false },
        },
        theme: {
          mode: 'light',
          palette: 'palette4',
        },
        grid: {
          show: false,
          padding: { left: -10, right: -10, top: -30, bottom: -15 },
        },
        legend: { show: false },
        tooltip: { enabled: false },
        dataLabels: { enabled: false },
        stroke: { curve: 'monotoneCubic', width: 2 },
        xaxis: {
          categories: currentData.data.map((_, i) => i + 1),
          labels: { show: false },
          axisTicks: { show: false },
          crosshairs: { show: false },
          tooltip: { enabled: false },
        },
        yaxis: { show: false, min: 0 },
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col justify-between overflow-hidden h-full">
      <div className="p-5 pb-3">
        <h3 className="m-0 mb-1 text-xl font-semibold font-heading text-heading">
          {currentData.title}
        </h3>
        <p className="m-0 text-base text-body-secondary">
          {currentData.description}
        </p>
        <div className="mt-3 text-2xl font-bold text-primary">
          {formatMoney(currentData.totalRevenue, locale)}
        </div>
      </div>
      {state.options && state.series && (
        <ApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={140}
        />
      )}
    </div>
  );
}
