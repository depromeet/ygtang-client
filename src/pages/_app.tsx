import { PropsWithChildren, useEffect } from 'react';
import { AppProps } from 'next/app';
import NextHead from 'next/head';
import { css, Theme, ThemeProvider } from '@emotion/react';
import mixpanel from 'mixpanel-browser';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

import ToastSection from '~/components/common/ToastSection';
import useDidMount from '~/hooks/common/useDidMount';
import { useWindowSize } from '~/hooks/common/useWindowSize';
import { useGaPageview } from '~/hooks/ga/useGaPageview';
import { queryClient } from '~/libs/api/queryClient';
import { UserProvider } from '~/store/User/UserProvider';
import GlobalStyle from '~/styles/GlobalStyle';
import CustomTheme from '~/styles/Theme';
import { fullViewHeight } from '~/styles/utils';

export default function App({ Component, pageProps }: AppProps) {
  useGaPageview();

  useDidMount(() => {
    const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL_ID;
    if (!MIXPANEL_ID) return;

    mixpanel.init(MIXPANEL_ID, { debug: true });
  });

  return (
    <>
      <Head />
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
    </>
  );
}

let vh = 0;

/**
 * 레이아웃 컴포넌트입니다.
 *
 * `_app`에서만 사용되는 컴포넌트이기에, 인라인으로 작성되었습니다.
 */
function Layout({ children }: PropsWithChildren<{}>) {
  const windowSize = useWindowSize();

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [windowSize.height]);

  return <div css={layoutCss}>{children}</div>;
}

const layoutCss = (theme: Theme) => css`
  min-height: ${fullViewHeight()};
  background: ${theme.color.background};
  max-width: ${theme.size.maxWidth};
  width: 100%;
  margin: 0 auto;
  padding: ${theme.size.layoutPadding};
`;

function Head() {
  return (
    <NextHead>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
    </NextHead>
  );
}
