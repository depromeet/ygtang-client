import { css } from '@emotion/react';

import { CTAButton } from '~/components/common/Button';
import TagContent from '~/components/common/Content/TagContent';
import NavigationBar from '~/components/common/NavigationBar';
import { MemoText } from '~/components/common/TextField';
import { Input } from '~/components/common/TextField/Input';
import useInput from '~/hooks/common/useInput';

export default function AddText() {
  const inspiringText = useInput({ useDebounce: true });
  const {
    onChange: onMemoChange,
    debouncedValue: memoDebouncedValue,
    value: memoValue,
  } = useInput({ useDebounce: true });
  const isEmptyText = !Boolean(inspiringText.debouncedValue);

  return (
    <article css={addTextCss}>
      <NavigationBar title="글 추가" />
      <section css={addTextTopCss}>
        <div css={contentWrapperCss}>
          <Input
            as="textarea"
            placeholder="영감을 작성해 보세요."
            value={inspiringText.value}
            onChange={inspiringText.onChange}
          />
        </div>
        <div css={contentWrapperCss}>
          <TagContent onEdit={() => {}} tags={[]} />
        </div>
        <div css={contentWrapperCss}>
          <MemoText
            writable
            onChange={onMemoChange}
            debouncedValue={memoDebouncedValue}
            value={memoValue}
          />
        </div>
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
  height: 100%;
  overflow: hidden;
`;

const addTextTopCss = css`
  flex-grow: 1;
  overflow-y: auto;
`;

const addTextBottomCss = css`
  margin: 8px 0 16px 0;
`;

const contentWrapperCss = css`
  padding: 16px 0;
`;
