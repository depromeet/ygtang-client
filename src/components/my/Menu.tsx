import { ReactElement, useRef } from 'react';
import { css, Theme } from '@emotion/react';

import { RouterPathType } from '~/hooks/common/useInternalRouter';

import InternalLink from '../common/InternalLink';

export interface MenuProps {
  label: string;
  rightElement?: ReactElement;
  /**
   * Internal Route에 사용됩니다.
   * ex) /my/account, '/add/tag'
   */
  internalHref?: RouterPathType;
  /**
   * 새창열기에서 사용됩니다.
   * like) Window.open target="_blank"
   */
  externalHref?: string;
  onClick?: VoidFunction;
}

export default function Menu({
  label,
  rightElement,
  internalHref,
  externalHref,
  onClick,
  ...props
}: MenuProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const onClickHandler = () => {
    if (internalHref || externalHref) {
      linkRef.current?.click();
    } else {
      onClick && onClick();
    }
  };

  return (
    <>
      <li css={MenuCss} {...props} onClick={onClickHandler}>
        {internalHref && (
          <InternalLink href={internalHref}>
            <a css={hiddenCss} ref={linkRef} />
          </InternalLink>
        )}
        {externalHref && (
          <a
            css={hiddenCss}
            href={externalHref}
            ref={linkRef}
            target="_blank"
            rel="noopener noreferrer"
          />
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
  padding: 16px 0;
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
  clip-path: circle(0);
`;
