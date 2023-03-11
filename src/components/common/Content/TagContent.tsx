import Link from 'next/link';
import { css, Theme } from '@emotion/react';

import { MODAL_TYPE } from '~/constants/common';

import { IconButton } from '../Button';
import { labelCss } from '../styles';
import Tag from '../Tag';

export interface TagContentProps {
  label?: string;
  tags: TagType[];
  /**
   * 단일 Tag 클릭 할 경우, Action을 넘겨 줍니다.
   */
  onClickTag?: (tagId: number) => void;
  inspirationId?: number;
}

export default function TagContent({
  tags,
  label = '태그',
  onClickTag,
  inspirationId,
}: TagContentProps) {
  return (
    <>
      <div css={tagContentWrapperCss}>
        <span css={tagContentLabelCss}>{label}</span>
        <div css={tagContentCss}>
          {tags.map(tag => (
            <Tag
              content={tag.content}
              key={tag.id}
              onClick={() => {
                onClickTag && onClickTag(tag.id);
              }}
            />
          ))}
          <Link
            href={`${
              inspirationId
                ? `?modal=${MODAL_TYPE.editTag}&id=${inspirationId}`
                : `?modal=${MODAL_TYPE.addTag}`
            }`}
            as={inspirationId ? `/edit/tag?id=${inspirationId}` : '/add/tag'}
            scroll={false}
          >
            <IconButton iconName="PlusIcon" />
          </Link>
        </div>
      </div>
    </>
  );
}
const tagContentWrapperCss = css`
  display: flex;
  flex-direction: column;
`;

const tagContentLabelCss = (theme: Theme) => css`
  ${labelCss(theme)}
  margin-bottom: 12px;
`;

const tagContentCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;
