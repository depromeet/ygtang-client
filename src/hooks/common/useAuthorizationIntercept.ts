import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import { COOKIE_REFRESH } from '~/constants/common';
import { instance, post, replaceResponseInterceptorForApiInstance } from '~/libs/api/client';
import { useToast } from '~/store/Toast';
import { useUser } from '~/store/User';

import useCookie from './useCookie';
import useInternalRouter from './useInternalRouter';

export default function useAuthorizationIntercept() {
  const { fireToast } = useToast();
  const { get: getCookie, remove: removeCookie } = useCookie();
  const { push } = useInternalRouter();
  const { userLogin, refreshToken } = useUser();
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    const axiosRejectedInterceptor = async (error: AxiosError) => {
      const status = error.response ? error.response.status : null;

      if (!error.config.headers || status !== 401 || isPending)
        return Promise.reject(new Error(error.response?.data?.message ?? error));
      if (!refreshToken) {
        // TODO: 추후 로그아웃(user/userLogout) 넣기
        return Promise.reject('로그인 하지 못했습니다.');
      }
      setPending(true);

      try {
        const { data } = await post<{ message: string; data: AuthTokenResponseInterface }>(
          '/v1/reissue',
          undefined,
          {
            headers: {
              'REFRESH-TOKEN': refreshToken,
            },
          }
        );
        setPending(false);
        userLogin({ accessToken: data.accessToken, refreshToken: data.refreshToken });
        error.config.headers['accessToken'] = data.accessToken;
      } catch {
        fireToast({ content: '세션이 만료되었습니다. 다시 로그인 해주세요.' });

        // TODO: 추후 로그아웃(user/userLogout)으로 대체
        push('/onboard');
        removeCookie(COOKIE_REFRESH);
        setPending(false);
        return Promise.reject('세션이 만료되었습니다.');
      }

      return instance.request(error.config);
    };

    replaceResponseInterceptorForApiInstance({ rejected: axiosRejectedInterceptor });
  }, [fireToast, getCookie, isPending, push, refreshToken, removeCookie, userLogin]);
}
