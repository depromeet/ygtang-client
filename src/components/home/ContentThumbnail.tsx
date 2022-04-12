import { css, Theme } from '@emotion/react';

export default function ContentThumbnail() {
  return (
    <section css={contentThumbnailCss}>
      콘텐츠의 텍스트는 다음과 같이 삽입됩니다. 콘텐츠의 텍스트는 다음과 같이 삽입됩니다. 콘텐츠의
      텍스트는 다음과 같이 삽입됩니다. 콘텐츠의 텍스트는 다음과 같이 삽입됩니다.
    </section>
  );
}

const contentThumbnailCss = (theme: Theme) => css`
  width: 50%;
  background: ${theme.color.gray};
  border-radius: 4px;
`;
