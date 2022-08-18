import { useEffect, useState } from 'react';
import Router from 'next/router';
import { css, Theme, useTheme } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import { isNil } from 'lodash';

import { defaultFadeInUpVariants } from '~/constants/motions';
import { useToast } from '~/store/Toast';

import { CloseIcon } from './icons';

export default function ToastSection() {
  const { currentToast } = useToast();
  const theme = useTheme();
  const [isClipboardToastVisible, setClipboardToastVisible] = useState(true);

  useEffect(() => {
    setClipboardToastVisible(true);
  }, [currentToast?.content]);

  const onClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setClipboardToastVisible(false);
  };

  return (
    <div css={wrapperCss}>
      <AnimatePresence exitBeforeEnter>
        {currentToast &&
          (!isNil(currentToast.clipboardConfig) ? (
            isClipboardToastVisible && (
              <motion.div
                onClick={() =>
                  Router.push({
                    pathname:
                      currentToast.clipboardConfig?.type === 'TEXT' ? '/add/text' : '/add/link',
                    query: { isClipboard: true },
                  })
                }
                key={currentToast.content}
                variants={defaultFadeInUpVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                css={clipboardToastCss}
              >
                <span dangerouslySetInnerHTML={{ __html: currentToast.content }} />
                <button onClick={onClick}>
                  <CloseIcon isUsingFill color={theme.color.background} />
                </button>
              </motion.div>
            )
          ) : (
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
          ))}
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
  background-color: ${theme.color.gray_toast};
  padding: 16px;
  text-align: center;
  border-radius: ${theme.borderRadius.default};
`;

const clipboardToastCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${theme.color.background};
  background-color: ${theme.color.gray06};
  padding: 16px;
  border-radius: ${theme.borderRadius.default};

  span {
    flex-grow: 1;
    text-align: left;
    line-height: 140%;
  }
`;
