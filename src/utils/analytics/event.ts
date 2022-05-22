import { track } from 'mixpanel-browser';

import { gaEvent } from '~/libs/ga';

export function recordEvent([{ action, category, label, value }]: Parameters<typeof gaEvent>) {
  gaEvent({ action, category, label, value });
  track(action);
}
