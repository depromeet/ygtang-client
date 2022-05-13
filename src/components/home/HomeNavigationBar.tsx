import Link from 'next/link';
import { css, Theme } from '@emotion/react';

import { FilterIcon, SettingsIcon } from '../common/icons';
import InternalLink from '../common/InternalLink';

export default function HomeNavigationBar() {
  return (
    <nav css={navCss}>
      <Link href="/?modal=tag" as="/tag" scroll={false}>
        <a>
          <FilterIcon css={iconCss} />
        </a>
      </Link>
      <InternalLink href="/my">
        <a>
          <SettingsIcon css={iconCss} />
        </a>
      </InternalLink>
    </nav>
  );
}

const navCss = (theme: Theme) => css`
  position: sticky;
  top: 0;
  width: calc(100% + 1px);
  height: 44px;
  background-color: ${theme.color.background};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  z-index: 900;
`;

const iconCss = (theme: Theme) => css`
  margin: 10px;
  color: ${theme.color.gray05};
`;
