import { useRecoilState } from 'recoil';

import { uploadedImgState } from './UploadedImgState';

export interface UploadedImg {
  blob: Blob;
  base64: string;
}

export function useUploadedImg() {
  const [uploadedImg, setUploadedImg] = useRecoilState<null | UploadedImg>(uploadedImgState);

  const uploadImg = ({ blob, base64 }: UploadedImg) => {
    setUploadedImg({ blob, base64 });
  };

  const resetImg = () => {
    setUploadedImg(null);
  };

  return { uploadedImg, uploadImg, resetImg };
}
