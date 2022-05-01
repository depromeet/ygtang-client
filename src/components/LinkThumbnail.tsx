import { css, Theme } from '@emotion/react';

import textEllipisCss from '~/styles/utils/textEllipisCss';

import { IconButton } from './common/Button';

export interface LinkThumbnailMetaData {
  imageUrl?: string;
  title: string;
  url: string;
  alt?: string;
}

export interface Props {
  edit?: boolean;
  thumbnail: LinkThumbnailMetaData;
}

export default function LinkThumbnail({ edit = false, thumbnail }: Props) {
  const hasImage = () => {
    return Boolean(thumbnail?.imageUrl);
  };

  const onOpenUrl = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (edit || !thumbnail?.url) {
      event.preventDefault();
    }
  };

  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <a css={linkThumbnailLinkCss} href={thumbnail.url} onClick={onOpenUrl}>
      <article css={linkThumbnailBoxCss}>
        <section css={linkThumbnailContentCss(hasImage())}>
          <p css={linkThumbnailTitleCss}>{thumbnail.title}</p>
          <span css={linkThumbnailUrlCss}>{thumbnail.url}</span>
        </section>
        {hasImage() && (
          <img css={linkThumbnailImageCss} src={thumbnail.imageUrl} alt={thumbnail.alt} />
        )}
        <IconButton light iconName="CancelIcon" css={closeButtonCss(edit)} onClick={onDelete} />
      </article>
    </a>
  );
}

const linkThumbnailUrlSize = 100;

const linkThumbnailBoxCss = (theme: Theme) => css`
  display: flex;
  position: relative;
  width: 100%;
  height: 100px;
  background-color: ${theme.color.gray01};
  border-radius: 4px;
`;
const linkThumbnailContentCss = (hasImage: boolean) => () =>
  css`
    padding: 16px;
    width: calc(100% - ${hasImage ? linkThumbnailUrlSize : 0}px);
  `;

const linkThumbnailTitleCss = css`
  width: 100%;
  font-size: 12px;
  line-height: 150%;

  ${textEllipisCss(3)}
`;

const linkThumbnailUrlCss = (theme: Theme) => css`
  width: 100%;
  font-size: 10px;
  line-height: 150%;
  color: ${theme.color.gray03};

  ${textEllipisCss(1)}
`;

const linkThumbnailImageCss = (theme: Theme) => css`
  width: ${linkThumbnailUrlSize}px;
  height: 100%;
  border-radius: 0px 4px 4px 0px;
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
  background-color: initial;
`;

const linkThumbnailLinkCss = css`
  display: block;
  color: inherit;
  text-decoration: none;
`;
