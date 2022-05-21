import { PropsWithChildren } from 'react';

import LoadingHandler from '~/components/common/LoadingHandler';
import { FixedSpinner } from '~/components/common/Spinner';
import { COOKIE_REFRESH } from '~/constants/common';
import useReissueMutation from '~/hooks/api/reissue/useReissueMutation';
import useAuthorizationIntercept from '~/hooks/common/useAuthorizationIntercept';
import useCookie from '~/hooks/common/useCookie';
import useDidMount from '~/hooks/common/useDidMount';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import useRouterGuard from '~/hooks/common/useRouterGuard';

import { useToast } from '../Toast';
import { useUser } from './';

export function UserProvider({ children }: PropsWithChildren<unknown>) {
  const { isLoaded, setIsLoaded, userLogin, userLogout, isLoggedIn } = useUser();
  const { get: cookieGet, remove: cookieRemove } = useCookie();
  const { fireToast } = useToast();
  const { push } = useInternalRouter();

  const { mutate: reissueMutate } = useReissueMutation({
    onSuccess: data => {
      const { accessToken, refreshToken } = data.data;
      userLogin({ accessToken, refreshToken });
      setIsLoaded(true);
    },
    onError: () => {
      fireToast({ content: '세션이 만료되었습니다. 다시 로그인 해주세요.' });
      userLogout();
      push('/login');
      setIsLoaded(true);
    },
  });

  useAuthorizationIntercept();

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

  return (
    <LoadingHandler isLoading={!isRouterGuardPassed} loadingComponent={<FixedSpinner />}>
      {children}
    </LoadingHandler>
  );
}
