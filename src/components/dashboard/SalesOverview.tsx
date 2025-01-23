'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Progress } from 'antd';
import { formatMoney } from '@/utils/stringHelpers';
import SvgCalendar from '@/styles/svgs/calendar.svg';
import SvgArrowLeftLong from '@/styles/svgs/arrow-left-long.svg';
import SvgCheck from '@/styles/svgs/check.svg';

export default function SalesOverview() {
  const locale = useLocale();
  const t = useTranslations();
  const totals = [1868.68, 2248.12];

  const data = {
    vi: {
      title: 'Doanh số bán hàng',
      lastMonth: {
        heading: 'Tháng trước',
        totalMoney: totals[0] * 25000,
      },
      thisMonth: {
        heading: 'Tháng này',
        totalMoney: totals[1] * 25000,
      },
    },
    en: {
      title: 'Sales Overview',
      lastMonth: {
        heading: 'Last Month',
        totalMoney: totals[0],
      },
      thisMonth: {
        heading: 'This Month',
        totalMoney: totals[1],
      },
    },
  };

  const currentData = data[locale as keyof typeof data];
  const percent = ((totals[1] - totals[0]) / totals[0]) * 100;
  const successPercent = (totals[0] / (totals[0] + totals[1])) * 100;

  return (
    <div className="h-full p-5">
      <div className="py-5 flex flex-wrap items-center justify-between">
        <h4 className="text-base text-body-secondary">{currentData.title}</h4>
        <span className={`text-base font-semibold ${percent < 0 ? 'text-red-500' : 'text-green-500'}`}>{percent < 0 ? '' : '+'}{percent.toFixed(2)}%</span>
      </div>
      <div className="relative grid grid-cols-2 gap-5 mt-3">
        <div className="text-left pr-4">
          <div className="flex p-3 mb-2">
            <div className="relative flex items-center justify-center text-secondary">
              <span className="absolute top-[9px] left-[5px] flex w-[10px] h-3">
                <SvgArrowLeftLong />
              </span>
              <span className="flex w-5 h-6">
                <SvgCalendar />
              </span>
              <span className="pointer-events-none bg-secondary opacity-10 block absolute -top-2 -left-3 -right-3 -bottom-2 rounded-md"></span>
            </div>
          </div>
          <div className="text-base text-body-secondary">{currentData.lastMonth.heading}</div>
          <div className="mt-2 text-xl font-bold text-primary">{formatMoney(currentData.lastMonth.totalMoney, locale)}</div>
        </div>
        <div className="text-right pl-4">
          <div className="flex justify-end p-3 mb-2">
            <div className="relative flex items-center justify-center text-tertiary">
              <span className="absolute top-[9px] left-[6px] flex w-2 h-3">
                <SvgCheck />
              </span>
              <span className="flex w-5 h-6">
                <SvgCalendar />
              </span>
              <span className="pointer-events-none bg-tertiary opacity-10 block absolute -top-2 -left-3 -right-3 -bottom-2 rounded-md"></span>
            </div>
          </div>
          <div className="text-base text-body-secondary">{currentData.thisMonth.heading}</div>
          <div className="mt-2 text-xl font-bold text-primary">{formatMoney(currentData.thisMonth.totalMoney, locale)}</div>
        </div>
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gray-200">
          <span className="absolute top-1/2 left-[1px] -translate-x-1/2 -translate-y-1/2 p-2 size-10 rounded-full overflow-hidden bg-white">
            <span className="flex justify-center items-center size-full rounded-full text-xs text-gray-500 bg-gray-200">{t('dashboard.vs')}</span>
          </span>
        </div>
      </div>
      <div className="mt-5 rounded-3xl overflow-hidden">
        <Progress className="!leading-[0px] !block" strokeLinecap="butt" percent={100} success={{ percent: successPercent }} size={{ height: 10 }} showInfo={false} />
      </div>
    </div>
  );
}
