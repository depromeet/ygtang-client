import { ReactElement } from 'react';
import { css, Theme } from '@emotion/react';

export interface MenuProps {
  title: string;
  rightElement?: ReactElement;
}

// NOTE: 메뉴 자체가 title과 rightElement=Icon 두개만 넣도록 되어서 그냥 flex로 구현했습니다.
export default function Menu({ title, rightElement }: MenuProps) {
  return (
    <li css={MenuCss}>
      <span css={menuTitleCss}>{title}</span>
      {rightElement && <>{rightElement}</>}
      {/* <div css={menuDividerCss} /> */}
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
  /* border-bottom: solid 1px ${theme.color.gray01}; */
  &::after {
    display: block;
    content: '';
    position: absolute;
    background-color: ${theme.color.gray01};
    height: 1px;
    width: calc(100% + 32px);
    right: -16px;
    bottom: 1px;
  }
`;

const menuTitleCss = css`
  font-size: 12px;
`;

// const menuDividerCss = (theme: Theme) => css`
//   position: absolute;
//   background-color: ${theme.color.gray01};
//   height: 1px;
//   width: calc(100% + 32px);
//   right: -16px;
//   bottom: 1px;
// `;
