import { IS_PRODUCTION } from '~/constants/common';
import { gaEvent } from '~/libs/ga';
import { mixpanelTrack } from '~/libs/mixpanel';

export function recordEvent({ action, category, label, value }: Parameters<typeof gaEvent>[0]) {
  if (!IS_PRODUCTION) return;
  gaEvent({ action, category, label, value });
  mixpanelTrack(action, { category, label, value });
}
