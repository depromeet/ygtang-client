import { PropsWithChildren } from 'react';
import { AppProps } from 'next/app';
import { css, ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';

import Theme from '~/styles/Theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={Theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  );
}

function Layout({ children }: PropsWithChildren<{}>) {
  return <div css={layoutCss}>{children}</div>;
}

const layoutCss = css`
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
`;
