import { useMutation } from "@tanstack/react-query";
import { get } from "@ygtang/http";

export interface CheckEmailVerifiedStatusMutationParams {
  email: string;
}

export interface CheckEmailVerifiedStatusMutationResponse {
  message: string;
  data: boolean;
}

/**
 * `/api/v1/auth/email/{email}/status`
 *
 * 해당 이메일의 인증 상태 여부 반환
 */
export default function useCheckEmailVerifiedStatusMutation() {
  return useMutation({
    mutationFn: ({ email }: CheckEmailVerifiedStatusMutationParams) =>
      get<CheckEmailVerifiedStatusMutationResponse>(
        `/v1/auth/signup/email/${email}/status`,
      ),
  });
}
