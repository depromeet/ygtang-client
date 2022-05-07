import { ReactElement } from 'react';
import { css, Theme } from '@emotion/react';

export interface MenuProps {
  label: string;
  rightElement?: ReactElement;
}

export default function Menu({ label, rightElement }: MenuProps) {
  return (
    <li css={MenuCss}>
      <span css={menuTitleCss}>{label}</span>
      {rightElement && <>{rightElement}</>}
    </li>
  );
}

const MenuCss = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 54px;
  padding: 16px 8px;
  border-bottom: solid 1px ${theme.color.gray01};
`;

const menuTitleCss = css`
  font-size: 12px;
`;
