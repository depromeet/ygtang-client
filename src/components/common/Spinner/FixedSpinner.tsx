import { css } from '@emotion/react';

import { fullViewHeight } from '~/styles/utils';

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
  height: ${fullViewHeight()};

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 800;
`;
