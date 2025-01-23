'use client';

import { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';

export default function DashboardSlider() {
  interface Metadata {
    value: string;
    label: string;
  }

  interface Data {
    heading: string;
    metadata: Metadata[];
  }

  interface Item {
    title: string;
    description: string;
    color: string;
    image: string;
    data: Data;
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  const items: Item[] = [
    {
      title: 'Website Analytics',
      description: 'Total 28.5% Conversion Rate',
      color: 'bg-violet-600',
      image: '/images/dashboard-slider-1.png',
      data: {
        heading: 'Traffic',
        metadata: [
          { value: '28%', label: 'Sessions' },
          { value: '3.1k', label: 'Page Views' },
          { value: '1.2k', label: 'Leads' },
          { value: '12%', label: 'Conversions' },
        ],
      },
    },
    {
      title: 'Website Analytics',
      description: 'Total 28.5% Conversion Rate',
      color: 'bg-purple-600',
      image: '/images/dashboard-slider-2.png',
      data: {
        heading: 'Spending',
        metadata: [
          { value: '12h', label: 'Spend' },
          { value: '18', label: 'Order Size' },
          { value: '100', label: 'Orders' },
          { value: '1.8k', label: 'Products' },
        ],
      },
    },
    {
      title: 'Website Analytics',
      description: 'Total 28.5% Conversion Rate',
      color: 'bg-indigo-600',
      image: '/images/dashboard-slider-3.png',
      data: {
        heading: 'Revenue Sources',
        metadata: [
          { value: '78%', label: 'Direct' },
          { value: '11%', label: 'Store' },
          { value: '5%', label: 'Marketing' },
          { value: '6%', label: 'Referral' },
        ],
      },
    },
  ];

  return (
    <Carousel className={`${loading ? 'opacity-0' : 'opacity-100'}`} autoplay autoplaySpeed={3000} draggable>
      {items.map((item, index) => (
        <div
          key={index}
          className={`!flex flex-wrap w-full min-h-64 p-6 ${item.color} text-white`}
        >
          <div className="w-full">
            <h3 className="m-0 mb-1 text-2xl font-bold">{item.title}</h3>
            <p className="m-0 text-base font-medium">{item.description}</p>
          </div>
          <div className="w-7/12 pt-10">
            <h4 className="mb-2 font-semibold text-base">{item.data.heading}</h4>
            <div className="flex flex-wrap justify-between">
              {item?.data?.metadata.map((meta, index) => (
                <div className="flex items-center w-1/2 py-2" key={index}>
                  <span className="min-w-14 px-3 py-1 bg-black/10 rounded-sm font-medium text-base text-center">{meta.value}</span>
                  <span className="ml-2">{meta.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-5/12 justify-center pb-3">
            {item.image && (
              <div className="relative size-[150px]">
                <Image
                  className="absolute top-0 left-0 size-full object-contain"
                  src={item.image}
                  alt={item.title}
                  width={150}
                  height={150}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </Carousel>
  );
}
