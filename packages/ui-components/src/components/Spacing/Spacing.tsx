import { css } from "@emotion/react";

export interface SpacingProps {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

export function Spacing(props: SpacingProps) {
  return <div css={spacingCss(props)} />;
}

const spacingCss = ({ left, right, top, bottom }: SpacingProps) => css`
  ${left && `margin-left: ${left}px;`}
  ${right && `margin-right: ${right}px;`}
  ${top && `margin-top: ${top}px;`}
  ${bottom && `margin-bottom: ${bottom}px;`}
`;
