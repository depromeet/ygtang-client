import { useEffect } from 'react';

import useDidMount from './useDidMount';
import { useUserAgent } from './useUserAgent';

const SHARE_EXTENTION_MESSAGE_TYPE = 'YgtangAppShareData';
const SHARE_WEB_MESSAGE_STATE = 'YgtangWebShareState';

// NOTE:  webview의 onLoad, onLoadEnd, onProgress progress===1 모두 도전했지만 타이밍 맞추는 것에 실패했습니다.
//        따라서 handshake 방법을 차용하였습니다.
//        Native가 WebView를 엽니다.
//        WebView useDidMount가 되었을 경우,
//          { type: SHARE_WEB_MESSAGE_STATE, data: 'READY' }을 Native로 보냅니다.
//          ios | android에 맞는 target에 evnet를 달아줍니다.
//        Native는 { type: SHARE_WEB_MESSAGE_STATE, data: 'READY' }를 받아 공유할 데이터를 쏘아줍니다.
//        WebView는 setStateHandler로 데이터를 넘겨줍니다.

export function useDataShareMessage(setStateHandler: (data: string) => void) {
  const { isAndroid, isIos, isMobile } = useUserAgent();

  // NOTE : document.addEventListener('message', handleMessage)에 event type 중 MessageEvent 존재하지 않아 선대처합니다.
  const handleMessage = (event: MessageEvent | any) => {
    const data = JSON.parse(event.data);
    if (data.type !== SHARE_EXTENTION_MESSAGE_TYPE) return;
    setStateHandler(data.data);
  };

  useDidMount(() => {
    if (!isAndroid() && !isIos() && !isMobile()) return;
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: SHARE_WEB_MESSAGE_STATE, data: 'READY' })
    );
  });

  useEffect(() => {
    if (!isAndroid() && !isIos() && !isMobile()) return;
    const target = isIos() ? window : document;
    target.addEventListener('message', handleMessage);

    return () => {
      target.removeEventListener('message', handleMessage);
    };
  });
}
