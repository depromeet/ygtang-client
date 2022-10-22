import { useMutation } from '@tanstack/react-query';

import { post } from '~/libs/api/client';

export interface CheckExistsNicknameMutationParams {
  nickname: string;
}

export interface CheckExistsNicknameMutationResponse {
  message: string;
  data: null;
}

export default function useCheckExistsNicknameMutation() {
  return useMutation<
    CheckExistsNicknameMutationResponse,
    { message?: string },
    CheckExistsNicknameMutationParams
  >(({ nickname }: CheckExistsNicknameMutationParams) =>
    post<CheckExistsNicknameMutationResponse>(`/v1/signup/nicknames/${nickname}/exists`)
  );
}
