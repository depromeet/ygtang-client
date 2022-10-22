import { useMutation } from '@tanstack/react-query';

import { patch } from '~/libs/api/client';
import { useToast } from '~/store/Toast';

export interface ExtraInformationParams {
  email: string;
  age: string;
  job: string;
  gender: string;
}

export default function usePatchExtraInformation() {
  const { fireToast } = useToast();

  const mutation = useMutation<unknown, { message?: string }, ExtraInformationParams>(
    (data: ExtraInformationParams) =>
      patch(`/v1/signup/extra-informations?email=${data.email}`, data),
    {
      onError: error => {
        fireToast({
          content: error.message ?? '문제가 발생했습니다. 다시 시도해주세요.',
          duration: 3500,
        });
      },
    }
  );

  return mutation;
}
