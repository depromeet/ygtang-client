import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';

export interface SendResetPasswordMutationParams {
  email: string;
}

/**
 * `/api/v1/members/sends-email/reset-passwords`
 *
 * 초기화된 비밀번호를 이메일로 전송한다.
 */
export default function useSendResetPasswordMutation() {
  return useMutation<undefined, { message?: string }, SendResetPasswordMutationParams>(
    ({ email }: SendResetPasswordMutationParams) =>
      post<undefined>(`/v1/members/sends-email/reset-passwords`, {
        email,
      })
  );
}
