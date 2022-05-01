import { css } from '@emotion/react';

import Svg, { SvgProps } from '~/components/common/Svg';

export interface ChevronIconProps extends SvgProps {
  direction?: 'up' | 'right' | 'down' | 'left';
}

export function ChevronIcon({ direction = 'left', ...props }: Props) {
  return (
    <Svg viewBox={24} {...props} css={chevronIconCss(DIRECTION_DEGREE[direction])}>
      <path d="M14.71 6.71a.996.996 0 0 0-1.41 0L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z" />
    </Svg>
  );
}

const DIRECTION_DEGREE = {
  up: 90,
  right: 180,
  down: 270,
  left: 0,
} as const;

const chevronIconCss = (degree: number) => css`
  transform: rotate(${degree}deg);
`;
