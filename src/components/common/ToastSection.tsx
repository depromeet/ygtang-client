import { css, Theme } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';

import { defaultFadeInUpVariants } from '~/constants/motions';
import { useToast } from '~/store/Toast';

export default function ToastSection() {
  const { currentToast } = useToast();

  return (
    <div css={wrapperCss}>
      <AnimatePresence exitBeforeEnter>
        {currentToast && (
          <motion.div
            key={currentToast.content}
            variants={defaultFadeInUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            css={toastCss}
          >
            {currentToast.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const BOTTOM_HEIGHT = '64px';

const wrapperCss = (theme: Theme) => css`
  position: fixed;
  bottom: ${BOTTOM_HEIGHT};
  left: 0;
  right: 0;
  width: 100%;
  max-width: ${theme.size.maxWidth};
  margin: 0 auto;
  padding: ${theme.size.layoutPadding};
  z-index: 9999;
`;

const toastCss = (theme: Theme) => css`
  font-size: 14px;
  color: ${theme.color.background};
  background-color: ${theme.color.gray05};
  padding: 16px;
  text-align: center;
  border-radius: ${theme.borderRadius.default};
`;
