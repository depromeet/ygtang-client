import { useRef } from 'react';

import useInternalRouter from '~/hooks/common/useInternalRouter';
import { useUploadedImg } from '~/store/UploadedImage';

export interface UseImgUploadType {
  isUploadPage?: boolean;
}

export default function useImgUpload({ isUploadPage = true }: UseImgUploadType) {
  const imgInputRef = useRef<HTMLInputElement>(null);
  const { uploadImg } = useUploadedImg();
  const { push } = useInternalRouter();

  const openFileInput = () => {
    if (!imgInputRef.current) return;
    imgInputRef.current.click();
  };

  const imgInputUploader = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target;

    const getBase64 = (file: Blob, onload: (file: unknown) => void) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => onload(reader.result);
      reader.onerror = error => console.log(error);
    };

    if (files) {
      getBase64(files[0], result => {
        if (typeof result === 'string') {
          uploadImg(result);
          !isUploadPage && push('/add/image');
        }
      });
    }
  };

  return {
    imgInputRef,
    openFileInput,
    imgInputUploader,
  };
}
