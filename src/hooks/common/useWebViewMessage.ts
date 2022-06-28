import { useUserAgent } from '~/hooks/common/useUserAgent';

export function useWebViewMessage() {
  const { isAndroid, isIos, isMobile } = useUserAgent();

  const postMessage = (type: string, data?: any) => {
    if (!isAndroid() && !isIos() && !isMobile()) return;
    if (!window.ReactNativeWebView) return;
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, data }));
  };

  return { postMessage };
}
