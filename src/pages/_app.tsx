import { PropsWithChildren } from 'react';
import { AppProps } from 'next/app';
import { css, Theme, ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';

import { ToastSection } from '~/components/common/ToastSection';
import GlobalStyle from '~/styles/GlobalStyle';
import CustomTheme from '~/styles/Theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={CustomTheme}>
        <Layout>
          <GlobalStyle />
          <Component {...pageProps} />
          <ToastSection />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
  );
}

function Layout({ children }: PropsWithChildren<{}>) {
  return <div css={layoutCss}>{children}</div>;
}

const layoutCss = (theme: Theme) => css`
  max-width: ${theme.size.maxWidth};
  width: 100%;
  margin: 0 auto;
  padding: ${theme.size.layoutPadding};
`;
