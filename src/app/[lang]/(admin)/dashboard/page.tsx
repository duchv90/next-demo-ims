import { getTranslations } from 'next-intl/server';
import MainContent from '@/components/layout/MainContent';
import DashboardCard from '@/components/dashboard/Card';
import DashboardSlider from '@/components/dashboard/Slider';
import TotalRevenue from '@/components/dashboard/TotalRevenue';
import SalesOverview from '@/components/dashboard/SalesOverview';
import WeeklyOverview from '@/components/dashboard/WeeklyOverview';
import ItemsOverview from '@/components/dashboard/ItemsOverview';
import SalesByCountry from '@/components/dashboard/SalesByCountry';
import DataAnaltics from '@/components/dashboard/DataAnalytics';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('seo.dashboard.title'),
    description: t('seo.dashboard.description'),
    keywords: t('seo.dashboard.keywords'),
  };
}

export default async function Dashboard() {
  return (
    <MainContent>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-6">
          <DashboardCard>
            <DashboardSlider />
          </DashboardCard>
        </div>
        <div className="col-span-3">
          <DashboardCard>
            <TotalRevenue />
          </DashboardCard>
        </div>
        <div className="col-span-3">
          <DashboardCard>
            <SalesOverview />
          </DashboardCard>
        </div>
        <div className="col-span-6">
          <DashboardCard>
            <WeeklyOverview />
          </DashboardCard>
        </div>
        <div className="col-span-6">
          <DashboardCard>
            <ItemsOverview />
          </DashboardCard>
        </div>
        <div className="col-span-4">
          <DashboardCard>
            <SalesByCountry />
          </DashboardCard>
        </div>
        <div className="col-span-8">
          <DashboardCard>
            <DataAnaltics />
          </DashboardCard>
        </div>
      </div>
    </MainContent>
  );
}
