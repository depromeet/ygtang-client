import { useMemo } from 'react';
import flatten from 'lodash/flatten';
import { useQuery } from 'react-query';

import { get, post } from '~/libs/api/client';
import { useCalendarFilter } from '~/store/CalendarFilter';
import { useFilteredTags } from '~/store/FilteredTags';
import { useInspirationKindFilter } from '~/store/InspirationKindFilter/useInspirationKindFilter';

import { getCalendarFilterQuery, getInspirationTypeQuery } from './utils';

// Note: 추가 api 변경 가능성이 있어 useGetInspirationListWithInfinite interface와 분리
interface InspirationListResponseInterface {
  message: string;
  data: InspirationResponseInterface;
}

interface InspirationResponseInterface extends PaginationInterface {
  content: InspirationInterface[];
}

const ALL_SIZE = 99999;
const ALL_INSPIRATION_QUERY_KEY = 'allInspiration';

interface UseGetAllInspirationsProps {
  /**
   * useQuery의 enabled option에 사용됩니다.
   */
  enabled?: boolean;
}

/**
 * 필터링 조건을 위해 최대 99999개의 영감을 조회합니다.
 * 렌더링에 사용되면 안됩니다.
 */
export default function useGetAllInspirations({ enabled = true }: UseGetAllInspirationsProps) {
  const { filteredTags } = useFilteredTags({});
  const filteredTagIds = useMemo(
    () => [...filteredTags.map(eachTag => eachTag.id)],
    [filteredTags]
  );

  const { inspirationKindFilter } = useInspirationKindFilter();
  const { calendarFilter } = useCalendarFilter();

  const fetchAllInsipirations = () => {
    if (filteredTags.length > 0 || inspirationKindFilter !== null || calendarFilter[1] !== null) {
      const kindQuery = getInspirationTypeQuery(inspirationKindFilter);
      const calendarQuery = getCalendarFilterQuery(calendarFilter);

      return post<InspirationListResponseInterface>(
        `/v1/inspiration/tag/?size=${ALL_SIZE}&page=0&sort=createdDateTime,desc${kindQuery}${calendarQuery}`,
        filteredTagIds
      );
    }

    return get<InspirationListResponseInterface>(
      `/v1/inspiration/list?size=${ALL_SIZE}&page=0&sort=createdDateTime,desc`
    );
  };

  const query = useQuery(
    [ALL_INSPIRATION_QUERY_KEY, ...filteredTagIds, inspirationKindFilter, ...calendarFilter],
    fetchAllInsipirations,
    { enabled }
  );

  const inspirations = query.data ? flatten(query.data.data.content) : [];

  return { inspirations, ...query };
}
