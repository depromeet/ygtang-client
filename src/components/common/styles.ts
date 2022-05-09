import { css, Theme } from '@emotion/react';

/**
 * 공용으로 사용되는 라벨 스타일입니다.
 */
export const labelCss = (theme: Theme) => css`
  display: block;
  color: ${theme.color.gray05};
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
`;
