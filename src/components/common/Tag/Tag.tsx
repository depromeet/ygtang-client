import React, { useRef } from 'react';
import { css, Theme, useTheme } from '@emotion/react';
import { motion } from 'framer-motion';

import { defaultFadeInVariants } from '~/constants/motions';
import { selectRandomColor } from '~/utils/selectRandomColor';

import { CloseIcon } from '../icons';

export interface TagProps extends Pick<TagInterface, 'content'> {
  count?: number;
  deletable?: boolean;
  selected?: boolean;
  onDelete?: VoidFunction;
  onClick?: VoidFunction;
}

function Tag({
  content,
  count,
  deletable = false,
  onDelete = () => {},
  onClick = () => {},
  selected = false,
}: TagProps) {
  const theme = useTheme();
  const backGroundColor = useRef(selectRandomColor(theme, ['gray01', 'gray02', 'gray03']));

  const onClickCloseIcon = (event: React.MouseEvent<HTMLButtonElement>) => {
    // NOTE: a 태그 하위에 있으면 button 클릭은 기본기능으로 a기능을 그대로 사용되게 되는듯?
    event.stopPropagation();
    event.preventDefault();

    onDelete();
  };
  return (
    <motion.div
      variants={defaultFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      css={tagCss(theme, backGroundColor.current, selected)}
      onClick={onClick}
    >
      #{content}
      {count && <span css={countCss}>{count}개</span>}
      {deletable && (
        <button type="button" css={closeButtonCss} onClick={onClickCloseIcon}>
          <CloseIcon size={15} />
        </button>
      )}
    </motion.div>
  );
}

export default React.memo(Tag);

const tagCss = (theme: Theme, backGroundColor: string, selected: boolean) => css`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  height: 34px;
  padding: 0 8px;
  border: ${selected ? `1.2px solid ${theme.color.gray05}` : ''};
  border-radius: ${theme.borderRadius.default};
  background-color: ${backGroundColor};
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  width: fit-content;
  color: ${theme.color.gray06};
`;

const closeButtonCss = css`
  color: inherit;
  padding: 0;
  line-height: 0;
  margin-left: 4px;
`;

const countCss = (theme: Theme) => css`
  margin-left: 6px;
  color: ${theme.color.gray05};
  font-size: 10px;
  font-weight: 500;
  line-height: 150%;
`;
