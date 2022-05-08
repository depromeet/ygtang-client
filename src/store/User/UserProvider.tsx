import { PropsWithChildren, useEffect } from 'react';

import useReissueMutation from '~/hooks/api/reissue/useReissueMutation';
import useCookie from '~/hooks/common/useCookie';

import { useUser } from './';

const cookieAccessTokenName = 'ygt_access';
const cookieRefreshTokenName = 'ygt_refresh';

export function UserProvider({ children }: PropsWithChildren<unknown>) {
  const { isLoaded, setIsLoaded, userLogin } = useUser();
  const {
    mutate: reissueMutate,
    data: reissueMutationData,
    error: reissueMutationError,
  } = useReissueMutation();
  const { get: cookieGet } = useCookie();

  // 컴포넌트 마운트 시
  useEffect(() => {
    if (!isLoaded) {
      const storedAccessToken = cookieGet(cookieAccessTokenName);
      const storedRefreshToken = cookieGet(cookieRefreshTokenName);

      if (storedAccessToken && storedRefreshToken) {
        reissueMutate({
          accessToken: storedAccessToken,
          refreshToken: storedRefreshToken,
        });
      } else {
        setIsLoaded(true);
      }
    }
  }, [cookieGet, isLoaded, reissueMutate, setIsLoaded]);

  useEffect(() => {
    if (reissueMutationData && reissueMutationData.data) {
      const { accessToken, refreshToken } = reissueMutationData.data;
      userLogin({ accessToken, refreshToken });
      setIsLoaded(true);
    }
  }, [reissueMutationData, setIsLoaded, userLogin]);

  useEffect(() => {
    // TODO: 에러 발생 핸들링
  }, [reissueMutationError]);

  return <>{isLoaded ? children : <>로그인 대기 중...</>}</>;
}
