import { css } from '@emotion/react';

import NavigationBar from '~/components/common/NavigationBar';

export default function ContentPage() {
  return (
    <article css={contentCss}>
      <NavigationBar title="" backLink="/" backLinkScrollOption={false} />
      영감 보기(이미지 / 텍스트 / 링크)
    </article>
  );
}

const contentCss = css``;
