import { css, Theme } from '@emotion/react';

export default function Root() {
  return (
    <div>
      <h1 css={titleCss}>영감탱</h1>
      <div css={sampleCss}></div>
    </div>
  );
}

const titleCss = css`
  color: red;
`;

const sampleCss = (theme: Theme) => css`
  width: 100px;
  height: 100px;
  background-color: ${theme.color.black};
`;
