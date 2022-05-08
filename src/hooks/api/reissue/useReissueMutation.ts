import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';

interface ReissueMutationRequest {
  accessToken: string;
  refreshToken: string;
}

export default function useReissueMutation() {
  return useMutation((data: ReissueMutationRequest) =>
    post<AuthTokenResponseInterface>('/v1/reissue', undefined, {
      headers: {
        'X-AUTH-TOKEN': data.accessToken,
        'REFRESH-TOKEN': data.refreshToken,
      },
    })
  );
}
