import { css } from '@emotion/react';

import Spinner from './Spinner';

export function FixedSpinner() {
  return (
    <div css={wrapperCss}>
      <Spinner />
    </div>
  );
}

const wrapperCss = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);

  display: flex;
  justify-content: center;
  align-items: center;
`;
