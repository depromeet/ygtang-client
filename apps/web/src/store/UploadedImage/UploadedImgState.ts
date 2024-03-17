import { atom } from 'recoil';

import { UploadedImg } from './useUploadedImg';

export const uploadedImgState = atom<UploadedImg | null>({
  key: 'uploadedImgState',
  default: null,
});
