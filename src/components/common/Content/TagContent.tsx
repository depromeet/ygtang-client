import Link from 'next/link';
import { css, Theme } from '@emotion/react';

import { MODAL_TYPE } from '~/constants/common';

import { labelCss } from '../styles';
import AppliedTags from '../TagForm/AppliedTags';

export interface TagContentProps {
  label?: string;
  tags: TagType[];
  onRemoveTag?: (tagId: number) => void;
  inspirationId?: number;
}

export default function TagContent({
  tags,
  label = '태그',
  inspirationId,
  onRemoveTag,
}: TagContentProps) {
  return (
    <>
      <div css={tagContentWrapperCss}>
        <span css={tagContentLabelCss}>{label}</span>
        <Link
          href={`${
            inspirationId
              ? `?modal=${MODAL_TYPE.editTag}&id=${inspirationId}`
              : `?modal=${MODAL_TYPE.addTag}`
          }`}
          as={inspirationId ? `/edit/tag?id=${inspirationId}` : '/add/tag'}
          scroll={false}
        >
          <div css={tagContentCss}>
            <div css={innerContainerCss}>
              <AppliedTags
                applyedTags={tags}
                onRemove={id => {
                  onRemoveTag && onRemoveTag(id);
                }}
              />
            </div>

            {tags.length === 0 && <span css={placeholderCss}>태그를 입력해주세요.</span>}
          </div>
        </Link>
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

const tagContentCss = (theme: Theme) => css`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 8px 12px;
  height: 49px;

  background: ${theme.color.gray01};
  border-radius: ${theme.borderRadius.default};
`;

const innerContainerCss = css`
  width: fit-content;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const placeholderCss = (theme: Theme) => css`
  color: ${theme.color.gray03};
`;
