import { css } from '@emotion/react';

import Theme from '~/styles/Theme';

import { CancelIcon } from './icons';

interface ImageContentProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

export default function ImageContent({ src, alt, width = '100%', height }: ImageContentProps) {
  return (
    <div css={imgBoxCss({ width, height })}>
      <button css={closeIconCss}>
        <CancelIcon isUsingFill color={Theme.color.gray05} />
      </button>
      <img src={src} css={imgBoxCss({ width, height })} alt={alt} />
    </div>
  );
}

const imgBoxCss = ({ width, height }: { width: string; height?: string }) => css`
  position: relative;
  width: ${width};
  min-height: ${height ?? '343px'};
  max-height: ${height ?? '450px'};
  overflow: hidden;
  border-radius: 4px;
  object-fit: cover;
`;

const closeIconCss = css`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
`;
