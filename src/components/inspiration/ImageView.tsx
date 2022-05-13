import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import { ImgUploader } from '~/components/add/ImgUploader';
import { CTAButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import ImageContent from '~/components/common/ImageContent';
import { MemoText } from '~/components/common/TextField';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useImgUpload from '~/hooks/common/useImgUpload';
import useInput from '~/hooks/common/useInput';
import { useInspirationDetail } from '~/store/Inspiration';
import { useUploadedImg } from '~/store/UploadedImage';

const AddTagFormRouteAsModal = dynamic(() => import('~/components/add/AddTagFormRouteAsModal'));

export default function ImageView() {
  const { inspirationDetail } = useInspirationDetail();

  const {
    onChange: onMemoChange,
    debouncedValue: memoDebouncedValue,
    value: memoValue,
  } = useInput({ useDebounce: true });
  const { imgInputRef, openFileInput, imgInputUploader } = useImgUpload({});
  const { uploadedImg } = useUploadedImg();
  const { createInspiration } = useInspirationMutation();

  const submitImg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!uploadedImg) return;
    const tagIds = tags.map(tag => tag.id);
    const imgData = new FormData();
    imgData.append('file', uploadedImg.blob);
    imgData.append('memo', memoValue);
    imgData.append('type', 'IMAGE');
    imgData.append('tagIds', tagIds.toString());

    createInspiration(imgData);
  };

  if (!inspirationDetail) return <></>;

  const { tags, content } = inspirationDetail;

  return (
    <>
      <article css={addImageCss}>
        <form onSubmit={submitImg} css={formCss}>
          <ImgUploader imgInputUploader={imgInputUploader} ref={imgInputRef} />
          <section css={addImageTopCss}>
            <div css={contentWrapperCss}>
              {<ImageContent clickXbtn={openFileInput} src={content ?? null} alt="uploadedImg" />}
            </div>
            <div css={contentWrapperCss}>
              <TagContent tags={tags} />
            </div>
            <div css={contentWrapperCss}>
              <MemoText
                writable
                onChange={onMemoChange}
                debouncedValue={memoDebouncedValue}
                value={memoValue}
              />
            </div>
          </section>

          <section css={addImageBottomCss}>
            <CTAButton type="submit">Tang!</CTAButton>
          </section>
        </form>
      </article>
      <AddTagFormRouteAsModal />
    </>
  );
}

const addImageCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 44px);
  overflow: hidden;
`;

export const formCss = css`
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
