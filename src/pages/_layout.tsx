import { PropsWithChildren, useEffect } from 'react';
import { css, Theme } from '@emotion/react';

import { useWindowSize } from '~/hooks/common/useWindowSize';
import { fullViewHeight } from '~/styles/utils';

let vh = 0;

export default function Layout({ children }: PropsWithChildren<{}>) {
  const windowSize = useWindowSize();

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, [windowSize.height]);

  return (
    <div css={layoutCss}>
      <div css={safeAreaTopCss} />
      {children}
      <div css={safeAreaBottomCss} />
    </div>
  );
}

const layoutCss = (theme: Theme) => css`
  min-height: ${fullViewHeight()};
  background: ${theme.color.background};
  max-width: ${theme.size.maxWidth};
  width: 100%;
  margin: 0 auto;
  padding: ${theme.size.layoutPadding};
`;

export const safeAreaTopCss = css`
  height: calc(constant(safe-area-inset-top));
  height: calc(env(safe-area-inset-top));
`;

export const safeAreaBottomCss = css`
  height: calc(constant(safe-area-inset-bottom));
  height: calc(env(safe-area-inset-bottom));
`;
