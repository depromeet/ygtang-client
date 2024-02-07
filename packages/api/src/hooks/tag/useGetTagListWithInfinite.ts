import { useInfiniteQuery } from "@tanstack/react-query";
import { get } from "@ygtang/http";
import flatten from "lodash/flatten";

import { PaginationInterface } from "../../types/pagination";
import { TagInterface } from "../../types/tag";
import { TAG_LIST_QUERY_KEY } from "./useTagRefresh";

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

export function useGetTagListWithInfinite({
  keyword,
  isExactlySame = false,
}: Props) {
  const fetchTags = (page = 0) => {
    if (keyword && keyword.length > 0) {
      if (isExactlySame)
        return get<TagResponseInterface>(
          `/v1/tag/search/${keyword}?size=1&page=0`,
        );
      // 유사한 검색 API
      return get<TagResponseInterface>(
        `/v1/tag/index/${keyword}?size=20&page=${page}`,
      );
    }
    // 전체 Get API
    return get<TagResponseInterface>(`/v1/tag/list?size=20&page=${page}`);
  };

  const query = useInfiniteQuery({
    queryKey: [TAG_LIST_QUERY_KEY, keyword, isExactlySame],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) => fetchTags(pageParam),
    initialPageParam: 0,
    getNextPageParam: ({ data }) => {
      if (data.data.last) return undefined;
      return data.data.number + 1 ?? undefined;
    },
    getPreviousPageParam: ({ data }) => {
      if (data.data.first) return undefined;
      return data.data.number - 1 ?? undefined;
    },
  });

  return {
    tags: query.data
      ? flatten(query.data.pages.map((page) => page.data.data.content))
      : [],
    ...query,
  };
}
