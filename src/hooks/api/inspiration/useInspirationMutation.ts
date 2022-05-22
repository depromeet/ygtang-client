import { useMutation, useQueryClient } from 'react-query';

import useInternalRouter from '~/hooks/common/useInternalRouter';
import { del, post } from '~/libs/api/client';
import { useToast } from '~/store/Toast';

import { INSPIRATION_LIST_QUERY_KEY } from './useGetInspirationListWIthInfinite';

export interface InspirationMutationRequest {
  content?: string;
  file?: string;
  memo: string;
  tagIds?: number[];
  type: InspirationType;
}

export default function useInspirationMutation() {
  const queryClient = useQueryClient();
  const { push } = useInternalRouter();
  const { fireToast } = useToast();

  const resetInspirationList = () => {
    queryClient.resetQueries(INSPIRATION_LIST_QUERY_KEY);
  };

  const createInspirationMutation = useMutation(
    (data: FormData) => post('/v1/inspiration/add', data),
    {
      onSuccess: () => {
        fireToast({ content: '영감이 등록되었습니다!' });
        resetInspirationList();
        push('/');
      },
      onError: (error, variable, context) => {
        console.log('err', error, variable, context);
      },
    }
  );

  const deleteInspirationMutation = useMutation(
    (id: number) => del(`/v1/inspiration/remove/${id}`),
    {
      onSuccess: () => {
        resetInspirationList();
        push('/');
      },
      onError: (error, variable, context) => {
        console.log('err', error, variable, context);
      },
    }
  );

  const modifyInspirationMemoMutation = useMutation(
    (data: { id: number; memo: string }) => post('/v1/inspiration/modify', data),
    {
      onSuccess: res => {
        console.log(res);
        // TODO: view 화면 업데이트, 리스트도.. 필요할지도
      },
      onError: (error, variable, context) => {
        console.log('err', error, variable, context);
      },
    }
  );

  return {
    createInspiration: createInspirationMutation.mutate,
    deleteInspiration: deleteInspirationMutation.mutate,
    modifyInspiration: modifyInspirationMemoMutation.mutate,
  };
}
