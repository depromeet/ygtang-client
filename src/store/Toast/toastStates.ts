import { atom } from 'recoil';

export interface ToastInterface {
  key?: string;
  content: string;
  duration?: number;
}

export const toastMessageState = atom<ToastInterface | null>({
  key: 'toastMessageState',
  default: null,
});
