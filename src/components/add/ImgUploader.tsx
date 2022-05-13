import { forwardRef } from 'react';
import { css } from '@emotion/react';

interface ImgUploaderProps {
  imgInputUploader: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImgUploader = forwardRef(
  ({ imgInputUploader }: ImgUploaderProps, imgInputRef: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        ref={imgInputRef}
        css={imgInputCss}
        onChange={imgInputUploader}
        type="file"
        accept="image/*, .jpg,.png,.bmp,.gif,.tif,.webp,.heic,.jpeg,.tiff,.heif"
      />
    );
  }
);

ImgUploader.displayName = 'ImgUploader';

const imgInputCss = css`
  display: none;
`;
