import { IS_PRODUCTION } from '~/constants/common';
import { gaEvent } from '~/libs/ga';
import { mixpanelTrack } from '~/libs/mixpanel';

type GaEventProps = Parameters<typeof gaEvent>[0];
type Props = Omit<GaEventProps, 'category'>;

export function recordEvent({ action, label, value }: Props) {
  if (!IS_PRODUCTION) return;
  gaEvent({ action, category: process.env.WEB_VERSION, label, value });
  mixpanelTrack(action, { category: process.env.WEB_VERSION, label, value });
}
