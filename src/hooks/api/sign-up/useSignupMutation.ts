import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';
import { useToast } from '~/store/Toast';

interface SignupMutationParams {
  email: string;
  nickName: string;
  password: string;
  confirmPassword: string;
}

interface SignupMutationResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpireDate: number;
    memberId: number;
  };
}

/**
 * `/api/v1/signup`
 *
 * 회원가입을 합니다.
 */
export default function useSignupMutation() {
  const { fireToast } = useToast();

  const mutation = useMutation<SignupMutationResponse, { message?: string }, SignupMutationParams>(
    (data: SignupMutationParams) => post<SignupMutationResponse>(`/v1/signup`, data),
    {
      onError: error => {
        fireToast({
          content: error.message ?? '문제가 발생했습니다. 다시 시도해주세요.',
          duration: 3500,
        });
      },
    }
  );

  return mutation;
}
