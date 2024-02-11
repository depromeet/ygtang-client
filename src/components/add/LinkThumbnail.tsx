import { css, Theme } from '@emotion/react';

import useOpenGraphImage from '~/hooks/common/useOpenGraphImage';
import { textEllipsisCss } from '~/styles/utils';

import { IconButton } from '../common/Button';

interface LinkThumbnailProps {
  edit?: boolean;
  openGraph: OpenGraphResponse;
  onDelete?: VoidFunction;
}

export default function LinkThumbnail({
  edit = false,
  openGraph,
  onDelete: _onDelete,
}: LinkThumbnailProps) {
  const { src, onImageError } = useOpenGraphImage({ url: openGraph.url, image: openGraph.image });

  const hasImage = () => {
    return Boolean(openGraph?.image);
  };

  const onOpenUrl = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (edit || !openGraph?.url) {
      event.preventDefault();
    }
  };

  // NOTE: 추후에 API 나오면 여기서 그냥 Delete 실행
  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <a
      css={linkThumbnailLinkCss}
      href={openGraph.url || undefined}
      onClick={onOpenUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <article css={linkThumbnailBoxCss}>
        <section css={linkThumbnailContentCss(hasImage())}>
          <p css={linkThumbnailTitleCss}>{openGraph.title}</p>
          <span css={linkThumbnailUrlCss}>{openGraph.url}</span>
        </section>
        {hasImage() && (
          <img
            css={linkThumbnailImageCss}
            src={src}
            alt={openGraph.url || ''}
            onError={onImageError}
          />
        )}
        <IconButton
          light
          iconName="CancelIcon"
          css={closeButtonCss(edit)}
          onClick={_onDelete ?? onDelete}
        />
      </article>
    </a>
  );
}

const linkThumbnailUrlSize = 100;

const linkThumbnailBoxCss = () => css`
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100px;
  border-radius: 4px;
`;

const linkThumbnailContentCss = (hasImage: boolean) => (theme: Theme) => css`
  padding: 16px;
  background-color: ${theme.color.gray01};
  width: calc(100% - ${hasImage ? linkThumbnailUrlSize : 0}px);
`;

const linkThumbnailTitleCss = css`
  width: 100%;
  font-size: 12px;
  line-height: 150%;

  ${textEllipsisCss(3)}
`;

const linkThumbnailUrlCss = (theme: Theme) => css`
  width: 100%;
  font-size: 10px;
  line-height: 150%;
  color: ${theme.color.gray03};

  ${textEllipsisCss(1)}
`;

const linkThumbnailImageCss = (theme: Theme) => css`
  width: ${linkThumbnailUrlSize}px;
  height: 100%;
  background-color: ${theme.color.gray02};
  object-fit: contain;
`;

const closeButtonCss = (edit: boolean) => css`
  display: ${edit ? 'inline-block' : 'none'};
  padding: 0;
  position: absolute;
  z-index: 1;
  right: 8px;
  top: 8px;
`;

const linkThumbnailLinkCss = css`
  display: block;
  color: inherit;
  text-decoration: none;
`;
