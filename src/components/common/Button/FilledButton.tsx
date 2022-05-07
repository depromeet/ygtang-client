import { ComponentProps } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

import Button from './Button';

type ColorType = 'light' | 'dark';

interface FilledButtonProps extends ComponentProps<typeof Button> {
  colorType?: ColorType;
}

export function FilledButton(props: FilledButtonProps) {
  const { colorType = 'dark', children, ...rest } = props;
  const theme = useTheme();

  return (
    <Button css={filledButtonCss(theme, colorType)} {...rest}>
      {children}
    </Button>
  );
}

const filledButtonCss = (theme: Theme, colorType: ColorType) => css`
  width: 100%;
  height: 37px;
  font-size: 14px;
  font-weight: ${theme.font.weight.semiBold};
  color: ${colorType === 'dark' ? theme.color.background : theme.color.gray05};
  background-color: ${colorType === 'dark' ? theme.color.gray05 : theme.color.gray02};
`;
