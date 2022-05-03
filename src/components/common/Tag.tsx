import { css, Theme } from '@emotion/react';

import { CloseIcon } from './icons';

// TODO: Tag에 대한 프로퍼티가 정의되면 text, onDelete은 변경될 예정입니다.
export interface TagType {
  id: number;
  content: string;
}
export interface TagProps {
  tag: TagType;
  deletable?: boolean;
  onDelete?: () => void;
}

export default function Tag({ tag, deletable = false, onDelete = () => {} }: TagProps) {
  return (
    <div css={tagCss}>
      #{tag.content}
      {deletable && (
        <button css={closeButtonCss} onClick={() => onDelete()}>
          <CloseIcon size={15} />
        </button>
      )}
    </div>
  );
}

const selectRandomColor = (theme: Theme) => {
  const randomNumber = Math.floor(Math.random() * 3 + 1);

  switch (randomNumber) {
    case 1:
      return theme.color.gray01;
    case 2:
      return theme.color.gray02;
    case 3:
      return theme.color.gray03;
  }
};

const tagCss = (theme: Theme) => css`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  height: 24px;
  padding: 0 6px;
  border-radius: 4px;
  background-color: ${selectRandomColor(theme)};
  font-weight: 500;
  font-size: 10px;
  line-height: 150%;
`;

const closeButtonCss = css`
  padding: 0;
  line-height: 0;
  margin-left: 4px;
`;
