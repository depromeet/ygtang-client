import { useMutation, useQuery } from 'react-query';

import { get } from '~/libs/api/client';

export interface CheckEmailVerifiedStatusMutationParams {
  email: string;
}

export interface CheckEmailVerifiedStatusMutationResponse {
  message: string;
  data: boolean;
}

/**
 * `/api/v1/auth/email/{email}/status`
 *
 * 해당 이메일의 인증 상태 여부 반환
 */
export default function useCheckEmailVerifiedStatusMutation() {
  return useMutation<
    CheckEmailVerifiedStatusMutationResponse,
    { message?: string },
    CheckEmailVerifiedStatusMutationParams
  >(({ email }: CheckEmailVerifiedStatusMutationParams) =>
    get<CheckEmailVerifiedStatusMutationResponse>(`/v1/auth/email/${email}/status`)
  );
}
