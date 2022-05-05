import { css } from '@emotion/react';

import LinkInput from '~/components/add/LinkInput';
import { CTAButton } from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';

export default function AddLink() {
  return (
    <article css={addTextCss}>
      <NavigationBar title="링크 추가" />
      <section css={addTextTopCss}>
        <div css={linkBoxCss}>
          <LinkInput />
        </div>
        <MemoText writable />
      </section>
      <section css={addTextBottomCss}>
        <CTAButton type="submit">Tang!</CTAButton>
      </section>
    </article>
  );
}

const addTextCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const addTextTopCss = css`
  flex-grow: 1;
  overflow-y: auto;
`;

const addTextBottomCss = css`
  margin: 8px 0 16px 0;
`;

const linkBoxCss = css`
  margin: 16px 0;
`;
