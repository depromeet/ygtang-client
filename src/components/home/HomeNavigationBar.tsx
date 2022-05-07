import { css, Theme } from '@emotion/react';

import { FilterIcon, SettingsIcon } from '../common/icons';
import InternalLink from '../common/InternalLink';

export default function HomeNavigationBar() {
  return (
    <nav css={navCss}>
      <FilterIcon css={iconCss} />
      <InternalLink href="/my">
        <a>
          <SettingsIcon css={iconCss} />
        </a>
      </InternalLink>
    </nav>
  );
}

const navCss = css`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
`;

const iconCss = (theme: Theme) => css`
  margin: 10px;
  color: ${theme.color.gray05};
`;
