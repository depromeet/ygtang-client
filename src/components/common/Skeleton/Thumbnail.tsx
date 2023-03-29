import { css, Theme } from '@emotion/react';
import { motion } from 'framer-motion';

import { contentFadeInUp } from '~/components/home/Thumbnail';

import SkeletonContainer from './Container';

function SkeletonThumbnail() {
  return (
    <motion.article css={wrapperCss} variants={contentFadeInUp}>
      <div css={supportAspectRatioWrapperCss}>
        <SkeletonContainer>
          <div css={contentSkeletonCss}></div>
          <div css={tagListSkeletonWrapper}>
            <small css={tagSkeletonWrapper('sm')}></small>
            <small css={tagSkeletonWrapper('lg')}></small>
            <small css={tagSkeletonWrapper('md')}></small>
            <small css={tagSkeletonWrapper('sm')}></small>
          </div>
        </SkeletonContainer>
      </div>
    </motion.article>
  );
}

export default SkeletonThumbnail;

const wrapperCss = (theme: Theme) => css`
  max-width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  color: ${theme.color.background};
  background-color: ${theme.color.gray03};
  border-radius: ${theme.borderRadius.outer};

  @supports not (aspect-ratio: 1) {
    position: relative;

    &::before {
      content: '';
      float: left;
      padding-top: 100%;
    }
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
`;

const supportAspectRatioWrapperCss = css`
  width: 100%;
  height: 100%;
  padding: 6px;

  @supports not (aspect-ratio: 1) {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const contentSkeletonCss = (theme: Theme) => css`
  border-radius: ${theme.borderRadius.default};
  height: calc(100% - 18px);
  width: 100%;
  background: ${theme.color.dim01};
`;

const tagListSkeletonWrapper = css`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 16px;
  width: 100%;
`;

type TagSize = 'sm' | 'md' | 'lg';

const tagSizeToWidth = (size: TagSize) => {
  switch (size) {
    case 'sm':
      return '32px';
    case 'md':
      return '48px';
    case 'lg':
      return '64px';
    default:
      return '32px';
  }
};

const tagSkeletonWrapper = (size: TagSize) => (theme: Theme) => {
  return css`
    height: 100%;
    width: ${tagSizeToWidth(size)};
    padding: 2px 4px;
    background-color: ${theme.color.dim02};
    border-radius: ${theme.borderRadius.default};
  `;
};
