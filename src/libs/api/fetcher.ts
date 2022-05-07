import { get, post } from './client';

export async function fetcher<T>(path: string) {
  return await get<T>(path);
}

export async function poster<T>(path: string, data?: any) {
  return await post<T>(path, data);
}
