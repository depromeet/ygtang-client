import { renderHook } from '@testing-library/react-hooks';

import { useUserAgent } from './useUserAgent';

describe('hooks/common/useUserAgent', () => {
  const navigationUserAgentSpy = jest.spyOn(window.navigator, 'userAgent', 'get');

  const { navigator } = window;

  afterEach(() => {
    global.window.navigator = navigator;
  });

  it('정의되어 있어야함', () => {
    expect(useUserAgent).toBeDefined();
  });

  it('userAgent undefined일 시 isSSR은 true를, 이외는 false를 반환해야함', () => {
    // @ts-ignore
    delete global.window.navigator;

    const {
      result: {
        current: { isAndroid, isIos, isMobile, isSSR, isDesktop },
      },
    } = renderHook(() => useUserAgent());

    expect(isSSR()).toBeTruthy();
    expect(isIos()).not.toBeTruthy();
    expect(isMobile()).not.toBeTruthy();
    expect(isAndroid()).not.toBeTruthy();
    expect(isDesktop()).not.toBeTruthy();
  });

  it('userAgent Android 일 시 isAndroid와 isMobile은 true를, 이외는 false를 반환해야함', () => {
    navigationUserAgentSpy.mockReturnValue('Android');

    const {
      result: {
        current: { isAndroid, isIos, isMobile, isSSR, isDesktop },
      },
    } = renderHook(() => useUserAgent());

    expect(isAndroid()).toBeTruthy();
    expect(isMobile()).toBeTruthy();
    expect(isIos()).not.toBeTruthy();
    expect(isSSR()).not.toBeTruthy();
    expect(isDesktop()).not.toBeTruthy();
  });

  it('userAgent iPhone 일 시 isIos와 isMobile은 true를, 이외는 false를 반환해야함', () => {
    navigationUserAgentSpy.mockReturnValue('iPhone');

    const {
      result: {
        current: { isAndroid, isIos, isMobile, isSSR, isDesktop },
      },
    } = renderHook(() => useUserAgent());

    expect(isIos()).toBeTruthy();
    expect(isMobile()).toBeTruthy();
    expect(isAndroid()).not.toBeTruthy();
    expect(isSSR()).not.toBeTruthy();
    expect(isDesktop()).not.toBeTruthy();
  });

  it('userAgent 브라우저 값일 시 isDesktop은 true를, 이외는 false를 반환해야함', () => {
    navigationUserAgentSpy.mockReturnValue(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0'
    );

    const {
      result: {
        current: { isAndroid, isIos, isMobile, isSSR, isDesktop },
      },
    } = renderHook(() => useUserAgent());

    expect(isDesktop()).toBeTruthy();
    expect(isIos()).not.toBeTruthy();
    expect(isMobile()).not.toBeTruthy();
    expect(isAndroid()).not.toBeTruthy();
    expect(isSSR()).not.toBeTruthy();
  });
});
