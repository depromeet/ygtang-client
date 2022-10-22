import { useMutation } from '@tanstack/react-query';

import { post } from '~/libs/api/client';

export interface MemberLoginMutationRequest {
  email: string;
  password: string;
}

export interface MemberLoginMutationResponse {
  message: string;
  data: AuthTokenResponseInterface;
}

export default function useMemberLoginMutation() {
  return useMutation<MemberLoginMutationResponse, { message?: string }, MemberLoginMutationRequest>(
    (data: MemberLoginMutationRequest) => post<MemberLoginMutationResponse>('/v1/auth/login', data)
  );
}
