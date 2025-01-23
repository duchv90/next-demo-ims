'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { formatMoney } from '@/utils/stringHelpers';

export default function DataAnalyticsChart() {
  const locale = useLocale();
  const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

  const [state, setState] = useState<{
    options: object;
    series: ApexAxisChartSeries;
  }>({
    options: {},
    series: [],
  });

  useEffect(() => {
    setState({
      series: [
        {
          type: 'line',
          name: '2025',
          data: [100, 210, 180, 454, 230, 320, 656, 830, 350, 350, 210, 410],
        },
        {
          type: 'line',
          name: '2024',
          data: [180, 620, 476, 220, 520, 780, 435, 515, 738, 454, 525, 230],
        },
        {
          type: 'area',
          name: '2023',
          data: [200, 530, 110, 130, 480, 520, 780, 435, 475, 738, 454, 480],
        },
      ],
      options: {
        chart: {
          animations: {
            speed: 500,
          },
          dropShadow: {
            enabled: !0,
            enabledOnSeries: void 0,
            top: 8,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.1,
          },
        },
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        colors: [
          'rgb(132, 90, 223)',
          'rgba(35, 183, 229, 0.85)',
          'rgba(119, 119, 142, 0.05)',
        ],
        dataLabels: {
          enabled: !1,
        },
        grid: {
          borderColor: '#f1f1f1',
          strokeDashArray: 3,
        },
        stroke: {
          curve: 'smooth',
          width: [2, 2, 0],
          dashArray: [0, 5, 0],
        },
        xaxis: {
          axisTicks: {
            show: !1,
          },
        },
        yaxis: {
          labels: {
            formatter: (value: number) => formatMoney(value, locale),
          },
        },
        tooltip: {
          y: [
            {
              formatter: (value: number) => formatMoney(value, locale),
            },
            {
              formatter: (value: number) => formatMoney(value, locale),
            },
            {
              formatter: (value: number) => formatMoney(value, locale),
            },
          ],
        },
        markers: {
          hover: {
            sizeOffset: 5,
          },
        },
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="p-5">
      <ApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
}
