import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import {
  API_URL_DEVELOPMENT,
  API_URL_PRODUCTION,
  IS_PRODUCTION,
} from "@ygtang/constants";
import axios, { AxiosError, AxiosResponse } from "axios";

import { ApiErrorScheme, ApiException } from "./exceptions/ApiException";
import { CustomException } from "./exceptions/CustomException";
import { errorMessage } from "./exceptions/messagePreset";

export const instance = axios.create({
  baseURL: IS_PRODUCTION ? API_URL_PRODUCTION : API_URL_DEVELOPMENT,
  withCredentials: true,
  timeout: 15000,
});

export function setAccessToken(token: string) {
  instance.defaults.headers.common["accessToken"] = token;
}

export { fetchAdapter };
export function setUsingFetchAdapter() {
  instance.defaults.adapter = fetchAdapter;
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
    return Promise.reject(
      new ApiException(error.response.data, error.response.status),
    );
  }

  if (error.message.startsWith("timeout")) {
    return Promise.reject(
      new CustomException(errorMessage.TIMEOUT, "NETWORK_TIMEOUT"),
    );
  }

  return Promise.reject(
    new CustomException(errorMessage.UNKNOWN_400, "NETWORK_ERROR"),
  );
}

instance.interceptors.response.use(
  interceptorResponseFulfilled,
  interceptorResponseRejected,
);

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T>(...args);
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
