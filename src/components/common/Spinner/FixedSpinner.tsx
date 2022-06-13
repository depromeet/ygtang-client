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
  top: 0;
  /* 가로 가운데 정렬 */
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: ${fullViewHeight()};
  opacity: ${opacity};

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 800;
`;
