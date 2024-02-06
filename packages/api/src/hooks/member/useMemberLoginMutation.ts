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

export function useMemberLoginMutation() {
  return useMutation<
    MemberLoginMutationResponse,
    { message?: string },
    MemberLoginMutationRequest
  >({
    mutationFn: (data: MemberLoginMutationRequest) =>
      post<MemberLoginMutationResponse>("/v1/auth/login", data),
  });
}
