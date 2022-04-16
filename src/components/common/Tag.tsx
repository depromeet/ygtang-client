import { css } from '@emotion/react';

export default function Tag({ text }: { text: string }) {
  return <button css={tagCss}>#{text}</button>;
}

const tagCss = css`
  display: inline-block;
  flex-shrink: 0;
  height: 24px;
  border-radius: 4px;
  background: #fbfbfb;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;

  :last-child {
    margin-right: 8px;
  }
`;
