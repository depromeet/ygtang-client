import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { get } from '~/libs/api/client';

const INSPIRATION_LINK_OG_QUERY_KEY = 'opengraph';

interface UseCheckLinkAvailableProps {
  link: string;
}

// TODO: 1. 기본 요청 > 실패 시 https 요청 > 실패 시 http 요청
// TODO: 2. 바로 https 요청

export function useCheckLinkAvailable({ link }: UseCheckLinkAvailableProps) {
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

  const getLinkWithProtocol = (link: string) => {
    if (link.startsWith('http')) return link;
    return `https://${link}`;
  };

  const fetchOpenGraph = (link: string): Promise<AxiosResponse<OpenGraphResponse>> => {
    const linkWithProtocol = getLinkWithProtocol(link);
    console.log('fetch');
    return get(`/v1/inspiration/link/availiable?link=${linkWithProtocol}`);
  };

  return { openGraph, refetch, isFetching };
}
