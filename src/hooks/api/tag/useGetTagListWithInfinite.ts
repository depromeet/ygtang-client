import flatten from 'lodash/flatten';
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

interface Props {
  /**
   * 검색을 위한 props 입니다.
   * 선언하지 않거나, 길이가 0일 때 전체 List 조회됩니다.
   */
  keyword?: string;
  /**
   * 정확히 일치하는 검색 API 사용 여부입니다.
   * @default false
   * false일 시 유사한 검색 API가 사용됩니다.
   */
  isExactlySame?: boolean;
}

export default function useGetTagListWithInfinite({ keyword, isExactlySame = false }: Props) {
  const fetchTags = (page: number = 0) => {
    if (keyword && keyword.length > 0) {
      if (isExactlySame)
        return get<TagResponseInterface>(`/v1/tag/search/${keyword}?size=1&page=0`);
      // 유사한 검색 API
      return get<TagResponseInterface>(`/v1/tag/index/${keyword}?size=20&page=${page}`);
    }
    // 전체 Get API
    return get<TagResponseInterface>(`/v1/tag/list?size=20&page=${page}`);
  };

  const query = useInfiniteQuery<TagResponseInterface>(
    [TAG_LIST_QUERY_KEY, keyword, isExactlySame],
    async ({ pageParam = 0 }) => await fetchTags(pageParam),
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
    tags: query.data ? flatten(query.data.pages.map(page => page.data.content)) : [],
    ...query,
  };
}
