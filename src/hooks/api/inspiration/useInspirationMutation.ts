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

  const removeInspirationList = () => {
    queryClient.removeQueries(INSPIRATION_LIST_QUERY_KEY, { exact: true });
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

  const deleteAllInspirationMutation = useMutation(() => del(`/v1/inspiration/remove/all`), {
    onSuccess: () => {
      fireToast({ content: '정보를 초기화되었습니다!' });
      removeInspirationList();
    },
    onError: (error, variable, context) => {
      console.log('err', error, variable, context);
    },
  });

  const modifyInspirationMemoMutation = useMutation(
    (modifiedMemo: { id: number; memo: string }) => post('/v1/inspiration/modify', modifiedMemo),
    {
      onSuccess: (_res, req) => {
        fireToast({ content: '메모가 수정되었습니다!' });
        resetInspirationItem(req.id);
      },
      onError: (error, variable, context) => {
        console.log('err', error, variable, context);
      },
    }
  );

  const addInspirationTagMutation = useMutation(
    (addTag: { id: number; tagId: number }) => post('/v1/inspiration/tag', addTag),
    {
      onSuccess: (_res, req) => {
        fireToast({ content: '태그를 추가했습니다!' });
        resetInspirationItem(req.id);
      },
      onError: (error, variable, context) => {
        console.log('err', error, variable, context);
      },
    }
  );

  const deleteInspirationTagMutation = useMutation(
    ({ id, tagId }: { id: number; tagId: number }) => del(`/v1/inspiration/untag/${id}/${tagId}`),
    {
      onSuccess: (_res, req) => {
        fireToast({ content: '태그를 삭제했습니다!' });
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
     * 유저의 모든 영감을 삭제합니다.
     * deleteInspiration(id: number);
     */
    deleteAllInspiration: deleteAllInspirationMutation.mutate,

    /**
     * 영감 메모를 수정합니다.
     * modifyInspiration({id: number, memo: string})
     */
    modifyInspiration: modifyInspirationMemoMutation.mutate,

    /**
     * 영감에 태그를 추가합니다.
     * addInspirationTag({id: number, tagId: number})
     */
    addInspirationTag: addInspirationTagMutation.mutate,

    /**
     * 영감에 태그를 Loading의 상태를 보여줍니다.
     */
    addInspirationTagIsLoading: addInspirationTagMutation.isLoading,

    /**
     * 영감에 태그를 삭제합니다.
     * deleteInspirationTag({id: number, tagId: number})
     */
    deleteInspirationTag: deleteInspirationTagMutation.mutate,
  };
}
