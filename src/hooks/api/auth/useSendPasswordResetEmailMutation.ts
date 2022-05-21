import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';

export interface SendPasswordResetEmailMutationParams {
  email: string;
}

/**
 * `/api/v1/auth/password/sends-email/{email}`
 *
 * 비밀번호 변경을 위해 이메일에 인증 링크를 요청한다
 */
export default function useSendPasswordResetEmailMutation() {
  return useMutation<undefined, { message?: string }, SendPasswordResetEmailMutationParams>(
    ({ email }: SendPasswordResetEmailMutationParams) =>
      post<undefined>(`/v1/auth/sends-email/passwords/reset`, {
        email,
      })
  );
}
