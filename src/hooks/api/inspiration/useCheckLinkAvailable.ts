import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import useDidUpdate from '~/hooks/common/useDidUpdate';
import { get } from '~/libs/api/client';
import { useToast } from '~/store/Toast';

const INSPIRATION_LINK_OG_QUERY_KEY = 'opengraph';

interface UseCheckLinkAvailableProps {
  link: string;
}

export function useCheckLinkAvailable({ link }: UseCheckLinkAvailableProps) {
  const { fireToast } = useToast();

  const {
    data: openGraph,
    refetch,
    remove,
    isFetching,
  } = useQuery<OpenGraphResponse, { message?: string }>(
    [INSPIRATION_LINK_OG_QUERY_KEY, link],
    () => fetchOpenGraph(link).then(res => res.data),
    {
      enabled: false,
      keepPreviousData: true,
      onError: error => {
        if (error) {
          fireToast({
            content: '서버에서 에러가 발생했습니다. 링크를 확인해주세요.',
            duration: 2500,
          });
        }
      },
    }
  );

  // NOTE: 모든 프로토콜로 확인이 끝났을 때
  const [isCheckingLinkWithAllProtocol, setIsCheckingLinkWithAllProtocol] =
    useState<boolean>(false);

  // NOTE: 각 프로토콜별 실행 유무
  const isFetchedWith = useRef({
    pure: false,
    https: false,
    http: false,
  });

  // NOTE: 링크가 변경될 시 실행 유무 초기화
  useDidUpdate(() => {
    isFetchedWith.current.pure = false;
    isFetchedWith.current.https = false;
    isFetchedWith.current.http = false;
    setIsCheckingLinkWithAllProtocol(false);
  }, [link]);

  const getLinkWithProtocol = (link: string) => {
    // NOTE: 1순위 사용자가 입력한 형태로 요청
    if (isFetchedWith.current.pure === false) {
      isFetchedWith.current.pure = true;
      return link;
    }
    // NOTE: 2순위 https로 시작하지 않는다면 https://와 함께 요청
    if (isFetchedWith.current.https === false && link.startsWith('https') === false) {
      isFetchedWith.current.https = true;
      return `https://${link}`;
    }
    // NOTE: 3순위 http로 시작하지 않는다면 http://와 함께 요청
    if (isFetchedWith.current.http === false && link.startsWith('http') === false) {
      isFetchedWith.current.http = true;
      return `http://${link}`;
    }
  };

  const fetchOpenGraph = (link: string): Promise<AxiosResponse<OpenGraphResponse>> => {
    const linkWithProtocol = getLinkWithProtocol(link);
    return get(`/v1/inspiration/link/availiable?link=${linkWithProtocol}`);
  };

  useDidUpdate(() => {
    if (!openGraph) return;

    // NOTE: openGraph가 재시도되면서 url 값이 있을 시 종료
    if (openGraph.url) {
      setIsCheckingLinkWithAllProtocol(true);
      return;
    }

    // NOTE: 세 방법 중 하나라도 시도해보지 않았다면 재시도
    if (
      isFetchedWith.current.pure === false ||
      isFetchedWith.current.https === false ||
      isFetchedWith.current.http === false
    ) {
      remove();
      refetch();
      return;
    }

    // NOTE: 모두 재시도하였을 때
    setIsCheckingLinkWithAllProtocol(true);
  }, [openGraph]);

  return {
    openGraph,
    refetch,
    isFetching,
    isCheckingLinkWithAllProtocol,
  };
}
