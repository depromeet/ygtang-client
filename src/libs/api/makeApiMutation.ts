/* eslint-disable react-hooks/rules-of-hooks */
import { useSWRConfig } from 'swr';
import useMutation from 'use-mutation';

/**
 * API를 mutate 할 수 있는 mutation을 만들어줍니다. useMutation과 swr v1을 더욱 간단하게 사용할 수 있도록 고안되었어요.
 *
 * @param mutationKey 뮤테이션 SWR의 키 값이에요. 리퀘스트 endpoint마다 고유해야 해요.
 * @param url 요청 할 주소(endpoint)에요.
 * @param fetcher fetcher에요. `src/libs/api/fetcher.ts`를 참고해주세요.
 * @param customFetcher 기본적인 fetcher를 사용하지 못하고, header 등의 요소를 사용하여야 하는 경우 사용해요.
 */
export default function makeApiMutation<DataType = void, ReturnType = void>(
  mutationKey: string | [string, any],
  url: string,
  fetcher: (url: string, data: any) => Promise<any>,
  customFetcher?: (input?: any) => Promise<any>
) {
  const { cache, mutate } = useSWRConfig();

  // 기본적으로 fetcher를 제공하는 fetcher 함수
  const defaultFetcher = (input: any) => {
    return fetcher(url, input);
  };

  // customFetcher가 있을 때는 우선적으로 사용함.
  const usingFetcher = customFetcher ?? defaultFetcher;

  return useMutation<DataType, ReturnType>(usingFetcher, {
    onMutate({ input }) {
      const oldData = cache.get(mutationKey);

      mutate((cachedData: any) => cachedData.concat(input), false);

      return () => mutate(mutationKey, oldData, false);
    },

    onFailure({ rollback }) {
      if (rollback) rollback();
    },
  });
}
