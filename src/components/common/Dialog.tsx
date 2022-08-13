import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { css, Theme } from '@emotion/react';
import { motion } from 'framer-motion';

import PortalWrapper from '~/components/common/PortalWrapper';
import { defaultFadeInUpVariants, defaultFadeInVariants } from '~/constants/motions';

import { dimBackdropCss } from './styles';

export interface DialogProps {
  isShowing?: boolean;
  actionButtons: ReactNode;
}

export default function Dialog({
  isShowing,
  children,
  actionButtons,
}: PropsWithChildren<DialogProps>) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  // NOTE: https://github.com/vercel/next.js/discussions/35773
  if (!isSSR && isShowing) {
    return (
      <PortalWrapper isShowing={true}>
        <motion.div
          css={dimBackdropLayoutCss}
          variants={defaultFadeInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div css={dialogCss} variants={defaultFadeInUpVariants}>
            <div css={dialogContentWrapperCss}>{children}</div>
            <div css={dialogButtonWrapperCss}>{actionButtons}</div>
          </motion.div>
        </motion.div>
      </PortalWrapper>
    );
  }

  return <></>;
}

const dimBackdropLayoutCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  ${dimBackdropCss(theme)}
`;

const dialogCss = (theme: Theme) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  width: 311px;
  min-height: 200px;

  background-color: ${theme.color.background};
  border-radius: ${theme.borderRadius.default};
`;

const dialogContentWrapperCss = (theme: Theme) => css`
  white-space: pre;
  font-weight: ${theme.font.weight.bold};
  font-style: normal;
  color: ${theme.color.gray05};
  font-size: 16px;
  line-height: 150%;
  text-align: center;

  margin: 24px 16px;
`;

const dialogButtonWrapperCss = css`
  display: flex;
  flex-direction: row;
  gap: 16px;

  width: 100%;
  padding: 16px;
`;
