import { PropsWithChildren } from 'react';

import LoadingHandler from '~/components/common/LoadingHandler';
import { FixedSpinner } from '~/components/common/Spinner';
import { localStorageUserTokenKeys } from '~/constants/localStorage';
import useReissueMutation from '~/hooks/api/reissue/useReissueMutation';
import useDidMount from '~/hooks/common/useDidMount';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import useRouterGuard from '~/hooks/common/useRouterGuard';
import { useUser } from '~/hooks/common/useUser';
import { useToast } from '~/store/Toast';

export function UserProvider({ children }: PropsWithChildren<unknown>) {
  const { isLoaded, setIsLoaded, userLogin, userLogout } = useUser();
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

  const { isRouterGuardPassed } = useRouterGuard({ isLoaded });

  // 컴포넌트 마운트 시
  useDidMount(() => {
    if (isLoaded) return;

    const storedRefreshToken = localStorage.getItem(localStorageUserTokenKeys.refreshToken);

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
