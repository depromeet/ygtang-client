import React, { PropsWithChildren, useEffect, useId, useState } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

import { CheckCircleIcon, ChevronIcon } from './icons';

export interface CheckListProps {
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
  externalHref: string;
}

export default function CheckList({
  children,
  isChecked,
  onToggle,
  externalHref,
}: PropsWithChildren<CheckListProps>) {
  const theme = useTheme();
  const id = useId();

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(event.target.checked);
  };

  return (
    <div css={checkListContainerCss}>
      <input
        css={inputCheckboxHiddenCss}
        id={`check-list-${id}`}
        type="checkbox"
        onChange={onCheck}
      />
      <label htmlFor={`check-list-${id}`}>
        <CheckCircleIcon color={isChecked ? theme.color.gray05 : theme.color.gray01} />
      </label>
      <a css={childrenWrapperCss} href={externalHref} target="_blank" rel="noopener noreferrer">
        {children}
        <ChevronIcon direction="right" />
      </a>
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

const childrenWrapperCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 6px;
  flex: 1;
  font-size: 12px;
  line-height: 150%;
  color: ${theme.color.gray05};
  text-decoration: none;
`;

const inputCheckboxHiddenCss = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip-path: circle(0);
`;
