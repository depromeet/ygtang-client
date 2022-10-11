import { useState } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import LinkInput from '~/components/add/LinkInput';
import TagContent from '~/components/common/Content/TagContent';
import { MemoText } from '~/components/common/TextField';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useInput from '~/hooks/common/useInput';
import { recordEvent } from '~/utils/analytics';

import { formCss } from './ImageView';
import { ViewProps } from './type';

const AddTagFormRouteAsModal = dynamic(() => import('~/components/add/AddTagFormRouteAsModal'));

interface LinkViewProps extends ViewProps {}

export default function LinkView({ inspiration }: LinkViewProps) {
  const {
    onChange: onMemoChange,
    debouncedValue: memoDebouncedValue,
    value: memoValue,
  } = useInput({ useDebounce: true, initialValue: inspiration.memo });
  const { modifyInspiration } = useInspirationMutation();
  const [isWriting, setWriting] = useState(false);

  const saveMemo = () => {
    if (!isWriting) return setWriting(true);
    modifyInspiration({ id: inspiration.id, memo: memoValue });
    recordEvent({ action: '메모 수정' });
    setWriting(false);
  };

  if (!inspiration) return <></>;
  const { tagResponses, openGraphResponse } = inspiration;

  if (!openGraphResponse) return <></>;

  const { description, siteName, title, url, code, image } = openGraphResponse;

  return (
    <>
      <article css={addLinkCss}>
        <form css={formCss}>
          <section css={addLinkTopCss}>
            <div css={contentWrapperCss}>
              <LinkInput
                openGraph={{
                  description,
                  siteName,
                  title,
                  url,
                  code,
                  image,
                }}
              />
            </div>
            <div css={contentWrapperCss}>
              <TagContent tags={tagResponses} inspirationId={inspiration.id} />
            </div>
            <div css={contentWrapperCss}>
              <MemoText
                editable
                onSave={saveMemo}
                onChange={onMemoChange}
                debouncedValue={memoDebouncedValue}
                value={memoValue}
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

const addLinkCss = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const addLinkTopCss = css`
  flex-grow: 1;
  overflow-y: auto;
`;

const contentWrapperCss = css`
  padding: 16px 0;
`;
