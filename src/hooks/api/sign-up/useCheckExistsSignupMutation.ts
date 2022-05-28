import { useMutation } from 'react-query';

import { get } from '~/libs/api/client';

export interface CheckExistsSignupMutationParams {
  email: string;
}

export interface CheckExistsSignupMutationResponse {
  message: string;
  data: boolean;
}

interface UseCheckExistsSignupMutationProps {
  onError?: (
    data: { message?: string },
    variables: CheckExistsSignupMutationParams,
    context: unknown
  ) => void | Promise<unknown>;
}

/**
 * 해당 유저가 가입되어 있는 유저인지 상태 여부를 반환한다.
 */
export default function useCheckExistsSignupMutation({
  onError,
}: UseCheckExistsSignupMutationProps) {
  return useMutation<
    CheckExistsSignupMutationResponse,
    { message?: string },
    CheckExistsSignupMutationParams
  >(
    ({ email }: CheckExistsSignupMutationParams) =>
      get<CheckExistsSignupMutationResponse>(`/v1/signup/${email}/status`),
    { onError }
  );
}
