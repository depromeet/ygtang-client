import { css, Theme, useTheme } from '@emotion/react';
import { motion } from 'framer-motion';

import { defaultFadeInVariants } from '~/constants/motions';
import useToggle from '~/hooks/common/useToggle';

import { CancelIcon } from './icons';
import { dimBackdropCss } from './styles';

interface ImageContentProps {
  alt: string;
  src: string | null;
  width?: string;
  height?: string;
  htmlFor?: string;
  onClickXBtn?: VoidFunction;
}

const IMG_LAYOUT_ID = 'content_image';

export default function ImageContent({
  src,
  alt = 'blank',
  width = '100%',
  height,
  htmlFor,
  onClickXBtn,
}: ImageContentProps) {
  const theme = useTheme();

  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <>
      <div css={imgBoxCss({ width, height })}>
        {src ? (
          <>
            {(onClickXBtn || htmlFor) && (
              <label htmlFor={htmlFor} onClick={onClickXBtn} css={closeIconCss}>
                <CancelIcon isUsingFill color={theme.color.gray05} />
              </label>
            )}

            <motion.img
              layoutId={IMG_LAYOUT_ID}
              src={src}
              css={imgCss}
              alt={alt}
              onClick={toggleIsOpen}
            />

            {isOpen && (
              <motion.div
                onClick={toggleIsOpen}
                css={dimBackdropLayoutCss}
                variants={defaultFadeInVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.img
                  layoutId={IMG_LAYOUT_ID}
                  src={src}
                  css={opendImgCss}
                  alt={alt}
                  onClick={toggleIsOpen}
                />
              </motion.div>
            )}
          </>
        ) : (
          <div onClick={onClickXBtn} css={emptyImageCss({ theme })}></div>
        )}
      </div>
    </>
  );
}

interface ImgBoxProps {
  width: string;
  height?: string;
}

const imgBoxCss = ({ width, height }: ImgBoxProps) => css`
  position: relative;
  width: ${width};
  height: ${height};
  min-height: 100px;
  overflow: hidden;
  object-fit: cover;
`;

const imgCss = css`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  cursor: zoom-in;
`;

const dimBackdropLayoutCss = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;

  ${dimBackdropCss(theme)}
`;

const opendImgCss = css`
  width: auto;
  height: auto;

  max-width: 100%;
`;

const closeIconCss = css`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  padding: 0;
  z-index: 1;
  cursor: pointer;
`;

const emptyImageCss = ({ theme }: { theme: Theme }) => css`
  height: 340px;
  cursor: pointer;
  background-color: ${theme.color.gray01};
  border-radius: 4px;
`;
