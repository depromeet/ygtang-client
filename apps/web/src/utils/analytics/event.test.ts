import { gaEvent } from '~/libs/ga';
import { mixpanelTrack } from '~/libs/mixpanel';

import { recordEvent } from './event';

jest.mock('~/libs/ga');
jest.mock('~/libs/mixpanel');

const isProductionGetter = jest.fn();
jest.mock('~/constants/common', () => ({
  get IS_PRODUCTION() {
    return isProductionGetter();
  },
}));

describe('recordEvent', () => {
  const action = 'click';
  const label = 'button';
  const value = '1';

  beforeEach(() => {
    jest.resetModules();
  });

  it('should not called when not production', () => {
    isProductionGetter.mockReturnValue(false);

    recordEvent({ action, label, value });

    expect(gaEvent).not.toHaveBeenCalled();
    expect(mixpanelTrack).not.toHaveBeenCalled();
  });

  it('should called when production', () => {
    isProductionGetter.mockReturnValue(true);

    recordEvent({ action, label, value });

    expect(gaEvent).toHaveBeenCalled();
    expect(gaEvent).toHaveBeenCalled();
  });

  it('should called with correct params', () => {
    isProductionGetter.mockReturnValue(true);

    recordEvent({ action, label, value });

    expect(gaEvent).toHaveBeenCalledWith({
      action,
      category: process.env.WEB_VERSION,
      label,
      value,
    });

    expect(mixpanelTrack).toHaveBeenCalledWith(action, {
      category: process.env.WEB_VERSION,
      label,
      value,
    });
  });
});
