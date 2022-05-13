import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';

interface ReissueMutationRequest {
  refreshToken: string;
}

interface UseReissueMutationProps {
  onSuccess?: (
    data: AuthTokenResponseInterface,
    variables: ReissueMutationRequest,
    context: unknown
  ) => void | Promise<unknown>;
}

export default function useReissueMutation({ onSuccess }: UseReissueMutationProps) {
  return useMutation(
    (data: ReissueMutationRequest) =>
      post<AuthTokenResponseInterface>('/v1/reissue', undefined, {
        headers: {
          'REFRESH-TOKEN': data.refreshToken,
        },
      }),
    {
      onSuccess,
    }
  );
}
