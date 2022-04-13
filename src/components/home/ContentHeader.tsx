import { css, Theme } from '@emotion/react';

export default function ContentHeader() {
  return (
    <header css={ContentHeaderCss}>
      <button css={HeaderButtonCss}>태그</button>
      <button css={HeaderButtonCss}>설정</button>
    </header>
  );
}

const ContentHeaderCss = css`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 20px;
`;

const HeaderButtonCss = (theme: Theme) => css`
  width: 32px;
  height: 32px;
  background: ${theme.color.gray};
  font-weight: 700;
  font-size: 10px;
`;
