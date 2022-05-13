import { useRecoilState } from 'recoil';

import { uploadedImgState } from './UploadedImgState';

export function useUploadedImg() {
  const [uploadedImg, setUploadedImg] = useRecoilState<null | string>(uploadedImgState);

  const uploadImg = (img: string) => {
    setUploadedImg(img);
  };

  const resetImg = () => {
    setUploadedImg(null);
  };

  return { uploadedImg, uploadImg, resetImg };
}
