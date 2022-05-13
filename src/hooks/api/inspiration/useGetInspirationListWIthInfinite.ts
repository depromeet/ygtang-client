import { flatten } from 'lodash';
import { useInfiniteQuery } from 'react-query';

import { get, post } from '~/libs/api/client';

interface InspirationListResponseInterface {
  message: string;
  data: InspirationResponseInterface;
}

interface InspirationResponseInterface extends PaginationInterface {
  content: InspirationInterface[];
}

// TODO: 추가, 삭제, 수정 등 Mutation과 맞추기
export const INSPIRATION_LIST_QUERY_KEY = 'inspirationList';

interface UseGetInspirationListWithInfiniteProps {
  filteredTags: TagType[];
}

export default function useGetInspirationListWithInfinite({
  filteredTags,
}: UseGetInspirationListWithInfiniteProps) {
  const fetchInsipirations = (page: number = 0) => {
    if (filteredTags.length > 0)
      return post<InspirationListResponseInterface>(
        `/v1/inspiration/tag/?size=20&page=${page}&sort=updatedDateTime,desc`,
        [...filteredTags.map(eachTag => eachTag.id)]
      );
    return get<InspirationListResponseInterface>(
      `/v1/inspiration/list?size=20&page=${page}&sort=updatedDateTime,desc`
    );
  };

  const query = useInfiniteQuery<InspirationListResponseInterface>(
    [INSPIRATION_LIST_QUERY_KEY, ...filteredTags],
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
