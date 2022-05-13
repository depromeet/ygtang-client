import Link from 'next/link';
import { css, Theme } from '@emotion/react';

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
}

export default function TagContent({ tags, label = '태그', onClickTag }: TagContentProps) {
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
          <Link href="?modal=addTag" as="/add/tag" scroll={false}>
            <a>
              <IconButton iconName="PlusIcon" />
            </a>
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
