import { useCallback, useRef } from 'react';
import { css, Theme, useTheme } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom';

import { defaultFadeInVariants } from '~/constants/motions';
import useToggle from '~/hooks/common/useToggle';
import { fullViewHeight } from '~/styles/utils';

import { CancelIcon } from './icons';
import { dimBackdropCss } from './styles';

const IMG_LAYOUT_ID = 'content_image';
interface ImageContentProps {
  alt: string;
  src: string | null;
  width?: string;
  height?: string;
  htmlFor?: string;
  onClickXBtn?: VoidFunction;
}

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

            <OpenedImageContent isOpen={isOpen} toggleIsOpen={toggleIsOpen} src={src} alt={alt} />
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

interface OpenedImageContentProps {
  isOpen: boolean;
  toggleIsOpen: VoidFunction;
  src: NonNullable<ImageContentProps['src']>;
  alt: ImageContentProps['alt'];
}

function OpenedImageContent({ isOpen, toggleIsOpen, src, alt }: OpenedImageContentProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  const onUpdate = useCallback(({ x, y, scale }: { x: number; y: number; scale: number }) => {
    const { current: img } = imgRef;

    if (img) {
      console.log(x, y, scale);
      const value = make3dTransformValue({ x, y, scale });

      // TODO: overflow 속성 설정을 오픈소스 스펙에 추가 혹은 기여할 수 있을듯 > 현재 대기중
      img.parentElement?.style.setProperty('overflow', 'visible');

      img.style.setProperty('transform', value);
      // NOTE: framer-motion override 방지
      img.style.setProperty('transform-origin', '');
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={toggleIsOpen}
          css={dimBackdropLayoutCss}
          variants={defaultFadeInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <QuickPinchZoom onUpdate={onUpdate}>
            <motion.img
              ref={imgRef}
              layoutId={IMG_LAYOUT_ID}
              src={src}
              css={opendImgCss}
              alt={alt}
              onClick={toggleIsOpen}
            />
          </QuickPinchZoom>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const dimBackdropLayoutCss = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;

  ${dimBackdropCss(theme)}
`;

const opendImgCss = css`
  width: auto;
  height: auto;
  cursor: default;
  max-width: 100%;
  max-height: ${fullViewHeight()};
`;
