import { useRecoilState } from 'recoil';

import { ToastInterface, toastMessageState } from './toastStates';

const DEFAULT_DURATION = 1500;

export function useToast() {
  const [currentToast, setCurrentToast] = useRecoilState(toastMessageState);

  const removeToast = (key: string) => {
    // 현재 메세지의 key와 지울 메세지의 key를 비교하여
    // 같을 시 지우지만, 다를 시 기존 메세지를 반환 (setTimeout matching)
    setCurrentToast(prev => {
      if (!prev) return null;
      if (prev.key === key) return null;
      return prev;
    });
  };

  const fireToast = ({ key = getKey(), content, duration = DEFAULT_DURATION }: ToastInterface) => {
    setCurrentToast({ key, content, duration });
    setTimeout(() => removeToast(key), duration);
  };

  return { currentToast, fireToast };
}

function getKey() {
  const date = new Date();
  return date.getTime().toString();
}
