import { css, Theme } from '@emotion/react';

import textEllipisCss from '~/styles/utils/textEllipisCss';
import { selectRandomColor } from '~/utils/selectRandomColor';

interface ContentThumbnailProps extends Pick<InspirationInterface, 'type' | 'content'> {
  tags: InspirationInterface['tagResponse'];
  openGraph?: InspirationInterface['openGraphResponse'];
}

export default function ContentThumbnail({
  type,
  tags,
  content,
  openGraph,
}: ContentThumbnailProps) {
  return (
    <section css={wrapperCss}>
      <div css={contentWrapperCss}>
        <Content type={type} content={content} openGraph={openGraph} />
      </div>

      <Tags tags={tags} />
    </section>
  );
}

const wrapperCss = (theme: Theme) => css`
  /* grid child width 설정 */
  max-width: 100%;
  overflow: hidden;

  aspect-ratio: 1;
  padding: 6px;
  color: ${theme.color.background};
  background-color: ${selectRandomColor(theme, ['gray03', 'gray04', 'gray05'])};
  border-radius: ${theme.borderRadius.outer};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
`;

const contentWrapperCss = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${theme.borderRadius.default};
`;

function Content({
  type,
  content,
  openGraph,
}: Pick<ContentThumbnailProps, 'type' | 'content' | 'openGraph'>) {
  if (type === 'IMAGE') return <img css={imageCss} alt={`${content} image`} src={content} />;
  if (type === 'LINK')
    return (
      <div css={linkWrapperCss}>
        <div css={linkImgWrapperCss}>
          <img alt={`${openGraph?.url} thumbnail`} src={`${openGraph?.url}/${openGraph?.image}`} />
        </div>

        <div css={linkTextWrapperCss}>
          <p>{openGraph?.title}</p>
          <p>{openGraph?.url}</p>
        </div>
      </div>
    );

  // Text type
  return <p css={textCss}>{content}</p>;
}

const imageCss = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const linkWrapperCss = css`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: calc(100% - 42px) 42px;
  font-size: 10px;
`;

const linkImgWrapperCss = css`
  width: 100%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const linkTextWrapperCss = (theme: Theme) => css`
  width: 100%;
  padding: 7px 6px;
  background-color: ${theme.color.dim01};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  & p {
    ${textEllipisCss(1)}
  }
`;

const textCss = css`
  font-size: 12px;
  padding: 6px;
  line-height: 150%;
`;

function Tags({ tags }: Pick<ContentThumbnailProps, 'tags'>) {
  if (tags && tags.length > 0)
    return (
      <div css={tagWrapperCss}>
        {tags.map(eachTag => (
          <small css={tagCss} key={eachTag.id}>
            #{eachTag.content}
          </small>
        ))}
      </div>
    );

  return <></>;
}

const tagWrapperCss = css`
  height: 16px;

  display: flex;
  align-items: center;
  gap: 2px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const tagCss = (theme: Theme) => css`
  flex-shrink: 0;
  padding: 2px 4px;
  background-color: ${theme.color.dim02};
  border-radius: ${theme.borderRadius.default};
  font-weight: ${theme.font.weight.medium};
  font-size: 10px;
`;
