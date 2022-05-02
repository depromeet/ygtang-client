import React, { PropsWithChildren, useEffect, useId, useState } from 'react';
import { css, useTheme } from '@emotion/react';

import { CheckCircleIcon, ChevronIcon } from './icons';

export interface CheckListProps {
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
  onClick?: VoidFunction;
}

export default function CheckList({
  children,
  isChecked,
  onToggle,
  onClick,
}: PropsWithChildren<CheckListProps>) {
  const theme = useTheme();
  const id = useId();

  const [checked, setChecked] = useState(isChecked);

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    onToggle(checked);
  }, [checked, onToggle]);

  return (
    <div css={checkListContainerCss}>
      <input
        css={inputCheckboxHiddenCss}
        id={`check-list-${id}`}
        type="checkbox"
        onChange={onCheck}
      />
      <label htmlFor={`check-list-${id}`}>
        <CheckCircleIcon color={checked ? '' : theme.color.gray01} />
      </label>
      <span css={childrenWrapperCss} onClick={onClick}>
        {children}
        <ChevronIcon direction="right" />
      </span>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 6px;
  flex: 1;
  font-size: 12px;
  line-height: 150%;
`;

const inputCheckboxHiddenCss = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0 0 0 0);
`;
