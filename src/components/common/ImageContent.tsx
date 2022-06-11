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
    <div css={imgBoxCss({ width, height, theme })}>
      {(onClickXBtn || htmlFor) && (
        <label htmlFor={htmlFor} onClick={onClickXBtn} css={closeIconCss}>
          <CancelIcon isUsingFill color={theme.color.gray05} />
        </label>
      )}
      {src && <img src={src} css={imgBoxCss({ width, height, theme })} alt={alt} />}
    </div>
  );
}

const imgBoxCss = ({
  width,
  height,
  theme,
}: {
  width: string;
  height?: string;
  theme: Theme;
}) => css`
  position: relative;
  width: ${width};
  min-height: ${height ?? '343px'};
  overflow: hidden;
  border-radius: 4px;
  object-fit: cover;
  background-color: ${theme.color.gray01};
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
