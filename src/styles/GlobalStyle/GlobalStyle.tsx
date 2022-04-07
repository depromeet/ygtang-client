import { css, Global } from '@emotion/react';

export default function GlobalStyle() {
  return <Global styles={globalCss} />;
}

const globalCss = css`
  * {
    box-sizing: border-box;
  }
`;
