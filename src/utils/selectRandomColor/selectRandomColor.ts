import { Theme } from '@emotion/react';

type ColorType = keyof Theme['color'];

export function selectRandomColor(theme: Theme, colorRange: ColorType[]) {
  const randomNumber = Math.floor(Math.random() * colorRange.length + 1);
  const randomColor = colorRange[randomNumber];
  return theme.color[randomColor];
}
