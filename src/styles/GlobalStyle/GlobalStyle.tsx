import { css, Global, Theme } from '@emotion/react';

export default function GlobalStyle() {
  return <Global styles={globalCss} />;
}

const globalCss = (theme: Theme) => css`
  * {
    box-sizing: border-box;
  }

  :root {
    color: ${theme.color.black};
  }
`;
