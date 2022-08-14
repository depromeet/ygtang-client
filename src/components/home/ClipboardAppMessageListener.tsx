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
      clipboardData.length > 15 ? `${clipboardData.substring(0, 15)}...` : clipboardData;
    if (validator({ value: clipboardData, type: 'url' })) {
      return `복사한 링크 영감으로 추가하기`;
    }
    return `복사한 '${message}' 글 영감으로 추가하기`;
  };

  return (
    <AppMessageListener
      targetType={WEBVIEW_MESSAGE_TYPE.CLIPBOARD_INSPIRATION}
      handler={({ data }) => {
        fireToast({ content: makeClipboardToastMessage(`${data}`), duration: 3000 });
      }}
    >
      {children}
    </AppMessageListener>
  );
}
