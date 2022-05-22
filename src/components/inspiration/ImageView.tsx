import { useState } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import TagContent from '~/components/common/Content/TagContent';
import ImageContent from '~/components/common/ImageContent';
import { MemoText } from '~/components/common/TextField';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useInput from '~/hooks/common/useInput';
import { fullViewHeight } from '~/styles/utils';

const AddTagFormRouteAsModal = dynamic(() => import('~/components/add/AddTagFormRouteAsModal'));

export default function ImageView({ inspiration }: { inspiration: InspirationInterface }) {
  const {
    onChange: onMemoChange,
    debouncedValue: memoDebouncedValue,
    value: modifiedMemo,
  } = useInput({ useDebounce: true, initialValue: inspiration.memo });
  const { modifyInspiration } = useInspirationMutation();
  const [isWriting, setWriting] = useState(false);

  const saveMemo = () => {
    if (!isWriting) return setWriting(true);
    modifyInspiration({ id: inspiration.id, memo: modifiedMemo });
    setWriting(false);
  };

  if (!inspiration) return <></>;

  const { tagResponses, content } = inspiration;

  return (
    <>
      <article css={addImageCss}>
        <form css={formCss}>
          <section css={addImageTopCss}>
            <div css={contentWrapperCss}>
              {<ImageContent src={content ?? null} alt="uploadedImg" />}
            </div>
            <div css={contentWrapperCss}>
              <TagContent tags={tagResponses} inspirationId={inspiration.id} />
            </div>
            <div css={contentWrapperCss}>
              <MemoText
                editable
                onSaveClick={saveMemo}
                onChange={onMemoChange}
                debouncedValue={memoDebouncedValue}
                value={modifiedMemo}
                writable={isWriting}
                autoFocus={isWriting}
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
