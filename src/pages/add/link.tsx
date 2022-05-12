import { useState } from 'react';
import { css } from '@emotion/react';

import LinkInput from '~/components/add/LinkInput';
import { CTAButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';

export interface OpenGraph {
  description: string;
  siteName: string;
  title: string;
  url: string;
  imageUrl?: string;
}

export default function AddLink() {
  const [openGraph, setOpenGraph] = useState<OpenGraph | null>(null);

  return (
    <article css={addLinkCss}>
      <NavigationBar title="링크 추가" />
      <section css={addLinkTopCss}>
        <div css={contentWrapperCss}>
          <LinkInput openGraph={openGraph} setOpenGraph={setOpenGraph} />
        </div>
        <div css={contentWrapperCss}>
          <TagContent onEdit={() => {}} tags={[]} />
        </div>
        <div css={contentWrapperCss}>
          <MemoText writable />
        </div>
      </section>

      <section css={addLinkBottomCss}>
        <CTAButton disabled={!Boolean(openGraph)} type="submit">
          Tang!
        </CTAButton>
      </section>
    </article>
  );
}

const addLinkCss = css`
  display: flex;
  flex-direction: column;
  height: calc(var(--vh, 1vh) * 100);
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
