import { forwardRef } from 'react';
import { css } from '@emotion/react';

export const IMAGE_INPUT_ID = 'imageInput';

interface ImgUploaderProps {
  imgInputUploader: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImgUploader = forwardRef(
  ({ imgInputUploader }: ImgUploaderProps, imgInputRef: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        id={IMAGE_INPUT_ID}
        ref={imgInputRef}
        css={imgInputCss}
        onChange={imgInputUploader}
        type="file"
        accept="image/*, .jpg,.png,.bmp,.gif,.tif,.webp,.jpeg,.tiff,.heif"
        data-testid={IMAGE_INPUT_ID}
      />
    );
  }
);

ImgUploader.displayName = 'ImgUploader';

const imgInputCss = css`
  display: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;
