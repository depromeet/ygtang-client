import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { gaPageview } from '~/libs/ga';

export function useGaPageview() {
  const router = useRouter();

  useEffect(() => {
    const recordPageview = (url: string) => {
      gaPageview(url);
    };

    router.events.on('routeChangeComplete', recordPageview);
    return () => {
      router.events.off('routeChangeComplete', recordPageview);
    };
  }, [router.events]);
}
