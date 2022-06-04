import { PropsWithChildren } from 'react';
import { css, Theme } from '@emotion/react';

export default function ModalWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <section css={wrapperCss}>
      <div className="safeAreaTop" />
      {children}
      <div className="safeAreaBottom" />
    </section>
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
