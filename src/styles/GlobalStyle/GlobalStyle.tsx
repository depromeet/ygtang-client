import { css, Global, Theme } from '@emotion/react';

import { resetCss } from './reset';

export default function GlobalStyle() {
  return <Global styles={globalCss} />;
}

const globalCss = (theme: Theme) => css`
  ${resetCss}

  * {
    box-sizing: border-box;
    word-break: keep-all;
    word-wrap: break-word;
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
      display: none !important;
    }
  }

  :root {
    color: ${theme.color.black};

    body {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      .draggable {
        -webkit-user-select: all;
        -moz-user-select: all;
        -ms-user-select: all;
        user-select: all;
      }
    }
  }
`;
