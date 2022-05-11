import { useQuery } from 'react-query';

import { get } from '~/libs/api/client';

import { TAG_LIST_QUERY_KEY } from './useTagRefresh';

interface TagResponseInterface {
  message: string;
  data: TagDataResponseInterface;
}

interface TagDataResponseInterface extends PaginationInterface {
  content: TagInterface[];
}

interface UseGetTagWithPaginationProps {
  pageNumber?: number;
}

export default function useGetTagWithPagination({ pageNumber = 1 }: UseGetTagWithPaginationProps) {
  const fetchTags = (pageNumber: number = 1) =>
    get<TagResponseInterface>(
      `/v1/tag/list?paged=true&offset=20&pageSize=20&pageNumber=${pageNumber}`
    );

  const query = useQuery<TagResponseInterface>(
    [TAG_LIST_QUERY_KEY, pageNumber],
    () => fetchTags(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  return { query, tags: query.data ? query.data.data.content : [], isLoading: query.isLoading };
}
