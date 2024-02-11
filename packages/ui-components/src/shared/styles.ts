import { css, Theme } from "@emotion/react";

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

export const dimBackdropCss = (theme: Theme) => css`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100%;

  background-color: ${theme.color.dim03};

  overflow: hidden;
`;
