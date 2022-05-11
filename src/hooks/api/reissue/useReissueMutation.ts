import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';

interface ReissueMutationRequest {
  refreshToken: string;
}

export default function useReissueMutation() {
  return useMutation((data: ReissueMutationRequest) =>
    post<AuthTokenResponseInterface>('/v1/reissue', undefined, {
      headers: {
        'REFRESH-TOKEN': data.refreshToken,
      },
    })
  );
}
