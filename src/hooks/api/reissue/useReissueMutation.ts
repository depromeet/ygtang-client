import { post } from '~/libs/api/client';
import { poster } from '~/libs/api/fetcher';
import makeApiMutation from '~/libs/api/makeApiMutation';
import { AuthTokenResponseInterface } from '~/remotes/auth';

interface ReissueMutationRequest {
  accessToken: string;
  refreshToken: string;
}

// NOTE: /v1/reissue endpoint는 커스텀 헤더를 요구합니다.
async function customFetcher(input: ReissueMutationRequest) {
  return post('/v1/reissue', undefined, {
    headers: {
      'X-AUTH-TOKEN': input.accessToken,
      'REFRESH-TOKEN': input.refreshToken,
    },
  });
}

export function useReissueMutation() {
  return makeApiMutation<ReissueMutationRequest, AuthTokenResponseInterface>(
    'reissue',
    '/v1/reissue',
    poster,
    customFetcher
  );
}
