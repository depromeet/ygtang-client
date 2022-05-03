import { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';

import Layout from '~/components/common/Layout';
import ToastSection from '~/components/common/ToastSection';
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
