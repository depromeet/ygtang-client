import { css } from '@emotion/react';

import ContentThumbnail from './ContentThumbnail';

export default function ContentView() {
  return (
    <div css={ContentViewCss}>
      <ContentThumbnail />
      <ContentThumbnail />
    </div>
  );
}

const ContentViewCss = css``;
