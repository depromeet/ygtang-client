import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { css, Theme } from '@emotion/react';
import { motion } from 'framer-motion';

import PortalWrapper from '~/components/common/PortalWrapper';
import { defaultFadeInUpVariants, defaultFadeInVariants } from '~/constants/motions';

export interface IllustDialogProps {
  isShowing?: boolean;
  image: string;
  actionButtons: ReactNode;
}

export default function IllustDialog({
  isShowing,
  image,
  children,
  actionButtons,
}: PropsWithChildren<IllustDialogProps>) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  // NOTE: https://github.com/vercel/next.js/discussions/35773
  if (!isSSR && isShowing) {
    return (
      <PortalWrapper isShowing={true}>
        <motion.div
          css={dimBackdropCss}
          variants={defaultFadeInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div css={IllustDialogCss} variants={defaultFadeInUpVariants}>
            <div css={IllustContentContainerCss}>
              <img src={image} alt="일러스트 이미지" css={IllustImageCss} />
              <div css={IllustDialogContentWrapperCss}>{children}</div>
            </div>
            <div css={IllustDialogButtonWrapperCss}>{actionButtons}</div>
          </motion.div>
        </motion.div>
      </PortalWrapper>
    );
  }

  return <></>;
}

const dimBackdropCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);

  background-color: ${theme.color.dim03};

  z-index: 10;
  overflow: hidden;
`;

const IllustContentContainerCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: -88px;
  margin-bottom: 24px;
`;

const IllustImageCss = css`
  width: 240px;
  height: 160px;
`;

const IllustDialogCss = (theme: Theme) => css`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 288px;

  width: 311px;
  min-height: 200px;

  background-color: ${theme.color.background};
  border-radius: ${theme.borderRadius.default};
`;

const IllustDialogContentWrapperCss = (theme: Theme) => css`
  font-weight: ${theme.font.weight.bold};
  color: ${theme.color.gray05};
  font-size: 16px;
  line-height: 150%;
  text-align: center;
`;

const IllustDialogButtonWrapperCss = css`
  display: flex;
  flex-direction: row;
  gap: 16px;

  width: 100%;
  padding: 16px;
`;
