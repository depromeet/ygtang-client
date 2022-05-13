import { PropsWithChildren, useEffect } from 'react';
import { AppProps } from 'next/app';
import { css, Theme, ThemeProvider } from '@emotion/react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

import ToastSection from '~/components/common/ToastSection';
import { useWindowSize } from '~/hooks/common/useWindowSize';
import { queryClient } from '~/libs/api/queryClient';
import { UserProvider } from '~/store/User/UserProvider';
import GlobalStyle from '~/styles/GlobalStyle';
import CustomTheme from '~/styles/Theme';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    localStorage.setItem(
      'accessToken',
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2Iiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sIm1lbWJlcl9pZCI6NiwiaWF0IjoxNjUyNDM1MTA5LCJleHAiOjE2NTI0Mzg3MDl9.vbXOTE4ERo2dSDnSFdM2C3DkV_ttu81T0IgiQWOPv34'
    );
    localStorage.setItem(
      'refreshToken',
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2Iiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sIm1lbWJlcl9pZCI6NiwiZXhwIjoxNjUzNjQ0NzA5fQ.X8jUQoyrAEVRBqdOW08En_8YqrsG0vmC7jghXXc7g_k'
    );
  }, []);

  return (
    <RecoilRoot>
      <ThemeProvider theme={CustomTheme}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <Layout>
              <GlobalStyle />
              <Component {...pageProps} />
              <ToastSection />
            </Layout>
          </UserProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

/**
 * 레이아웃 컴포넌트입니다.
 *
 * `_app`에서만 사용되는 컴포넌트이기에, 인라인으로 작성되었습니다.
 */
let vh = 0;

function Layout({ children }: PropsWithChildren<{}>) {
  const windowSize = useWindowSize();

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [windowSize.height]);

  return <div css={layoutCss}>{children}</div>;
}

const layoutCss = (theme: Theme) => css`
  height: calc(var(--vh, 1vh) * 100);
  background: ${theme.color.background};
  max-width: ${theme.size.maxWidth};
  width: 100%;
  margin: 0 auto;
  padding: ${theme.size.layoutPadding};
`;
