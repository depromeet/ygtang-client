import { ReactElement, useRef } from 'react';
import { css, Theme } from '@emotion/react';

import { RouterPathType } from '~/hooks/common/useInternalRouter';

import InternalLink from '../common/InternalLink';

interface MenuBaseProps {
  label: string;
  rightElement?: ReactElement;
}
interface MenuInternalProps extends MenuBaseProps {
  internalHref: RouterPathType;
  externalHref: never;
  onClick: never;
}
interface MenuExternalProps extends MenuBaseProps {
  externalHref: string;
  internalHref: never;
  onClick: never;
}
interface MenuOnClickProps extends MenuBaseProps {
  onClick: VoidFunction;
  internalHref: never;
  externalHref: never;
}

type MenuProps = MenuBaseProps | MenuInternalProps | MenuExternalProps | MenuOnClickProps;

export default function Menu(props: MenuProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const { label, rightElement } = props;
  const { internalHref } = props as MenuInternalProps;
  const { externalHref } = props as MenuExternalProps;
  const { onClick } = props as MenuOnClickProps;

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
