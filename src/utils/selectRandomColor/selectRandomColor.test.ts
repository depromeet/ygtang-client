import { Theme } from '@emotion/react';

import theme from '~/styles/Theme';

import { selectRandomColor } from './selectRandomColor';

describe('utils/selectRandomColor/selectRandomColor', () => {
  it('should defined', () => {
    expect(selectRandomColor).toBeDefined();
  });

  it('should return a random color within range', () => {
    const colorRange: Array<keyof Theme['color']> = ['gray01', 'gray02'];
    const randomColor = selectRandomColor(theme, colorRange);

    expect([theme.color.gray01, theme.color.gray02]).toContain(randomColor);
  });

  it('should return a color with array what length of 1', () => {
    const colorRange: Array<keyof Theme['color']> = ['gray01'];
    const randomColor = selectRandomColor(theme, colorRange);

    expect(randomColor).toBe(theme.color.gray01);
  });
});
