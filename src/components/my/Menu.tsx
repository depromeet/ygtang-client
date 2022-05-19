import { ReactElement, useRef } from 'react';
import { css, Theme } from '@emotion/react';

import { RouterPathType } from '~/hooks/common/useInternalRouter';

import InternalLink from '../common/InternalLink';

export interface MenuProps {
  label: string;
  rightElement?: ReactElement;
  href?: RouterPathType;
  onClick?: VoidFunction;
}

export default function Menu({ label, rightElement, href, onClick, ...props }: MenuProps) {
  const $link = useRef<HTMLDivElement>(null);

  const onClickHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (e.target !== e.currentTarget) return;
    if (href) {
      $link.current?.click();
    } else {
      onClick && onClick();
    }
  };

  return (
    <>
      <li css={MenuCss} {...props} onClick={onClickHandler}>
        {href && (
          <InternalLink href={href}>
            <span css={hiddenCss} ref={$link}></span>
          </InternalLink>
        )}
        <span css={menuTitleCss}>{label}</span>
        {rightElement && <>{rightElement}</>}
      </li>
    </>
  );
}

const MenuCss = (theme: Theme) => css`
  position: relative;
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

const hiddenCss = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0 0 0 0);
`;
