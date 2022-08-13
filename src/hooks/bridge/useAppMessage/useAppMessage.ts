import { useCallback } from 'react';

const WEBVIEW_MESSAGE_TYPE = {
  CREATED_INSPIRATION: 'CreatedInspiration',
  CLOSED_INSPIRATION: 'ClosedInspiration',
  SEND_TOAST_MESSAGE: 'SendToastMessage',
  SHARE_EXTENTION_MESSAGE_TYPE: 'YgtangAppShareData',
} as const;

type WebviewMessageTypeKey = keyof typeof WEBVIEW_MESSAGE_TYPE;

export interface AppMessageData {
  type: typeof WEBVIEW_MESSAGE_TYPE[WebviewMessageTypeKey];
  data: unknown;
  [key: string]: unknown;
}

export interface AppMessageArgs {
  targetType: typeof WEBVIEW_MESSAGE_TYPE[WebviewMessageTypeKey];
  handler: ({ type, data, ...rest }: AppMessageData) => void;
}

export function useAppMessage({ targetType, handler }: AppMessageArgs) {
  const listener = useCallback(
    ({ data: rawData }: MessageEvent) => {
      if (handler) {
        const { type, data, ...rest } = JSON.parse(rawData) as AppMessageData;

        // NOTE: 목표로하는 타입의 postMessage가 아닐 시 반환
        if (targetType !== type) return;
        handler({ type, data, rest });
      }
    },
    [handler, targetType]
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
