import React from 'react';
import { useRouter } from 'next/router';
import { css, Theme } from '@emotion/react';
import { motion, Variants } from 'framer-motion';

import { defaultEasing } from '~/constants/motions';
import { recordEvent } from '~/utils/analytics';
import { selectRandomColor } from '~/utils/selectRandomColor';

import ThumbnailContent from './ThumbnailContent';

export interface ContentThumbnailProps
  extends Pick<InspirationInterface, 'type' | 'content' | 'id'> {
  tags: InspirationInterface['tagResponses'];
  openGraph?: OpenGraphResponse;
  memo: InspirationInterface['memo'];
}

function Thumbnail({ id, type, tags, content, openGraph }: ContentThumbnailProps) {
  const { push } = useRouter();

  const moveToInspirationView = (id: number) => {
    recordEvent({ action: '영감 상세 조회', value: type });
    push(
      {
        query: {
          modal: 'inspirationView',
          id,
        },
      },
      { pathname: 'content', query: { id } },
      {
        scroll: false,
      }
    );
  };

  return (
    <motion.article css={wrapperCss} variants={contentFadeInUp} layoutId={`${id}`}>
      <div css={supportAspectRatioWrapperCss}>
        <div css={contentWrapperCss} onClick={() => moveToInspirationView(id)}>
          <ThumbnailContent type={type} content={content} openGraph={openGraph} />
        </div>

        <Tags tags={tags} />
      </div>
    </motion.article>
  );
}

export default React.memo(Thumbnail);

const wrapperCss = (theme: Theme) => css`
  max-width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  color: ${theme.color.background};
  background-color: ${selectRandomColor(theme, ['gray03', 'gray04', 'gray05'])};
  border-radius: ${theme.borderRadius.outer};

  @supports not (aspect-ratio: 1) {
    position: relative;

    &::before {
      content: '';
      float: left;
      padding-top: 100%;
    }
    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
`;

const supportAspectRatioWrapperCss = css`
  width: 100%;
  height: 100%;
  padding: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;

  @supports not (aspect-ratio: 1) {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const contentWrapperCss = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${theme.borderRadius.default};
`;

export const contentFadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    transition: { duration: 1, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 1, ease: defaultEasing },
    willChange: 'opacity, transform',
  },
};

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
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 2px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const tagCss = (theme: Theme) => css`
  height: 100%;
  padding: 2px 4px;
  background-color: ${theme.color.dim02};
  border-radius: ${theme.borderRadius.default};
  font-weight: ${theme.font.weight.medium};
  font-size: 10px;
  line-height: 1.2;
  white-space: nowrap;
`;
