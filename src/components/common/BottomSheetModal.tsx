import React, { ReactNode } from 'react';
import { css, Theme } from '@emotion/react';
import { motion, Variants } from 'framer-motion';

import { backgroundFadeInOutVariants } from '~/components/common/Dialog';
import PortalWrapper from '~/components/common/PortalWrapper';
import { defaultEasing } from '~/constants/motions';
import usePreventScroll from '~/hooks/common/usePreventScroll';

export interface BottomSheetModalProps {
  isShowing: boolean;
  children: ReactNode;
  onClose: VoidFunction;
}

export default function BottomSheetModal({ isShowing, children, onClose }: BottomSheetModalProps) {
  usePreventScroll(true);

  const onDeleteHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    onClose();
  };

  return (
    <PortalWrapper isShowing={isShowing}>
      <motion.div
        css={dimBackdropCss}
        onClick={onDeleteHandler}
        variants={backgroundFadeInOutVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={bottomSheetVariants}
          css={contentWrapperCss}
        >
          {children}
        </motion.div>
      </motion.div>
    </PortalWrapper>
  );
}

const dimBackdropCss = (theme: Theme) => css`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: ${theme.color.dim03};

  overflow: hidden;
`;

const MARGIN_TOP = 54;
const MIN_HIEGHT = 208;
const contentWrapperCss = (theme: Theme) => css`
  position: absolute;
  top: 100vh;
  transform: translateY(-100%);

  width: 100%;
  min-height: ${MIN_HIEGHT}px;
  max-height: calc(100% - ${MARGIN_TOP}px);

  background-color: ${theme.color.background};
  border-radius: 8px 8px 0px 0px;

  overflow-y: scroll;
`;

export const bottomSheetVariants: Variants = {
  initial: {
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
  animate: {
    y: '-100%',
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
  exit: {
    y: 0,
    transition: { duration: 0.3, ease: defaultEasing },
    willChange: 'transform',
  },
};
