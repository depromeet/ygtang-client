import { useMutation, useQueryClient } from 'react-query';

import { INSPIRATION_BY_ID_QUERY_KEY } from '~/hooks/api/inspiration/useInspirationById';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { del, post } from '~/libs/api/client';
import { useToast } from '~/store/Toast';

import { INSPIRATION_LIST_QUERY_KEY } from './useGetInspirationListWIthInfinite';

export default function useInspirationMutation() {
  const queryClient = useQueryClient();
  const { push } = useInternalRouter();
  const { fireToast } = useToast();

  const resetInspirationList = () => {
    queryClient.resetQueries(INSPIRATION_LIST_QUERY_KEY);
  };

  const resetInspirationItem = (id: number) => {
    queryClient.invalidateQueries([INSPIRATION_BY_ID_QUERY_KEY, `${id}`]);
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
    (modifiedMemo: { id: number; memo: string }) => post('/v1/inspiration/modify', modifiedMemo),
    {
      onSuccess: (_res, req) => {
        resetInspirationItem(req.id);
      },
      onError: (error, variable, context) => {
        console.log('err', error, variable, context);
      },
    }
  );

  return {
    /**
     * 영감을 추가합니다.
     * createInspiration(data: FormData);
     */
    createInspiration: createInspirationMutation.mutate,

    /**
     * 영감을 삭제합니다.
     * deleteInspiration(id: number);
     */
    deleteInspiration: deleteInspirationMutation.mutate,

    /**
     * 영감 메모를 수정합니다.
     * modifyInspiration({id: number, memo: string})
     */
    modifyInspiration: modifyInspirationMemoMutation.mutate,
  };
}
