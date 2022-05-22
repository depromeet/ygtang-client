import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { get } from '~/libs/api/client';

export const INSPIRATION_BY_ID_QUERY_KEY = 'inspirationById';

export const fetchInspirationById = (
  id: string | undefined
): Promise<AxiosResponse<InspirationInterface>> => {
  return get(`/v1/inspiration/${id}`);
};

export function useInspirationById({ inspirationId }: { inspirationId: string | undefined }) {
  const { data: inspiration, isLoading } = useQuery(
    [INSPIRATION_BY_ID_QUERY_KEY, inspirationId],
    () => fetchInspirationById(inspirationId).then(res => res.data),
    { enabled: Boolean(inspirationId) }
  );

  return { inspiration, isLoading };
}
