import { css } from '@emotion/react';

export default function Tag({ text }: { text: string }) {
  return <button css={tagCss}>#{text}</button>;
}

const tagCss = css`
  display: inline-block;
  height: 24px;
  border-radius: 4px;
  background: #fbfbfb;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  flex-shrink: 0;
`;
