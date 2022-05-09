import { useMutation, useQuery, useQueryClient } from 'react-query';

import { del, get, post } from '~/libs/api/client';

// TODO: 서버 스펙 확인 후 수정
interface TagResponseInterface {
  message: string;
  data: {
    tagResponse: TagInterface[];
  };
}

// TODO: constants로 묶어서 관리?
const TAG_LIST_QUERY_KEY = 'tags';

export default function useTagQuery() {
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries([TAG_LIST_QUERY_KEY]);
  };

  // NOTE: useInfiniteQuery 사용?
  const query = useQuery<TagResponseInterface>('/api/v1/tag/list', () =>
    get<TagResponseInterface>('/api/v1/tag/list')
  );

  // TODO: 제너릭 타입 설정
  const createTagMutation = useMutation((content: string) => post('/api/v1/tag/add', { content }), {
    onSuccess: () => {
      refresh();
    },
  });

  // TODO: 제너릭 타입 설정
  const deleteTagMutation = useMutation((id: number) => del(`/api/v1/tag/remove/${id}`), {
    onSuccess: () => {
      refresh();
    },
  });

  return { query, createTag: createTagMutation.mutate, deleteTag: deleteTagMutation.mutate };
}
