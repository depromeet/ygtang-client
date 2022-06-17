import { useMutation } from 'react-query';

import useInternalRouter from '~/hooks/common/useInternalRouter';
import { useUser } from '~/hooks/common/useUser';
import { post } from '~/libs/api/client';
import { useToast } from '~/store/Toast';
import { recordEvent } from '~/utils/analytics';

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
  const router = useInternalRouter();
  const { userLogin } = useUser();

  const mutation = useMutation<SignupMutationResponse, { message?: string }, SignupMutationParams>(
    (data: SignupMutationParams) => post<SignupMutationResponse>(`/v1/signup`, data),
    {
      onSuccess: data => {
        const {
          data: { accessToken, refreshToken },
        } = data;

        recordEvent({
          action: 'Signup',
          value: '회원 가입 완료',
          category: '이메일 인증 후 회원가입 화면',
        });

        userLogin({ accessToken, refreshToken });
        router.push('/signup/information');
      },
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
