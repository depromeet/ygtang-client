import { css, Theme } from '@emotion/react';

import { selectRandomColor } from '~/utils/selectRandomColor';

import { CloseIcon } from './icons';

export interface TagProps extends Pick<TagInterface, 'content'> {
  deletable?: boolean;
  onDelete?: () => void;
}

export default function Tag({ content, deletable = false, onDelete = () => {} }: TagProps) {
  return (
    <div css={tagCss}>
      #{content}
      {deletable && (
        <button css={closeButtonCss} onClick={() => onDelete()}>
          <CloseIcon size={15} />
        </button>
      )}
    </div>
  );
}

const tagCss = (theme: Theme) => css`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  height: 24px;
  padding: 0 6px;
  border-radius: ${theme.borderRadius.default};
  background-color: ${selectRandomColor(theme, ['gray01', 'gray02', 'gray03'])};
  font-weight: 500;
  font-size: 10px;
  line-height: 150%;
`;

const closeButtonCss = css`
  padding: 0;
  line-height: 0;
  margin-left: 4px;
`;
