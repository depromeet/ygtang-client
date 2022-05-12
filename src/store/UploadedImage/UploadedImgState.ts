import { atom } from 'recoil';

export const uploadedImgState = atom<string | null>({
  key: 'uploadedImgState',
  default: null,
});
