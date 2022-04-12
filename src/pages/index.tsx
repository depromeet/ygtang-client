import { css } from '@emotion/react';

import ContentHeader from '~/components/home/ContentHeader';
import ContentView from '~/components/home/ContentView';

export default function Root() {
  return (
    <article css={pageCss}>
      <ContentHeader />
      <ContentView />
    </article>
  );
}

const pageCss = css``;
