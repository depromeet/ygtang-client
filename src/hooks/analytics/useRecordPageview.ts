import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { track } from 'mixpanel-browser';

import { gaPageview } from '~/libs/ga';

export function useRecordPageview() {
  const router = useRouter();

  useEffect(() => {
    const recordPageview = (url: string) => {
      gaPageview(url);
      track('Pageview', { url });
    };

    router.events.on('routeChangeComplete', recordPageview);
    return () => {
      router.events.off('routeChangeComplete', recordPageview);
    };
  }, [router.events]);
}
