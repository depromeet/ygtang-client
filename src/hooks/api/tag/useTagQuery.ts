import { useMutation, useQuery, useQueryClient } from 'react-query';

import { del, get, post } from '~/libs/api/client';

interface TagResponseInterface {
  message: string;
  data: TagDataResponseInterface;
}
interface TagDataResponseInterface extends PaginationInterface {
  content: TagInterface[];
}

// TODO: constants로 묶어서 관리?
const TAG_LIST_QUERY_KEY = 'tags';

export default function useTagQuery() {
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries([TAG_LIST_QUERY_KEY]);
  };

  // NOTE: useInfiniteQuery 사용?
  const query = useQuery<TagResponseInterface>(TAG_LIST_QUERY_KEY, () =>
    get<TagResponseInterface>('/api/v1/tag/list?offset=20&pageSize=20&pageNumber=1')
  );

  // const fetchTags = ({ pageNumber = 1 }: { pageNumber?: number }) =>
  //   get<TagResponseInterface>(`/api/v1/tag/list?offset=20&pageSize=20&pageNumber=${pageNumber}`);

  // const infiniteQuery = useInfiniteQuery('projects', () => fetchTags);

  // TODO: 제너릭 타입 설정
  const createTagMutation = useMutation((content: string) => post('/v1/tag/add', { content }), {
    onSuccess: () => {
      refresh();
    },
  });

  // TODO: 제너릭 타입 설정
  const deleteTagMutation = useMutation((id: number) => del(`/v1/tag/remove/${id}`), {
    onSuccess: () => {
      refresh();
    },
  });

  return {
    tags: query.data ? query.data.data.content : [],
    isLoading: query.isLoading,
    query,
    createTag: createTagMutation.mutate,
    deleteTag: deleteTagMutation.mutate,
  };
}
