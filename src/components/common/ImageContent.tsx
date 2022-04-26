import Image from 'next/image';
import { css } from '@emotion/react';

import { CloseIcon } from './icons';

interface ImageContentProps {
  src: string;
  alt: string;
}

export default function ImageContent({ src, alt }: ImageContentProps) {
  return (
    <div css={imgBoxCss}>
      <CloseIcon />
      <Image src={src} css={imgCss} alt={alt} layout="fill" objectFit="cover" />
    </div>
  );
}

const imgBoxCss = css``;

const imgCss = css``;
