import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { PUBLIC_ROUTES } from '~/constants/common';

interface UseRouterGuardProps {
  isLoaded: boolean;
  isLoggedIn: boolean;
}

export default function useRouterGuard({ isLoaded, isLoggedIn }: UseRouterGuardProps) {
  const [isRouterGuardPassed, setIsRouterGuardPassed] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const authCheck = (url: string) => {
      if (!isLoaded) return;

      if (isLoggedIn) {
        // 로그인 시 모든 route 접근 가능
        setIsRouterGuardPassed(true);
        return;
      }

      const path = url.split('?')[0];
      if (!PUBLIC_ROUTES.includes(path)) {
        router.push({
          pathname: '/login',
          query: { returnUrl: router.asPath },
        });
      } else {
        // 로그인을 하지 않았으며, 퍼블릭 route에 방문시 패스 인증
        setIsRouterGuardPassed(true);
      }
    };

    authCheck(router.asPath);
    router.events.on('routeChangeStart', authCheck);

    return () => {
      router.events.off('routeChangeStart', authCheck);
    };
  }, [isLoaded, isLoggedIn, router]);

  return { isRouterGuardPassed };
}
