import { useState } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import LinkInput from '~/components/add/LinkInput';
import TagContent from '~/components/common/Content/TagContent';
import { MemoText } from '~/components/common/TextField';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useInput from '~/hooks/common/useInput';

import { formCss } from './ImageView';

const AddTagFormRouteAsModal = dynamic(() => import('~/components/add/AddTagFormRouteAsModal'));
export interface OpenGraph {
  description: string;
  siteName: string;
  title: string;
  url: string;
  code: number;
  image?: string;
}

export default function LinkView({ inspiration }: { inspiration: InspirationInterface }) {
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
                openGraph={
                  openGraphResponse
                    ? ({
                        description,
                        siteName,
                        title,
                        url,
                        code,
                        image,
                      } as OpenGraph)
                    : null
                }
              />
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
                value={memoValue}
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
