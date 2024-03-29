import { css, Theme } from '@emotion/react';
import { motion, Variants } from 'framer-motion';

import { PlusIcon } from '~/components/common/icons';
import PortalWrapper from '~/components/common/PortalWrapper';
import { defaultEasing, defaultFadeInVariants } from '~/constants/motions';
import useToggle from '~/hooks/common/useToggle';

import { dimBackdropCss } from '../common/styles';
import AppendTooltip from './AppendTooltip';

export default function AppendButton() {
  const [isShowing, toggleIsShowing] = useToggle(false);

  return (
    <>
      <motion.button
        css={buttonCss}
        onClick={toggleIsShowing}
        variants={buttonRotateVariants}
        initial="initial"
        animate={isShowing ? 'true' : 'false'}
        whileTap={{ scale: 0.9 }}
      >
        <PlusIcon />
      </motion.button>

      <PortalWrapper isShowing={isShowing}>
        <motion.div
          css={dimBackdropCss}
          onClick={toggleIsShowing}
          variants={defaultFadeInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <AppendTooltip />
        </motion.div>
      </PortalWrapper>
    </>
  );
}

const buttonCss = (theme: Theme) => css`
  position: fixed;
  right: 16px;
  bottom: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background-color: ${theme.color.primary};
  border-radius: 50%;
  color: ${theme.color.gray06};
  z-index: 999;
`;

const buttonRotateVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  false: {
    opacity: 1,
    y: 0,
    rotateZ: '0deg',
    transition: { duration: 0.5, ease: defaultEasing },
  },
  true: {
    opacity: 1,
    y: 0,
    rotateZ: '45deg',
    transition: { duration: 0.5, ease: defaultEasing },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.5, ease: defaultEasing },
  },
};
