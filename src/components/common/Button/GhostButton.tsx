import { ComponentProps } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

import Button from './Button';

type SizeType = 'large' | 'small';

interface GhostButtonProps extends ComponentProps<typeof Button> {
  size?: SizeType;
}

export function GhostButton(props: GhostButtonProps) {
  const { size = 'large', children, ...rest } = props;
  const theme = useTheme();

  return (
    <Button css={ghostButtonCss(theme, size)} {...rest}>
      {children}
    </Button>
  );
}

const ghostButtonCss = (theme: Theme, size: SizeType) => css`
  font-size: ${size === 'large' ? '15px' : '10px'};
  padding: ${size === 'large' ? '10px 8px' : '0px 2px'};
  height: ${size === 'large' ? '40px' : '15px'};
  color: ${theme.color.gray05};
  background-color: inherit;
`;
