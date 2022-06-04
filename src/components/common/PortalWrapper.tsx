import { PropsWithChildren } from 'react';
import { css, Theme } from '@emotion/react';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

import { safeAreaBottomCss, safeAreaTopCss } from '~/pages/_layout';

interface ModalWrapperProps {
  isShowing: boolean;
}

export default function PortalWrapper({
  children,
  isShowing,
}: PropsWithChildren<ModalWrapperProps>) {
  const container = typeof window !== 'undefined' && document.body;

  return container ? (
    createPortal(
      <AnimatePresence exitBeforeEnter>
        {isShowing && (
          <div css={wrapperCss}>
            <div css={safeAreaTopCss} />
            {children}
            <div css={safeAreaBottomCss} />
          </div>
        )}
      </AnimatePresence>,
      container
    )
  ) : (
    <></>
  );
}

const wrapperCss = (theme: Theme) => css`
  position: fixed;
  top: 0;
  /* 가로 가운데 정렬 */
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${theme.size.maxWidth};
  height: 100%;
  overflow-y: scroll;
  background-color: ${theme.color.background};
  padding: ${theme.size.layoutPadding};
  z-index: 1000;
`;
