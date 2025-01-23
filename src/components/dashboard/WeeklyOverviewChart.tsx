'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { variables } from '@/styles/global';
import { formatMoney } from '@/utils/stringHelpers';

export default function WeeklyOverviewChart({
  heading,
  categories,
  data,
}: Readonly<{ heading: string; categories: string[]; data: number[] }>) {
  const locale = useLocale();
  const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

  const [state, setState] = useState<{
    options: object;
    series: ApexAxisChartSeries;
  }>({
    options: {},
    series: [],
  });

  const currentDay = new Date().getDay();
  const colors = categories.map((day, index) => {
    if (
      day &&
      index === (currentDay === 0 ? categories.length - 1 : currentDay - 1)
    ) {
      return variables.colorPrimary;
    }
    return `rgba(${variables.colorPrimaryRgb}, 0.2)`;
  });
  const labelColors = categories.map((day, index) => {
    if (
      day &&
      index === (currentDay === 0 ? categories.length - 1 : currentDay - 1)
    ) {
      return variables.bodyColor;
    }
    return variables.bodyColorSecondary;
  });

  const chartData = data.map((amount, index) => {
    if (index < currentDay) return amount;
    return 0;
  });

  useEffect(() => {
    setState({
      series: [
        {
          name: `${heading}: `,
          data: chartData,
        },
      ],
      options: {
        chart: {
          type: 'bar',
          parentHeightOffset: 0,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            columnWidth: '38%',
            startingShape: 'rounded',
            endingShape: 'rounded',
            borderRadius: 4,
            distributed: true,
          },
        },
        colors: colors,
        grid: {
          show: false,
          padding: { top: -30, bottom: 0, left: -10, right: -10 },
        },
        dataLabels: { enabled: false },
        legend: { show: false },
        tooltip: {
          y: {
            formatter: (value: number) => formatMoney(value, locale),
          },
        },
        xaxis: {
          categories: categories,
          axisBorder: { show: false },
          axisTicks: { show: false },
          tooltip: { enabled: false },
          labels: {
            style: {
              colors: labelColors,
              fontFamily: variables.fontFamily,
              fontSize: '12px',
              cssClass: 'font-bold uppercase',
            },
          },
        },
        yaxis: { labels: { show: false } },
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex min-h-[240px] flex-col">
      <ApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={240}
      />
    </div>
  );
}
