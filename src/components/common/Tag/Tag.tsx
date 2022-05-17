import React, { useRef } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

import { selectRandomColor } from '~/utils/selectRandomColor';

import { CloseIcon } from '../icons';

export interface TagProps extends Pick<TagInterface, 'content'> {
  deletable?: boolean;
  onDelete?: VoidFunction;
  onClick?: VoidFunction;
}

function Tag({ content, deletable = false, onDelete = () => {}, onClick = () => {} }: TagProps) {
  const theme = useTheme();
  const backGroundColor = useRef(selectRandomColor(theme, ['gray01', 'gray02', 'gray03']));

  const onClickCloseIcon = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete();
  };
  return (
    <div css={tagCss(theme, backGroundColor.current)} onClick={onClick}>
      #{content}
      {deletable && (
        <button css={closeButtonCss} onClick={onClickCloseIcon}>
          <CloseIcon size={15} />
        </button>
      )}
    </div>
  );
}

export default React.memo(Tag);

const tagCss = (theme: Theme, backGroundColor: string) => css`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  height: 24px;
  padding: 0 6px;
  border-radius: ${theme.borderRadius.default};
  background-color: ${backGroundColor};
  font-weight: 500;
  font-size: 10px;
  line-height: 150%;
  width: fit-content;
`;

const closeButtonCss = css`
  padding: 0;
  line-height: 0;
  margin-left: 4px;
`;
