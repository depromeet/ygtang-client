import { mixpanelTrack, setMixpanelIdentify } from './index';

describe('libs/mixpanel/index', () => {
  it('mixpanelTrack이 정의되어 있어야 함', () => {
    expect(mixpanelTrack).toBeDefined();
  });

  it('setMixpanelIdentify이 정의되어 있어야 함', () => {
    expect(setMixpanelIdentify).toBeDefined();
  });
});
