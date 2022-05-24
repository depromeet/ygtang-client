import { useMutation } from 'react-query';

import { put } from '~/libs/api/client';

interface ChangePasswordMutationProps {
  onSuccess?: (
    data: ChangePasswordResponse,
    variables: ChangePasswordRequest,
    context: unknown
  ) => void | Promise<unknown>;
  onError?: (
    data: { message?: string },
    variables: ChangePasswordRequest,
    context: unknown
  ) => void | Promise<unknown>;
}

export type ChangePasswordRequest = {
  password: string;
  confirmPassword: string;
};
export type ChangePasswordResponse = {};

export function useChangePassword({ onSuccess, onError }: ChangePasswordMutationProps) {
  return useMutation<ChangePasswordResponse, { message?: string }, ChangePasswordRequest>(
    (data: ChangePasswordRequest) =>
      put<ChangePasswordResponse>('/v1/members/passwords/change', data),
    { onSuccess, onError }
  );
}
