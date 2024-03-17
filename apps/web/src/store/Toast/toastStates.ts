import { atom } from 'recoil';

export interface ClipboardConfig {
  type: InspirationType;
  clipboardData: string;
}
export interface ToastInterface {
  key?: string;
  content: string;
  duration?: number;
  clipboardConfig?: ClipboardConfig;
}

export const toastMessageState = atom<ToastInterface | null>({
  key: 'toastMessageState',
  default: null,
});
