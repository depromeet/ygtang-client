import { useCallback, useState } from 'react';

import { localStorageUserTokenKeys } from '~/constants/localStorage';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { replaceAccessTokenForRequestInstance } from '~/libs/api/client';

export function useUser() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { push } = useInternalRouter();

  /**
   * 유저 로그인 시에 사용합니다.
   * @param accessToken 엑세스 토큰 값
   * @param refreshToken 리프레시 토큰 값
   */
  const userLogin = useCallback(
    ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
      if (
        accessToken === undefined ||
        refreshToken === undefined ||
        accessToken === '' ||
        refreshToken === ''
      ) {
        // TODO: 에러 토큰 관리 변경
        throw Error('로그인 토큰이 올바르지 않습니다.');
      }

      replaceAccessTokenForRequestInstance(accessToken);
      localStorage.setItem(localStorageUserTokenKeys.accessToken, accessToken);
      localStorage.setItem(localStorageUserTokenKeys.refreshToken, refreshToken);
    },
    []
  );

  const userLogout = () => {
    localStorage.removeItem(localStorageUserTokenKeys.accessToken);
    localStorage.removeItem(localStorageUserTokenKeys.refreshToken);

    push('/login');
  };

  return {
    isLoaded,
    setIsLoaded,
    userLogin,
    userLogout,
  };
}
