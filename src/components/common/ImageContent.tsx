import { css, Theme, useTheme } from '@emotion/react';

import { CancelIcon } from './icons';

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

  return (
    <div css={imgBoxCss({ width, height })}>
      {src ? (
        <>
          {(onClickXBtn || htmlFor) && (
            <label htmlFor={htmlFor} onClick={onClickXBtn} css={closeIconCss}>
              <CancelIcon isUsingFill color={theme.color.gray05} />
            </label>
          )}
          <img src={src} css={imgCss} alt={alt} />
        </>
      ) : (
        <div onClick={onClickXBtn} css={emptyImageCss({ theme })}></div>
      )}
    </div>
  );
}

const imgBoxCss = ({ width, height }: { width: string; height?: string }) => css`
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
