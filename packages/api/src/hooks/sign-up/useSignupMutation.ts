import { useMutation } from "@tanstack/react-query";
import { post } from "@ygtang/http";

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
 *
 * NOTE: @ddarkr - 이전 과정에서 api fetching을 다루지 않는 로직이 제거되었습니다. 이전 시 확인 부탁드립니다.
 */
export default function useSignupMutation() {
  const mutation = useMutation<
    SignupMutationResponse,
    { message?: string },
    SignupMutationParams
  >({
    mutationFn: (data: SignupMutationParams) =>
      post<SignupMutationResponse>(`/v1/signup`, data),
  });

  return mutation;
}
