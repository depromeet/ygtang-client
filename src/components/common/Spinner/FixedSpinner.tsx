import { css } from '@emotion/react';

import { fullViewHeight } from '~/styles/utils';

import Spinner from './Spinner';

interface FixedSpinnerProps {
  opacity?: number;
}

export function FixedSpinner({ opacity = 1 }: FixedSpinnerProps) {
  return (
    <div css={wrapperCss(opacity)}>
      <Spinner />
    </div>
  );
}

const wrapperCss = (opacity: number) => css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: ${fullViewHeight()};
  opacity: ${opacity};

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 800;
`;
