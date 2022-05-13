import { useState } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import LinkInput from '~/components/add/LinkInput';
import { CTAButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useInput from '~/hooks/common/useInput';
import { useAppliedTags } from '~/store/AppliedTags';

import { formCss } from './image';

const AddTagFormRouteAsModal = dynamic(() => import('~/components/add/AddTagFormRouteAsModal'));
export interface OpenGraph {
  description: string;
  siteName: string;
  title: string;
  url: string;
  imageUrl?: string;
}

export default function AddLink() {
  const {
    onChange: onMemoChange,
    debouncedValue: memoDebouncedValue,
    value: memoValue,
  } = useInput({ useDebounce: true });
  const [openGraph, setOpenGraph] = useState<OpenGraph | null>(null);
  const { createInspiration } = useInspirationMutation();
  const { tags } = useAppliedTags();

  const submitLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!openGraph || !openGraph.url) return;

    const linkData = new FormData();
    linkData.append('content', openGraph.url);
    linkData.append('memo', memoValue);
    linkData.append('type', 'LINK');

    createInspiration(linkData);
  };

  return (
    <>
      <article css={addLinkCss}>
        <NavigationBar title="링크 추가" />

        <form onSubmit={submitLink} css={formCss}>
          <section css={addLinkTopCss}>
            <div css={contentWrapperCss}>
              <LinkInput openGraph={openGraph} setOpenGraph={setOpenGraph} />
            </div>
            <div css={contentWrapperCss}>
              <TagContent tags={tags} />
            </div>
            <div css={contentWrapperCss}>
              <MemoText
                onChange={onMemoChange}
                debouncedValue={memoDebouncedValue}
                value={memoValue}
                writable
              />
            </div>
          </section>

          <section css={addLinkBottomCss}>
            <CTAButton disabled={!Boolean(openGraph)} type="submit">
              Tang!
            </CTAButton>
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

const addLinkBottomCss = css`
  margin: 8px 0 16px 0;
`;

const contentWrapperCss = css`
  padding: 16px 0;
`;
