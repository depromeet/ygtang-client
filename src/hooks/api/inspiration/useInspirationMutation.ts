import { useMutation } from 'react-query';

import useInternalRouter from '~/hooks/common/useInternalRouter';
import { post } from '~/libs/api/client';
import { useToast } from '~/store/Toast';

export interface InspirationMutationRequest {
  content?: string;
  file: string;
  memo: string;
  tagIds: number[];
  type: InspirationType;
}

export default function useInspirationMutation() {
  const { push } = useInternalRouter();
  const { fireToast } = useToast();
  const createInspirationMutation = useMutation(
    (data: InspirationMutationRequest) => post('/v1/inspiration/add', { data }),
    {
      onSuccess: () => {
        fireToast({ content: '영감이 등록되었습니다!' });
        // TODO: main 전체 invalidate (tag?)
        push('/');
      },
      onError: (error, variable, context) => {
        console.log('err', error, variable, context);
      },
    }
  );

  return { createInspiration: createInspirationMutation.mutate };
}
