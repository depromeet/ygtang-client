import { css } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import ImageContent from '~/components/common/ImageContent';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';

export default function AddImage() {
  return (
    <article css={addImageCss}>
      <NavigationBar title="이미지 추가" />
      <section css={addImageTopCss}>
        <div css={imgBoxCss}>
          <ImageContent
            src="https://i.pinimg.com/564x/89/c5/4d/89c54d90c325a8c310363f4e9773a041.jpg"
            alt="mock"
          />
        </div>
        <MemoText writable />
      </section>
      <section css={addImageBottomCss}>
        <CTAButton type="submit">Tang!</CTAButton>
      </section>
    </article>
  );
}

const addImageCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const addImageTopCss = css`
  flex-grow: 1;
  overflow-y: auto;
`;

const addImageBottomCss = css`
  margin: 8px 0 16px 0;
`;

const imgBoxCss = css`
  margin: 16px 0;
`;
