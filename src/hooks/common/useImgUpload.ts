import { useRef } from 'react';

import useInternalRouter from '~/hooks/common/useInternalRouter';
import { useUploadedImg } from '~/store/UploadedImage';

export interface UseImgUploadType {
  /**
   * 이미지 영감 추가 페이지가 아닐 때 이미지 선택 후 해당 페이지로 이동합니다.
   * @default true
   */
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

  // Blob 타입의 이미지 파일을 base64 형태로 변환합니다.
  const getBase64 = (file: Blob, onload: (file: unknown) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => onload(reader.result);
    reader.onerror = error => console.log(error);
  };

  const imgInputUploader = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target;

    if (files) {
      getBase64(files[0], result => {
        if (typeof result === 'string') {
          uploadImg({ blob: files[0], base64: result });
        }
        !isUploadPage && push('/add/image');
      });
    }
  };

  return {
    /**
     * 이미지 input와 연결할 ref입니다.
     *
     * ```js
     * <ImgUploader imgInputUploader={imgInputUploader} ref={imgInputRef} />
     * ```
     */
    imgInputRef,

    /**
     * 이미지 파일 인풋 창을 엽니다.
     *
     * ```js
     * <button onClick={openFileInput} />
     * ```
     */
    openFileInput,

    /**
     * 이미지 input와 연결해서 이미지 파일을 base64로 포맷팅하고 상태로 저장하는 업로더입니다.
     *
     * ```js
     * <ImgUploader imgInputUploader={imgInputUploader} ref={imgInputRef} />
     * ```
     */
    imgInputUploader,
  };
}
