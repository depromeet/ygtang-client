import { gaEvent, gaPageview } from './ga';

describe('libs/ga', () => {
  let windowSpy: jest.SpyInstance;
  const gtag = jest.fn();

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');

    windowSpy.mockImplementation(() => ({
      gtag,
    }));
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should defined', () => {
    expect(gaPageview).toBeDefined();
    expect(gaEvent).toBeDefined();
  });

  it('gaPageview는 config, url과 함께 호출됩니다', () => {
    const mockUrl = '/';

    gaPageview(mockUrl);
    expect(gtag).toBeCalled();
    expect(gtag).toBeCalledWith('config', undefined, { page_path: mockUrl });
  });

  it('gaEvent는 props와 함께 event로 호출됩니다', () => {
    const mockAction = 'action';
    const mockCategory = 'category';
    const mockLabel = 'label';
    const mockValue = 'value';

    gaEvent({ action: mockAction, category: mockCategory, label: mockLabel, value: mockValue });
    expect(gtag).toBeCalled();
    expect(gtag).toBeCalledWith('event', mockAction, {
      event_category: mockCategory,
      event_label: mockLabel,
      value: mockValue,
    });
  });
});
