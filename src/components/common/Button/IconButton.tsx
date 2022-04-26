import { ComponentProps } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

import * as icons from '~/components/common/icons';

import Button from './Button';

type ColorType = 'light' | 'dark';

interface IconButtonProps extends Omit<ComponentProps<typeof Button>, 'children'> {
  iconName: keyof typeof icons;
  colorType?: ColorType;
  light?: boolean;
  size?: number;
}

export function IconButton(props: IconButtonProps) {
  const { iconName, colorType = 'dark', light = false, size = 24, ...rest } = props;
  const theme = useTheme();
  const CurrentIcon = icons[iconName];

  return (
    <Button css={iconButtonCss(theme, colorType, light, size)} {...rest}>
      <CurrentIcon />
    </Button>
  );
}

const iconButtonCss = (theme: Theme, colorType: ColorType, light: boolean, size: number) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${size}px;
  height: ${size}px;
  padding: 2px;

  color: ${light
    ? theme.color.gray05
    : colorType === 'dark'
    ? theme.color.background
    : theme.color.gray05};

  background-color: ${light
    ? 'inherit'
    : colorType === 'dark'
    ? theme.color.gray05
    : theme.color.gray02};
`;
