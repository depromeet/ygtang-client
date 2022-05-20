import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';

interface ReissueMutationRequest {
  refreshToken: string;
}

interface ReissueMutationResponse {
  message: string;
  data: AuthTokenResponseInterface;
}

interface UseReissueMutationProps {
  onSuccess?: (
    data: ReissueMutationResponse,
    variables: ReissueMutationRequest,
    context: unknown
  ) => void | Promise<unknown>;
  onError?: (
    data: ReissueMutationResponse,
    variables: ReissueMutationRequest,
    context: unknown
  ) => void | Promise<unknown>;
}

export default function useReissueMutation({ onSuccess, onError }: UseReissueMutationProps) {
  return useMutation(
    (data: ReissueMutationRequest) =>
      post<ReissueMutationResponse>('/v1/reissue', undefined, {
        headers: {
          'REFRESH-TOKEN': data.refreshToken,
        },
      }),
    {
      onSuccess,
      onError,
    }
  );
}
