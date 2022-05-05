import { useState } from 'react';
import { css } from '@emotion/react';

import LinkInput from '~/components/add/LinkInput';
import { CTAButton } from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';

export interface OpenGraph {
  description: string;
  site_name: string;
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
        <div css={linkBoxCss}>
          <LinkInput openGraph={openGraph} setOpenGraph={setOpenGraph} />
        </div>
        <MemoText writable />
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
  height: 100vh;
  overflow: hidden;
`;

const addLinkTopCss = css`
  flex-grow: 1;
  overflow-y: auto;
`;

const addLinkBottomCss = css`
  margin: 8px 0 16px 0;
`;

const linkBoxCss = css`
  margin: 16px 0;
`;
