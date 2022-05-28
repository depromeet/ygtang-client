import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';

export interface SignupSendEmailMutationParams {
  email: string;
}

interface UseSignupSendEmailMutationProps {
  onSuccess?: (
    data: any,
    variables: SignupSendEmailMutationParams,
    context: unknown
  ) => void | Promise<unknown>;
  onError?: (
    data: { message?: string },
    variables: SignupSendEmailMutationParams,
    context: unknown
  ) => void | Promise<unknown>;
}

/**
 * 회원가입을 위해 이메일에 인증 링크를 요청한다
 */
export default function useSignupSendEmailMutation({
  onSuccess,
  onError,
}: UseSignupSendEmailMutationProps) {
  return useMutation<undefined, { message?: string }, SignupSendEmailMutationParams>(
    (data: SignupSendEmailMutationParams) => post<undefined>('/v1/auth/sends-email/signup', data),
    { onSuccess, onError }
  );
}
