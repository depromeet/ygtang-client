import { useMutation } from "@tanstack/react-query";
import { post } from "@ygtang/http";

export interface CheckExistsNicknameMutationParams {
  nickname: string;
}

export interface CheckExistsNicknameMutationResponse {
  message: string;
  data: null;
}

export function useCheckExistsNicknameMutation() {
  return useMutation<
    CheckExistsNicknameMutationResponse,
    { message?: string },
    CheckExistsNicknameMutationParams
  >({
    mutationFn: ({ nickname }: CheckExistsNicknameMutationParams) =>
      post<CheckExistsNicknameMutationResponse>(
        `/v1/signup/nicknames/${nickname}/exists`,
      ),
  });
}
