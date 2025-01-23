import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import LoginForm from '@/components/form/LoginForm';
import OAuth from '@/components/ui/OAuth';
import LocaleSwitcher from '@/components/common/LocaleSwitcher';
import Link from 'next/link';

export async function generateMetadata() {
  const t = await getTranslations('login');

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function LoginPage() {
  const t = await getTranslations('login');

  return (
    <div className="relative flex justify-center items-center min-h-[100vh] p-8 bg-orange overflow-hidden">
      <div className="absolute z-20 top-8 right-10">
        <LocaleSwitcher />
      </div>
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover object-center pointer-events-none"
        src="/images/login-bg.jpg"
        width={1920}
        height={1080}
        alt={t('title')}
        loading="lazy"
      />
      <div className="relative z-10 w-full max-w-[1366px] min-h-[768px] flex justify-start items-center rounded-3xl overflow-hidden px-[3.7%] py-[3.5%] bg-[#fedcc5]/60">
        <Image
          className="absolute top-[11%] right-[5%] h-[78%] object-contain object-center pointer-events-none animate-[bounce_3s_ease-in-out_infinite]"
          src="/images/login-image.png"
          width={674}
          height={593}
          alt={t('title')}
          loading="lazy"
        />
        <div className="relative z-10 w-full max-w-[455px] rounded-3xl overflow-hidden bg-white/30 shadow-[0_3px_50px_0_rgba(0,0,0,0.1)]">
          <LoginForm />
          <OAuth />
          <div className="px-[60px]">
            <p className="text-center pb-8">{t.rich('contact_message', { contact: (chunks) => <Link className="underline hover:text-primary transition-all" href="/vi">{chunks}</Link> })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
