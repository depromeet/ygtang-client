import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { get } from '~/libs/api/client';

interface UseCheckLinkAvailable {
  link: string;
}

export function useCheckLinkAvailable({ link }: UseCheckLinkAvailable) {
  const INSPIRATION_LINK_OG_QUERY_KEY = 'opengraph';

  const getLinkWithProtocol = (link: string) => {
    if (link.startsWith('http')) return link;
    return `http://${link}`;
  };

  const fetchOpenGraph = (link: string): Promise<AxiosResponse<OpenGraphResponse>> => {
    const linkWithProtocol = getLinkWithProtocol(link);
    return get(`/v1/inspiration/link/availiable?link=${linkWithProtocol}`);
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
