import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '개발할 때 쓸 주소' : '프로덕트 주소',
  withCredentials: true,
});

// Request interceptor
function interceptorRequestFulfilled(config: AxiosRequestConfig) {
  return {
    ...config,
    headers: {
      Authorization: `Bearer 어쩌구토큰`,
    },
  };
}

instance.interceptors.request.use(interceptorRequestFulfilled);

// Response interceptor
function interceptorResponseFulfilled(res: AxiosResponse) {
  if (200 <= res.status && res.status < 300) {
    return res.data;
  }

  return Promise.reject(res.data);
}

function interceptorResponseRejected(error: AxiosError) {
  // todo: error api spec에 맞춰서 수정해야함
  return Promise.reject(new Error(error.response?.data.에러메세지 ?? error));
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

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T, T>(...args);
}
