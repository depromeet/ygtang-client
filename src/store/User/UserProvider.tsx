import { PropsWithChildren, useEffect } from 'react';

import LoadingHandler from '~/components/common/LoadingHandler';
import { FixedSpinner } from '~/components/common/Spinner';
import { COOKIE_REFRESH } from '~/constants/common';
import useReissueMutation from '~/hooks/api/reissue/useReissueMutation';
import useCookie from '~/hooks/common/useCookie';
import useDidMount from '~/hooks/common/useDidMount';
import useRouterGuard from '~/hooks/common/useRouterGuard';

import { useUser } from './';

export function UserProvider({ children }: PropsWithChildren<unknown>) {
  const { isLoaded, setIsLoaded, userLogin, isLoggedIn } = useUser();

  const { mutate: reissueMutate, error: reissueMutationError } = useReissueMutation({
    onSuccess: data => {
      const { accessToken, refreshToken } = data.data;
      userLogin({ accessToken, refreshToken });
      setIsLoaded(true);
    },
  });

  const { get: cookieGet, remove: cookieRemove } = useCookie();
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
    if (reissueMutationError) {
      cookieRemove(COOKIE_REFRESH);
    }
  }, [cookieRemove, reissueMutationError]);

  return (
    <LoadingHandler isLoading={!isRouterGuardPassed} loadingComponent={<FixedSpinner />}>
      {children}
    </LoadingHandler>
  );
}
