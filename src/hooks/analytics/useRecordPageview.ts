import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { IS_PRODUCTION } from '~/constants/common';
import { gaPageview } from '~/libs/ga';
import { mixpanelTrack } from '~/libs/mixpanel';

export function useRecordPageview() {
  const router = useRouter();

  useEffect(() => {
    const recordPageview = (url: string) => {
      gaPageview(url);
      mixpanelTrack('Page view', { url });
    };

    if (IS_PRODUCTION) router.events.on('routeChangeComplete', recordPageview);
    return () => {
      if (IS_PRODUCTION) router.events.off('routeChangeComplete', recordPageview);
    };
  }, [router.events]);
}
