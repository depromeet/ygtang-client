import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { localStorageUserTokenKeys } from '~/constants/localStorage';
import { fetchUserInformation } from '~/hooks/api/member/useGetUserInformation';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { replaceAccessTokenForRequestInstance } from '~/libs/api/client';
import { setMixpanelIdentify } from '~/libs/mixpanel';

const SYNC_YGT_RT = 'SYNC_YGT_RT';

export function useUser() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { push } = useInternalRouter();
  const queryClient = useQueryClient();

  const postRefreshTokenReactNativeWebView = (refreshToken: string) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: SYNC_YGT_RT, data: refreshToken })
      );
    }
  };

  const setMixpanelIdentifyWhenLogedIn = async () => {
    const { nickName, email } = await fetchUserInformation();
    if (!nickName || !email) return;

    setMixpanelIdentify(`${nickName} - ${email}`);
  };

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
        throw Error('로그인 토큰이 올바르지 않습니다.');
      }

      replaceAccessTokenForRequestInstance(accessToken);
      localStorage.setItem(localStorageUserTokenKeys.accessToken, accessToken);
      localStorage.setItem(localStorageUserTokenKeys.refreshToken, refreshToken);
      postRefreshTokenReactNativeWebView(refreshToken);
      queryClient.clear();

      setMixpanelIdentifyWhenLogedIn();
    },
    [queryClient]
  );

  const userLogout = () => {
    localStorage.removeItem(localStorageUserTokenKeys.accessToken);
    localStorage.removeItem(localStorageUserTokenKeys.refreshToken);
    postRefreshTokenReactNativeWebView('');
    queryClient.clear();
    push('/login');
  };

  return {
    isLoaded,
    setIsLoaded,
    userLogin,
    userLogout,
  };
}
