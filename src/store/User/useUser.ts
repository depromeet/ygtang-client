import { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';

import { COOKIE_REFRESH } from '~/constants/common';
import useCookie from '~/hooks/common/useCookie';
import { replaceAccessTokenForRequestInstance } from '~/libs/api/client';

import { userAccessTokenState, userRefreshTokenState } from './userStates';

export function useUser() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [accessToken, setAccessToken] = useRecoilState(userAccessTokenState);
  const [refreshToken, setRefreshToken] = useRecoilState(userRefreshTokenState);
  const { set: cookieSet } = useCookie();

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

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      cookieSet(COOKIE_REFRESH, refreshToken);
      replaceAccessTokenForRequestInstance(accessToken);
    },
    [cookieSet, setAccessToken, setRefreshToken]
  );

  return {
    isLoggedIn: accessToken !== undefined && refreshToken !== undefined,
    isLoaded,
    setIsLoaded,
    userLogin,
  };
}
