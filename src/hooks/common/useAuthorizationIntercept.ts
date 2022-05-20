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
  const { userLogin } = useUser();
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    const axiosRejectedInterceptor = async (error: AxiosError) => {
      const status = error.response ? error.response.status : null;

      // // response
      // if (error.response?.data?.message) {
      //   return Promise.reject(new Error(error.response?.data?.message));
      // }

      if (status === 401 && !isPending) {
        const storedRefreshToken = getCookie(COOKIE_REFRESH);
        if (!storedRefreshToken) {
          return Promise.reject('로그인 하지 못했습니다.');
        }
        setPending(true);
        try {
          const { data } = await post<{ message: string; data: AuthTokenResponseInterface }>(
            '/v1/reissue',
            undefined,
            {
              headers: {
                'REFRESH-TOKEN': storedRefreshToken,
              },
            }
          );
          setPending(false);
          userLogin({ accessToken: data.accessToken, refreshToken: data.refreshToken });
        } catch {
          fireToast({ content: '세션이 만료되었습니다.' });
          push('/login');
          removeCookie(COOKIE_REFRESH);
          setPending(false);
          return Promise.reject('세션이 만료되었습니다.');
        }

        return instance.request(error.config);
      }

      return Promise.reject(new Error(error.response?.data?.message ?? error));
    };

    replaceResponseInterceptorForApiInstance({ rejected: axiosRejectedInterceptor });
  }, [fireToast, getCookie, isPending, push, removeCookie, userLogin]);
}
