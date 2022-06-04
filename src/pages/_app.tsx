import { AppProps } from 'next/app';
import NextHead from 'next/head';
import { ThemeProvider } from '@emotion/react';
import { init as sentryInit } from '@sentry/nextjs';
import { init as mixpanelInit } from 'mixpanel-browser';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

import { ErrorBoundary } from '~/components/common/ErrorBoundary';
import ToastSection from '~/components/common/ToastSection';
import { UserProvider } from '~/components/common/UserProvider';
import { useGaPageview } from '~/hooks/ga/useGaPageview';
import { queryClient } from '~/libs/api/queryClient';
import Layout from '~/pages/_layout';
import GlobalStyle from '~/styles/GlobalStyle';
import CustomTheme from '~/styles/Theme';

export default function App({ Component, pageProps }: AppProps) {
  useGaPageview();

  sentryInit({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN });
  mixpanelInit(process.env.NEXT_PUBLIC_MIXPANEL_ID as string);

  return (
    <>
      <Head />
      <ErrorBoundary>
        <RecoilRoot>
          <ThemeProvider theme={CustomTheme}>
            <QueryClientProvider client={queryClient}>
              <GlobalStyle />
              <UserProvider>
                <Layout>
                  <Component {...pageProps} />
                  <ToastSection />
                </Layout>
              </UserProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ThemeProvider>
        </RecoilRoot>
      </ErrorBoundary>
    </>
  );
}

function Head() {
  return (
    <NextHead>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0 viewport-fit=cover"
      />
    </NextHead>
  );
}
