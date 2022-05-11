import { PropsWithChildren, useEffect } from 'react';

import { COOKIE_REFRESH } from '~/constants/common';
import useReissueMutation from '~/hooks/api/reissue/useReissueMutation';
import useCookie from '~/hooks/common/useCookie';

import { useUser } from './';

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
      const storedRefreshToken = cookieGet(COOKIE_REFRESH);

      if (storedRefreshToken) {
        reissueMutate({
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

  // TODO: 로딩 관련 처리하기
  return <>{isLoaded ? children : <>로그인 대기 중...</>}</>;
}
