import { useMutation } from "@tanstack/react-query";
import { post } from "@ygtang/http";

export interface SignupSendEmailMutationParams {
  email: string;
}

interface UseSignupSendEmailMutationProps {
  onSuccess?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    variables: SignupSendEmailMutationParams,
    context: unknown,
  ) => void | Promise<unknown>;
  onError?: (
    data: { message?: string },
    variables: SignupSendEmailMutationParams,
    context: unknown,
  ) => void | Promise<unknown>;
}

/**
 * 회원가입을 위해 이메일에 인증 링크를 요청한다
 */
export function useSignupSendEmailMutation({
  onSuccess,
  onError,
}: UseSignupSendEmailMutationProps) {
  return useMutation({
    mutationFn: (data: SignupSendEmailMutationParams) =>
      post<undefined>("/v1/auth/sends-email/signup", data),
    onSuccess,
    onError,
  });
}
