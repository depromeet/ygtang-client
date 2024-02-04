import { ReactElement } from 'react';
import { css, Theme } from '@emotion/react';

import { IconButton } from '~/components/common/Button';
import useInternalRouter, { RouterPathType } from '~/hooks/common/useInternalRouter';

interface NavigationBarBaseProps {
  title?: string;
  rightElement?: ReactElement;
}

interface NavigationBarRouterProps extends NavigationBarBaseProps {
  backLink?: RouterPathType;
  backLinkScrollOption?: boolean;
  onClickBackButton: never;
}
interface NavigationBarCallBackProps extends NavigationBarBaseProps {
  backLink: never;
  backLinkScrollOption: never;
  onClickBackButton: VoidFunction;
}
type NavigationBarProps =
  | NavigationBarBaseProps
  | NavigationBarRouterProps
  | NavigationBarCallBackProps;

export default function NavigationBar(props: NavigationBarProps) {
  const router = useInternalRouter();
  const { title, rightElement } = props;
  const { onClickBackButton } = props as NavigationBarCallBackProps;
  const { backLink, backLinkScrollOption = true } = props as NavigationBarCallBackProps;

  const handelOnClickBackButton = () => {
    if (onClickBackButton) {
      onClickBackButton();
    } else if (backLink) {
      router.push(backLink, undefined, { scroll: backLinkScrollOption });
    } else {
      if (router.back) {
        router.back();
      }
    }
  };

  return (
    <nav css={navCss}>
      <IconButton size={28} iconName="ChevronIcon" light onClick={handelOnClickBackButton} />
      {title && <h1 css={headingCss}>{title}</h1>}
      {rightElement && <>{rightElement}</>}
    </nav>
  );
}

const navCss = (theme: Theme) => css`
  position: sticky;
  top: 0;
  width: 100%;
  height: 44px;
  background-color: ${theme.color.background};

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 900;
`;

const headingCss = (theme: Theme) => css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: ${theme.color.gray05};
  font-size: 1rem;
`;
