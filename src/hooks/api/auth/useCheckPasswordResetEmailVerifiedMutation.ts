import { useMutation } from 'react-query';

import { get } from '~/libs/api/client';

export interface CheckPasswordResetEmailVerifiedMutationParams {
  email: string;
}

export interface CheckPasswordResetEmailVerifiedMutationResponse {
  message: string;
  data: boolean;
}

/**
 * `/api/v1/auth/passwords/reset/email/{email}/status`
 *
 * 비밀번호 초기화를 위한 해당 이메일의 인증 상태 여부를 반환한다.
 */
export default function useCheckPasswordResetEmailVerifiedMutation() {
  return useMutation<
    CheckPasswordResetEmailVerifiedMutationResponse,
    { message?: string },
    CheckPasswordResetEmailVerifiedMutationParams
  >(({ email }: CheckPasswordResetEmailVerifiedMutationParams) =>
    get<CheckPasswordResetEmailVerifiedMutationResponse>(
      `/v1/auth/passwords/reset/email/${email}/status`
    )
  );
}
