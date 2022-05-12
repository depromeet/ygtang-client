import { css } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import ImageContent from '~/components/common/ImageContent';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';
import { useUploadedImg } from '~/store/UploadedImage';

export default function AddImage() {
  const { uploadedImg } = useUploadedImg();

  const tags = [{ id: 1, content: '1111' }];

  return (
    <article css={addImageCss}>
      <NavigationBar title="이미지 추가" />
      <section css={addImageTopCss}>
        <div css={contentWrapperCss}>
          {uploadedImg && <ImageContent src={uploadedImg} alt="uploadedImg" />}
        </div>
        <div css={contentWrapperCss}>
          <TagContent onEdit={() => {}} tags={tags} />
        </div>
        <div css={contentWrapperCss}>
          <MemoText writable />
        </div>
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

const contentWrapperCss = css`
  padding: 16px 0;
`;
