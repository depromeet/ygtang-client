import { useMutation } from "@tanstack/react-query";
import { post } from "@ygtang/http";

import { AuthTokenResponseInterface } from "../../types/auth";

export interface MemberLoginMutationRequest {
  email: string;
  password: string;
}

export interface MemberLoginMutationResponse {
  message: string;
  data: AuthTokenResponseInterface;
}

export function useMemberLoginMutation({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: MemberLoginMutationResponse) => void;
  onError?: (data: { message?: string }) => void;
}) {
  return useMutation<
    MemberLoginMutationResponse,
    { message?: string },
    MemberLoginMutationRequest
  >({
    mutationFn: async (data: MemberLoginMutationRequest) =>
      await post<MemberLoginMutationResponse>("v1/auth/login", {
        json: data,
      }),
    onSuccess,
    onError,
  });
}
