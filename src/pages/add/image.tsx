import { css } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import ImageContent from '~/components/common/ImageContent';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';
import useInspirationMutation, {
  InspirationMutationRequest,
} from '~/hooks/api/inspiration/useInspirationMutation';
import { useUploadedImg } from '~/store/UploadedImage';

export default function AddImage() {
  const { uploadedImg } = useUploadedImg();
  const { createInspiration } = useInspirationMutation();

  const tags = [{ id: 1, content: '1111' }];

  const submitImg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uploadedImg) return;
    const imgData: InspirationMutationRequest = {
      file: uploadedImg,
      memo: 'memo~',
      tagIds: [1],
      type: 'IMAGE',
    };
    createInspiration(imgData);
  };

  return (
    <article css={addImageCss}>
      <NavigationBar title="이미지 추가" />
      <form onSubmit={submitImg}>
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
      </form>
    </article>
  );
}

const addImageCss = css`
  display: flex;
  flex-direction: column;
  height: 100%;
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
