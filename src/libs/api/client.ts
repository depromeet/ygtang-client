import axios, { AxiosError, AxiosResponse } from 'axios';

import { IS_PRODUCTION } from '~/constants/common';
import ApiException from '~/exceptions/ApiException';
import CustomException from '~/exceptions/CustomException';
import { errorMessage } from '~/exceptions/messages';
import { ApiErrorScheme } from '~/exceptions/type';

const DEVELOPMENT_API_URL = 'https://ygtang.kr/api'; // TODO: 개발 서버 사망에 따른 개발 버전에서도 프로덕션 사용
const PRODUCTION_API_URL = 'https://ygtang.kr/api';

export const instance = axios.create({
  baseURL: IS_PRODUCTION ? PRODUCTION_API_URL : DEVELOPMENT_API_URL,
  withCredentials: true,
  timeout: 15000,
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

function interceptorResponseRejected(error: AxiosError<ApiErrorScheme>) {
  if (error.response?.data?.message) {
    return Promise.reject(new ApiException(error.response.data, error.response.status));
  }

  if (error.message.startsWith('timeout')) {
    return Promise.reject(new CustomException(errorMessage.TIMEOUT, 'NETWORK_TIMEOUT'));
  }

  return Promise.reject(new CustomException(errorMessage.UNKNOWN_400, 'NETWORK_ERROR'));
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
