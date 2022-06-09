import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { track } from 'mixpanel-browser';

import { IS_PRODUCTION } from '~/constants/common';
import { gaPageview } from '~/libs/ga';

export function useRecordPageview() {
  const router = useRouter();

  useEffect(() => {
    const recordPageview = (url: string) => {
      gaPageview(url);
      track('Pageview', { url });
    };

    if (IS_PRODUCTION) router.events.on('routeChangeComplete', recordPageview);
    return () => {
      if (IS_PRODUCTION) router.events.off('routeChangeComplete', recordPageview);
    };
  }, [router.events]);
}
