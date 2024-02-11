import { PropsWithChildren } from 'react';
import { css, Theme } from '@emotion/react';
import { motion, Variants } from 'framer-motion';

import { defaultEasing } from '~/constants/motions';
import theme, { ThemeColor } from '~/styles/Theme/Theme';

interface SkeletonContainerProps {
  backgroundColorName?: ThemeColor;
}

function SkeletonContainer({
  children,
  backgroundColorName = 'gray03',
}: PropsWithChildren<SkeletonContainerProps>) {
  const backgroundColorRGB = hexToRGB(theme.color[backgroundColorName]);

  return (
    <div css={skeletonContainerCss}>
      {children}
      <motion.div
        variants={shineVariants}
        initial="initial"
        animate="animate"
        css={shineCss(backgroundColorRGB)}
      ></motion.div>
    </div>
  );
}

export default SkeletonContainer;

interface RGB {
  red: number;
  green: number;
  blue: number;
}

const hexToRGB = (hex: string): RGB => {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);

  return {
    red,
    green,
    blue,
  };
};

const shineVariants: Variants = {
  initial: { y: 0, x: '0' },
  animate: {
    x: 'calc(100% + 200px)',
    transition: { duration: 1.25, ease: defaultEasing, repeat: Infinity },
    willChange: 'transform',
  },
};

const skeletonContainerCss = (theme: Theme) => css`
  position: relative;
  border-radius: ${theme.borderRadius.default};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
  width: 100%;
  height: 100%;
`;

const shineCss = (backgroundRGB: RGB) => css`
  z-index: 1;
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: -100px;
  width: 100px;
  height: 100%;
  background: ${`linear-gradient(
          90deg,
          rgba(${backgroundRGB.red}, ${backgroundRGB.green}, ${backgroundRGB.blue}, 0),
          rgba(${backgroundRGB.red}, ${backgroundRGB.green}, ${backgroundRGB.blue}, 0.5),
          70%,
          rgba(${backgroundRGB.red}, ${backgroundRGB.green}, ${backgroundRGB.blue}, 0) 90%
        )`};
  background-repeat: no-repeat;
`;
