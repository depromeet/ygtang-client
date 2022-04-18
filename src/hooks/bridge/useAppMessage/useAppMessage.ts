import { useCallback } from 'react';

export interface AppMessageData {
  action: string;
  data: any;
}

export interface AppMessageArgs {
  handler: (action: string, data?: any) => void;
}

export function useAppMessage({ handler }: AppMessageArgs) {
  const listener = useCallback(
    ({ data: rawData }: MessageEvent) => {
      if (handler) {
        const { action, data } = JSON.parse(rawData) as AppMessageData;
        handler(action, data);
      }
    },
    [handler]
  );

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
