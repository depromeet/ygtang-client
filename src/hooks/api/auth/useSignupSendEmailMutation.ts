import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';

export interface SignupSendEmailMutationRequest {
  email: string;
}

/**
 * 회원가입을 위해 이메일에 인증 링크를 요청한다
 */
export default function useSignupSendEmailMutation() {
  return useMutation<undefined, { message?: string }, SignupSendEmailMutationRequest>(
    (data: SignupSendEmailMutationRequest) => post<undefined>('/v1/auth/sends-email', data)
  );
}
