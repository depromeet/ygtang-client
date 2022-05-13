import { css, Theme } from '@emotion/react';
import { motion, Variants } from 'framer-motion';

import { defaultEasing } from '~/constants/motions';

export default function Spinner() {
  return (
    <motion.div
      css={wrapperCss}
      variants={wrapperVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div css={spinnerWrapperCss} variants={spinnerVariants} animate="animate" exit="exit">
        <div css={spinnerCss}></div>
      </motion.div>
    </motion.div>
  );
}

const wrapperCss = css`
  width: 100px;
  height: 100px;
  padding: 14px;
`;

const spinnerWrapperCss = css`
  width: 100%;
  height: 100%;
`;

const spinnerCss = (theme: Theme) => css`
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background-color: ${theme.color.primary};
`;

const wrapperVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: defaultEasing },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.5, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
};

const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};
