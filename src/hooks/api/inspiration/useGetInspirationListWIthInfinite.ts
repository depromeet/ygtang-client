import { useMemo } from 'react';
import { flatten } from 'lodash';
import { useInfiniteQuery } from 'react-query';

import { get, post } from '~/libs/api/client';
import { useCalendarFilter } from '~/store/CalendarFilter';
import { CalendarFilterType } from '~/store/CalendarFilter/calendarFilter';
import { InspirationKindFilterType } from '~/store/InspirationKindFilter/inpirationKindFilter';
import { useInspirationKindFilter } from '~/store/InspirationKindFilter/useInspirationKindFilter';

interface InspirationListResponseInterface {
  message: string;
  data: InspirationResponseInterface;
}

interface InspirationResponseInterface extends PaginationInterface {
  content: InspirationInterface[];
}

const INFINITE_SCROLL_SIZE = 12;

// TODO: 추가, 삭제, 수정 등 Mutation과 맞추기
export const INSPIRATION_LIST_QUERY_KEY = 'inspirationList';

interface UseGetInspirationListWithInfiniteProps {
  filteredTags: TagType[];
}

export default function useGetInspirationListWithInfinite({
  filteredTags,
}: UseGetInspirationListWithInfiniteProps) {
  const filteredTagIds = useMemo(
    () => [...filteredTags.map(eachTag => eachTag.id)],
    [filteredTags]
  );

  const { inspirationKindFilter } = useInspirationKindFilter();
  const { calendarFilter } = useCalendarFilter();

  const fetchInsipirations = (page: number = 0) => {
    if (filteredTags.length > 0 || inspirationKindFilter !== null || calendarFilter[1] !== null) {
      const kindQuery = getInspirationTypeQuery(inspirationKindFilter);
      const calendarQuery = getCalendarFilterQuery(calendarFilter);

      return post<InspirationListResponseInterface>(
        `/v1/inspiration/tag/?size=${INFINITE_SCROLL_SIZE}&page=${page}&sort=createdDateTime,desc${kindQuery}${calendarQuery}`,
        filteredTagIds
      );
    }

    return get<InspirationListResponseInterface>(
      `/v1/inspiration/list?size=${INFINITE_SCROLL_SIZE}&page=${page}&sort=createdDateTime,desc`
    );
  };

  const query = useInfiniteQuery<InspirationListResponseInterface>(
    [INSPIRATION_LIST_QUERY_KEY, ...filteredTagIds, inspirationKindFilter, ...calendarFilter],
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

  const inspirations = query.data ? flatten(query.data.pages.map(page => page.data.content)) : [];
  const isEmpty = inspirations.length === 0;

  return {
    inspirations,
    isEmpty,
    ...query,
  };
}

function getInspirationTypeQuery(type: InspirationKindFilterType) {
  if (type === null) return '';

  return `&types=${type}`;
}

function getCalendarFilterQuery(date: CalendarFilterType) {
  if (date[0] === null || date[1] === null) {
    return '';
  }

  const fromDate = date[0].toISOString().slice(0, -5);
  const toDate = date[1].toISOString().slice(0, -5);

  return `&createdDateTimeFrom=${fromDate}&createdDateTimeTo=${toDate}`;
}
