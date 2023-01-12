import { useEffect, useState } from 'react';

import { UploadedImg } from '~/store/UploadedImage/useUploadedImg';
import { base64ToBlob } from '~/utils/common';

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

interface ShareMessageEvent {
  data: string;
}

interface ShareMessageEventData {
  type: string;
  data: string;
  mimeType: string;
}

function isShareMessageEvent(arg: any): arg is ShareMessageEvent {
  if (arg.data === undefined || typeof arg.data !== 'string') return false;
  const messgaeType = JSON.parse(arg.data)?.type;
  return messgaeType ? messgaeType === SHARE_EXTENTION_MESSAGE_TYPE : false;
}

interface ImgShareMessageProps {
  type: 'IMAGE';
  setStateHandler: (data: UploadedImg) => void;
}

interface DataShareMessageProps {
  type: 'TEXT' | 'LINK';
  setStateHandler: (data: string) => void;
}

export function useDataShareMessage({
  type,
  setStateHandler,
}: ImgShareMessageProps | DataShareMessageProps) {
  const { isAndroid, isIos, isMobile } = useUserAgent();
  const [isIosShareView, setIsIosShareView] = useState(false);

  // NOTE : document.addEventListener('message', handleMessage)에 event type 중 MessageEvent 존재하지 않아 선대처합니다.
  const handleMessage = async (event: MessageEvent | unknown) => {
    if (!isShareMessageEvent(event)) return;
    const data: ShareMessageEventData = JSON.parse(event.data);

    if (type === 'IMAGE') {
      setStateHandler({ blob: await base64ToBlob(data.data, data.mimeType), base64: data.data });
    } else {
      setStateHandler(data.data);
    }
    setIsIosShareView(isIos());
  };

  const sendShareCompleteMessage = () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: SHARE_WEB_MESSAGE_STATE, data: 'SHARE_COMPLETE' })
    );
  };

  const requestCompleteMessageWhenIosShare = (otherAction: VoidFunction) => {
    if (isIosShareView) {
      sendShareCompleteMessage();
    } else {
      otherAction();
    }
  };

  useDidMount(() => {
    if (!isAndroid() && !isIos() && !isMobile()) return;
    if (!window.ReactNativeWebView) return;
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

  return {
    requestCompleteMessageWhenIosShare,
  };
}
