import { css } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';
import { Input } from '~/components/common/TextField/Input';
import useInput from '~/hooks/common/useInput';

export default function AddText() {
  const inspiringText = useInput({ useDebounce: true });
  const isEmptyText = !Boolean(inspiringText.debouncedValue);

  return (
    <article css={addTextCss}>
      <NavigationBar title="글 추가" />
      <section css={addTextTopCss}>
        <div css={imgBoxCss}>
          <Input
            as="textarea"
            placeholder="영감을 작성해 보세요."
            value={inspiringText.value}
            onChange={inspiringText.onChange}
          />
        </div>
        <MemoText writable />
      </section>
      <section css={addTextBottomCss}>
        <CTAButton type="submit" disabled={isEmptyText}>
          Tang!
        </CTAButton>
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

const imgBoxCss = css`
  margin: 16px 0;
`;
