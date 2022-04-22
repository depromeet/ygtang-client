import { css, Theme } from '@emotion/react';

// TODO: Tag에 대한 프로퍼티가 정의되면 text, onDelete은 변경될 예정입니다.
interface Props {
  text: string;
  deletable?: boolean;
  onDelete?: () => void;
}

export default function Tag({ text, deletable = false, onDelete = () => {} }: Props) {
  return (
    <button css={tagCss}>
      #{text}
      {deletable && (
        <div css={iconCss} onClick={() => onDelete()}>
          X
        </div>
      )}
    </button>
  );
}

const selectColorByRandom = (theme: Theme) => {
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
  height: 28px;
  padding: 0 6px;
  border-radius: 4px;
  background-color: ${selectColorByRandom(theme)};
  font-weight: 500;
  font-size: 10px;
  line-height: 150%;
`;

// TODO: ICON 추가 되면 제거되야 됩니다.
const iconCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  font-size: 14px;
  width: 16px;
  height: 16px;
`;
