import { PropsWithChildren } from 'react';
import { AppProps } from 'next/app';
import { css, Theme, ThemeProvider } from '@emotion/react';
import { QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import ToastSection from '~/components/common/ToastSection';
import { queryClient } from '~/libs/api/queryClient';
import { UserProvider } from '~/store/User/UserProvider';
import GlobalStyle from '~/styles/GlobalStyle';
import CustomTheme from '~/styles/Theme';

export default function App({ Component, pageProps }: AppProps) {
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
function Layout({ children }: PropsWithChildren<{}>) {
  return <div css={layoutCss}>{children}</div>;
}

const layoutCss = (theme: Theme) => css`
  background: ${theme.color.background};
  max-width: ${theme.size.maxWidth};
  width: 100%;
  margin: 0 auto;
  padding: ${theme.size.layoutPadding};
`;
