import { css, Global, Theme } from '@emotion/react';

import { resetCss } from './reset';

export default function GlobalStyle() {
  return <Global styles={globalCss} />;
}

const globalCss = (theme: Theme) => css`
  ${resetCss}

  :root {
    background-color: ${theme.color.background};
    color: ${theme.color.gray06};
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue',
      'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;

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

    * {
      box-sizing: border-box;
      font-family: inherit;
      word-break: keep-all;
      word-wrap: break-word;
      -ms-overflow-style: none;

      -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* iOS Button Active */

      -ms-overflow-style: none; /* IE 11 */
      scrollbar-width: none; /* Firefox 64 */
      ::-webkit-scrollbar {
        display: none !important;
      }
    }
  }
`;
