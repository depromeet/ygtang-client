import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import LinkInput from '~/components/add/LinkInput';
import { CTABottomButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useInput from '~/hooks/common/useInput';
import { useAppliedTags } from '~/store/AppliedTags';

import { formCss } from './image';

const AddTagFormRouteAsModal = dynamic(() => import('~/components/add/AddTagFormRouteAsModal'));
// TODO: code 200임에도 response가 null로 오는 경우가 있어서 백엔드 문의 필요
export interface OpenGraph {
  description: string;
  siteName: string;
  title: string;
  url: string;
  code: number;
  image?: string;
}

export default function AddLink() {
  const [disabled, setDisabled] = useState(false);
  const {
    onChange: onMemoChange,
    debouncedValue: memoDebouncedValue,
    value: memoValue,
  } = useInput({ useDebounce: true });
  const [openGraph, setOpenGraph] = useState<OpenGraph | null>(null);
  const { createInspiration } = useInspirationMutation();
  const { tags } = useAppliedTags(true);

  const saveOpenGraph = useCallback((og: OpenGraph | null) => {
    setOpenGraph(og);
  }, []);

  const submitLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!openGraph || !openGraph.url) return;
    setDisabled(true);
    const tagIds = tags.map(tag => tag.id);
    const linkData = new FormData();
    linkData.append('content', openGraph.url);
    linkData.append('memo', memoValue);
    linkData.append('type', 'LINK');
    linkData.append('tagIds', tagIds.toString());

    createInspiration(linkData);
  };

  return (
    <>
      <article css={addLinkCss}>
        <NavigationBar title="링크 추가" />

        <form onSubmit={submitLink} css={formCss}>
          <section css={addLinkTopCss}>
            <div css={contentWrapperCss}>
              <LinkInput openGraph={openGraph} saveOpenGraph={saveOpenGraph} />
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
            <CTABottomButton disabled={!Boolean(openGraph) || disabled} type="submit">
              Tang!
            </CTABottomButton>
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
