import axios, { AxiosError, AxiosResponse } from 'axios';

import { IS_PRODUCTION } from '~/constants/common';

const DEVELOPMENT_API_URL = 'https://api.ygtang.xyz/api';
const PRODUCTION_API_URL = 'https://ygtang.kr/api';

export const instance = axios.create({
  baseURL: IS_PRODUCTION ? PRODUCTION_API_URL : DEVELOPMENT_API_URL,
  withCredentials: true,
});

export function replaceAccessTokenForRequestInstance(token: string) {
  instance.defaults.headers.common['accessToken'] = token;
}

// Response interceptor
function interceptorResponseFulfilled(res: AxiosResponse) {
  if (200 <= res.status && res.status < 300) {
    return res.data;
  }

  return Promise.reject(res.data);
}

function interceptorResponseRejected(error: AxiosError) {
  return Promise.reject(new Error(error.response?.data?.message ?? error));
}

instance.interceptors.response.use(interceptorResponseFulfilled, interceptorResponseRejected);

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T, T>(...args);
}

export function post<T>(...args: Parameters<typeof instance.post>) {
  return instance.post<T, T>(...args);
}

export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T, T>(...args);
}

export function patch<T>(...args: Parameters<typeof instance.patch>) {
  return instance.patch<T, T>(...args);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T, T>(...args);
}
