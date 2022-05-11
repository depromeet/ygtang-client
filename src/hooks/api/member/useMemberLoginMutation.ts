import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';

export interface MemberLoginMutationRequest {
  email: string;
  password: string;
}

export default function useMemberLoginMutation() {
  return useMutation<AuthTokenResponseInterface, { message?: string }, MemberLoginMutationRequest>(
    (data: MemberLoginMutationRequest) => post<AuthTokenResponseInterface>('/v1/auth/login', data)
  );
}
