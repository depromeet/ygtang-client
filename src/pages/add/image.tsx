import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import { ImgUploader } from '~/components/add/ImgUploader';
import { CTAButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import ImageContent from '~/components/common/ImageContent';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useImgUpload from '~/hooks/common/useImgUpload';
import useInput from '~/hooks/common/useInput';
import useInternalRouter from '~/hooks/common/useInternalRouter';
import { useAppliedTags } from '~/store/AppliedTags';
import { useUploadedImg } from '~/store/UploadedImage';

const AddTagFormRouteAsModal = dynamic(() => import('~/components/add/AddTagFormRouteAsModal'));

export default function AddImage() {
  const {
    onChange: onMemoChange,
    debouncedValue: memoDebouncedValue,
    value: memoValue,
  } = useInput({ useDebounce: true });
  const { imgInputRef, openFileInput, imgInputUploader } = useImgUpload({});
  const { push } = useInternalRouter();
  const { uploadedImg } = useUploadedImg();
  const { createInspiration } = useInspirationMutation();

  useEffect(() => {
    if (!uploadedImg) push('/');
  }, [uploadedImg, push]);

  const { tags } = useAppliedTags(true);

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

  return (
    <>
      <article css={addImageCss}>
        <NavigationBar title="이미지 추가" />

        <form onSubmit={submitImg} css={formCss}>
          <ImgUploader imgInputUploader={imgInputUploader} ref={imgInputRef} />
          <section css={addImageTopCss}>
            <div css={contentWrapperCss}>
              {
                <ImageContent
                  clickXbtn={openFileInput}
                  src={uploadedImg?.base64 ?? null}
                  alt="uploadedImg"
                />
              }
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
  height: calc(var(--vh, 1vh) * 100);
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
