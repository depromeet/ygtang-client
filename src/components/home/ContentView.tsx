import { css } from '@emotion/react';

import ContentThumbnail from './ContentThumbnail';

export default function ContentView() {
  return (
    <div css={ContentViewCss}>
      <ContentThumbnail />
      <ContentThumbnail />
      <ContentThumbnail />
      <ContentThumbnail />
      <ContentThumbnail />
      <ContentThumbnail />
      <ContentThumbnail />
      <ContentThumbnail />
      <ContentThumbnail />
      <ContentThumbnail />
    </div>
  );
}

const ContentViewCss = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;
