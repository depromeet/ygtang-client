import { mixpanelTrack, setMixpanelIdentify } from './mixpanel';

describe('libs/mixpanel/mixpanel', () => {
  const mixpanelTrackSpy = jest.fn();
  const mixpanelIdentifySpy = jest.fn();

  const setWindowMixpanelWithSpy = () => {
    Object.assign(window, { mixpanel: { track: mixpanelTrackSpy, identify: mixpanelIdentifySpy } });
  };

  const setWindowMixpanelToUndefined = () => {
    Object.assign(window, { mixpanel: undefined });
  };

  describe('window에 mixpanel이 없을 시', () => {
    beforeEach(() => {
      setWindowMixpanelToUndefined();
    });

    it('window.mixpanel.track이 호출되지 않음', () => {
      mixpanelTrack('test', { test: 'test' });
      expect(mixpanelTrackSpy).not.toHaveBeenCalled();
    });

    it('window.mixpanel.identify가 호출되지 않음', () => {
      setMixpanelIdentify('test');
      expect(mixpanelIdentifySpy).not.toHaveBeenCalled();
    });
  });

  describe('window에 mixpanel이 있을 시', () => {
    beforeEach(() => {
      setWindowMixpanelWithSpy();
    });

    it('window.mixpanel.track이 호출됨', () => {
      setWindowMixpanelWithSpy();
      mixpanelTrack('test', { test: 'test' });
      expect(mixpanelTrackSpy).toHaveBeenCalled();
      expect(mixpanelTrackSpy).toHaveBeenCalledWith('test', [{ test: 'test' }]);
    });

    it('mixpanel.identify가 호출됨', () => {
      setMixpanelIdentify('test');
      expect(mixpanelIdentifySpy).toHaveBeenCalled();
      expect(mixpanelIdentifySpy).toHaveBeenCalledWith('test');
    });
  });
});
