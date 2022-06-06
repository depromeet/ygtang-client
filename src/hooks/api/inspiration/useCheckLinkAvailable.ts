import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { get } from '~/libs/api/client';

interface UseCheckLinkAvailable {
  link: string;
}

export function useCheckLinkAvailable({ link }: UseCheckLinkAvailable) {
  const INSPIRATION_LINK_OG_QUERY_KEY = 'opengraph';

  const fetchOpenGraph = (link: string): Promise<AxiosResponse<OpenGraphResponse>> => {
    return get(`/v1/inspiration/link/availiable?link=${link}`);
  };

  const {
    data: openGraph,
    refetch,
    isFetching,
  } = useQuery<OpenGraphResponse>(
    [INSPIRATION_LINK_OG_QUERY_KEY, link],
    () => fetchOpenGraph(link).then(res => res.data),
    {
      enabled: false,
      keepPreviousData: true,
    }
  );

  return { openGraph, refetch, isFetching };
}
