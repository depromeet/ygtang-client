import { ComponentProps } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

import * as icons from '~/components/common/icons';

import Button from './Button';

type ColorType = 'light' | 'dark';

interface IconButtonProps extends Omit<ComponentProps<typeof Button>, 'children'> {
  iconName: keyof typeof icons;
  /**
   * @type 'light' | 'dark'
   *
   * @default 'dark'
   *
   * light일 시 gray05, dark일 시 background 색상이 적용됩니다.
   *
   * `light` props가 true일 시, light는 background, dark는 gray05로 적용됩니다.
   */
  colorType?: ColorType;
  /**
   * 아이콘 버튼의 배경 색상을 `inherit`으로 설정합니다.
   *
   * `colorType` props의 적용 값을 반전시킵니다.
   */
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

  color: ${light ? lightColorType(theme, colorType) : nonLightColorType(theme, colorType)};

  background-color: ${light
    ? 'inherit'
    : colorType === 'dark'
      ? theme.color.gray05
      : theme.color.gray02};
`;

const nonLightColorType = (theme: Theme, colorType: ColorType) => {
  if (colorType === 'dark') {
    return theme.color.background;
  }
  return theme.color.gray05;
};

const lightColorType = (theme: Theme, colorType: ColorType) => {
  if (colorType === 'dark') {
    return theme.color.gray05;
  }

  return theme.color.background;
};
