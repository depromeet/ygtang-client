import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const developmentApiUrl = process.env.API_DEVELOPMENT ?? 'https://ygtang.kr/api';

export const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? developmentApiUrl : 'https://ygtang.kr/api',
  withCredentials: true,
});

export function replaceAccessTokenForRequestInstance(token: string) {
  // Request interceptor
  function interceptorRequestFulfilled(config: AxiosRequestConfig) {
    return {
      ...config,
      headers: {
        accessToken: `${token}`,
      },
    };
  }

  instance.interceptors.request.use(interceptorRequestFulfilled);
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

let responseInterceptor = instance.interceptors.response.use(
  interceptorResponseFulfilled,
  interceptorResponseRejected
);

/**
 * API 인스턴스의 response 인터셉터를 수정합니다.
 */
export function replaceResponseInterceptorForApiInstance({
  fulfilled,
  rejected,
}: {
  fulfilled?: any;
  rejected?: any;
}) {
  instance.interceptors.response.eject(responseInterceptor);

  responseInterceptor = instance.interceptors.response.use(
    fulfilled ?? interceptorResponseFulfilled,
    rejected ?? interceptorResponseRejected
  );
}

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T, T>(...args);
}

export function post<T>(...args: Parameters<typeof instance.post>) {
  return instance.post<T, T>(...args);
}

export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T, T>(...args);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T, T>(...args);
}
