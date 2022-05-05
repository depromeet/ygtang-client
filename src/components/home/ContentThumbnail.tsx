import { css, Theme } from '@emotion/react';

import Tag from '~/components/common/Tag';
import { selectRandomColor } from '~/utils/selectRandomColor';

export interface ContentThumbnailProps
  extends Pick<InspirationInterface, 'type' | 'tagResponse' | 'content'> {}

export default function ContentThumbnail({ type, tagResponse, content }: ContentThumbnailProps) {
  return (
    <section css={wrapperCss}>
      <div css={contentWrapperCss}>
        <Content type={type} content={content} />
      </div>

      <Tags tagResponse={tagResponse} />
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

function Content({ type, content }: Pick<ContentThumbnailProps, 'type' | 'content'>) {
  if (type === 'IMAGE') return <img css={imageCss} alt={`${content} image`} src={content} />;
  if (type === 'LINK') return <div></div>;
  return <p css={textCss}>{content}</p>;
}

const imageCss = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const textCss = css`
  font-size: 12px;
  padding: 6px;
  line-height: 150%;
`;

function Tags({ tagResponse }: Pick<ContentThumbnailProps, 'tagResponse'>) {
  if (tagResponse && tagResponse.length > 0)
    return (
      <div css={tagWrapperCss}>
        {tagResponse.map(eachTag => (
          <Tag key={eachTag.id} content={eachTag.content} height="16px" />
        ))}
      </div>
    );

  return <></>;
}

const tagWrapperCss = css`
  width: 100%;
  height: 16px;

  display: flex;
  align-items: center;
  gap: 2px;
  overflow-x: scroll;
`;
