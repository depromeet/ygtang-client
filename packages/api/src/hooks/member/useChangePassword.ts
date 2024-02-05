import { useMutation } from "@tanstack/react-query";
import { put } from "@ygtang/http";

interface ChangePasswordMutationProps {
  onSuccess?: (
    data: ChangePasswordResponse,
    variables: ChangePasswordRequest,
    context: unknown,
  ) => void | Promise<unknown>;
  onError?: (
    data: { message?: string },
    variables: ChangePasswordRequest,
    context: unknown,
  ) => void | Promise<unknown>;
}

export type ChangePasswordRequest = {
  password: string;
  confirmPassword: string;
};
// eslint-disable-next-line @typescript-eslint/ban-types
export type ChangePasswordResponse = {};

export function useChangePassword({
  onSuccess,
  onError,
}: ChangePasswordMutationProps) {
  return useMutation<
    ChangePasswordResponse,
    { message?: string },
    ChangePasswordRequest
  >({
    mutationFn: (data: ChangePasswordRequest) =>
      put<ChangePasswordResponse>("/v1/members/passwords/change", data),
    onSuccess,
    onError,
  });
}
