import { PropsWithChildren, useEffect } from 'react';
import { AppProps } from 'next/app';
import NextHead from 'next/head';
import { css, Theme, ThemeProvider } from '@emotion/react';
import { init as sentryInit } from '@sentry/nextjs';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';

import { ErrorBoundary } from '~/components/common/ErrorBoundary';
import ToastSection from '~/components/common/ToastSection';
import { UserProvider } from '~/components/common/UserProvider';
import { IS_PRODUCTION } from '~/constants/common';
import { useRecordPageview } from '~/hooks/analytics/useRecordPageview';
import useDidMount from '~/hooks/common/useDidMount';
import { useWindowSize } from '~/hooks/common/useWindowSize';
import { queryClient } from '~/libs/api/queryClient';
import GlobalStyle from '~/styles/GlobalStyle';
import CustomTheme from '~/styles/Theme';

let vh = 0;

export default function App({ Component, pageProps }: AppProps) {
  useEasterEgg();
  useRecordPageview();
  sentryInit({ dsn: process.env.NEXT_PUBLIC_SENTRY_DSN });

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

function Layout({ children }: PropsWithChildren<{}>) {
  const windowSize = useWindowSize();

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [windowSize.height]);

  return <div css={layoutCss}>{children}</div>;
}

const layoutCss = (theme: Theme) => css`
  min-height: calc(var(--var, 1vh) * 100);
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
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0 viewport-fit=cover"
      />
    </NextHead>
  );
}

function useEasterEgg() {
  useDidMount(() => {
    if (!IS_PRODUCTION) return;
    if (typeof window !== 'undefined') {
      console.log(`
      --------------------------------------------------------------
  --------------------------------------------------------------
  ---------------------------------------------------------~----
  ---------------------------------------------------------*!---
  --~;;;;;;;;;;;;;;;--------------------------------------:$#~--
  --~##############*--------------------------------------*##~--
  --~#$;;;=##*;;;##=--------------------------------------*##~--
  --~$:---!##:---;#$---------------------------***--------*##~--
  --:=----!##:----#$-------------------------*=###====!---*##~--
  -~=~----!##:----#$-------------------------$#:~:####*---*##~--
  --;-----!##:----*$------------------------=#!--~##=-----;$#~--
  --------!##:-------~;$*~------------------=#~--~$#=------=#~--
  --------!##:------:#$$$#!---~~@#-:##=~----=#~---~#=------=#~--
  --------!##:-----~#=--;$=:-~$###:#$##*~---=#;---~#=------=#~--
  --------!##:-----!#=---!#;-;*####*!=#$;---=##~--~#=------=$~--
  --------!##:-----=#=---!#;---$##!--:##!---=##~--~#=------==~--
  --------!##:-----:#=---!#;---$##---:$#!---;$#:--*$;------==~--
  --------!##:------;:--:=#;---$##---~=#!----;$=**$;-------=;---
  --------!##:--------:*=$#;---$##---:$#!-----$$#::--------=:---
  --------!##:-------:$=:*#;---$##---:##!----*:~:----------=:---
  --------!##:------~$=~-!#;---$##---~*#!---*#~------------=:---
  --------!##:-----~#=---!#;---$##---~=#!---=##;;---------------
  --------!##:-----~#=---!#;---$##---~*#!---=#######=-----------
  --------!##:----~##=---!#;---$##---~*#!---*########=-----~~---
  --------!##:----~##=--~*#;---$##---~=#!---~*!=====$$;---~=#~--
  --------!##:----~##=:~*##*~--$##---~*#!--~=:------:=*---*##~--
  -------:=##*~----*##=*==##=~-$##---:=#!--;$:-------:;---*##~--
  -----~!=####*!---~###=:!##*~;$##!!~*##=!~*#:------~;~---;$*~--
  -----~;;;;;;;;----;;;:-:;;~-;;;;;;~;;;;;~*#:-----~=*-----:~---
  -----------------------------------------*#=**==*==:----------
  -----------------------------------------~=######=~-----------
  ------------------------------------------~$###$~~------------
  --------------------------------------------------------------`);
    }
  });
}
