import { useMutation } from '@tanstack/react-query';

import { post } from '~/libs/api/client';

export interface SendPasswordResetEmailMutationParams {
  email: string;
}

interface SendPasswordResetEmailMutationProps {
  onSuccess?: (
    data: unknown,
    variables: SendPasswordResetEmailMutationParams,
    context: unknown
  ) => void | Promise<unknown>;
  onError?: (
    data: unknown,
    variables: SendPasswordResetEmailMutationParams,
    context: unknown
  ) => void | Promise<unknown>;
}

/**
 * `/api/v1/auth/sends-email/passwords/reset`
 *
 * 비밀번호 변경을 위해 이메일에 인증 링크를 요청한다
 */
export default function useSendPasswordResetEmailMutation({
  onSuccess,
  onError,
}: SendPasswordResetEmailMutationProps) {
  return useMutation<undefined, { message?: string }, SendPasswordResetEmailMutationParams>(
    ({ email }: SendPasswordResetEmailMutationParams) =>
      post<undefined>(`/v1/auth/sends-email/passwords/reset`, {
        email,
      }),
    { onSuccess, onError }
  );
}
