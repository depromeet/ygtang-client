import { PropsWithChildren, useEffect } from 'react';

import { COOKIE_REFRESH } from '~/constants/common';
import useReissueMutation from '~/hooks/api/reissue/useReissueMutation';
import useCookie from '~/hooks/common/useCookie';
import useDidMount from '~/hooks/common/useDidMount';
import useRouterGuard from '~/hooks/common/useRouterGuard';

import { useUser } from './';

export function UserProvider({ children }: PropsWithChildren<unknown>) {
  const { isLoaded, setIsLoaded, userLogin, isLoggedIn } = useUser();
  const { mutate: reissueMutate, error: reissueMutationError } = useReissueMutation({
    userLogin,
    setIsLoaded,
  });
  const { get: cookieGet } = useCookie();

  const { isRouterGuardPassed } = useRouterGuard({ isLoaded, isLoggedIn });

  // 컴포넌트 마운트 시
  useDidMount(() => {
    if (isLoaded) return;

    const storedRefreshToken = cookieGet(COOKIE_REFRESH);

    if (storedRefreshToken) {
      reissueMutate({
        refreshToken: storedRefreshToken,
      });
    } else {
      setIsLoaded(true);
    }
  });

  useEffect(() => {
    // TODO: 에러 발생 핸들링
  }, [reissueMutationError]);

  // TODO: 로딩 관련 처리하기
  return <>{isRouterGuardPassed ? children : <>로그인 대기 중...</>}</>;
}
