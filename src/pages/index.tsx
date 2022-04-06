import { css, Theme } from '@emotion/react';
import { motion } from 'framer-motion';

export default function Root() {
  return (
    <div>
      <h1 css={titleCss}>영감탱</h1>
      <div css={sampleCss}></div>
      <motion.h2 drag>드래그해보세용</motion.h2>
    </div>
  );
}

const titleCss = css`
  color: red;
`;

const sampleCss = (theme: Theme) => css`
  width: 100px;
  height: 100px;
  color: white;
  background-color: ${theme.color.black};
`;
