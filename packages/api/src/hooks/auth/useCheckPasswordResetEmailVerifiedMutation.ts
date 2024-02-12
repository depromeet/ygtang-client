import { useMutation } from "@tanstack/react-query";
import { get } from "@ygtang/http";

interface UseCheckPasswordResetEmailVerifiedMutationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (...props: any) => unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: (...props: any) => unknown;
}

export interface CheckPasswordResetEmailVerifiedMutationParams {
  email: string;
}

export interface CheckPasswordResetEmailVerifiedMutationResponse {
  message: string;
  data: boolean;
}

/**
 * `/api/v1/auth/passwords/reset/email/{email}/status`
 *
 * 비밀번호 초기화를 위한 해당 이메일의 인증 상태 여부를 반환한다.
 */
export function useCheckPasswordResetEmailVerifiedMutation({
  onSuccess,
  onError,
}: UseCheckPasswordResetEmailVerifiedMutationProps) {
  return useMutation({
    mutationFn: ({ email }: CheckPasswordResetEmailVerifiedMutationParams) =>
      get<CheckPasswordResetEmailVerifiedMutationResponse>(
        `/v1/auth/passwords/reset/email/${email}/status`,
      ),
    onSuccess,
    onError,
  });
}
