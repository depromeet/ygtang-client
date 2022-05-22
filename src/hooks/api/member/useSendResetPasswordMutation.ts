import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';

interface SendResetPasswordMutationProps {
  onSuccess?: (
    data: unknown,
    variables: SendResetPasswordMutationParams,
    context: unknown
  ) => void | Promise<unknown>;
  onError?: (
    data: { message?: string },
    variables: { message?: string },
    context: unknown
  ) => void | Promise<unknown>;
}

export interface SendResetPasswordMutationParams {
  email: string;
}

/**
 * `/api/v1/members/sends-email/reset-passwords`
 *
 * 초기화된 비밀번호를 이메일로 전송한다.
 */
export default function useSendResetPasswordMutation({}: SendResetPasswordMutationProps) {
  return useMutation<undefined, { message?: string }, SendResetPasswordMutationParams>(
    ({ email }: SendResetPasswordMutationParams) =>
      post<undefined>(`/v1/members/sends-email/reset-passwords`, {
        email,
      })
  );
}
