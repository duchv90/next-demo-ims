import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import MainContent from '@/components/layout/MainContent';

export async function generateMetadata() {
  const t = await getTranslations();

  return {
    title: t('seo.unauthorized.title'),
    description: t('seo.unauthorized.description'),
    keywords: t('seo.unauthorized.keywords'),
  };
}

export default async function UnauthorizedPage() {
  const t = await getTranslations();

  return (
    <MainContent>
      <div className="size-full py-3">
        <div className="relative flex min-h-full w-full items-center justify-center bg-[#eba917]">
          <div className="pointer-events-none absolute left-0 top-0 size-full overflow-hidden">
            <div className="absolute left-0 top-[5%] h-[105px] w-[234px] -translate-x-full animate-[cloud_18s_linear_infinite]">
              <Image
                className="block"
                src="/images/unauthorized/cloud-1.png"
                alt={t('unauthorized.title')}
                width={234}
                height={105}
              />
            </div>
            <div className="absolute left-0 top-[12%] h-[148px] w-[300px] -translate-x-full animate-[cloud_20s_linear_3s_infinite]">
              <Image
                className="block"
                src="/images/unauthorized/cloud-2.png"
                alt={t('unauthorized.title')}
                width={300}
                height={148}
              />
            </div>
            <div className="absolute left-0 top-[20%] h-[119px] w-[234px] -translate-x-full animate-[cloud_16s_linear_2s_infinite] delay-300">
              <Image
                className="block"
                src="/images/unauthorized/cloud-3.png"
                alt={t('unauthorized.title')}
                width={263}
                height={119}
              />
            </div>
            <div className="absolute left-0 top-[26%] h-[137px] w-[257px] -translate-x-full animate-[cloud_26s_linear_infinite] delay-500">
              <Image
                className="block"
                src="/images/unauthorized/cloud-4.png"
                alt={t('unauthorized.title')}
                width={257}
                height={137}
              />
            </div>
          </div>
          <div className="relative flex min-h-full flex-col items-center justify-around p-8 text-center">
            <div className="max-w-[80%] py-20">
              <h1 className="text-8xl font-bold text-heading">
                {t('unauthorized.title')}
              </h1>
              <p className="mt-2 text-2xl italic">
                {t('unauthorized.description')}
              </p>
            </div>
            <div className="relative mx-auto w-[450px] max-w-full overflow-hidden">
              <Image
                src="/images/unauthorized/unauthorized.png"
                alt={t('unauthorized.title')}
                width={556}
                height={661}
              />
              <div className="absolute left-[48.5%] top-[28%] w-[30%]">
                <Image
                  className="size-full object-contain"
                  src="/images/unauthorized/eye.gif"
                  alt={t('unauthorized.title')}
                  width={173}
                  height={64}
                />
              </div>
              <div className="absolute left-[2%] top-[10%] w-[33%] origin-[77%_73%] animate-[hand_2s_linear_infinite]">
                <Image
                  className="size-full object-contain"
                  src="/images/unauthorized/hand.png"
                  alt={t('unauthorized.title')}
                  width={184}
                  height={386}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
}
