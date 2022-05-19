import { ReactElement } from 'react';
import { css, Theme } from '@emotion/react';

import { IconButton } from '~/components/common/Button';
import useInternalRouter, { RouterPathType } from '~/hooks/common/useInternalRouter';

interface NavigationBarProps {
  backLink?: RouterPathType;
  backLinkScrollOption?: boolean;
  title?: string;
  rightElement?: ReactElement;
}

export default function NavigationBar({
  backLink,
  backLinkScrollOption = true,
  title,
  rightElement,
}: NavigationBarProps) {
  const router = useInternalRouter();

  // NOTE: 1. router option을 전체적으로 받을 수 있게? 2. onClickBackButton callback을 받을 수 있게?
  const onClickBackButton = () => {
    if (backLink) {
      router.push(backLink, undefined, { scroll: backLinkScrollOption });
      return;
    }
    router.back();
  };

  return (
    <nav css={navCss}>
      <IconButton iconName="ChevronIcon" light onClick={onClickBackButton} />
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
