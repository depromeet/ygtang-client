import { css, Theme } from '@emotion/react';

export default function Tag({ text }: { text: string }) {
  return <button css={tagCss}>#{text}</button>;
}

const tagCss = (theme: Theme) => css`
  display: inline-block;
  flex-shrink: 0;
  padding: 2px 4px 2px 4px;
  border-radius: 4px;
  background: ${theme.color.dim01};
  font-weight: 500;
  font-size: 10px;
  line-height: 150%;
  color: ${theme.color.background};

  :last-child {
    margin-right: 12px; // NOTE: 지금의 content 끝단과 맞도록 변경
  }
`;
