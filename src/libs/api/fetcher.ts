import { get } from './client';

export async function fetcher<T>(path: string) {
  return await get<T>(path);
}
