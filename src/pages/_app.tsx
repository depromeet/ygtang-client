import { ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import Theme from '../styles/Theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={Theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
