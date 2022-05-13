import { useMutation } from 'react-query';

import { post } from '~/libs/api/client';

export interface CheckExistsSignupMutationParams {
  email: string;
}

export interface CheckExistsSignupMutationResponse {
  message: string;
  data: boolean;
}

/**
 * 해당 유저가 가입되어 있는 유저인지 상태 여부를 반환한다.
 */
export default function useCheckExistsSignupMutation() {
  return useMutation<
    CheckExistsSignupMutationResponse,
    { message?: string },
    CheckExistsSignupMutationParams
  >(({ email }: CheckExistsSignupMutationParams) =>
    post<CheckExistsSignupMutationResponse>(`/v1/signup/${email}/status`)
  );
}
