import { css, Theme } from '@emotion/react';

import { IconButton } from '../Button';
import { labelCss } from '../styles';
import Tag from '../Tag';

export interface TagContentProps {
  label?: string;
  tags: TagType[];
  onEdit: VoidFunction;
  onClickTag?: (tagId: number) => void;
}

export default function TagContent({ tags, label, onEdit, onClickTag }: TagContentProps) {
  return (
    <div css={tagContentWrapperCss}>
      <span css={tagContentLabelCss}>{label ? label : '태그'}</span>
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
        <IconButton iconName="PlusIcon" onClick={onEdit} />
      </div>
    </div>
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
