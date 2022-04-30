import { css } from '@emotion/react';

import ImageContent from '~/components/common/ImageContent';

export default function AddImage() {
  return (
    <article css={addImageCss}>
      <ImageContent
        src="https://i.pinimg.com/564x/89/c5/4d/89c54d90c325a8c310363f4e9773a041.jpg"
        alt="mock"
      />
    </article>
  );
}

const addImageCss = css``;
