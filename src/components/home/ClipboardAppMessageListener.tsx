import { AppMessageListener } from '~/hooks/bridge/useAppMessage';
import { WEBVIEW_MESSAGE_TYPE } from '~/hooks/bridge/useAppMessage/useAppMessage';
import { useToast } from '~/store/Toast';
import { validator } from '~/utils/validator';

interface ClipboardAppMessageListenerProps {
  children: React.ReactNode;
}

export function ClipboardAppMessageListener({ children }: ClipboardAppMessageListenerProps) {
  const { fireToast } = useToast();

  const makeClipboardToastMessage = (clipboardData: string): string => {
    const message =
      clipboardData.length > 18 ? `${clipboardData.substring(0, 18)}...` : clipboardData;
    const isLinkType = validator({ value: clipboardData, type: 'url' });
    if (isLinkType) {
      return `복사한 링크 영감으로 추가하기`;
    }
    return `복사한 '${message}...'<br/>글 영감으로 추가하기`;
  };

  return (
    <AppMessageListener
      targetType={WEBVIEW_MESSAGE_TYPE.CLIPBOARD_INSPIRATION}
      handler={({ data }) => {
        fireToast({
          content: makeClipboardToastMessage(`${data}`),
          duration: 3000,
          clipboardConfig: {
            type: validator({ value: `${data}`, type: 'url' }) ? 'LINK' : 'TEXT',
            clipboardData: `${data}`,
          },
        });
      }}
    >
      {children}
    </AppMessageListener>
  );
}