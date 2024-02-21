import React, { PropsWithChildren, useId } from "react";
import { css, Theme, useTheme } from "@emotion/react";
import { CheckCircleIcon, ChevronIcon } from "@ygtang/ui-components";

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
  return (
    <div css={checkListContainerCss}>
      <Checkbox isChecked={isChecked} onToggle={onToggle} />
      <a
        css={childrenWrapperCss}
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <ChevronIcon direction="right" />
      </a>
    </div>
  );
}

interface CheckboxProps extends Omit<CheckListProps, "externalHref"> {}

export function Checkbox({ isChecked, onToggle }: CheckboxProps) {
  const theme = useTheme();
  const id = useId();

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(event.target.checked);
  };

  return (
    <>
      <input
        css={inputCheckboxHiddenCss}
        defaultChecked={isChecked}
        id={`check-list-${id}`}
        type="checkbox"
        onChange={onCheck}
      />
      <label htmlFor={`check-list-${id}`}>
        <CheckCircleIcon
          color={isChecked ? theme.color.gray05 : theme.color.gray01}
        />
      </label>
    </>
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
