import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import { INSPIRATION_EMPTY_IMAGE_SRC, INSPIRATION_EMPTY_TEXT_IMAGE_SRC } from '~/assets/constants';
import { defaultFadeInScaleVariants, staggerOne } from '~/constants/motions';

export default function EmptyImageSection() {
  return (
    <motion.div
      css={imageWrapperCss}
      variants={staggerOne}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.img
        css={emptyImageCss}
        src={INSPIRATION_EMPTY_IMAGE_SRC}
        alt="empty inspiration"
        variants={defaultFadeInScaleVariants}
      />
      <motion.img
        css={emptyTextImageCss}
        src={INSPIRATION_EMPTY_TEXT_IMAGE_SRC}
        alt="empty inspiration"
        variants={defaultFadeInScaleVariants}
      />
    </motion.div>
  );
}

const imageWrapperCss = css`
  padding-top: 15vh;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    object-fit: contain;
  }
`;

const emptyImageCss = css`
  width: 100%;
`;

const emptyTextImageCss = css`
  margin-top: 28px;
  width: 54%;
`;
