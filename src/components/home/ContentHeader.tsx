import { css } from '@emotion/react';

export default function ContentHeader() {
  return (
    <div css={ContentHeaderCss}>
      <button css={HeaderButtonCss}>태그</button>
      <button css={HeaderButtonCss}>설정</button>
    </div>
  );
}

const ContentHeaderCss = css``;

const HeaderButtonCss = () => css`
  width: 32px;
  height: 32px;
  border: 0.5px solid #e6e6e6;
  font-weight: 700;
  font-size: 10px;
`;
