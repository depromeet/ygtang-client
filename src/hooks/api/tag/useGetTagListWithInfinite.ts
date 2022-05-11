import { flatten } from 'lodash';
import { useInfiniteQuery } from 'react-query';

import { get } from '~/libs/api/client';

import { TAG_LIST_QUERY_KEY } from './useTagRefresh';

interface TagResponseInterface {
  message: string;
  data: TagDataResponseInterface;
}

interface TagDataResponseInterface extends PaginationInterface {
  content: TagInterface[];
}

export default function useGetTagListWithInfinite() {
  const fetchTags = (page: number = 0) =>
    get<TagResponseInterface>(`/v1/tag/list?size=2&page=${page}`);

  const query = useInfiniteQuery<TagResponseInterface>(
    [TAG_LIST_QUERY_KEY],
    async ({ pageParam = 0 }) => await fetchTags(pageParam),
    {
      getNextPageParam: lastPage => {
        if (lastPage.data.last) return undefined;
        return lastPage.data.number + 1 ?? undefined;
      },
    }
  );

  return {
    tags: query.data ? flatten(query.data.pages.map(page => page.data.content)) : [],
    ...query,
  };
}
