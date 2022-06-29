import { useUserAgent } from '~/hooks/common/useUserAgent';

export function useWebViewMessage() {
  const { isMobile } = useUserAgent();

  const postMessage = (type: string, data?: any) => {
    if (!isMobile()) return;
    if (!window.ReactNativeWebView) return;
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, data }));
  };

  return { postMessage };
}
