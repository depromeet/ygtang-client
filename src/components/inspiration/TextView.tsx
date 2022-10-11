import { useState } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import TagContent from '~/components/common/Content/TagContent';
import { MemoText } from '~/components/common/TextField';
import { Input } from '~/components/common/TextField/Input';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useInput from '~/hooks/common/useInput';
import { recordEvent } from '~/utils/analytics';

import { formCss } from './ImageView';
import InspirationTime from './InspirationTime';
import { ViewProps } from './type';

const AddTagFormRouteAsModal = dynamic(() => import('~/components/add/AddTagFormRouteAsModal'));

interface TextViewProps extends ViewProps {}

export default function TextView({ inspiration }: TextViewProps) {
  const inspiringText = useInput({ useDebounce: true });
  const memoText = useInput({ useDebounce: true, initialValue: inspiration.memo });
  const { modifyInspiration } = useInspirationMutation();
  const [isWriting, setWriting] = useState(false);

  const saveMemo = () => {
    if (!isWriting) return setWriting(true);
    modifyInspiration({ id: inspiration.id, memo: memoText.value });
    recordEvent({ action: '메모 수정' });
    setWriting(false);
  };

  if (!inspiration) return <></>;

  const { tagResponses, content, updatedDatetime } = inspiration;

  return (
    <>
      <article css={addTextCss}>
        <form css={formCss}>
          <section css={addTextTopCss}>
            <InspirationTime updatedDatetime={updatedDatetime} />
            <div css={contentWrapperCss}>
              <Input
                as="textarea"
                placeholder="영감을 작성해 보세요."
                value={content}
                onChange={inspiringText.onChange}
                disabled
              />
            </div>
            <div css={contentWrapperCss}>
              <TagContent tags={tagResponses} inspirationId={inspiration.id} />
            </div>
            <div css={contentWrapperCss}>
              <MemoText
                editable
                onSave={saveMemo}
                onChange={memoText.onChange}
                debouncedValue={memoText.debouncedValue}
                value={memoText.value}
                writable={isWriting}
                autoFocus={isWriting}
                wordLimit={150}
              />
            </div>
          </section>
        </form>
      </article>
      <AddTagFormRouteAsModal />
    </>
  );
}

const addTextCss = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const addTextTopCss = css`
  flex-grow: 1;
  overflow-y: auto;
`;

const contentWrapperCss = css`
  padding: 16px 0;
`;
