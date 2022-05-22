import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import { ImgUploader } from '~/components/add/ImgUploader';
import TagContent from '~/components/common/Content/TagContent';
import ImageContent from '~/components/common/ImageContent';
import { MemoText } from '~/components/common/TextField';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useImgUpload from '~/hooks/common/useImgUpload';
import useInput from '~/hooks/common/useInput';
import { useUploadedImg } from '~/store/UploadedImage';
import { fullViewHeight } from '~/styles/utils';

const AddTagFormRouteAsModal = dynamic(() => import('~/components/add/AddTagFormRouteAsModal'));

export default function ImageView({ inspiration }: { inspiration: InspirationInterface }) {
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
    const tagIds = tagResponses.map(tag => tag.id);
    const imgData = new FormData();
    imgData.append('file', uploadedImg.blob);
    imgData.append('memo', memoValue);
    imgData.append('type', 'IMAGE');
    imgData.append('tagIds', tagIds.toString());

    createInspiration(imgData);
  };

  if (!inspiration) return <></>;

  const { tagResponses, content, memo } = inspiration;

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
              <TagContent tags={tagResponses} />
            </div>
            <div css={contentWrapperCss}>
              <MemoText
                editable
                onChange={onMemoChange}
                debouncedValue={memoDebouncedValue}
                value={memo}
              />
            </div>
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
  height: calc(${fullViewHeight()} - 44px);
  overflow: hidden;
`;

export const formCss = css`
  height: calc(${fullViewHeight()} - 44px);
  display: flex;
  flex-direction: column;
`;

const addImageTopCss = css`
  flex-grow: 1;
  overflow-y: auto;
`;

const contentWrapperCss = css`
  padding: 16px 0;
`;
