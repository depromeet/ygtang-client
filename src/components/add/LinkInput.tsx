import { css, Theme } from '@emotion/react';

import { PlusIcon } from '~/components/common/icons';

import { Input } from '../common/TextField/Input';

function PlusBtn() {
  return (
    <button css={btnCss}>
      <PlusIcon color="white" />
    </button>
  );
}

export default function LinkInput() {
  return (
    <div css={LinkInputCss}>
      <Input placeholder="영감이 되는 링크를 붙여 넣어보세요" fixedHeight={32} />
      <PlusBtn />
    </div>
  );
}

const LinkInputCss = css`
  position: relative;
`;

const btnCss = (theme: Theme) => css`
  position: absolute;
  inset: 0 0 auto auto;
  width: 40px;
  height: 32px;
  padding-top: 3px;
  ${`border-radius: 0 ${theme.borderRadius.default} ${theme.borderRadius.default} 0;`}
  background-color: ${theme.color.gray05};
`;
