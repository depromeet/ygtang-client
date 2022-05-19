import { css, Theme } from '@emotion/react';
import { motion } from 'framer-motion';

import { defaultFadeInScaleVariants, staggerOne } from '~/constants/motions';

interface OnboardContentProps {
  imgSrc: string;
  title: string;
  description: string;
}

export function OnboardContent({ imgSrc, title, description }: OnboardContentProps) {
  return (
    <motion.div
      css={wrapperCss}
      variants={staggerOne}
      initial="initial"
      whileInView="animate"
      exit="exit"
    >
      <motion.div css={imageWrapperCss} variants={defaultFadeInScaleVariants}>
        <img src={imgSrc} alt={title} />
      </motion.div>
      <motion.h2 css={titleCss} variants={defaultFadeInScaleVariants}>
        {title}
      </motion.h2>
      <motion.p
        css={descriptionCss}
        dangerouslySetInnerHTML={{ __html: description }}
        variants={defaultFadeInScaleVariants}
      ></motion.p>
    </motion.div>
  );
}

const wrapperCss = css`
  padding-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 150%;
`;

const imageWrapperCss = css`
  width: 100%;
  height: 350px;
  margin-bottom: 24px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const titleCss = (theme: Theme) => css`
  margin-bottom: 8px;
  font-size: 24px;
  color: ${theme.color.gray05};
`;

const descriptionCss = (theme: Theme) => css`
  text-align: center;
  font-size: 14px;
  color: ${theme.color.gray04};
`;
