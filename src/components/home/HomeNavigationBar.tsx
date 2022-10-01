import { css, Theme } from '@emotion/react';

import useToggle from '~/hooks/common/useToggle';

import { FilterIcon, SettingsIcon } from '../common/icons';
import InternalLink from '../common/InternalLink';
import FilterBottomSheetModal from './FilterBottomSheetModal';

export default function HomeNavigationBar() {
  const [isFilterBottomSheetModalOpen, toggleFilterBottomSheetModal] = useToggle(false);

  return (
    <>
      <nav css={navCss}>
        <button onClick={toggleFilterBottomSheetModal}>
          <FilterIcon css={iconCss} />
        </button>
        <InternalLink href="/my">
          <a>
            <SettingsIcon css={iconCss} />
          </a>
        </InternalLink>
      </nav>

      <FilterBottomSheetModal
        isShowing={isFilterBottomSheetModalOpen}
        onClose={toggleFilterBottomSheetModal}
      />
    </>
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
