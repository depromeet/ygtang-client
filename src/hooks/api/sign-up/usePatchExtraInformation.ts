import { useMutation } from 'react-query';

import useInternalRouter from '~/hooks/common/useInternalRouter';
import { patch } from '~/libs/api/client';
import { useToast } from '~/store/Toast';
import { useUserInformation } from '~/store/UserInformation';

interface ExtraInformationParams {
  age: string;
  job: string;
  gender: string;
}

export default function usePatchExtraInformation() {
  const { fireToast } = useToast();
  const { userInformation } = useUserInformation();
  const router = useInternalRouter();

  const mutation = useMutation<unknown, { message?: string }, ExtraInformationParams>(
    (data: ExtraInformationParams) =>
      patch(`/v1/signup/extra-informations?email=${userInformation.email}`, data),
    {
      onSuccess: () => {
        router.push('/');
      },
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
