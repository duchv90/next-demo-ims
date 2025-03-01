'use client';

import { Flex, notification, Tooltip } from 'antd';
import { useTranslations } from 'next-intl';

export default function OAuth() {
  const t = useTranslations();
  const [api, contextHolder] = notification.useNotification();
  const handleClick = () => {
    api.open({
      message: t('notification.title'),
      description: t('notification.feature_coming_soon'),
      duration: 2,
    });
  };

  return (
    <div className="text-center px-[60px] pb-8">
      <div className="mb-6 flex">
        <span className="flex-grow h-[2px] bg-primary bg-opacity-20 mt-[10px]"></span>
        <span className="px-3">{t('login.oauth.summary')}</span>
        <span className="flex-grow h-[2px] bg-primary bg-opacity-20 mt-[10px]"></span>
      </div>
      <Flex gap="16px" wrap justify="center" align="center">
        <Tooltip title={t('login.oauth.google')}>
          <button className="h-[35px] px-[28px] text-body bg-white rounded-3xl transition-all hover:shadow-md" type="button" onClick={handleClick}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.7045 7.6378H17.0168V7.60237H9.33319V11.0173H14.1581C13.4542 13.0052 11.5627 14.4323 9.33319 14.4323C6.50434 14.4323 4.21078 12.1387 4.21078 9.30984C4.21078 6.48099 6.50434 4.18743 9.33319 4.18743C10.639 4.18743 11.827 4.68004 12.7315 5.48468L15.1463 3.06989C13.6215 1.64885 11.5819 0.772491 9.33319 0.772491C4.61844 0.772491 0.795837 4.59509 0.795837 9.30984C0.795837 14.0246 4.61844 17.8472 9.33319 17.8472C14.0479 17.8472 17.8705 14.0246 17.8705 9.30984C17.8705 8.73741 17.8116 8.17865 17.7045 7.6378Z" fill="#FFC107"/>
              <path d="M1.77966 5.33613L4.58461 7.39321C5.34358 5.51414 7.18167 4.18743 9.33266 4.18743C10.6384 4.18743 11.8264 4.68004 12.731 5.48468L15.1457 3.06989C13.621 1.64885 11.5814 0.772491 9.33266 0.772491C6.05346 0.772491 3.20967 2.62382 1.77966 5.33613Z" fill="#FF3D00"/>
              <path d="M9.3333 17.8475C11.5385 17.8475 13.5422 17.0036 15.0572 15.6312L12.4149 13.3953C11.5289 14.069 10.4463 14.4334 9.3333 14.4325C7.11274 14.4325 5.22726 13.0166 4.51696 11.0406L1.73293 13.1857C3.14586 15.9505 6.01526 17.8475 9.3333 17.8475Z" fill="#4CAF50"/>
              <path d="M17.7045 7.63782H17.0168V7.60239H9.33321V11.0173H14.1581C13.8214 11.9634 13.2149 12.7902 12.4135 13.3954L12.4148 13.3946L15.0571 15.6305C14.8701 15.8004 17.8706 13.5785 17.8706 9.30986C17.8706 8.73743 17.8117 8.17866 17.7045 7.63782Z" fill="#1976D2"/>
            </svg>
          </button>
        </Tooltip>
        <Tooltip title={t('login.oauth.github')}>
          <button className="h-[35px] px-[28px] text-body bg-white rounded-3xl transition-all hover:shadow-md" type="button" onClick={handleClick}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9 0.772491C4.28303 0.772491 0.462502 4.59302 0.462502 9.30999C0.462502 13.0878 2.90636 16.2787 6.30002 17.4099C6.72689 17.4846 6.88697 17.2285 6.88697 17.0044C6.88697 16.8016 6.8763 16.1293 6.8763 15.4143C4.73125 15.8092 4.17631 14.8914 4.00556 14.4111C3.90952 14.1657 3.49331 13.408 3.13047 13.2052C2.83166 13.0451 2.40478 12.6503 3.1198 12.6396C3.79213 12.6289 4.27236 13.2586 4.43244 13.5147C5.20081 14.806 6.42808 14.4432 6.91899 14.2191C6.99369 13.6641 7.2178 13.2906 7.46325 13.0772C5.56366 12.8637 3.57869 12.1274 3.57869 8.86177C3.57869 7.93332 3.90952 7.16494 4.45378 6.56732C4.36841 6.35388 4.0696 5.47879 4.53916 4.30488C4.53916 4.30488 5.25417 4.08077 6.88697 5.17998C7.56997 4.98788 8.29566 4.89184 9.02135 4.89184C9.74703 4.89184 10.4727 4.98788 11.1557 5.17998C12.7885 4.0701 13.5035 4.30488 13.5035 4.30488C13.9731 5.47879 13.6743 6.35388 13.5889 6.56732C14.1332 7.16494 14.464 7.92265 14.464 8.86177C14.464 12.138 12.4684 12.8637 10.5688 13.0772C10.8783 13.344 11.145 13.8562 11.145 14.6566C11.145 15.7985 11.1344 16.7163 11.1344 17.0044C11.1344 17.2285 11.2945 17.4953 11.7213 17.4099C13.4162 16.8377 14.8889 15.7485 15.9322 14.2954C16.9756 12.8424 17.537 11.0988 17.5375 9.30999C17.5375 4.59302 13.717 0.772491 9 0.772491Z" fill="black"/>
            </svg>
          </button>
        </Tooltip>
        <Tooltip title={t('login.oauth.facebook')}>
          <button className="h-[35px] px-[28px] text-body bg-white rounded-3xl transition-all hover:shadow-md" type="button" onClick={handleClick}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.2042 9.36228C17.2042 4.61757 13.3815 0.771423 8.66669 0.771423C3.94972 0.772491 0.127059 4.61757 0.127059 9.36335C0.127059 13.6502 3.24965 17.204 7.33058 17.8486V11.8456H5.16418V9.36335H7.33271V7.46909C7.33271 5.31658 8.608 4.12773 10.5578 4.12773C11.4926 4.12773 12.4691 4.29528 12.4691 4.29528V6.40831H11.3923C10.3326 6.40831 10.0017 7.07103 10.0017 7.75083V9.36228H12.3688L11.991 11.8446H10.0007V17.8475C14.0816 17.2029 17.2042 13.6492 17.2042 9.36228Z" fill="#059BE5"/>
            </svg>
          </button>
        </Tooltip>
      </Flex>
      {contextHolder}
    </div>
  );
}
