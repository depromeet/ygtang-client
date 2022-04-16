import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { PUBLIC_ROUTES } from '~/constants/common';

export default function useRouterGuard() {
  const router = useRouter();

  // TODO: 추후에 인증관련은 store의 것으로 대체합니다.
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const authCheck = (url: string) => {
      const path = url.split('?')[0];

      if (!PUBLIC_ROUTES.includes(path)) {
        setAuthorized(false);
        router.push({
          pathname: '/login',
          query: { returnUrl: router.asPath },
        });
      } else {
        setAuthorized(true);
      }
    };
    authCheck(router.asPath);
    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, [router]);

  const hideContent = () => {
    setAuthorized(false);
  };

  return {
    authorized,
  };
}
