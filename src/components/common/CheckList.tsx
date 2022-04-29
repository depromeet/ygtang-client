import { PropsWithChildren } from 'react';
import { css, useTheme } from '@emotion/react';

import { CheckCircleIcon, ChevronIcon } from './icons';

export interface Props {
  isChecked: boolean;
  onToggle: VoidFunction;
  onClickChevron?: VoidFunction;
}

export default function CheckList({
  children,
  isChecked = false,
  onToggle,
  onClickChevron,
}: PropsWithChildren<Props>) {
  const theme = useTheme();

  return (
    <div css={checkListContainerCss}>
      <button onClick={onToggle} css={IconWrapperCss}>
        <CheckCircleIcon color={isChecked ? '' : theme.color.gray01} />
      </button>
      <span css={childrenWrapperCss}>{children}</span>
      <button css={IconWrapperCss} onClick={onClickChevron}>
        <ChevronIcon css={chevronIconCss} />
      </button>
    </div>
  );
}

const checkListContainerCss = css`
  display: flex;
  align-items: center;
  padding-left: 0 6px;
  width: 100%;
  height: 30px;
`;

const childrenWrapperCss = css`
  flex: 1;
  padding-left: 6px;
  font-size: 12px;
  line-height: 150%;
`;

const IconWrapperCss = css`
  line-height: 0;
`;

const chevronIconCss = css`
  transform: rotate(180deg);
`;
