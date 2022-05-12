import { flatten } from 'lodash';
import { useInfiniteQuery } from 'react-query';

import { get } from '~/libs/api/client';

interface InspirationListResponseInterface {
  message: string;
  data: InspirationResponseInterface;
}

interface InspirationResponseInterface extends PaginationInterface {
  content: InspirationInterface[];
}

const INSPIRATION_LIST_QUERY_KEY = 'inspirationList';

export default function useGetInspirationListWithInfinite() {
  const fetchInsipirations = (page: number = 0) => {
    return get<InspirationListResponseInterface>(`/v1/inspiration/list?size=20&page=${page}`);
  };

  const query = useInfiniteQuery<InspirationListResponseInterface>(
    [INSPIRATION_LIST_QUERY_KEY],
    async ({ pageParam = 0 }) => await fetchInsipirations(pageParam),
    {
      getNextPageParam: lastPage => {
        if (lastPage.data.last) return undefined;
        return lastPage.data.number + 1 ?? undefined;
      },
      getPreviousPageParam: firstPage => {
        if (firstPage.data.first) return undefined;
        return firstPage.data.number - 1 ?? undefined;
      },
    }
  );

  return {
    inspirations: query.data ? flatten(query.data.pages.map(page => page.data.content)) : [],
    ...query,
  };
}
