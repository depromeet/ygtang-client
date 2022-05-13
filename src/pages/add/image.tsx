import { useEffect } from 'react';
import { css } from '@emotion/react';

import { ImgUploader } from '~/components/add/ImgUploader';
import { CTAButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import ImageContent from '~/components/common/ImageContent';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';
import useInspirationMutation, {
  InspirationMutationRequest,
} from '~/hooks/api/inspiration/useInspirationMutation';
import useImgUpload from '~/hooks/common/useImgUpload';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { useUploadedImg } from '~/store/UploadedImage';

export default function AddImage() {
  const { imgInputRef, openFileInput, imgInputUploader } = useImgUpload({});
  const { push } = useInternalRouter();
  const { uploadedImg } = useUploadedImg();
  const { createInspiration } = useInspirationMutation();

  useEffect(() => {
    if (!uploadedImg) push('/');
  }, [uploadedImg, push]);

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

      <form onSubmit={submitImg} css={formCss}>
        <ImgUploader imgInputUploader={imgInputUploader} ref={imgInputRef} />
        <section css={addImageTopCss}>
          <div css={contentWrapperCss}>
            {<ImageContent clickXbtn={openFileInput} src={uploadedImg} alt="uploadedImg" />}
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
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
`;

const formCss = css`
  height: calc(var(--vh, 1vh) * 100 - 44px);
  display: flex;
  flex-direction: column;
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
