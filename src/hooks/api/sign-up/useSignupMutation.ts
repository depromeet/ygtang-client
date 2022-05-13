import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';

export interface SignupMutationParams {
  email: string;
  nickName: string;
  password: string;
  confirmPassword: string;
}

export type SignupMutationResponse = string;

/**
 * `/api/v1/signup`
 *
 * 회원가입을 합니다.
 */
export default function useSignupMutation() {
  return useMutation<SignupMutationResponse, { message?: string }, SignupMutationParams>(
    (data: SignupMutationParams) => post<SignupMutationResponse>(`/v1/signup`, data)
  );
}
