import { useTheme } from '@emotion/react';

import Svg, { SvgProps } from '~/components/common/Svg';

export function RemoveCircleIcon({ color, ...props }: SvgProps) {
  const theme = useTheme();

  return (
    <Svg viewBox={24} color={color ? color : theme.color.primary} {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm4 11H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1z" />
    </Svg>
  );
}
