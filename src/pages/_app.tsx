import { ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';

import Theme from '../styles/Theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={Theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
