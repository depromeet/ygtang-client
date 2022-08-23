import { useRef } from 'react';

import { AppMessageListener } from '~/hooks/bridge/useAppMessage';
import { WEBVIEW_MESSAGE_TYPE } from '~/hooks/bridge/useAppMessage/useAppMessage';
import { useToast } from '~/store/Toast';
import { validator } from '~/utils/validator';

interface ClipboardAppMessageListenerProps {
  children: React.ReactNode;
}

export function ClipboardAppMessageListener({ children }: ClipboardAppMessageListenerProps) {
  const { fireToast } = useToast();
  const prevClipboardData = useRef('');

  const makeClipboardToastMessage = (clipboardData: string): string => {
    const clipboardDataWithoutSpace = clipboardData.replace(/\n\s+/g, ' ').trim();
    const message =
      clipboardData.length > 18
        ? `${clipboardDataWithoutSpace.substring(0, 18)}...`
        : clipboardDataWithoutSpace;
    const isLinkType = validator({ value: clipboardData, type: 'exactUrl' });
    prevClipboardData.current = clipboardData;

    if (isLinkType) {
      return `복사한 링크 영감으로 추가하기`;
    }
    return `복사한 '${message}...'\n글 영감으로 추가하기`;
  };

  return (
    <AppMessageListener
      targetType={WEBVIEW_MESSAGE_TYPE.CLIPBOARD_INSPIRATION}
      handler={({ data }) => {
        if (prevClipboardData.current === data) return;

        fireToast({
          content: makeClipboardToastMessage(`${data}`),
          duration: 3000,
          clipboardConfig: {
            type: validator({ value: `${data}`, type: 'exactUrl' }) ? 'LINK' : 'TEXT',
            clipboardData: `${data}`,
          },
        });
      }}
    >
      {children}
    </AppMessageListener>
  );
}
