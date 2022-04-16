import { useCallback } from 'react';

type MessageAction = 'TestAction';

export interface AppMessageData {
  action: MessageAction;
  data: any;
}

export function useAppMessage() {
  const listener = useCallback(({ data: rawData }: MessageEvent) => {
    const { action, data } = JSON.parse(rawData) as AppMessageData;
    switch (action) {
      case 'TestAction':
        console.log('[TEST] TestAction을 받았어요!!');
        console.log('data: ', data);
        break;
      default:
        throw Error('정의되지 않은 action 입니다.');
    }
  }, []);

  const startListening = () => {
    if (window.ReactNativeWebView) {
      // TODO: MessageEvent 타입 호환 안되는 문제 찾아보기
      document.addEventListener('message', listener as ({}: Event) => {}); // android
      window.addEventListener('message', listener); // ios
    }
  };

  const stopListening = () => {
    if (window.ReactNativeWebView) {
      // TODO: MessageEvent 타입 호환 안되는 문제 찾아보기
      document.removeEventListener('message', listener as ({}: Event) => {}); // android
      window.removeEventListener('message', listener); // ios
    }
  };

  return {
    startListening,
    stopListening,
  };
}
