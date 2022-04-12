import { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';

import GlobalStyle from '~/styles/GlobalStyle';
import Theme from '~/styles/Theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
