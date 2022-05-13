import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

import LinkInput from '~/components/add/LinkInput';
import { CTAButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import { MemoText } from '~/components/common/TextField';
import useInspirationMutation from '~/hooks/api/inspiration/useInspirationMutation';
import useInput from '~/hooks/common/useInput';
import { useInspirationDetail } from '~/store/Inspiration';

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

export default function LinkView() {
  const { inspirationDetail } = useInspirationDetail();
  const {
    onChange: onMemoChange,
    debouncedValue: memoDebouncedValue,
    value: memoValue,
  } = useInput({ useDebounce: true });
  const { createInspiration } = useInspirationMutation();

  const submitLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!openGraph || !openGraph.url) return;
    const tagIds = tags.map(tag => tag.id);
    const linkData = new FormData();
    linkData.append('content', openGraph.url);
    linkData.append('memo', memoValue);
    linkData.append('type', 'LINK');
    linkData.append('tagIds', tagIds.toString());

    createInspiration(linkData);
  };
  if (!inspirationDetail) return <></>;
  const { tags, openGraph, memo } = inspirationDetail;

  if (!openGraph) return <></>;
  const { description, siteName, title, url, code, image } = openGraph;

  return (
    <>
      <article css={addLinkCss}>
        <form onSubmit={submitLink} css={formCss}>
          <section css={addLinkTopCss}>
            <div css={contentWrapperCss}>
              <LinkInput
                // TODO: 오픈그래프 type refactoring 필요
                openGraph={
                  openGraph
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
              <TagContent tags={tags} />
            </div>
            <div css={contentWrapperCss}>
              <MemoText
                onChange={onMemoChange}
                debouncedValue={memoDebouncedValue}
                value={memo}
                editable
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
