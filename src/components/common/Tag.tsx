import { css, Theme, useTheme } from '@emotion/react';

import { selectRandomColor } from '~/utils/selectRandomColor';

import { CloseIcon } from './icons';

export interface TagProps extends Pick<TagInterface, 'content'> {
  /**
   * @default '24px'
   */
  height?: string;
  // TODO: 홈 화면에서 배경색을 지정해주어야하는 경우일 시 backgroundColor 속성을 추가해야합니다.
  // 혹은 홈 화면에서 스타일링만하는 방식으로 사용하고, height 속성을 삭제하는 방향으로 진행
  deletable?: boolean;
  onDelete?: () => void;
}

export default function Tag({
  content,
  height = '24px',
  deletable = false,
  onDelete = () => {},
}: TagProps) {
  const theme = useTheme();

  return (
    <div css={tagCss(theme, height)}>
      #{content}
      {deletable && (
        <button css={closeButtonCss} onClick={() => onDelete()}>
          <CloseIcon size={15} />
        </button>
      )}
    </div>
  );
}

const tagCss = (theme: Theme, height: string) => css`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  height: ${height};
  padding: 0 6px;
  border-radius: 4px;
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
